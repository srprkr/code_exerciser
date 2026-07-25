console.log("Stack Leveling Practice!!!");

// 1. Robin Hood redistribution
// Given an array of candy counts, count how many single-candy moves it takes
// (take one candy from the kid with the most, give one to the kid with the
// least) until every kid has the same amount, or as close as possible if it
// doesn't divide evenly.

let input1 = [8, 2, 5, 1];

let robinHoodMoves = arr => {
  let moves = 0;
  let total = arr.reduce((sum, val) => sum + val, 0);
  let target = Math.floor(total / arr.length);

  while (true) {
    let maxIndex = arr.indexOf(Math.max(...arr));
    let minIndex = arr.indexOf(Math.min(...arr));

    if (arr[maxIndex] <= target && arr[minIndex] >= target) break;

    arr[maxIndex] -= 1;
    arr[minIndex] += 1;
    moves += 1;
  }

  return moves;
};

let moveCount = robinHoodMoves(input1);

console.log("1. Result: ", input1);
console.log("1. moveCount: ", moveCount);

// 2. Trapping rain water
// Given an array of wall heights, figure out how much water would be
// trapped above each position after it rains (water at a spot is limited by
// the shorter of the tallest wall to its left and the tallest wall to its
// right). Return the total amount of trapped water.

let input2 = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];

let trappedWater = arr => {
  let total = 0;

  for (let i = 0; i < arr.length; i++) {
    let leftMax = Math.max(...arr.slice(0, i + 1));
    let rightMax = Math.max(...arr.slice(i));
    let waterHere = Math.min(leftMax, rightMax) - arr[i];
    total += waterHere;
  }

  return total;
};

let waterTotal = trappedWater(input2);

console.log("2. Input: ", input2);
console.log("2. waterTotal: ", waterTotal);
