const todoList = document.querySelector("#todo_list");
const inputTodoItem = document.querySelector("#text_inp");
const addBtn = document.querySelector("#add_btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const updateLocalStorageTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const deleteTask = (taskId) => {
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    updateLocalStorageTasks();
    renderTasks();
  }
};

const renderTasks = () => {
  todoList.innerHTML = "";
  tasks.map((task) => {
    const liElement = document.createElement("li");
    liElement.id = task.id;
    liElement.className =
      "list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2";

    const divElement = document.createElement("div");
    divElement.className = "d-flex align-items-center";

    const inputElement = document.createElement("input");
    inputElement.className = "form-check-input me-2";
    inputElement.type = "checkbox";
    inputElement.value = "";
    inputElement.checked = task.checked;
    inputElement.setAttribute("aria-label", "...");

    inputElement.addEventListener("change", () => {
      task.checked = inputElement.checked;
      updateLocalStorageTasks();
    });

    const taskNameTextNode = document.createTextNode(task.task);

    divElement.appendChild(inputElement);
    divElement.appendChild(taskNameTextNode);

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger";
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {
      deleteTask(task.id);
    });

    liElement.appendChild(divElement);
    liElement.appendChild(deleteButton);

    todoList.appendChild(liElement);
  });
};

const handleLocalStorage = () => {
  const task = {
    id: Date.now(),
    task: inputTodoItem.value,
    checked: false,
  };
  tasks.push(task);
  updateLocalStorageTasks();
  inputTodoItem.value = "";
  renderTasks();
};

const addToLocalStorage = () => {
  if (inputTodoItem.value) {
    if (tasks.length < 10) {
      handleLocalStorage()
    } else {
      const confirmation = window.confirm(
        "You already have 10 tasks, if you want to add more, you have to delete the holdes't"
      );
      if (confirmation) {
        tasks.shift();
        handleLocalStorage()
      }
    }
  }
};

addBtn.addEventListener("click", addToLocalStorage);

renderTasks();
