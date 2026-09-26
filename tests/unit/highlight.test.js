import { describe, expect, it } from 'vitest';
import { highlightToHtml, renderTutorialMarkdown } from '../../src/lib/utils/highlight.js';

describe('highlightToHtml', () => {
  it('wraps TypeScript tokens, including type annotations, in tok-* spans', () => {
    const html = highlightToHtml('function f(n: number) { return "x"; }');
    expect(html).toContain('<span class="tok-keyword">function</span>');
    expect(html).toContain('<span class="tok-typeName">number</span>');
    expect(html).toContain('<span class="tok-string">"x"</span>');
  });

  it('escapes HTML in the code rather than injecting it', () => {
    const html = highlightToHtml('const tag = "<b>&";');
    expect(html).not.toContain('<b>');
    expect(html).toContain('&lt;b&gt;&amp;');
  });

  it('keeps line breaks and returns escaped plain text for an unknown language', () => {
    expect(highlightToHtml('a\nb', 'js').split('\n')).toHaveLength(2);
    expect(highlightToHtml('x < y', 'cobol')).toBe('x &lt; y');
  });
});

describe('renderTutorialMarkdown', () => {
  it('renders prose and highlights ~~~ fenced code blocks', () => {
    const html = renderTutorialMarkdown('Use `Number()` here.\n\n~~~ts\nconst n: number = 1;\n~~~\n');
    expect(html).toContain('<code>Number()</code>');
    expect(html).toContain('<pre class="tutorial-code"><code>');
    expect(html).toContain('<span class="tok-typeName">number</span>');
  });
});
