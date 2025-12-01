// Load todo list from localStorage or create empty one
let todo = JSON.parse(localStorage.getItem("todo")) || [];

// Elements
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.getElementById("addButton");
const deleteButton = document.getElementById("deleteButton");

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  addButton.addEventListener("click", addTask);

  todoInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  });

  deleteButton.addEventListener("click", deleteAllTasks);

  displayTasks();
});

// Add new task
function addTask() {
  const newTask = todoInput.value.trim();
  if (newTask === "") return;

  todo.push({
    text: newTask,
    disabled: false
  });

  saveToLocalStorage();
  todoInput.value = "";
  displayTasks();
}

// Delete all tasks
function deleteAllTasks() {
  todo = [];
  saveToLocalStorage();
  displayTasks();
}

// Toggle complete
function toggleTask(index) {
  todo[index].disabled = !todo[index].disabled;
  saveToLocalStorage();
  displayTasks();
}

// Display all tasks
function displayTasks() {
  todoList.innerHTML = "";

  todo.forEach((item, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="todo-container">
        <input type="checkbox" 
          class="todo-checkbox"
          ${item.disabled ? "checked" : ""}
        />

        <p class="${item.disabled ? "disabled" : ""}">
          ${item.text}
        </p>
      </div>
    `;

    li.querySelector(".todo-checkbox")
      .addEventListener("change", () => toggleTask(index));

    todoList.appendChild(li);
  });

  todoCount.textContent = todo.length;
}

// Save
function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo));
}
