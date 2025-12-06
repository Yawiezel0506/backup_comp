const mat = [
  [2, 3, 4],
  [4, 6, 8],
  [10, 13, 15],
];

// 1)

mat.forEach((arr) => {
//   console.log(arr);
});

// 2)

mat.forEach((arr) => {
//   console.log(arr.length);
});

// 3)

const sumArrays = (arr) => {
    const initialValue = 0;
    const sumIntsArr = arr.reduce(
      (accumulator, currentValue) => accumulator + currentValue.length,
      initialValue
    );
    return sumIntsArr;
};

// console.log(sumArrays(mat));

// 4)

mat.forEach(arr => {
    arr.forEach(num => {
        // console.log(num);
    });
});

// 5)

mat.forEach(arr => {
    arr.forEach(num => {
        // num > 5 && console.log(num);
    });
});

// 6)

const sumNums =(arr)=> {
    let totalSum=0 ;
    arr.forEach(innerArr => {
        innerArr.forEach(num => {
            totalSum += num;
        });
    });
    return totalSum;
}

console.log(sumNums(mat));

