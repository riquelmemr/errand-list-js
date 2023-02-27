const form = document.querySelector(".form-new-task");
const formUpdate = document.querySelector(".form-update");
const tasks = document.querySelector(".tasks");
const logged = sessionStorage.getItem("logged");
const idTask = document.querySelector("#id-task");
const newTitle = document.querySelector("#new-title");
const newDescription = document.querySelector("#new-details");
const formUpdateTask = document.querySelector("#btn-update-task");
const modal = document.querySelector(".modal-update");
const dataUser = validateLogin();

document.querySelector(".close-modal").addEventListener("click", closeModal);
document.querySelector(".btn-logout").addEventListener("click", logout);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.querySelector("#title");
  const description = document.querySelector("#description");
  const validate = validateTask(title.value, description.value);

  if (validate) {
    const task = {
      id: generateID(),
      title: title.value,
      description: description.value,
    };

    dataUser.tasks.push(task);
    saveDataUser(dataUser);
    createTask(task);

    title.value = "";
    description.value = "";
    title.focus();
  }
});

formUpdateTask.addEventListener("click", (e) => {
  e.preventDefault();

  const id = Number(document.querySelector("#id-task").innerHTML.replace("#", ""));
  const title = document.querySelector("#new-title").value;
  const description = document.querySelector("#new-details").value;
  const indexTask = dataUser.tasks.findIndex((task) => task.id === id);
  const validate = validateTask(title, description);

  if (validate) {
    const task = {
      id: id,
      title: title,
      description: description,
    };

    dataUser.tasks.splice(indexTask, 1, task);
    saveDataUser(dataUser);
    getTasksOfUser(dataUser);
    modal.style.display = "none";
  }
});

function validateTask(title, description) {
  if (!title) return alert("Dê um título a seu recado.");
  if (!description) return alert("Escreva uma descrição a seu recado.");
  return true;
}

function validateLogin() {
  if (!logged) window.location.href = "index.html";

  // Return information about the current user
  const dataUser = localStorage.getItem(logged);
  const data = JSON.parse(dataUser);

  getTasksOfUser(data);
  return data;
}

// Insert tasks of the user
function getTasksOfUser(dataUser) {
  tasks.innerHTML = "";
  const userTasks = dataUser.tasks;

  for (const task of userTasks) {
    createTask(task);
  }
}

function generateID(min = 1, max = 10000) {
  return Math.floor(Math.random() * (max - min) + min);
}

function saveDataUser(dataUser) {
  localStorage.setItem(dataUser.email, JSON.stringify(dataUser));
}

function updateTask(id) {
  const task = dataUser.tasks.find((task) => task.id === id);
  modal.style.display = "block";

  idTask.innerHTML = "#" + id;
  newTitle.value = task.title;
  newDescription.value = task.description;
}

function deleteTask(id) {
  const confirmation = confirm(`Tem certeza que deseja excluir a tarefa com o ID ${id}?`);

  if (confirmation) {
    const index = dataUser.tasks.findIndex((task) => task.id === id);
    dataUser.tasks.splice(index, 1);
    saveDataUser(dataUser);
    getTasksOfUser(dataUser);
  }
}

function logout() {
  sessionStorage.removeItem("logged");
  window.location.href = "index.html";
}

function closeModal() {
  modal.style.display = "none";
}

// Create the task

function createTask(task) {
  tasks.innerHTML += `
    <tr>
      <td>${task.title}</td>
      <td>${task.description}</td>
      <td class="buttons-edit">
        <button class="btn-edit" onclick="updateTask(${task.id})">Editar</button>
        <button class="btn-delete" onclick="deleteTask(${task.id})">Excluir</button>
      </td>
    </tr>
  `;
}

// function createTask(task) {
//   const tr = createTR();

//   const tdTitle = document.createElement("td");
//   tdTitle.textContent = task.title;
//   tr.appendChild(tdTitle);

//   const tdDescription = document.createElement("td");
//   tdDescription.textContent = task.description;
//   tr.appendChild(tdDescription);

//   const tdButtons = createTDButtons();
//   tr.appendChild(tdButtons);

//   const btnEdit = createBtnEdit(task.id);
//   tdButtons.appendChild(btnEdit);

//   const btnDelete = createBtnDelete(task.id);
//   tdButtons.appendChild(btnDelete);
// }

// function createTR() {
//   const tr = document.createElement("tr");
//   tasks.appendChild(tr);
//   return tr;
// }

// function createTDButtons() {
//   const tdButtons = document.createElement("td");
//   tdButtons.classList.add("buttons-edit");
//   return tdButtons;
// }

// function createBtnDelete(taskID) {
//   const btnDelete = document.createElement("button");
//   btnDelete.classList.add("btn-delete");
//   btnDelete.setAttribute("onclick", "deleteTask("+taskID+")");
//   btnDelete.textContent = "Excluir";
//   return btnDelete;
// }

// function createBtnEdit(taskID) {
//   const btnEdit = document.createElement("button");
//   btnEdit.classList.add("btn-edit");
//   btnEdit.setAttribute("onclick", "updateTask("+taskID+")");
//   btnEdit.textContent = "Editar";
//   return btnEdit;
// }
