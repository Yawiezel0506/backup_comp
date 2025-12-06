// 1)

person = {
  id: 1,
  name: "John",
  age: 25,
  address: { city: "London", street: "Abbey Road" },
  children: [
    {
      name: "John Junior",
      age: 3,
    },
    {
      name: "Jane Doe",
      age: 4,
    },
  ],
};

const printDetails = (obj) => {
  console.log(`Name is ${obj.name}, 
    \n Age is ${obj.age}
    \n City is ${obj.address.city}
    \n Street is ${obj.address.street}
    \n No of children: ${obj.children.length}
    \n Child 1: name ${obj.children[0].name}, age: ${obj.children[0].age}
    \n Child 2: name ${obj.children[1].name}, age: ${obj.children[1].age}
    `);
};

// printDetails(person);

const getBigChild = (obj) => {
  let { children } = obj;
  let maxAge = 0;
  let maxChild = null;

  children.forEach((child) => {
    if (child.age > maxAge) {
      maxAge = child.age;
      maxChild = child;
    }
  });

  maxChild && console.log(maxChild.name);
};

// getBigChild(person);

const getSmallChild = (obj) => {
  const { children } = obj;
  const minChild = children.reduce((prevChild, currentChild) =>
    prevChild.age < currentChild.age ? prevChild : currentChild
  );
  console.log(minChild.name);
};

getSmallChild(person);

const hasTwins = (person) => {
  const { children } = person;
  return children.some((child, index) => {
    const twinsExist = children.some((otherChild, otherIndex) => {
      return index !== otherIndex && child.age === otherChild.age;
    });
    return twinsExist;
  });
};

console.log(hasTwins(person));
