import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditTodo() {
  const { id } = useParams(); // Get the todo id from the URL
  const navigate = useNavigate();

  const [todo, setTodo] = useState({ title: '', completed: false });
  const [loading, setLoading] = useState(true);

  // Fetch the todo details when component mounts
  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8080/todos/${id}`,{
            method:'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.ok) {
          const todoData = await response.json();
          setTodo({
            title: todoData.title,
            completed: todoData.completed,
          });
        } else {
          alert('Todo not found');
        }
      } catch (error) {
        alert('Failed to fetch todo');
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const updatedTodo = {
      title: todo.title,
      completed: todo.completed,
    };

    try {
      const response = await fetch(`http://localhost:8080/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedTodo),
      });

      if (response.ok) {
        alert('Todo updated successfully!');
        navigate('/todos'); // Redirect to the todos page
      } else {
        alert('Failed to update todo');
      }
    } catch (error) {
      alert('Network error');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h3>Edit Todo</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            id="completed"
            className="form-check-input"
            checked={todo.completed}
            onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
          />
          <label className="form-check-label" htmlFor="completed">
            Completed
          </label>
        </div>

        <button type="submit" className="btn btn-primary mt-2">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditTodo;
