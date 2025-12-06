const people = [
  {
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
  },
  {
    id: 2,
    name: "Alice",
    age: 30,
    address: { city: "New York", street: "Broadway" },
    children: [
      {
        name: "Tom",
        age: 5,
      },
    ],
  },
  {
    id: 3,
    name: "Bob",
    age: 22,
    address: { city: "Los Angeles", street: "Sunset Blvd" },
    children: [],
  },
  {
    id: 4,
    name: "Mary",
    age: 28,
    address: { city: "Paris", street: "Champs-Élysées" },
    children: [
      {
        name: "Sophie",
        age: 2,
      },
      {
        name: "Michael",
        age: 1,
      },
    ],
  },
  {
    id: 5,
    name: "Ella",
    age: 27,
    address: { city: "Berlin", street: "Friedrichstraße" },
    children: [
      {
        name: "Liam",
        age: 4,
      },
      {
        name: "Olivia",
        age: 3,
      },
      {
        name: "Emma",
        age: 1,
      },
    ],
  },
];

// 1)

const olderPersonId = (people) => {
  const oldPerson = people.reduce((prevPer, curPer) => {
    return prevPer.age > curPer.age ? prevPer : curPer;
  });
  return oldPerson ? oldPerson.id : null;
};

console.log(olderPersonId(people));

// 2)

const mutchChildrenId = (people) => {
  const mutchChildren = people.reduce((prevPer, curPer) => {
    return prevPer.children.length > curPer.children.length ? prevPer : curPer;
  });
  return mutchChildren ? mutchChildren.id : null;
};

console.log(mutchChildrenId(people));

// 3)

const smallestChildId = (people) => {
  const minChild = people.reduce((prevPer, curPer) => {
    const prevMinChildAge = Math.min(
      ...prevPer.children.map((child) => child.age)
    );
    const currentMinChildAge = Math.min(
      ...curPer.children.map((child) => child.age)
    );
    return prevMinChildAge <= currentMinChildAge ? prevPer : curPer;
  });
  return minChild ? minChild.id : null;
};

console.log(smallestChildId(people));

// 4)

const findByID = (people, id) => {
  const person = people.find((per) => per.id === id);
  return person;
};

console.log(findByID(people, 1));

// 5)

const countByCity = (people, city) => {
  let counter = 0;
  people.forEach((person) => {
    if (person.address.city === city) counter += 1 + person.children.length;
  });
  return counter;
};

console.log(countByCity(people, "Paris"));

// 6)

const bigFamilys = (people, num) => {
  let counter = 0;
  people.forEach((person) => {
    person.children.length > num && counter++;
  });
  return counter;
};

console.log(bigFamilys(people, 2));

// 7)

const getAllChildren = (people) => {
  let childrenArr = [];
  people.forEach((person) => {
    childrenArr.push(...person.children);
  });
  return childrenArr;
};

console.log(getAllChildren(people));

// 8)

const getSortChildren = (people) => {
  const children = getAllChildren(people);
  children.sort((childA, childB) => childA.age - childB.age);
  return children;
};

console.log(getSortChildren(people));

// 9)

const sortArrByNoOfChildrens = (people) => {
  let childrenArr = [];

  for (let i in people) {
    childrenArr.push({ index: i, children: people[i].children.length });
  }

  childrenArr.sort((childA, childB) => childB.children - childA.children);

  const sortedPeople = childrenArr.map((child) => {
    const originalPerson = { ...people[child.index] };
    const copiedChildren = originalPerson.children.map((child) => ({
      ...child,
    }));
    return {
      ...originalPerson,
      children: copiedChildren,
    };
  });

  return sortedPeople;
};

console.log(JSON.stringify(sortArrByNoOfChildrens(people), null, 2));
