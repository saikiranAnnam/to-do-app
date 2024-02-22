document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    // Load tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task');
            if (task.completed) {
                taskElement.classList.add('completed');
            }
            taskElement.innerHTML = `
                <div>${task.text}</div>
                <div class="actions">
                    <button onclick="toggleTask(${index})">${task.completed ? 'Uncomplete' : 'Complete'}</button>
                    <button onclick="editTask(${index})">Edit</button>
                    <button onclick="deleteTask(${index})">Delete</button>
                </div>
            `;
            taskList.appendChild(taskElement);
        });
    }

    // Add new task
    function addTask(text) {
        tasks.push({ text, completed: false });
        saveTasks();
    }

    // Edit task
    function editTask(index) {
        const newText = prompt('Enter new text for the task:', tasks[index].text);
        if (newText !== null) {
            tasks[index].text = newText;
            saveTasks();
        }
    }

    // Delete task
    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
    }

    // Toggle task completion
    function toggleTask(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
    }

    // Save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    // Event listener for adding new task
    addTaskButton.addEventListener('click', function() {
        if (taskInput.value.trim() !== '') {
            addTask(taskInput.value.trim());
            taskInput.value = '';
        }
    });

    // Initial render
    renderTasks();
});
