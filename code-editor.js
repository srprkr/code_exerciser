import { EditorView, keymap, lineNumbers, highlightActiveLine } from 'https://esm.sh/@codemirror/view@6.43.9';
import { EditorState } from 'https://esm.sh/@codemirror/state@6.7.1';
import { defaultKeymap, indentWithTab, history, historyKeymap } from 'https://esm.sh/@codemirror/commands@6.11.0?deps=@codemirror/state@6.7.1,@codemirror/view@6.43.9';
import { javascript } from 'https://esm.sh/@codemirror/lang-javascript@6.2.5?deps=@codemirror/state@6.7.1,@codemirror/view@6.43.9';
import { syntaxHighlighting, defaultHighlightStyle, bracketMatching, indentOnInput } from 'https://esm.sh/@codemirror/language@6.12.4?deps=@codemirror/state@6.7.1,@codemirror/view@6.43.9';
import { oneDark } from 'https://esm.sh/@codemirror/theme-one-dark@6.1.3?deps=@codemirror/state@6.7.1,@codemirror/view@6.43.9';

// Per-exercise in-memory attempt store, keyed by exercise id. Survives
// Prev/Next navigation for the session but not a page refresh.
const attempts = new Map();

let view = null;
let currentExerciseId = null;
let currentExercise = null;

const editorParent = document.querySelector('.code-editor');
const runButton = document.querySelector('.run-code-button');
const checkButton = document.querySelector('.check-answer-button');
const checkResultEl = document.querySelector('.check-result');
const consoleWrapEl = document.querySelector('.console-output');
const consoleOutputEl = document.querySelector('.console-log');

function isDarkTheme() {
  return document.documentElement.getAttribute('data-theme') === 'dark';
}

function buildExtensions() {
  const base = [
    lineNumbers(),
    history(),
    highlightActiveLine(),
    bracketMatching(),
    indentOnInput(),
    javascript(),
    syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
    keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab]),
    EditorView.updateListener.of((update) => {
      if (update.docChanged && currentExerciseId !== null) {
        attempts.set(currentExerciseId, update.state.doc.toString());
      }
    })
  ];

  if (isDarkTheme()) base.push(oneDark);

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
    parent: editorParent
  });
}

// Called by exercises.js (a classic script, not a module) whenever the
// displayed exercise changes. Exposed on window since modules don't share
// scope with classic <script> tags.
function loadExerciseIntoEditor(exercise) {
  currentExerciseId = exercise.id;
  currentExercise = exercise;
  const existing = attempts.get(exercise.id);

  let doc = existing;
  let cursorPos;

  if (doc === undefined) {
    // Fresh visit: leave a blank line below the sample data and place the
    // cursor two lines down so it's obvious where typing should begin.
    doc = `${exercise.sampleData}\n\n`;
    cursorPos = doc.length;
    attempts.set(exercise.id, doc);
  }

  createEditor(doc, cursorPos);
  consoleOutputEl.textContent = '';
  if (consoleWrapEl) consoleWrapEl.hidden = true;
  if (checkResultEl) checkResultEl.hidden = true;
}

// Re-theme the editor when the user flips light/dark without losing content.
function refreshEditorTheme() {
  if (!view) return;
  const doc = view.state.doc.toString();
  createEditor(doc);
}

window.loadExerciseIntoEditor = loadExerciseIntoEditor;
window.refreshEditorTheme = refreshEditorTheme;

// exercises.js (a classic script) runs before this module finishes loading
// and may have already rendered the first exercise, so pick that up now.
if (window.currentExercise) {
  loadExerciseIntoEditor(window.currentExercise);
}

function appendConsoleLine(text, isError) {
  const line = document.createElement('div');
  if (isError) line.className = 'console-error';
  line.textContent = text;
  consoleOutputEl.appendChild(line);
}

let sandboxFrame = null;
let messageHandler = null;

function getSandboxFrame() {
  if (sandboxFrame) return sandboxFrame;

  sandboxFrame = document.createElement('iframe');
  sandboxFrame.setAttribute('sandbox', 'allow-scripts');
  sandboxFrame.style.display = 'none';
  document.body.appendChild(sandboxFrame);
  return sandboxFrame;
}

const SANDBOX_HTML = `<!DOCTYPE html>
<html><body><script>
  const send = (type, payload) => parent.postMessage({ source: 'code-editor-sandbox', type, payload }, '*');

  let lastLogArgs = null;

  ['log', 'warn', 'error', 'info'].forEach((level) => {
    console[level] = (...args) => {
      if (level === 'log') lastLogArgs = args;
      send('console', { level, args: args.map((a) => {
        try { return typeof a === 'string' ? a : JSON.stringify(a, null, 2); }
        catch { return String(a); }
      }) });
    };
  });

  window.addEventListener('error', (event) => {
    send('console', { level: 'error', args: [event.message] });
  });

  window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'run') {
      let threw = false;
      try {
        new Function(event.data.code)();
      } catch (err) {
        threw = true;
        send('console', { level: 'error', args: [err.message] });
      }

      let lastLogValue;
      let hasLastLogValue = false;
      if (!threw && lastLogArgs !== null) {
        hasLastLogValue = true;
        lastLogValue = lastLogArgs.length === 1 ? lastLogArgs[0] : lastLogArgs;
      }

      let serialized = null;
      if (hasLastLogValue) {
        try {
          serialized = JSON.parse(JSON.stringify(lastLogValue));
        } catch {
          hasLastLogValue = false;
        }
      }

      send('done', { hasLastLogValue, lastLogValue: serialized });
    }
  });

  send('ready', null);
<\/script></body></html>`;

function runCode(code, onDone) {
  consoleOutputEl.textContent = '';
  if (consoleWrapEl) consoleWrapEl.hidden = false;

  const frame = getSandboxFrame();

  if (messageHandler) {
    window.removeEventListener('message', messageHandler);
  }

  messageHandler = (event) => {
    if (!event.data || event.data.source !== 'code-editor-sandbox') return;

    if (event.data.type === 'ready') {
      frame.contentWindow.postMessage({ type: 'run', code }, '*');
    } else if (event.data.type === 'console') {
      const { level, args } = event.data.payload;
      appendConsoleLine(args.join(' '), level === 'error');
    } else if (event.data.type === 'done') {
      window.removeEventListener('message', messageHandler);
      messageHandler = null;
      if (onDone) onDone(event.data.payload);
    }
  };

  window.addEventListener('message', messageHandler);

  // Reloading the srcdoc gives each run a fresh global scope.
  frame.srcdoc = SANDBOX_HTML;
}

function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (a === null || b === null) return false;
  if (typeof a !== 'object') return false;

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;

  return aKeys.every((key) => deepEqual(a[key], b[key]));
}

function showCheckResult(passed) {
  if (!checkResultEl) return;
  checkResultEl.hidden = false;
  checkResultEl.textContent = passed
    ? 'Correct! That matches the expected output.'
    : "Not quite — that doesn't match the expected output yet.";
  checkResultEl.className = passed ? 'check-result check-pass' : 'check-result check-fail';

  if (passed && window.revealSolutionOnCorrectAnswer) {
    window.revealSolutionOnCorrectAnswer();
  }
}

if (runButton) {
  runButton.addEventListener('click', () => {
    if (!view) return;
    if (checkResultEl) checkResultEl.hidden = true;
    runCode(view.state.doc.toString());
  });
}

if (checkButton) {
  checkButton.addEventListener('click', () => {
    if (!view || !currentExercise) return;
    if (checkResultEl) checkResultEl.hidden = true;

    runCode(view.state.doc.toString(), (payload) => {
      const passed = payload.hasLastLogValue && deepEqual(payload.lastLogValue, currentExercise.output);
      showCheckResult(passed);
    });
  });
}
