// Sort (10)

// 1. Ascending
// Sort an array of numbers [5, 2, 8, 1, 9] in ascending order
let nums1 = [5, 2, 8, 1, 9];

let ascNums = nums1.sort((a, b) => a - b);
console.log("3.1 ", ascNums);

// 2. Descending
// Sort that same array in descending order

let nums2 = [5, 2, 8, 1, 9];
let descNums = nums1.sort((a, b) => b - a);
console.log("3.2 ", descNums);

// 3. Alphabetical
// Sort an array of strings alphabetically: ["banana", "apple", "cherry"]

let fruits3 = ["banana", "apple", "cherry"];
let descLetters = fruits3.sort();

console.log("3.3 ", descLetters);

// 4. Reverse alphabetical
// Sort an array of strings in reverse alphabetical order

let fruits4 = ["banana", "apple", "cherry"];
let ascLetters = fruits4.sort((a, b) => (a < b ? 1 : -1));

console.log("3.4 ", ascLetters);

// 5. Sort by age ascending
// Given an array of objects {name, age}, sort by age ascending

let people5 = [
  { name: "Sam", age: 34 },
  { name: "Ana", age: 22 },
  { name: "Luis", age: 29 }
];
let ascAge = people5.sort((a, b) => a.age - b.age);
console.log("3.5 ", ascAge);

// 6. Sort by price descending
// Given an array of objects {title, price}, sort by price descending

let products6 = [
  { title: "Widget", price: 19.99 },
  { title: "Gadget", price: 42.50 },
  { title: "Doohickey", price: 5.25 }
];

let ascPrice = products6.sort((a, b) => a.price - b.price);
console.log("3.6 ", ascPrice);


// 7. Sort without mutating
// Sort an array of numbers, but do it without mutating the original array (hint: think about what .sort() does to the array it's called on)

let nums7 = [7, 3, 9, 1, 5];
let sortedNumbers = [...nums7].sort((a, b) => a - b);

console.log("3.7 - original", nums7);
console.log("3.7 ", sortedNumbers);

// 8. Case-insensitive sort
// Given an array of strings with mixed casing (["banana", "Apple", "cherry", "Date"]), sort them alphabetically in a case-insensitive way

let words8 = ["banana", "Apple", "cherry", "Date"];

let noCaseSort = [...words8].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))

console.log("3.8 ", noCaseSort);

// 9. Sort by department, then by name
// Given an array of objects {name, department}, sort first by department alphabetically, and for people in the same department, sort by name alphabetically (a tie-breaker sort)

let people9 = [
  { name: "Luis", department: "Sales" },
  { name: "Ana", department: "Engineering" },
  { name: "Sam", department: "Engineering" },
  { name: "Mei", department: "Sales" },
  { name: "Jo", department: "Engineering" }
];

let sortByDept = [...people9].sort((a, b) => {
  if (a.department !== b.department) {
    return a.department > b.department ? 1 : -1;
  } else {
    return a.name > b.name ? 1 : -1;
  }
});

console.log("3.9 ", sortByDept)

// 10. Numeric sort gotcha
// Given an array of numbers like [10, 1, 21, 2], sort them numerically ascending — and explain to yourself why calling plain .sort() with no comparator gives a wrong-looking result here

let nums10 = [10, 1, 21, 2];

let nums10Sort = [...nums10].sort((a, b) => a - b);

console.log("3.10 ", nums10Sort);


// Spread Operator (10)

// 11. Copy array
// Copy an array [1, 2, 3] into a new array without mutating the original
let original11 = [1, 2, 3];

let copy11 = [...original11];

console.log("3.11 ", copy11);

// 12. Combine two arrays
// Combine two arrays, [1, 2, 3] and [4, 5, 6], into one array

let arrA12 = [1, 2, 3];
let arrB12 = [4, 5, 6];

let combinedArrs = [...arrA12, ...arrB12];

console.log("3.12 ", combinedArrs);

// 13. Copy object
// Copy an object {name: "Sam", age: 25} into a new object without mutating the original

let original13 = { name: "Sam", age: 25 };

let copy13 = {...original13};

console.log("3.13 ", copy13);

// 14. Update one field, new object
// Given an object {name: "Sam", age: 25}, create a new object that's the same but with age updated to 26 — without touching the original

let original14 = { name: "Sam", age: 25 };

let copy14 = {...original14, age: 26};

console.log("3.14 ", copy14);

// 15. Add to front, no mutation
// Add a new item to the front of an array without using .unshift() (i.e., without mutating)

let original15 = [2, 3, 4];
let newItem15 = 1;

let addToFront = [newItem15, ...original15];

console.log("3.15 - original", original15);
console.log("3.15 ", addToFront);

// 16. Add to end, no mutation
// Add a new item to the end of an array without using .push()

let original16 = [1, 2, 3];
let newItem16 = 4;

let addToEnd = [...original16, newItem16];

console.log("3.16 - original", original16);
console.log("3.16 ", addToEnd);

// 17. Merge two objects
// Given two objects, {name: "Sam", age: 25} and {email: "sam@email.com"}, merge them into a single object


let personInfo17 = { name: "Sam", age: 25 };
let contactInfo17 = { email: "sam@email.com" };

let objMerge = {...personInfo17, ...contactInfo17};

console.log("3.17: ", objMerge);

// 18. Insert into array, find new max
// Given an array of numbers, create a copy with one extra number inserted, then pass that copy into Math.max() to find the new maximum (hint: spread works on function arguments too)


let nums18 = [4, 9, 2, 15];
let extraNum18 = 30;

let maxArray = [...nums18, extraNum18];
let maxNumber = Math.max(...maxArray);

console.log("3.18 ", maxNumber);

// 19. Spread array into function args
// Given a function sum(a, b, c), call it by spreading an array [1, 2, 3] into its three arguments

function sum19(a, b, c) {
  return a + b + c;
}
let inputs19 = [1, 2, 3];
let spreadFunc = sum19(...inputs19);

console.log("3.19 ", spreadFunc);

// 20. Update one object in an array, no mutation
// Given an array of objects, create a new array where one specific object (say, the one with id: 2) has an updated property — everything else stays the same, and nothing is mutated (combine spread on the array with spread on the object)
let items20 = [
  { id: 1, name: "Keyboard", price: 45.00 },
  { id: 2, name: "Monitor", price: 199.99 },
  { id: 3, name: "Mouse", price: 25.50 }
];

let updated20 = items20.map(item => {
  return item.id === 2 ? {...item, price: 179.99 } : item;
});

// updated20[1] = {...updated20[1], price: 179.99};

console.log("3.20 - original", items20);
console.log("3.20 ", updated20);
// goal: return a new array where id:2's price is updated to 179.99