let tasks = [
  {
    title: "Read a Book",
    date: "19/5/2023",
    isDone: true,
  },
  {
    title: "Finish The Final Project",
    date: "19/5/2023",
    isDone: false,
  },
  {
    title: "Finish The Js Course",
    date: "19/5/2023",
    isDone: true,
  },
];

function getTasksFromStorage() {
  let retrievedTasks = JSON.parse(localStorage.getItem("tasks"));
  tasks = retrievedTasks ?? []
}

getTasksFromStorage();

function fillTasksOnThePage() {
  document.getElementById("tasks").innerHTML = "";
  let index = 0;
  for (task of tasks) {
    let content = `
            <div class="task ${task.isDone ? "done" : ""}">
              <!-- TASKS INFO -->
              <div class="tasks-info">
                <h2>${task.title}</h2>
                <div>
                  <span class="material-symbols-outlined">
                    calendar_month
                  </span>
                  <span> ${task.date} </span>
                </div>
              </div>
              <!--// TASKS INFO //-->
              <!-- TASKS ACTIONS -->
              <div class="tasks-actions">
                <button onclick="editTask(${index})" class="circular edit-btn">
                  <span class="material-symbols-outlined"> edit </span>
                </button>
                ${
                  task.isDone
                    ? `
                <button onclick="toggleTaskCompletion(${index})" class="circular cancel-btn">
                  <span class="material-symbols-outlined"> cancel </span>
                </button> `
                    : `
                <button onclick="toggleTaskCompletion(${index})" class="circular correct-btn">
                  <span class="material-symbols-outlined"> check </span>
                </button>                
                `
                }

                <button onclick="deleteTask(${index})" class="circular delete-btn">
                  <span class="material-symbols-outlined"> delete </span>
                </button>
              </div>
              <!--// TASKS ACTIONS //-->
            </div>
            `;
    document.getElementById("tasks").innerHTML += content;
    index++;
  }
}

fillTasksOnThePage();
document.getElementById("add-btn").addEventListener("click", function () {
  let taskName = prompt("Please Enter The Task Title:");
  let now = new Date();
  let date =
    now.getDate() +
    "/" +
    (now.getMonth() + 1) +
    "/" +
    now.getFullYear() +
    " | " +
    now.getHours() +
    ":" +
    now.getMinutes();
  let taskObj = {
    title: taskName,
    date: "10/7/2023",
    isDone: false,
  };
  tasks.push(taskObj);
  storeTasks();
  fillTasksOnThePage();
});

function deleteTask(index) {
  let task = tasks[index];
  let isConfirmed = confirm("Are you sure you want to delete: " + task.title);
  if (isConfirmed) {
    tasks.splice(index, 1);
    storeTasks();
    fillTasksOnThePage();
  }
}

function editTask(index) {
  let task = tasks[index];
  let newTaskTitle = prompt("Please enter the new task title: ", task.title);
  task.title = newTaskTitle;
  storeTasks();
  fillTasksOnThePage();
}

function toggleTaskCompletion(index) {
  let task = tasks[index];
  task.isDone = !task.isDone;
  storeTasks();
  fillTasksOnThePage();
}

// ################## STORAGE FUNCTIONS ###################
function storeTasks() {
  let tasksString = JSON.stringify(tasks);
  localStorage.setItem("tasks", tasksString);
}
