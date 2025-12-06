const mat = [
  [2, 3, 4],
  [4, 6, 8],
  [10, 13, 15],
];

// a

mat.forEach((arr) => {
  console.log(arr.toString());
});

// b
mat.forEach((arr) => {
  console.log(arr.length);
});

// c

const lenSum = mat.reduce((prev, curr) => prev + curr.length, 0);
console.log(`The sum of the lengths is ${lenSum}`);

// d

mat.forEach((arr) => {
  arr.forEach((num) => console.log(num));
});

// e

mat.forEach((arr) => {
  arr.forEach((num) => {
    if (num > 5) {
      console.log(num);
    }
  });
});

// f

const sum = mat.reduce((prev, curr) => {
  let innerSum = curr.reduce((prevNum, currNum) => {
    return prevNum + currNum;
  }, 0);
  return prev + innerSum;
}, 0);

console.log(sum);
