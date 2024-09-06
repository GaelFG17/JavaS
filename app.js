// Selecciona elementos del DOM
const taskInput = document.getElementById("new-task");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

// Función para agregar tarea
function addTask() {
    const taskText = taskInput.value;

    if (taskText === "") {
        alert("Por favor, escribe una tarea.");
        return;
    }

    // Crear nuevo elemento <li>
    const newTask = document.createElement("li");
    newTask.textContent = taskText;

    // Botón de eliminar
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";
    deleteBtn.classList.add("delete-btn");
    newTask.appendChild(deleteBtn);

    // Agregar evento para marcar como completado
    newTask.addEventListener("click", function () {
        newTask.classList.toggle("completed");
    });

    // Evento para eliminar la tarea
    deleteBtn.addEventListener("click", function (event) {
        event.stopPropagation(); // Evita que se marque como completada al eliminar
        taskList.removeChild(newTask);
    });

    // Añadir la nueva tarea a la lista
    taskList.appendChild(newTask);

    // Limpiar el input
    taskInput.value = "";
}

// Agregar evento al botón para añadir tareas
addTaskBtn.addEventListener("click", addTask);

// Agregar evento para añadir tarea al presionar Enter
taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});
