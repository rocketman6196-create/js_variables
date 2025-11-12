const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");

// Load tasks from localStorage or initialize empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        tasks.push({ 
            text: taskText, 
            completed: false,
            id: Date.now() // Unique identifier for each task
        });
        taskInput.value = "";
        saveTasks();
        displayTasks();
        taskInput.focus();
    }
}

function displayTasks() {
    taskList.innerHTML = "";
    
    if (tasks.length === 0) {
        const emptyMessage = document.createElement('li');
        emptyMessage.textContent = 'No tasks yet. Add a task above!';
        emptyMessage.classList.add('empty-message');
        taskList.appendChild(emptyMessage);
        return;
    }
    
    // Add task statistics
    const completedCount = tasks.filter(task => task.completed).length;
    const totalCount = tasks.length;
    
    const statsDiv = document.createElement('div');
    statsDiv.classList.add('task-stats');
    statsDiv.textContent = `${completedCount} of ${totalCount} tasks completed`;
    taskList.appendChild(statsDiv);
    
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `task-${index}`;
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => toggleTask(index));
        
        const label = document.createElement("label");
        label.htmlFor = `task-${index}`;
        label.textContent = task.text;
        if (task.completed) {
            label.classList.add("completed");
        }
        
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            deleteTask(index);
        });
        
        li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
}

function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    displayTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event Listeners
addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

clearCompletedBtn.addEventListener("click", clearCompletedTasks);

// Initialize the app
displayTasks();