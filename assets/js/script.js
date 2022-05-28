// button varsiables
var btnE1 = window.document.querySelector("#save-task");

// list variables
var taskToDoE1 = document.querySelector("#tasks-to-do");

// create list item
var createTaskHandler = function() {
    var taskItemE1 = document.createElement("li");
    taskItemE1.className = "task-item";
    taskItemE1.textContent = "This is a new task.";
    taskToDoE1.appendChild(taskItemE1);
}

// main
btnE1.addEventListener("click", createTaskHandler);