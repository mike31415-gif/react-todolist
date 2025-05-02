import React, { useState } from 'react';
import './TodoForm.css';

function TodoForm({ onTodoAdded }) {
    const [title, setTitle] = useState('');
    const [completed, setCompleted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const todo = {
        title,
        completed,
      };
    try {
      const response = await fetch('http://localhost:8080/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(todo),
      });

      if (response.ok) {
        const newTodo = await response.json();
        onTodoAdded && onTodoAdded(newTodo);
        setTitle('');
        setCompleted(false);
      } else {
        alert('Failed to add todo');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Network error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="mb-3">
        <label htmlFor="todoTitle" className="form-label">Todo Title</label>
        <input
          type="text"
          className="form-control"
          id="todoTitle"
          placeholder="Enter a todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          id="completedCheck"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="completedCheck">
          Completed
        </label>
      </div>

      <button type="submit" className="btn btn-primary">Add Todo</button>
    </form>
  );
};

export default TodoForm;