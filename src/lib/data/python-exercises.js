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
    id: 2,
    title: 'Problem 2',
    question: 'Given a list of numbers, produce their squares',
    sampleData: 'numbers = [1, 2, 3, 4, 5, 6]',
    solution: `squares = [n ** 2 for n in numbers]
print(squares)`,
    output: [1, 4, 9, 16, 25, 36],
    functions: ['list-comprehension'],
    difficulty: 'easy',
    hint: {
      text: 'The simplest comprehension form is just [expression for item in iterable] — a pure transform, no filtering.'
    }
  },
  {
    id: 3,
    title: 'Problem 3',
    question: 'Given a list of numbers, keep only the positive ones',
    sampleData: 'numbers = [-3, 5, -1, 8, 0, -7, 2]',
    solution: `positives = [n for n in numbers if n > 0]
print(positives)`,
    output: [5, 8, 2],
    functions: ['list-comprehension'],
    difficulty: 'easy',
    hint: {
      text: 'A comprehension can filter without transforming at all — the expression can just be the loop variable itself, unchanged.'
    }
  },
  {
    id: 4,
    title: 'Problem 4',
    question: 'Given a list of words, uppercase the ones that start with a vowel',
    sampleData: `words = ["apple", "banana", "orange", "kiwi", "egg"]`,
    solution: `vowel_words = [w.upper() for w in words if w[0] in "aeiou"]
print(vowel_words)`,
    output: ['APPLE', 'ORANGE', 'EGG'],
    functions: ['list-comprehension'],
    difficulty: 'medium',
    hint: {
      text: 'A string is a sequence of characters, so w[0] in "aeiou" checks whether that one character is a member of the string — the same `in` check you\'d use against a list.'
    }
  },
  {
    id: 5,
    title: 'Problem 5',
    question: 'Flatten this list of lists into a single list',
    sampleData: 'matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]',
    solution: `flat = [n for row in matrix for n in row]
print(flat)`,
    output: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    functions: ['list-comprehension'],
    difficulty: 'medium',
    hint: {
      text: 'A comprehension can have more than one for clause — they nest in the same order as writing the loops out by hand, outermost first: for row in matrix, then for n in row.'
    }
  },
  {
    id: 6,
    title: 'Problem 6',
    question: 'Label each number as "even" or "odd"',
    sampleData: 'numbers = [1, 2, 3, 4, 5]',
    solution: `labels = ["even" if n % 2 == 0 else "odd" for n in numbers]
print(labels)`,
    output: ['odd', 'even', 'odd', 'even', 'odd'],
    functions: ['list-comprehension'],
    difficulty: 'medium',
    hint: {
      text: 'This is a conditional expression (x if cond else y) sitting in the expression slot — different from a filter if at the end. A filter drops items; this keeps every item and just picks which value to use.'
    }
  },
  {
    id: 7,
    title: 'Problem 7',
    question: 'Pair each name with its length',
    sampleData: `names = ["sam", "ana", "kimberly"]`,
    solution: `name_lengths = [(name, len(name)) for name in names]
print(name_lengths)`,
    output: [
      ['sam', 3],
      ['ana', 3],
      ['kimberly', 8]
    ],
    functions: ['list-comprehension'],
    difficulty: 'easy',
    hint: {
      text: 'The expression can build anything, including a tuple — (name, len(name)) pairs each item with a value computed from it.'
    }
  },
  {
    id: 8,
    title: 'Problem 8',
    question: 'Clean up this list by removing the extra whitespace around each entry',
    sampleData: `raw = ["  sam ", "ana  ", " kim"]`,
    solution: `cleaned = [s.strip() for s in raw]
print(cleaned)`,
    output: ['sam', 'ana', 'kim'],
    functions: ['list-comprehension'],
    difficulty: 'easy',
    hint: {
      text: '.strip() removes leading and trailing whitespace from a string. Running it inside a comprehension is a common one-line cleanup pass over a whole list.'
    }
  },
  {
    id: 9,
    title: 'Problem 9',
    question: 'Build a list of "item: price" labels from this dictionary',
    sampleData: `prices = {"apple": 1.5, "bread": 3.0, "milk": 2.25}`,
    solution: `labels = [f"{item}: {price}" for item, price in prices.items()]
print(labels)`,
    output: ['apple: 1.5', 'bread: 3.0', 'milk: 2.25'],
    functions: ['list-comprehension'],
    difficulty: 'medium',
    hint: {
      text: 'A comprehension can iterate over anything, not just a list — dict.items() yields (key, value) pairs, unpacked directly in the for clause.'
    }
  },
  {
    id: 10,
    title: 'Problem 10',
    question: 'From this list, keep only the numbers divisible by both 2 and 3',
    sampleData: 'numbers = [4, 6, 9, 12, 15, 18, 20, 24, 30, 35]',
    solution: `both = [n for n in numbers if n % 2 == 0 if n % 3 == 0]
print(both)`,
    output: [6, 12, 18, 24, 30],
    functions: ['list-comprehension'],
    difficulty: 'medium',
    hint: {
      text: 'Chaining multiple if clauses in a comprehension ANDs them together — equivalent to one if with n % 2 == 0 and n % 3 == 0.'
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
    id: 12,
    title: 'Problem 12',
    question: 'Invert this dictionary so its values become the keys and vice versa',
    sampleData: `codes = {"US": 1, "UK": 44, "FR": 33}`,
    solution: `by_code = {value: key for key, value in codes.items()}
print(by_code)`,
    output: { 1: 'US', 44: 'UK', 33: 'FR' },
    functions: ['dict-comprehension'],
    difficulty: 'medium',
    hint: {
      text: 'Swapping key: value to value: key inverts the mapping. This only works cleanly when the original values are unique — a repeated value would silently overwrite an earlier entry.'
    }
  },
  {
    id: 13,
    title: 'Problem 13',
    question: 'Keep only the entries with a passing score (60 or above)',
    sampleData: `scores = {"sam": 62, "ana": 91, "kim": 45, "tom": 78}`,
    solution: `passing = {name: score for name, score in scores.items() if score >= 60}
print(passing)`,
    output: { sam: 62, ana: 91, tom: 78 },
    functions: ['dict-comprehension'],
    difficulty: 'easy',
    hint: {
      text: 'A dict comprehension can filter too — the if goes after the for clause, same placement as in a list comprehension.'
    }
  },
  {
    id: 14,
    title: 'Problem 14',
    question: 'Combine these two parallel lists into a single dictionary',
    sampleData: `keys = ["a", "b", "c"]
values = [1, 2, 3]`,
    solution: `combined = {k: v for k, v in zip(keys, values)}
print(combined)`,
    output: { a: 1, b: 2, c: 3 },
    functions: ['dict-comprehension', 'zip'],
    difficulty: 'easy',
    hint: {
      text: 'zip(a, b) pairs up items from two sequences positionally into tuples. For a plain pairing like this with no transform, dict(zip(keys, values)) does the same thing directly, without needing a comprehension at all.'
    }
  },
  {
    id: 15,
    title: 'Problem 15',
    question: 'Build a dictionary mapping each word\'s position to the word itself',
    sampleData: `words = ["red", "green", "blue"]`,
    solution: `by_index = {i: word for i, word in enumerate(words)}
print(by_index)`,
    output: { 0: 'red', 1: 'green', 2: 'blue' },
    functions: ['dict-comprehension', 'enumerate'],
    difficulty: 'easy',
    hint: {
      text: 'enumerate() yields (index, item) pairs as you iterate — unpack them directly in the for clause, the same way as any other pair-yielding iterable.'
    }
  },
  {
    id: 16,
    title: 'Problem 16',
    question: 'Double every price in this dictionary',
    sampleData: `prices = {"apple": 1.5, "bread": 3.0, "milk": 2.25}`,
    solution: `doubled = {item: price * 2 for item, price in prices.items()}
print(doubled)`,
    output: { apple: 3, bread: 6, milk: 4.5 },
    functions: ['dict-comprehension'],
    difficulty: 'easy',
    hint: {
      text: 'The keys can pass through unchanged while only the value expression transforms — item stays as-is, price * 2 does the work.'
    }
  },
  {
    id: 17,
    title: 'Problem 17',
    question: 'Lowercase every key in this dictionary',
    sampleData: `raw = {"NAME": "Sam", "AGE": 30, "CITY": "Boston"}`,
    solution: `normalized = {key.lower(): value for key, value in raw.items()}
print(normalized)`,
    output: { name: 'Sam', age: 30, city: 'Boston' },
    functions: ['dict-comprehension'],
    difficulty: 'easy',
    hint: {
      text: 'This time the key expression does the work (key.lower()) while the value passes through unchanged — either side of the : can be any expression, independently of the other.'
    }
  },
  {
    id: 18,
    title: 'Problem 18',
    question: 'Label each score as "pass" or "fail" (passing is 60 or above)',
    sampleData: `scores = {"sam": 62, "ana": 91, "kim": 45}`,
    solution: `results = {name: ("pass" if score >= 60 else "fail") for name, score in scores.items()}
print(results)`,
    output: { sam: 'pass', ana: 'pass', kim: 'fail' },
    functions: ['dict-comprehension'],
    difficulty: 'medium',
    hint: {
      text: 'A conditional expression works as the value side of a dict comprehension the same way it does in a list comprehension\'s expression slot — the parentheses here are just for readability, not required.'
    }
  },
  {
    id: 19,
    title: 'Problem 19',
    question: 'Given a dictionary of people with nested details, build name -> age',
    sampleData: `people = {
    "sam": {"age": 39, "city": "Boston"},
    "ana": {"age": 28, "city": "Miami"},
}`,
    solution: `ages = {name: info["age"] for name, info in people.items()}
print(ages)`,
    output: { sam: 39, ana: 28 },
    functions: ['dict-comprehension'],
    difficulty: 'medium',
    hint: {
      text: 'The value from .items() can be anything — here it\'s itself a dictionary, so info["age"] just indexes into it like any other dict.'
    }
  },
  {
    id: 20,
    title: 'Problem 20',
    question: 'For each candidate action, record whether it appears in the allowed set',
    sampleData: `allowed = {"read", "write"}
candidates = ["read", "delete", "write", "execute"]`,
    solution: `access = {action: (action in allowed) for action in candidates}
print(access)`,
    output: { read: true, delete: false, write: true, execute: false },
    functions: ['dict-comprehension', 'set'],
    difficulty: 'medium',
    hint: {
      text: 'in checks membership against any collection. Checking against a set (rather than a list) is much faster for larger collections, since sets use hashing instead of scanning item by item.'
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
    id: 22,
    title: 'Problem 22',
    question: 'Format this population figure with thousands separators',
    sampleData: 'population = 8419600',
    solution: `label = f"{population:,}"
print(label)`,
    output: '8,419,600',
    functions: ['f-string'],
    difficulty: 'easy',
    hint: {
      text: 'The , format spec inserts thousands separators automatically — no manual string manipulation needed.'
    }
  },
  {
    id: 23,
    title: 'Problem 23',
    question: 'Build a table row: the name left-aligned in 10 characters, the score right-aligned in 5',
    sampleData: `name = "Sam"
score = 91`,
    solution: `row = f"{name:<10}{score:>5}"
print(row)`,
    output: 'Sam'.padEnd(10) + String(91).padStart(5),
    functions: ['f-string'],
    difficulty: 'medium',
    hint: {
      text: '< left-aligns and > right-aligns within the given width, padding with spaces — the basis for lining up simple text tables.'
    }
  },
  {
    id: 24,
    title: 'Problem 24',
    question: 'Report how many items are in this list, as a sentence',
    sampleData: `items = ["apple", "banana", "cherry", "date"]`,
    solution: `summary = f"You have {len(items)} items"
print(summary)`,
    output: 'You have 4 items',
    functions: ['f-string'],
    difficulty: 'easy',
    hint: {
      text: 'Any valid Python expression can go inside {} — not just a variable name, but a function call like len(items) too.'
    }
  },
  {
    id: 25,
    title: 'Problem 25',
    question: 'Report this score as a percentage with one decimal place',
    sampleData: `correct = 17
total = 20`,
    solution: `accuracy = f"{correct / total:.1%}"
print(accuracy)`,
    output: '85.0%',
    functions: ['f-string'],
    difficulty: 'medium',
    hint: {
      text: 'The % format spec multiplies by 100, appends a % sign, and rounds to the given decimal places, all in one step — no manual * 100 needed.'
    }
  },
  {
    id: 26,
    title: 'Problem 26',
    question: 'Build a list of "name xQty" labels from these (name, quantity) pairs',
    sampleData: `items = [("apple", 3), ("bread", 2), ("milk", 1)]`,
    solution: `labels = [f"{name} x{qty}" for name, qty in items]
print(labels)`,
    output: ['apple x3', 'bread x2', 'milk x1'],
    functions: ['f-string', 'list-comprehension'],
    difficulty: 'medium',
    hint: {
      text: 'f-strings and comprehensions combine naturally — the f-string is just the expression a comprehension builds on each pass.'
    }
  },
  {
    id: 27,
    title: 'Problem 27',
    question: 'Build a short bio string from these three pieces of data',
    sampleData: `first = "Ada"
last = "Lovelace"
year = 1815`,
    solution: `bio = f"{first} {last}, born {year}"
print(bio)`,
    output: 'Ada Lovelace, born 1815',
    functions: ['f-string'],
    difficulty: 'easy',
    hint: {
      text: 'An f-string can hold as many {} placeholders as you like, mixed freely with ordinary text.'
    }
  },
  {
    id: 28,
    title: 'Problem 28',
    question: 'Print the area of this circle using Python\'s self-documenting f-string syntax',
    sampleData: 'radius = 4',
    solution: `area = 3.14159 * radius ** 2
print(f"{area=}")`,
    output: 'area=50.26544',
    functions: ['f-string'],
    difficulty: 'medium',
    hint: {
      text: 'Adding = right before the closing brace prints both the expression\'s source text and its value — a quick debugging shortcut for f"area={area}" written by hand.'
    }
  },
  {
    id: 29,
    title: 'Problem 29',
    question: 'Describe the weather as "hot" (80 or above) or "mild"',
    sampleData: 'temperature = 72',
    solution: `label = f"It's {'hot' if temperature >= 80 else 'mild'} today"
print(label)`,
    output: "It's mild today",
    functions: ['f-string'],
    difficulty: 'medium',
    hint: {
      text: 'A placeholder can hold any expression, including a conditional one — just use a different quote style inside the braces than the f-string\'s own outer quotes.'
    }
  },
  {
    id: 30,
    title: 'Problem 30',
    question: 'Format this ticket number as a 3-digit code with leading zeros',
    sampleData: 'ticket_number = 42',
    solution: `code = f"TICKET-{ticket_number:03d}"
print(code)`,
    output: 'TICKET-042',
    functions: ['f-string'],
    difficulty: 'easy',
    hint: {
      text: '03d pads an integer to at least 3 digits with leading zeros — common for ids, codes, and timestamps.'
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
