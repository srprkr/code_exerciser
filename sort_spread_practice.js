// 1. Ascending
let nums1 = [5, 2, 8, 1, 9];

let ascNums = nums1.sort((a, b) => a - b);
console.log("3.1 ", ascNums);

// 2. Descending
let nums2 = [5, 2, 8, 1, 9];
let descNums = nums1.sort((a, b) => b - a);
console.log("3.2 ", descNums);

// 3. Alphabetical
let fruits3 = ["banana", "apple", "cherry"];
let descLetters = fruits3.sort();

console.log("3.3 ", descLetters);

// 4. Reverse alphabetical
let fruits4 = ["banana", "apple", "cherry"];
let ascLetters = fruits4.sort((a, b) => (a < b ? 1 : -1));

console.log("3.4 ", ascLetters);

// 5. Sort by age ascending
let people5 = [
  { name: "Sam", age: 34 },
  { name: "Ana", age: 22 },
  { name: "Luis", age: 29 }
];
let ascAge = people5.sort((a, b) => a.age - b.age);
console.log("3.5 ", ascAge);

// 6. Sort by price descending
let products6 = [
  { title: "Widget", price: 19.99 },
  { title: "Gadget", price: 42.50 },
  { title: "Doohickey", price: 5.25 }
];

let ascPrice = products6.sort((a, b) => a.price - b.price);
console.log("3.6 ", ascPrice);


// 7. Sort without mutating
let nums7 = [7, 3, 9, 1, 5];
let sortedNumbers = [...nums7].sort((a, b) => a - b);

console.log("3.7 ", nums7);
console.log("3.7 ", sortedNumbers);

// 8. Case-insensitive sort
let words8 = ["banana", "Apple", "cherry", "Date"];

let noCaseSort = [...words8].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))

console.log("3.8 ", noCaseSort);

// 9. Sort by department, then by name
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
let nums10 = [10, 1, 21, 2];

let nums10Sort = [...nums10].sort((a, b) => a - b);

console.log("3.10 ", nums10Sort);

// Spread
// 11. Copy array
let original11 = [1, 2, 3];

// 12. Combine two arrays
let arrA12 = [1, 2, 3];
let arrB12 = [4, 5, 6];

// 13. Copy object
let original13 = { name: "Sam", age: 25 };

// 14. Update one field, new object
let original14 = { name: "Sam", age: 25 };

// 15. Add to front, no mutation
let original15 = [2, 3, 4];
let newItem15 = 1;

// 16. Add to end, no mutation
let original16 = [1, 2, 3];
let newItem16 = 4;

// 17. Merge two objects
let personInfo17 = { name: "Sam", age: 25 };
let contactInfo17 = { email: "sam@email.com" };

// 18. Insert into array, find new max
let nums18 = [4, 9, 2, 15];
let extraNum18 = 30;

// 19. Spread array into function args
function sum19(a, b, c) {
  return a + b + c;
}
let inputs19 = [1, 2, 3];

// 20. Update one object in an array, no mutation
let items20 = [
  { id: 1, name: "Keyboard", price: 45.00 },
  { id: 2, name: "Monitor", price: 199.99 },
  { id: 3, name: "Mouse", price: 25.50 }
];
// goal: return a new array where id:2's price is updated to 179.99