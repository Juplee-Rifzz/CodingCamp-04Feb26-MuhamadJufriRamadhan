const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const deleteAllBtn = document.getElementById("deleteAll");

const totalEl = document.getElementById("total");
const completedEl = document.getElementById("completed");
const pendingEl = document.getElementById("pending");
const progressEl = document.getElementById("progress");

const themeSelect = document.getElementById("themeSelect");

let tasks = [];

/* ================= TASK ================= */
function updateSummary() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.done).length;
  const pending = total - completed;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  totalEl.textContent = total;
  completedEl.textContent = completed;
  pendingEl.textContent = pending;
  progressEl.textContent = progress + "%";
}

function renderTasks() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    taskList.innerHTML = `<tr><td colspan="4" class="empty">No tasks found</td></tr>`;
    updateSummary();
    return;
  }

  tasks.forEach((task, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${task.text}</td>
      <td>${task.date || "-"}</td>
      <td class="status ${task.done ? "done" : "pending"}">
        ${task.done ? "Completed" : "Pending"}
      </td>
      <td>
        <button onclick="toggleTask(${index})">✔</button>
        <button onclick="deleteTask(${index})">🗑</button>
      </td>
    `;
    taskList.appendChild(tr);
  });

  updateSummary();
}

function addTask() {
  const text = taskInput.value.trim();
  const date = dateInput.value;

  if (!text) return;

  tasks.push({ text, date, done: false });
  taskInput.value = "";
  dateInput.value = "";
  renderTasks();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

addBtn.addEventListener("click", addTask);
deleteAllBtn.addEventListener("click", () => {
  tasks = [];
  renderTasks();
});

/* ================= THEME ================= */
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.body.classList.add(savedTheme);
  themeSelect.value = savedTheme.replace("theme-", "");
}

themeSelect.addEventListener("change", () => {
  document.body.className = "";
  if (themeSelect.value) {
    const themeClass = "theme-" + themeSelect.value;
    document.body.classList.add(themeClass);
    localStorage.setItem("theme", themeClass);
  } else {
    localStorage.removeItem("theme");
  }
});
