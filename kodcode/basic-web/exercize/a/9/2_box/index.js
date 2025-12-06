const box = document.querySelector("#play_with_box");
const randomColor = document.querySelector("#change_random");
const selectColor = document.querySelector("#select_color");
const chooseColor = document.querySelector("#choose_color");
const colorText = document.querySelector("#color_text");
const addButton = document.querySelector("#add_btn");
const showHide = document.querySelector("#show-hide");

const changeRandomColor = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  const hexRed = red.toString(16).padStart(2, "0");
  const hexGreen = green.toString(16).padStart(2, "0");
  const hexBlue = blue.toString(16).padStart(2, "0");

  colorCode = `#${hexRed}${hexGreen}${hexBlue}`;

  box.style.background = colorCode;
};

const chooseFromSelect = () => {
  let colorChoosed = selectColor.value;
  box.style.background = colorChoosed;
};

const addOptionToSelect = () => {
  if (colorText.value) {
    let option = document.createElement("option");
    option.textContent = colorText.value;
    option.value = colorText.value;
    selectColor.appendChild(option);
    colorText.value = "";
  }
};

const changeVisebility = () => {
  if (box.style.display === "none") {
    box.style.display = "block";
    showHide.innerHTML = "Hide";
  } else {
    box.style.display = "none";
    showHide.innerHTML = "Show";
  }
};

randomColor.addEventListener("click", changeRandomColor);
chooseColor.addEventListener("click", chooseFromSelect);
addButton.addEventListener("click", addOptionToSelect);
showHide.addEventListener("click", changeVisebility);
