import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'; 
function Todos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const token = localStorage.getItem("token");
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 5;
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "incomplete") return !todo.completed;
    return true;
  });
  
  const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    setLoading(true);
    fetch("http://localhost:8080/todos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch todos");
        return res.json();
      })
      .then((data) => {
        console.log("Fetched todos:", data);
        setTodos(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const toggleCompleted = async (id, currentStatus) => {
    console.log(id);
    await fetch(`http://localhost:8080/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ completed: !currentStatus }),
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:8080/todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchTodos();
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border" /></div>;
  if (error) return <div className="alert alert-danger text-center">{error}</div>;

  return (
    <div className="container mt-4">
      <h3>Todo List</h3>
      <div className="mb-3">
        <button className={`btn btn-sm me-2 ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setFilter("all")}>All</button>
        <button className={`btn btn-sm me-2 ${filter === 'completed' ? 'btn-success' : 'btn-outline-success'}`} onClick={() => setFilter("completed")}>Completed</button>
        <button className={`btn btn-sm ${filter === 'incomplete' ? 'btn-warning' : 'btn-outline-warning'}`} onClick={() => setFilter("incomplete")}>Incomplete</button>
      </div>
      <ul className="list-group">
        {currentTodos
        .map((todo) => (
          <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleCompleted(todo.ID, todo.completed)}
                className="form-check-input me-2"
              />
              {todo.title}
            </div>
            <Link to={`/todos/edit/${todo.ID}`} className="btn btn-sm btn-warning me-2">
              Edit
            </Link>
            <button onClick={() => deleteTodo(todo.ID)} className="btn btn-sm btn-danger">Delete</button>
          </li>
        ))}
      </ul>
      <div className="d-flex justify-content-between align-items-center mt-3">
  <button
    className="btn btn-outline-primary"
    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
  >
    Previous
  </button>
  <span>Page {currentPage}</span>
  <button
    className="btn btn-outline-primary"
    onClick={() =>
      setCurrentPage(prev =>
        indexOfLastTodo < filteredTodos.length ? prev + 1 : prev
      )
    }
    disabled={indexOfLastTodo >= filteredTodos.length}
  >
    Next
  </button>
</div>
    </div>
  );
}

export default Todos;
