import { describe, expect, it } from 'vitest';
import { dedent } from '../../src/lib/utils/dedent.js';

describe('dedent', () => {
  it('normalizes flat, over-indented lines to 2 spaces per depth level', () => {
    const input = `let x = [\n      1,\n      2\n    ];`;
    expect(dedent(input)).toBe('let x = [\n  1,\n  2\n];');
  });

  it('drops indentation to 0 for a closing bracket line', () => {
    const input = `let items = [\n      { id: 1 },\n      { id: 2 }\n    ];`;
    expect(dedent(input)).toBe('let items = [\n  { id: 1 },\n  { id: 2 }\n];');
  });

  it('handles nested brace/bracket/paren depth', () => {
    const input = `function f() {\n  if (true) {\n  return [1, 2];\n  }\n}`;
    expect(dedent(input)).toBe('function f() {\n  if (true) {\n    return [1, 2];\n  }\n}');
  });

  it('collapses blank lines to empty strings rather than indenting them', () => {
    const input = 'let a = 1;\n\nlet b = 2;';
    expect(dedent(input)).toBe('let a = 1;\n\nlet b = 2;');
  });

  it('handles a single-line snippet with no nesting', () => {
    expect(dedent('let a = 1;')).toBe('let a = 1;');
  });

  it('defaults to javascript reformatting when no language is given', () => {
    const input = `let x = [\n      1,\n      2\n    ];`;
    expect(dedent(input)).toBe(dedent(input, 'javascript'));
  });

  describe('python', () => {
    it('leaves indented blocks untouched, rather than flattening them to an IndentationError', () => {
      // The brace/bracket-depth tracking above sees no open bracket on a
      // `for ...:` line, so it would otherwise flatten the loop body to
      // column 0 — invalid Python. Python source must pass through as-is.
      const input = 'total = 0\nfor n in [1, 2, 3]:\n    total += n\nprint(total)';
      expect(dedent(input, 'python')).toBe(input);
    });

    it('still trims leading and trailing blank lines', () => {
      const input = '\n\ndef f():\n    return 1\n\n\n';
      expect(dedent(input, 'python')).toBe('def f():\n    return 1');
    });

    it('preserves nested indentation exactly as authored', () => {
      const input = 'def outer():\n    if True:\n        return [1, 2]\n    return None';
      expect(dedent(input, 'python')).toBe(input);
    });
  });
});
