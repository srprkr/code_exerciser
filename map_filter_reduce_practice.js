// Map (transform each item)

// 1. Double every number in [1, 2, 3, 4, 5]
let oneToFive = [1, 2, 3, 4, 5];

let doubleTheFive = oneToFive.map(n => n * 2);
console.log("1: ", doubleTheFive);

// 2. Convert an array of strings to all uppercase
let lower = ["h", "e", "l", "l", "o"];

let upper = lower.map(l => l.toString().toUpperCase());
console.log("2: ", upper);

// 3. Given an array of names, return an array of greeting strings like "Hello, Sam!"
let names = ['Sean', 'Ralph', 'Bill', 'Tom', 'Hank'];

let greetings = names.forEach(name => console.log(`Hello ${name}!`));
// var not used because we didn't need the array
// console.log("3: ", greetings);

// 4. Given an array of numbers, return their squares
let fibonacci = [1, 2, 4, 8, 16];

let squareNums = fibonacci.map(num => num ** 2);
console.log("4: ", squareNums);

// 5. Given an array of objects {name, age}, return just an array of the names
let people = [
  {name: "Sean", age: 39},
  {name: "Amy", age: 28},
  {name: "Matt", age: 43},
  {name: "Stacy", age: 33}
];

let firstNames = people.map(person => person.name);
console.log("5: ", firstNames);

// 6. Given an array of prices (numbers), return an array with tax added (multiply by 1.08)
let prices = [1.80, 23.42, 6.50, 8.36, 14.78];

let taxPrices = prices.map(price => Number((price * 1.08).toFixed(2)));
console.log("6: ", taxPrices);

// 7. Given an array of strings, return an array of their lengths
let words = ["crab", "France", "Washington D.C.", "FIFA World Cup", "dog", "pest control"];

let wordCount = words.map(word => word.length);

console.log("7: ", wordCount);


// Filter (keep some items)
// 8. Given [1, 2, 3, 4, 5, 6], return only the even numbers
let upToSix = [1, 2, 3, 4, 5, 6];

let evens = upToSix.filter(num => num % 2 === 0)

console.log("8: ", evens);

// 9. Given an array of words, return only those longer than 4 characters
let moreWords = ["pet", "chimichanga", "zebra", "go", "chameleon", "spring", "cat"];

let moreThanFourChars = moreWords.filter(word => word.length > 4);

// sort to make it alphabetical, just cause.
console.log("9. ", moreThanFourChars.sort());

// 10. Given an array of objects {name, age}, return only the people 18 or older
  // use the people array from problem 5.
let olderThan18 = people.filter(person => {
  return person.age >= 18
}).map(person => person.name);
console.log("10. ", olderThan18);

// 11. Given an array of numbers, remove all negative numbers
let integers = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];

let positives = integers.filter(num => num >= 0);
let negatives = integers.filter(num => num < 0);
console.log("11. ", positives);
console.log("11 1/2. ", negatives);

// 12. Given an array of strings, remove any empty strings ("")
let animals = ["", "dog", "whale", "cat", "monkey", "", "octopus"];

let cleanAnimals = animals.filter(word => word.length > 0);

console.log("12. ", cleanAnimals);

// 13. Given an array of objects {name, inStock}, return only items where inStock is true
// Reduce (combine into one value)
// 14. Sum all numbers in an array
// 15. Find the maximum number in an array
// 16. Count how many items in an array are even
// 17. Given an array of objects {price}, get the total price
// 18. Concatenate an array of strings into one sentence, separated by spaces
// 19. Given an array of words, build an object counting how many times each word appears (e.g. ["a","b","a"] → {a: 2, b: 1})
// Combining them
// 20. Given an array of objects {name, price, inStock}, get the total price of only the items that are in stock (filter, then reduce)

