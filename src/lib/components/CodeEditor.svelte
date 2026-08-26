<script>
  import { onDestroy, onMount } from 'svelte';
  import { EditorView, keymap, lineNumbers, highlightActiveLine, drawSelection, Decoration, ViewPlugin } from '@codemirror/view';
  import { EditorState } from '@codemirror/state';
  import { defaultKeymap, indentWithTab, history, historyKeymap } from '@codemirror/commands';
  import { javascript } from '@codemirror/lang-javascript';
  import { syntaxHighlighting, defaultHighlightStyle, bracketMatching, indentOnInput } from '@codemirror/language';
  import { oneDark } from '@codemirror/theme-one-dark';
  import { dedent } from '../utils/dedent.js';
  import { theme } from '../stores/theme.js';
  import { Progress } from '../stores/progress.js';
  import { runCode as sandboxRunCode, teardownSandbox } from '../grading/sandbox.js';
  import { decideCheckResult } from '../grading/grade.js';
  import { hasPeekedThisSession, stepExercise } from '../stores/ui.js';
  import { bindRunCheckShortcuts } from '../utils/keyboardNav.js';

  // Called by the parent when a Check-answer pass succeeds and it should
  // reveal the solution (even in tough-it-out mode) — mirrors the old
  // window.revealSolutionOnCorrectAnswer bridge, now just a prop callback.
  let { exercise, onCheckPassed, skipAmount = 10 } = $props();

  // Per-exercise in-memory attempt store, keyed by exercise id. Survives
  // Prev/Next navigation for the session but not a page refresh. Component-
  // instance state now (not module-level), since CodeEditor has a real
  // lifecycle boundary — the vanilla version simulated this with a
  // module-level Map because there was only ever one editor on the page.
  const attempts = new Map();

  let view = null;
  let currentExerciseId = null;
  // End position (in the current doc) of the locked sample-data region.
  // Recomputed per exercise since sampleData length varies.
  let lockedRegionEnd = 0;

  let editorParentEl = $state(null);
  let consoleOutputEl = $state(null);
  let consoleVisible = $state(false);
  let checkResultVisible = $state(false);
  let checkResultText = $state('');
  let checkResultPassed = $state(false);

  // Matches bindRunCheckShortcuts' own platform check, so the hint always
  // names the key that actually triggers it.
  const modKeyLabel = navigator.platform.includes('Mac') ? 'Cmd' : 'Ctrl';

  function isDarkTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }

  function buildCursorTheme() {
    return EditorView.theme({
      '.cm-cursor, .cm-dropCursor': {
        borderLeftColor: isDarkTheme() ? '#ffffff' : '#111111',
        borderLeftWidth: '2px'
      }
    });
  }

  const DARK_EDITOR_BG = '#282c34';

  const gutterPaddingTheme = EditorView.theme({
    '.cm-gutters': {
      paddingRight: '0.4rem',
      paddingLeft: '0rem'
    }
  });

  function buildGutterTheme() {
    return EditorView.theme({
      '.cm-gutters': {
        backgroundColor: DARK_EDITOR_BG,
        color: '#bfbfbf',
        borderRight: '1px solid #bfbfbf'
      },
      '.cm-activeLineGutter': {
        backgroundColor: DARK_EDITOR_BG
      }
    });
  }

  // drawSelection() renders the selection as a background-color layer
  // drawn behind the text, so the text keeps its normal (light, in dark
  // mode) token color on top — CSS ::selection doesn't apply to this
  // rendering path. Use a mid-tone selection background that keeps dark
  // mode's light text readable, rather than trying to flip the text color.
  const darkSelectionTheme = EditorView.theme({
    '.cm-selectionBackground': {
      backgroundColor: '#4b5568 !important'
    }
  });

  // Rejects any edit that touches the locked sample-data region at the top
  // of the doc. Reads lockedRegionEnd fresh on every transaction since
  // it's recomputed per exercise.
  const readOnlyRegionFilter = EditorState.changeFilter.of((tr) => {
    let allowed = true;
    tr.changes.iterChangedRanges((fromA) => {
      if (fromA < lockedRegionEnd) allowed = false;
    });
    return allowed;
  });

  const lockedLineDecoration = Decoration.line({ class: 'cm-locked-line' });

  const lockedLineHighlighter = ViewPlugin.fromClass(
    class {
      constructor(view) {
        this.decorations = this.buildDecorations(view);
      }
      update(update) {
        if (update.docChanged || update.viewportChanged) {
          this.decorations = this.buildDecorations(update.view);
        }
      }
      buildDecorations(view) {
        const marks = [];
        const lockedEndLine = view.state.doc.lineAt(Math.max(lockedRegionEnd - 1, 0)).number;
        for (let lineNum = 1; lineNum <= lockedEndLine; lineNum++) {
          const line = view.state.doc.line(lineNum);
          marks.push(lockedLineDecoration.range(line.from));
        }
        return Decoration.set(marks);
      }
    },
    { decorations: (instance) => instance.decorations }
  );

  function buildLockedLineTheme() {
    return EditorView.theme({
      '.cm-locked-line': {
        backgroundColor: isDarkTheme() ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.035)'
      }
    });
  }

  function buildExtensions() {
    const base = [
      lineNumbers(),
      history(),
      highlightActiveLine(),
      drawSelection(),
      bracketMatching(),
      indentOnInput(),
      javascript(),
      syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
      // Mod-Enter/Mod-Shift-Enter run/check the code while the editor has
      // focus (Ctrl on Windows/Linux, Cmd on Mac, via CodeMirror's
      // platform-aware "Mod-" prefix). Placed before defaultKeymap so it
      // wins over any conflicting default binding; returning true marks
      // the key as handled so it doesn't also insert a newline.
      keymap.of([
        { key: 'Mod-Enter', run: () => { handleRun(); return true; } },
        { key: 'Mod-Shift-Enter', run: () => { handleCheck(); return true; } },
        // Ctrl-Arrow (literal Ctrl, not "Mod", on every platform including
        // Mac) steps exercises while the editor has focus, since plain
        // arrow keys need to keep moving the text cursor. Mirrors
        // bindArrowKeyNav's plain/Shift split for out-of-editor nav.
        { key: 'Ctrl-ArrowLeft', run: () => { stepExercise(-1); return true; } },
        { key: 'Ctrl-ArrowRight', run: () => { stepExercise(1); return true; } },
        { key: 'Ctrl-Shift-ArrowLeft', run: () => { stepExercise(-skipAmount); return true; } },
        { key: 'Ctrl-Shift-ArrowRight', run: () => { stepExercise(skipAmount); return true; } },
        ...defaultKeymap,
        ...historyKeymap,
        indentWithTab
      ]),
      EditorView.updateListener.of((update) => {
        if (update.docChanged && currentExerciseId !== null) {
          attempts.set(currentExerciseId, update.state.doc.toString());
        }
      }),
      gutterPaddingTheme,
      readOnlyRegionFilter,
      lockedLineHighlighter,
      buildLockedLineTheme()
    ];

    if (isDarkTheme()) {
      base.push(oneDark);
      // Added after oneDark so it wins over its default gutter/selection styling.
      base.push(buildGutterTheme());
      base.push(darkSelectionTheme);
    }

    // Added last so it wins over oneDark's own cursor color.
    base.push(buildCursorTheme());

    return base;
  }

  function createEditor(doc, cursorPos) {
    if (view) {
      view.destroy();
    }
    view = new EditorView({
      state: EditorState.create({
        doc,
        extensions: buildExtensions(),
        selection: cursorPos !== undefined ? { anchor: cursorPos } : undefined
      }),
      parent: editorParentEl
    });
  }

  // Builds/rebuilds the editor content for `nextExercise` (fresh doc or a
  // restored in-session attempt), without touching the theme.
  function docForExercise(nextExercise) {
    currentExerciseId = nextExercise.id;
    const existing = attempts.get(nextExercise.id);

    // The sample data plus its trailing newline is the locked region, so
    // an insertion right at the end of the last sample-data line can't
    // sneak onto that line — it's pushed past the newline into the
    // editable zone.
    lockedRegionEnd = nextExercise.sampleData.length + 1;

    let doc = existing;
    let cursorPos;

    if (doc === undefined) {
      const progress = Progress.getExercise(nextExercise.id);

      if (progress && progress.completed) {
        // Already completed and no attempt typed yet this session (e.g. a
        // fresh page load) — pre-fill with the real solution so the editor
        // shows working code instead of a blank slate.
        const solution = dedent(nextExercise.solution);
        doc = `${nextExercise.sampleData}\n\n${solution}\n`;
      } else {
        // Fresh visit: leave a blank line below the sample data and place
        // the cursor two lines down so it's obvious where typing should begin.
        doc = `${nextExercise.sampleData}\n\n`;
      }

      cursorPos = doc.length;
      attempts.set(nextExercise.id, doc);
    }

    return { doc, cursorPos };
  }

  // Single entry point for (re)building the CodeMirror view — called
  // whenever the exercise OR the theme changes. Deliberately one effect
  // driving one createEditor() call per reactive flush: previously this
  // was split into two separate effects (one for exercise, one for
  // theme), each independently calling createEditor(). When both an
  // exercise switch and a theme toggle happened close together (e.g.
  // clicking Next right after toggling dark/light), Svelte could run
  // both effects in the same flush, producing two competing
  // createEditor() calls — the loser's isDarkTheme() read could end up
  // baked into the editor's extensions even after the DOM's data-theme
  // attribute had already moved on, leaving stale dark-theme colors
  // (like the CodeMirror background) rendered under the light theme.
  $effect(() => {
    $theme; // actually read the store's value so this reruns on toggle
    if (!exercise) return;

    const { doc, cursorPos } = docForExercise(exercise);
    createEditor(doc, cursorPos);
    if (consoleOutputEl) consoleOutputEl.textContent = '';
    consoleVisible = false;
    checkResultVisible = false;
  });

  // Re-theme the editor without losing content or resetting the
  // console/check-result panels — used when something other than the
  // reactive exercise/theme effect above needs a manual re-theme.
  export function refreshTheme() {
    if (!view) return;
    const doc = view.state.doc.toString();
    createEditor(doc);
  }

  function appendConsoleLine(text, isError) {
    if (!consoleOutputEl) return;
    const line = document.createElement('div');
    if (isError) line.className = 'console-error';
    line.textContent = text;
    consoleOutputEl.appendChild(line);
  }

  function markAttemptedIfOutput(payload) {
    if (!exercise) return;
    if (payload.hasLastLogValue) {
      Progress.markAttempted(exercise.id);
    } else {
      appendConsoleLine('No output detected — use console.log(...) to print your result.', true);
    }
  }

  function handleRun() {
    if (!view) return;
    checkResultVisible = false;
    if (consoleOutputEl) consoleOutputEl.textContent = '';
    consoleVisible = true;

    sandboxRunCode(view.state.doc.toString(), {
      onConsoleLine: appendConsoleLine,
      onDone: (payload) => {
        markAttemptedIfOutput(payload);
      }
    });
  }

  function handleCheck() {
    if (!view || !exercise) return;
    checkResultVisible = false;
    if (consoleOutputEl) consoleOutputEl.textContent = '';
    consoleVisible = true;

    sandboxRunCode(view.state.doc.toString(), {
      onConsoleLine: appendConsoleLine,
      onDone: (payload) => {
        markAttemptedIfOutput(payload);

        const { passed, countsTowardCompletion } = decideCheckResult(
          payload,
          exercise,
          hasPeekedThisSession
        );

        if (passed && countsTowardCompletion) {
          Progress.markCompleted(exercise.id);
        }

        checkResultPassed = passed;
        checkResultVisible = true;
        if (passed && !countsTowardCompletion) {
          checkResultText =
            "Correct! Since you looked at the solution, this won't count toward your badge — come back later and solve it without peeking.";
        } else if (passed) {
          checkResultText = 'Correct! That matches the expected output.';
        } else {
          checkResultText = "Not quite — that doesn't match the expected output yet.";
        }

        if (passed && onCheckPassed) onCheckPassed();
      }
    });
  }

  onMount(() => bindRunCheckShortcuts({ onRun: handleRun, onCheck: handleCheck }));

  onDestroy(() => {
    if (view) view.destroy();
    teardownSandbox();
  });
</script>

<div class="your-turn-box">
  <div class="code-editor" bind:this={editorParentEl}></div>

  <div class="console-output" hidden={!consoleVisible}>
    <strong>Console</strong>
    <pre class="console-log" bind:this={consoleOutputEl}></pre>
  </div>
</div>

<div class="editor-actions">
  <button type="button" class="run-code-button btn btn-primary btn-sm sm:btn-md" onclick={handleRun} title="Run ({modKeyLabel}+Enter)">
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M6 4l14 8-14 8V4z" />
    </svg>
    Run
  </button>
  <button type="button" class="check-answer-button btn btn-outline btn-sm sm:btn-md" onclick={handleCheck} title="Check answer ({modKeyLabel}+Shift+Enter)">
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
    Check answer
  </button>
</div>

<p class="check-result my-2" class:check-pass={checkResultPassed} class:check-fail={!checkResultPassed} hidden={!checkResultVisible}>
  {checkResultText}
</p>
