let intsArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// 1)

const sumOfArr = (arr) => {
  const initialValue = 0;
  const sumIntsArr = arr.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );
  return sumIntsArr;
};

// console.log(sumOfArr(intsArr));

// 2)

const sumMultiplication = (arr) => {
  const initialValue = 1;
  const sumMultiplyArr = arr.reduce(
    (accumulator, currentValue) => accumulator * currentValue,
    initialValue
  );
  return sumMultiplyArr;
};

// console.log(sumMultiplication(intsArr));

// 3)

const aveNum = (arr) => {
  return sumOfArr(arr) / arr.length;
};

// console.log(aveNum(intsArr));

// 4)

const switchSide = (arr) => {
  let start = arr.shift();
  let end = arr.pop();
  arr.unshift(end);
  arr.push(start);
  return arr;
};

// console.log(switchSide(intsArr));

// 5)

const copyArr = (arr) => {
  return [...arr];
};

let newArr = copyArr(intsArr);
newArr[0] = 10;
// console.log(intsArr[0], newArr[0]);

// 6)

const flipArr = (arr) => {
  for (let i = 0; i < Math.floor(arr.length / 2); i++) {
    let temp = arr[i];
    arr[i] = arr[(arr.length - 1) - i]; 
    arr[(arr.length - 1) - i] = temp;
  }
  return arr;
};

// console.log(flipArr(intsArr));

// 7)

const maxNum =(arr)=> {
    let max = arr[0];
    arr.forEach(num => {
        max = Math.max(max, num)
    });
    return max;
}

// console.log(maxNum(intsArr));

// 8)

const evenNums =(arr)=> {
    const result=[];
    arr.forEach(num => {
        num % 2 == 0 && result.push(num);
    });
    return result;
}

// console.log(evenNums(intsArr));


