console.log("ARRAY/OBJECT METHODS GRAB-BAG");
console.log("------");

// find / findIndex (5)

// 1. Find the first match
// Given an array of objects {id, name}, find the object with id 3

let users1 = [
  { id: 1, name: "Sam" },
  { id: 2, name: "Ana" },
  { id: 3, name: "Luis" },
  { id: 4, name: "Mei" }
];

let matchedUser = users1.find(({id}) => id === 3);

console.log("5.1 ", matchedUser);

// 2. Find the first number over a threshold
// Given [4, 9, 15, 22, 7], find the first number greater than 10


let numbers2 = [4, 9, 15, 22, 7];

let firstOverTen = numbers2.find(num => num > 10);

console.log("5.2 ", firstOverTen);


// 3. findIndex basics
// Given an array of objects {id, name}, find the index of the object with name "Luis"

let users3 = [
  { id: 1, name: "Sam" },
  { id: 2, name: "Ana" },
  { id: 3, name: "Luis" },
  { id: 4, name: "Mei" }
];

let matchedUserIndex = users3.findIndex(({name}) => name === "Luis");

console.log("5.3 ", matchedUserIndex);

// 4. Find with no match
// Given [1, 2, 3], try to find a number greater than 10 and log what you get back when nothing matches


let nums4 = [1, 2, 3];

let numOverTen = nums4.find(num => num > 10);

console.log("5.4 ", numOverTen);

// 5. Find and destructure
// Given an array of objects {title, inStock}, find the first in-stock item and destructure its title directly out of the result

let products5 = [
  { title: "Widget", inStock: false },
  { title: "Gadget", inStock: true },
  { title: "Doohickey", inStock: true }
];

let {title: firstInStock} = products5.find(({inStock}) => inStock);

console.log("5.5 ", firstInStock);

// some / every / includes (5)

// 6. some basics
// Given [1, 3, 5, 8, 9], check whether the array contains at least one even number

let nums6 = [1, 3, 5, 8, 9];

let isOneEven = nums6.some(num => num % 2 === 0 )

console.log("5.6 ", isOneEven);

// 7. every basics
// Given [2, 4, 6, 8], check whether every number in the array is even

let numbers7 = [2, 4, 6, 8];

let allEven = numbers7.every(num => num % 2 === 0 )

console.log("5.7 ", allEven);

// 8. some with objects
// Given an array of objects {name, age}, check whether any user is under 18

let users8 = [
  { name: "Sam", age: 25 },
  { name: "Ana", age: 17 },
  { name: "Luis", age: 30 }
];

let under18 = users8.some(({age}) => age < 18);

console.log("5.8 ", under18);

// 9. every with objects
// Given an array of objects {name, passed}, check whether every student passed

let students9 = [
  { name: "Sam", passed: true },
  { name: "Ana", passed: true },
  { name: "Luis", passed: true }
];

let allPassed = students9.every(({passed}) => passed);

console.log("5.9 ", allPassed);

// 10. includes basics
// Given ["red", "green", "blue"], check whether "green" is in the array, and separately whether "purple" is


let colors10 = ["red", "green", "blue"];

// let hasGreen = colors10.includes("green");
// let hasPurple = colors10.includes("purple");

// console.log("5.10 ", hasGreen, hasPurple);

let colorChecker = (color) => {
  return colors10.includes(color);
}

console.log("5.10a ", colorChecker("green"));
console.log("5.10b ", colorChecker("purple"));

// flat / flatMap (5)

// 11. Flatten one level
// Given [[1, 2], [3, 4], [5, 6]], flatten it into a single array of numbers

let nested11 = [[1, 2], [3, 4], [5, 6]];

let flatArray11 = nested11.flat();

console.log("5.11 ", flatArray11);

// 12. Flatten deeply nested arrays
// Given [1, [2, [3, [4, 5]]]], flatten it all the way down into [1, 2, 3, 4, 5] (hint: flat() takes a depth argument, or you can pass Infinity)

let deepNested12 = [1, [2, [3, [4, 5]]]];

let deepFlatArray12 = deepNested12.flat(3);

console.log("5.12 ", deepFlatArray12);


// 13. flatMap basics
// Given [1, 2, 3], use flatMap to return each number and its double in a single flat array (e.g. 1 becomes [1, 2])

let nums13 = [1, 2, 3];

let flatMapDouble13 = nums13.flatMap(num => [num, num * 2]);

console.log("5.13 ", flatMapDouble13);


// 14. flatMap to split and flatten
// Given an array of sentences, use flatMap to split each sentence into words and return one flat array of all the words

let sentences14 = ["the sky is blue", "the grass is green"];


let flatMapSentenceSplit14 = sentences14.flatMap(sentence => sentence.split(" "));

console.log("5.14 ", flatMapSentenceSplit14);

// 15. flatMap to filter and transform in one pass
// Given an array of numbers, use flatMap to return only the even numbers, doubled (return [] for numbers you want to drop, since flatMap flattens empty arrays away)

let nums15 = [1, 2, 3, 4, 5, 6];

let flatMapDoubledEvens15 = nums15.flatMap(num => (num % 2 === 0) ? [num * 2] : [] );

console.log("5.15 ", flatMapDoubledEvens15);

// Object.keys / values / entries (5)

// 16. Object.keys basics
// Given { name: "Sam", age: 25, city: "Austin" }, get an array of just the keys

let person16 = { name: "Sam", age: 25, city: "Austin" };


let person16Keys = Object.keys(person16);

console.log("5.16 ", person16Keys);

// 17. Object.values basics
// Given { name: "Sam", age: 25, city: "Austin" }, get an array of just the values

let person17 = { name: "Sam", age: 25, city: "Austin" };

let person17Values = Object.values(person17);

console.log("5.17 ", person17Values);

// 18. Object.entries basics
// Given { name: "Sam", age: 25, city: "Austin" }, get an array of [key, value] pairs, then log each pair on its own line using a for...of loop with destructuring

let person18 = { name: "Sam", age: 25, city: "Austin" };

let person18Entries = Object.entries(person18);

for (let [key, value] of person18Entries) {
  console.log("5.18 ", `${key}: ${value}`);
}

// 19. Object.entries + map to transform
// Given { math: 90, science: 85, art: 70 }, use Object.entries and .map to build an array of strings like "math: 90"

let grades19 = { math: 90, science: 85, art: 70 };


// 20. Object.fromEntries round trip
// Given { a: 1, b: 2, c: 3 }, use Object.entries to get pairs, .filter to keep only pairs with a value greater than 1, then Object.fromEntries to turn it back into an object

let nums20 = { a: 1, b: 2, c: 3 };
