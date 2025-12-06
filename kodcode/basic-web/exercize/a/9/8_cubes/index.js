const rollBtn = document.querySelector("#roll_btn");

const getRandomNumber = () => {
  return Math.floor(Math.random() * 6) + 1;
};

const rollCubes = () => {
  const cube1 = document.querySelector("#cube1");
  const cube2 = document.querySelector("#cube2");

  const randomNumber1 = getRandomNumber();
  const randomNumber2 = getRandomNumber();

  cube1.textContent = randomNumber1;
  cube2.textContent = randomNumber2;
};


rollBtn.addEventListener("click", rollCubes);
