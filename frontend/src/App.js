import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: '',
    age: '',
    course: ''
  });

  // GET API
  useEffect(() => {
    axios.get('http://localhost:5000/students')
      .then(res => setStudents(res.data))
      .catch(err => console.log(err));
  }, []);

  // Handle input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // POST API
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/students', form)
      .then(res => {
        setStudents([...students, res.data]);
        setForm({ name: '', age: '', course: '' });
      })
      .catch(err => console.log(err));
  };

  // DELETE API
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/students/${id}`)
      .then(res => {
        setStudents(students.filter(s => s._id !== id));
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="container">
      <h2> Student Management</h2>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Enter Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="age"
          placeholder="Enter Age"
          value={form.age}
          onChange={handleChange}
        />

        <input
          name="course"
          placeholder="Enter Course"
          value={form.course}
          onChange={handleChange}
        />

        <button type="submit">Add Student</button>
      </form>

      {/* List */}
      <ul>
        {students.map((s, i) => (
          <li key={i}>
            <strong>{s.name}</strong> - {s.course} ({s.age})
            <button 
              onClick={() => handleDelete(s._id)}
              style={{ marginLeft: '10px', backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px' }}
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