import React, { useState } from 'react';

const CreateTodo = () => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await fetch('http://localhost:8080/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title }),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        setTitle('');
      } else {
        alert(data.error || 'Error');
      }
    } catch {
      alert('Network error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter todo"
        required
      />
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateTodo;
