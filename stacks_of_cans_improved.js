console.log("StAcKs oF CaNs!!! (improved)");

// Count how many steps it takes to reduce a pile to the second highest stack
// by removing the difference from the highest stack.
//
// Instead of repeatedly rebuilding a Set, re-sorting, and rescanning the
// whole array each round, we do it in one pass:
//   1. Count how many cans sit at each height (one O(n) pass).
//   2. Sort the distinct heights once, descending (O(n log n)).
//   3. Walk down that sorted list. At each step down from one height to the
//      next, every can that's currently "at or above" the level we're
//      leaving gets moved down - that's how many changes happen in that step.

let input = [5, 5, 1, 2];

let countCansAtEachHeight = arr => {
  let counts = new Map();
  arr.forEach(height => {
    counts.set(height, (counts.get(height) || 0) + 1);
  });
  return counts;
};

let heightCounts = countCansAtEachHeight(input);

// distinct heights, sorted tallest to shortest
let sortedHeights = [...heightCounts.keys()].sort((a, b) => b - a);

let changeCount = 0;
let cansAtOrAboveCurrentLevel = 0;

for (let i = 0; i < sortedHeights.length - 1; i++) {
  let currentHeight = sortedHeights[i];
  let nextHeight = sortedHeights[i + 1];

  // add the cans sitting exactly at currentHeight to our running total of
  // "cans that need to drop down to nextHeight"
  cansAtOrAboveCurrentLevel += heightCounts.get(currentHeight);

  // every one of those cans changes height in this step
  changeCount += cansAtOrAboveCurrentLevel;
}

let lowestHeight = sortedHeights[sortedHeights.length - 1];

// the final state: everything settles at the lowest height
let result = input.map(() => lowestHeight);

console.log("Lowest Ht: ", lowestHeight);
console.log("inpUT! ", result);
console.log("changeCount: ", changeCount);
