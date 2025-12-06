let header = document.querySelector("#header");
let ms = document.querySelector("#models");
let m3 = document.querySelector("#model3");
let mx = document.querySelector("#modelx");
let my = document.querySelector("#modely");
let model = document.querySelector("#model");
let toHounderd = document.querySelector("#toHounderd");
let topSpeed = document.querySelector("#topSpeed");
let maxRange = document.querySelector("#maxRange");

ms.addEventListener("click", () => {
  header.style.backgroundImage = "url(img/Model-S-homepage-desktop.avif)";
  model.innerHTML = "Model S";
  toHounderd.innerHTML = "1.9";
  topSpeed.innerHTML = "386";
  maxRange.innerHTML = "412";
});
m3.addEventListener("click", () => {
  header.style.backgroundImage = "url(img/Homepage-Model-3-Desktop-LHD.avif)";
  model.innerHTML = "Model 3";
  toHounderd.innerHTML = "4.2";
  topSpeed.innerHTML = "270";
  maxRange.innerHTML = "623";
});
mx.addEventListener("click", () => {
  header.style.backgroundImage = "url(img/Homepage-Model-X-Desktop-LHD.avif)";
  model.innerHTML = "Model X";
  toHounderd.innerHTML = "2.7";
  topSpeed.innerHTML = "330";
  maxRange.innerHTML = "524";
});
my.addEventListener("click", () => {
  header.style.backgroundImage =
    "url(img/Homepage-Model-Y-Global-Desktop.avif)";
  model.innerHTML = "Model Y";
  toHounderd.innerHTML = "3.1";
  topSpeed.innerHTML = "310";
  maxRange.innerHTML = "576";
});
