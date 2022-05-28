// variables
var formEl = document.querySelector("#task-form");
var taskToDoEl = document.querySelector("#tasks-to-do");
var taskIDCounter = 0;
var pageContentEl = document.querySelector("#page-content");

// create task
var createTaskEl = function(taskDataObj) {
      // create task item
      var taskItemEl = document.createElement("li");
      taskItemEl.className = "task-item"; 

      // add task id to list item
      taskItemEl.setAttribute("task-id", taskIDCounter);
      
      // create task info
      var taskInfoEl = document.createElement("div");
      taskInfoEl.className = "task-info";;
      taskInfoEl.innerHTML = `<h3 class='task-name'>${taskDataObj.name}</h3><span class='task-type'>${taskDataObj.type}</span>`;
      
      // add task info to task item
      taskItemEl.appendChild(taskInfoEl);
      
      // create task actions
      var taskActionsEl = createTaskActions(taskIDCounter);

      // add task action to task item
      taskItemEl.appendChild(taskActionsEl);
  
      // add task item to HTML
      taskToDoEl.appendChild(taskItemEl);
      

      // increment id counter
      taskIDCounter++;
}

// tasks actions
var createTaskActions = function(taskID) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // edit button //
    // create edit button
    var editButtonEL = document.createElement("button");
    editButtonEL.textContent = "Edit";
    editButtonEL.className = "btn edit-btn";
    editButtonEL.setAttribute("task-id", taskID);

    // add edit button to HTML
    actionContainerEl.appendChild(editButtonEL);

    // delete button //
    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("task-id", taskID);

    // add delete button to HTML
    actionContainerEl.appendChild(deleteButtonEl);

    // select button //
    // create status select
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("task-id", taskID);

    // add status select to HTML
    actionContainerEl.appendChild(statusSelectEl);

    // status select choices
    var statusChoices = ["To Do", "In Progress", "Completed"];

    // populate status select with choices
    for (var i = 0; i < statusChoices.length; i++) {
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        // append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
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

// button actions in tasks
var taskButtonHandler = function(event) {
    console.log(event.target);

    // delete button
    if (event.target.matches(".delete-btn")) {
        // get element id
        var taskID = event.target.getAttribute("task-id");
        deleteTask(taskID);
    }
}

// delete task
var deleteTask = function(taskID) {
    console.log(taskID);
}

// listeners
formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);