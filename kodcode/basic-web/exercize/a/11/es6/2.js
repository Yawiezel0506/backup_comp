let strings = ["My", "Name", "Is", "Jonathan", "Simcha", "wiesel"];

// a

let joined = strings.join(" ");
// console.log(joined);

// b

let joined2 = strings.join(", ")

// c

let totalLatters = 0;
strings.forEach(str => {
    totalLatters += str.length
});

// console.log(totalLatters);

// d

let copyUpperStr = strings.map(str => str.toUpperCase())
// console.log(copyStr)

// e

let copyLongStr = strings.filter(str => str.length >= 6);
// console.log(copyLongStr);

// f

const lengthArr = strings.map(word => word.length);
const longest = Math.max(...lengthArr);
const maxWord = strings.find(word => word.length === longest);
// console.log(maxWord);

// g

const filterArr = strings.filter(word => word.length >= 4)

console.log(filterArr.length);




