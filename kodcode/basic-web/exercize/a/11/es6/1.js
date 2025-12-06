let numbers = [3, 5, 33, 6, 7, 3, 4, 545, 65, 7, 8, 76];

// a

const sumation = numbers.reduce((prevNum, currNum) => {
  return prevNum + currNum;
}, 0);

// console.log(sumation);

// b

const multiply = numbers.reduce((prevNum, currNum) => {
  return prevNum * currNum;
}, 1);

// console.log(multiply);

// c

const ave = sumation / numbers.length;

// console.log(ave);

// d

let temp = numbers[0];
numbers[0] = numbers[numbers.length - 1];
numbers[numbers.length - 1] = temp;
// console.log(numbers);

// e f

let copyNumbers = [...numbers];
copyNumbers.reverse()
// console.log(copyNumbers);

// g

// console.log(Math.max(...numbers));

// h

let evens = numbers.filter(num => num % 2 == 0)
// console.log(evens);