function sum(a, b) {
  return a + b;
}

function duplicate(a, b) {
  return a * b;
}

function divisior(a, b) {
  return a / b;
}

function maxNum(a, b) {
  return Math.max(a, b);
}

function isEven(a) {
  return a % 2 == 0;
}

function triangle(a, b) {
  return (a * b) / 2;
}

function circleArea(a) {
  return a ** 2 * Math.PI;
}

function circle(a) {
  return a * 2 * Math.PI;
}

function longStr(a, b) {
    if (a.length >= b.length) {
        return a;
    }
    return b;
}

function firstUpper(a) {
    return a[0].toUpperCase() + a.slice(1).toLowerCase();
}

console.log(sum(5, 3));
console.log(duplicate(5, 3));
console.log(divisior(5, 3));
console.log(maxNum(5, 3));
console.log(isEven(5));
console.log(triangle(5, 3));
console.log(circleArea(5));
console.log(circle(5));
console.log(longStr("hello", "yonathan"));
console.log(firstUpper("yonathan"));

