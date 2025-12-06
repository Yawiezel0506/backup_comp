// 1)

const arrFromNum = (num) => {
  let result = [];
  for (let i = 1; i <= num; i++) {
    result.push(i);
  }
  return result;
};

// console.log(arrFromNum(10));

// 2)

const numsFromUser = (num) => {
  let total = 0;
  for (let i = 0; i < num; i++) {
    const userInput = Number(prompt("Enter a number:"));
    total += userInput;
  }
  return total;
};

// console.log(numsFromUser(5));

// 3)

const sortUp = (arr) => {
  return arr.sort((a, b) => a - b);
};
// console.log(sortUp([4,89,-67,2]))

// 3)

const sortDown = (arr) => {
  return arr.sort((a, b) => b - a);
};
// console.log(sortDown([4,89,-67,2]))

const cutDup = (arr) => {
  let newArr = [];
  arr.forEach((num) => {
    newArr.indexOf(num) === -1 && newArr.push(num);
  });
  return newArr;
};

// console.log(cutDup([1, 1, 1, 2, 2, 2, 3, 3, 4, 4]));

const cutDupB = (arr1, arr2) => {
    return cutDup([...cutDup(arr1), ...cutDup(arr2)])
};

console.log(cutDupB([1,1,2,2,3,3,4,4], [1,1,2,2,3,3,4,4]));
