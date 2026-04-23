const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect('mongodb://127.0.0.1:27017/studentDB')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// model
const Student = require('./models/Student');

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Backend API is running', status: 'ok' });
});

// GET API
app.get('/students', async (req, res) => {
  const data = await Student.find();
  res.json(data);
});

// POST API
app.post('/students', async (req, res) => {
  const newStudent = new Student(req.body);
  await newStudent.save();
  res.json(newStudent);
});

// server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});