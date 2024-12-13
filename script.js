// script.js

// Initialize an array to store tasks
let tasks = [];

// Open the settings modal
const settingsBtn = document.getElementById("settingsBtn");
const settingsModal = document.getElementById("settingsModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const taskListPage = document.getElementById("taskListPage");
const taskListWithCheckboxes = document.getElementById("taskListWithCheckboxes");
const finishPageBtn = document.getElementById("finishPageBtn");
const mainPage = document.getElementById("mainPage");
const doneBtn = document.getElementById("doneBtn");

// Open modal when settings button is clicked
settingsBtn.addEventListener("click", function() {
  settingsModal.style.display = "block";
});

// Close modal when close button is clicked
closeModalBtn.addEventListener("click", function() {
  settingsModal.style.display = "none";
});

// Close modal if clicked outside the modal content
window.addEventListener("click", function(event) {
  if (event.target === settingsModal) {
    settingsModal.style.display = "none";
  }
});

// Theme change functionality
const themeSelect = document.getElementById("themeSelect");

themeSelect.addEventListener("change", function() {
  const selectedTheme = themeSelect.value;

  if (selectedTheme === "dark") {
    document.body.classList.remove("light-mode");
    document.body.classList.add("dark-mode");
    document.querySelector(".container").classList.remove("light-mode");
    document.querySelector(".container").classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
    document.body.classList.add("light-mode");
    document.querySelector(".container").classList.remove("dark-mode");
    document.querySelector(".container").classList.add("light-mode");
  }
});

// Task management
const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const dateTimeInput = document.getElementById("dateTimeInput");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", function() {
  const taskText = taskInput.value.trim();
  const taskDateTime = dateTimeInput.value;

  if (taskText !== "" && taskDateTime !== "") {
    const task = {
      text: taskText,
      dateTime: taskDateTime,
      completed: false
    };

    tasks.push(task); // Add task to memory
    renderTasks(); // Update the task list in the main page
    taskInput.value = "";
    dateTimeInput.value = "";
  }
});

// Done button functionality: Go to task list page
doneBtn.addEventListener("click", function() {
  mainPage.style.display = "none";
  taskListPage.style.display = "block";

  // Populate task list with checkboxes
  renderTasksWithCheckboxes();
});

// Finish button functionality on the new page
finishPageBtn.addEventListener("click", function() {
  const isConfirmed = confirm("Are you sure you finished your tasks?");
  if (isConfirmed) {
    tasks = []; // Clear tasks from memory
    taskListWithCheckboxes.innerHTML = "";
    taskList.innerHTML = "";
    mainPage.style.display = "block";
    taskListPage.style.display = "none";
  }
});

// Render tasks with checkboxes on the "Done" page
function renderTasksWithCheckboxes() {
  taskListWithCheckboxes.innerHTML = ''; // Clear previous task list

  tasks.forEach(function(task, index) {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", function() {
      task.completed = checkbox.checked;
    });

    const taskText = document.createTextNode(`${task.text} - Due: ${formatDateTime(task.dateTime)}`);

    li.appendChild(checkbox);
    li.appendChild(taskText);
    taskListWithCheckboxes.appendChild(li);
  });
}

// Render tasks in the main page
function renderTasks() {
  taskList.innerHTML = ''; // Clear previous task list

  tasks.forEach(function(task) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.text;

    const dateTimeSpan = document.createElement("span");
    dateTimeSpan.textContent = `Due: ${formatDateTime(task.dateTime)}`;

    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons-container");

    // Create Edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = function() {
      editTask(task);
    };

    // Create Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = function() {
      deleteTask(task);
    };

    buttonsContainer.appendChild(editBtn); // Add Edit button first
    buttonsContainer.appendChild(deleteBtn); // Add Delete button

    li.appendChild(span);
    li.appendChild(dateTimeSpan);
    li.appendChild(buttonsContainer);

    taskList.appendChild(li);
  });
}

function formatDateTime(dateTime) {
  const date = new Date(dateTime);
  return date.toLocaleString();
}

function deleteTask(taskToDelete) {
  tasks = tasks.filter(function(task) {
    return task !== taskToDelete;
  });
  renderTasks(); // Re-render task list after deletion
}

function editTask(taskToEdit) {
  const newTaskText = prompt("Edit Task Description:", taskToEdit.text);
  const newDateTime = prompt("Edit Task Due Date (YYYY-MM-DDTHH:MM):", taskToEdit.dateTime);

  if (newTaskText !== null && newTaskText.trim() !== "") {
    taskToEdit.text = newTaskText.trim();
  }

  if (newDateTime !== null && new Date(newDateTime) !== "Invalid Date") {
    taskToEdit.dateTime = newDateTime;
  }

  renderTasks(); // Re-render task list after editing
}