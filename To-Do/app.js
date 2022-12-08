let section = document.getElementById("section");
let tasks = document.querySelector(".tasks");
let addTaskBtn = document.querySelector(`[value="Add Task"]`);

// To Save Tasks
let ourTasks = [];

// Get Data From Local Storage if found and make it visibale in the page
if (window.localStorage.getItem("tasks")) {
  ourTasks = JSON.parse(window.localStorage.getItem("tasks"));
}
addTasks(ourTasks);

addTaskBtn.onclick = function () {
  if (section.value !== "") {
    addArry(section.value);
    section.value = "";
  }
};

// To Delete & Done Task
tasks.addEventListener("click", (e) => {
  // Delete Button
  if (e.target.classList.contains("del")) {
    // Remove From Local Storage
    delLocal(e.target.parentElement.getAttribute("data-id"));
    // Remove From Page
    e.target.parentElement.remove();
  }
  // Task Done
  if (e.target.classList.contains("task")) {
    addLocalDone(e.target.getAttribute("data-id"));
    e.target.classList.toggle("task__done");
  }
});

function addArry(inputTask) {
  let data = {
    id: Math.random().toString(8).substring(2),
    title: inputTask,
    done: false,
  };
  ourTasks.push(data);

  // Add To Page
  addTasks(ourTasks);
  // Add To Local Storage
  addLocal(ourTasks);

  // Test
  // console.log(ourTasks)
}

function addTasks(inputTask) {
  // make tasks div empty first to prevent duplication
  tasks.innerHTML = "";
  // Start Adding
  inputTask.forEach((task) => {
    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    task.done === true ? taskDiv.classList.add("task__done") : null;
    taskDiv.setAttribute("data-id", task.id);

    let taskInfo = document.createElement("p");
    taskInfo.classList.add("task__info");
    taskInfo.innerHTML = `${task.title}`;

    let addTask = document.createElement("button");
    addTask.classList.add("del");
    addTask.innerHTML = "Delete";

    taskDiv.appendChild(taskInfo);
    taskDiv.appendChild(addTask);
    tasks.appendChild(taskDiv);
  });
}

function addLocal(inputTask) {
  window.localStorage.setItem("tasks", JSON.stringify(inputTask));
}

function delLocal(taskId) {
  ourTasks = ourTasks.filter((ourTask) => {
    return ourTask.id != taskId;
  });
  addLocal(ourTasks);
}

function addLocalDone(taskId) {
  ourTasks.forEach((task) => {
    if (taskId === task.id) {
      // To Act Like Toggle
      task.done == false ? (task.done = true) : (task.done = false);
    }
  });
  addLocal(ourTasks);
}
