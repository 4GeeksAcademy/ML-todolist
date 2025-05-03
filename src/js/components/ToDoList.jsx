import React, { useState } from "react";

const ToDoList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && newTask.trim() !== "") {
            setTasks([...tasks, newTask.trim()]);
            setNewTask("");
        }
    };

    const handleDelete = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    return (
        <div className="todo-container">
            <input
                type="text"
                placeholder="Añadir nueva tarea"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={handleKeyPress}
            />
            <ul>
                {tasks.length === 0 ? (
                    <li className="no-tasks">No hay tareas, añadir tareas</li>
                ) : (
                    tasks.map((task, index) => (
                        <li
                            key={index}
                            className="task-item"
                            style={{ position: "relative" }}
                        >
                            {task}
<span
    className="delete-icon"
    onClick={() => handleDelete(index)}
    style={{
        position: "relative",
        right: "-9px",
        cursor: "pointer",
    }}
>
    ❌
</span>
                        </li>
                    ))
                )}
            </ul>
            <style>
                {`
                .task-item {
    position: relative;
}

.delete-icon {
    display: none; /* Ocultar por defecto */
    position: relative;
    right: -40px; /* Ajustar la posición del ícono */
    cursor: pointer;
}

.task-item:hover .delete-icon {
    display: inline; /* Mostrar el ícono al pasar el mouse */
}
                `}
            </style>
        </div>
    );
};

export default ToDoList;