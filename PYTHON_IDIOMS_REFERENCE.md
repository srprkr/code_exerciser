# Python Idioms Reference

A quick reference for the idioms behind each of the core problem tags. Python
favors expressing *what* you want over *how* to loop and build it — that's
the thread running through all of these.

## List Comprehensions

```python
numbers = [1, 2, 3, 4, 5]

doubled = [n * 2 for n in numbers]
# [2, 4, 6, 8, 10]

evens = [n for n in numbers if n % 2 == 0]
# [2, 4]

# Both at once — transform AND filter in one expression:
doubled_evens = [n * 2 for n in numbers if n % 2 == 0]
# [4, 8]
```

The form is `[expression for item in iterable if condition]`. The `if` is
optional — leave it off and every item passes through.

This one construct covers what other languages split across `.map()` and
`.filter()`. Reaching for a comprehension is usually the first move when
building a new list from an existing one.

## Dict Comprehensions

```python
words = ["apple", "fig", "banana"]

lengths = {word: len(word) for word in words}
# {"apple": 5, "fig": 3, "banana": 6}

# Filtering works here too:
long_words = {word: len(word) for word in words if len(word) > 3}
# {"apple": 5, "banana": 6}
```

Same shape as a list comprehension, but with `{key: value ...}` instead of
`[expression ...]`. Building a lookup table from a list is the most common
use.

## f-strings

```python
name = "Sam"
score = 91

print(f"{name} scored {score}")
# Sam scored 91
```

Prefix a string with `f` and anything inside `{}` is evaluated and inserted
— no `+` concatenation, no `.format()`.

Format specs go after a colon inside the braces:

```python
price = 3.14159
f"{price:.2f}"     # "3.14"   — 2 decimal places
f"{price:>10.2f}"  # "      3.14"  — right-aligned in 10 columns
f"{1234567:,}"     # "1,234,567"   — thousands separators
```

## `sorted()`

```python
scores = [("sam", 91), ("ana", 78), ("kim", 84)]

by_score = sorted(scores, key=lambda pair: pair[1])
# [("ana", 78), ("kim", 84), ("sam", 91)]

highest_first = sorted(scores, key=lambda pair: pair[1], reverse=True)
# [("sam", 91), ("kim", 84), ("ana", 78)]
```

`sorted()` always returns a **new** list — it never touches the original.
`key=` takes a function called once per item to decide what to sort by;
`reverse=True` flips the order. (A list's own `.sort()` method sorts in
place instead, if that's what you actually want.)

## `enumerate()`

```python
fruits = ["apple", "banana", "cherry"]

for index, fruit in enumerate(fruits):
    print(index, fruit)
# 0 apple
# 1 banana
# 2 cherry

# Start counting from 1 instead of 0:
for position, fruit in enumerate(fruits, start=1):
    print(f"{position}. {fruit}")
```

`enumerate()` yields `(index, item)` pairs as you iterate, so you're never
tracking a counter by hand or indexing back into the list with `fruits[i]`.

## Unpacking

```python
point = (3, 7)
x, y = point
# x = 3, y = 7

rows = ["name", "sam", "ana", "kim"]
heading, *names = rows
# heading = "name"
# names = ["sam", "ana", "kim"]

first, *middle, last = [1, 2, 3, 4, 5]
# first = 1, middle = [2, 3, 4], last = 5
```

Assignment can destructure a sequence into separate names. A starred name
like `*rest` absorbs whatever's left over — it can go anywhere in the
pattern, not just at the end.

## `any()` / `all()`

```python
numbers = [2, 4, 6, -8]

all(n % 2 == 0 for n in numbers)  # True  — every number is even
any(n < 0 for n in numbers)       # True  — at least one is negative
all(n > 0 for n in numbers)       # False — -8 breaks it
```

Both take an iterable of `True`/`False` values (usually written as a
generator expression, dropping the `[...]` from a comprehension). `all()`
passes only if every value is true; `any()` passes if at least one is.

## Slicing

```python
letters = ["a", "b", "c", "d", "e"]

letters[1:4]    # ["b", "c", "d"]  — index 1 up to (not including) 4
letters[:3]     # ["a", "b", "c"]  — from the start
letters[-2:]    # ["d", "e"]       — the last two
letters[::-1]   # ["e", "d", "c", "b", "a"]  — reversed
letters[::2]    # ["a", "c", "e"]  — every other item
```

The full form is `sequence[start:stop:step]`. Any side left blank runs to
that end of the sequence. A negative index counts from the back; a negative
step walks backwards. Slicing works the same way on strings and tuples, not
just lists.

## `range()`

```python
list(range(5))        # [0, 1, 2, 3, 4]        — stop only
list(range(2, 8))      # [2, 3, 4, 5, 6, 7]     — start and stop
list(range(0, 10, 2))  # [0, 2, 4, 6, 8]        — with a step
list(range(10, 0, -2)) # [10, 8, 6, 4, 2]       — counting down
```

`range(start, stop, step)` counts from `start` up to but never including
`stop`. It produces values lazily rather than building a real list up
front, which is why you'll usually see it wrapped in `list(...)` or a
comprehension when you actually want to see or collect the values — most of
the time it's just driving a `for` loop directly.
