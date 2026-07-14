console.log("StAcKs oF CaNs!!!");

// Count how many steps it takes to reduce a pile to the second highest stack but removing the difference from the highest stack.

let input = [5, 1, 2];


let adjustSecondHeight = arr => {
  
  // uniq cols
  let uniqueHeightsSet = new Set(arr);

  console.log('uniqHts: ', uniqueHeightsSet);

  // track count
  // update input arr for next round

  // get unique heights
  let uniqueHeightsArr = [...uniqueHeightsSet];
  uniqueHeightsArr.sort((a, b) => b - a)

  // get second highest stack
  let secondHighest = uniqueHeightsArr[1];
  console.log(secondHighest);

}

adjustSecondHeight(input);

// get lowest stack (for stopping).
let lowestHeight = uniqueHeightsArr[uniqueHeightsArr.length - 1];
console.log("Lowest Ht: ", lowestHeight);

let changeCount = 0;

let equalize_heights = (arr) => {
  arr.map((value, index) => {

    // count cols above secondHighest. Add to count.
    if (value > secondHighest) {
      changeCount += 1;
      arr[index] = secondHighest;
    }     
  })
}



while (secondHighest > lowestHeight) {
  equalize_heights(input);
  adjustSecondHeight(input);
}

console.log("inpUT! ", input);
console.log("changeCount: ", changeCount);






// output should be 3