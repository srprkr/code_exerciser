// Solutions to sort_filter_reduce_practice.js
// Try each problem yourself first, then check your answer here.

// Sort

// 1.
let sWords1 = ["banana", "fig", "kiwi", "pomegranate", "date"];
let sSortByLength = [...sWords1].sort((a, b) => a.length - b.length);
console.log("6.1 ", sSortByLength);

// 2.
let sNums2 = [-8, 3, 1, -2, 6, -1, 9];
let sSortByDistance = [...sNums2].sort((a, b) => Math.abs(a) - Math.abs(b));
console.log("6.2 ", sSortByDistance);

// 3.
let sEvents3 = [
  { event: "Kickoff", date: "2024-06-01" },
  { event: "Launch", date: "2024-01-15" },
  { event: "Review", date: "2024-03-20" }
];
let sSortByDate = [...sEvents3].sort((a, b) => new Date(a.date) - new Date(b.date));
console.log("6.3 ", sSortByDate);

// 4.
let sUsers4 = [
  { name: "Sam", isAdmin: false },
  { name: "Ana", isAdmin: true },
  { name: "Luis", isAdmin: false },
  { name: "Mei", isAdmin: true }
];
let sAdminsFirst = [...sUsers4].sort((a, b) => Number(b.isAdmin) - Number(a.isAdmin));
console.log("6.4 ", sAdminsFirst);

// 5.
let sRacers5 = [
  { name: "Sam", score: 90, timeSeconds: 55 },
  { name: "Ana", score: 90, timeSeconds: 48 },
  { name: "Luis", score: 85, timeSeconds: 40 },
  { name: "Mei", score: 90, timeSeconds: 52 }
];
let sSortByScoreThenTime = [...sRacers5].sort((a, b) => {
  if (a.score !== b.score) {
    return b.score - a.score;
  }
  return a.timeSeconds - b.timeSeconds;
});
console.log("6.5 ", sSortByScoreThenTime);

// 6.
let sTasks6 = [
  { name: "Write docs", priority: "low" },
  { name: "Fix outage", priority: "high" },
  { name: "Refactor utils", priority: "medium" },
  { name: "Patch security hole", priority: "high" }
];
let sPriorityRank = { high: 0, medium: 1, low: 2 };
let sSortByPriority = [...sTasks6].sort((a, b) => sPriorityRank[a.priority] - sPriorityRank[b.priority]);
console.log("6.6 ", sSortByPriority);

// 7.
let sPlayers7 = [
  { name: "Sam", score: 72 },
  { name: "Ana", score: 95 },
  { name: "Luis", score: 88 },
  { name: "Mei", score: 91 },
  { name: "Jo", score: 60 }
];
let sTop3 = [...sPlayers7].sort((a, b) => b.score - a.score).slice(0, 3);
console.log("6.7 - original", sPlayers7);
console.log("6.7 ", sTop3);

// 8.
let sItems8 = ["item2", "item10", "item1", "item20", "item3"];
let sNaturalSort = [...sItems8].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
console.log("6.8 ", sNaturalSort);

// 9.
let sGroups9 = [[1, 2, 3], [1], [4, 5], [1, 2, 3, 4, 5], []];
let sSortByInnerLength = [...sGroups9].sort((a, b) => a.length - b.length);
console.log("6.9 ", sSortByInnerLength);

// 10.
let sPeople10 = [
  { name: "Ana", group: "B" },
  { name: "Ben", group: "A" },
  { name: "Cara", group: "B" },
  { name: "Drew", group: "A" }
];
let sStableSortByGroup = [...sPeople10].sort((a, b) => (a.group > b.group ? 1 : a.group < b.group ? -1 : 0));
console.log("6.10 ", sStableSortByGroup);


// Filter

// 11.
let sProducts11 = [
  { name: "Keyboard", price: 45.00, inStock: true },
  { name: "Monitor", price: 199.99, inStock: true },
  { name: "Mouse", price: 25.50, inStock: false },
  { name: "Webcam", price: 40.00, inStock: true }
];
let sCheapInStock = sProducts11.filter(p => p.inStock && p.price < 50);
console.log("6.11 ", sCheapInStock);

// 12.
let sNums12 = [1, 2, 2, 3, 4, 4, 4, 5, 1];
let sUniqueNums = sNums12.filter((val, index, arr) => arr.indexOf(val) === index);
console.log("6.12 ", sUniqueNums);

// 13.
let sPhrases13 = ["The cat sat", "A dog barked", "THEatre trip", "no match here", "gather round"];
let sContainsThe = sPhrases13.filter(phrase => phrase.toLowerCase().includes("the"));
console.log("6.13 ", sContainsThe);

// 14.
let sPeople14 = [
  { name: "Sam", address: { city: "Austin" } },
  { name: "Ana", address: { city: "Denver" } },
  { name: "Luis", address: { city: "Austin" } }
];
let sAustinResidents = sPeople14.filter(person => person.address.city === "Austin");
console.log("6.14 ", sAustinResidents);

// 15.
let sNums15 = [3, 12, 7, 20, 5, 18];
function sAtLeast(array, minimum) {
  return array.filter(num => num >= minimum);
}
console.log("6.15 ", sAtLeast(sNums15, 10));

// 16.
let sMessy16 = [0, "hello", "", null, 42, undefined, false, "world", NaN];
let sTruthyOnly = sMessy16.filter(Boolean);
console.log("6.16 ", sTruthyOnly);

// 17.
let sEvents17 = [
  { event: "Kickoff", date: "2023-11-01" },
  { event: "Launch", date: "2024-01-15" },
  { event: "Review", date: "2024-03-20" },
  { event: "Wrap-up", date: "2025-01-05" }
];
let sIn2024 = sEvents17.filter(e => new Date(e.date).getFullYear() === 2024);
console.log("6.17 ", sIn2024);

// 18.
let sUsernames18 = ["sam99", "trollking", "ana_dev", "spammer42", "luisc"];
let sBanned18 = ["trollking", "spammer42"];
let sAllowedUsers = sUsernames18.filter(name => !sBanned18.includes(name));
console.log("6.18 ", sAllowedUsers);

// 19.
let sSequence19 = [1, 2, 4, 5, 7, 8, 9, 12];
let sBeforeGap = sSequence19.filter((num, index, arr) => {
  return index < arr.length - 1 && arr[index + 1] !== num + 1;
});
console.log("6.19 ", sBeforeGap);

// 20.
let sPeople20 = [
  { name: "Sam", age: 34 },
  { name: "Ana", age: 19 },
  { name: "Luis", age: 29 }
];
function sHasMinor(people) {
  return people.filter(person => person.age < 21).length > 0;
}
console.log("6.20 ", sHasMinor(sPeople20));


// Reduce

// 21.
let sNested21 = [[1, 2], [3, 4], [5]];
let sFlattened21 = sNested21.reduce((acc, arr) => acc.concat(arr), []);
console.log("6.21 ", sFlattened21);

// 22.
let sWords22 = ["fig", "watermelon", "kiwi", "pomegranate", "date"];
let sLongestWord = sWords22.reduce((longest, word) => word.length > longest.length ? word : longest, "");
console.log("6.22 ", sLongestWord);

// 23.
let sNums23 = [1, 2, 2, 3, 1, 4, 2, 3, 3, 3];
let sNumFrequency = sNums23.reduce((acc, num) => {
  acc[num] = (acc[num] || 0) + 1;
  return acc;
}, {});
console.log("6.23 ", sNumFrequency);

// 24.
let sDonations24 = [
  { name: "Sam", amount: 10 },
  { name: "Ana", amount: 25 },
  { name: "Luis", amount: 5 }
];
let sDonationSummary = sDonations24.reduce((acc, val, index) => {
  return index === 0 ? `${val.name}: $${val.amount}` : `${acc}, ${val.name}: $${val.amount}`;
}, "");
console.log("6.24 ", sDonationSummary);

// 25.
let sEmployees25 = [
  { name: "Sam", department: "Engineering" },
  { name: "Ana", department: "Sales" },
  { name: "Luis", department: "Engineering" },
  { name: "Mei", department: "Sales" }
];
let sGroupedByDept = sEmployees25.reduce((acc, val) => {
  if (!acc[val.department]) {
    acc[val.department] = [];
  }
  acc[val.department].push(val.name);
  return acc;
}, {});
console.log("6.25 ", sGroupedByDept);

// 26.
let sNums26 = [4, 1, 2, 2, 3, 2, 4, 4, 4, 1];
let sModeCounts = sNums26.reduce((acc, num) => {
  acc[num] = (acc[num] || 0) + 1;
  return acc;
}, {});
let sMode26 = Object.entries(sModeCounts).reduce((best, [num, count]) => {
  return count > best.count ? { num: Number(num), count } : best;
}, { num: null, count: 0 });
console.log("6.26 ", sMode26);

// 27.
let sRecords27 = [
  { id: 101, name: "Widget" },
  { id: 102, name: "Gadget" },
  { id: 103, name: "Doohickey" }
];
let sRecordsById = sRecords27.reduce((map, record) => {
  map.set(record.id, record.name);
  return map;
}, new Map());
console.log("6.27 ", sRecordsById);

// 28.
let sLetters28 = ["a", "b", "c"];
let sReversedConcat = sLetters28.reduceRight((acc, letter) => acc + letter, "");
console.log("6.28 ", sReversedConcat);

// 29.
let sWords29 = ["cat", "dog", "horse", "ox", "lion", "koala"];
let sLengthHistogram = sWords29.reduce((acc, word) => {
  acc[word.length] = (acc[word.length] || 0) + 1;
  return acc;
}, {});
console.log("6.29 ", sLengthHistogram);

// 30.
let sPipeline30 = [
  { step: "build", status: "success" },
  { step: "test", status: "success" },
  { step: "deploy", status: "fail" },
  { step: "notify", status: "success" }
];
let sAllSucceeded = sPipeline30.reduce((acc, val) => acc && val.status === "success", true);
console.log("6.30 ", sAllSucceeded);
