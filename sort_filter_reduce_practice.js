// Sort (10 more)

// 1. Sort by string length
// Given an array of words, sort them from shortest to longest
let words1 = ["banana", "fig", "kiwi", "pomegranate", "date"];

let wordLenSort = words1.sort((a, b) => (a.length - b.length));

console.log("6.1 ", wordLenSort);

// 2. Sort by absolute distance from zero
// Given an array of numbers (some negative), sort by how close they are to 0
let nums2 = [-8, 3, 1, -2, 6, -1, 9];



// 3. Sort dates ascending
// Given an array of objects {event, date} where date is a string like "2024-03-15", sort chronologically
let events3 = [
  { event: "Kickoff", date: "2024-06-01" },
  { event: "Launch", date: "2024-01-15" },
  { event: "Review", date: "2024-03-20" }
];



// 4. Sort by boolean flag first
// Given an array of objects {name, isAdmin}, sort so admins come first, then everyone else (order within each group doesn't matter)
let users4 = [
  { name: "Sam", isAdmin: false },
  { name: "Ana", isAdmin: true },
  { name: "Luis", isAdmin: false },
  { name: "Mei", isAdmin: true }
];



// 5. Sort by multiple numeric fields
// Given an array of objects {name, score, timeSeconds}, sort by score descending, and break ties by the fastest time (ascending)
let racers5 = [
  { name: "Sam", score: 90, timeSeconds: 55 },
  { name: "Ana", score: 90, timeSeconds: 48 },
  { name: "Luis", score: 85, timeSeconds: 40 },
  { name: "Mei", score: 90, timeSeconds: 52 }
];



// 6. Sort using a lookup/priority object
// Given an array of objects {name, priority} where priority is "low" | "medium" | "high", sort so "high" comes first, then "medium", then "low"
let tasks6 = [
  { name: "Write docs", priority: "low" },
  { name: "Fix outage", priority: "high" },
  { name: "Refactor utils", priority: "medium" },
  { name: "Patch security hole", priority: "high" }
];



// 7. Sort a copy, keep top N
// Given an array of objects {name, score}, return just the top 3 scorers, highest first, without mutating the original array
let players7 = [
  { name: "Sam", score: 72 },
  { name: "Ana", score: 95 },
  { name: "Luis", score: 88 },
  { name: "Mei", score: 91 },
  { name: "Jo", score: 60 }
];



// 8. Sort strings that contain numbers, "naturally"
// Given an array like ["item2", "item10", "item1"], sort so item1, item2, item10 come out in that human-expected order (hint: localeCompare has a numeric option)
let items8 = ["item2", "item10", "item1", "item20", "item3"];



// 9. Sort nested arrays by their own length
// Given an array of arrays, sort them by how many elements each inner array has, fewest to most
let groups9 = [[1, 2, 3], [1], [4, 5], [1, 2, 3, 4, 5], []];



// 10. Stable sort check
// Given an array of objects {name, group} that's already ordered by name within each group, sort by group only, and confirm the original name order within each group is preserved (this demonstrates that Array.prototype.sort is stable)
let people10 = [
  { name: "Ana", group: "B" },
  { name: "Ben", group: "A" },
  { name: "Cara", group: "B" },
  { name: "Drew", group: "A" }
];



// Filter (10 more)

// 11. Filter by multiple conditions
// Given an array of objects {name, price, inStock}, return only items that are in stock AND under $50
let products11 = [
  { name: "Keyboard", price: 45.00, inStock: true },
  { name: "Monitor", price: 199.99, inStock: true },
  { name: "Mouse", price: 25.50, inStock: false },
  { name: "Webcam", price: 40.00, inStock: true }
];



// 12. Filter out duplicates
// Given an array of numbers with repeats, use filter (with the index/array args) to return only the unique values, preserving first-seen order
let nums12 = [1, 2, 2, 3, 4, 4, 4, 5, 1];



// 13. Filter by substring, case-insensitive
// Given an array of strings, return only the ones that contain "the" anywhere, ignoring case
let phrases13 = ["The cat sat", "A dog barked", "THEatre trip", "no match here", "gather round"];



// 14. Filter objects by a nested property
// Given an array of objects {name, address: {city}}, return only the people who live in "Austin"
let people14 = [
  { name: "Sam", address: { city: "Austin" } },
  { name: "Ana", address: { city: "Denver" } },
  { name: "Luis", address: { city: "Austin" } }
];



// 15. Filter with a dynamic threshold
// Write a function that takes an array of numbers and a minimum value, and returns only the numbers greater than or equal to that minimum
let numsAboveThreshold15 = [3, 12, 7, 20, 5, 18];



// 16. Filter out falsy values
// Given a messy array like [0, "hello", "", null, 42, undefined, false, "world", NaN], remove every falsy value
let messy16 = [0, "hello", "", null, 42, undefined, false, "world", NaN];



// 17. Filter dates in a range
// Given an array of objects {event, date} (as "YYYY-MM-DD" strings), return only the events that fall in 2024
let events17 = [
  { event: "Kickoff", date: "2023-11-01" },
  { event: "Launch", date: "2024-01-15" },
  { event: "Review", date: "2024-03-20" },
  { event: "Wrap-up", date: "2025-01-05" }
];



// 18. Filter using another array as a blocklist
// Given an array of usernames and a separate array of banned usernames, return only the usernames that are not banned
let usernames18 = ["sam99", "trollking", "ana_dev", "spammer42", "luisc"];
let banned18 = ["trollking", "spammer42"];



// 19. Filter to find "gaps" in a sequence
// Given a sorted array of numbers that should count up by 1 each time, return the numbers that come right before a gap (e.g. [1,2,4,5,7] -> [2, 5], since 3 and 6 are missing after them)
let sequence19 = [1, 2, 4, 5, 7, 8, 9, 12];



// 20. Filter then check emptiness
// Given an array of objects {name, age}, write a function that returns true if there is at least one person under 21 (use filter, even though .some() would also work — this is about noticing when filter is the wrong tool)
let people20 = [
  { name: "Sam", age: 34 },
  { name: "Ana", age: 19 },
  { name: "Luis", age: 29 }
];



// Reduce (10 more)

// 21. Flatten an array of arrays
// Given an array of arrays like [[1, 2], [3, 4], [5]], flatten it into a single array [1, 2, 3, 4, 5] using reduce
let nested21 = [[1, 2], [3, 4], [5]];



// 22. Find the longest string
// Given an array of strings, use reduce to find the longest one
let words22 = ["fig", "watermelon", "kiwi", "pomegranate", "date"];



// 23. Build a frequency map from an array of numbers
// Given an array of numbers, use reduce to build an object counting how many times each number appears
let freqNums23 = [1, 2, 2, 3, 1, 4, 2, 3, 3, 3];



// 24. Chain reduce results into a readable summary string
// Given an array of objects {name, amount} representing donations, use reduce to build a single string like "Sam: $10, Ana: $25, Luis: $5"
let donations24 = [
  { name: "Sam", amount: 10 },
  { name: "Ana", amount: 25 },
  { name: "Luis", amount: 5 }
];



// 25. Group an array of objects by a key (general-purpose groupBy)
// Given an array of objects {name, department}, use reduce to build an object where each key is a department and the value is an array of names in that department
let employees25 = [
  { name: "Sam", department: "Engineering" },
  { name: "Ana", department: "Sales" },
  { name: "Luis", department: "Engineering" },
  { name: "Mei", department: "Sales" }
];



// 26. Reduce to find the mode (most frequent value)
// Given an array of numbers, use reduce (possibly two passes) to find the value that appears most often
let nums26 = [4, 1, 2, 2, 3, 2, 4, 4, 4, 1];





// 27. Reduce into a Map instead of a plain object
// Given an array of objects {id, name}, use reduce to build a Map keyed by id (useful when keys might not be strings)
let records27 = [
  { id: 101, name: "Widget" },
  { id: 102, name: "Gadget" },
  { id: 103, name: "Doohickey" }
];



// 28. Reduce right-to-left
// Given an array of strings ["a", "b", "c"], use reduceRight to concatenate them back-to-front into "cba"
let letters28 = ["a", "b", "c"];



// 29. Build a histogram of word lengths
// Given an array of words, use reduce to build an object like { 3: 2, 5: 1 } counting how many words have each length
let words29 = ["cat", "dog", "horse", "ox", "lion", "koala"];



// 30. Reduce to validate a sequence
// Given an array of objects {step, status} where status is "success" or "fail", use reduce to determine whether every step up to and including the first failure succeeded (return true if there was no failure, false if any step failed)
let pipeline30 = [
  { step: "build", status: "success" },
  { step: "test", status: "success" },
  { step: "deploy", status: "fail" },
  { step: "notify", status: "success" }
];
