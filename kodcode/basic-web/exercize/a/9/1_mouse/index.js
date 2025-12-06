const mouseEvent = document.querySelector("#mouse_event");

const over = () => {
  mouseEvent.innerHTML = "Mouse over";
};
const out = () => {
  mouseEvent.innerHTML = "Mouse out";
};
const click = () => {
  mouseEvent.style.color = "red";
  mouseEvent.style.fontSize = "20px";
  mouseEvent.style.border = "2px solid green";
  mouseEvent.style.textAlign = "center";
};

mouseEvent.addEventListener("mouseover", over);
mouseEvent.addEventListener("mouseout", out);

mouseEvent.addEventListener("click", click);
