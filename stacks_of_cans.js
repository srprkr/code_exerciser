console.log("StAcKs oF CaNs!!!");

// Count how many steps it takes to reduce a pile to the second highest stack but removing the difference from the highest stack.

let input = [5, 5, 1, 2];
let secondHighest;
let lowestHeight;

let adjustSecondHeight = arr => {
  // uniq cols
  let uniqueHeightsSet = new Set(arr);

  // get unique heights
  let uniqueHeightsArr = [...uniqueHeightsSet];
  uniqueHeightsArr.sort((a, b) => b - a)

  // get second highest stack
  secondHighest = uniqueHeightsArr[1];

  // get lowest stack (for stopping).
  lowestHeight = uniqueHeightsArr[uniqueHeightsArr.length - 1];

  // expose how many distinct heights remain
  return uniqueHeightsArr.length;
}

let uniqueCount = adjustSecondHeight(input);
console.log("Lowest Ht: ", lowestHeight);

let changeCount = 0;

let equalize_heights = (arr) => {
  arr.map((value, index) => {

  // count cols above secondHighest. Add to count.
    // track count - update input arr for next round
    if (value > secondHighest) {
      changeCount += 1;
      arr[index] = secondHighest;
    }     
  });
};

while (uniqueCount > 1) {
  equalize_heights(input);
  uniqueCount = adjustSecondHeight(input);
}

console.log("inpUT! ", input);
console.log("changeCount: ", changeCount);