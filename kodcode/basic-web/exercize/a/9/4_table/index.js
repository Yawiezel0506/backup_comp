const table = document.querySelector("#table");
const userName = document.querySelector("#name_inp");
const age = document.querySelector("#age_inp");
const sex = document.querySelector("#sex_inp");
const addBtn = document.querySelector("#add_btn");
const removeID = document.querySelector("#remove_id");
const delBtn = document.querySelector("#del_btn");

let id = 1;

const addPerson = () => {
  if (userName.value && age.value && sex.value) {
    table.innerHTML += `
        <tr id=${id}>
          <th scope="row">${id}</th>
          <td>${userName.value}</td>
          <td>${age.value}</td>
          <td>${sex.value}</td>
        </tr>
      `;
    userName.value = "";
    age.value = "";
    sex.value = "";
    id++;
  } else {
    alert("Please fill all fields");
  }
};

const removePerson = () => {
  const row = document.getElementById(parseInt(removeID.value));
  if (row) {
    row.remove();
    removeID.value = "";
  }
};

addBtn.addEventListener("click", addPerson);
delBtn.addEventListener("click", removePerson);
