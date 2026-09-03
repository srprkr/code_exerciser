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
});
