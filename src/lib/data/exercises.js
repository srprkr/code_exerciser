export const exercises = [
  {
    id: 1,
    title: 'Problem 1',
    question: 'Double every number in [1, 2, 3, 4, 5]',
    sampleData: 'let oneToFive = [1, 2, 3, 4, 5];',
    solution: `let doubleTheFive = oneToFive.map(n => n * 2);
    console.log(doubleTheFive);`,
    output: [2, 4, 6, 8, 10],
    functions: ['map'],
    difficulty: 'easy'
  },
  {
    id: 2,
    title: 'Problem 2',
    question: 'Convert an array of strings to all uppercase',
    sampleData: 'let lower = ["h", "e", "l", "l", "o"];',
    solution: `let upper = lower.map(l => l.toString().toUpperCase());
    console.log(upper);`,
    output: ['H', 'E', 'L', 'L', 'O'],
    functions: ['map'],
    difficulty: 'easy'
  },
  {
    id: 3,
    title: 'Problem 3',
    question: 'Given an array of names, return an array of greeting strings like "Hello, Sam!"',
    sampleData: `let names = ['Sean', 'Ralph', 'Bill', 'Tom', 'Hank'];`,
    solution: `let greetings = names.map(name => \`Hello, \${name}!\`);
    console.log(greetings);`,
    output: ['Hello, Sean!', 'Hello, Ralph!', 'Hello, Bill!', 'Hello, Tom!', 'Hello, Hank!'],
    functions: ['map'],
    difficulty: 'easy'
  },
  {
    id: 4,
    title: 'Problem 4',
    question: 'Given an array of numbers, return their squares',
    sampleData: 'let fibonacci = [1, 2, 4, 8, 16];',
    solution: `let squareNums = fibonacci.map(num => num ** 2);
    console.log(squareNums);`,
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
    solution: `let firstNames = people.map(person => person.name);
    console.log(firstNames);`,
    output: ['Sean', 'Amy', 'Matt', 'Stacy'],
    functions: ['map'],
    difficulty: 'easy'
  },
  {
    id: 6,
    title: 'Problem 6',
    question: 'Given an array of prices (numbers), return an array with tax added (multiply by 1.08)',
    sampleData: 'let prices = [1.80, 23.42, 6.50, 8.36, 14.78];',
    solution: `let taxPrices = prices.map(price => Number((price * 1.08).toFixed(2)));
    console.log(taxPrices);`,
    output: [1.94, 25.29, 7.02, 9.03, 15.96],
    functions: ['map'],
    difficulty: 'medium'
  },
  {
    id: 7,
    title: 'Problem 7',
    question: 'Given an array of strings, return an array of their lengths',
    sampleData: `let words = ["crab", "France", "Washington D.C.", "FIFA World Cup", "dog", "pest control"];`,
    solution: `let wordCount = words.map(word => word.length);
    console.log(wordCount);`,
    output: [4, 6, 15, 14, 3, 12],
    functions: ['map'],
    difficulty: 'easy'
  },
  {
    id: 8,
    title: 'Problem 8',
    question: 'Given [1, 2, 3, 4, 5, 6], return only the even numbers',
    sampleData: 'let upToSix = [1, 2, 3, 4, 5, 6];',
    solution: `let evens = upToSix.filter(num => num % 2 === 0)
    console.log(evens);`,
    output: [2, 4, 6],
    functions: ['filter'],
    difficulty: 'easy'
  },
  {
    id: 9,
    title: 'Problem 9',
    question: 'Given an array of words, return only those longer than 4 characters',
    sampleData: `let moreWords = ["pet", "chimichanga", "zebra", "go", "chameleon", "spring", "cat"];`,
    solution: `let moreThanFourChars = moreWords.filter(word => word.length > 4);
    console.log(moreThanFourChars);`,
    output: ['chimichanga', 'zebra', 'chameleon', 'spring'],
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
}).map(person => person.name);
console.log(olderThan18);`,
    output: ['Sean', 'Amy', 'Matt', 'Stacy'],
    functions: ['filter', 'map'],
    difficulty: 'easy'
  },
  {
    id: 11,
    title: 'Problem 11',
    question: 'Given an array of numbers, remove all negative numbers',
    sampleData: 'let integers = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];',
    solution: `let positives = integers.filter(num => num >= 0);
    console.log(positives);`,
    output: [0, 1, 2, 3, 4, 5],
    functions: ['filter'],
    difficulty: 'easy'
  },
  {
    id: 12,
    title: 'Problem 12',
    question: 'Given an array of strings, remove any empty strings ("")',
    sampleData: `let animals = ["", "dog", "whale", "cat", "monkey", "", "octopus"];`,
    solution: `let cleanAnimals = animals.filter(word => word.length > 0);
    console.log(cleanAnimals);`,
    output: ['dog', 'whale', 'cat', 'monkey', 'octopus'],
    functions: ['filter'],
    difficulty: 'easy'
  },
  {
    id: 13,
    title: 'Problem 13',
    question: 'Given an array of objects {name, inStock}, return only items where inStock is true',
    sampleData: `let stock = [
  {name: "squegee", inStock: true},
  {name: "rubber duck", inStock: true},
  {name: "soap", inStock: false},
  {name: "LCD Monitor", inStock: false}
];`,
    solution: `let availableNames = stock
  .filter(item => item.inStock)
  .map(item => item.name);
console.log(availableNames);`,
    output: ['squegee', 'rubber duck'],
    functions: ['filter', 'map'],
    difficulty: 'medium'
  },
  {
    id: 14,
    title: 'Problem 14',
    question: 'Sum all numbers in an array',
    sampleData: 'let oneToFive = [1, 2, 3, 4, 5];',
    solution: `let summedFive = oneToFive.reduce((acc, val) => acc + val, 0);
    console.log(summedFive);`,
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
}, oneToFive[0]);
console.log(maxOfFive);`,
    output: 5,
    functions: ['reduce'],
    difficulty: 'medium'
  },
  {
    id: 16,
    title: 'Problem 16',
    question: 'Count how many items in an array are even',
    sampleData: 'let oneToFive = [1, 2, 3, 4, 5];',
    solution: `let evenOfFive = oneToFive.reduce((acc, val) => acc + (val % 2 === 0), 0);
    console.log(evenOfFive);`,
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
    solution: `let priceTotal = cart.reduce((acc, value) => acc + value.price, 0);
    console.log(priceTotal);`,
    output: 41.74,
    functions: ['reduce'],
    difficulty: 'easy'
  },
  {
    id: 18,
    title: 'Problem 18',
    question: 'Concatenate an array of strings into one sentence, separated by spaces',
    sampleData: `let sentenceWords = ["The", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog"];`,
    solution: `let sentence = sentenceWords.reduce((acc, word) => acc + " " + word) + '.';
    console.log(sentence);`,
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
    }, {});
    console.log(wordKeyCount);`,
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
    }, 0);
    console.log(currentStockTotal);`,
    output: 150.5,
    functions: ['filter', 'reduce'],
    difficulty: 'hard'
  },
  {
    id: 21,
    title: 'Problem 21',
    question: 'Given an array of temperatures in Celsius, convert them all to Fahrenheit.',
    sampleData: 'const temps = [0, 20, 37, 100, -10];',
    solution: `const fahrenheitTemps = temps.map((temp) => Number(((temp * 9) / 5 + 32).toFixed(2)));
    console.log(fahrenheitTemps);`,
    output: [32, 68, 98.6, 212, 14],
    functions: ['map'],
    difficulty: 'medium'
  },
  {
    id: 22,
    title: 'Problem 22',
    question: 'Given an array of objects {firstName, lastName}, return an array of full name strings',
    sampleData: `let names = [
  { firstName: "Sam", lastName: "Ortiz" },
  { firstName: "Ana", lastName: "Kim" },
  { firstName: "Luis", lastName: "Fernandez" }
];`,
    solution: `let fullNames = names.map(person => \`\${person.firstName} \${person.lastName}\`);
    console.log(fullNames);`,
    output: ['Sam Ortiz', 'Ana Kim', 'Luis Fernandez'],
    functions: ['map'],
    difficulty: 'easy'
  },
  {
    id: 23,
    title: 'Problem 23',
    question: 'Given an array of numbers, return an array of objects like { value: n, isEven: true/false }',
    sampleData: 'let nums = [4, 7, 10, 13, 22];',
    solution: `let evenTally = nums.map(num => ({value: num, isEven: num % 2 === 0}));
    console.log(evenTally);`,
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
    sampleData: `let products = [
  { name: "Widget", price: 19.49 },
  { name: "Gadget", price: 42.75 },
  { name: "Doohickey", price: 5.20 }
];`,
    solution: `let roundedPrices = products.map(product => ({name: product.name, price: Number(product.price.toFixed(2))}))
    console.log(roundedPrices);`,
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
    });
    console.log(domains);`,
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
      .map(review => review.title);
      console.log(over4Rating);`,
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
    })
    console.log(urgentTickets);`,
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
    sampleData: 'let nums = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];',
    solution: `let isPrime = (num) => {
      if(num <= 1) return false;
      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
      }
      return true;
    }

    let primes = nums.filter(isPrime);
    console.log(primes);`,
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
    solution: `let nondeletedRecords = records.filter(record => !record.deleted)
    console.log(nondeletedRecords);`,
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
    sampleData: `let strings = [
  "sam@example.com",
  "not-an-email",
  "ana.kim@school.edu",
  "just text",
  "bad@nodot"
];`,
    solution: `let validEmails = strings.filter(str =>    str.includes("@") && str.includes("."));
    console.log(validEmails);`,
    output: ['sam@example.com', 'ana.kim@school.edu'],
    functions: ['filter'],
    difficulty: 'easy'
  },
  {
    id: 31,
    title: 'Problem 31',
    question: 'Given an array of numbers, find both the min and max in a single reduce, returning { min, max }',
    sampleData: 'let nums = [8, 3, 17, 4, 22, 1, 15];',
    solution: `let minMaxNums = nums.reduce((acc, val) => {
      if (val < acc['min']) {
        acc['min'] = val;
      };
      if (val > acc['max']) {
        acc['max'] = val;
      };

      return acc;
    }, {min: Infinity, max: -Infinity});
    console.log(minMaxNums);`,
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
    }, {});
    console.log(totalByCategory);`,
    output: { groceries: 120, rent: 800, fun: 45 },
    functions: ['reduce'],
    difficulty: 'medium'
  },
  {
    id: 33,
    title: 'Problem 33',
    question: 'Given an array of objects {name, age}, build an object keyed by name, mapping to age (e.g. { "Sam": 25, "Ana": 31 })',
    sampleData: `let people = [
  { name: "Sam", age: 25 },
  { name: "Ana", age: 31 },
  { name: "Luis", age: 28 }
];`,
    solution: `let nameAge = people.reduce((acc, val) => {
      acc[val.name] = val.age;
      return acc;
    }, {});
    console.log(nameAge);`,
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
    }, {vowels: 0, consonants: 0})
    console.log(consonantVowelCount);`,
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
    }, {passed: 0, failed: 0});
    console.log(passFailCount);`,
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
    }, {});
    console.log(avgSalaryByDept);`,
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
    .map(movie => movie.title);
    console.log(comediesAbove7);`,
    output: ['Laugh Riot', 'Funny Farm'],
    functions: ['filter', 'map'],
    difficulty: 'medium'
  },
  {
    id: 38,
    title: 'Problem 38',
    question: 'Given an array of numbers, build an object { evens: [...], odds: [...] } splitting them into two arrays (reduce)',
    sampleData: 'let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];',
    solution: `let oddEvenSplit = nums.reduce((arr, val) => {
      val % 2 === 0 ? arr.evens = [...arr.evens, val] : arr.odds = [...arr.odds, val];
      return arr;
    }, {evens: [], odds: []});
    console.log(oddEvenSplit);`,
    output: { evens: [2, 4, 6, 8, 10], odds: [1, 3, 5, 7, 9] },
    functions: ['reduce'],
    difficulty: 'medium'
  },
  {
    id: 39,
    title: 'Problem 39',
    question: 'Given an array of objects {name, inStock, price}, return an object { inStockCount, totalValue } summarizing the whole cart in one reduce pass',
    sampleData: `let cart = [
  { name: "Keyboard", inStock: true, price: 45.00 },
  { name: "Monitor", inStock: false, price: 199.99 },
  { name: "Mouse", inStock: true, price: 25.50 },
  { name: "Webcam", inStock: true, price: 60.00 }
];`,
    solution: `let stockSummary = cart.reduce((acc, val) => {
      if (val.inStock) {
        acc['inStockCount'] += 1,
        acc['totalValue'] += val.price
      };
      return acc;
    }, {inStockCount: 0, totalValue: 0});
    console.log(stockSummary);`,
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

    let charges = result.history;
    console.log(charges);`,
    output: [100, 70, 120, 100],
    functions: ['reduce'],
    difficulty: 'hard'
  },
  {
    id: 41,
    title: 'Problem 41',
    question: 'Sort an array of numbers in ascending order',
    sampleData: 'let nums = [5, 2, 8, 1, 9];',
    solution: `let ascNums = nums.sort((a, b) => a - b);
    console.log(ascNums);`,
    output: [1, 2, 5, 8, 9],
    functions: ['sort'],
    difficulty: 'easy'
  },
  {
    id: 42,
    title: 'Problem 42',
    question: 'Sort that same array in descending order',
    sampleData: 'let nums = [5, 2, 8, 1, 9];',
    solution: `let descNums = nums.sort((a, b) => b - a);
    console.log(descNums);`,
    output: [9, 8, 5, 2, 1],
    functions: ['sort'],
    difficulty: 'easy'
  },
  {
    id: 43,
    title: 'Problem 43',
    question: 'Sort an array of strings alphabetically',
    sampleData: `let fruits = ["banana", "apple", "cherry"];`,
    solution: `let descLetters = fruits.sort();
    console.log(descLetters);`,
    output: ['apple', 'banana', 'cherry'],
    functions: ['sort'],
    difficulty: 'easy'
  },
  {
    id: 44,
    title: 'Problem 44',
    question: 'Sort an array of strings in reverse alphabetical order',
    sampleData: `let fruits = ["banana", "apple", "cherry"];`,
    solution: `let ascLetters = fruits.sort((a, b) => (a < b ? 1 : -1));
    console.log(ascLetters);`,
    output: ['cherry', 'banana', 'apple'],
    functions: ['sort'],
    difficulty: 'easy'
  },
  {
    id: 45,
    title: 'Problem 45',
    question: 'Given an array of objects {name, age}, sort by age ascending',
    sampleData: `let people = [
  { name: "Sam", age: 34 },
  { name: "Ana", age: 22 },
  { name: "Luis", age: 29 }
];`,
    solution: `let ascAge = people.sort((a, b) => a.age - b.age);
    console.log(ascAge);`,
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
    sampleData: `let products = [
  { title: "Widget", price: 19.99 },
  { title: "Gadget", price: 42.50 },
  { title: "Doohickey", price: 5.25 }
];`,
    solution: `let ascPrice = products.sort((a, b) => a.price - b.price);
    console.log(ascPrice);`,
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
    sampleData: 'let nums = [7, 3, 9, 1, 5];',
    solution: `let sortedNumbers = [...nums].sort((a, b) => a - b);
    console.log(sortedNumbers);`,
    output: [1, 3, 5, 7, 9],
    functions: ['sort', 'spread'],
    difficulty: 'medium'
  },
  {
    id: 48,
    title: 'Problem 48',
    question: 'Given an array of strings with mixed casing, sort them alphabetically in a case-insensitive way',
    sampleData: `let words = ["banana", "Apple", "cherry", "Date"];`,
    solution: `let noCaseSort = [...words].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
    console.log(noCaseSort);`,
    output: ['Apple', 'banana', 'cherry', 'Date'],
    functions: ['sort', 'spread'],
    difficulty: 'medium'
  },
  {
    id: 49,
    title: 'Problem 49',
    question: 'Given an array of objects {name, department}, sort first by department alphabetically, and for people in the same department, sort by name alphabetically (a tie-breaker sort)',
    sampleData: `let people = [
  { name: "Luis", department: "Sales" },
  { name: "Ana", department: "Engineering" },
  { name: "Sam", department: "Engineering" },
  { name: "Mei", department: "Sales" },
  { name: "Jo", department: "Engineering" }
];`,
    solution: `let sortByDept = [...people].sort((a, b) => {
      if (a.department !== b.department) {
        return a.department > b.department ? 1 : -1;
      } else {
        return a.name > b.name ? 1 : -1;
      }
    });
    console.log(sortByDept);`,
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
    sampleData: 'let nums = [10, 1, 21, 2];',
    solution: `let sortedNums = [...nums].sort((a, b) => a - b);
    console.log(sortedNums);`,
    output: [1, 2, 10, 21],
    functions: ['sort', 'spread'],
    difficulty: 'medium'
  },
  {
    id: 51,
    title: 'Problem 51',
    question: 'Copy an array into a new array without mutating the original',
    sampleData: 'let original = [1, 2, 3];',
    solution: `let copy = [...original];
    console.log(copy);`,
    output: [1, 2, 3],
    functions: ['spread'],
    difficulty: 'easy'
  },
  {
    id: 52,
    title: 'Problem 52',
    question: 'Combine two arrays into one',
    sampleData: `let arrA = [1, 2, 3];
let arrB = [4, 5, 6];`,
    solution: `let combinedArrs = [...arrA, ...arrB];
    console.log(combinedArrs);`,
    output: [1, 2, 3, 4, 5, 6],
    functions: ['spread'],
    difficulty: 'easy'
  },
  {
    id: 53,
    title: 'Problem 53',
    question: 'Copy an object into a new object without mutating the original',
    sampleData: `let original = { name: "Sam", age: 25 };`,
    solution: `let copy = {...original};
    console.log(copy);`,
    output: { name: 'Sam', age: 25 },
    functions: ['spread'],
    difficulty: 'easy'
  },
  {
    id: 54,
    title: 'Problem 54',
    question: "Given an object {name, age}, create a new object that's the same but with age updated to 26, without touching the original",
    sampleData: `let original = { name: "Sam", age: 25 };`,
    solution: `let copy = {...original, age: 26};
    console.log(copy);`,
    output: { name: 'Sam', age: 26 },
    functions: ['spread'],
    difficulty: 'easy'
  },
  {
    id: 55,
    title: 'Problem 55',
    question: 'Add a new item to the front of an array without using .unshift() (i.e., without mutating)',
    sampleData: `let original = [2, 3, 4];
    let newItem = 1;`,
    solution: `let addToFront = [newItem, ...original];
    console.log(addToFront);`,
    output: [1, 2, 3, 4],
    functions: ['spread'],
    difficulty: 'easy'
  },
  {
    id: 56,
    title: 'Problem 56',
    question: 'Add a new item to the end of an array without using .push()',
    sampleData: `let original = [1, 2, 3];
    let newItem = 4;`,
    solution: `let addToEnd = [...original, newItem];
    console.log(addToEnd);`,
    output: [1, 2, 3, 4],
    functions: ['spread'],
    difficulty: 'easy'
  },
  {
    id: 57,
    title: 'Problem 57',
    question: 'Given two objects, merge them into a single object',
    sampleData: `let personInfo = { name: "Sam", age: 25 };
    let contactInfo = { email: "sam@email.com" };`,
    solution: `let objMerge = {...personInfo, ...contactInfo};
    console.log(objMerge);`,
    output: { name: 'Sam', age: 25, email: 'sam@email.com' },
    functions: ['spread'],
    difficulty: 'easy'
  },
  {
    id: 58,
    title: 'Problem 58',
    question: 'Given an array of numbers, create a copy with one extra number inserted, then pass that copy into Math.max() to find the new maximum (spread works on function arguments too)',
    sampleData: `let nums = [4, 9, 2, 15];
    let extraNum = 30;`,
    solution: `let maxArray = [...nums, extraNum];
    let maxNumber = Math.max(...maxArray);
    console.log(maxNumber);`,
    output: 30,
    functions: ['spread'],
    difficulty: 'medium'
  },
  {
    id: 59,
    title: 'Problem 59',
    question: 'Given a function sum(a, b, c), call it by spreading an array [1, 2, 3] into its three arguments',
    sampleData: `function sum(a, b, c) {
      return a + b + c;
    }
    let inputs = [1, 2, 3];`,
    solution: `let spreadFunc = sum(...inputs);
    console.log(spreadFunc);`,
    output: 6,
    functions: ['spread'],
    difficulty: 'easy'
  },
  {
    id: 60,
    title: 'Problem 60',
    question: 'Given an array of objects, create a new array where one specific object (id: 2) has an updated property, everything else stays the same, and nothing is mutated (combine spread on the array with spread on the object)',
    sampleData: `let items = [
  { id: 1, name: "Keyboard", price: 45.00 },
  { id: 2, name: "Monitor", price: 199.99 },
  { id: 3, name: "Mouse", price: 25.50 }
];`,
    solution: `let updatedItems = items.map(item => {
      return item.id === 2 ? {...item, price: 179.99 } : item;
    });
    console.log(updatedItems);`,
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
    sampleData: 'let arr = [10, 20, 30];',
    solution: `let [first, second] = arr;
    console.log([first, second]);`,
    output: [10, 20],
    functions: ['destructure'],
    difficulty: 'easy'
  },
  {
    id: 62,
    title: 'Problem 62',
    question: 'Given [1, 2, 3], destructure to grab the first and third values, skipping the second',
    sampleData: 'let arr = [1, 2, 3];',
    solution: `let [one, , three] = arr;
    console.log([one, three]);`,
    output: [1, 3],
    functions: ['destructure'],
    difficulty: 'medium'
  },
  {
    id: 63,
    title: 'Problem 63',
    question: 'Given let a = 1, b = 2, swap their values using destructuring (no temp variable)',
    sampleData: `let a = 1;
    let b = 2;`,
    solution: `[a, b] = [b, a];
    console.log([a, b]);`,
    output: [2, 1],
    functions: ['destructure'],
    difficulty: 'medium'
  },
  {
    id: 64,
    title: 'Problem 64',
    question: 'Given [1, 2, 3, 4, 5], pull the first value into head and the rest into an array tail',
    sampleData: 'let arr = [1, 2, 3, 4, 5];',
    solution: `let [head, ...tail] = arr;
    console.log([head, tail]);`,
    output: [1, [2, 3, 4, 5]],
    functions: ['destructure', 'spread'],
    difficulty: 'medium'
  },
  {
    id: 65,
    title: 'Problem 65',
    question: 'Given { name: "Sam", age: 25 }, pull name and age into variables of the same name',
    sampleData: `let person = { name: "Sam", age: 25 };`,
    solution: `let {name, age} = person;
    console.log([name, age]);`,
    output: ['Sam', 25],
    functions: ['destructure'],
    difficulty: 'easy'
  },
  {
    id: 66,
    title: 'Problem 66',
    question: 'Given { name: "Sam", age: 25 }, pull name into a variable called userName',
    sampleData: `let person = { name: "Sam", age: 25 };`,
    solution: `let {name: userName} = person;
    console.log(userName);`,
    output: 'Sam',
    functions: ['destructure'],
    difficulty: 'easy'
  },
  {
    id: 67,
    title: 'Problem 67',
    question: 'Given { name: "Sam" } (no age), destructure age with a default value of 18',
    sampleData: `let person = { name: "Sam" };`,
    solution: `let {name: userName, age = 18} = person;
    console.log([userName, age]);`,
    output: ['Sam', 18],
    functions: ['destructure'],
    difficulty: 'medium'
  },
  {
    id: 68,
    title: 'Problem 68',
    question: 'Given { name: "Sam", address: { city: "Austin", zip: "78701" } }, pull city directly into a variable',
    sampleData: `let person = { name: "Sam", address: { city: "Austin", zip: "78701" } };`,
    solution: `let {
      address: {
        city
      },
    } = person;
    console.log(city);`,
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
    solution: `greet({ name: "Sam", age: 25 });
    console.log(greet({ name: "Sam", age: 25 }));`,
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
    sampleData: 'let name = "Sam";',
    solution: `let greeting = \`Hello, \${name}!\`;
    console.log(greeting);`,
    output: 'Hello, Sam!',
    functions: ['template-literal'],
    difficulty: 'easy'
  },
  {
    id: 72,
    title: 'Problem 72',
    question: 'Given let a = 4, b = 5, build the string "4 + 5 = 9" using a template literal (no manual string concatenation)',
    sampleData: `let a = 4;
    let b = 5;`,
    solution: `let equation = \`\${a} + \${b} = \${a + b}\`;
    console.log(equation);`,
    output: '4 + 5 = 9',
    functions: ['template-literal'],
    difficulty: 'easy'
  },
  {
    id: 73,
    title: 'Problem 73',
    question: 'Build a multi-line address string ("123 Main St", "Austin, TX 78701") using a template literal instead of \\n',
    sampleData: '// no sample data needed for this one',
    solution: `let address = \`
  123 Main St,
  Austin,
  TX 78701
\`;
console.log(address);`,
    output: '\n  123 Main St,\n  Austin,\n  TX 78701\n',
    functions: ['template-literal'],
    difficulty: 'easy'
  },
  {
    id: 74,
    title: 'Problem 74',
    question: 'Given a function shout(str) that uppercases a string, use it inside a template literal to build "SAM says HELLO"',
    sampleData: `function shout(str) {
      return str.toUpperCase();
    }
    let name = "Sam";`,
    solution: `let msg = \`\${name} says \${shout('hello')}\`;
    console.log(msg);`,
    output: 'Sam says HELLO',
    functions: ['template-literal'],
    difficulty: 'medium'
  },
  {
    id: 75,
    title: 'Problem 75',
    question: 'Given let score = 85, build a string that says "Result: Pass" or "Result: Fail" depending on whether score >= 60',
    sampleData: 'let score = 85;',
    solution: `let result = \`Result: \${score >= 60 ? 'Pass' : 'Fail'}\`;
    console.log(result);`,
    output: 'Result: Pass',
    functions: ['template-literal'],
    difficulty: 'medium'
  },
  {
    id: 76,
    title: 'Problem 76',
    question: 'Given an array of names ["Sam", "Ana", "Luis"], build a single string like "Guests: Sam, Ana, Luis" by nesting a .join() call inside a template literal',
    sampleData: `let names = ["Sam", "Ana", "Luis"];`,
    solution: `let guestlist = \`Guests: \${names.join(", ")}\`;
    console.log(guestlist);`,
    output: 'Guests: Sam, Ana, Luis',
    functions: ['template-literal'],
    difficulty: 'medium'
  },
  {
    id: 77,
    title: 'Problem 77',
    question: 'Given { title: "Dune", price: 12.99 }, build a string like "Dune costs $12.99" using a template literal',
    sampleData: `let book = { title: "Dune", price: 12.99 };`,
    solution: `let {title, price} = book;
    let bookPrice = \`\${title} costs $\${price}\`;
    console.log(bookPrice);`,
    output: 'Dune costs $12.99',
    functions: ['destructure', 'template-literal'],
    difficulty: 'medium'
  },
  {
    id: 78,
    title: 'Problem 78',
    question: 'Given { title: "Widget", price: 19.99 }, build a string like "<li>Widget - $19.99</li>" using a template literal',
    sampleData: `let product = { title: "Widget", price: 19.99 };`,
    solution: `let {title, price} = product;
    let productLine = \`<li>\${title} - $\${price}</li>\`;
    console.log(productLine);`,
    output: '<li>Widget - $19.99</li>',
    functions: ['destructure', 'template-literal'],
    difficulty: 'medium'
  },
  {
    id: 79,
    title: 'Problem 79',
    question: 'Given an array of objects [{ name, price }], use .map() with a template literal to produce an array of strings like "Widget: $19.99"',
    sampleData: `let products = [
  { name: "Widget", price: 19.99 },
  { name: "Gadget", price: 42.50 }
];`,
    solution: `let prodDesc = products.map(({name, price}) => {
      return \`\${name}: $\${price}\`;
    });
    console.log(prodDesc);`,
    output: ['Widget: $19.99', 'Gadget: $42.5'],
    functions: ['map', 'destructure', 'template-literal'],
    difficulty: 'medium'
  },
  {
    id: 80,
    title: 'Problem 80',
    question: 'Write a tag function loud(strings, ...values) that rebuilds the template string but uppercases every interpolated value, then use it on `${name} is ${role}`',
    sampleData: `let name = "Sam";
    let role = "admin";`,
    solution: `let loud = (strings, ...values) => {
      return strings.reduce((result, str, i) => {
        let value = values[i] !== undefined ? values[i].toUpperCase() : "";
        return result + str + value;
      }, "");
    };

    let tagged = loud\`\${name} is \${role}\`;
    console.log(tagged);`,
    output: 'SAM is ADMIN',
    functions: ['reduce', 'spread', 'template-literal'],
    difficulty: 'hard'
  },
  {
    id: 81,
    title: 'Problem 81',
    question: 'Given an array of objects {id, name}, find the object with id 3',
    sampleData: `let users = [
  { id: 1, name: "Sam" },
  { id: 2, name: "Ana" },
  { id: 3, name: "Luis" },
  { id: 4, name: "Mei" }
];`,
    solution: `let matchedUser = users.find(({id}) => id === 3);
    console.log(matchedUser);`,
    output: { id: 3, name: 'Luis' },
    functions: ['find', 'destructure'],
    difficulty: 'easy'
  },
  {
    id: 82,
    title: 'Problem 82',
    question: 'Given [4, 9, 15, 22, 7], find the first number greater than 10',
    sampleData: 'let nums = [4, 9, 15, 22, 7];',
    solution: `let firstOverTen = nums.find(num => num > 10);
    console.log(firstOverTen);`,
    output: 15,
    functions: ['find'],
    difficulty: 'easy'
  },
  {
    id: 83,
    title: 'Problem 83',
    question: 'Given an array of objects {id, name}, find the index of the object with name "Luis"',
    sampleData: `let users = [
  { id: 1, name: "Sam" },
  { id: 2, name: "Ana" },
  { id: 3, name: "Luis" },
  { id: 4, name: "Mei" }
];`,
    solution: `let matchedUserIndex = users.findIndex(({name}) => name === "Luis");
    console.log(matchedUserIndex);`,
    output: 2,
    functions: ['findIndex', 'destructure'],
    difficulty: 'easy'
  },
  {
    id: 84,
    title: 'Problem 84',
    question: 'Given [1, 2, 3], try to find a number greater than 10 and note what you get back when nothing matches',
    sampleData: 'let nums = [1, 2, 3];',
    solution: `let numOverTen = nums.find(num => num > 10);
    console.log(numOverTen);`,
    output: undefined,
    functions: ['find'],
    difficulty: 'easy'
  },
  {
    id: 85,
    title: 'Problem 85',
    question: 'Given an array of objects {title, inStock}, find the first in-stock item and destructure its title directly out of the result',
    sampleData: `let products = [
  { title: "Widget", inStock: false },
  { title: "Gadget", inStock: true },
  { title: "Doohickey", inStock: true }
];`,
    solution: `let {title: firstInStock} = products.find(({inStock}) => inStock);
    console.log(firstInStock);`,
    output: 'Gadget',
    functions: ['find', 'destructure'],
    difficulty: 'medium'
  },
  {
    id: 86,
    title: 'Problem 86',
    question: 'Given [1, 3, 5, 8, 9], check whether the array contains at least one even number',
    sampleData: 'let nums = [1, 3, 5, 8, 9];',
    solution: `let isOneEven = nums.some(num => num % 2 === 0);
    console.log(isOneEven);`,
    output: true,
    functions: ['some'],
    difficulty: 'easy'
  },
  {
    id: 87,
    title: 'Problem 87',
    question: 'Given [2, 4, 6, 8], check whether every number in the array is even',
    sampleData: 'let nums = [2, 4, 6, 8];',
    solution: `let allEven = nums.every(num => num % 2 === 0);
    console.log(allEven);`,
    output: true,
    functions: ['every'],
    difficulty: 'easy'
  },
  {
    id: 88,
    title: 'Problem 88',
    question: 'Given an array of objects {name, age}, check whether any user is under 18',
    sampleData: `let users = [
  { name: "Sam", age: 25 },
  { name: "Ana", age: 17 },
  { name: "Luis", age: 30 }
];`,
    solution: `let under18 = users.some(({age}) => age < 18);
    console.log(under18);`,
    output: true,
    functions: ['some', 'destructure'],
    difficulty: 'easy'
  },
  {
    id: 89,
    title: 'Problem 89',
    question: 'Given an array of objects {name, passed}, check whether every student passed',
    sampleData: `let students = [
  { name: "Sam", passed: true },
  { name: "Ana", passed: true },
  { name: "Luis", passed: true }
];`,
    solution: `let allPassed = students.every(({passed}) => passed);
    console.log(allPassed);`,
    output: true,
    functions: ['every', 'destructure'],
    difficulty: 'easy'
  },
  {
    id: 90,
    title: 'Problem 90',
    question: 'Given ["red", "green", "blue"], check whether "green" is in the array, and separately whether "purple" is',
    sampleData: `let colors = ["red", "green", "blue"];`,
    solution: `let colorChecker = (color) => colors.includes(color);

    colorChecker("green");
    colorChecker("purple");
    console.log([colorChecker("green"), colorChecker("purple")]);`,
    output: [true, false],
    functions: ['includes'],
    difficulty: 'easy'
  },
  {
    id: 91,
    title: 'Problem 91',
    question: 'Given [[1, 2], [3, 4], [5, 6]], flatten it into a single array of numbers',
    sampleData: 'let nested = [[1, 2], [3, 4], [5, 6]];',
    solution: `let flatArray = nested.flat();
    console.log(flatArray);`,
    output: [1, 2, 3, 4, 5, 6],
    functions: ['flat'],
    difficulty: 'easy'
  },
  {
    id: 92,
    title: 'Problem 92',
    question: 'Given [1, [2, [3, [4, 5]]]], flatten it all the way down into [1, 2, 3, 4, 5] (flat() takes a depth argument, or you can pass Infinity)',
    sampleData: 'let deepNested = [1, [2, [3, [4, 5]]]];',
    solution: `let deepFlatArray = deepNested.flat(3);
    console.log(deepFlatArray);`,
    output: [1, 2, 3, 4, 5],
    functions: ['flat'],
    difficulty: 'medium'
  },
  {
    id: 93,
    title: 'Problem 93',
    question: 'Given [1, 2, 3], use flatMap to return each number and its double in a single flat array (e.g. 1 becomes [1, 2])',
    sampleData: 'let nums = [1, 2, 3];',
    solution: `let doubled = nums.flatMap(num => [num, num * 2]);
    console.log(doubled);`,
    output: [1, 2, 2, 4, 3, 6],
    functions: ['flatMap'],
    difficulty: 'medium'
  },
  {
    id: 94,
    title: 'Problem 94',
    question: 'Given an array of sentences, use flatMap to split each sentence into words and return one flat array of all the words',
    sampleData: `let sentences = ["the sky is blue", "the grass is green"];`,
    solution: `let words = sentences.flatMap(sentence => sentence.split(" "));
    console.log(words);`,
    output: ['the', 'sky', 'is', 'blue', 'the', 'grass', 'is', 'green'],
    functions: ['flatMap'],
    difficulty: 'medium'
  },
  {
    id: 95,
    title: 'Problem 95',
    question: 'Given an array of numbers, use flatMap to return only the even numbers, doubled (return [] for numbers you want to drop, since flatMap flattens empty arrays away)',
    sampleData: 'let nums = [1, 2, 3, 4, 5, 6];',
    solution: `let doubledEvens = nums.flatMap(num => (num % 2 === 0) ? [num * 2] : []);
    console.log(doubledEvens);`,
    output: [4, 8, 12],
    functions: ['flatMap'],
    difficulty: 'hard'
  },
  {
    id: 96,
    title: 'Problem 96',
    question: 'Given { name: "Sam", age: 25, city: "Austin" }, get an array of just the keys',
    sampleData: `let person = { name: "Sam", age: 25, city: "Austin" };`,
    solution: `let personKeys = Object.keys(person);
    console.log(personKeys);`,
    output: ['name', 'age', 'city'],
    functions: ['Object.keys'],
    difficulty: 'easy'
  },
  {
    id: 97,
    title: 'Problem 97',
    question: 'Given { name: "Sam", age: 25, city: "Austin" }, get an array of just the values',
    sampleData: `let person = { name: "Sam", age: 25, city: "Austin" };`,
    solution: `let personValues = Object.values(person);
    console.log(personValues);`,
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
    sampleData: `let grades = { math: 90, science: 85, art: 70 };`,
    solution: `let gradeEntries = Object.entries(grades).map(([subject, score]) => \`\${subject}: \${score}\`);
    console.log(gradeEntries);`,
    output: ['math: 90', 'science: 85', 'art: 70'],
    functions: ['Object.entries', 'map', 'destructure', 'template-literal'],
    difficulty: 'medium'
  },
  {
    id: 100,
    title: 'Problem 100',
    question: 'Given { a: 1, b: 2, c: 3 }, use Object.entries to get pairs, .filter to keep only pairs with a value greater than 1, then Object.fromEntries to turn it back into an object',
    sampleData: `let nums = { a: 1, b: 2, c: 3 };`,
    solution: `let numsEntries = Object.entries(nums);
    let numsGreaterThanOne = numsEntries.filter(([key, value]) => value > 1);
    let numsFromEntriesGreaterThanOne = Object.fromEntries(numsGreaterThanOne);
    console.log(numsFromEntriesGreaterThanOne);`,
    output: { b: 2, c: 3 },
    functions: ['Object.entries', 'filter', 'Object.fromEntries', 'destructure'],
    difficulty: 'medium'
  },
  {
    id: 101,
    title: 'Problem 101',
    question: 'Given { a: 1, b: 2, c: 3 }, build a new object where the values become the keys and the keys become the values (e.g. { 1: "a", 2: "b", 3: "c" })',
    sampleData: `let nums = { a: 1, b: 2, c: 3 };`,
    solution: `let numsEntries = Object.entries(nums);
    let invertedPairs = numsEntries.map(([key, value]) => [value, key]);
    let invertedKeyValues = Object.fromEntries(invertedPairs);
    console.log(invertedKeyValues);`,
    output: { 1: 'a', 2: 'b', 3: 'c' },
    functions: ['Object.entries', 'map', 'Object.fromEntries', 'destructure'],
    difficulty: 'medium'
  },
  {
    id: 102,
    title: 'Problem 102',
    question: 'Given { name: "Sam", age: 25 }, use entries/map/fromEntries to build a new object with the same values but all keys uppercased',
    sampleData: `let person = { name: "Sam", age: 25 };`,
    solution: `let personEntries = Object.entries(person);
    let uppedPerson = personEntries.map(([key, value]) => [key.toUpperCase(), value]);
    let uppedPersonObj = Object.fromEntries(uppedPerson);
    console.log(uppedPersonObj);`,
    output: { NAME: 'Sam', AGE: 25 },
    functions: ['Object.entries', 'map', 'Object.fromEntries', 'destructure'],
    difficulty: 'medium'
  },
  {
    id: 103,
    title: 'Problem 103',
    question: 'Given { a: 1, b: 2, c: 3 }, use entries/map/fromEntries to build a new object with every value doubled',
    sampleData: `let nums = { a: 1, b: 2, c: 3 };`,
    solution: `let numsEntries = Object.entries(nums);
    let doubledNums = numsEntries.map(([name, value]) => [name, value * 2]);
    let doubledNumsObj = Object.fromEntries(doubledNums);
    console.log(doubledNumsObj);`,
    output: { a: 2, b: 4, c: 6 },
    functions: ['Object.entries', 'map', 'Object.fromEntries', 'destructure'],
    difficulty: 'medium'
  },
  {
    id: 104,
    title: 'Problem 104',
    question: 'Given { a: 1, b: 0, c: 3, d: null, e: 5 }, use entries/filter/fromEntries to build a new object with only the truthy values kept',
    sampleData: `let mixed = { a: 1, b: 0, c: 3, d: null, e: 5 };`,
    solution: `let mixedEntries = Object.entries(mixed);
    let mixedTrues = mixedEntries.filter(([key, value]) => value);
    let mixedTruesObj = Object.fromEntries(mixedTrues);
    console.log(mixedTruesObj);`,
    output: { a: 1, c: 3, e: 5 },
    functions: ['Object.entries', 'filter', 'Object.fromEntries', 'destructure'],
    difficulty: 'medium'
  },
  {
    id: 105,
    title: 'Problem 105',
    question: 'Given { name: "Sam", age: 25, city: "Austin" }, use entries/map/fromEntries to rename the "name" key to "fullName" while leaving the other keys untouched',
    sampleData: `let person = { name: "Sam", age: 25, city: "Austin" };`,
    solution: `let fullNamePersonEntries = Object.entries(person).map(([key, value]) =>
      key === 'name' ? ["fullName", value] : [key, value]
    );
    let personFullNameObj = Object.fromEntries(fullNamePersonEntries);
    console.log(personFullNameObj);`,
    output: { fullName: 'Sam', age: 25, city: 'Austin' },
    functions: ['Object.entries', 'map', 'Object.fromEntries', 'destructure'],
    difficulty: 'hard'
  },
  {
    id: 106,
    title: 'Problem 106',
    question: 'Given { rent: 800, groceries: 200, fun: 50 }, use Object.values (or entries) with reduce to total up all the values',
    sampleData: `let expenses = { rent: 800, groceries: 200, fun: 50 };`,
    solution: `let expensesEntries = Object.entries(expenses);
    let expensesSum = expensesEntries.reduce((total, [key, value]) => total + value, 0);
    console.log(expensesSum);`,
    output: 1050,
    functions: ['Object.entries', 'reduce', 'destructure'],
    difficulty: 'medium'
  },
  {
    id: 107,
    title: 'Problem 107',
    question: 'Given let keys = ["name", "age", "city"] and let values = ["Sam", 25, "Austin"], zip them together into pairs and use Object.fromEntries to build a single object',
    sampleData: `let keys = ["name", "age", "city"];
    let values = ["Sam", 25, "Austin"];`,
    solution: `let kvEntryPairs = keys.map((key, i) => [key, values[i]]);
    let keysValsObj = Object.fromEntries(kvEntryPairs);
    console.log(keysValsObj);`,
    output: { name: 'Sam', age: 25, city: 'Austin' },
    functions: ['map', 'Object.fromEntries'],
    difficulty: 'medium'
  },
  {
    id: 108,
    title: 'Problem 108',
    question: 'Given { isAdmin: true, isActive: false, isVerified: true, isBanned: false }, use Object.entries with filter to keep only the true flags',
    sampleData: `let flags = { isAdmin: true, isActive: false, isVerified: true, isBanned: false };`,
    solution: `let flagsEntries = Object.entries(flags);
    let flagsTrues = flagsEntries.filter(pair => pair[1]);
    let flagsTruesObj = Object.fromEntries(flagsTrues);
    console.log(flagsTruesObj);`,
    output: { isAdmin: true, isVerified: true },
    functions: ['Object.entries', 'filter', 'Object.fromEntries'],
    difficulty: 'medium'
  },
  {
    id: 109,
    title: 'Problem 109',
    question: "Given { math: 70, science: 95, art: 60, gym: 85 }, use Object.entries, sort the pairs by score descending, then build the sorted { subject: score } object",
    sampleData: `let grades = { math: 70, science: 95, art: 60, gym: 85 };`,
    solution: `let gradesEntries = Object.entries(grades);
    let gradesSort = gradesEntries.sort((a, b) => b[1] - a[1]);
    let gradesSortObj = Object.fromEntries(gradesSort);
    console.log(gradesSortObj);`,
    output: { science: 95, gym: 85, math: 70, art: 60 },
    functions: ['Object.entries', 'sort', 'Object.fromEntries'],
    difficulty: 'hard'
  },
  {
    id: 110,
    title: 'Problem 110',
    question: 'Given { a: 1, b: 2 } and { b: 3, c: 4 }, use entries/reduce to merge them into one object where shared keys ("b") have their values added together (result should be { a: 1, b: 5, c: 4 })',
    sampleData: `let objA = { a: 1, b: 2 };
    let objB = { b: 3, c: 4 };`,
    solution: `let mergedEntries = [...Object.entries(objA), ...Object.entries(objB)];

    let mergedObj = mergedEntries.reduce((acc, [key, value]) => {
      acc[key] = (acc[key] || 0) + value;
      return acc;
    }, {});
    console.log(mergedObj);`,
    output: { a: 1, b: 5, c: 4 },
    functions: ['Object.entries', 'reduce', 'spread', 'destructure'],
    difficulty: 'hard'
  },
  {
    id: 111,
    title: 'Problem 111',
    question: 'Given an array of words, sort them from shortest to longest',
    sampleData: `let words = ["banana", "fig", "kiwi", "pomegranate", "date"];`,
    solution: `let wordLenSort = words.sort((a, b) => (a.length - b.length));
    console.log(wordLenSort);`,
    output: ['fig', 'kiwi', 'date', 'banana', 'pomegranate'],
    functions: ['sort'],
    difficulty: 'easy'
  },
  {
    id: 112,
    title: 'Problem 112',
    question: 'Given an array of numbers (some negative), sort by how close they are to 0',
    sampleData: 'let nums = [-8, 3, 1, -2, 6, -1, 9];',
    solution: `let distanceToZeroSort = [...nums].sort((a, b) => {
      return Math.abs(a) - Math.abs(b)
    })
    console.log(distanceToZeroSort);`,
    output: [1, -1, -2, 3, 6, -8, 9],
    functions: ['sort', 'spread'],
    difficulty: 'medium'
  },
  {
    id: 113,
    title: 'Problem 113',
    question: 'Given an array of objects {event, date} where date is a string like "2024-03-15", sort chronologically',
    sampleData: `let events = [
  { event: "Kickoff", date: "2024-06-01" },
  { event: "Launch", date: "2024-01-15" },
  { event: "Review", date: "2024-03-20" }
];`,
    solution: `let dateSort = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
    console.log(dateSort);`,
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
    sampleData: `let users = [
  { name: "Sam", isAdmin: false },
  { name: "Ana", isAdmin: true },
  { name: "Luis", isAdmin: false },
  { name: "Mei", isAdmin: true }
];`,
    solution: `let adminUsers = [...users].sort((a, b) => Number(b.isAdmin) - Number(a.isAdmin));
    console.log(adminUsers);`,
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
    sampleData: `let racers = [
  { name: "Sam", score: 90, timeSeconds: 55 },
  { name: "Ana", score: 90, timeSeconds: 48 },
  { name: "Luis", score: 85, timeSeconds: 40 },
  { name: "Mei", score: 90, timeSeconds: 52 }
];`,
    solution: `let scoreSort = [...racers].sort((a, b) => {
      if (a.score !== b.score) {
        return b.score - a.score
      }
      return a.timeSeconds - b.timeSeconds
    });
    console.log(scoreSort);`,
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
    sampleData: `let tasks = [
  { name: "Write docs", priority: "low" },
  { name: "Fix outage", priority: "high" },
  { name: "Refactor utils", priority: "medium" },
  { name: "Patch security hole", priority: "high" }
];`,
    solution: `let priorityRank = {high: 2, medium: 1, low: 0};

    let rankSort = [...tasks].sort((a, b) => priorityRank[b.priority] - priorityRank[a.priority]);
    console.log(rankSort);`,
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
    sampleData: `let players = [
  { name: "Sam", score: 72 },
  { name: "Ana", score: 95 },
  { name: "Luis", score: 88 },
  { name: "Mei", score: 91 },
  { name: "Jo", score: 60 }
];`,
    solution: `let top3Scores = [...players].sort((a, b) => {
      return b.score - a.score
    }).slice(0, 3);
    console.log(top3Scores);`,
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
    sampleData: `let items = ["item2", "item10", "item1", "item20", "item3"];`,
    solution: `let itemSort = items.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    console.log(itemSort);`,
    output: ['item1', 'item2', 'item3', 'item10', 'item20'],
    functions: ['sort'],
    difficulty: 'hard'
  },
  {
    id: 119,
    title: 'Problem 119',
    question: 'Given an array of arrays, sort them by how many elements each inner array has, fewest to most',
    sampleData: 'let groups = [[1, 2, 3], [1], [4, 5], [1, 2, 3, 4, 5], []];',
    solution: `let ascGroupLengths = [...groups].sort((a, b) => a.length - b.length);
    console.log(ascGroupLengths);`,
    output: [[], [1], [4, 5], [1, 2, 3], [1, 2, 3, 4, 5]],
    functions: ['sort', 'spread'],
    difficulty: 'medium'
  },
  {
    id: 120,
    title: 'Problem 120',
    question: "Given an array of objects {name, group} that's already ordered by name within each group, sort by group only, and confirm the original name order within each group is preserved (this demonstrates that Array.prototype.sort is stable)",
    sampleData: `let people = [
  { name: "Ana", group: "B" },
  { name: "Ben", group: "A" },
  { name: "Cara", group: "B" },
  { name: "Drew", group: "A" }
];`,
    solution: `let stableSortByGroup = [...people].sort((a, b) => a.group.localeCompare(b.group));
    console.log(stableSortByGroup);`,
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
    sampleData: `let products = [
  { name: "Keyboard", price: 45.00, inStock: true },
  { name: "Monitor", price: 199.99, inStock: true },
  { name: "Mouse", price: 25.50, inStock: false },
  { name: "Webcam", price: 40.00, inStock: true }
];`,
    solution: `let stockBelow50 = products.filter(({price, inStock}) => inStock && price < 50);
    console.log(stockBelow50);`,
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
    sampleData: 'let nums = [1, 2, 2, 3, 4, 4, 4, 5, 1];',
    solution: `let uniqNumsFilter = nums.filter((val, ind, arr) => arr.indexOf(val) === ind);
    console.log(uniqNumsFilter);`,
    output: [1, 2, 3, 4, 5],
    functions: ['filter'],
    difficulty: 'medium'
  },
  {
    id: 123,
    title: 'Problem 123',
    question: 'Given an array of strings, return only the ones that contain "the" anywhere, ignoring case',
    sampleData: `let phrases = ["The cat sat", "A dog barked", "THEatre trip", "no match here", "gather round"];`,
    solution: `let phrasesWithThe = phrases.filter(phrase => phrase.toLowerCase().includes("the"));
    console.log(phrasesWithThe);`,
    output: ['The cat sat', 'THEatre trip', 'gather round'],
    functions: ['filter', 'includes'],
    difficulty: 'medium'
  },
  {
    id: 124,
    title: 'Problem 124',
    question: 'Given an array of objects {name, address: {city}}, return only the people who live in "Austin"',
    sampleData: `let people = [
  { name: "Sam", address: { city: "Austin" } },
  { name: "Ana", address: { city: "Denver" } },
  { name: "Luis", address: { city: "Austin" } }
];`,
    solution: `let austinites = people.filter(({address}) => address.city === "Austin");
    console.log(austinites);`,
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
    sampleData: 'let numsAboveThreshold = [3, 12, 7, 20, 5, 18];',
    solution: `let atLeast = (arr, min) => {
      return arr.filter(num => num >= min);
    }

    atLeast(numsAboveThreshold, 15);
    console.log(atLeast(numsAboveThreshold, 15));`,
    output: [20, 18],
    functions: ['filter'],
    difficulty: 'medium'
  },
  {
    id: 126,
    title: 'Problem 126',
    question: 'Given a messy array like [0, "hello", "", null, 42, undefined, false, "world", NaN], remove every falsy value',
    sampleData: `let messy = [0, "hello", "", null, 42, undefined, false, "world", NaN];`,
    solution: `let clean = messy.filter(Boolean);
    console.log(clean);`,
    output: ['hello', 42, 'world'],
    functions: ['filter'],
    difficulty: 'easy'
  },
  {
    id: 127,
    title: 'Problem 127',
    question: 'Given an array of objects {event, date} (as "YYYY-MM-DD" strings), return only the events that fall in 2024',
    sampleData: `let events = [
  { event: "Kickoff", date: "2023-11-01" },
  { event: "Launch", date: "2024-01-15" },
  { event: "Review", date: "2024-03-20" },
  { event: "Wrap-up", date: "2025-01-05" }
];`,
    solution: `let events2024 = events.filter(({event, date}) => new Date(date).getFullYear() === 2024);
    console.log(events2024);`,
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
    sampleData: `let usernames = ["sam99", "trollking", "ana_dev", "spammer42", "luisc"];
    let banned = ["trollking", "spammer42"];`,
    solution: `let allowedUsernames = usernames.filter(name => !banned.includes(name));
    console.log(allowedUsernames);`,
    output: ['sam99', 'ana_dev', 'luisc'],
    functions: ['filter', 'includes'],
    difficulty: 'easy'
  },
  {
    id: 129,
    title: 'Problem 129',
    question: 'Given a sorted array of numbers that should count up by 1 each time, return the numbers that come right before a gap (e.g. [1,2,4,5,7] -> [2, 5], since 3 and 6 are missing after them)',
    sampleData: 'let sequence = [1, 2, 4, 5, 7, 8, 9, 12];',
    solution: `let gapStarts = sequence.filter((num, ind, arr) => ind < arr.length - 1 && num + 1 !== arr[ind + 1])
    console.log(gapStarts);`,
    output: [2, 5, 9],
    functions: ['filter'],
    difficulty: 'hard'
  },
  {
    id: 130,
    title: 'Problem 130',
    question: 'Given an array of objects {name, age}, write a function that returns true if there is at least one person under 21 (use filter, even though .some() would also work — this is about noticing when filter is the wrong tool)',
    sampleData: `let people = [
  { name: "Sam", age: 34 },
  { name: "Ana", age: 19 },
  { name: "Luis", age: 29 }
];`,
    solution: `let onePersonBelow21 = people.filter(({name, age}) => {
      if (age < 21) {
        return true;
      }
    }).length > 0;
    console.log(onePersonBelow21);`,
    output: true,
    functions: ['filter', 'destructure'],
    difficulty: 'medium'
  },
  {
    id: 131,
    title: 'Problem 131',
    question: 'Given an array of arrays like [[1, 2], [3, 4], [5]], flatten it into a single array [1, 2, 3, 4, 5] using reduce',
    sampleData: 'let nested = [[1, 2], [3, 4], [5]];',
    solution: `let flattenNested = nested.reduce((acc, arr) => {
      return acc.concat(arr)
    }, [])
    console.log(flattenNested);`,
    output: [1, 2, 3, 4, 5],
    functions: ['reduce'],
    difficulty: 'medium'
  },
  {
    id: 132,
    title: 'Problem 132',
    question: 'Given an array of strings, use reduce to find the longest one',
    sampleData: `let words = ["fig", "watermelon", "kiwi", "pomegranate", "date"];`,
    solution: `let longestWord = words.reduce((prev, next) => next.length > prev.length ? next : prev, "")
    console.log(longestWord);`,
    output: 'pomegranate',
    functions: ['reduce'],
    difficulty: 'medium'
  },
  {
    id: 133,
    title: 'Problem 133',
    question: 'Given an array of numbers, use reduce to build an object counting how many times each number appears',
    sampleData: 'let freqNums = [1, 2, 2, 3, 1, 4, 2, 3, 3, 3];',
    solution: `let freqCount = freqNums.reduce((prev, next) => {
      prev[next] = (prev[next] || 0) + 1;
      return prev;
    }, {})
    console.log(freqCount);`,
    output: { 1: 2, 2: 3, 3: 4, 4: 1 },
    functions: ['reduce'],
    difficulty: 'medium'
  },
  {
    id: 134,
    title: 'Problem 134',
    question: 'Given an array of objects {name, amount} representing donations, use reduce to build a single string like "Sam: $10, Ana: $25, Luis: $5"',
    sampleData: `let donations = [
  { name: "Sam", amount: 10 },
  { name: "Ana", amount: 25 },
  { name: "Luis", amount: 5 }
];`,
    solution: `let donationSummary = donations.reduce((acc, val, index) => {
      return index === 0 ? \`\${val.name}: $\${val.amount}\` : \`\${acc}, \${val.name}: $\${val.amount}\`;
    }, "")
    console.log(donationSummary);`,
    output: 'Sam: $10, Ana: $25, Luis: $5',
    functions: ['reduce', 'template-literal'],
    difficulty: 'hard'
  },
  {
    id: 135,
    title: 'Problem 135',
    question: 'Given an array of objects {name, department}, use reduce to build an object where each key is a department and the value is an array of names in that department (general-purpose groupBy)',
    sampleData: `let employees = [
  { name: "Sam", department: "Engineering" },
  { name: "Ana", department: "Sales" },
  { name: "Luis", department: "Engineering" },
  { name: "Mei", department: "Sales" }
];`,
    solution: `let groupedByDept = employees.reduce((acc, val) => {
      if (!acc[val.department]) {
        acc[val.department] = [];
      }
      acc[val.department].push(val.name);
      return acc;
    }, {});
    console.log(groupedByDept);`,
    output: { Engineering: ['Sam', 'Luis'], Sales: ['Ana', 'Mei'] },
    functions: ['reduce'],
    difficulty: 'medium'
  },
  {
    id: 136,
    title: 'Problem 136',
    question: 'Given an array of numbers, use reduce (possibly two passes) to find the value that appears most often (the mode)',
    sampleData: 'let nums = [4, 1, 2, 2, 3, 2, 4, 4, 4, 1];',
    solution: `let modeCounts = nums.reduce((acc, num) => {
      acc[num] = (acc[num] || 0) + 1;
      return acc;
    }, {});

    let mode = Object.entries(modeCounts).reduce((best, [num, count]) => {
      return count > best.count ? { num: Number(num), count } : best;
    }, { num: null, count: 0 });
    console.log(mode);`,
    output: { num: 4, count: 4 },
    functions: ['reduce', 'Object.entries', 'destructure'],
    difficulty: 'hard'
  },
  {
    id: 137,
    title: 'Problem 137',
    question: 'Given an array of objects {id, name}, use reduce to build a Map keyed by id (useful when keys might not be strings)',
    sampleData: `let records = [
  { id: 101, name: "Widget" },
  { id: 102, name: "Gadget" },
  { id: 103, name: "Doohickey" }
];`,
    solution: `let recordsById = records.reduce((map, record) => {
      map.set(record.id, record.name);
      return map;
    }, new Map());
    console.log(Object.fromEntries(recordsById));`,
    output: { 101: 'Widget', 102: 'Gadget', 103: 'Doohickey' },
    functions: ['reduce'],
    difficulty: 'hard'
  },
  {
    id: 138,
    title: 'Problem 138',
    question: 'Given an array of strings ["a", "b", "c"], use reduceRight to concatenate them back-to-front into "cba"',
    sampleData: `let letters = ["a", "b", "c"];`,
    solution: `let reversedConcat = letters.reduceRight((acc, letter) => acc + letter, "");
    console.log(reversedConcat);`,
    output: 'cba',
    functions: ['reduce'],
    difficulty: 'medium'
  },
  {
    id: 139,
    title: 'Problem 139',
    question: 'Given an array of words, use reduce to build an object like { 3: 2, 5: 1 } counting how many words have each length',
    sampleData: `let words = ["cat", "dog", "horse", "ox", "lion", "koala"];`,
    solution: `let lengthHistogram = words.reduce((acc, word) => {
      acc[word.length] = (acc[word.length] || 0) + 1;
      return acc;
    }, {});
    console.log(lengthHistogram);`,
    output: { 2: 1, 3: 2, 4: 1, 5: 2 },
    functions: ['reduce'],
    difficulty: 'medium'
  },
  {
    id: 140,
    title: 'Problem 140',
    question: 'Given an array of objects {step, status} where status is "success" or "fail", use reduce to determine whether every step succeeded (return true if there was no failure, false if any step failed)',
    sampleData: `let pipeline = [
  { step: "build", status: "success" },
  { step: "test", status: "success" },
  { step: "deploy", status: "fail" },
  { step: "notify", status: "success" }
];`,
    solution: `let allSucceeded = pipeline.reduce((acc, val) => acc && val.status === "success", true);
    console.log(allSucceeded);`,
    output: false,
    functions: ['reduce'],
    difficulty: 'medium'
  }
];

// Core tags (shown by default) come first; secondary/less-common tags are
// appended after and only surface via the "Show more" toggle. 'Object' is a
// pseudo-tag consolidating Object.keys/values/entries/fromEntries into one
// pill — see the matchesFunctions check in getFilteredExercises.
export const CORE_FUNCTIONS = [
  'map', 'filter', 'reduce', 'sort', 'spread', 'destructure', 'template-literal',
  'some', 'every'
];
export const SECONDARY_FUNCTIONS = ['find', 'findIndex', 'includes', 'flat', 'flatMap', 'Object'];
export const KNOWN_FUNCTIONS = [...CORE_FUNCTIONS, ...SECONDARY_FUNCTIONS];
export const DIFFICULTIES = ['easy', 'medium', 'hard'];

// 'Object' is a pseudo-tag: matches any exercise carrying an Object.* tag
// (Object.keys, Object.values, Object.entries, Object.fromEntries) rather
// than a literal tag exercises are given directly. Used by exercises.js's
// carousel filtering and by profile.html's badge computation.
export function exerciseHasFunction(exercise, fn) {
  if (fn === 'Object') return exercise.functions.some((f) => f.startsWith('Object.'));
  return exercise.functions.includes(fn);
}

// MDN reference link for each known tag, shown on profile.html's
// achievement cards. Array methods link to their Array.prototype page;
// spread/destructure/template-literal are language syntax, not methods,
// so they link to MDN's syntax-reference pages instead.
export const KNOWN_FUNCTION_MDN_LINKS = {
  map: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map',
  filter: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter',
  reduce: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce',
  sort: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort',
  spread: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax',
  destructure: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring',
  'template-literal': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals',
  some: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some',
  every: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every',
  find: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find',
  findIndex: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex',
  includes: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes',
  flat: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat',
  flatMap: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap',
  Object: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object'
};
