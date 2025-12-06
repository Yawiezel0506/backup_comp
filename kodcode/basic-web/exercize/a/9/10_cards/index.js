const people = [
  {
    id: 1,
    name: "John Doe",
    age: 30,
    address: {
      street: "123 Main St",
      city: "New York",
      country: "USA",
    },
    children: [
      {
        name: "Emily",
        age: 5,
      },
      {
        name: "James",
        age: 8,
      },
    ],
    picture: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 28,
    address: {
      street: "456 Park Ave",
      city: "Los Angeles",
      country: "USA",
    },
    children: [
      {
        name: "Sophia",
        age: 3,
      },
    ],
    picture: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 3,
    name: "Michael Johnson",
    age: 45,
    address: {
      street: "789 Oak Rd",
      city: "Chicago",
      country: "USA",
    },
    children: [
      {
        name: "Oliver",
        age: 12,
      },
      {
        name: "Emma",
        age: 9,
      },
      {
        name: "Ava",
        age: 7,
      },
    ],
    picture: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 4,
    name: "Sarah Lee",
    age: 35,
    address: {
      street: "101 Elm St",
      city: "Houston",
      country: "USA",
    },
    children: [],
    picture: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: 5,
    name: "Robert Kim",
    age: 38,
    address: {
      street: "777 Maple Ave",
      city: "San Francisco",
      country: "USA",
    },
    children: [
      {
        name: "Liam",
        age: 6,
      },
    ],
    picture: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    id: 6,
    name: "Emily Chen",
    age: 29,
    address: {
      street: "555 Pine St",
      city: "Seattle",
      country: "USA",
    },
    children: [
      {
        name: "Ella",
        age: 2,
      },
      {
        name: "Logan",
        age: 4,
      },
    ],
    picture: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    id: 7,
    name: "David Wilson",
    age: 33,
    address: {
      street: "222 Cedar Rd",
      city: "Boston",
      country: "USA",
    },
    children: [
      {
        name: "Lucas",
        age: 10,
      },
    ],
    picture: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    id: 8,
    name: "Sophie Martin",
    age: 27,
    address: {
      street: "444 Birch Ave",
      city: "Miami",
      country: "USA",
    },
    children: [
      {
        name: "Mia",
        age: 1,
      },
    ],
    picture: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    id: 9,
    name: "Matthew Clark",
    age: 42,
    address: {
      street: "888 Oak St",
      city: "Denver",
      country: "USA",
    },
    children: [
      {
        name: "Noah",
        age: 11,
      },
      {
        name: "Ethan",
        age: 13,
      },
    ],
    picture: "https://randomuser.me/api/portraits/men/9.jpg",
  },
  {
    id: 10,
    name: "Isabella Rodriguez",
    age: 31,
    address: {
      street: "333 Pine Ave",
      city: "Phoenix",
      country: "USA",
    },
    children: [
      {
        name: "Aiden",
        age: 7,
      },
      {
        name: "Sophia",
        age: 9,
      },
      {
        name: "Olivia",
        age: 4,
      },
    ],
    picture: "https://randomuser.me/api/portraits/women/10.jpg",
  },
];

const mainPeople = document.querySelector("#people");

const createCard = (person) => {
  const colDiv = document.createElement("div");
  colDiv.classList.add("col-lg-3", "col-md-6", "mb-4", "mb-lg-0");

  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card", "shadow-sm", "border-0", "rounded");

  const cardBodyDiv = document.createElement("div");
  cardBodyDiv.classList.add("card-body", "p-0");

  const image = document.createElement("img");
  image.setAttribute("src", person.picture);
  image.setAttribute("alt", "");
  image.classList.add("w-100", "card-img-top");

  const infoDiv = document.createElement("div");
  infoDiv.classList.add("p-4");

  const nameHeading = document.createElement("h5");
  nameHeading.classList.add("mb-0");
  nameHeading.textContent = person.name;

  const ageParagraph = document.createElement("p");
  ageParagraph.classList.add("small", "text-muted");
  ageParagraph.textContent = `${person.age} years old`;

  const addressParagraph = document.createElement("p");
  addressParagraph.classList.add("small", "text-muted");
  addressParagraph.textContent = `Address: ${person.address.street}, ${person.address.city}, ${person.address.country}`;

  const childrenParagraph = document.createElement("p");
  childrenParagraph.classList.add("small", "text-muted");
  childrenParagraph.textContent = `Children: ${person.children.length}`;

  infoDiv.appendChild(nameHeading);
  infoDiv.appendChild(ageParagraph);
  infoDiv.appendChild(addressParagraph);
  infoDiv.appendChild(childrenParagraph);

  cardBodyDiv.appendChild(image);
  cardBodyDiv.appendChild(infoDiv);

  cardDiv.appendChild(cardBodyDiv);

  colDiv.appendChild(cardDiv);

  return colDiv;
};

people.map((person) => {
  const cardElement = createCard(person);
  mainPeople.appendChild(cardElement);
});
