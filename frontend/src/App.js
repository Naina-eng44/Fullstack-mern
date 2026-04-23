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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // GET API
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    setLoading(true);
    setError(null);
    axios.get('http://localhost:5000/students')
      .then(res => {
        console.log('Students fetched:', res.data);
        setStudents(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching students:', err.message);
        setError(`Error fetching students: ${err.message}`);
        setLoading(false);
      });
  };

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

    if (!form.name || !form.age || !form.course) {
      setError('Please fill in all fields');
      return;
    }

    axios.post('http://localhost:5000/students', form)
      .then(res => {
        console.log('Student added:', res.data);
        setStudents([...students, res.data]);
        setForm({ name: '', age: '', course: '' });
        setError(null);
      })
      .catch(err => {
        console.error('Error adding student:', err.message);
        setError(`Error adding student: ${err.message}`);
      });
  };

  // DELETE API
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/students/${id}`)
      .then(res => {
        console.log('Student deleted:', res.data);
        setStudents(students.filter(s => s._id !== id));
        setError(null);
      })
      .catch(err => {
        console.error('Error deleting student:', err.message);
        setError(`Error deleting student: ${err.message}`);
      });
  };

  return (
    <div className="container">
      <h2> Student Management</h2>

      {error && (
        <div style={{ 
          backgroundColor: '#f8d7da', 
          color: '#721c24', 
          padding: '10px', 
          borderRadius: '4px', 
          marginBottom: '10px',
          border: '1px solid #f5c6cb'
        }}>
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Enter Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="age"
          placeholder="Enter Age"
          type="number"
          value={form.age}
          onChange={handleChange}
          required
        />

        <input
          name="course"
          placeholder="Enter Course"
          value={form.course}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Student</button>
      </form>

      {/* Loading State */}
      {loading && <p>Loading students...</p>}

      {/* List */}
      {!loading && (
        <>
          {students.length === 0 ? (
            <p>No students found. Add one to get started!</p>
          ) : (
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
          )}
        </>
      )}
    </div>
  );
}

export default App;