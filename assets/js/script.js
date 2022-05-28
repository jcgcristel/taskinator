// variables
var formEl = document.querySelector("#task-form");
var taskToDoEl = document.querySelector("#tasks-to-do");

// create list item
var createTaskHandler = function() {

    event.preventDefault();

    // grab form values
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // create list item
    var taskItemEl = document.createElement("li");
    taskItemEl.className = "task-item"; 
    
    // create list item info
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";;
    taskInfoEl.innerHTML = `<h3 class='task-name'>${taskNameInput}</h3><span class='task-type'>${taskTypeInput}</span>`;
    
    // add list info to item
    taskItemEl.appendChild(taskInfoEl);

    // add list item to HTML
    taskToDoEl.appendChild(taskItemEl);   
}

// listeners
formEl.addEventListener("submit", createTaskHandler);