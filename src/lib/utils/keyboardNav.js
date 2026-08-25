// Returns true if the given element is (or is inside) something that
// should swallow its own arrow-key/Shift+arrow-key behavior — text inputs,
// textareas, contenteditable regions, and CodeMirror's editor (which uses
// arrow keys for cursor movement and doesn't expose a plain <input>/
// <textarea> to check against).
export function isTypingTarget(el) {
  if (!el) return false;
  const tag = el.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || el.isContentEditable) return true;
  return !!el.closest?.('.cm-editor');
}

// Wires document-level ArrowLeft/ArrowRight (single step) and
// Shift+ArrowLeft/ArrowRight (skip step, e.g. 10) navigation, calling
// onStep(delta) for each. Ignored while focus is on a typing target (see
// isTypingTarget) so it never hijacks cursor movement in the code editor
// or text entry in inputs. Returns a cleanup function.
export function bindArrowKeyNav({ onStep, skipAmount = 10 }) {
  function handleKeydown(event) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    if (isTypingTarget(event.target)) return;
    if (event.altKey || event.metaKey || event.ctrlKey) return;

    const direction = event.key === 'ArrowRight' ? 1 : -1;
    const delta = event.shiftKey ? direction * skipAmount : direction;

    event.preventDefault();
    onStep(delta);
  }

  document.addEventListener('keydown', handleKeydown);
  return () => document.removeEventListener('keydown', handleKeydown);
}

// Wires document-level Mod-Enter (Run) / Mod-Shift-Enter (Check answer)
// shortcuts for whenever focus is OUTSIDE the CodeMirror editor — e.g. on
// a button, or nowhere in particular. When the editor itself has focus,
// CodeMirror's own keymap (registered directly on the EditorView in
// CodeEditor.svelte) handles the same combo instead, since a document
// listener can't intercept before CodeMirror's internal key handling.
// "Mod" is Ctrl on Windows/Linux, Cmd on Mac, matching CodeMirror's own
// platform-aware convention. Returns a cleanup function.
export function bindRunCheckShortcuts({ onRun, onCheck }) {
  function handleKeydown(event) {
    if (event.key !== 'Enter') return;
    if (event.target?.closest?.('.cm-editor')) return; // handled by CodeMirror's own keymap instead

    const modPressed = navigator.platform.includes('Mac') ? event.metaKey : event.ctrlKey;
    if (!modPressed) return;

    event.preventDefault();
    if (event.shiftKey) {
      onCheck();
    } else {
      onRun();
    }
  }

  document.addEventListener('keydown', handleKeydown);
  return () => document.removeEventListener('keydown', handleKeydown);
}
