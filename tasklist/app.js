// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM load event
  document.addEventListener('DOMContentLoaded',getTasks);
  // Add task event
  form.addEventListener('submit', addTaskFromForm);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

// Load tasks from local storage
function getTasks(){
  tasks = JSON.parse(localStorage.getItem('tasks'));
  if (tasks !== null) {
    tasks.forEach(function(task) {
      addTask(task);
    })
  }
}

// Add Task to page
function addTask(task) {
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // Append the link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);
}

// Add Task from form
function addTaskFromForm(e) {
  if(taskInput.value !== '') {
    addTask(taskInput.value);
    // Add local storage
    addTaskToLocalStorage(taskInput.value);
    // Clear input
    taskInput.value = '';
  }
  // Prevent default submit behavior
  e.preventDefault();
}

function addTaskToLocalStorage(task){
  tasks = JSON.parse(localStorage.getItem('tasks'));
  if (tasks === null) {
    tasks = [];
  }
    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Remove Task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are You Sure?')) {
      taskItem = e.target.parentElement.parentElement;
      taskItem.remove();
      removeTaskFromLocalStorage(taskItem);
    }
  }
}

function removeTaskFromLocalStorage(taskItem) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
  if (tasks !== null) {
    //Remove first match and write to local storage
    tasks.some(function(task, index) {
      if(taskItem.textContent === task) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks))
      }
      return taskItem.textContent === task
    })
  }
}

// Clear Tasks
function clearTasks() {
  if(taskList.firstChild) {
    if(confirm('Are You Sure?')) {
      // taskList.innerHTML = '';
      // Faster, more info: https://jsperf.com/innerhtml-vs-removechild
      while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
      }
      localStorage.removeItem('tasks');
    }
  }
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  taskList.childNodes.forEach(function(task){
    const item = task.firstChild.textContent.toLowerCase();
    // Search first match than return position, -1 for no matches
    if(item.indexOf(text) !== -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}