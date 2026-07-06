console.log("FILE 2!!");
console.log("======");

// Map
// 1. Given an array of temperatures in Celsius, convert them all to Fahrenheit
let temps = [0, 20, 37, 100, -10];
const celsiusTemps = temps.map(num => Number((num - 32 / (9/5)).toFixed(2)));

console.log("2.1: ", celsiusTemps);

// 2. Given an array of objects {firstName, lastName}, return an array of full name strings
let namesObj = [
  { firstName: "Sam", lastName: "Ortiz" },
  { firstName: "Ana", lastName: "Kim" },
  { firstName: "Luis", lastName: "Fernandez" }
];

let fullNames = namesObj.map(person => `${person.firstName} ${person.lastName}`);

console.log("2.2: ", fullNames);

// 3. Given an array of numbers, return an array of objects like { value: n, isEven: true/false }
let numbers3 = [4, 7, 10, 13, 22];
let evenTally = numbers3.map(num => ({value: num, isEven: num % 2 === 0}));

console.log("2.3: ", evenTally);

// 4. Given an array of objects {name, price}, return a new array of objects with price rounded to the nearest dollar (don't mutate the originals)
let products4 = [
  { name: "Widget", price: 19.49 },
  { name: "Gadget", price: 42.75 },
  { name: "Doohickey", price: 5.20 }
];

let roundedPrices = products4.map(product => ({name: product.name, price: Number(product.price.toFixed(2))}))

console.log("2.4: ", roundedPrices);

// 5. Given an array of URLs (strings), return an array of objects { url, domain } where domain is extracted from the string
let urls = [
  "https://www.amazon.com/product/123",
  "https://openai.com/blog",
  "https://sub.example.co.uk/page"
];

let domains = urls.map(url => {
  return {url: url, domain: new URL(url).hostname}
});
console.log("2.5: ", domains);

// Filter
// 6. Given an array of objects {title, rating}, return only the ones rated 4 or higher
let reviews = [
  { title: "Great book", rating: 5 },
  { title: "Meh", rating: 2 },
  { title: "Pretty good", rating: 4 },
  { title: "Terrible", rating: 1 }
];

let over4Rating = reviews
  .filter(review => review.rating >= 4)
  .map(review => review.title);

console.log("2.6: ", over4Rating);

// 7. Given an array of objects {name, tags: [...]}, return only the objects whose tags array includes "urgent"
let tickets = [
  { name: "Fix login bug", tags: ["bug", "urgent"] },
  { name: "Update docs", tags: ["docs"] },
  { name: "Server down", tags: ["urgent", "infra"] }
];

let urgentTickets = tickets.filter(ticket => {
  return ticket["tags"].includes('urgent');
})

console.log("2.7: ", urgentTickets);

// 8. Given an array of numbers, return only the ones that are prime
let numbers8 = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

let isPrime = (num) => {
  if(num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}


let prime8 = numbers8.filter(isPrime);

console.log("2.8: ", prime8);

// 9. Given an array of objects {id, deleted}, return only the non-deleted ones
let records = [
  { id: 1, deleted: false },
  { id: 2, deleted: true },
  { id: 3, deleted: false },
  { id: 4, deleted: true }
];

let nondeletedRecords = records.filter(record => !record.deleted)

console.log("2.9: ", nondeletedRecords);

// 10. Given an array of strings, return only the ones that are valid-looking emails (contain @ and .)
let strings10 = [
  "sam@example.com",
  "not-an-email",
  "ana.kim@school.edu",
  "just text",
  "bad@nodot"
];

let validEmails = strings10.filter(str => str.includes("@") && str.includes("."));

console.log("2.10: ", validEmails);

// Reduce
// 11. Given an array of numbers, find both the min and max in a single reduce, returning { min, max }
let numbers11 = [8, 3, 17, 4, 22, 1, 15];

let minMaxNums = numbers11.reduce((acc, val) => {
  if ( val < acc['min']) {
    acc['min'] = val;
  };
  if ( val > acc['max']) {
    acc['max'] = val;
  };

  return (acc);
}, {min: Infinity, max: -Infinity});

console.log("2.11: ", minMaxNums);

// 12. Given an array of objects {category, amount}, build an object that totals amount per category (e.g. groceries, rent, fun → { groceries: 120, rent: 800, fun: 45 })
let expenses = [
  { category: "groceries", amount: 60 },
  { category: "rent", amount: 800 },
  { category: "fun", amount: 20 },
  { category: "groceries", amount: 60 },
  { category: "fun", amount: 25 }
];

let totalByCategory = expenses.reduce((acc, val) => {
  if (acc[val.category]) {
    acc[val.category] += Number(val.amount);
  } else {
    acc[val.category] = Number(val.amount);
  }
  return acc;
}, {});

console.log("2.12: ", totalByCategory);

// 13. Given an array of objects {name, age}, build an object keyed by name, mapping to age (e.g. { "Sam": 25, "Ana": 31 })
let people13 = [
  { name: "Sam", age: 25 },
  { name: "Ana", age: 31 },
  { name: "Luis", age: 28 }
];

let nameAge = people13.reduce((acc, val) => {
   acc[val.name] = val.age;
  return acc;
}, {});

console.log("2.13: ", nameAge);

// 14. Given an array of letters, build an object counting vowels vs consonants: { vowels: 5, consonants: 9 }
let letters = ["d", "o", "g", "e", "l", "e", "p", "h", "a", "n", "t"];

let consonantVowelCount = letters.reduce((acc, val) => {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  if (vowels.includes(val)) {
    acc.vowels += 1;
  } else {
    acc.consonants += 1;
  }
  return acc;
}, {vowels: 0, consonants: 0})

console.log("2.14: ", consonantVowelCount);


// 15. Given an array of objects {student, passed: true/false}, produce { passed: 12, failed: 3 }
let students = [
  { student: "Sam", passed: true },
  { student: "Ana", passed: true },
  { student: "Luis", passed: false },
  { student: "Mei", passed: true },
  { student: "Jo", passed: false }
];

let passFailCount = students.reduce((acc, val) => {
  if(val.passed) {
    acc.passed += 1;
  } else {
    acc.failed += 1;
  }
  return acc;
}, {passed: 0, failed: 0});

console.log("2.15: ", passFailCount);

// Combining methods
// 16. Given an array of objects {name, department, salary}, build an object where each key is a department and the value is the average salary in that department (filter/group with reduce, then a second pass to divide)
let employees = [
  { name: "Sam", department: "Engineering", salary: 90000 },
  { name: "Ana", department: "Engineering", salary: 110000 },
  { name: "Luis", department: "Sales", salary: 70000 },
  { name: "Mei", department: "Sales", salary: 75000 },
  { name: "Jo", department: "Engineering", salary: 95000 }
];

// 17. Given an array of objects {title, genre, rating}, return an array of just the titles of movies in the "Comedy" genre with rating above 7 (filter, then map)
let movies = [
  { title: "Laugh Riot", genre: "Comedy", rating: 8.2 },
  { title: "Dark Night", genre: "Drama", rating: 9.0 },
  { title: "Silly Business", genre: "Comedy", rating: 6.5 },
  { title: "Funny Farm", genre: "Comedy", rating: 7.8 }
];

// 18. Given an array of numbers, build an object { evens: [...], odds: [...] } splitting them into two arrays (reduce)
let numbers18 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 19. Given an array of objects {name, inStock, price}, return an object { inStockCount, totalValue } summarizing the whole cart in one reduce pass
let cart19 = [
  { name: "Keyboard", inStock: true, price: 45.00 },
  { name: "Monitor", inStock: false, price: 199.99 },
  { name: "Mouse", inStock: true, price: 25.50 },
  { name: "Webcam", inStock: true, price: 60.00 }
];

// 20. Given an array of transactions {type: "credit"|"debit", amount}, compute a running balance and return an array showing the balance after each transaction (map, but each step depends on the "so far" total — hint: you'll need a variable outside the map, or think about whether reduce fits better here)
let transactions = [
  { type: "credit", amount: 100 },
  { type: "debit", amount: 30 },
  { type: "credit", amount: 50 },
  { type: "debit", amount: 20 }
];

