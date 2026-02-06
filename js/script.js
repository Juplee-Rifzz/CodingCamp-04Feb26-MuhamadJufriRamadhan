const filterSelect = document.getElementById("filterSelect");
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
  
  const filterValue = filterSelect.value;

  if (tasks.length === 0) {
    taskList.innerHTML = `<tr><td colspan="4" class="empty">No tasks found</td></tr>`;
    updateSummary();
    return;
  }

  tasks.forEach((task, index) => {
    // 2. LOGIKA PENYARINGAN
    if (filterValue === "completed" && !task.done) return;
    if (filterValue === "pending" && task.done) return; 
    const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${task.text}</td>
    <td>${task.date || "-"}</td>
    <td class="status ${task.done ? "done" : "pending"}">
      ${task.done ? "Completed" : "Pending"}
    </td>
    <td>
    <div class="action-buttons">
    <button class="btn-action btn-toggle" onclick="toggleTask(${index})">
      <i class='bx ${task.done ? "bx-check-circle" : "bx-circle"}'></i>
    </button>

    <button class="btn-action btn-delete" onclick="deleteTask(${index})">
      <i class='bx bx-trash'></i>
    </button>
    </div>
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
  renderTasks();
  if (themeSelect.value) {
    const themeClass = "theme-" + themeSelect.value;
    document.body.classList.add(themeClass);
    localStorage.setItem("theme", themeClass);
  } else {
    localStorage.removeItem("theme");
  }
});
filterSelect.addEventListener("change", () => {
  renderTasks();
});

