let tasks = [];

const AddNewTask = () => {
  const Task = document.getElementById("add").value;
  const Date = document.getElementById("EdDate").value;
  const task = { Task, Date, status: "new" };
  if (Task != "" && Date != "") {
    const storedTasks = JSON.parse(localStorage.getItem("Tasks")) || [];
    const AllArrayOfObjects = [...storedTasks, task];
    TaskObj = JSON.stringify(AllArrayOfObjects);
    localStorage.setItem("Tasks", TaskObj);
  }
  if (!Task || !Date) {
    alert("please enter a compleat task");
  } else {
    tasks = JSON.parse(window.localStorage.Tasks) || [];
    PushAllTasks();
  }
  window.location.reload();
};

const RenderTask = (task, index) => {
  document.getElementById("list").innerHTML += `
    <li>
        <div class="li_Text">
            <input
             type="checkbox"
             onchange="handleChecked(event, ${index})"
              ${task.status === "completed" ? "checked" : ""}
            />
            <span class="textTdo ${
              task.status === "completed" ? "checked" : ""
            }">${task.Task}</span>
        </div>
        <span class="${task.status === "completed" ? "checked" : ""}">ED: ${
    task.Date
  }</span>
        <button class="trashBTN" onclick="DeleteToDo(${index})">🗑️</button>
    </li>
    `;
};

const NumberOfTasks = () => {
  document.getElementById("number").innerHTML += `
  <span>You have ${tasks.length} Tasks To to!!</span>
  `;
};
const DeleteAllBTN = (index) => {
  document.getElementById("Delete_All").innerHTML += `
  <button class="Delete_All" onclick="DeleteAllTasks(${index})" >Delete All</button>
  `;
};
const DeleteAllTasks = (index) => {
  tasks.splice(0, index);
  localStorage.setItem("Tasks", JSON.stringify(tasks));
  window.location.reload();
};

const PushAllTasks = () => {
  let i = 0;
  for (; i < tasks.length; i++) {
    RenderTask(tasks[i], i);
  }
  NumberOfTasks();
  DeleteAllBTN(i);
};

const loadTasks = () => {
  tasks = JSON.parse(window.localStorage.Tasks) || [];
  PushAllTasks();
};

const DeleteToDo = (index) => {
  tasks.splice(index, 1);
  localStorage.setItem("Tasks", JSON.stringify(tasks));
  window.location.reload();
};

const handleChecked = (event, index) => {
  const isChecked = event.target.checked;
  tasks[index].status = isChecked ? "completed" : "new";
  localStorage.setItem("Tasks", JSON.stringify(tasks));
  window.location.reload();
  PushAllTasks();
};
