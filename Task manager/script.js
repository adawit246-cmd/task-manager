// Select elements
const taskInput = document.getElementById('taskinput');
const addBtn = document.getElementById('addbtn');
const taskList = document.getElementById('tasklist');
const taskType = document.getElementById('taskType');
const urgencyLevel = document.getElementById('urgencyLevel');

// Load saved tasks when page refreshes
window.addEventListener('DOMContentLoaded', loadTasks);

// Function to save tasks in localStorage
function saveTasks() {
    const tasks = [];

    document.querySelectorAll('#tasklist li').forEach(li => {
        tasks.push({
            name: li.querySelector('.task-name').textContent,
            type: li.querySelector('.task-type').textContent,
            urgency: li.querySelector('.task-urgency').textContent.replace(' Priority', '')
        });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    savedTasks.forEach(task => {
        createTaskElement(task.name, task.type, task.urgency);
    });
}

// Create task element
function createTaskElement(taskValue, typeValue, urgencyValue) {
    const li = document.createElement('li');

    li.innerHTML = `
        <div class="task-details">
            <span class="task-name">${taskValue}</span>
            <div class="task-info">
                <span class="task-type">${typeValue}</span>
                <span class="task-urgency ${urgencyValue.toLowerCase()}">
                    ${urgencyValue} Priority
                </span>
            </div>
        </div>

        <button class="delete-btn">Delete</button>
    `;

    // Delete task
    li.querySelector('.delete-btn').addEventListener('click', function () {
        li.remove();
        saveTasks();
    });

    taskList.appendChild(li);
}

// Function to add a task
function addTask() {
    const taskValue = taskInput.value.trim();
    const typeValue = taskType.value;
    const urgencyValue = urgencyLevel.value;

    if (taskValue === "") {
        alert("Please enter a task!");
        return;
    }

    // Create and display task
    createTaskElement(taskValue, typeValue, urgencyValue);

    // Save tasks
    saveTasks();

    // Clear input
    taskInput.value = "";
}
// dark mode and light mode
const themeToggle = document.getElementById('themeToggle');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');

    if (document.body.classList.contains('dark')) {
        themeToggle.textContent = "☀️ Light Mode";
    } else {
        themeToggle.textContent = "🌙 Dark Mode";
    }
});

// Event listeners
addBtn.addEventListener('click', addTask);

// Add task on Enter key
taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});