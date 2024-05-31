document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('btn-task');
    const newTaskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');
    const notification = document.getElementById('notification');
    const maxTasks = 8;

    addTaskBtn.addEventListener('click', () => {
        const taskText = newTaskInput.value.trim();
        if (taskText !== "") {
            if (taskList.children.length < maxTasks) {
                addTask(taskText);
                saveTasks();
                newTaskInput.value = "";
                newTaskInput.focus();
            } else {
                showNotification("Você atingiu o limite máximo de 8 tarefas.");
            }
        }
    });

    newTaskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskBtn.click();
        }
    });

    taskList.addEventListener('click', (e) => {
        const targetTask = e.target.closest('li');
        const targetContent = e.target.closest('.task-content');
        if (targetTask) {
            targetTask.classList.toggle('completed');
            saveTasks();
        } else if (targetContent) {
            const task = targetContent.parentElement;
            task.classList.toggle('completed');
            saveTasks();
        }
    });

    function addTask(taskText, completed = false) {
        const li = document.createElement('li');
        const taskContent = document.createElement('div');
        taskContent.textContent = taskText;
        taskContent.classList.add('task-content');
    
        if (completed) {
            li.classList.add('completed');
        }
    
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
    
        deleteBtn.addEventListener('click', () => {
            li.remove();
            saveTasks();
        });
    
        li.appendChild(taskContent);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    }
    
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.textContent.replace('Deletar', '').trim(),
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTask(task.text, task.completed));
    }

    function showNotification(message) {
        console.log("Exibindo notificação:", message); // Log de depuração
        notification.textContent = message;
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }

    loadTasks();
});
