// 1

const signIn = () => {
  const successPromise = new Promise((resolve, reject) => {
    resolve("Success!");
  });
  return successPromise;
};

// signIn().then((res) => console.log(res));

// 2

const fullName = (fn, ln) => {
  setTimeout(() => {
    console.log(`${fn} ${ln}`);
  }, 1000);
};

// fullName("Yonathan", "Wiesel");

// 3

const addFive = (num) => {
  const res = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num + 5);
    }, 500);
  });
  return res;
};

const multiplyByTwo = (num) => {
  const res = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num * 2);
    }, 500);
  });
  return res;
};

const subtractTen = (num) => {
  const res = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num - 10);
    }, 500);
  });
  return res;
};

let num = 5;

// addFive(num)
// .then(num => multiplyByTwo(num))
// .then(num => subtractTen(num))
// .then(num => console.log(num))

// 4

const divide = (a, b) => {
  const res = new Promise((resolve, reject) => {
    if (b === 0) {
      reject("can't divided by zero!");
    } else {
      resolve(a / b);
    }
  });
  return res;
};


console.log(divide(5, 2));
console.log(divide(5, 2).then((v) => console.log(v)));
console.log(
    divide(5, 0)
    .then((v) => console.log(v))
    .catch((e) => console.log(e.message))
    );
    // divide(4,0)
    // .then(num => console.log(num))
    // .catch(err => console.log(err))
    
    // 5
    
    const fullName2 = async (fn, ln) => {
        const res = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${fn} ${ln}`);
    }, 1000);
});
return res;
};

// fullName2("avisha", "perez")
// .then(res => console.log(res));

const printNum = async () => {
    num = await addFive(num);
    num = await multiplyByTwo(num);
    num = await subtractTen(num);
    console.log(num);
};
// printNum();

// 6

const printDivision = async () => {
    try {
        let result = await divide(3789, 5);
        if (!result) {
            throw "Error";
        } else {
            console.log("Result is", result);
        }
    } catch (e) {
        console.log(`Exception caught:`, e);
    }
};

// printDivision();

const divide2 = async (a, b) => {
  try {
    if (b === 0) {
        throw new Error("hhh");
    }
    return a / b;
  } catch (err) {
    return err.message;
  }
};

// console.log(divide2(3,4));
// console.log(divide2(3,4).then(v=> console.log(v)));
// console.log(divide2(3,0).then(v=> console.log(v)));
