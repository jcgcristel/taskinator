// form variable
var formEl = document.querySelector("#task-form");

// list variables
var taskToDoEl = document.querySelector("#tasks-to-do");

// create list item
var createTaskHandler = function() {

    event.preventDefault();

    var taskItemEl = document.createElement("li");
    taskItemEl.className = "task-item";
    taskItemEl.textContent = "This is a new task.";
    taskToDoEl.appendChild(taskItemEl);
}

// listeners
formEl.addEventListener("submit", createTaskHandler);