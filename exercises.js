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
  },
  {
    id: 41,
    title: 'Problem 41',
    question: 'Sort an array of numbers in ascending order',
    sampleData: 'let nums1 = [5, 2, 8, 1, 9];',
    solution: `let ascNums = nums1.sort((a, b) => a - b);`,
    output: [1, 2, 5, 8, 9],
    functions: ['sort'],
    difficulty: 'easy'
  },
  {
    id: 42,
    title: 'Problem 42',
    question: 'Sort that same array in descending order',
    sampleData: 'let descNums2 = [5, 2, 8, 1, 9];',
    solution: `let descNums = descNums2.sort((a, b) => b - a);`,
    output: [9, 8, 5, 2, 1],
    functions: ['sort'],
    difficulty: 'easy'
  },
  {
    id: 43,
    title: 'Problem 43',
    question: 'Sort an array of strings alphabetically',
    sampleData: `let fruits3 = ["banana", "apple", "cherry"];`,
    solution: `let descLetters = fruits3.sort();`,
    output: ['apple', 'banana', 'cherry'],
    functions: ['sort'],
    difficulty: 'easy'
  },
  {
    id: 44,
    title: 'Problem 44',
    question: 'Sort an array of strings in reverse alphabetical order',
    sampleData: `let fruits4 = ["banana", "apple", "cherry"];`,
    solution: `let ascLetters = fruits4.sort((a, b) => (a < b ? 1 : -1));`,
    output: ['cherry', 'banana', 'apple'],
    functions: ['sort'],
    difficulty: 'easy'
  },
  {
    id: 45,
    title: 'Problem 45',
    question: 'Given an array of objects {name, age}, sort by age ascending',
    sampleData: `let people5 = [
      { name: "Sam", age: 34 },
      { name: "Ana", age: 22 },
      { name: "Luis", age: 29 }
    ];`,
    solution: `let ascAge = people5.sort((a, b) => a.age - b.age);`,
    output: [
      { name: 'Ana', age: 22 },
      { name: 'Luis', age: 29 },
      { name: 'Sam', age: 34 }
    ],
    functions: ['sort'],
    difficulty: 'easy'
  },
  {
    id: 46,
    title: 'Problem 46',
    question: 'Given an array of objects {title, price}, sort by price descending',
    sampleData: `let products6 = [
      { title: "Widget", price: 19.99 },
      { title: "Gadget", price: 42.50 },
      { title: "Doohickey", price: 5.25 }
    ];`,
    solution: `let ascPrice = products6.sort((a, b) => a.price - b.price);`,
    output: [
      { title: 'Doohickey', price: 5.25 },
      { title: 'Widget', price: 19.99 },
      { title: 'Gadget', price: 42.5 }
    ],
    functions: ['sort'],
    difficulty: 'medium'
  },
  {
    id: 47,
    title: 'Problem 47',
    question: 'Sort an array of numbers without mutating the original array',
    sampleData: 'let nums7 = [7, 3, 9, 1, 5];',
    solution: `let sortedNumbers = [...nums7].sort((a, b) => a - b);`,
    output: [1, 3, 5, 7, 9],
    functions: ['sort', 'spread'],
    difficulty: 'medium'
  },
  {
    id: 48,
    title: 'Problem 48',
    question: 'Given an array of strings with mixed casing, sort them alphabetically in a case-insensitive way',
    sampleData: `let words8 = ["banana", "Apple", "cherry", "Date"];`,
    solution: `let noCaseSort = [...words8].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))`,
    output: ['Apple', 'banana', 'cherry', 'Date'],
    functions: ['sort', 'spread'],
    difficulty: 'medium'
  },
  {
    id: 49,
    title: 'Problem 49',
    question: 'Given an array of objects {name, department}, sort first by department alphabetically, and for people in the same department, sort by name alphabetically (a tie-breaker sort)',
    sampleData: `let people9 = [
      { name: "Luis", department: "Sales" },
      { name: "Ana", department: "Engineering" },
      { name: "Sam", department: "Engineering" },
      { name: "Mei", department: "Sales" },
      { name: "Jo", department: "Engineering" }
    ];`,
    solution: `let sortByDept = [...people9].sort((a, b) => {
      if (a.department !== b.department) {
        return a.department > b.department ? 1 : -1;
      } else {
        return a.name > b.name ? 1 : -1;
      }
    });`,
    output: [
      { name: 'Ana', department: 'Engineering' },
      { name: 'Jo', department: 'Engineering' },
      { name: 'Sam', department: 'Engineering' },
      { name: 'Luis', department: 'Sales' },
      { name: 'Mei', department: 'Sales' }
    ],
    functions: ['sort', 'spread'],
    difficulty: 'hard'
  },
  {
    id: 50,
    title: 'Problem 50',
    question: 'Given an array of numbers like [10, 1, 21, 2], sort them numerically ascending, and consider why calling plain .sort() with no comparator gives a wrong-looking result here',
    sampleData: 'let nums10 = [10, 1, 21, 2];',
    solution: `let nums10Sort = [...nums10].sort((a, b) => a - b);`,
    output: [1, 2, 10, 21],
    functions: ['sort', 'spread'],
    difficulty: 'medium'
  },
  {
    id: 51,
    title: 'Problem 51',
    question: 'Copy an array into a new array without mutating the original',
    sampleData: 'let original11 = [1, 2, 3];',
    solution: `let copy11 = [...original11];`,
    output: [1, 2, 3],
    functions: ['spread'],
    difficulty: 'easy'
  },
  {
    id: 52,
    title: 'Problem 52',
    question: 'Combine two arrays into one',
    sampleData: `let arrA12 = [1, 2, 3];
    let arrB12 = [4, 5, 6];`,
    solution: `let combinedArrs = [...arrA12, ...arrB12];`,
    output: [1, 2, 3, 4, 5, 6],
    functions: ['spread'],
    difficulty: 'easy'
  },
  {
    id: 53,
    title: 'Problem 53',
    question: 'Copy an object into a new object without mutating the original',
    sampleData: `let original13 = { name: "Sam", age: 25 };`,
    solution: `let copy13 = {...original13};`,
    output: { name: 'Sam', age: 25 },
    functions: ['spread'],
    difficulty: 'easy'
  },
  {
    id: 54,
    title: 'Problem 54',
    question: "Given an object {name, age}, create a new object that's the same but with age updated to 26, without touching the original",
    sampleData: `let original14 = { name: "Sam", age: 25 };`,
    solution: `let copy14 = {...original14, age: 26};`,
    output: { name: 'Sam', age: 26 },
    functions: ['spread'],
    difficulty: 'easy'
  },
  {
    id: 55,
    title: 'Problem 55',
    question: 'Add a new item to the front of an array without using .unshift() (i.e., without mutating)',
    sampleData: `let original15 = [2, 3, 4];
    let newItem15 = 1;`,
    solution: `let addToFront = [newItem15, ...original15];`,
    output: [1, 2, 3, 4],
    functions: ['spread'],
    difficulty: 'easy'
  },
  {
    id: 56,
    title: 'Problem 56',
    question: 'Add a new item to the end of an array without using .push()',
    sampleData: `let original16 = [1, 2, 3];
    let newItem16 = 4;`,
    solution: `let addToEnd = [...original16, newItem16];`,
    output: [1, 2, 3, 4],
    functions: ['spread'],
    difficulty: 'easy'
  },
  {
    id: 57,
    title: 'Problem 57',
    question: 'Given two objects, merge them into a single object',
    sampleData: `let personInfo17 = { name: "Sam", age: 25 };
    let contactInfo17 = { email: "sam@email.com" };`,
    solution: `let objMerge = {...personInfo17, ...contactInfo17};`,
    output: { name: 'Sam', age: 25, email: 'sam@email.com' },
    functions: ['spread'],
    difficulty: 'easy'
  },
  {
    id: 58,
    title: 'Problem 58',
    question: 'Given an array of numbers, create a copy with one extra number inserted, then pass that copy into Math.max() to find the new maximum (spread works on function arguments too)',
    sampleData: `let nums18 = [4, 9, 2, 15];
    let extraNum18 = 30;`,
    solution: `let maxArray = [...nums18, extraNum18];
    let maxNumber = Math.max(...maxArray);`,
    output: 30,
    functions: ['spread'],
    difficulty: 'medium'
  },
  {
    id: 59,
    title: 'Problem 59',
    question: 'Given a function sum(a, b, c), call it by spreading an array [1, 2, 3] into its three arguments',
    sampleData: `function sum19(a, b, c) {
      return a + b + c;
    }
    let inputs19 = [1, 2, 3];`,
    solution: `let spreadFunc = sum19(...inputs19);`,
    output: 6,
    functions: ['spread'],
    difficulty: 'easy'
  },
  {
    id: 60,
    title: 'Problem 60',
    question: 'Given an array of objects, create a new array where one specific object (id: 2) has an updated property, everything else stays the same, and nothing is mutated (combine spread on the array with spread on the object)',
    sampleData: `let items20 = [
      { id: 1, name: "Keyboard", price: 45.00 },
      { id: 2, name: "Monitor", price: 199.99 },
      { id: 3, name: "Mouse", price: 25.50 }
    ];`,
    solution: `let updated20 = items20.map(item => {
      return item.id === 2 ? {...item, price: 179.99 } : item;
    });`,
    output: [
      { id: 1, name: 'Keyboard', price: 45 },
      { id: 2, name: 'Monitor', price: 179.99 },
      { id: 3, name: 'Mouse', price: 25.5 }
    ],
    functions: ['map', 'spread'],
    difficulty: 'hard'
  },
  {
    id: 61,
    title: 'Problem 61',
    question: 'Given [10, 20, 30], pull the first and second values into variables first and second',
    sampleData: 'let arr1 = [10, 20, 30];',
    solution: `let [first, second] = arr1;`,
    output: [10, 20],
    functions: ['destructure'],
    difficulty: 'easy'
  },
  {
    id: 62,
    title: 'Problem 62',
    question: 'Given [1, 2, 3], destructure to grab the first and third values, skipping the second',
    sampleData: 'let arr2 = [1, 2, 3];',
    solution: `let [one, , three] = arr2;`,
    output: [1, 3],
    functions: ['destructure'],
    difficulty: 'medium'
  },
  {
    id: 63,
    title: 'Problem 63',
    question: 'Given let a = 1, b = 2, swap their values using destructuring (no temp variable)',
    sampleData: `let a3 = 1;
    let b3 = 2;`,
    solution: `[a3, b3] = [b3, a3];`,
    output: [2, 1],
    functions: ['destructure'],
    difficulty: 'medium'
  },
  {
    id: 64,
    title: 'Problem 64',
    question: 'Given [1, 2, 3, 4, 5], pull the first value into head and the rest into an array tail',
    sampleData: 'let arr4 = [1, 2, 3, 4, 5];',
    solution: `let [head, ...tail] = arr4;`,
    output: [1, [2, 3, 4, 5]],
    functions: ['destructure', 'spread'],
    difficulty: 'medium'
  },
  {
    id: 65,
    title: 'Problem 65',
    question: 'Given { name: "Sam", age: 25 }, pull name and age into variables of the same name',
    sampleData: `let person5 = { name: "Sam", age: 25 };`,
    solution: `let {name, age} = person5;`,
    output: ['Sam', 25],
    functions: ['destructure'],
    difficulty: 'easy'
  },
  {
    id: 66,
    title: 'Problem 66',
    question: 'Given { name: "Sam", age: 25 }, pull name into a variable called userName',
    sampleData: `let person6 = { name: "Sam", age: 25 };`,
    solution: `let {name: userName} = person6;`,
    output: 'Sam',
    functions: ['destructure'],
    difficulty: 'easy'
  },
  {
    id: 67,
    title: 'Problem 67',
    question: 'Given { name: "Sam" } (no age), destructure age with a default value of 18',
    sampleData: `let person7 = { name: "Sam" };`,
    solution: `let {name: userName7, age: age7 = 18} = person7;`,
    output: ['Sam', 18],
    functions: ['destructure'],
    difficulty: 'medium'
  },
  {
    id: 68,
    title: 'Problem 68',
    question: 'Given { name: "Sam", address: { city: "Austin", zip: "78701" } }, pull city directly into a variable',
    sampleData: `let person8 = { name: "Sam", address: { city: "Austin", zip: "78701" } };`,
    solution: `let {
      address: {
        city
      },
    } = person8;`,
    output: 'Austin',
    functions: ['destructure'],
    difficulty: 'medium'
  },
  {
    id: 69,
    title: 'Problem 69',
    question: 'Write a function greet({ name, age }) that returns a string like "Sam is 25 years old" using destructured parameters',
    sampleData: `let greet = ({name, age}) => {
      return \`\${name} is \${age} years old\`;
    };`,
    solution: `greet({ name: "Sam", age: 25 });`,
    output: 'Sam is 25 years old',
    functions: ['destructure', 'template-literal'],
    difficulty: 'medium'
  },
  {
    id: 70,
    title: 'Problem 70',
    question: 'Given [{ id: 1, name: "Sam" }, { id: 2, name: "Ana" }], use a for...of loop with destructuring to log "1: Sam" and "2: Ana"',
    sampleData: `let users10 = [
      { id: 1, name: "Sam" },
      { id: 2, name: "Ana" }
    ];`,
    solution: `for (let {id, name} of users10) {
      console.log(\`\${id}: \${name}\`);
    }`,
    output: ['1: Sam', '2: Ana'],
    functions: ['destructure', 'template-literal'],
    difficulty: 'medium'
  },
  {
    id: 71,
    title: 'Problem 71',
    question: 'Given let name = "Sam", build the string "Hello, Sam!" using a template literal',
    sampleData: 'let name11 = "Sam";',
    solution: `let greet11 = \`Hello, \${name11}!\`;`,
    output: 'Hello, Sam!',
    functions: ['template-literal'],
    difficulty: 'easy'
  },
  {
    id: 72,
    title: 'Problem 72',
    question: 'Given let a = 4, b = 5, build the string "4 + 5 = 9" using a template literal (no manual string concatenation)',
    sampleData: `let a12 = 4;
    let b12 = 5;`,
    solution: `let equation12 = \`\${a12} + \${b12} = \${a12 + b12}\`;`,
    output: '4 + 5 = 9',
    functions: ['template-literal'],
    difficulty: 'easy'
  },
  {
    id: 73,
    title: 'Problem 73',
    question: 'Build a multi-line address string ("123 Main St", "Austin, TX 78701") using a template literal instead of \\n',
    sampleData: '(no sample data)',
    solution: `let address13 = \`
    123 Main St,
    Austin,
    TX 78701
\`;`,
    output: '\n  123 Main St,\n  Austin,\n  TX 78701\n',
    functions: ['template-literal'],
    difficulty: 'easy'
  },
  {
    id: 74,
    title: 'Problem 74',
    question: 'Given a function shout(str) that uppercases a string, use it inside a template literal to build "SAM says HELLO"',
    sampleData: `function shout14(str) {
      return str.toUpperCase();
    }
    let name14 = "Sam";`,
    solution: `let msg14 = \`\${name14} says \${shout14('hello')}\`;`,
    output: 'Sam says HELLO',
    functions: ['template-literal'],
    difficulty: 'medium'
  },
  {
    id: 75,
    title: 'Problem 75',
    question: 'Given let score = 85, build a string that says "Result: Pass" or "Result: Fail" depending on whether score >= 60',
    sampleData: 'let score15 = 85;',
    solution: `let result15 = \`Result: \${score15 >= 60 ? 'Pass' : 'Fail'}\`;`,
    output: 'Result: Pass',
    functions: ['template-literal'],
    difficulty: 'medium'
  },
  {
    id: 76,
    title: 'Problem 76',
    question: 'Given an array of names ["Sam", "Ana", "Luis"], build a single string like "Guests: Sam, Ana, Luis" by nesting a .join() call inside a template literal',
    sampleData: `let names16 = ["Sam", "Ana", "Luis"];`,
    solution: `let guestlist16 = \`Guests: \${names16.join(", ")}\`;`,
    output: 'Guests: Sam, Ana, Luis',
    functions: ['template-literal'],
    difficulty: 'medium'
  },
  {
    id: 77,
    title: 'Problem 77',
    question: 'Given { title: "Dune", price: 12.99 }, build a string like "Dune costs $12.99" using a template literal',
    sampleData: `let book17 = { title: "Dune", price: 12.99 };`,
    solution: `let {title, price} = book17;
    let bookPrice17 = \`\${title} costs $\${price}\`;`,
    output: 'Dune costs $12.99',
    functions: ['destructure', 'template-literal'],
    difficulty: 'medium'
  },
  {
    id: 78,
    title: 'Problem 78',
    question: 'Given { title: "Widget", price: 19.99 }, build a string like "<li>Widget - $19.99</li>" using a template literal',
    sampleData: `let product18 = { title: "Widget", price: 19.99 };`,
    solution: `let {title, price} = product18;
    let productPrice18 = \`<li>\${title} - $\${price}</li>\`;`,
    output: '<li>Widget - $19.99</li>',
    functions: ['destructure', 'template-literal'],
    difficulty: 'medium'
  },
  {
    id: 79,
    title: 'Problem 79',
    question: 'Given an array of objects [{ name, price }], use .map() with a template literal to produce an array of strings like "Widget: $19.99"',
    sampleData: `let products19 = [
      { name: "Widget", price: 19.99 },
      { name: "Gadget", price: 42.50 }
    ];`,
    solution: `let prodDesc19 = products19.map(({name, price}) => {
      return \`\${name}: $\${price}\`;
    });`,
    output: ['Widget: $19.99', 'Gadget: $42.5'],
    functions: ['map', 'destructure', 'template-literal'],
    difficulty: 'medium'
  },
  {
    id: 80,
    title: 'Problem 80',
    question: 'Write a tag function loud(strings, ...values) that rebuilds the template string but uppercases every interpolated value, then use it on `${name} is ${role}`',
    sampleData: `let name20 = "Sam";
    let role20 = "admin";`,
    solution: `let loud20 = (strings, ...values) => {
      return strings.reduce((result, str, i) => {
        let value = values[i] !== undefined ? values[i].toUpperCase() : "";
        return result + str + value;
      }, "");
    };

    let tagged20 = loud20\`\${name20} is \${role20}\`;`,
    output: 'SAM is ADMIN',
    functions: ['reduce', 'spread', 'template-literal'],
    difficulty: 'hard'
  },
  {
    id: 81,
    title: 'Problem 81',
    question: 'Given an array of objects {id, name}, find the object with id 3',
    sampleData: `let users1 = [
      { id: 1, name: "Sam" },
      { id: 2, name: "Ana" },
      { id: 3, name: "Luis" },
      { id: 4, name: "Mei" }
    ];`,
    solution: `let matchedUser = users1.find(({id}) => id === 3);`,
    output: { id: 3, name: 'Luis' },
    functions: ['find', 'destructure'],
    difficulty: 'easy'
  },
  {
    id: 82,
    title: 'Problem 82',
    question: 'Given [4, 9, 15, 22, 7], find the first number greater than 10',
    sampleData: 'let numbers2 = [4, 9, 15, 22, 7];',
    solution: `let firstOverTen = numbers2.find(num => num > 10);`,
    output: 15,
    functions: ['find'],
    difficulty: 'easy'
  },
  {
    id: 83,
    title: 'Problem 83',
    question: 'Given an array of objects {id, name}, find the index of the object with name "Luis"',
    sampleData: `let users3 = [
      { id: 1, name: "Sam" },
      { id: 2, name: "Ana" },
      { id: 3, name: "Luis" },
      { id: 4, name: "Mei" }
    ];`,
    solution: `let matchedUserIndex = users3.findIndex(({name}) => name === "Luis");`,
    output: 2,
    functions: ['findIndex', 'destructure'],
    difficulty: 'easy'
  },
  {
    id: 84,
    title: 'Problem 84',
    question: 'Given [1, 2, 3], try to find a number greater than 10 and note what you get back when nothing matches',
    sampleData: 'let nums4 = [1, 2, 3];',
    solution: `let numOverTen = nums4.find(num => num > 10);`,
    output: undefined,
    functions: ['find'],
    difficulty: 'easy'
  },
  {
    id: 85,
    title: 'Problem 85',
    question: 'Given an array of objects {title, inStock}, find the first in-stock item and destructure its title directly out of the result',
    sampleData: `let products5 = [
      { title: "Widget", inStock: false },
      { title: "Gadget", inStock: true },
      { title: "Doohickey", inStock: true }
    ];`,
    solution: `let {title: firstInStock} = products5.find(({inStock}) => inStock);`,
    output: 'Gadget',
    functions: ['find', 'destructure'],
    difficulty: 'medium'
  },
  {
    id: 86,
    title: 'Problem 86',
    question: 'Given [1, 3, 5, 8, 9], check whether the array contains at least one even number',
    sampleData: 'let nums6 = [1, 3, 5, 8, 9];',
    solution: `let isOneEven = nums6.some(num => num % 2 === 0);`,
    output: true,
    functions: ['some'],
    difficulty: 'easy'
  },
  {
    id: 87,
    title: 'Problem 87',
    question: 'Given [2, 4, 6, 8], check whether every number in the array is even',
    sampleData: 'let numbers7 = [2, 4, 6, 8];',
    solution: `let allEven = numbers7.every(num => num % 2 === 0);`,
    output: true,
    functions: ['every'],
    difficulty: 'easy'
  },
  {
    id: 88,
    title: 'Problem 88',
    question: 'Given an array of objects {name, age}, check whether any user is under 18',
    sampleData: `let users8 = [
      { name: "Sam", age: 25 },
      { name: "Ana", age: 17 },
      { name: "Luis", age: 30 }
    ];`,
    solution: `let under18 = users8.some(({age}) => age < 18);`,
    output: true,
    functions: ['some', 'destructure'],
    difficulty: 'easy'
  },
  {
    id: 89,
    title: 'Problem 89',
    question: 'Given an array of objects {name, passed}, check whether every student passed',
    sampleData: `let students9 = [
      { name: "Sam", passed: true },
      { name: "Ana", passed: true },
      { name: "Luis", passed: true }
    ];`,
    solution: `let allPassed = students9.every(({passed}) => passed);`,
    output: true,
    functions: ['every', 'destructure'],
    difficulty: 'easy'
  },
  {
    id: 90,
    title: 'Problem 90',
    question: 'Given ["red", "green", "blue"], check whether "green" is in the array, and separately whether "purple" is',
    sampleData: `let colors10 = ["red", "green", "blue"];`,
    solution: `let colorChecker = (color) => colors10.includes(color);

    colorChecker("green");
    colorChecker("purple");`,
    output: [true, false],
    functions: ['includes'],
    difficulty: 'easy'
  },
  {
    id: 91,
    title: 'Problem 91',
    question: 'Given [[1, 2], [3, 4], [5, 6]], flatten it into a single array of numbers',
    sampleData: 'let nested11 = [[1, 2], [3, 4], [5, 6]];',
    solution: `let flatArray11 = nested11.flat();`,
    output: [1, 2, 3, 4, 5, 6],
    functions: ['flat'],
    difficulty: 'easy'
  },
  {
    id: 92,
    title: 'Problem 92',
    question: 'Given [1, [2, [3, [4, 5]]]], flatten it all the way down into [1, 2, 3, 4, 5] (flat() takes a depth argument, or you can pass Infinity)',
    sampleData: 'let deepNested12 = [1, [2, [3, [4, 5]]]];',
    solution: `let deepFlatArray12 = deepNested12.flat(3);`,
    output: [1, 2, 3, 4, 5],
    functions: ['flat'],
    difficulty: 'medium'
  },
  {
    id: 93,
    title: 'Problem 93',
    question: 'Given [1, 2, 3], use flatMap to return each number and its double in a single flat array (e.g. 1 becomes [1, 2])',
    sampleData: 'let nums13 = [1, 2, 3];',
    solution: `let flatMapDouble13 = nums13.flatMap(num => [num, num * 2]);`,
    output: [1, 2, 2, 4, 3, 6],
    functions: ['flatMap'],
    difficulty: 'medium'
  },
  {
    id: 94,
    title: 'Problem 94',
    question: 'Given an array of sentences, use flatMap to split each sentence into words and return one flat array of all the words',
    sampleData: `let sentences14 = ["the sky is blue", "the grass is green"];`,
    solution: `let flatMapSentenceSplit14 = sentences14.flatMap(sentence => sentence.split(" "));`,
    output: ['the', 'sky', 'is', 'blue', 'the', 'grass', 'is', 'green'],
    functions: ['flatMap'],
    difficulty: 'medium'
  },
  {
    id: 95,
    title: 'Problem 95',
    question: 'Given an array of numbers, use flatMap to return only the even numbers, doubled (return [] for numbers you want to drop, since flatMap flattens empty arrays away)',
    sampleData: 'let nums15 = [1, 2, 3, 4, 5, 6];',
    solution: `let flatMapDoubledEvens15 = nums15.flatMap(num => (num % 2 === 0) ? [num * 2] : []);`,
    output: [4, 8, 12],
    functions: ['flatMap'],
    difficulty: 'hard'
  },
  {
    id: 96,
    title: 'Problem 96',
    question: 'Given { name: "Sam", age: 25, city: "Austin" }, get an array of just the keys',
    sampleData: `let person16 = { name: "Sam", age: 25, city: "Austin" };`,
    solution: `let person16Keys = Object.keys(person16);`,
    output: ['name', 'age', 'city'],
    functions: ['Object.keys'],
    difficulty: 'easy'
  },
  {
    id: 97,
    title: 'Problem 97',
    question: 'Given { name: "Sam", age: 25, city: "Austin" }, get an array of just the values',
    sampleData: `let person17 = { name: "Sam", age: 25, city: "Austin" };`,
    solution: `let person17Values = Object.values(person17);`,
    output: ['Sam', 25, 'Austin'],
    functions: ['Object.values'],
    difficulty: 'easy'
  },
  {
    id: 98,
    title: 'Problem 98',
    question: 'Given { name: "Sam", age: 25, city: "Austin" }, get an array of [key, value] pairs, then log each pair on its own line using a for...of loop with destructuring',
    sampleData: `let person18 = { name: "Sam", age: 25, city: "Austin" };`,
    solution: `let person18Entries = Object.entries(person18);

    for (let [key, value] of person18Entries) {
      console.log(\`\${key}: \${value}\`);
    }`,
    output: ['name: Sam', 'age: 25', 'city: Austin'],
    functions: ['Object.entries', 'destructure', 'template-literal'],
    difficulty: 'medium'
  },
  {
    id: 99,
    title: 'Problem 99',
    question: 'Given { math: 90, science: 85, art: 70 }, use Object.entries and .map to build an array of strings like "math: 90"',
    sampleData: `let grades19 = { math: 90, science: 85, art: 70 };`,
    solution: `let grades19Entries = Object.entries(grades19).map(([subject, score]) => \`\${subject}: \${score}\`);`,
    output: ['math: 90', 'science: 85', 'art: 70'],
    functions: ['Object.entries', 'map', 'destructure', 'template-literal'],
    difficulty: 'medium'
  },
  {
    id: 100,
    title: 'Problem 100',
    question: 'Given { a: 1, b: 2, c: 3 }, use Object.entries to get pairs, .filter to keep only pairs with a value greater than 1, then Object.fromEntries to turn it back into an object',
    sampleData: `let nums20 = { a: 1, b: 2, c: 3 };`,
    solution: `let nums20Entries = Object.entries(nums20);
    let nums20GreaterThanOne = nums20Entries.filter(([key, value]) => value > 1);
    let nums20FromEntriesGreaterThanOne = Object.fromEntries(nums20GreaterThanOne);`,
    output: { b: 2, c: 3 },
    functions: ['Object.entries', 'filter', 'Object.fromEntries', 'destructure'],
    difficulty: 'medium'
  },
  {
    id: 101,
    title: 'Problem 101',
    question: 'Given { a: 1, b: 2, c: 3 }, build a new object where the values become the keys and the keys become the values (e.g. { 1: "a", 2: "b", 3: "c" })',
    sampleData: `let nums21 = { a: 1, b: 2, c: 3 };`,
    solution: `let nums21Entries = Object.entries(nums21);
    let nums21InvertedPairs = nums21Entries.map(([key, value]) => [value, key]);
    let nums21InvertedKeyValues = Object.fromEntries(nums21InvertedPairs);`,
    output: { 1: 'a', 2: 'b', 3: 'c' },
    functions: ['Object.entries', 'map', 'Object.fromEntries', 'destructure'],
    difficulty: 'medium'
  },
  {
    id: 102,
    title: 'Problem 102',
    question: 'Given { name: "Sam", age: 25 }, use entries/map/fromEntries to build a new object with the same values but all keys uppercased',
    sampleData: `let person22 = { name: "Sam", age: 25 };`,
    solution: `let person22Entries = Object.entries(person22);
    let uppedPerson22 = person22Entries.map(([key, value]) => [key.toUpperCase(), value]);
    let uppedPerson22ObjKeys = Object.fromEntries(uppedPerson22);`,
    output: { NAME: 'Sam', AGE: 25 },
    functions: ['Object.entries', 'map', 'Object.fromEntries', 'destructure'],
    difficulty: 'medium'
  },
  {
    id: 103,
    title: 'Problem 103',
    question: 'Given { a: 1, b: 2, c: 3 }, use entries/map/fromEntries to build a new object with every value doubled',
    sampleData: `let nums23 = { a: 1, b: 2, c: 3 };`,
    solution: `let nums23Entries = Object.entries(nums23);
    let doubledNums23 = nums23Entries.map(([name, value]) => [name, value * 2]);
    let doubledNums23Obj = Object.fromEntries(doubledNums23);`,
    output: { a: 2, b: 4, c: 6 },
    functions: ['Object.entries', 'map', 'Object.fromEntries', 'destructure'],
    difficulty: 'medium'
  },
  {
    id: 104,
    title: 'Problem 104',
    question: 'Given { a: 1, b: 0, c: 3, d: null, e: 5 }, use entries/filter/fromEntries to build a new object with only the truthy values kept',
    sampleData: `let mixed24 = { a: 1, b: 0, c: 3, d: null, e: 5 };`,
    solution: `let mixed24Entries = Object.entries(mixed24);
    let mixed24Trues = mixed24Entries.filter(([key, value]) => value);
    let mixed24TruesObj = Object.fromEntries(mixed24Trues);`,
    output: { a: 1, c: 3, e: 5 },
    functions: ['Object.entries', 'filter', 'Object.fromEntries', 'destructure'],
    difficulty: 'medium'
  },
  {
    id: 105,
    title: 'Problem 105',
    question: 'Given { name: "Sam", age: 25, city: "Austin" }, use entries/map/fromEntries to rename the "name" key to "fullName" while leaving the other keys untouched',
    sampleData: `let person25 = { name: "Sam", age: 25, city: "Austin" };`,
    solution: `let fullNamePerson25Entries = Object.entries(person25).map(([key, value]) =>
      key === 'name' ? ["fullName", value] : [key, value]
    );
    let person25FullNameObj = Object.fromEntries(fullNamePerson25Entries);`,
    output: { fullName: 'Sam', age: 25, city: 'Austin' },
    functions: ['Object.entries', 'map', 'Object.fromEntries', 'destructure'],
    difficulty: 'hard'
  },
  {
    id: 106,
    title: 'Problem 106',
    question: 'Given { rent: 800, groceries: 200, fun: 50 }, use Object.values (or entries) with reduce to total up all the values',
    sampleData: `let expenses26 = { rent: 800, groceries: 200, fun: 50 };`,
    solution: `let expenses26Entries = Object.entries(expenses26);
    let expenses26Sum = expenses26Entries.reduce((total, [key, value]) => total + value, 0);`,
    output: 1050,
    functions: ['Object.entries', 'reduce', 'destructure'],
    difficulty: 'medium'
  },
  {
    id: 107,
    title: 'Problem 107',
    question: 'Given let keys = ["name", "age", "city"] and let values = ["Sam", 25, "Austin"], zip them together into pairs and use Object.fromEntries to build a single object',
    sampleData: `let keys27 = ["name", "age", "city"];
    let values27 = ["Sam", 25, "Austin"];`,
    solution: `let kvEntriePairs27 = keys27.map((key, i) => [key, values27[i]]);
    let keysVals27Obj = Object.fromEntries(kvEntriePairs27);`,
    output: { name: 'Sam', age: 25, city: 'Austin' },
    functions: ['map', 'Object.fromEntries'],
    difficulty: 'medium'
  },
  {
    id: 108,
    title: 'Problem 108',
    question: 'Given { isAdmin: true, isActive: false, isVerified: true, isBanned: false }, use Object.entries with filter to keep only the true flags',
    sampleData: `let flags28 = { isAdmin: true, isActive: false, isVerified: true, isBanned: false };`,
    solution: `let flags28Entries = Object.entries(flags28);
    let flags28Trues = flags28Entries.filter(pair => pair[1]);
    let flags28TruesObj = Object.fromEntries(flags28Trues);`,
    output: { isAdmin: true, isVerified: true },
    functions: ['Object.entries', 'filter', 'Object.fromEntries'],
    difficulty: 'medium'
  },
  {
    id: 109,
    title: 'Problem 109',
    question: "Given { math: 70, science: 95, art: 60, gym: 85 }, use Object.entries, sort the pairs by score descending, then build the sorted { subject: score } object",
    sampleData: `let grades29 = { math: 70, science: 95, art: 60, gym: 85 };`,
    solution: `let grades29Entries = Object.entries(grades29);
    let grades29Sort = grades29Entries.sort((a, b) => b[1] - a[1]);
    let grades29SortObj = Object.fromEntries(grades29Sort);`,
    output: { science: 95, gym: 85, math: 70, art: 60 },
    functions: ['Object.entries', 'sort', 'Object.fromEntries'],
    difficulty: 'hard'
  },
  {
    id: 110,
    title: 'Problem 110',
    question: 'Given { a: 1, b: 2 } and { b: 3, c: 4 }, use entries/reduce to merge them into one object where shared keys ("b") have their values added together (result should be { a: 1, b: 5, c: 4 })',
    sampleData: `let objA30 = { a: 1, b: 2 };
    let objB30 = { b: 3, c: 4 };`,
    solution: `let mergedEntries30 = [...Object.entries(objA30), ...Object.entries(objB30)];

    let mergedObj30 = mergedEntries30.reduce((acc, [key, value]) => {
      acc[key] = (acc[key] || 0) + value;
      return acc;
    }, {});`,
    output: { a: 1, b: 5, c: 4 },
    functions: ['Object.entries', 'reduce', 'spread', 'destructure'],
    difficulty: 'hard'
  },
  {
    id: 111,
    title: 'Problem 111',
    question: 'Given an array of words, sort them from shortest to longest',
    sampleData: `let words1 = ["banana", "fig", "kiwi", "pomegranate", "date"];`,
    solution: `let wordLenSort = words1.sort((a, b) => (a.length - b.length));`,
    output: ['fig', 'kiwi', 'date', 'banana', 'pomegranate'],
    functions: ['sort'],
    difficulty: 'easy'
  },
  {
    id: 112,
    title: 'Problem 112',
    question: 'Given an array of numbers (some negative), sort by how close they are to 0',
    sampleData: 'let nums2 = [-8, 3, 1, -2, 6, -1, 9];',
    solution: `let distanceToZeroSort = [...nums2].sort((a, b) => {
      return Math.abs(a) - Math.abs(b)
    })`,
    output: [1, -1, -2, 3, 6, -8, 9],
    functions: ['sort', 'spread'],
    difficulty: 'medium'
  },
  {
    id: 113,
    title: 'Problem 113',
    question: 'Given an array of objects {event, date} where date is a string like "2024-03-15", sort chronologically',
    sampleData: `let events3 = [
      { event: "Kickoff", date: "2024-06-01" },
      { event: "Launch", date: "2024-01-15" },
      { event: "Review", date: "2024-03-20" }
    ];`,
    solution: `let dateSort = [...events3].sort((a, b) => new Date(a.date) - new Date(b.date));`,
    output: [
      { event: 'Launch', date: '2024-01-15' },
      { event: 'Review', date: '2024-03-20' },
      { event: 'Kickoff', date: '2024-06-01' }
    ],
    functions: ['sort', 'spread'],
    difficulty: 'medium'
  },
  {
    id: 114,
    title: 'Problem 114',
    question: 'Given an array of objects {name, isAdmin}, sort so admins come first, then everyone else (order within each group doesn\'t matter)',
    sampleData: `let users4 = [
      { name: "Sam", isAdmin: false },
      { name: "Ana", isAdmin: true },
      { name: "Luis", isAdmin: false },
      { name: "Mei", isAdmin: true }
    ];`,
    solution: `let adminUsers = [...users4].sort((a, b) => Number(b.isAdmin) - Number(a.isAdmin));`,
    output: [
      { name: 'Ana', isAdmin: true },
      { name: 'Mei', isAdmin: true },
      { name: 'Sam', isAdmin: false },
      { name: 'Luis', isAdmin: false }
    ],
    functions: ['sort', 'spread'],
    difficulty: 'medium'
  },
  {
    id: 115,
    title: 'Problem 115',
    question: 'Given an array of objects {name, score, timeSeconds}, sort by score descending, and break ties by the fastest time (ascending)',
    sampleData: `let racers5 = [
      { name: "Sam", score: 90, timeSeconds: 55 },
      { name: "Ana", score: 90, timeSeconds: 48 },
      { name: "Luis", score: 85, timeSeconds: 40 },
      { name: "Mei", score: 90, timeSeconds: 52 }
    ];`,
    solution: `let scoreSort = [...racers5].sort((a, b) => {
      if (a.score !== b.score) {
        return b.score - a.score
      }
      return a.timeSeconds - b.timeSeconds
    });`,
    output: [
      { name: 'Ana', score: 90, timeSeconds: 48 },
      { name: 'Mei', score: 90, timeSeconds: 52 },
      { name: 'Sam', score: 90, timeSeconds: 55 },
      { name: 'Luis', score: 85, timeSeconds: 40 }
    ],
    functions: ['sort', 'spread'],
    difficulty: 'hard'
  },
  {
    id: 116,
    title: 'Problem 116',
    question: 'Given an array of objects {name, priority} where priority is "low" | "medium" | "high", sort so "high" comes first, then "medium", then "low"',
    sampleData: `let tasks6 = [
      { name: "Write docs", priority: "low" },
      { name: "Fix outage", priority: "high" },
      { name: "Refactor utils", priority: "medium" },
      { name: "Patch security hole", priority: "high" }
    ];`,
    solution: `let priorityRank = {high: 2, medium: 1, low: 0};

    let rankSort = [...tasks6].sort((a, b) => priorityRank[b.priority] - priorityRank[a.priority]);`,
    output: [
      { name: 'Fix outage', priority: 'high' },
      { name: 'Patch security hole', priority: 'high' },
      { name: 'Refactor utils', priority: 'medium' },
      { name: 'Write docs', priority: 'low' }
    ],
    functions: ['sort', 'spread'],
    difficulty: 'medium'
  },
  {
    id: 117,
    title: 'Problem 117',
    question: 'Given an array of objects {name, score}, return just the top 3 scorers, highest first, without mutating the original array',
    sampleData: `let players7 = [
      { name: "Sam", score: 72 },
      { name: "Ana", score: 95 },
      { name: "Luis", score: 88 },
      { name: "Mei", score: 91 },
      { name: "Jo", score: 60 }
    ];`,
    solution: `let top3Scores = [...players7].sort((a, b) => {
      return b.score - a.score
    }).slice(0, 3);`,
    output: [
      { name: 'Ana', score: 95 },
      { name: 'Mei', score: 91 },
      { name: 'Luis', score: 88 }
    ],
    functions: ['sort', 'spread'],
    difficulty: 'medium'
  },
  {
    id: 118,
    title: 'Problem 118',
    question: 'Given an array like ["item2", "item10", "item1"], sort so item1, item2, item10 come out in that human-expected order (localeCompare has a numeric option)',
    sampleData: `let items8 = ["item2", "item10", "item1", "item20", "item3"];`,
    solution: `let itemSort = items8.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));`,
    output: ['item1', 'item2', 'item3', 'item10', 'item20'],
    functions: ['sort'],
    difficulty: 'hard'
  },
  {
    id: 119,
    title: 'Problem 119',
    question: 'Given an array of arrays, sort them by how many elements each inner array has, fewest to most',
    sampleData: 'let groups9 = [[1, 2, 3], [1], [4, 5], [1, 2, 3, 4, 5], []];',
    solution: `let ascGroupLengths = [...groups9].sort((a, b) => a.length - b.length);`,
    output: [[], [1], [4, 5], [1, 2, 3], [1, 2, 3, 4, 5]],
    functions: ['sort', 'spread'],
    difficulty: 'medium'
  },
  {
    id: 120,
    title: 'Problem 120',
    question: "Given an array of objects {name, group} that's already ordered by name within each group, sort by group only, and confirm the original name order within each group is preserved (this demonstrates that Array.prototype.sort is stable)",
    sampleData: `let people10 = [
      { name: "Ana", group: "B" },
      { name: "Ben", group: "A" },
      { name: "Cara", group: "B" },
      { name: "Drew", group: "A" }
    ];`,
    solution: `let stableSortByGroup = [...people10].sort((a, b) => a.group.localeCompare(b.group));`,
    output: [
      { name: 'Ben', group: 'A' },
      { name: 'Drew', group: 'A' },
      { name: 'Ana', group: 'B' },
      { name: 'Cara', group: 'B' }
    ],
    functions: ['sort', 'spread'],
    difficulty: 'medium'
  },
  {
    id: 121,
    title: 'Problem 121',
    question: 'Given an array of objects {name, price, inStock}, return only items that are in stock AND under $50',
    sampleData: `let products11 = [
      { name: "Keyboard", price: 45.00, inStock: true },
      { name: "Monitor", price: 199.99, inStock: true },
      { name: "Mouse", price: 25.50, inStock: false },
      { name: "Webcam", price: 40.00, inStock: true }
    ];`,
    solution: `let stockBelow50 = products11.filter(({price, inStock}) => inStock && price < 50);`,
    output: [
      { name: 'Keyboard', price: 45, inStock: true },
      { name: 'Webcam', price: 40, inStock: true }
    ],
    functions: ['filter', 'destructure'],
    difficulty: 'easy'
  },
  {
    id: 122,
    title: 'Problem 122',
    question: 'Given an array of numbers with repeats, use filter (with the index/array args) to return only the unique values, preserving first-seen order',
    sampleData: 'let nums12 = [1, 2, 2, 3, 4, 4, 4, 5, 1];',
    solution: `let uniqNumsFilter = nums12.filter((val, ind, arr) => arr.indexOf(val) === ind);`,
    output: [1, 2, 3, 4, 5],
    functions: ['filter'],
    difficulty: 'medium'
  },
  {
    id: 123,
    title: 'Problem 123',
    question: 'Given an array of strings, return only the ones that contain "the" anywhere, ignoring case',
    sampleData: `let phrases13 = ["The cat sat", "A dog barked", "THEatre trip", "no match here", "gather round"];`,
    solution: `let phrasesWithThe = phrases13.filter(phrase => phrase.toLowerCase().includes("the"));`,
    output: ['The cat sat', 'THEatre trip', 'gather round'],
    functions: ['filter', 'includes'],
    difficulty: 'medium'
  },
  {
    id: 124,
    title: 'Problem 124',
    question: 'Given an array of objects {name, address: {city}}, return only the people who live in "Austin"',
    sampleData: `let people14 = [
      { name: "Sam", address: { city: "Austin" } },
      { name: "Ana", address: { city: "Denver" } },
      { name: "Luis", address: { city: "Austin" } }
    ];`,
    solution: `let austinites = people14.filter(({address}) => address.city === "Austin");`,
    output: [
      { name: 'Sam', address: { city: 'Austin' } },
      { name: 'Luis', address: { city: 'Austin' } }
    ],
    functions: ['filter', 'destructure'],
    difficulty: 'medium'
  },
  {
    id: 125,
    title: 'Problem 125',
    question: 'Write a function that takes an array of numbers and a minimum value, and returns only the numbers greater than or equal to that minimum',
    sampleData: 'let numsAboveThreshold15 = [3, 12, 7, 20, 5, 18];',
    solution: `let atLeast = (arr, min) => {
      return arr.filter(num => num >= min);
    }

    atLeast(numsAboveThreshold15, 15);`,
    output: [20, 18],
    functions: ['filter'],
    difficulty: 'medium'
  },
  {
    id: 126,
    title: 'Problem 126',
    question: 'Given a messy array like [0, "hello", "", null, 42, undefined, false, "world", NaN], remove every falsy value',
    sampleData: `let messy16 = [0, "hello", "", null, 42, undefined, false, "world", NaN];`,
    solution: `let clean16 = messy16.filter(Boolean);`,
    output: ['hello', 42, 'world'],
    functions: ['filter'],
    difficulty: 'easy'
  },
  {
    id: 127,
    title: 'Problem 127',
    question: 'Given an array of objects {event, date} (as "YYYY-MM-DD" strings), return only the events that fall in 2024',
    sampleData: `let events17 = [
      { event: "Kickoff", date: "2023-11-01" },
      { event: "Launch", date: "2024-01-15" },
      { event: "Review", date: "2024-03-20" },
      { event: "Wrap-up", date: "2025-01-05" }
    ];`,
    solution: `let events2024 = events17.filter(({event, date}) => new Date(date).getFullYear() === 2024);`,
    output: [
      { event: 'Launch', date: '2024-01-15' },
      { event: 'Review', date: '2024-03-20' }
    ],
    functions: ['filter', 'destructure'],
    difficulty: 'medium'
  },
  {
    id: 128,
    title: 'Problem 128',
    question: 'Given an array of usernames and a separate array of banned usernames, return only the usernames that are not banned',
    sampleData: `let usernames18 = ["sam99", "trollking", "ana_dev", "spammer42", "luisc"];
    let banned18 = ["trollking", "spammer42"];`,
    solution: `let allowedUsernames = usernames18.filter(name => !banned18.includes(name));`,
    output: ['sam99', 'ana_dev', 'luisc'],
    functions: ['filter', 'includes'],
    difficulty: 'easy'
  },
  {
    id: 129,
    title: 'Problem 129',
    question: 'Given a sorted array of numbers that should count up by 1 each time, return the numbers that come right before a gap (e.g. [1,2,4,5,7] -> [2, 5], since 3 and 6 are missing after them)',
    sampleData: 'let sequence19 = [1, 2, 4, 5, 7, 8, 9, 12];',
    solution: `let gapStarts = sequence19.filter((num, ind, arr) => ind < arr.length - 1 && num + 1 !== arr[ind + 1])`,
    output: [2, 5, 9],
    functions: ['filter'],
    difficulty: 'hard'
  },
  {
    id: 130,
    title: 'Problem 130',
    question: 'Given an array of objects {name, age}, write a function that returns true if there is at least one person under 21 (use filter, even though .some() would also work — this is about noticing when filter is the wrong tool)',
    sampleData: `let people20 = [
      { name: "Sam", age: 34 },
      { name: "Ana", age: 19 },
      { name: "Luis", age: 29 }
    ];`,
    solution: `let onePersonBelow21 = people20.filter(({name, age}) => {
      if (age < 21) {
        return true;
      }
    }).length > 0;`,
    output: true,
    functions: ['filter', 'destructure'],
    difficulty: 'medium'
  },
  {
    id: 131,
    title: 'Problem 131',
    question: 'Given an array of arrays like [[1, 2], [3, 4], [5]], flatten it into a single array [1, 2, 3, 4, 5] using reduce',
    sampleData: 'let nested21 = [[1, 2], [3, 4], [5]];',
    solution: `let flattenNested = nested21.reduce((acc, arr) => {
      return acc.concat(arr)
    }, [])`,
    output: [1, 2, 3, 4, 5],
    functions: ['reduce'],
    difficulty: 'medium'
  },
  {
    id: 132,
    title: 'Problem 132',
    question: 'Given an array of strings, use reduce to find the longest one',
    sampleData: `let words22 = ["fig", "watermelon", "kiwi", "pomegranate", "date"];`,
    solution: `let longestWord = words22.reduce((prev, next) => next.length > prev.length ? next : prev, "")`,
    output: 'pomegranate',
    functions: ['reduce'],
    difficulty: 'medium'
  },
  {
    id: 133,
    title: 'Problem 133',
    question: 'Given an array of numbers, use reduce to build an object counting how many times each number appears',
    sampleData: 'let freqNums23 = [1, 2, 2, 3, 1, 4, 2, 3, 3, 3];',
    solution: `let freqCount = freqNums23.reduce((prev, next) => {
      prev[next] = (prev[next] || 0) + 1;
      return prev;
    }, {})`,
    output: { 1: 2, 2: 3, 3: 4, 4: 1 },
    functions: ['reduce'],
    difficulty: 'medium'
  },
  {
    id: 134,
    title: 'Problem 134',
    question: 'Given an array of objects {name, amount} representing donations, use reduce to build a single string like "Sam: $10, Ana: $25, Luis: $5"',
    sampleData: `let donations24 = [
      { name: "Sam", amount: 10 },
      { name: "Ana", amount: 25 },
      { name: "Luis", amount: 5 }
    ];`,
    solution: `let donationSummary = donations24.reduce((acc, val, index) => {
      return index === 0 ? \`\${val.name}: $\${val.amount}\` : \`\${acc}, \${val.name}: $\${val.amount}\`;
    }, "")`,
    output: 'Sam: $10, Ana: $25, Luis: $5',
    functions: ['reduce', 'template-literal'],
    difficulty: 'hard'
  },
  {
    id: 135,
    title: 'Problem 135',
    question: 'Given an array of objects {name, department}, use reduce to build an object where each key is a department and the value is an array of names in that department (general-purpose groupBy)',
    sampleData: `let employees25 = [
      { name: "Sam", department: "Engineering" },
      { name: "Ana", department: "Sales" },
      { name: "Luis", department: "Engineering" },
      { name: "Mei", department: "Sales" }
    ];`,
    solution: `let groupedByDept = employees25.reduce((acc, val) => {
      if (!acc[val.department]) {
        acc[val.department] = [];
      }
      acc[val.department].push(val.name);
      return acc;
    }, {});`,
    output: { Engineering: ['Sam', 'Luis'], Sales: ['Ana', 'Mei'] },
    functions: ['reduce'],
    difficulty: 'medium'
  },
  {
    id: 136,
    title: 'Problem 136',
    question: 'Given an array of numbers, use reduce (possibly two passes) to find the value that appears most often (the mode)',
    sampleData: 'let nums26 = [4, 1, 2, 2, 3, 2, 4, 4, 4, 1];',
    solution: `let modeCounts = nums26.reduce((acc, num) => {
      acc[num] = (acc[num] || 0) + 1;
      return acc;
    }, {});

    let mode26 = Object.entries(modeCounts).reduce((best, [num, count]) => {
      return count > best.count ? { num: Number(num), count } : best;
    }, { num: null, count: 0 });`,
    output: { num: 4, count: 4 },
    functions: ['reduce', 'Object.entries', 'destructure'],
    difficulty: 'hard'
  },
  {
    id: 137,
    title: 'Problem 137',
    question: 'Given an array of objects {id, name}, use reduce to build a Map keyed by id (useful when keys might not be strings)',
    sampleData: `let records27 = [
      { id: 101, name: "Widget" },
      { id: 102, name: "Gadget" },
      { id: 103, name: "Doohickey" }
    ];`,
    solution: `let recordsById = records27.reduce((map, record) => {
      map.set(record.id, record.name);
      return map;
    }, new Map());`,
    output: { 101: 'Widget', 102: 'Gadget', 103: 'Doohickey' },
    functions: ['reduce'],
    difficulty: 'hard'
  },
  {
    id: 138,
    title: 'Problem 138',
    question: 'Given an array of strings ["a", "b", "c"], use reduceRight to concatenate them back-to-front into "cba"',
    sampleData: `let letters28 = ["a", "b", "c"];`,
    solution: `let reversedConcat = letters28.reduceRight((acc, letter) => acc + letter, "");`,
    output: 'cba',
    functions: ['reduce'],
    difficulty: 'medium'
  },
  {
    id: 139,
    title: 'Problem 139',
    question: 'Given an array of words, use reduce to build an object like { 3: 2, 5: 1 } counting how many words have each length',
    sampleData: `let words29 = ["cat", "dog", "horse", "ox", "lion", "koala"];`,
    solution: `let lengthHistogram = words29.reduce((acc, word) => {
      acc[word.length] = (acc[word.length] || 0) + 1;
      return acc;
    }, {});`,
    output: { 2: 1, 3: 2, 4: 1, 5: 2 },
    functions: ['reduce'],
    difficulty: 'medium'
  },
  {
    id: 140,
    title: 'Problem 140',
    question: 'Given an array of objects {step, status} where status is "success" or "fail", use reduce to determine whether every step succeeded (return true if there was no failure, false if any step failed)',
    sampleData: `let pipeline30 = [
      { step: "build", status: "success" },
      { step: "test", status: "success" },
      { step: "deploy", status: "fail" },
      { step: "notify", status: "success" }
    ];`,
    solution: `let allSucceeded = pipeline30.reduce((acc, val) => acc && val.status === "success", true);`,
    output: false,
    functions: ['reduce'],
    difficulty: 'medium'
  }
];

// Core tags (shown by default) come first; secondary/less-common tags are
// appended after and only surface via the "Show more" toggle. 'Object' is a
// pseudo-tag consolidating Object.keys/values/entries/fromEntries into one
// pill — see the matchesFunctions check in getFilteredExercises.
const CORE_FUNCTIONS = [
  'map', 'filter', 'reduce', 'sort', 'spread', 'destructure', 'template-literal',
  'some', 'every'
];
const SECONDARY_FUNCTIONS = ['find', 'findIndex', 'includes', 'flat', 'flatMap', 'Object'];
const KNOWN_FUNCTIONS = [...CORE_FUNCTIONS, ...SECONDARY_FUNCTIONS];
const DIFFICULTIES = ['easy', 'medium', 'hard'];

const activeFunctionFilters = new Set();
let activeDifficultyFilter = null;
let currentExerciseIndex = 0;

// Re-indents a code snippet to 2 spaces per nesting level, based on brace/
// bracket/paren depth, so inconsistent source indentation in the template
// literals doesn't leak into the rendered sample-data/solution boxes.
function dedent(text) {
  const lines = text.split('\n');
  let depth = 0;

  return lines
    .map((rawLine) => {
      const line = rawLine.trim();
      if (line.length === 0) return '';

      const closesFirst = /^[)\]}]/.test(line);
      const lineDepth = closesFirst ? Math.max(depth - 1, 0) : depth;

      for (const char of line) {
        if (char === '(' || char === '[' || char === '{') depth++;
        else if (char === ')' || char === ']' || char === '}') depth = Math.max(depth - 1, 0);
      }

      return '  '.repeat(lineDepth) + line;
    })
    .join('\n');
}

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
const toggleFunctionFiltersButton = document.querySelector('#toggle-function-filters');
const noResultsEl = document.querySelector('#no-results');

// 'Object' is a pseudo-tag: matches any exercise carrying an Object.* tag
// (Object.keys, Object.values, Object.entries, Object.fromEntries) rather
// than a literal tag exercises are given directly.
function exerciseHasFunction(exercise, fn) {
  if (fn === 'Object') return exercise.functions.some((f) => f.startsWith('Object.'));
  return exercise.functions.includes(fn);
}

function getFilteredExercises() {
  return exercises.filter((exercise) => {
    const matchesFunctions =
      activeFunctionFilters.size === 0 ||
      [...activeFunctionFilters].every((fn) => exerciseHasFunction(exercise, fn));
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
  if (sampleDataEl) sampleDataEl.textContent = dedent(exercise.sampleData);
  if (solutionEl) solutionEl.textContent = dedent(exercise.solution);
  if (outputEl) outputEl.textContent = JSON.stringify(exercise.output, null, 2);
  if (counterEl) counterEl.textContent = `${index + 1} / ${filtered.length}`;

  window.currentExercise = exercise;
  if (window.loadExerciseIntoEditor) window.loadExerciseIntoEditor(exercise);
}

function resetIndexAndRender() {
  currentExerciseIndex = 0;
  renderExercise(currentExerciseIndex);
}

const FUNCTION_PILLS_VISIBLE = CORE_FUNCTIONS.length;
let functionPillsExpanded = false;

function updateFunctionPillsVisibility() {
  if (!functionFiltersEl || !toggleFunctionFiltersButton) return;

  const pills = functionFiltersEl.querySelectorAll('.pill');
  const hiddenCount = pills.length - FUNCTION_PILLS_VISIBLE;

  if (hiddenCount <= 0) {
    toggleFunctionFiltersButton.hidden = true;
    return;
  }

  toggleFunctionFiltersButton.hidden = false;
  toggleFunctionFiltersButton.textContent = functionPillsExpanded
    ? 'Show less'
    : `Show ${hiddenCount} more`;

  pills.forEach((pill, index) => {
    pill.classList.toggle(
      'collapsed',
      !functionPillsExpanded && index >= FUNCTION_PILLS_VISIBLE
    );
  });
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
          if (activeFunctionFilters.size >= 3) return;
          activeFunctionFilters.add(fn);
          button.classList.add('active');
        }
        resetIndexAndRender();
      });
      functionFiltersEl.insertBefore(button, toggleFunctionFiltersButton);
    });

    updateFunctionPillsVisibility();

    if (toggleFunctionFiltersButton) {
      toggleFunctionFiltersButton.addEventListener('click', () => {
        functionPillsExpanded = !functionPillsExpanded;
        updateFunctionPillsVisibility();
      });
    }
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
