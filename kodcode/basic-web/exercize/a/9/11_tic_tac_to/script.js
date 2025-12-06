let turn = document.querySelector("#turn");
let boxes = document.querySelectorAll("#main div");
let X_or_O = true;
let gameOver = false;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6],
];

const selectWinnerBoxes = (b1, b2, b3) => {
  b1.classList.add("win");
  b2.classList.add("win");
  b3.classList.add("win");
  turn.innerHTML = b1.innerHTML + " is a winner";
  turn.style.fontSize = "40px";
};

const checkTie = () => {
  if (!gameOver) {
    if ([...boxes].every((box) => box.innerHTML !== "")) {
        turn.innerHTML = "TIE!";
    }
  }
};

const getWinner = () => {
  winningCombinations.forEach((combination) => {
    const [a, b, c] = combination;
    if (
      boxes[a].innerHTML &&
      boxes[a].innerHTML === boxes[b].innerHTML &&
      boxes[a].innerHTML === boxes[c].innerHTML
    ) {
      selectWinnerBoxes(boxes[a], boxes[b], boxes[c]);
      gameOver = true;
      return true;
    }
  });
  return false;
};

const startGame = () => {
  for (let i in boxes) {
    boxes[i].onclick = () => {
      if (boxes[i].innerHTML == "") {
        if (X_or_O) {
          boxes[i].innerHTML = "X";
          turn.textContent = "O Turn Now";
          getWinner();
          checkTie();
          X_or_O = !X_or_O;
        } else {
          boxes[i].innerHTML = "O";
          turn.textContent = "X Turn Now";
          getWinner();
          checkTie();
          X_or_O = !X_or_O;
        }
      }
    };
  }
};

const newGame = () => {
  gameOver = false;
  document.querySelector("#replay").innerHTML = "Play Again";
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].classList.remove("win");
    boxes[i].innerHTML = "";
    turn.innerHTML = "Play";
    turn.style.fontSize = "25px";
  }
  startGame();
};

document.querySelector("#replay").addEventListener("click", newGame);
