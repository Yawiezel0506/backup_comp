const container = document.querySelector(".container");
const createHeader = (size, text, color) => {
    const headerElement = document.createElement("h" + size);
    headerElement.innerHTML = text;
    headerElement.style.color = color;
    container.appendChild(headerElement)
};

createHeader(1, "I'm H1", "blue");
createHeader(2, "I'm H2", "red");
createHeader(3, "I'm H3", "green");
