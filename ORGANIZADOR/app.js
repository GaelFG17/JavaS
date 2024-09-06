// Función para hacer las tareas arrastrables
function enableDragAndDrop() {
    const tasks = document.querySelectorAll('.task');
    const columns = document.querySelectorAll('.task-list');

    tasks.forEach(task => {
        task.addEventListener('dragstart', function (event) {
            event.dataTransfer.setData('text/plain', task.id);
        });
    });

    columns.forEach(column => {
        column.addEventListener('dragover', function (event) {
            event.preventDefault();
        });

        column.addEventListener('drop', function (event) {
            event.preventDefault();
            const taskId = event.dataTransfer.getData('text/plain');
            const task = document.getElementById(taskId);
            column.appendChild(task);
        });
    });
}

// Función para agregar una nueva tarea
function addTask(column, taskText) {
    const task = document.createElement('div');
    task.classList.add('task');
    task.setAttribute('draggable', 'true');
    task.textContent = taskText;

    // Generar un ID único para cada tarea
    const taskId = 'task-' + Date.now();
    task.setAttribute('id', taskId);

    // Agregar la tarea a la columna correspondiente
    column.appendChild(task);

    // Habilitar drag and drop en la nueva tarea
    enableDragAndDrop();
}

// Evento para agregar nuevas tareas en la primera columna (Por Hacer)
document.querySelector('.add-task-btn').addEventListener('click', function () {
    const taskInput = document.querySelector('.new-task-input');
    const taskText = taskInput.value;

    if (taskText === '') {
        alert('Por favor, escribe una tarea.');
        return;
    }

    const todoColumn = document.getElementById('todo-list');
    addTask(todoColumn, taskText);

    // Limpiar el campo de entrada
    taskInput.value = '';
});

enableDragAndDrop();
