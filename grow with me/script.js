// Base to-do list logic adapted from Ade-mir's To-Do-List-Tutorial
// (YouTube + GitHub). Modified by [Lela & Adama] for the "Grow With Me" project.

let todo = JSON.parse(localStorage.getItem("todo")) || [];

const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");

let rewardShown = false;
let rewardModal;
let rewardCloseButton;
let rewardOkButton;

document.addEventListener("DOMContentLoaded", function () {
  if (addButton) {
    addButton.addEventListener("click", addTask);
  }

  if (todoInput) {
    todoInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        addTask();
      }
    });
  }

  if (deleteButton) {
    deleteButton.addEventListener("click", deleteAllTasks);
  }

  displayTasks();
  updateProgressBar();
  setupRewardModal();
});

function addTask() {
  if (!todoInput) return;

  const newTask = todoInput.value.trim();
  if (newTask !== "") {
    todo.push({ text: newTask, disabled: false });
    saveToLocalStorage();
    todoInput.value = "";
    displayTasks();
    updateProgressBar();
  }
}

function displayTasks() {
  if (!todoList) return;

  todoList.innerHTML = "";

  todo.forEach(function (item, index) {
    const li = document.createElement("li");

    const container = document.createElement("div");
    container.className = "todo-container";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "todo-checkbox";
    checkbox.id = "input-" + index;
    checkbox.checked = item.disabled;
    checkbox.addEventListener("change", function () {
      toggleTask(index);
    });

    const p = document.createElement("p");
    p.id = "todo-" + index;
    p.textContent = item.text;
    if (item.disabled) {
      p.classList.add("disabled");
    }
    p.addEventListener("click", function () {
      editTask(index);
    });

    container.appendChild(checkbox);
    container.appendChild(p);
    li.appendChild(container);
    todoList.appendChild(li);
  });

  if (todoCount) {
    todoCount.textContent = String(todo.length);
  }
}

function editTask(index) {
  const todoItem = document.getElementById("todo-" + index);
  if (!todoItem) return;

  const existingText = todo[index].text;
  const inputElement = document.createElement("input");

  inputElement.value = existingText;
  inputElement.type = "text";
  inputElement.className = "input-field";
  todoItem.replaceWith(inputElement);
  inputElement.focus();

  inputElement.addEventListener("blur", function () {
    const updatedText = inputElement.value.trim();
    if (updatedText) {
      todo[index].text = updatedText;
      saveToLocalStorage();
    }
    displayTasks();
    updateProgressBar();
  });
}

function toggleTask(index) {
  if (!todo[index]) return;

  todo[index].disabled = !todo[index].disabled;
  saveToLocalStorage();
  displayTasks();
  updateProgressBar();
}

function deleteAllTasks() {
  todo = [];
  saveToLocalStorage();
  displayTasks();
  updateProgressBar();
}

function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo));
}

function updateProgressBar() {
  const bar = document.getElementById("taskProgressBar");
  if (!bar) return;

  const total = todo.length;
  const done = todo.filter(function (item) {
    return item.disabled;
  }).length;

  if (total === 0) {
    bar.style.width = "0%";
    rewardShown = false;
    return;
  }

  const percent = Math.round((done / total) * 100);
  bar.style.width = percent + "%";

  if (percent === 100 && !rewardShown) {
    openRewardModal();
  }

  if (percent < 100) {
    rewardShown = false;
  }
}

function setupRewardModal() {
  rewardModal = document.getElementById("rewardModal");
  if (!rewardModal) return;

  rewardCloseButton = rewardModal.querySelector(".close-btn");
  rewardOkButton = rewardModal.querySelector(".reward-ok");

  if (rewardCloseButton) {
    rewardCloseButton.onclick = closeRewardModal;
  }

  if (rewardOkButton) {
    rewardOkButton.onclick = closeRewardModal;
  }

  window.addEventListener("click", function (event) {
    if (event.target === rewardModal) {
      closeRewardModal();
    }
  });
}

function openRewardModal() {
  if (!rewardModal) return;
  rewardModal.style.display = "block";
  rewardShown = true;
}

function closeRewardModal() {
  if (!rewardModal) return;
  rewardModal.style.display = "none";
}
