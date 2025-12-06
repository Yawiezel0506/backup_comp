import { questions } from "./db.js";

let questionIndex = 0;

const mainContainer = document.querySelector("#mainContainer");

let answers = [];

let correctAnswers = 0;

const createQuestionTemplate = (currQuestion) => {
  const { question, choices, correctAnswer } = currQuestion;

  const container = document.createElement("div");
  container.classList.add("card", "mb-3");

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const questionTitle = document.createElement("h5");
  questionTitle.classList.add("card-title");
  questionTitle.textContent = `Question ${questionIndex + 1}: ${question}`;

  cardBody.appendChild(questionTitle);

  choices.forEach((choice, index) => {
    const formCheckDiv = document.createElement("div");
    formCheckDiv.classList.add("form-check");

    const input = document.createElement("input");
    input.classList.add("form-check-input");
    input.type = "radio";
    input.name = `question${questionIndex}`;
    input.id = `choice${index + 1}`;
    input.value = choice;

    const label = document.createElement("label");
    label.classList.add("form-check-label");
    label.textContent = choice;
    label.setAttribute("for", `choice${index + 1}`);

    formCheckDiv.appendChild(input);
    formCheckDiv.appendChild(label);

    cardBody.appendChild(formCheckDiv);
  });
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("text-center");

  const submitButton = document.createElement("button");
  submitButton.classList.add("btn", "btn-primary", "mt-2");
  submitButton.textContent = "Submit Answer!";

  submitButton.addEventListener("click", () => goToNextQuastion(container));

  buttonContainer.appendChild(submitButton);
  cardBody.appendChild(buttonContainer);

  container.appendChild(cardBody);

  return container;
};

const createQuastion = () => {
  const questionTemplete = createQuestionTemplate(questions[questionIndex]);
  mainContainer.appendChild(questionTemplete);
};

const gameOver = () => {
  const table = document.createElement("table");
  table.className =
    "table table-striped fa-check text-successtable-border border-light";

  const thead = document.createElement("thead");
  thead.className = "border-light";

  const headerRow = document.createElement("tr");
  const headers = ["No.", "You Answer:", "Correct Answer:"];
  headers.forEach((headerText) => {
    const th = document.createElement("th");
    th.textContent = headerText;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);


  const tbody = document.createElement("tbody");
  answers.forEach((ans, index) => {
    if (ans == questions[index].correctAnswer) {
      correctAnswers++;
    }
    const row = document.createElement("tr");
    const th = document.createElement("th");
    th.scope = "row";
    th.textContent = index+1;
    row.appendChild(th);
    
    const yourAnswer = document.createElement("td");
    yourAnswer.innerHTML = ans;
    row.appendChild(yourAnswer);
    
    const correctAnswer = document.createElement("td");
    correctAnswer.innerHTML = questions[index].correctAnswer;
    
    row.appendChild(correctAnswer);
    
    tbody.appendChild(row);
  });

 
  table.appendChild(thead);
  table.appendChild(tbody);

  const corrAns = document.createElement("h2");
  corrAns.classList.add("display-4", "text-center");
  corrAns.textContent = `Your was correct on: ${correctAnswers} Answers`;


  mainContainer.appendChild(table);
  mainContainer.appendChild(corrAns);
};

function goToNextQuastion(prevCard) {
  const radioButtons = prevCard.querySelectorAll('input[type="radio"]');
  let isChecked = false;
  radioButtons.forEach((radio) => {
    if (radio.checked) {
      isChecked = true;
      answers.push(radio.value);
    }
  });

  if (isChecked) {
    prevCard.remove();
    questionIndex++;
    if (questionIndex < questions.length) {
      createQuastion();
    } else {
      gameOver();
    }
  } else {
    alert(`Please select an option!`);
  }
}

const startGame = () => {
  document.querySelector("#startGame").remove();
  createQuastion();
};

const init = () => {
  document.querySelector("#startBtn").addEventListener("click", startGame);
};

init();
