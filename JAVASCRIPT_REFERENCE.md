# JavaScript Reference

A reference for the methods and syntax behind each of the exercise tags.

## Array.map()

from: https://www.robinwieruch.de/javascript-map-array/

### Simple map function

```javascript
  const originalArray = [1, 2, 3, 4, 5];

  const newArray = originalArray.map(function addOne(number) {
    return number + 1;
  });

  console.log(originalArray);
  // [1, 2, 3, 4, 5]
  console.log(newArray);
  // [2, 3, 4, 5, 6]

```

### Anonymous map function

`addOne` has been removed.

```javascript
  const originalArray = [1, 2, 3, 4, 5];

  const newArray = originalArray.map(function (number) {
    return number + 1;
  });

  console.log(originalArray);
  // [1, 2, 3, 4, 5]
  console.log(newArray);
  // [2, 3, 4, 5, 6]

```

### Callback function as a variable

```javascript
  const originalArray = [1, 2, 3, 4, 5];

  function addOne(number) {
    return number + 1;
  }

  const newArray = originalArray.map(addOne);

  console.log(originalArray);
  // [1, 2, 3, 4, 5]
  console.log(newArray);
  // [2, 3, 4, 5, 6]

```

### For loop

Why use this fancy syntax when for loops will do?

```javascript

  const originalArray = [1, 2, 3, 4, 5];
  const newArray = [];

  for (let i = 0; i < originalArray.length; i++ ) {
    newArray[i] = originalArray[i] + 1;
  }

  console.log(originalArray);
  // [1, 2, 3, 4, 5]
  console.log(newArray);
  // [2, 3, 4, 5, 6]

```

Because: 
1. It's *built* into the language.
2. It's easier.
3. Map is *immutable* and never changes the original array (this is pretty big).

### Map with Arrow function as a callback

```javascript
  const originalArray = [1, 2, 3, 4, 5];

  const newArray = originalArray.map(number => number + 1);

  console.log(originalArray);
  // [1, 2, 3, 4, 5]
  console.log(newArray);
  // [2, 3, 4, 5, 6]
```

### Map method's callback function

The built-in params are `value`, `index`, and `array` (not as needful).

#### Value

```javascript
  [1, 2, 3].map(value => value + 1)
  // [2, 3, 4]
```

#### Index

```javascript
  [1, 2, 3].map((value, index) => index);
  // [0, 1, 2]
```

#### Array

Odds are you won't need this param so much (because you'll normally have a reference to the original array map was called on).

Here's what I mean:

```javascript
const myArray = [1, 2, 3];

// using third argument to map (array)
myArray.map((value, index, array) => {
  return array[index] + 1;
});
// [2, 3, 4]

// using the variable that holds the original array
myArray.map((value, index) => {
  return myArray[index] + 1;
});
// [2, 3, 4]

// just using map without accessing the array manually
myArray.map((value) => {
  return value + 1;
})
// [2, 3, 4]

// All three reach the same result.
```

### Map vs ForEach

If you want an array back from it, use `map`. If you're just logging results of each loop and discarding the resultant array, use `foreach`.

```javascript
const myArray = [1, 2, 3, 4];

const mapResult = myArray.map(number => {
  console.log(number);
});
// logs 1, 2, 3, 4 (one per line)
console.log(mapResult);
// [undefined, undefined, undefined, undefined]
// ^ the callback never returns anything, so map has nothing to collect —
// this is exactly the kind of accidental array you get for free by
// reaching for `map` when you didn't actually want a value back.

// nothing changes except the method we used
const forEachResult = myArray.forEach(number => {
  console.log(number);
});
// logs 1, 2, 3, 4 (one per line)
console.log(forEachResult);
// undefined  — forEach never returns anything, by design
```

#### When to use

| Map | ForEach |
|---|---|
| Rendering UI from data | Update the DOM |
| Extract specific field from list of objects | Pushing into an external accumulator (reduce is better for this) |
| Transforming data shape (API response -> app format) | API calls / side effects per item |
| Chaining with other array methods | Mutate objects in place |
| Applying a formula to every element | |

In short: Do you need an array back?

- If No, use `forEach`.
- Yes, same length transformed values -> `map`.
- Yes, but filtered to fewer items -> can use `forEach`, but `filter` is better.
- Yes, but collapsed into one value (sum, object, etc.) -> can use `forEach` but `reduce` is better.

### Using Map and Filter

Both are immutable and create new arrays. `Filter` creates a shorter array that filters *out* undesired items.

Any array removals or deletions makes `filter` the thing to use.

```javascript
const originalArray = [1, 2, undefined, 3];

const newArray = originalArray.filter(value => {
  return Number.isInteger(value);
}).map(value => {
  return value * 2;
});

console.log(newArray);
// [2, 4, 6]
```

This filters out the `undefined` and the map chaining modifies the remaining numbers.

### Using Map and Reduce

`Reduce` uses a callback function where the first param is an `accumulator` and the second is a `value` in the array (`index` is the third param but not needed as much).

Reduce *could* do the same things `map` does...

```javascript
const originalArray = [1, 2, 3, 4, 5];
const newArray = originalArray.reduce((accumulator, value, index) => {
  accumulator[index] = value * 2;
  return accumulator;
}, []);

console.log(newArray); // [2, 4, 6, 8, 10]

```
...but `map` is easier, so don't.

`Reduce` is good for control of the shape of what it returns.

```javascript
  const myArray = ['a', 'b', 'c', 'd'];

  const myObject = myArray.reduce((accumulator, value) => {
    accumulator[value] = true;
    return accumulator;
  }, {});

  console.log(myObject); // { a: true, b: true, c: true, d: true }
```

The `return accumulator;` is required — without it, the callback returns
`undefined` and the *next* call fails trying to set a property on
`undefined`. It's easy to forget when the accumulator is an object you're
mutating in place, since the mutation itself doesn't need a return — the
loop reusing that value as its next accumulator does.

## filter()

```javascript
const numbers = [1, 2, 3, 4, 5, 6];

const evens = numbers.filter(n => n % 2 === 0);
// [2, 4, 6]
```

`filter()` returns a new array containing only the elements where the
callback returns true. Like `map()`, it never touches the original array —
see [Using Map and Filter](#using-map-and-filter) above for how the two
combine.

## reduce()

```javascript
const numbers = [1, 2, 3, 4, 5];

const total = numbers.reduce((accumulator, current) => accumulator + current, 0);
// 15
```

`reduce()` collapses an array down to a single value, running the callback
once per element and carrying an accumulator forward between calls. The
second argument (`0` here) seeds the accumulator's starting value — see
[Using Map and Reduce](#using-map-and-reduce) above for reduce building up
an object or array instead of a number.

## sort()

```javascript
const numbers = [10, 1, 21, 2];

numbers.sort();
// [1, 10, 2, 21]  <- surprising! the default sort compares elements as strings

numbers.sort((a, b) => a - b);
// [1, 2, 10, 21]  numeric ascending

numbers.sort((a, b) => b - a);
// [21, 10, 2, 1]  numeric descending
```

`sort()` mutates the array in place (and also returns it). Without a compare
function it sorts elements as strings, which is why numbers can come out in
the wrong order — always pass a compare function for numeric or custom
sorting.

## Spread syntax

```javascript
const first = [1, 2];
const second = [3, 4, 5];
const combined = [...first, ...second];
// [1, 2, 3, 4, 5]

const original = { a: 1, b: 2 };
const merged = { ...original, c: 3 };
// { a: 1, b: 2, c: 3 }
```

`...` expands an array or object into its individual elements/properties.
Common uses: copying without mutating the original, merging two arrays or
objects together, and passing an array's items as separate arguments to a
function.

## Destructuring

```javascript
const [first, second] = [10, 20];
// first = 10, second = 20

const { name, age } = { name: "Sam", age: 30 };
// name = "Sam", age = 30

const [, , third] = [1, 2, 3];
// skip elements with empty commas -> third = 3

const { name: displayName } = { name: "Sam" };
// rename while destructuring -> displayName = "Sam"
```

Destructuring pulls values out of an array or object into individual
variables in one line, instead of reading each field off one at a time.

## Template literals

```javascript
const name = "Sam";
const greeting = `Hello, ${name}!`;
// "Hello, Sam!"

const multiline = `Line one
Line two`;
```

Backticks let you embed any expression directly in a string with `${...}`,
and write multi-line strings without concatenation.

## some() / every()

```javascript
const numbers = [2, 4, 6, -8];

numbers.some(n => n < 0);
// true  — at least one is negative

numbers.every(n => n % 2 === 0);
// true  — every one is even
```

`some()` returns true if at least one element passes the test; `every()`
returns true only if all of them do. Both stop checking as soon as the
answer is decided, rather than running the callback over every element.

## find() / findIndex()

```javascript
const users = [{ id: 1, name: "Sam" }, { id: 2, name: "Ana" }];

users.find(u => u.id === 2);
// { id: 2, name: "Ana" }

users.findIndex(u => u.id === 2);
// 1

users.find(u => u.id === 999);
// undefined

users.findIndex(u => u.id === 999);
// -1
```

`find()` returns the first matching element itself; `findIndex()` returns
its position. Both return a "not found" sentinel (`undefined` / `-1`)
rather than throwing, so it's safe to check the result before using it.

## includes()

```javascript
[1, 2, 3].includes(2);
// true

"hello".includes("ell");
// true

[1, 2, 3].includes(4);
// false
```

A direct way to test membership — on arrays or strings — without reaching
for `indexOf(...) !== -1`.

## flat() / flatMap()

```javascript
[[1, 2], [3, 4]].flat();
// [1, 2, 3, 4]

[1, [2, [3, [4]]]].flat(2);
// [1, 2, 3, [4]]  — the depth argument controls how far to flatten

[1, 2, 3].flatMap(n => [n, n * 2]);
// [1, 2, 2, 4, 3, 6]
```

`flat()` flattens nested arrays by the given depth (default `1`).
`flatMap()` maps and then flattens one level in a single pass — equivalent
to `.map(fn).flat()`, but without building the intermediate array.

## Object.keys() / values() / entries()

```javascript
const person = { name: "Sam", age: 30 };

Object.keys(person);
// ["name", "age"]

Object.values(person);
// ["Sam", 30]

Object.entries(person);
// [["name", "Sam"], ["age", 30]]

for (const [key, value] of Object.entries(person)) {
  console.log(key, value);
}
// name Sam
// age 30
```

These turn an object into an array so it can be looped over, mapped, or
filtered — objects aren't directly iterable on their own.
`Object.fromEntries()` does the reverse, building an object back from a list
of key/value pairs.
