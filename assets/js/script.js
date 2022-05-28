// variables
var formEl = document.querySelector("#task-form");
var taskToDoEl = document.querySelector("#tasks-to-do");

// create list item
var createTaskEl = function(taskDataObj) {
      // create list item
      var taskItemEl = document.createElement("li");
      taskItemEl.className = "task-item"; 
      
      // create list item info
      var taskInfoEl = document.createElement("div");
      taskInfoEl.className = "task-info";;
      taskInfoEl.innerHTML = `<h3 class='task-name'>${taskDataObj.name}</h3><span class='task-type'>${taskDataObj.type}</span>`;
      
      // add list info to item
      taskItemEl.appendChild(taskInfoEl);
  
      // add list item to HTML
      taskToDoEl.appendChild(taskItemEl);   
}

// object creation for form submission
var taskFormHandler = function() {

    event.preventDefault();

    // grab form values
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    if (!taskNameInput || !taskTypeInput) {
        alert("Please fill out task form.");
        return;
    }
        
    // package data as an obj
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    }
    
    createTaskEl(taskDataObj);
    formEl.reset();
}

// listeners
formEl.addEventListener("submit", taskFormHandler);