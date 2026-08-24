// Re-indents a code snippet to 2 spaces per nesting level, based on brace/
// bracket/paren depth, so inconsistent source indentation in the template
// literals doesn't leak into the rendered sample-data/solution boxes.
export function dedent(text) {
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
