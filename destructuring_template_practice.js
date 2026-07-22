console.log("DESTRUCTURING AND TEMPLATES");
console.log("------");

// Destructuring (10)

// 1. Basic array destructuring
// Given [10, 20, 30], pull the first and second values into variables first and second

let arr1 = [10, 20, 30];
let [first, second] = arr1;

console.log("4.1 ", first, second);

// 2. Skip an element
// Given [1, 2, 3], destructure to grab the first and third values, skipping the second

let arr2 = [1, 2, 3];

let [one, , three] = arr2;

console.log("4.2 ", one, three);


// 3. Swap two variables
// Given let a = 1, b = 2, swap their values using destructuring (no temp variable)

let a3 = 1;
let b3 = 2;

[a3, b3] = [b3, a3];

console.log("4.3 ", a3, b3);

// 4. Rest in array destructuring
// Given [1, 2, 3, 4, 5], pull the first value into head and the rest into an array tail

let arr4 = [1, 2, 3, 4, 5];

let [head, ...tail] = arr4; 

console.log("4.4 ", head, tail);


// 5. Basic object destructuring
// Given { name: "Sam", age: 25 }, pull name and age into variables of the same name

let person5 = { name: "Sam", age: 25 };

let {name, age} = person5;

console.log("4.5 ", name, age);


// 6. Renaming while destructuring
// Given { name: "Sam", age: 25 }, pull name into a variable called userName

let person6 = { name: "Sam", age: 25 };


// 7. Default values
// Given { name: "Sam" } (no age), destructure age with a default value of 18

let person7 = { name: "Sam" };


// 8. Nested object destructuring
// Given { name: "Sam", address: { city: "Austin", zip: "78701" } }, pull city directly into a variable

let person8 = { name: "Sam", address: { city: "Austin", zip: "78701" } };


// 9. Destructuring in function parameters
// Write a function greet({ name, age }) that returns a string like "Sam is 25 years old" using destructured parameters


// 10. Destructuring an array of objects in a loop
// Given [{ id: 1, name: "Sam" }, { id: 2, name: "Ana" }], use a for...of loop with destructuring to log "1: Sam" and "2: Ana"

let users10 = [
  { id: 1, name: "Sam" },
  { id: 2, name: "Ana" }
];


// Template Literals (10)

// 11. Basic interpolation
// Given let name = "Sam", build the string "Hello, Sam!" using a template literal

let name11 = "Sam";


// 12. Expression inside a template literal
// Given let a = 4, b = 5, build the string "4 + 5 = 9" using a template literal (no manual string concatenation)

let a12 = 4;
let b12 = 5;


// 13. Multi-line string
// Build a multi-line address string ("123 Main St", "Austin, TX 78701") using a template literal instead of \n


// 14. Calling a function inside a template literal
// Given a function shout(str) that uppercases a string, use it inside a template literal to build "SAM says HELLO"

function shout14(str) {
  return str.toUpperCase();
}
let name14 = "Sam";


// 15. Ternary inside a template literal
// Given let score = 85, build a string that says "Result: Pass" or "Result: Fail" depending on whether score >= 60

let score15 = 85;


// 16. Nested template literals
// Given an array of names ["Sam", "Ana", "Luis"], build a single string like "Guests: Sam, Ana, Luis" by nesting a .join() call inside a template literal

let names16 = ["Sam", "Ana", "Luis"];


// 17. Template literal with object property access
// Given { title: "Dune", price: 12.99 }, build a string like "Dune costs $12.99" using a template literal

let book17 = { title: "Dune", price: 12.99 };


// 18. Building HTML-ish strings
// Given { title: "Widget", price: 19.99 }, build a string like "<li>Widget - $19.99</li>" using a template literal

let product18 = { title: "Widget", price: 19.99 };


// 19. Combining map with template literals
// Given an array of objects [{ name, price }], use .map() with a template literal to produce an array of strings like "Widget: $19.99"

let products19 = [
  { name: "Widget", price: 19.99 },
  { name: "Gadget", price: 42.50 }
];


// 20. Tagged template basics
// Write a tag function loud(strings, ...values) that rebuilds the template string but uppercases every interpolated value, then use it on `${name} is ${role}`

let name20 = "Sam";
let role20 = "admin";
