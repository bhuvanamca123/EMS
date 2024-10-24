const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  
  password: '12345',   
  database: 'emp_mgt' 
});

// Connect to MySQL
db.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected...');
});

// API to fetch all employees
app.get('/api/employees', (req, res) => {
  db.query('SELECT * FROM employees', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// API to add a new employee
app.post('/api/employees', (req, res) => {
  const { name, position } = req.body;
  db.query('INSERT INTO employees (name, position) VALUES (?, ?)', [name, position], (err, result) => {
    if (err) throw err;
    res.json({ success: true, id: result.insertId });
  });
});

// API to fetch attendance records
app.get('/api/attendance', (req, res) => {
  db.query('SELECT * FROM attendance', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// API to add attendance
app.post('/api/attendance', (req, res) => {
  const { employeeId, date, status } = req.body;
  db.query('INSERT INTO attendance (employeeId, date, status) VALUES (?, ?, ?)', [employeeId, date, status], (err, result) => {
    if (err) throw err;
    res.json({ success: true, id: result.insertId });
  });
});

// API to fetch leave requests
app.get('/api/leaves', (req, res) => {
  db.query('SELECT * FROM leaves', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// API to add leave request
app.post('/api/leaves', (req, res) => {
  const { employeeId, startDate, endDate, reason } = req.body;
  db.query('INSERT INTO leaves (employeeId, startDate, endDate, reason) VALUES (?, ?, ?, ?)', [employeeId, startDate, endDate, reason], (err, result) => {
    if (err) throw err;
    res.json({ success: true, id: result.insertId });
  });
});

// API to fetch performance evaluations
app.get('/api/performance', (req, res) => {
  db.query('SELECT * FROM performance', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// API to add performance evaluation
app.post('/api/performance', (req, res) => {
  const { employeeId, score, date } = req.body;
  db.query('INSERT INTO performance (employeeId, score, date) VALUES (?, ?, ?)', [employeeId, score, date], (err, result) => {
    if (err) throw err;
    res.json({ success: true, id: result.insertId });
  });
});

// Start the server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
