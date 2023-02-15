const form = document.querySelector(".form-new-task");
const tasks = document.querySelector(".tasks");
const logged = sessionStorage.getItem("logged");
const dataUser = validateLogin();

document.querySelector(".btn-logout").addEventListener("click", logout);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;
  const validate = validateTask(title, description);

  if (validate) {
    const task = {
      id: generateID(),
      title: title,
      description: description,
    };

    dataUser.tasks.unshift(task);
    saveDataUser(dataUser);
    createTask(title, description);
  }
});

function validateTask(title, description) {
  if (!title) return alert("Dê um título a seu recado.");
  if (!description) return alert("Escreva uma descrição a seu recado.");
  return true;
}

function logout() {
  sessionStorage.removeItem("logged");
  window.location.href = "index.html";
}

function validateLogin() {
  if (!logged) {
    window.location.href = "index.html";
  }

  // Return information about the current user
  const dataUser = localStorage.getItem(logged);
  let data = JSON.parse(dataUser);

  // Insert tasks of the user
  getTasksOfUser(data);
  return data;
}

function getTasksOfUser(dataUser) {
  const tasks = dataUser.tasks;

  for (const i of tasks) {
    createTask(i.title, i.description);
  }
}

function createTask(title, description) {
  const tr = createTR();

  const tdTitle = document.createElement("td");
  tdTitle.textContent = title;
  tr.appendChild(tdTitle);

  const tdDescription = document.createElement("td");
  tdDescription.textContent = description;
  tr.appendChild(tdDescription);

  const tdButtons = createTDButtons();
  tr.appendChild(tdButtons);

  const btnEdit = createBtnEdit();
  tdButtons.appendChild(btnEdit);

  const btnDelete = createBtnDelete();
  tdButtons.appendChild(btnDelete);
}

function createTR() {
  const tr = document.createElement("tr");
  tasks.appendChild(tr);
  return tr;
}

function createTDButtons() {
  const tdButtons = document.createElement("td");
  tdButtons.classList.add("buttons-edit");
  return tdButtons;
}

function createBtnDelete() {
  const btnDelete = document.createElement("button");
  btnDelete.classList.add("btn-delete");
  btnDelete.textContent = "Excluir";
  return btnDelete;
}

function createBtnEdit() {
  const btnEdit = document.createElement("button");
  btnEdit.classList.add("btn-edit");
  btnEdit.textContent = "Editar";
  return btnEdit;
}

function generateID(min = 1, max = 5000) {
  return Math.floor(Math.random() * (max - min) + min);
}

function saveDataUser(dataUser) {
  localStorage.setItem(dataUser.email, JSON.stringify(dataUser));
}
