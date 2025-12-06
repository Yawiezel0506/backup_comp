const box = document.querySelector("#box");
const corner = document.querySelector("#corner");
const centerCorner = document.querySelector("#center-corner");
const center = document.querySelector("#center");

const saArray = ["start", "end"];

const chooseCorner = () => {
  box.style.justifyContent =
    saArray[Math.floor(Math.random() * saArray.length)];
  box.style.alignItems = saArray[Math.floor(Math.random() * saArray.length)];
};

const chooseCenterCorner = () => {
  const justifyContentOptions = ["flex-start", "center", "flex-end"];
  const alignItemsOptions = ["flex-start", "center", "flex-end"];

  const randomJustifyContent =
    justifyContentOptions[
      Math.floor(Math.random() * justifyContentOptions.length)
    ];
  const randomAlignItems =
    alignItemsOptions[Math.floor(Math.random() * alignItemsOptions.length)];

  box.style.justifyContent = randomJustifyContent;
  if (randomJustifyContent == "center") {
    box.style.alignItems = randomAlignItems;
  } else {
    box.style.alignItems = "center";
  }
};

const chooseCenter = () => {
  box.style.justifyContent = "center";
  box.style.alignItems = "center";
};

corner.addEventListener("click", chooseCorner);
centerCorner.addEventListener("click", chooseCenterCorner);
center.addEventListener("click", chooseCenter);
