// Re-indents a code snippet to 2 spaces per nesting level, based on brace/
// bracket/paren depth, so inconsistent source indentation in the template
// literals doesn't leak into the rendered sample-data/solution boxes.
//
// This only makes sense for JS: its blocks are brace-delimited, so
// indentation is cosmetic and safe to recompute. Python's indentation is
// syntax — `for n in x:\n    total += n` re-flattened by brace-depth
// (which never sees an unclosed bracket here) becomes `for n in x:\ntotal
// += n`, an IndentationError. Python source in the data files is already
// hand-formatted correctly, so for Python this returns the text verbatim
// (blank leading/trailing lines trimmed) rather than reformatting it.
export function dedent(text, language = 'javascript') {
  if (language === 'python') return text.replace(/^\n+|\n+$/g, '');

  const lines = text.split('\n');
  let depth = 0;

  return lines
    .map((rawLine) => {
      const line = rawLine.trim();
      if (line.length === 0) return '';

      const closesFirst = /^[)\]}]/.test(line);
      const lineDepth = closesFirst ? Math.max(depth - 1, 0) : depth;

      for (const char of line) {
        if (char === '(' || char === '[' || char === '{') depth++;
        else if (char === ')' || char === ']' || char === '}') depth = Math.max(depth - 1, 0);
      }

      return '  '.repeat(lineDepth) + line;
    })
    .join('\n');
}
