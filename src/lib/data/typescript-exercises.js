// TypeScript isn't a separate problem set: it's the JavaScript problems,
// typed, plus a short intro to the type system. So this module holds only
// the intro problems (ids -9 through 0, so they sit ahead of JavaScript's
// problem 1 in the carousel) and reads everything else out of
// javascript-exercises.js — one file stays the source of truth for both
// languages.
//
// Intro problems -9 through -1 are tutorials: a `tutorial` (Markdown, with
// ~~~ts / ~~~js code fences) explains the concept, and TutorialPanel shows
// the solution up front for the user to type out, in place of the usual
// solution toggle and hint. `docUrl` is their "read more" link. Problem 0 is
// the final challenge: no tutorial, and the normal toggle and hint.
//
// A JavaScript problem appears here once it has a `ts` key. Its fields
// (question, sampleData, solution, hint, ...) override the JavaScript ones;
// anything left out falls back. Every override has to practise a type a
// developer would really write (or, for problem 1 only, explicitly teach
// inference) — never repeat the JavaScript unchanged. Problems without a
// `ts` key are left out rather than shown untyped: some JavaScript solutions
// don't pass a strict type check as-is (e.g. adding a boolean to a number),
// and every problem shown here must have a solution that does.
// typescriptSolutions.test.js enforces all of this.
import * as javascript from './javascript-exercises.js';

const HANDBOOK = 'https://www.typescriptlang.org/docs/handbook';

const introExercises = [
  {
    id: -9,
    question: 'Form inputs arrive as strings. Write orderTotal(subtotal, shipping) with both parameters typed as number, then log the order total for subtotalInput and shippingInput, converting them to numbers first.',
    sampleData: `// Form inputs always arrive as strings
const subtotalInput = "40";
const shippingInput = "5";`,
    solution: `function orderTotal(subtotal: number, shipping: number) {
  return subtotal + shipping;
}

console.log(orderTotal(Number(subtotalInput), Number(shippingInput)));`,
    output: 45,
    difficulty: 'easy',
    tutorial: `JavaScript never checks what kind of value a variable holds. Values from form inputs are always strings, and \`+\` joins strings instead of adding them, so this runs without any error and gives the wrong answer:

~~~js
function orderTotal(subtotal, shipping) {
  return subtotal + shipping;
}

orderTotal("40", "5"); // "405", not 45
~~~

TypeScript lets you say what a parameter has to be. Add \`: number\` after each one, and passing strings becomes an error *before the code ever runs*:

~~~ts
function orderTotal(subtotal: number, shipping: number) {
  return subtotal + shipping;
}

orderTotal("40", "5");
// Argument of type 'string' is not assignable to parameter of type 'number'.
~~~

The fix is to convert the strings where they come in, with \`Number()\`. In strict mode TypeScript also insists that every parameter has a type: leave one off and you'll see "implicitly has an 'any' type".`,
    docUrl: `${HANDBOOK}/2/everyday-types.html#parameter-type-annotations`
  },
  {
    id: -8,
    question: 'Write a function average(nums) that takes a number[] and returns the mean. Log the average of scores.',
    sampleData: 'const scores = [88, 92, 79, 95, 81];',
    solution: `function average(nums: number[]) {
  return nums.reduce((sum, n) => sum + n, 0) / nums.length;
}

console.log(average(scores));`,
    output: 87,
    difficulty: 'easy',
    tutorial: `In JavaScript nothing stops a list of numbers from picking up a string, and the mistake only shows up later as a strange result:

~~~js
function average(nums) {
  return nums.reduce((sum, n) => sum + n, 0) / nums.length;
}

average([88, "92", 79]); // 296426.33, because "92" got glued on as text
~~~

In TypeScript an array's type is its element type followed by \`[]\`, so \`number[]\` means "an array of numbers". Type the parameter that way and TypeScript rejects that call.

Notice that \`scores\` in the sample data has no annotation. TypeScript *infers* \`number[]\` from its values. You only need to write a type where TypeScript can't work it out, like a parameter, which could be passed anything. Once \`nums\` is typed, \`sum\` and \`n\` inside the callback are known to be numbers, and so is the return value.`,
    docUrl: `${HANDBOOK}/2/everyday-types.html#arrays`
  },
  {
    id: -7,
    question: 'Write a function describe(user) that takes a User and returns a string like "Ana is 31", then log users mapped through it.',
    sampleData: `interface User {
  name: string;
  age: number;
}

const users: User[] = [
  { name: "Ana", age: 31 },
  { name: "Sam", age: 24 },
  { name: "Luis", age: 45 }
];`,
    solution: `function describe(user: User) {
  return \`\${user.name} is \${user.age}\`;
}

console.log(users.map(describe));`,
    output: ['Ana is 31', 'Sam is 24', 'Luis is 45'],
    difficulty: 'easy',
    tutorial: `JavaScript objects have no fixed shape, so a typo in a property name quietly gives you \`undefined\`:

~~~js
const user = { name: "Ana", age: 31 };
console.log(\`\${user.nmae} is \${user.age}\`); // "undefined is 31"
~~~

An \`interface\` names an object's shape once:

~~~ts
interface User {
  name: string;
  age: number;
}
~~~

Anything typed as \`User\` is then checked against it. \`user.nmae\` becomes an error ("Property 'nmae' does not exist on type 'User'. Did you mean 'name'?"), and the editor can suggest the real property names. Type \`describe\`'s parameter as \`User\` to get that checking inside the function.`,
    docUrl: `${HANDBOOK}/2/objects.html`
  },
  {
    id: -6,
    question: 'Write formatId(id: OrderId). Numbers become "#" plus the number padded to 5 digits ("#00042"); strings become "#" plus the string uppercased ("#A7X"). Log orderIds mapped through it.',
    sampleData: `type OrderId = number | string;

const orderIds: OrderId[] = [42, "a7x", 1375, "zz9"];`,
    solution: `function formatId(id: OrderId) {
  if (typeof id === "number") {
    return "#" + String(id).padStart(5, "0");
  }
  return "#" + id.toUpperCase();
}

console.log(orderIds.map(formatId));`,
    output: ['#00042', '#A7X', '#01375', '#ZZ9'],
    difficulty: 'medium',
    tutorial: `Some values can legitimately be more than one type. In JavaScript you have to remember which one you've got, and forgetting crashes at runtime:

~~~js
function formatId(id) {
  return "#" + id.toUpperCase();
}

formatId(42); // TypeError: id.toUpperCase is not a function
~~~

In TypeScript, \`number | string\` (a *union*) means "either one", and TypeScript only lets you do things that are safe for **both**. So \`id.toUpperCase()\` is an error, because numbers don't have it.

To use a string method, check the type first. Inside \`if (typeof id === "number")\`, TypeScript knows \`id\` is a number, and once that branch has returned, only \`string\` is left. This is called *narrowing*.`,
    docUrl: `${HANDBOOK}/2/narrowing.html`
  },
  {
    id: -5,
    question: 'Start at { x: 0, y: 0 } and apply each move in order ("up" is y + 1, "down" is y - 1, "right" is x + 1, "left" is x - 1). Log the final position.',
    sampleData: `type Direction = "up" | "down" | "left" | "right";

const moves: Direction[] = ["up", "up", "right", "down", "right", "right", "up"];`,
    solution: `const position = { x: 0, y: 0 };

for (const move of moves) {
  switch (move) {
    case "up":
      position.y++;
      break;
    case "down":
      position.y--;
      break;
    case "left":
      position.x--;
      break;
    case "right":
      position.x++;
      break;
  }
}

console.log(position);`,
    output: { x: 3, y: 2 },
    difficulty: 'medium',
    tutorial: `When a value should be one of a few fixed strings, JavaScript can't catch a typo. The comparison is just never true:

~~~js
if (move === "rigth") {
  x++; // never runs, and nothing tells you why
}
~~~

TypeScript can use exact strings as types. \`type Direction = "up" | "down" | "left" | "right"\` allows only those four values, so \`moves\` can't contain \`"sideways"\`. Inside a \`switch\` on a \`Direction\`, \`case "rigth":\` is an error, because it can never match.

\`position\` needs no annotation: TypeScript infers \`{ x: number; y: number }\` from its starting value.`,
    docUrl: `${HANDBOOK}/2/everyday-types.html#literal-types`
  },
  {
    id: -4,
    question: "Return each profile's display name: its nickname if it has one, otherwise its name.",
    sampleData: `interface Profile {
  name: string;
  nickname?: string;
}

const profiles: Profile[] = [
  { name: "Katherine", nickname: "Kat" },
  { name: "Omar" },
  { name: "Robert", nickname: "Bobby" },
  { name: "Mei" }
];`,
    solution: `const displayNames = profiles.map(profile => profile.nickname ?? profile.name);
console.log(displayNames);`,
    output: ['Kat', 'Omar', 'Bobby', 'Mei'],
    difficulty: 'easy',
    tutorial: `Some properties are only sometimes there. JavaScript lets you use them as if they always were:

~~~js
const profile = { name: "Omar" };
profile.nickname.toUpperCase(); // TypeError: Cannot read properties of undefined
~~~

In an interface, \`?\` marks a property as optional. \`nickname?: string\` means its type is \`string | undefined\`, and TypeScript makes you handle the missing case before you use it.

The \`??\` operator handles it neatly: \`a ?? b\` gives \`a\`, unless \`a\` is \`null\` or \`undefined\`, in which case it gives \`b\`.`,
    docUrl: `${HANDBOOK}/2/objects.html#optional-properties`
  },
  {
    id: -3,
    question: 'Write a generic function firstMatch<T>(items: T[], test: (item: T) => boolean): T | undefined that returns the first item passing test. Use it to find the first book under 300 pages and log its title.',
    sampleData: `interface Book {
  title: string;
  pages: number;
}

const books: Book[] = [
  { title: "Dune", pages: 412 },
  { title: "Beloved", pages: 324 },
  { title: "Matilda", pages: 240 }
];`,
    solution: `function firstMatch<T>(items: T[], test: (item: T) => boolean): T | undefined {
  for (const item of items) {
    if (test(item)) return item;
  }
  return undefined;
}

const shortBook = firstMatch(books, book => book.pages < 300);
console.log(shortBook?.title);`,
    output: 'Matilda',
    difficulty: 'hard',
    tutorial: `Some functions work with any kind of item. Typing \`items\` as \`Book[]\` would make \`firstMatch\` useless for anything else, and \`any[]\` would switch type checking off entirely.

A *generic* type parameter solves this. \`<T>\` is a placeholder for whatever type the caller uses:

~~~ts
function firstMatch<T>(items: T[], test: (item: T) => boolean): T | undefined
~~~

Call it with \`books\` and \`T\` becomes \`Book\`, so \`book.pages\` type-checks inside the callback. \`(item: T) => boolean\` is a *function type*: a function that takes a \`T\` and returns a boolean.

The return type is \`T | undefined\` because nothing might match. That makes \`shortBook.title\` an error, while \`shortBook?.title\` is fine.`,
    docUrl: `${HANDBOOK}/2/generics.html`
  },
  {
    id: -2,
    question: 'Count how many of each fruit is in the order, as a Record<Fruit, number>. Every Fruit has to appear as a key, even one that was never ordered.',
    sampleData: `type Fruit = "apple" | "banana" | "cherry";

const order: Fruit[] = ["apple", "cherry", "apple", "cherry", "apple"];`,
    solution: `const counts: Record<Fruit, number> = { apple: 0, banana: 0, cherry: 0 };

for (const fruit of order) {
  counts[fruit]++;
}

console.log(counts);`,
    output: { apple: 3, banana: 0, cherry: 2 },
    difficulty: 'medium',
    tutorial: `Counting things into an object is common in JavaScript, and it's easy to forget a key that never came up:

~~~js
const counts = {};
for (const fruit of order) {
  counts[fruit] = (counts[fruit] || 0) + 1;
}
counts.banana; // undefined, not 0
~~~

\`Record<Keys, Value>\` is an object type with exactly those keys, each holding a \`Value\`. With \`Record<Fruit, number>\`, TypeScript requires all three fruits in the starting object: leave \`banana\` out and it's an error.

That guarantee is also why \`counts[fruit]++\` is safe without first checking that the key exists.`,
    docUrl: `${HANDBOOK}/utility-types.html#recordkeys-type`
  },
  {
    id: -1,
    question: "Write area(shape: Shape) using a switch on shape.kind, then log each shape's area rounded to 2 decimal places.",
    sampleData: `type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number }
  | { kind: "triangle"; base: number; height: number };

const shapes: Shape[] = [
  { kind: "circle", radius: 2 },
  { kind: "rectangle", width: 3, height: 4 },
  { kind: "triangle", base: 6, height: 5 }
];`,
    solution: `function area(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "triangle":
      return (shape.base * shape.height) / 2;
  }
}

console.log(shapes.map(shape => Number(area(shape).toFixed(2))));`,
    output: [12.57, 12, 15],
    difficulty: 'hard',
    tutorial: `Objects that come in several shapes usually carry a field saying which shape they are. JavaScript can't check that you're reading the right fields for that shape:

~~~js
if (shape.kind === "circle") {
  return shape.width * shape.height; // circles have no width: NaN
}
~~~

In TypeScript, \`Shape\` is a union of three object types, each with its own literal \`kind\`. This is called a *discriminated union*. Checking \`shape.kind\` narrows to that member: inside \`case "circle":\`, \`shape.radius\` exists and \`shape.width\` is an error.

Because the switch covers every kind, TypeScript knows \`area\` always returns a number, so no \`default\` is needed.`,
    docUrl: `${HANDBOOK}/2/narrowing.html#discriminated-unions`
  },
  {
    id: 0,
    question: 'Rows arrive as unknown. Write a type guard isProduct(value: unknown): value is Product that checks for a non-null object with a string name and a number price, use it to keep only the valid rows, and log their names.',
    sampleData: `interface Product {
  name: string;
  price: number;
}

const rows: unknown[] = [
  { name: "Lamp", price: 40 },
  "corrupted row",
  { name: "Rug", price: 120 },
  null,
  { name: "Mug" },
  { name: "Desk", price: 250 }
];`,
    solution: `function isProduct(value: unknown): value is Product {
  return (
    typeof value === "object" &&
    value !== null &&
    "name" in value &&
    typeof value.name === "string" &&
    "price" in value &&
    typeof value.price === "number"
  );
}

const products = rows.filter(isProduct);
console.log(products.map(product => product.name));`,
    output: ['Lamp', 'Rug', 'Desk'],
    difficulty: 'hard',
    hint: {
      text: 'unknown means you have to prove what a value is before using it. Each check narrows it a little, but "price" in value only proves the key exists, not that the whole thing is a Product. Returning value is Product (a type predicate) is your promise that the checks add up to one, and it lets filter turn unknown[] into Product[].',
      mdnUrl: `${HANDBOOK}/2/narrowing.html#using-type-predicates`
    }
  }
].map((exercise) => ({ ...exercise, title: `Intro Problem ${exercise.id}`, functions: ['types'], intro: true }));

// JavaScript's problems that have been ported (see the header comment), with
// their TypeScript overrides applied.
const portedExercises = javascript.exercises
  .filter((exercise) => exercise.ts)
  .map(({ ts, ...exercise }) => ({ ...exercise, ...ts }));

export const exercises = [...introExercises, ...portedExercises];

// Only tags some ported problem actually uses, so a filter pill never
// selects an empty list while the port is still in progress. 'types' leads
// because the intro problems come first in the carousel.
function usedTags(tags) {
  return tags.filter((tag) => exercises.some((exercise) => javascript.exerciseHasFunction(exercise, tag)));
}

export const CORE_FUNCTIONS = ['types', ...usedTags(javascript.CORE_FUNCTIONS)];
export const SECONDARY_FUNCTIONS = usedTags(javascript.SECONDARY_FUNCTIONS);
export const KNOWN_FUNCTIONS = [...CORE_FUNCTIONS, ...SECONDARY_FUNCTIONS];
export const DIFFICULTIES = javascript.DIFFICULTIES;
export const exerciseHasFunction = javascript.exerciseHasFunction;

// Most links are MDN's (the ported problems' tags are JavaScript's), but the
// intro set's links go to the TypeScript Handbook, so the name shown next to
// a link is picked per URL rather than fixed for the whole language.
export const DOC_SITE_NAME = 'MDN and TypeScript Handbook';

export function docSiteNameFor(url) {
  return url?.startsWith('https://www.typescriptlang.org/') ? 'TypeScript Handbook' : 'MDN';
}

export const KNOWN_FUNCTION_DOC_LINKS = {
  ...javascript.KNOWN_FUNCTION_DOC_LINKS,
  types: `${HANDBOOK}/2/everyday-types.html`
};
