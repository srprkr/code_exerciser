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