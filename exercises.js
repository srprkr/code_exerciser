const exercises = [
  {
    id: 1,
    title: 'Problem 1',
    question: 'Double every number in [1, 2, 3, 4, 5]',
    sampleData: 'let oneToFive = [1, 2, 3, 4, 5];',
    solution: `let doubleTheFive = oneToFive.map(n => n * 2);`,
    output: [2, 4, 6, 8, 10],
    functions: ['map'],
    difficulty: 'easy'
  },
  {
    id: 2,
    title: 'Problem 2',
    question: 'Convert an array of strings to all uppercase',
    sampleData: 'let lower = ["h", "e", "l", "l", "o"];',
    solution: `let upper = lower.map(l => l.toString().toUpperCase());`,
    output: ['H', 'E', 'L', 'L', 'O'],
    functions: ['map'],
    difficulty: 'easy'
  },
  {
    id: 3,
    title: 'Problem 3',
    question: 'Given an array of names, return an array of greeting strings like "Hello, Sam!"',
    sampleData: `let names = ['Sean', 'Ralph', 'Bill', 'Tom', 'Hank'];`,
    solution: `let greetings = names.map(name => \`Hello, \${name}!\`);`,
    output: ['Hello, Sean!', 'Hello, Ralph!', 'Hello, Bill!', 'Hello, Tom!', 'Hello, Hank!'],
    functions: ['map'],
    difficulty: 'easy'
  },
  {
    id: 4,
    title: 'Problem 4',
    question: 'Given an array of numbers, return their squares',
    sampleData: 'let fibonacci = [1, 2, 4, 8, 16];',
    solution: `let squareNums = fibonacci.map(num => num ** 2);`,
    output: [1, 4, 16, 64, 256],
    functions: ['map'],
    difficulty: 'easy'
  },
  {
    id: 5,
    title: 'Problem 5',
    question: 'Given an array of objects {name, age}, return just an array of the names',
    sampleData: `let people = [
  {name: "Sean", age: 39},
  {name: "Amy", age: 28},
  {name: "Matt", age: 43},
  {name: "Stacy", age: 33}
];`,
    solution: `let firstNames = people.map(person => person.name);`,
    output: ['Sean', 'Amy', 'Matt', 'Stacy'],
    functions: ['map'],
    difficulty: 'easy'
  },
  {
    id: 6,
    title: 'Problem 6',
    question: 'Given an array of prices (numbers), return an array with tax added (multiply by 1.08)',
    sampleData: 'let prices = [1.80, 23.42, 6.50, 8.36, 14.78];',
    solution: `let taxPrices = prices.map(price => Number((price * 1.08).toFixed(2)));`,
    output: [1.94, 25.29, 7.02, 9.03, 15.96],
    functions: ['map'],
    difficulty: 'medium'
  },
  {
    id: 7,
    title: 'Problem 7',
    question: 'Given an array of strings, return an array of their lengths',
    sampleData: `let words = ["crab", "France", "Washington D.C.", "FIFA World Cup", "dog", "pest control"];`,
    solution: `let wordCount = words.map(word => word.length);`,
    output: [4, 6, 16, 14, 3, 12],
    functions: ['map'],
    difficulty: 'easy'
  },
  {
    id: 8,
    title: 'Problem 8',
    question: 'Given [1, 2, 3, 4, 5, 6], return only the even numbers',
    sampleData: 'let upToSix = [1, 2, 3, 4, 5, 6];',
    solution: `let evens = upToSix.filter(num => num % 2 === 0)`,
    output: [2, 4, 6],
    functions: ['filter'],
    difficulty: 'easy'
  },
  {
    id: 9,
    title: 'Problem 9',
    question: 'Given an array of words, return only those longer than 4 characters',
    sampleData: `let moreWords = ["pet", "chimichanga", "zebra", "go", "chameleon", "spring", "cat"];`,
    solution: `let moreThanFourChars = moreWords.filter(word => word.length > 4);`,
    output: ['chameleon', 'chimichanga', 'spring', 'zebra'],
    functions: ['filter'],
    difficulty: 'medium'
  },
  {
    id: 10,
    title: 'Problem 10',
    question: 'Given an array of objects {name, age}, return only the people 18 or older (use the people array from problem 5)',
    sampleData: `let people = [
      {name: "Sean", age: 39},
      {name: "Amy", age: 28},
      {name: "Matt", age: 43},
      {name: "Stacy", age: 33}
    ];`,
    solution: `let olderThan18 = people.filter(person => {
  return person.age >= 18
}).map(person => person.name);`,
    output: ['Sean', 'Amy', 'Matt', 'Stacy'],
    functions: ['filter'],
    difficulty: 'easy'
  },
  {
    id: 11,
    title: 'Problem 11',
    question: 'Given an array of numbers, remove all negative numbers',
    sampleData: 'let integers = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];',
    solution: `let positives = integers.filter(num => num >= 0);`,
    output: [0, 1, 2, 3, 4, 5],
    functions: ['filter'],
    difficulty: 'easy'
  },
  {
    id: 12,
    title: 'Problem 12',
    question: 'Given an array of strings, remove any empty strings ("")',
    sampleData: `let animals = ["", "dog", "whale", "cat", "monkey", "", "octopus"];`,
    solution: `let cleanAnimals = animals.filter(word => word.length > 0);`,
    output: ['dog', 'whale', 'cat', 'monkey', 'octopus'],
    functions: ['filter'],
    difficulty: 'easy'
  },
  {
    id: 13,
    title: 'Problem 13',
    question: 'Given an array of objects {name, inStock}, return only items where inStock is true',
    sampleData: `let stock = [{name: "squegee", inStock: true}, {name: "rubber duck", inStock: true}, {name: "soap", inStock: false}, {name: "LCD Monitor", inStock: false}];`,
    solution: `let availableNames = stock
  .filter(item => item.inStock)
  .map(item => item.name);`,
    output: ['squegee', 'rubber duck'],
    functions: ['filter', 'map'],
    difficulty: 'medium'
  },
  {
    id: 14,
    title: 'Problem 14',
    question: 'Sum all numbers in an array',
    sampleData: 'let oneToFive = [1, 2, 3, 4, 5];',
    solution: `let summedFive = oneToFive.reduce((acc, val) => acc + val, 0);`,
    output: 15,
    functions: ['reduce'],
    difficulty: 'medium'
  },
  {
    id: 15,
    title: 'Problem 15',
    question: 'Find the maximum number in an array',
    sampleData: 'let oneToFive = [1, 2, 3, 4, 5];',
    solution: `let maxOfFive = oneToFive.reduce((acc, val) => {
  return acc < val ? val : acc;
}, oneToFive[0]);`,
    output: 5,
    functions: ['reduce'],
    difficulty: 'medium'
  },
  {
    id: 16,
    title: 'Problem 16',
    question: 'Count how many items in an array are even',
    sampleData: 'let oneToFive = [1, 2, 3, 4, 5];',
    solution: `let evenOfFive = oneToFive.reduce((acc, val) => acc + (val % 2 === 0), 0);`,
    output: 2,
    functions: ['reduce'],
    difficulty: 'medium'
  },
  {
    id: 17,
    title: 'Problem 17',
    question: 'Given an array of objects {price}, get the total price',
    sampleData: `const cart = [
  { price: 12.99 },
  { price: 5.50 },
  { price: 20.00 },
  { price: 3.25 }
];`,
    solution: `let priceTotal = cart.reduce((acc, value) => acc + value.price, 0);`,
    output: 41.74,
    functions: ['reduce'],
    difficulty: 'easy'
  },
  {
    id: 18,
    title: 'Problem 18',
    question: 'Concatenate an array of strings into one sentence, separated by spaces',
    sampleData: `let sentenceWords = ["The", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog"];`,
    solution: `let sentence = sentenceWords.reduce((acc, word) => acc + " " + word) + '.';`,
    output: 'The quick brown fox jumps over the lazy dog.',
    functions: ['reduce'],
    difficulty: 'medium'
  },
  {
    id: 19,
    title: 'Problem 19',
    question: 'Given an array of words, build an object counting how many times each word appears (e.g. ["a","b","a"] → {a: 2, b: 1})',
    sampleData: `let wordsToCount = ['dog', 'elephant', 'domino', 'octopus', 'sausage', 'dagger', 'dog', 'elephant', 'domino', 'dog', 'cat', 'domino', 'octopus', 'skit'];`,
    solution: `let wordKeyCount = wordsToCount.reduce((acc, word)   => {
      if (acc[word]) {
        acc[word]++;
      } else {
        acc[word] = 1;
      }
      return acc;
    }, {});`,
    output: { dog: 3, elephant: 2, domino: 3, octopus: 2, sausage: 1, dagger: 1, cat: 1, skit: 1 },
    functions: ['reduce'],
    difficulty: 'medium'
  },
  {
    id: 20,
    title: 'Problem 20',
    question: 'Given an array of objects {name, price, inStock}, get the total price of only the items that are in stock (filter, then reduce)',
    sampleData: `const bag = [
      { name: "Keyboard", price: 45.00, inStock: true },
      { name: "Monitor", price: 199.99, inStock: false },
      { name: "Mouse", price: 25.50, inStock: true },
      { name: "Webcam", price: 60.00, inStock: false },
      { name: "Headset", price: 80.00, inStock: true }
    ];`,
    solution: `let currentStockTotal = bag
    .filter(item => item.inStock)
    .reduce((acc, val) => {
      return acc + val.price
    }, 0);`,
    output: 150.5,
    functions: ['filter', 'reduce'],
    difficulty: 'hard'
  },
  {
    id: 21,
    title: 'Problem 21',
    question: 'Given an array of temperatures in Celsius, convert them all to Fahrenheit.',
    sampleData: 'const temps = [0, 20, 37, 100, -10];',
    solution: `const fahrenheitTemps = temps.map((temp) => Number(((temp * 9) / 5 + 32).toFixed(2)));`,
    output: [32, 68, 98.6, 212, 14],
    functions: ['map'],
    difficulty: 'medium'
  },
  {
    id: 22,
    title: 'Problem 22',
    question: 'Given an array of objects {firstName, lastName}, return an array of full name strings',
    sampleData: `let namesObj = [
  { firstName: "Sam", lastName: "Ortiz" },
  { firstName: "Ana", lastName: "Kim" },
  { firstName: "Luis", lastName: "Fernandez" }
];`,
    solution: `let fullNames = namesObj.map(person => \`\${person.firstName} \${person.lastName}\`);`,
    output: ['Sam Ortiz', 'Ana Kim', 'Luis Fernandez'],
    functions: ['map'],
    difficulty: 'easy'
  },
  {
    id: 23,
    title: 'Problem 23',
    question: 'Given an array of numbers, return an array of objects like { value: n, isEven: true/false }',
    sampleData: 'let numbers3 = [4, 7, 10, 13, 22];',
    solution: `let evenTally = numbers3.map(num => ({value: num, isEven: num % 2 === 0}));`,
    output: [
      { value: 4, isEven: true },
      { value: 7, isEven: false },
      { value: 10, isEven: true },
      { value: 13, isEven: false },
      { value: 22, isEven: true }
    ],
    functions: ['map'],
    difficulty: 'medium'
  },
  {
    id: 24,
    title: 'Problem 24',
    question: "Given an array of objects {name, price}, return a new array of objects with price rounded to 2 decimal places (don't mutate the originals)",
    sampleData: `let products4 = [
  { name: "Widget", price: 19.49 },
  { name: "Gadget", price: 42.75 },
  { name: "Doohickey", price: 5.20 }
];`,
    solution: `let roundedPrices = products4.map(product => ({name: product.name, price: Number(product.price.toFixed(2))}))`,
    output: [
      { name: 'Widget', price: 19.49 },
      { name: 'Gadget', price: 42.75 },
      { name: 'Doohickey', price: 5.2 }
    ],
    functions: ['map'],
    difficulty: 'medium'
  },
  {
    id: 25,
    title: 'Problem 25',
    question: 'Given an array of URLs (strings), return an array of objects { url, domain } where domain is extracted from the string',
    sampleData: `let urls = [
  "https://www.amazon.com/product/123",
  "https://openai.com/blog",
  "https://sub.example.co.uk/page"
];`,
    solution: `let domains = urls.map(url => {
  return {url: url, domain: new URL(url).hostname}
});`,
    output: [
      { url: 'https://www.amazon.com/product/123', domain: 'www.amazon.com' },
      { url: 'https://openai.com/blog', domain: 'openai.com' },
      { url: 'https://sub.example.co.uk/page', domain: 'sub.example.co.uk' }
    ],
    functions: ['map'],
    difficulty: 'hard'
  },
  {
    id: 26,
    title: 'Problem 26',
    question: 'Given an array of objects {title, rating}, return only the titles of the ones rated 4 or higher',
    sampleData: `let reviews = [
      { title: "Great book", rating: 5 },
      { title: "Meh", rating: 2 },
      { title: "Pretty good", rating: 4 },
      { title: "Terrible", rating: 1 }
    ];`,
    solution: `let over4Rating = reviews
      .filter(review => review.rating >= 4)
      .map(review => review.title);`,
    output: ['Great book', 'Pretty good'],
    functions: ['filter', 'map'],
    difficulty: 'easy'
  },
  {
    id: 27,
    title: 'Problem 27',
    question: 'Given an array of objects {name, tags: [...]}, return only the objects whose tags array includes "urgent"',
    sampleData: `let tickets = [
      { name: "Fix login bug", tags: ["bug", "urgent"] },
      { name: "Update docs", tags: ["docs"] },
      { name: "Server down", tags: ["urgent", "infra"] }
    ];`,
    solution: `let urgentTickets = tickets.filter(ticket => {
      return ticket["tags"].includes('urgent');
    })`,
    output: [
      { name: 'Fix login bug', tags: ['bug', 'urgent'] },
      { name: 'Server down', tags: ['urgent', 'infra'] }
    ],
    functions: ['filter'],
    difficulty: 'medium'
  },
  {
    id: 28,
    title: 'Problem 28',
    question: 'Given an array of numbers, return only the ones that are prime',
    sampleData: 'let numbers8 = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];',
    solution: `let isPrime = (num) => {
      if(num <= 1) return false;
      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
      }
      return true;
    }

    let prime8 = numbers8.filter(isPrime);`,
    output: [2, 3, 5, 7, 11],
    functions: ['filter'],
    difficulty: 'hard'
  },
  {
    id: 29,
    title: 'Problem 29',
    question: 'Given an array of objects {id, deleted}, return only the non-deleted ones',
    sampleData: `let records = [
      { id: 1, deleted: false },
      { id: 2, deleted: true },
      { id: 3, deleted: false },
      { id: 4, deleted: true }
    ];`,
    solution: `let nondeletedRecords = records.filter(record => !record.deleted)`,
    output: [
      { id: 1, deleted: false },
      { id: 3, deleted: false }
    ],
    functions: ['filter'],
    difficulty: 'easy'
  },
  {
    id: 30,
    title: 'Problem 30',
    question: 'Given an array of strings, return only the ones that are valid-looking emails (contain @ and .)',
    sampleData: `let strings10 = [
      "sam@example.com",
      "not-an-email",
      "ana.kim@school.edu",
      "just text",
      "bad@nodot"
    ];`,
    solution: `let validEmails = strings10.filter(str =>    str.includes("@") && str.includes("."));`,
    output: ['sam@example.com', 'ana.kim@school.edu'],
    functions: ['filter'],
    difficulty: 'easy'
  },
  {
    id: 31,
    title: 'Problem 31',
    question: 'Given an array of numbers, find both the min and max in a single reduce, returning { min, max }',
    sampleData: 'let numbers11 = [8, 3, 17, 4, 22, 1, 15];',
    solution: `let minMaxNums = numbers11.reduce((acc, val) => {
      if (val < acc['min']) {
        acc['min'] = val;
      };
      if (val > acc['max']) {
        acc['max'] = val;
      };

      return acc;
    }, {min: Infinity, max: -Infinity});`,
    output: { min: 1, max: 22 },
    functions: ['reduce'],
    difficulty: 'medium'
  },
  {
    id: 32,
    title: 'Problem 32',
    question: 'Given an array of objects {category, amount}, build an object that totals amount per category (e.g. groceries, rent, fun → { groceries: 120, rent: 800, fun: 45 })',
    sampleData: `let expenses = [
      { category: "groceries", amount: 60 },
      { category: "rent", amount: 800 },
      { category: "fun", amount: 20 },
      { category: "groceries", amount: 60 },
      { category: "fun", amount: 25 }
    ];`,
    solution: `let totalByCategory = expenses.reduce((acc, val) => {
      if (acc[val.category]) {
        acc[val.category] += Number(val.amount);
      } else {
        acc[val.category] = Number(val.amount);
      }
      return acc;
    }, {});`,
    output: { groceries: 120, rent: 800, fun: 45 },
    functions: ['reduce'],
    difficulty: 'medium'
  },
  {
    id: 33,
    title: 'Problem 33',
    question: 'Given an array of objects {name, age}, build an object keyed by name, mapping to age (e.g. { "Sam": 25, "Ana": 31 })',
    sampleData: `let people13 = [
      { name: "Sam", age: 25 },
      { name: "Ana", age: 31 },
      { name: "Luis", age: 28 }
    ];`,
    solution: `let nameAge = people13.reduce((acc, val) => {
      acc[val.name] = val.age;
      return acc;
    }, {});`,
    output: { Sam: 25, Ana: 31, Luis: 28 },
    functions: ['reduce'],
    difficulty: 'easy'
  },
  {
    id: 34,
    title: 'Problem 34',
    question: 'Given an array of letters, build an object counting vowels vs consonants: { vowels: 5, consonants: 9 }',
    sampleData: `let letters = ["d", "o", "g", "e", "l", "e", "p", "h", "a", "n", "t"];`,
    solution: `let consonantVowelCount = letters.reduce((acc, val) => {
      const vowels = ['a', 'e', 'i', 'o', 'u'];
      if (vowels.includes(val)) {
        acc.vowels += 1;
      } else {
        acc.consonants += 1;
      }
      return acc;
    }, {vowels: 0, consonants: 0})`,
    output: { vowels: 4, consonants: 7 },
    functions: ['reduce'],
    difficulty: 'medium'
  },
  {
    id: 35,
    title: 'Problem 35',
    question: 'Given an array of objects {student, passed: true/false}, produce { passed: 12, failed: 3 }',
    sampleData: `let students = [
      { student: "Sam", passed: true },
      { student: "Ana", passed: true },
      { student: "Luis", passed: false },
      { student: "Mei", passed: true },
      { student: "Jo", passed: false }
    ];`,
    solution: `let passFailCount = students.reduce((acc, val) => {
      if(val.passed) {
        acc.passed += 1;
      } else {
        acc.failed += 1;
      }
      return acc;
    }, {passed: 0, failed: 0});`,
    output: { passed: 3, failed: 2 },
    functions: ['reduce'],
    difficulty: 'easy'
  },
  {
    id: 36,
    title: 'Problem 36',
    question: 'Given an array of objects {name, department, salary}, build an object where each key is a department and the value is the average salary in that department (group with reduce, then a second pass to divide)',
    sampleData: `let employees = [
      { name: "Sam", department: "Engineering", salary: 90000 },
      { name: "Ana", department: "Engineering", salary: 110000 },
      { name: "Luis", department: "Sales", salary: 70000 },
      { name: "Mei", department: "Sales", salary: 75000 },
      { name: "Jo", department: "Engineering", salary: 95000 }
    ];`,
    solution: `let salaryCountByDept = employees.reduce((acc, val) => {
      if (!acc[val.department]) {
        acc[val.department] = {total: val.salary, count: 1};
      } else {
        acc[val.department].total += val.salary;
        acc[val.department].count += 1;
      }

      return acc;
    }, {});

    let avgSalaryByDept = Object.entries(salaryCountByDept).reduce((acc, [dept, stats]) => {
      acc[dept] = Number((stats.total / stats.count).toFixed(2));
      return acc;
    }, {});`,
    output: { Engineering: 98333.33, Sales: 72500 },
    functions: ['reduce'],
    difficulty: 'hard'
  },
  {
    id: 37,
    title: 'Problem 37',
    question: 'Given an array of objects {title, genre, rating}, return an array of just the titles of movies in the "Comedy" genre with rating above 7 (filter, then map)',
    sampleData: `let movies = [
      { title: "Laugh Riot", genre: "Comedy", rating: 8.2 },
      { title: "Dark Night", genre: "Drama", rating: 9.0 },
      { title: "Silly Business", genre: "Comedy", rating: 6.5 },
      { title: "Funny Farm", genre: "Comedy", rating: 7.8 }
    ];`,
    solution: `let comediesAbove7 = movies
    .filter(movie => movie.genre === "Comedy" && movie.rating > 7)
    .map(movie => movie.title);`,
    output: ['Laugh Riot', 'Funny Farm'],
    functions: ['filter', 'map'],
    difficulty: 'medium'
  },
  {
    id: 38,
    title: 'Problem 38',
    question: 'Given an array of numbers, build an object { evens: [...], odds: [...] } splitting them into two arrays (reduce)',
    sampleData: 'let numbers18 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];',
    solution: `let oddEvenSplit = numbers18.reduce((arr, val) => {
      val % 2 === 0 ? arr.evens = [...arr.evens, val] : arr.odds = [...arr.odds, val];
      return arr;
    }, {evens: [], odds: []});`,
    output: { evens: [2, 4, 6, 8, 10], odds: [1, 3, 5, 7, 9] },
    functions: ['reduce'],
    difficulty: 'medium'
  },
  {
    id: 39,
    title: 'Problem 39',
    question: 'Given an array of objects {name, inStock, price}, return an object { inStockCount, totalValue } summarizing the whole cart in one reduce pass',
    sampleData: `let cart19 = [
      { name: "Keyboard", inStock: true, price: 45.00 },
      { name: "Monitor", inStock: false, price: 199.99 },
      { name: "Mouse", inStock: true, price: 25.50 },
      { name: "Webcam", inStock: true, price: 60.00 }
    ];`,
    solution: `let stockSummary = cart19.reduce((acc, val) => {
      if (val.inStock) {
        acc['inStockCount'] += 1,
        acc['totalValue'] += val.price
      };
      return acc;
    }, {inStockCount: 0, totalValue: 0});`,
    output: { inStockCount: 3, totalValue: 130.5 },
    functions: ['reduce'],
    difficulty: 'medium'
  },
  {
    id: 40,
    title: 'Problem 40',
    question: 'Given an array of transactions {type: "credit"|"debit", amount}, compute a running balance and return an array showing the balance after each transaction',
    sampleData: `let transactions = [
      { type: "credit", amount: 100 },
      { type: "debit", amount: 30 },
      { type: "credit", amount: 50 },
      { type: "debit", amount: 20 }
    ];`,
    solution: `let result = transactions.reduce((acc, charge) => {
      if (charge.type == "credit") {
        acc.tally += charge.amount;
      }
      if (charge.type == "debit") {
        acc.tally -= charge.amount;
      }
      acc.history.push(acc.tally);
      return acc;
    }, { tally: 0, history: [] });

    let charges = result.history;`,
    output: [100, 70, 120, 100],
    functions: ['reduce'],
    difficulty: 'hard'
  }
];

// Master list of function tags. Includes tags not yet used by any exercise
// (sort, some, every) so their filter pills are ready for future problems.
const KNOWN_FUNCTIONS = ['map', 'filter', 'reduce', 'sort', 'some', 'every'];
const DIFFICULTIES = ['easy', 'medium', 'hard'];

const activeFunctionFilters = new Set();
let activeDifficultyFilter = null;
let currentExerciseIndex = 0;

const exerciseEl = document.querySelector('#exercise-1');
const titleEl = document.querySelector('#exercise-1 .exercise-title');
const tagsEl = document.querySelector('#exercise-1 .tags');
const questionEl = document.querySelector('#exercise-1 .question');
const sampleDataEl = document.querySelector('#exercise-1 .sample-data');
const solutionEl = document.querySelector('#exercise-1 .solution');
const outputEl = document.querySelector('#exercise-1 .output');
const counterEl = document.querySelector('.carousel-counter');
const buttons = document.querySelectorAll('.carousel-button');
const functionFiltersEl = document.querySelector('#function-filters');
const difficultyFiltersEl = document.querySelector('#difficulty-filters');
const clearFiltersButton = document.querySelector('#clear-filters');
const noResultsEl = document.querySelector('#no-results');

function getFilteredExercises() {
  return exercises.filter((exercise) => {
    const matchesFunctions =
      activeFunctionFilters.size === 0 ||
      [...activeFunctionFilters].every((fn) => exercise.functions.includes(fn));
    const matchesDifficulty =
      !activeDifficultyFilter || exercise.difficulty === activeDifficultyFilter;

    return matchesFunctions && matchesDifficulty;
  });
}

function renderExercise(index) {
  const filtered = getFilteredExercises();
  const exercise = filtered[index];

  const hasResults = filtered.length > 0;
  if (exerciseEl) exerciseEl.hidden = !hasResults;
  if (noResultsEl) noResultsEl.hidden = hasResults;

  if (!exercise || !exerciseEl) {
    if (counterEl) counterEl.textContent = '0 / 0';
    return;
  }

  if (titleEl) titleEl.textContent = `Problem ${exercise.id}`;
  if (tagsEl) {
    tagsEl.innerHTML = '';
    exercise.functions.forEach((fn) => {
      const span = document.createElement('span');
      span.className = 'tag tag-fn';
      span.textContent = fn;
      tagsEl.appendChild(span);
    });
    const difficultySpan = document.createElement('span');
    difficultySpan.className = `tag tag-difficulty-${exercise.difficulty}`;
    difficultySpan.textContent = exercise.difficulty;
    tagsEl.appendChild(difficultySpan);
  }
  if (questionEl) questionEl.textContent = exercise.question;
  if (sampleDataEl) sampleDataEl.textContent = exercise.sampleData;
  if (solutionEl) solutionEl.textContent = exercise.solution;
  if (outputEl) outputEl.textContent = JSON.stringify(exercise.output, null, 2);
  if (counterEl) counterEl.textContent = `${index + 1} / ${filtered.length}`;
}

function resetIndexAndRender() {
  currentExerciseIndex = 0;
  renderExercise(currentExerciseIndex);
}

function renderFilterPills() {
  if (functionFiltersEl) {
    KNOWN_FUNCTIONS.forEach((fn) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'pill';
      button.textContent = fn;
      button.dataset.value = fn;
      button.addEventListener('click', () => {
        if (activeFunctionFilters.has(fn)) {
          activeFunctionFilters.delete(fn);
          button.classList.remove('active');
        } else {
          if (activeFunctionFilters.size >= 2) return;
          activeFunctionFilters.add(fn);
          button.classList.add('active');
        }
        resetIndexAndRender();
      });
      functionFiltersEl.appendChild(button);
    });
  }

  if (difficultyFiltersEl) {
    DIFFICULTIES.forEach((level) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'pill';
      button.textContent = level;
      button.dataset.value = level;
      button.addEventListener('click', () => {
        const alreadyActive = activeDifficultyFilter === level;
        difficultyFiltersEl
          .querySelectorAll('.pill')
          .forEach((pill) => pill.classList.remove('active'));

        activeDifficultyFilter = alreadyActive ? null : level;
        if (!alreadyActive) button.classList.add('active');

        resetIndexAndRender();
      });
      difficultyFiltersEl.appendChild(button);
    });
  }
}

if (clearFiltersButton) {
  clearFiltersButton.addEventListener('click', () => {
    activeFunctionFilters.clear();
    activeDifficultyFilter = null;
    document.querySelectorAll('.filters .pill').forEach((pill) => pill.classList.remove('active'));
    resetIndexAndRender();
  });
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;
    const filteredLength = getFilteredExercises().length;

    if (filteredLength === 0) return;

    if (action === 'next') {
      currentExerciseIndex = (currentExerciseIndex + 1) % filteredLength;
    } else if (action === 'prev') {
      currentExerciseIndex = (currentExerciseIndex - 1 + filteredLength) % filteredLength;
    }

    renderExercise(currentExerciseIndex);
  });
});

renderFilterPills();
renderExercise(currentExerciseIndex);
