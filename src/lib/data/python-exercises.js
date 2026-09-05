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
    id: 32,
    title: 'Problem 32',
    question: 'Sort these words alphabetically, ignoring letter case',
    sampleData: `words = ["banana", "Apple", "cherry", "Fig"]`,
    solution: `alphabetical = sorted(words, key=str.lower)
print(alphabetical)`,
    output: ['Apple', 'banana', 'cherry', 'Fig'],
    functions: ['sorted'],
    difficulty: 'easy',
    hint: {
      text: 'key=str.lower applies .lower() to each item before comparing, without changing the items themselves — this sorts case-insensitively without calling .lower() by hand in a loop.'
    }
  },
  {
    id: 33,
    title: 'Problem 33',
    question: 'Sort these words from shortest to longest',
    sampleData: `words = ["kiwi", "fig", "banana", "date"]`,
    solution: `by_length = sorted(words, key=len)
print(by_length)`,
    output: ['fig', 'kiwi', 'date', 'banana'],
    functions: ['sorted'],
    difficulty: 'easy',
    hint: {
      text: 'key= can be any function, including a builtin like len — words with equal length keep their original relative order, since sorted() is stable.'
    }
  },
  {
    id: 34,
    title: 'Problem 34',
    question: 'Sort these people by age, then return just their names in that order',
    sampleData: `people = [{"name": "sam", "age": 39}, {"name": "ana", "age": 28}, {"name": "kim", "age": 45}]`,
    solution: `by_age = sorted(people, key=lambda person: person["age"])
print([p["name"] for p in by_age])`,
    output: ['ana', 'sam', 'kim'],
    functions: ['sorted', 'lambda'],
    difficulty: 'medium',
    hint: {
      text: 'The key function can look up a field on each item — sorting a list of dicts by one of their values is one of the most common uses of key=.'
    }
  },
  {
    id: 35,
    title: 'Problem 35',
    question: 'Sort these words by length, and alphabetically among words of the same length',
    sampleData: `words = ["fig", "kiwi", "date", "pear", "kale"]`,
    solution: `ranked = sorted(words, key=lambda w: (len(w), w))
print(ranked)`,
    output: ['fig', 'date', 'kale', 'kiwi', 'pear'],
    functions: ['sorted'],
    difficulty: 'hard',
    hint: {
      text: 'A tuple key sorts by its first element, then breaks ties using the next — (len(w), w) sorts by length first, alphabetically within the same length.'
    }
  },
  {
    id: 36,
    title: 'Problem 36',
    question: 'Sort these names in reverse alphabetical order',
    sampleData: `names = ["sam", "ana", "kim"]`,
    solution: `reverse_alpha = sorted(names, reverse=True)
print(reverse_alpha)`,
    output: ['sam', 'kim', 'ana'],
    functions: ['sorted'],
    difficulty: 'easy',
    hint: {
      text: 'reverse=True flips the sort direction without needing a custom key — use it whenever the default ordering is right, just backwards.'
    }
  },
  {
    id: 37,
    title: 'Problem 37',
    question: 'Sort these words by their last letter',
    sampleData: `words = ["cat", "dog", "ant", "owl"]`,
    solution: `by_last_letter = sorted(words, key=lambda w: w[-1])
print(by_last_letter)`,
    output: ['dog', 'owl', 'cat', 'ant'],
    functions: ['sorted'],
    difficulty: 'medium',
    hint: {
      text: 'The key function can extract just one character (or any slice) from each item — w[-1] looks at the last letter only, ignoring the rest of the word.'
    }
  },
  {
    id: 38,
    title: 'Problem 38',
    question: 'Find the three highest scores in this list',
    sampleData: `scores = [55, 92, 78, 61, 89, 73]`,
    solution: `top_three = sorted(scores, reverse=True)[:3]
print(top_three)`,
    output: [92, 89, 78],
    functions: ['sorted', 'slice'],
    difficulty: 'medium',
    hint: {
      text: 'sorted() and slicing combine naturally: sort descending, then take the first few — a common pattern for "top N" style problems.'
    }
  },
  {
    id: 39,
    title: 'Problem 39',
    question: 'Sort this list, then show that the original list was never changed',
    sampleData: `original = [3, 1, 2]`,
    solution: `ordered = sorted(original)
print(original)`,
    output: [3, 1, 2],
    functions: ['sorted'],
    difficulty: 'easy',
    hint: {
      text: 'sorted() always returns a new list, leaving the original untouched — unlike the in-place list.sort() method, which mutates the list and returns None.'
    }
  },
  {
    id: 40,
    title: 'Problem 40',
    question: 'Sort these numbers by their distance from zero, ignoring sign',
    sampleData: `numbers = [-7, 3, -1, 5, -4]`,
    solution: `by_magnitude = sorted(numbers, key=abs)
print(by_magnitude)`,
    output: [-1, 3, -4, 5, -7],
    functions: ['sorted'],
    difficulty: 'medium',
    hint: {
      text: 'key=abs sorts by each number\'s absolute value while leaving the numbers themselves (sign included) in the output unchanged.'
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
    id: 42,
    title: 'Problem 42',
    question: 'Find the positions in this list where the value is 7',
    sampleData: 'numbers = [4, 7, 2, 9, 7, 3]',
    solution: `seven_indices = [i for i, n in enumerate(numbers) if n == 7]
print(seven_indices)`,
    output: [1, 4],
    functions: ['enumerate', 'list-comprehension'],
    difficulty: 'medium',
    hint: {
      text: 'enumerate() pairs each item with its index, so a comprehension can filter on the value while collecting the index instead of the value itself.'
    }
  },
  {
    id: 43,
    title: 'Problem 43',
    question: 'Assign each task a ticket id, counting up from 100',
    sampleData: `tasks = ["design", "build", "test"]`,
    solution: `ids = [f"TASK-{n}" for n, task in enumerate(tasks, start=100)]
print(ids)`,
    output: ['TASK-100', 'TASK-101', 'TASK-102'],
    functions: ['enumerate', 'f-string'],
    difficulty: 'easy',
    hint: {
      text: 'start= isn\'t limited to 0 or 1 — enumerate can begin counting from any number, handy for ids, ticket numbers, or anything with its own numbering scheme.'
    }
  },
  {
    id: 44,
    title: 'Problem 44',
    question: 'Pair each character in this word with its position',
    sampleData: 'word = "hello"',
    solution: `positions = [(i, ch) for i, ch in enumerate(word)]
print(positions)`,
    output: [
      [0, 'h'],
      [1, 'e'],
      [2, 'l'],
      [3, 'l'],
      [4, 'o']
    ],
    functions: ['enumerate'],
    difficulty: 'easy',
    hint: {
      text: 'enumerate works on any iterable, including strings — each character comes paired with its position, the same as it would for a list.'
    }
  },
  {
    id: 45,
    title: 'Problem 45',
    question: 'Find the index of the first grade that is 90 or above',
    sampleData: 'grades = [72, 85, 91, 68, 77]',
    solution: `matches = [i for i, grade in enumerate(grades) if grade >= 90]
first_A_index = matches[0]
print(first_A_index)`,
    output: 2,
    functions: ['enumerate', 'list-comprehension'],
    difficulty: 'medium',
    hint: {
      text: 'Collecting every matching index and then taking the first one is a simple way to answer "where is the first match", without a manual loop that stops early.'
    }
  },
  {
    id: 46,
    title: 'Problem 46',
    question: 'Increase every price in this list by 10%, updating it in place',
    sampleData: 'prices = [10, 20, 30]',
    solution: `for i, price in enumerate(prices):
    prices[i] = price * 1.1
print(prices)`,
    output: [11, 22, 33],
    functions: ['enumerate'],
    difficulty: 'medium',
    hint: {
      text: 'enumerate() gives you the index alongside the value, so you can write back into the original list at that position — something a plain "for price in prices" loop can\'t do, since price is just a copy of each value.'
    }
  },
  {
    id: 47,
    title: 'Problem 47',
    question: 'Collect only the items sitting at an even position (0, 2, 4, ...)',
    sampleData: `items = ["a", "b", "c", "d", "e", "f"]`,
    solution: `even_position_items = [item for i, item in enumerate(items) if i % 2 == 0]
print(even_position_items)`,
    output: ['a', 'c', 'e'],
    functions: ['enumerate', 'list-comprehension'],
    difficulty: 'medium',
    hint: {
      text: "enumerate's index can be used in the condition too, not just the value — filtering by position (like every other item) is a common use for it."
    }
  },
  {
    id: 48,
    title: 'Problem 48',
    question: 'Find the index of the highest score in this list',
    sampleData: 'scores = [55, 92, 78, 91, 60]',
    solution: `best_index, best_score = max(enumerate(scores), key=lambda pair: pair[1])
print(best_index)`,
    output: 1,
    functions: ['enumerate'],
    difficulty: 'hard',
    hint: {
      text: 'enumerate(scores) yields (index, value) pairs; max() with key=lambda pair: pair[1] picks the pair whose value is largest, and unpacking pulls both parts out in one line.'
    }
  },
  {
    id: 49,
    title: 'Problem 49',
    question: 'Pair each name with the score at the same position in the other list',
    sampleData: `names = ["sam", "ana", "kim"]
scores = [91, 78, 85]`,
    solution: `pairs = [(name, scores[i]) for i, name in enumerate(names)]
print(pairs)`,
    output: [
      ['sam', 91],
      ['ana', 78],
      ['kim', 85]
    ],
    functions: ['enumerate'],
    difficulty: 'medium',
    hint: {
      text: 'This works by using the index to reach into the second list — though when you don\'t otherwise need the index, zip(names, scores) does the same pairing more directly.'
    }
  },
  {
    id: 50,
    title: 'Problem 50',
    question: 'Label each item in the queue with how many are left, including itself',
    sampleData: `queue = ["first", "second", "third"]`,
    solution: `remaining = [f"{len(queue) - i} left: {item}" for i, item in enumerate(queue)]
print(remaining)`,
    output: ['3 left: first', '2 left: second', '1 left: third'],
    functions: ['enumerate', 'f-string'],
    difficulty: 'medium',
    hint: {
      text: 'The index from enumerate can feed into any calculation, not just direct numbering — here it\'s used to count down instead of up.'
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
    id: 52,
    title: 'Problem 52',
    question: 'Swap the values of a and b without using a temporary variable',
    sampleData: 'a = 1\nb = 2',
    solution: `a, b = b, a
print([a, b])`,
    output: [2, 1],
    functions: ['unpacking'],
    difficulty: 'easy',
    hint: {
      text: 'The right side builds a tuple (b, a) first, then unpacks it into a, b — this is how Python swaps values without a temporary variable.'
    }
  },
  {
    id: 53,
    title: 'Problem 53',
    question: 'Unpack this point into its x and y coordinates',
    sampleData: 'point = (3, 7)',
    solution: `x, y = point
print(f"x={x}, y={y}")`,
    output: 'x=3, y=7',
    functions: ['unpacking', 'f-string'],
    difficulty: 'easy',
    hint: {
      text: 'A tuple on the right can be unpacked directly into separate names on the left, one name per position.'
    }
  },
  {
    id: 54,
    title: 'Problem 54',
    question: 'Get the first and last score, discarding everything in between',
    sampleData: 'scores = [88, 91, 76, 82, 95]',
    solution: `first, *_, last = scores
print([first, last])`,
    output: [88, 95],
    functions: ['unpacking'],
    difficulty: 'medium',
    hint: {
      text: 'An underscore is a normal variable name, conventionally used to mean "I don\'t need this" — *_ absorbs everything between first and last without naming it meaningfully.'
    }
  },
  {
    id: 55,
    title: 'Problem 55',
    question: 'Unpack this nested record into name, age, and city',
    sampleData: 'record = ("sam", (39, "Boston"))',
    solution: `name, (age, city) = record
print(f"{name} is {age} and lives in {city}")`,
    output: 'sam is 39 and lives in Boston',
    functions: ['unpacking', 'f-string'],
    difficulty: 'hard',
    hint: {
      text: 'The pattern on the left can nest to mirror the structure being unpacked — (age, city) matches the inner tuple directly.'
    }
  },
  {
    id: 56,
    title: 'Problem 56',
    question: 'Capture both values this function returns',
    sampleData: `def min_and_max(nums):
    return min(nums), max(nums)

numbers = [4, 8, 1, 9, 3]`,
    solution: `low, high = min_and_max(numbers)
print([low, high])`,
    output: [1, 9],
    functions: ['unpacking'],
    difficulty: 'medium',
    hint: {
      text: 'A function that returns multiple comma-separated values is really returning one tuple — unpacking on the calling side splits it back into separate names.'
    }
  },
  {
    id: 57,
    title: 'Problem 57',
    question: 'Swap the first and last items of this list, in place',
    sampleData: `items = ["a", "b", "c", "d"]`,
    solution: `items[0], items[-1] = items[-1], items[0]
print(items)`,
    output: ['d', 'b', 'c', 'a'],
    functions: ['unpacking'],
    difficulty: 'medium',
    hint: {
      text: 'Unpacking assignment works on list elements too, not just plain variables — this swaps the first and last items without a temporary variable.'
    }
  },
  {
    id: 58,
    title: 'Problem 58',
    question: 'Call this function by spreading a list into its three separate arguments',
    sampleData: `def volume(length, width, height):
    return length * width * height

dimensions = [2, 3, 4]`,
    solution: `result = volume(*dimensions)
print(result)`,
    output: 24,
    functions: ['unpacking'],
    difficulty: 'medium',
    hint: {
      text: '* isn\'t only for the left side of an assignment — using it in a function call spreads a list\'s items into separate positional arguments, as if you\'d written volume(2, 3, 4) by hand.'
    }
  },
  {
    id: 59,
    title: 'Problem 59',
    question: 'Call this function by spreading a dictionary into its keyword arguments',
    sampleData: `def greet(name, greeting):
    return f"{greeting}, {name}!"

info = {"name": "Ana", "greeting": "Hello"}`,
    solution: `message = greet(**info)
print(message)`,
    output: 'Hello, Ana!',
    functions: ['unpacking'],
    difficulty: 'medium',
    hint: {
      text: '** spreads a dict\'s key/value pairs into keyword arguments — the dict\'s keys must match the function\'s parameter names exactly.'
    }
  },
  {
    id: 60,
    title: 'Problem 60',
    question: 'Unpack this RGB color tuple and format it as a hex color code',
    sampleData: 'color = (255, 128, 0)',
    solution: `red, green, blue = color
print(f"#{red:02x}{green:02x}{blue:02x}")`,
    output: '#ff8000',
    functions: ['unpacking', 'f-string'],
    difficulty: 'hard',
    hint: {
      text: 'Unpacking three values needs exactly three names on the left. The :02x format spec used here converts each number to two-digit hexadecimal, handy for color codes.'
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
    id: 62,
    title: 'Problem 62',
    question: 'Report whether at least one number in the list is even',
    sampleData: 'numbers = [3, 7, 12, 9]',
    solution: `has_even = any(n % 2 == 0 for n in numbers)
print(has_even)`,
    output: true,
    functions: ['any'],
    difficulty: 'easy',
    hint: {
      text: 'any() stops checking as soon as it finds one item that passes, rather than scanning the whole list every time.'
    }
  },
  {
    id: 63,
    title: 'Problem 63',
    question: 'Report whether every word in this list starts with a capital letter',
    sampleData: `words = ["Cat", "Dog", "Owl"]`,
    solution: `all_capitalized = all(word[0].isupper() for word in words)
print(all_capitalized)`,
    output: true,
    functions: ['all'],
    difficulty: 'easy',
    hint: {
      text: 'The expression inside all() can be as rich as needed — here it checks a single character\'s case via .isupper() on each word.'
    }
  },
  {
    id: 64,
    title: 'Problem 64',
    question: 'Report whether at least one of these users is active',
    sampleData: `users = [{"name": "sam", "active": False}, {"name": "ana", "active": True}]`,
    solution: `has_active_user = any(user["active"] for user in users)
print(has_active_user)`,
    output: true,
    functions: ['any'],
    difficulty: 'medium',
    hint: {
      text: 'The generator expression can be any boolean-ish expression per item — here it\'s just reading a field that\'s already True/False.'
    }
  },
  {
    id: 65,
    title: 'Problem 65',
    question: 'Report whether every number in this empty list is positive',
    sampleData: 'numbers = []',
    solution: `all_positive = all(n > 0 for n in numbers)
print(all_positive)`,
    output: true,
    functions: ['all'],
    difficulty: 'hard',
    hint: {
      text: 'all() on an empty iterable is always True — there\'s nothing to fail the check. This is called "vacuous truth", and it surprises a lot of people the first time they hit it.'
    }
  },
  {
    id: 66,
    title: 'Problem 66',
    question: 'Report whether any number in this empty list is positive',
    sampleData: 'numbers = []',
    solution: `any_positive = any(n > 0 for n in numbers)
print(any_positive)`,
    output: false,
    functions: ['any'],
    difficulty: 'hard',
    hint: {
      text: 'any() on an empty iterable is always False, the mirror image of all()\'s vacuous-truth True — there\'s nothing that could have passed.'
    }
  },
  {
    id: 67,
    title: 'Problem 67',
    question: 'Report whether at least one of these passwords is long and not purely alphabetic',
    sampleData: `passwords = ["abc123", "password", "Xk9#mP2"]`,
    solution: `has_strong_password = any(len(p) >= 7 and not p.isalpha() for p in passwords)
print(has_strong_password)`,
    output: true,
    functions: ['any'],
    difficulty: 'hard',
    hint: {
      text: 'The condition inside any() can combine multiple checks with and/or, just like a regular if statement would.'
    }
  },
  {
    id: 68,
    title: 'Problem 68',
    question: 'Report whether every temperature in this list is a comfortable value (65 to 80 inclusive)',
    sampleData: 'temperatures = [68, 72, 75, 70]',
    solution: `all_comfortable = all(65 <= t <= 80 for t in temperatures)
print(all_comfortable)`,
    output: true,
    functions: ['all'],
    difficulty: 'medium',
    hint: {
      text: 'Python allows chained comparisons like 65 <= t <= 80 — it reads naturally as "t is between 65 and 80", rather than needing 65 <= t and t <= 80.'
    }
  },
  {
    id: 69,
    title: 'Problem 69',
    question: 'Report whether any of the wanted items are actually available',
    sampleData: `wanted = ["apple", "kiwi"]
available = ["banana", "kiwi", "cherry"]`,
    solution: `can_fulfill = any(item in available for item in wanted)
print(can_fulfill)`,
    output: true,
    functions: ['any'],
    difficulty: 'medium',
    hint: {
      text: 'any() combined with in checks overlap between two collections, stopping as soon as one match is found.'
    }
  },
  {
    id: 70,
    title: 'Problem 70',
    question: 'Report whether this list of numbers is already sorted in ascending order',
    sampleData: 'numbers = [3, 5, 5, 8, 10]',
    solution: `is_sorted = all(numbers[i] <= numbers[i + 1] for i in range(len(numbers) - 1))
print(is_sorted)`,
    output: true,
    functions: ['all', 'range'],
    difficulty: 'hard',
    hint: {
      text: 'Comparing each item to its neighbor checks the whole sequence is non-decreasing — range(len(numbers) - 1) stops one short so numbers[i + 1] never runs past the end.'
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
    id: 72,
    title: 'Problem 72',
    question: 'Get the first three letters from this list',
    sampleData: `letters = ["a", "b", "c", "d", "e", "f"]`,
    solution: `first_three = letters[:3]
print(first_three)`,
    output: ['a', 'b', 'c'],
    functions: ['slice'],
    difficulty: 'easy',
    hint: {
      text: 'Leaving off the start in a slice defaults to the beginning — list[:3] means "from the start, up to (not including) index 3".'
    }
  },
  {
    id: 73,
    title: 'Problem 73',
    question: 'Get the last two letters from this list',
    sampleData: `letters = ["a", "b", "c", "d", "e", "f"]`,
    solution: `last_two = letters[-2:]
print(last_two)`,
    output: ['e', 'f'],
    functions: ['slice'],
    difficulty: 'easy',
    hint: {
      text: 'A negative start counts from the end — list[-2:] means "starting two from the end, through the rest of the list".'
    }
  },
  {
    id: 74,
    title: 'Problem 74',
    question: 'Get every second number from this list, starting from the first',
    sampleData: 'numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]',
    solution: `evens_by_position = numbers[::2]
print(evens_by_position)`,
    output: [0, 2, 4, 6, 8],
    functions: ['slice'],
    difficulty: 'medium',
    hint: {
      text: 'The third slice value is the step — [::2] takes every second item starting from the beginning, without needing a comprehension or condition.'
    }
  },
  {
    id: 75,
    title: 'Problem 75',
    question: 'Replace the middle three items of this list with two new values',
    sampleData: 'items = [1, 2, 3, 4, 5]',
    solution: `items[1:4] = [20, 30]
print(items)`,
    output: [1, 20, 30, 5],
    functions: ['slice'],
    difficulty: 'hard',
    hint: {
      text: 'A slice can appear on the left side of an assignment too — this replaces items[1:4] with a new (possibly different-length) chunk, shrinking or growing the list as needed.'
    }
  },
  {
    id: 76,
    title: 'Problem 76',
    question: 'Extract just the area code from this phone number string',
    sampleData: 'phone = "555-123-4567"',
    solution: `area_code = phone[:3]
print(area_code)`,
    output: '555',
    functions: ['slice'],
    difficulty: 'easy',
    hint: {
      text: 'Strings support the exact same slicing syntax as lists — slice[start:stop] on a string returns a substring.'
    }
  },
  {
    id: 77,
    title: 'Problem 77',
    question: 'Get everyone in this queue except the first and last person',
    sampleData: `queue = ["sam", "ana", "kim", "tom", "lee"]`,
    solution: `middle = queue[1:-1]
print(middle)`,
    output: ['ana', 'kim', 'tom'],
    functions: ['slice'],
    difficulty: 'medium',
    hint: {
      text: 'Mixing a positive start with a negative stop is a common way to say "everything except the first and last item".'
    }
  },
  {
    id: 78,
    title: 'Problem 78',
    question: 'Make an independent copy of this list, then show the original is unaffected by changes to the copy',
    sampleData: 'original = [1, 2, 3]',
    solution: `copy = original[:]
copy.append(4)
print(original)`,
    output: [1, 2, 3],
    functions: ['slice'],
    difficulty: 'medium',
    hint: {
      text: 'original[:] (a full slice) makes a real, independent copy — unlike copy = original, which would just be another name for the same list, so mutating one would affect the other too.'
    }
  },
  {
    id: 79,
    title: 'Problem 79',
    question: 'Get every second number from this list, in reverse order',
    sampleData: 'numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]',
    solution: `every_other_reversed = numbers[::-2]
print(every_other_reversed)`,
    output: [9, 7, 5, 3, 1],
    functions: ['slice'],
    difficulty: 'hard',
    hint: {
      text: 'A negative step walks backwards through the list — [::-2] starts at the end and takes every second item from there.'
    }
  },
  {
    id: 80,
    title: 'Problem 80',
    question: 'Split this list into two halves',
    sampleData: 'numbers = [1, 2, 3, 4, 5, 6]',
    solution: `midpoint = len(numbers) // 2
first_half = numbers[:midpoint]
second_half = numbers[midpoint:]
print([first_half, second_half])`,
    output: [
      [1, 2, 3],
      [4, 5, 6]
    ],
    functions: ['slice'],
    difficulty: 'medium',
    hint: {
      text: 'Computing the midpoint with integer division (//) first, then slicing on either side of it, is the standard way to split a sequence in half regardless of its length.'
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
  },
  {
    id: 82,
    title: 'Problem 82',
    question: 'Build a list of numbers from 0 up to (but not including) count',
    sampleData: 'count = 5',
    solution: `numbers = list(range(count))
print(numbers)`,
    output: [0, 1, 2, 3, 4],
    functions: ['range'],
    difficulty: 'easy',
    hint: {
      text: 'range() with just one argument counts from 0 up to (but not including) that value — the same default starting point as enumerate().'
    }
  },
  {
    id: 83,
    title: 'Problem 83',
    question: 'Build a list of numbers from start up to (but not including) stop',
    sampleData: 'start = 5\nstop = 10',
    solution: `numbers = list(range(start, stop))
print(numbers)`,
    output: [5, 6, 7, 8, 9],
    functions: ['range'],
    difficulty: 'easy',
    hint: {
      text: 'range(start, stop) counts from start up to but never including stop.'
    }
  },
  {
    id: 84,
    title: 'Problem 84',
    question: 'Count down from start to 1',
    sampleData: 'start = 10',
    solution: `countdown = list(range(start, 0, -1))
print(countdown)`,
    output: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    functions: ['range'],
    difficulty: 'medium',
    hint: {
      text: 'A negative step counts down — range(10, 0, -1) starts at 10 and stops just before 0, so 0 itself is excluded.'
    }
  },
  {
    id: 85,
    title: 'Problem 85',
    question: 'Add up every number from 1 to n',
    sampleData: 'n = 5',
    solution: `total = sum(range(1, n + 1))
print(total)`,
    output: 15,
    functions: ['range', 'sum'],
    difficulty: 'easy',
    hint: {
      text: 'sum() works directly on a range, no list() conversion needed — range(1, n + 1) includes n itself, since range stops just before its second argument.'
    }
  },
  {
    id: 86,
    title: 'Problem 86',
    question: 'Using each item\'s position, double it and collect the results',
    sampleData: `items = ["a", "b", "c"]`,
    solution: `doubled_positions = [items[i] * 2 for i in range(len(items))]
print(doubled_positions)`,
    output: ['aa', 'bb', 'cc'],
    functions: ['range', 'list-comprehension'],
    difficulty: 'medium',
    hint: {
      text: 'range(len(items)) generates valid indices for items — though when you also need the value itself (not just the index), enumerate(items) is usually the more direct tool for the job.'
    }
  },
  {
    id: 87,
    title: 'Problem 87',
    question: 'List every multiple of 7 below this limit',
    sampleData: 'limit = 50',
    solution: `multiples_of_seven = list(range(7, limit, 7))
print(multiples_of_seven)`,
    output: [7, 14, 21, 28, 35, 42, 49],
    functions: ['range'],
    difficulty: 'medium',
    hint: {
      text: 'A step doesn\'t have to be 1 or -1 — range(7, limit, 7) starts at 7 and jumps by 7 each time, landing exactly on the multiples.'
    }
  },
  {
    id: 88,
    title: 'Problem 88',
    question: 'Build a list of numbers from 1 up to (but not including) n',
    sampleData: 'n = 5',
    solution: `numbers = list(range(1, n))
print(numbers)`,
    output: [1, 2, 3, 4],
    functions: ['range'],
    difficulty: 'medium',
    hint: {
      text: 'range(1, n) stops just before n — to include n itself, you\'d need range(1, n + 1). This off-by-one is one of the most common range() mistakes.'
    }
  },
  {
    id: 89,
    title: 'Problem 89',
    question: 'List every number up to limit that is a multiple of 3 or 5',
    sampleData: 'limit = 30',
    solution: `fizz_buzz_numbers = [n for n in range(1, limit + 1) if n % 3 == 0 or n % 5 == 0]
print(fizz_buzz_numbers)`,
    output: [3, 5, 6, 9, 10, 12, 15, 18, 20, 21, 24, 25, 27, 30],
    functions: ['range', 'list-comprehension'],
    difficulty: 'hard',
    hint: {
      text: 'range() combines with a comprehension\'s if clause the same way any other iterable does — the classic "FizzBuzz" condition is just an or of two modulo checks.'
    }
  },
  {
    id: 90,
    title: 'Problem 90',
    question: 'Check what type of object range() actually produces',
    sampleData: 'r = range(5)',
    solution: `print(type(r).__name__)`,
    output: 'range',
    functions: ['range'],
    difficulty: 'hard',
    hint: {
      text: 'range() produces a lightweight range object, not a list — it computes values on demand as you iterate, which is why wrapping it in list(...) is needed to see or compare its contents directly.'
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
