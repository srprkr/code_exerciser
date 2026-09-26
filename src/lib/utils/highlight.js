// Static syntax highlighting for read-only code (the TypeScript intro
// tutorials), using the same Lezer parsers CodeMirror's editor uses — so a
// snippet is tokenized exactly as it would be once typed into the editor,
// without mounting a whole EditorView per code block. Tokens come out as
// `tok-*` classes (see classHighlighter), coloured per theme in app.scss.
import { Marked } from 'marked';
import { highlightCode, classHighlighter } from '@lezer/highlight';
import { javascriptLanguage, typescriptLanguage } from '@codemirror/lang-javascript';

const PARSERS = {
  js: javascriptLanguage.parser,
  javascript: javascriptLanguage.parser,
  ts: typescriptLanguage.parser,
  typescript: typescriptLanguage.parser
};

function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Returns HTML for `code`: escaped text with tok-* spans. An unknown
// language comes back escaped but unhighlighted rather than throwing.
export function highlightToHtml(code, language = 'typescript') {
  const parser = PARSERS[language];
  if (!parser) return escapeHtml(code);

  let html = '';
  highlightCode(
    code,
    parser.parse(code),
    classHighlighter,
    (text, classes) => {
      html += classes ? `<span class="${classes}">${escapeHtml(text)}</span>` : escapeHtml(text);
    },
    () => {
      html += '\n';
    }
  );
  return html;
}

// Fenced code blocks (~~~ts / ~~~js) get the same highlighting as the
// tutorial's solution block. The tutorials are this app's own static data,
// never user input, so rendering the result with {@html} is safe.
const tutorialMarked = new Marked({
  renderer: {
    code({ text, lang }) {
      return `<pre class="tutorial-code"><code>${highlightToHtml(text, lang)}</code></pre>\n`;
    }
  }
});

export function renderTutorialMarkdown(markdown) {
  return tutorialMarked.parse(markdown);
}
