let strArr = ["Yonathan", "Simcha", "Wiesel"];

// 1)

const joinA = (arr) => {
  return arr.join(" ");
};

// console.log(joinA(strArr));

// 2)

const joinB = (arr) => {
  return arr.join();
};

// console.log(joinB(strArr));

const sumChars = (arr) => {
  let total = 0;
  arr.forEach((word) => {
    total += word.length;
  });
  return total;
};

// console.log(sumChars(strArr));

// 4)

const arrToUpper = (arr) => {
  let upperArr = [];
  arr.forEach((word) => {
    upperArr.push(word.toUpperCase());
  });
  return upperArr;
};

// console.log(arrToUpper(strArr));

// 5)

const bigThanSix = (arr) => {
  let longWordArr = [];
  arr.forEach((word) => {
    word.length >= 6 && longWordArr.push(word);
  });
  return longWordArr;
};

// console.log(bigThanSix(strArr));

// 6)

const longWord = (arr) => {
  let longWordIndex = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i + 1].length > arr[i].length) {
      longWordIndex = i + 1;
    }
  }
  return arr[longWordIndex];
};

// console.log(longWord(strArr));

// 7)

const lenFourWords =(arr)=> {
    let total = 0;
    arr.forEach(word => {
        word.length == 4 && total++;
    });
    return total;
}

console.log(lenFourWords(strArr));
