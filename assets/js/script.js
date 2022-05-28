// variables
var formEl = document.querySelector("#task-form");
var pageContentEl = document.querySelector("#page-content");

var taskToDoEl = document.querySelector("#tasks-to-do");
var taskInProgressEl = document.querySelector("#tasks-in-progress");
var taskCompletedEl = document.querySelector("#tasks-completed");

var taskIDCounter = 0;

var tasks = [];

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

      saveTasks();
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

    // checks if form is in edit mode
    var isEdit = formEl.hasAttribute("task-id");
    
    // edits task if it is in edit mode
    if (isEdit) {
        var taskID = formEl.getAttribute("task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskID);
    }
    // creates new task if not in edit mode
    else {        
        // package data as an obj
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do",
            id: taskIDCounter
        }
        
        // appends item to tasks array
        tasks.push(taskDataObj);        
        
        createTaskEl(taskDataObj);
    }

    formEl.reset();

}

// button actions in tasks
var taskButtonHandler = function(event) {
    // get target element from event
    var targetEl = event.target;

    // edit button
    if (targetEl.matches(".edit-btn")) {
        // get id of task
        var taskID = event.target.getAttribute("task-id");
        editTask(taskID);
    }

    // delete button
    if (targetEl.matches(".delete-btn")) {
        // get id of task
        var taskID = event.target.getAttribute("task-id");
        deleteTask(taskID);
    }
}

// edit task
var editTask = function(taskID) {
    console.log(`Editing task #${taskID}`);

    // get id of task
    var taskSelected = document.querySelector(`.task-item[task-id="${taskID}"]`)

    // get task name
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    document.querySelector("input[name='task-name']").value = taskName;

    // get task type
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    document.querySelector("select[name='task-type']").value = taskType;

    document.querySelector("#save-task").textContent = "Save Task";

    formEl.setAttribute("task-id", taskID);
}

// complete edit task
var completeEditTask = function(taskName, taskType, taskID) {
    // get matching task
    var taskSelected = document.querySelector(`.task-item[task-id="${taskID}"]`);

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    // loop through task array
    for (var i = 0; i < tasks.length; i++) {
        if (task[i].id === parseInt(taskID)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    }

    saveTasks();
    alert("Task updated.");

    // turn off edit mode
    formEl.removeAttribute("task-id");
    document.querySelector("#save-task").textContent = "Add Task";

}

// delete task
var deleteTask = function(taskID) {
    var taskSelected = document.querySelector(`.task-item[task-id="${taskID}"]`)
    taskSelected.remove();

    // hold value of task
    var updatedTaskArr = [];
    
    // loop through current tasks
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id !== parseInt(taskID)) {
            updatedTaskArr.push(tasks[i]);
        }
    }

    tasks = updatedTaskArr;
    saveTasks();
}

// changing status of a task
var taskStatusChangeHandler = function(event) {
    // get target element
    var targetEl = event.target;

    // get id of task
    var taskID = targetEl.getAttribute("task-id");

    // convert selected option to lowercase
    var statusValue = targetEl.value.toLowerCase();

    // find parent task item based on id
    var taskSelected = document.querySelector(`.task-item[task-id="${taskID}"]`);

    switch (statusValue) {
        case "to do":
            taskToDoEl.appendChild(taskSelected);
            break;
        case "in progress":
            taskInProgressEl.appendChild(taskSelected);
            break;
        case "completed":
            taskCompletedEl.appendChild(taskSelected);
            break;
    }

    // update tasks in tasks array
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskID)) {
            tasks[i].status = statusValue;
        }
    }

    saveTasks();
}

// saves tasks to local
var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// load tasks from local
var loadTasks = function() {
    // pull data keyed tasks
    savedTasks = localStorage.getItem("tasks");

    // checks if storage is empty
    if (savedTasks === null){
        tasks = [];
        return false;
    }

    // convert pulled data into an obj
    savedTasks = JSON.parse(tasks);

    for (var i = 0; i < tasks.length; i++) {
        createTaskEl(savedTasks[i]);
    }
}

loadTasks();

// listeners
formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);  