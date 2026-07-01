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