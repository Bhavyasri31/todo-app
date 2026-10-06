import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const getTasks = async () => {
    const response = await fetch("http://localhost:5000/todos");
    const data = await response.json();
    setTodos(data);
  };

  const addTask = async () => {
    if (task.trim() === "") {
      alert("Please enter a task");
      return;
    }

    await fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: task }),
    });

    setTask("");
    getTasks();
  };

  const deleteTask = async (id) => {
    const url = "http://localhost:5000/todos/" + id;

    await fetch(url, {
      method: "DELETE",
    });

    getTasks();
  };

  const toggleTask = async (id, completed) => {
    const url = "http://localhost:5000/todos/" + id;

    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: completed ? 0 : 1,
      }),
    });

    getTasks();
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="container">
      <h1>My To-Do List</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button className="add-button" onClick={addTask}>
          Add Task
        </button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed === 1}
              onChange={() => toggleTask(todo.id, todo.completed)}
            />

            <span
              className={
                todo.completed === 1
                  ? "task-text completed"
                  : "task-text"
              }
            >
              {todo.task}
            </span>

            <button
              className="delete-button"
              onClick={() => deleteTask(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;