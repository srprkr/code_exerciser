// Python exercises. Deliberately NOT translations of the JavaScript set —
// Python's idioms differ (a comprehension does the work of map/filter), so
// the problems and the tags they're filed under are their own thing.
//
// IDs are allocated in blocks of ten, one block per core tag (see
// CORE_FUNCTIONS below): 1-10 list-comprehension, 11-20 dict-comprehension,
// and so on. Every block is reserved up front even while only partly filled,
// so adding problems later never shifts an existing id — progress is stored
// against these ids and would otherwise be silently reassigned.
//
// Everything in the core set is native Python: builtins and syntax, no
// imports. That keeps the eventual Pyodide runtime free of package loading.
export const exercises = [
  {
    id: 1,
    title: 'Problem 1',
    question: 'From this sentence, collect the words longer than four letters',
    sampleData: `sentence = "the quick brown fox jumps"`,
    solution: `long_words = [word for word in sentence.split() if len(word) > 4]
print(long_words)`,
    output: ['quick', 'brown', 'jumps'],
    functions: ['list-comprehension', 'split'],
    difficulty: 'easy',
    hint: {
      text: 'A comprehension reads [expression for item in iterable if condition]. The trailing if filters items out, so one comprehension both selects and transforms — there is no need to chain separate steps.'
    }
  },
  {
    id: 11,
    title: 'Problem 11',
    question: 'Given a list of words, build a dictionary mapping each word to its length',
    sampleData: `words = ["apple", "fig", "banana"]`,
    solution: `lengths = {word: len(word) for word in words}
print(lengths)`,
    output: { apple: 5, fig: 3, banana: 6 },
    functions: ['dict-comprehension'],
    difficulty: 'easy',
    hint: {
      text: 'A dict comprehension uses braces and a key: value pair — {key_expr: value_expr for item in list}.'
    }
  },
  {
    id: 21,
    title: 'Problem 21',
    question: 'Format this price as a string showing exactly two decimal places',
    sampleData: 'price = 3.14159',
    solution: `label = f"{price:.2f}"
print(label)`,
    output: '3.14',
    functions: ['f-string'],
    difficulty: 'easy',
    hint: {
      text: 'An f-string can carry a format spec after a colon: {value:.2f} rounds to two decimals, {value:>8} right-aligns in eight columns, and {value:,} adds thousands separators.'
    }
  },
  {
    id: 31,
    title: 'Problem 31',
    question: 'Sort these (name, score) pairs so the highest score comes first',
    sampleData: `scores = [("sam", 91), ("ana", 78), ("kim", 84)]`,
    solution: `ranked = sorted(scores, key=lambda pair: pair[1], reverse=True)
print(ranked)`,
    output: [
      ['sam', 91],
      ['kim', 84],
      ['ana', 78]
    ],
    functions: ['sorted', 'lambda'],
    difficulty: 'medium',
    hint: {
      text: 'sorted() returns a new list and leaves the original alone. key= takes a function applied to each item to decide what to sort on, and reverse=True flips the order.'
    }
  },
  {
    id: 41,
    title: 'Problem 41',
    question: 'Given a list of fruits, number them starting at 1, like "1. apple"',
    sampleData: `fruits = ["apple", "banana", "cherry"]`,
    solution: `numbered = [f"{position}. {fruit}" for position, fruit in enumerate(fruits, start=1)]
print(numbered)`,
    output: ['1. apple', '2. banana', '3. cherry'],
    functions: ['enumerate', 'f-string'],
    difficulty: 'easy',
    hint: {
      text: 'enumerate() yields (index, item) pairs as you loop. It counts from 0 unless you pass start=1.'
    }
  },
  {
    id: 51,
    title: 'Problem 51',
    question:
      'The first item of this list is a heading and the rest are names. Split the names off into their own list',
    sampleData: `rows = ["name", "sam", "ana", "kim"]`,
    solution: `heading, *names = rows
print(names)`,
    output: ['sam', 'ana', 'kim'],
    functions: ['unpacking'],
    difficulty: 'easy',
    hint: {
      text: 'Assignment can unpack a sequence into separate names: a, b = pair. A starred name like *rest absorbs everything left over, so heading, *names = rows splits the first item from the remainder in one line.'
    }
  },
  {
    id: 61,
    title: 'Problem 61',
    question: 'Report whether every number in the list is even',
    sampleData: 'numbers = [2, 4, 6, -8]',
    solution: `all_even = all(n % 2 == 0 for n in numbers)
print(all_even)`,
    output: true,
    functions: ['all'],
    difficulty: 'medium',
    hint: {
      text: 'all() is True when every item passes the test, any() when at least one does. Both take an expression that produces True/False for each item.'
    }
  },
  {
    id: 71,
    title: 'Problem 71',
    question: 'Return the list of letters in reverse order, without sorting or looping',
    sampleData: `letters = ["a", "b", "c", "d", "e"]`,
    solution: `backwards = letters[::-1]
print(backwards)`,
    output: ['e', 'd', 'c', 'b', 'a'],
    functions: ['slice'],
    difficulty: 'easy',
    hint: {
      text: 'Slicing is list[start:stop:step]. Leaving a side blank runs to that end of the list, and a step of -1 walks it backwards.'
    }
  },
  {
    id: 81,
    title: 'Problem 81',
    question: 'Build a list of every even number from 0 up to (but not including) stop',
    sampleData: 'stop = 10',
    solution: `evens = [n for n in range(0, stop, 2)]
print(evens)`,
    output: [0, 2, 4, 6, 8],
    functions: ['range', 'list-comprehension'],
    difficulty: 'easy',
    hint: {
      text: 'range(start, stop, step) counts from start up to but never including stop. It produces values lazily, so wrap it in a list or a comprehension to see them.'
    }
  }
];

// One core tag per reserved id block, in block order — index 0 owns ids
// 1-10, index 1 owns 11-20, and so on. Reordering this list would
// re-point every block, so append rather than insert.
export const CORE_FUNCTIONS = [
  'list-comprehension',
  'dict-comprehension',
  'f-string',
  'sorted',
  'enumerate',
  'unpacking',
  'any/all',
  'slice',
  'range'
];

// Available as tags on any problem, but without a reserved block of their
// own; they surface behind the filter bar's "Show more" toggle. 'reduce' is
// the one non-native entry here — it needs `from functools import reduce`.
export const SECONDARY_FUNCTIONS = [
  'zip',
  'map',
  'filter',
  'lambda',
  'sum',
  'join',
  'split',
  'set',
  'dict',
  'reduce'
];

export const KNOWN_FUNCTIONS = [...CORE_FUNCTIONS, ...SECONDARY_FUNCTIONS];
export const DIFFICULTIES = ['easy', 'medium', 'hard'];

// Two pseudo-tags, following the same pattern as the JavaScript set's
// 'Object': 'any/all' is one badge covering both builtins (they're the same
// idea, and ten problems of each would repeat heavily), and 'dict' collects
// dict.keys/values/items rather than being a tag applied directly.
export function exerciseHasFunction(exercise, fn) {
  if (fn === 'any/all') return exercise.functions.some((f) => f === 'any' || f === 'all');
  if (fn === 'dict') return exercise.functions.some((f) => f.startsWith('dict.'));
  return exercise.functions.includes(fn);
}

export const DOC_SITE_NAME = 'Python docs';

export const KNOWN_FUNCTION_DOC_LINKS = {
  'list-comprehension': 'https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions',
  'dict-comprehension': 'https://docs.python.org/3/tutorial/datastructures.html#dictionaries',
  'f-string': 'https://docs.python.org/3/reference/lexical_analysis.html#f-strings',
  sorted: 'https://docs.python.org/3/library/functions.html#sorted',
  enumerate: 'https://docs.python.org/3/library/functions.html#enumerate',
  unpacking: 'https://docs.python.org/3/tutorial/controlflow.html#unpacking-argument-lists',
  'any/all': 'https://docs.python.org/3/library/functions.html#any',
  slice: 'https://docs.python.org/3/reference/expressions.html#slicings',
  range: 'https://docs.python.org/3/library/functions.html#func-range',
  zip: 'https://docs.python.org/3/library/functions.html#zip',
  map: 'https://docs.python.org/3/library/functions.html#map',
  filter: 'https://docs.python.org/3/library/functions.html#filter',
  lambda: 'https://docs.python.org/3/reference/expressions.html#lambda',
  sum: 'https://docs.python.org/3/library/functions.html#sum',
  join: 'https://docs.python.org/3/library/stdtypes.html#str.join',
  split: 'https://docs.python.org/3/library/stdtypes.html#str.split',
  set: 'https://docs.python.org/3/library/stdtypes.html#set',
  dict: 'https://docs.python.org/3/library/stdtypes.html#dict',
  reduce: 'https://docs.python.org/3/library/functools.html#functools.reduce'
};
