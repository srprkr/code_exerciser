# Deep Dive into JavaScript's Array Map function

from: https://www.robinwieruch.de/javascript-map-array/

## Simple map function

```javascript
  const originalArray = [1, 2, 3, 4, 5];

  const newArray = originalArray.map(function addOne(number) {
    return number + 1;
  });

  console.log(originalArray);
  console.log(newArray);

```

## Anonymous map function

`addOne` has been removed.

```javascript
  const originalArray = [1, 2, 3, 4, 5];

  const newArray = originalArray.map(function (number) {
    return number + 1;
  });

  console.log(originalArray);
  console.log(newArray);

```

## Callback function as a variable

```javascript
  const originalArray[1, 2, 3, 4, 5];

  function addOne(number) {
    return number + 1;
  }

  const newArray = originalArray.map(addOne);

  console.log(originalArray);
  console.log(newArray);

```

## For loop

Why use this fancy syntax when for loops will do?

```javascript

  const originalArray = [1, 2, 3, 4, 5];
  const newArray = [];

  for (let i = 0; i < originalArray.length; i++ ) {
    newArray[i] = originalArray[i] + 1;
  }

  console.log(originalArray);
  console.log(newArray);

```

Because: 
1. It's *built* into the language.
2. It's easier.
3. Map is *immutable* and never changes the original array (this is pretty big).

## Map with Arrow function as a callback

```javascript
  const originalArray = [1, 2, 3, 4, 5];

  const newArray = originalArray.map(number => number + 1);

  console.log(originalArray);
  console.log(newArray);
```

## Map method's callback function

The built-in params are `value`, `index`, and `array` (not as needful).

### Value

```javascript
  [1, 2, 3].map(value => value + 1)

  >> 2, 3, 4
```

### Index

```javascript
  [1, 2, 3].map((value, index) => index);

  >> [0, 1, 2]
```

### Array

Odds are you won't need this param so much (because you'll normally have a reference to the original array map was called on).

Here's what I mean:

```javascript
const myArray = [1, 2, 3];

// using third argument to map (array)
myArray.map((value, index, array) => {
  return array[index] + 1;
});

// using the variable that holds the original array
myArray.map((value, index) => {
  return myArray[index] + 1;
});

// just using map without accessing the array manually
myArray.map((value) => {
  return value + 1;
})

// All of the above return...
>> [2, 3, 4]
```

## Map vs ForEach

If you want an array back from it, use `map`. If you're just logging results of each loop and discarding the resultant array, use `foreach`.

```javascript
const myArray = [1, 2, 3, 4];

myArray.map(number => {
  console.log(number);
});

// nothing changes except the method we used
myArray.forEach(number => {
  console.log(number);
});

```

### When to use

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

## Using Map and Filter

Both are immutable and create new arrays. `Filter` creates a shorter array that filters *out* undesired items.

Any array removals or deletions makes `filter` the thing to use.

```javascript
const originalArray = [1, 2, undefined, 3];

const newArray = originalArray.filter(value => {
  return Number.isInteger(value);
}).map(value => {
  return value * 2;
});
```

This filters out the `undefined` and the map chaining modifies the remaining numbers.

## Using Map and Reduce

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
  }, {});

  console.log(myObject); // { a: true, b: true, c: true, d: true }
```
