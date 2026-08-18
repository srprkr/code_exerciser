const exercises = [
  {
    id: 1,
    title: 'Problem 1',
    question: 'Double every number in [1, 2, 3, 4, 5]',
    sampleData: 'let oneToFive = [1, 2, 3, 4, 5];',
    solution: `let doubleTheFive = oneToFive.map(n => n * 2);`,
    output: [2, 4, 6, 8, 10]
  },
  {
    id: 2,
    title: 'Problem 2',
    question: 'Convert an array of strings to all uppercase',
    sampleData: 'let lower = ["h", "e", "l", "l", "o"];',
    solution: `let upper = lower.map(l => l.toString().toUpperCase());`,
    output: ['H', 'E', 'L', 'L', 'O']
  },
  {
    id: 3,
    title: 'Problem 3',
    question: 'Given an array of names, return an array of greeting strings like "Hello, Sam!"',
    sampleData: `let names = ['Sean', 'Ralph', 'Bill', 'Tom', 'Hank'];`,
    solution: `let greetings = names.map(name => \`Hello, \${name}!\`);`,
    output: ['Hello, Sean!', 'Hello, Ralph!', 'Hello, Bill!', 'Hello, Tom!', 'Hello, Hank!']
  },
  {
    id: 4,
    title: 'Problem 4',
    question: 'Given an array of numbers, return their squares',
    sampleData: 'let fibonacci = [1, 2, 4, 8, 16];',
    solution: `let squareNums = fibonacci.map(num => num ** 2);`,
    output: [1, 4, 16, 64, 256]
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
    output: ['Sean', 'Amy', 'Matt', 'Stacy']
  },
  {
    id: 6,
    title: 'Problem 6',
    question: 'Given an array of prices (numbers), return an array with tax added (multiply by 1.08)',
    sampleData: 'let prices = [1.80, 23.42, 6.50, 8.36, 14.78];',
    solution: `let taxPrices = prices.map(price => Number((price * 1.08).toFixed(2)));`,
    output: [1.94, 25.29, 7.02, 9.03, 15.96]
  },
  {
    id: 7,
    title: 'Problem 7',
    question: 'Given an array of strings, return an array of their lengths',
    sampleData: `let words = ["crab", "France", "Washington D.C.", "FIFA World Cup", "dog", "pest control"];`,
    solution: `let wordCount = words.map(word => word.length);`,
    output: [4, 6, 16, 14, 3, 12]
  },
  {
    id: 8,
    title: 'Problem 8',
    question: 'Given [1, 2, 3, 4, 5, 6], return only the even numbers',
    sampleData: 'let upToSix = [1, 2, 3, 4, 5, 6];',
    solution: `let evens = upToSix.filter(num => num % 2 === 0)`,
    output: [2, 4, 6]
  },
  {
    id: 9,
    title: 'Problem 9',
    question: 'Given an array of words, return only those longer than 4 characters',
    sampleData: `let moreWords = ["pet", "chimichanga", "zebra", "go", "chameleon", "spring", "cat"];`,
    solution: `let moreThanFourChars = moreWords.filter(word => word.length > 4);`,
    output: ['chameleon', 'chimichanga', 'spring', 'zebra']
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
    output: ['Sean', 'Amy', 'Matt', 'Stacy']
  },
  {
    id: 11,
    title: 'Problem 11',
    question: 'Given an array of numbers, remove all negative numbers',
    sampleData: 'let integers = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];',
    solution: `let positives = integers.filter(num => num >= 0);`,
    output: [0, 1, 2, 3, 4, 5]
  },
  {
    id: 12,
    title: 'Problem 12',
    question: 'Given an array of strings, remove any empty strings ("")',
    sampleData: `let animals = ["", "dog", "whale", "cat", "monkey", "", "octopus"];`,
    solution: `let cleanAnimals = animals.filter(word => word.length > 0);`,
    output: ['dog', 'whale', 'cat', 'monkey', 'octopus']
  },
  {
    id: 13,
    title: 'Problem 13',
    question: 'Given an array of objects {name, inStock}, return only items where inStock is true',
    sampleData: `let stock = [{name: "squegee", inStock: true}, {name: "rubber duck", inStock: true}, {name: "soap", inStock: false}, {name: "LCD Monitor", inStock: false}];`,
    solution: `let availableNames = stock
  .filter(item => item.inStock)
  .map(item => item.name);`,
    output: ['squegee', 'rubber duck']
  },
  {
    id: 14,
    title: 'Problem 14',
    question: 'Sum all numbers in an array',
    sampleData: 'let oneToFive = [1, 2, 3, 4, 5];',
    solution: `let summedFive = oneToFive.reduce((acc, val) => acc + val, 0);`,
    output: 15
  },
  {
    id: 15,
    title: 'Problem 15',
    question: 'Find the maximum number in an array',
    sampleData: 'let oneToFive = [1, 2, 3, 4, 5];',
    solution: `let maxOfFive = oneToFive.reduce((acc, val) => {
  return acc < val ? val : acc;
}, oneToFive[0]);`,
    output: 5
  },
  {
    id: 16,
    title: 'Problem 16',
    question: 'Count how many items in an array are even',
    sampleData: 'let oneToFive = [1, 2, 3, 4, 5];',
    solution: `let evenOfFive = oneToFive.reduce((acc, val) => acc + (val % 2 === 0), 0);`,
    output: 2
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
    output: 41.74
  },
  {
    id: 18,
    title: 'Problem 18',
    question: 'Concatenate an array of strings into one sentence, separated by spaces',
    sampleData: `let sentenceWords = ["The", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog"];`,
    solution: `let sentence = sentenceWords.reduce((acc, word) => acc + " " + word) + '.';`,
    output: 'The quick brown fox jumps over the lazy dog.'
  },
  {
    id: 19,
    title: 'Problem 19',
    question: 'Given an array of words, build an object counting how many times each word appears (e.g. ["a","b","a"] → {a: 2, b: 1})',
    sampleData: `let wordsToCount = ['dog', 'elephant', 'domino', 'octopus', 'sausage', 'dagger', 'dog', 'elephant', 'domino', 'dog', 'cat', 'domino', 'octopus', 'skit'];`,
    solution: `let wordKeyCount = wordsToCount.reduce((acc, word) => {
  if (acc[word]) {
    acc[word]++;
  } else {
    acc[word] = 1;
  }
  return acc;
}, {});`,
    output: { dog: 3, elephant: 2, domino: 3, octopus: 2, sausage: 1, dagger: 1, cat: 1, skit: 1 }
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
    output: 150.5
  },
  {
    id: 21,
    title: 'Problem 21',
    question: 'Given an array of temperatures in Celsius, convert them all to Fahrenheit.',
    sampleData: 'const temps = [0, 20, 37, 100, -10];',
    solution: `const fahrenheitTemps = temps.map((temp) => Number(((temp * 9) / 5 + 32).toFixed(2)));`,
    output: [32, 68, 98.6, 212, 14]
  }
];

let currentExerciseIndex = 0;

const exerciseEl = document.querySelector('#exercise-1');
const titleEl = document.querySelector('#exercise-1 .exercise-title');
const questionEl = document.querySelector('#exercise-1 .question');
const sampleDataEl = document.querySelector('#exercise-1 .sample-data');
const solutionEl = document.querySelector('#exercise-1 .solution');
const outputEl = document.querySelector('#exercise-1 .output');
const counterEl = document.querySelector('.carousel-counter');
const buttons = document.querySelectorAll('.carousel-button');

function renderExercise(index) {
  const exercise = exercises[index];

  if (!exercise || !exerciseEl) return;

  if (titleEl) titleEl.textContent = `Problem ${exercise.id}`;
  if (questionEl) questionEl.textContent = exercise.question;
  if (sampleDataEl) sampleDataEl.textContent = exercise.sampleData;
  if (solutionEl) solutionEl.textContent = exercise.solution;
  if (outputEl) outputEl.textContent = JSON.stringify(exercise.output, null, 2);
  if (counterEl) counterEl.textContent = `${index + 1} / ${exercises.length}`;
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;

    if (action === 'next') {
      currentExerciseIndex = (currentExerciseIndex + 1) % exercises.length;
    } else if (action === 'prev') {
      currentExerciseIndex = (currentExerciseIndex - 1 + exercises.length) % exercises.length;
    }

    renderExercise(currentExerciseIndex);
  });
});

renderExercise(currentExerciseIndex);
