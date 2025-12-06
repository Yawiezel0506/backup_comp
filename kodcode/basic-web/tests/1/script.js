import { users } from "./data.js";

const mainPeople = document.querySelector("#users");


function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    
    return color;
  }



const createCard = (user) => {
  const colDiv = document.createElement("div");
  colDiv.classList.add("col-lg-3", "col-md-6", "mb-4", "mb-lg-0");

  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card", "shadow-sm", "border-0", "rounded");

  const cardBodyDiv = document.createElement("div");
  cardBodyDiv.classList.add("card-body", "p-0");

  const image = document.createElement("img");
  image.setAttribute("src", user.picture.large);
  image.setAttribute("alt", `picture of user ${user.id}`);
  image.classList.add("w-100", "card-img-top");

  const infoDiv = document.createElement("div");
  infoDiv.classList.add("p-4");

  const nameHeading = document.createElement("h5");
  nameHeading.classList.add("mb-0");
  const { title, first, last } = user.name;
  nameHeading.textContent = `${title} ${first} ${last}`;

  const ageParagraph = document.createElement("p");
  ageParagraph.classList.add("small", "text-muted");
  ageParagraph.textContent = `${user.dob.age} years old`;

  const genderParagraph = document.createElement("p");
  genderParagraph.classList.add("small", "text-muted");
  genderParagraph.textContent = `${user.gender} years old`;

  const emailParagraph = document.createElement("p");
  emailParagraph.classList.add("small", "text-muted");
  emailParagraph.textContent = `Email: ${user.email} years old`;

  const addressParagraph = document.createElement("p");
  addressParagraph.classList.add("small", "text-muted");
  const {
    country,
    state,
    city,
    street: { number, name },
  } = user.address;
  addressParagraph.textContent = `Address: ${name} ${number}, ${city}, ${state}, ${country}`;

  const todosContainer = document.createElement("div");
  todosContainer.classList.add("p-4");
  todosContainer.style.display = "none";

  if (user.todos.length > 0) {
    user.todos.forEach((task) => {
      const taskParagraph = document.createElement("p");
      taskParagraph.classList.add("small", "text-muted");
      taskParagraph.textContent = `${task.id}: ${task.title}`;
      todosContainer.appendChild(taskParagraph);
    });
  } else {
    const taskParagraph = document.createElement("p");
    taskParagraph.classList.add("small", "text-muted");
    taskParagraph.textContent = `No tasks found for this user`;
    todosContainer.appendChild(taskParagraph);
  }

  const showHideInfo = document.createElement("button");
  showHideInfo.classList.add("btn", "btn-info");
  showHideInfo.textContent = "Show/Hide more info";
  
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("btn", "btn-danger", "mt-2");
  deleteBtn.textContent = "Delete user";

  const styleBtn = document.createElement("button");
  styleBtn.classList.add("btn", "btn-primary", "mt-2");
  styleBtn.textContent = "change backGround";

  showHideInfo.addEventListener("click", () => {
    if (todosContainer.style.display === "none") {
      todosContainer.style.display = "block";
      show = true;
    } else {
      todosContainer.style.display = "none";
      show = false;
    }
  });

  deleteBtn.addEventListener("click", ()=> {
    colDiv.remove();
  })

  styleBtn.addEventListener("click", ()=> {
    colDiv.style.background = getRandomColor();
  })

  infoDiv.appendChild(nameHeading);
  infoDiv.appendChild(ageParagraph);
  infoDiv.appendChild(genderParagraph);
  infoDiv.appendChild(emailParagraph);
  infoDiv.appendChild(addressParagraph);
  infoDiv.appendChild(todosContainer);
  infoDiv.appendChild(showHideInfo);
  infoDiv.appendChild(deleteBtn);
  infoDiv.appendChild(styleBtn);

  cardBodyDiv.appendChild(image);
  cardBodyDiv.appendChild(infoDiv);

  cardDiv.appendChild(cardBodyDiv);

  colDiv.appendChild(cardDiv);

  return colDiv;
};

const init = () => {
  users.map((user) => {
    const cardElement = createCard(user);
    mainPeople.appendChild(cardElement);
  });
};

init();
