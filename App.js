import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


const API_BASE_URL = 'http://localhost:5000'; 

function App() {
  const [employees, setEmployees] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [performanceEvaluations, setPerformanceEvaluations] = useState([]);
  
  const [newEmployee, setNewEmployee] = useState({ name: '', position: '' });
  const [newAttendance, setNewAttendance] = useState({ employeeId: '', date: '', status: '' });
  const [newLeave, setNewLeave] = useState({ employeeId: '', startDate: '', endDate: '', reason: '' });
  const [newPerformance, setNewPerformance] = useState({ employeeId: '', score: '', date: '' });

  // Fetch data from backend
  useEffect(() => {
    fetchEmployees();
    fetchAttendance();
    fetchLeaves();
    fetchPerformance();
  }, []);

  const fetchEmployees = async () => {
    const response = await axios.get(`${API_BASE_URL}/api/employees`);
    setEmployees(response.data);
  };

  const fetchAttendance = async () => {
    const response = await axios.get(`${API_BASE_URL}/api/attendance`);
    setAttendanceRecords(response.data);
  };

  const fetchLeaves = async () => {
    const response = await axios.get(`${API_BASE_URL}/api/leaves`);
    setLeaveRequests(response.data);
  };

  const fetchPerformance = async () => {
    const response = await axios.get(`${API_BASE_URL}/api/performance`);
    setPerformanceEvaluations(response.data);
  };

  // Add Employee
  const addEmployee = async () => {
    const response = await axios.post(`${API_BASE_URL}/api/employees`, newEmployee);
    setEmployees([...employees, { id: response.data.id, ...newEmployee }]);
    setNewEmployee({ name: '', position: '' });
  };

  // Add Attendance
  const addAttendance = async () => {
    const response = await axios.post(`${API_BASE_URL}/api/attendance`, newAttendance);
    setAttendanceRecords([...attendanceRecords, { id: response.data.id, ...newAttendance }]);
    setNewAttendance({ employeeId: '', date: '', status: '' });
  };

  // Add Leave Request
  const addLeaveRequest = async () => {
    const response = await axios.post(`${API_BASE_URL}/api/leaves`, newLeave);
    setLeaveRequests([...leaveRequests, { id: response.data.id, ...newLeave }]);
    setNewLeave({ employeeId: '', startDate: '', endDate: '', reason: '' });
  };

  // Add Performance Evaluation
  const addPerformance = async () => {
    const response = await axios.post(`${API_BASE_URL}/api/performance`, newPerformance);
    setPerformanceEvaluations([...performanceEvaluations, { id: response.data.id, ...newPerformance }]);
    setNewPerformance({ employeeId: '', score: '', date: '' });
  };

  return (
    <div className="App">
      <h1>Employee Management System</h1>

      <h2>Add Employee</h2>
      <input
        type="text"
        placeholder="Name"
        value={newEmployee.name}
        onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Position"
        value={newEmployee.position}
        onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
      />
      <button onClick={addEmployee}>Add Employee</button>

      <h2>Employees List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.position}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Add Attendance</h2>
      <input
        type="number"
        placeholder="Employee ID"
        value={newAttendance.employeeId}
        onChange={(e) => setNewAttendance({ ...newAttendance, employeeId: e.target.value })}
      />
      <input
        type="date"
        value={newAttendance.date}
        onChange={(e) => setNewAttendance({ ...newAttendance, date: e.target.value })}
      />
      <select
        value={newAttendance.status}
        onChange={(e) => setNewAttendance({ ...newAttendance, status: e.target.value })}
      >
        <option value="">Select Status</option>
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
        <option value="Leave">Leave</option>
      </select>
      <button onClick={addAttendance}>Add Attendance</button>

      <h2>Attendance Records</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee ID</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.map(record => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.employeeId}</td>
              <td>{record.date}</td>
              <td>{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Add Leave Request</h2>
      <input
        type="number"
        placeholder="Employee ID"
        value={newLeave.employeeId}
        onChange={(e) => setNewLeave({ ...newLeave, employeeId: e.target.value })}
      />
      <input
        type="date"
        value={newLeave.startDate}
        onChange={(e) => setNewLeave({ ...newLeave, startDate: e.target.value })}
      />
      <input
        type="date"
        value={newLeave.endDate}
        onChange={(e) => setNewLeave({ ...newLeave, endDate: e.target.value })}
      />
      <input
        type="text"
        placeholder="Reason"
        value={newLeave.reason}
        onChange={(e) => setNewLeave({ ...newLeave, reason: e.target.value })}
      />
      <button onClick={addLeaveRequest}>Add Leave Request</button>

      <h2>Leave Requests</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee ID</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map(leave => (
            <tr key={leave.id}>
              <td>{leave.id}</td>
              <td>{leave.employeeId}</td>
              <td>{leave.startDate}</td>
              <td>{leave.endDate}</td>
              <td>{leave.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Add Performance Evaluation</h2>
      <input
        type="number"
        placeholder="Employee ID"
        value={newPerformance.employeeId}
        onChange={(e) => setNewPerformance({ ...newPerformance, employeeId: e.target.value })}
      />
      <input
        type="number"
        placeholder="Score"
        value={newPerformance.score}
        onChange={(e) => setNewPerformance({ ...newPerformance, score: e.target.value })}
      />
      <input
        type="date"
        value={newPerformance.date}
        onChange={(e) => setNewPerformance({ ...newPerformance, date: e.target.value })}
      />
      <button onClick={addPerformance}>Add Performance Evaluation</button>

      <h2>Performance Evaluations</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee ID</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {performanceEvaluations.map(performance => (
            <tr key={performance.id}>
              <td>{performance.id}</td>
              <td>{performance.employeeId}</td>
              <td>{performance.score}</td>
              <td>{performance.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
