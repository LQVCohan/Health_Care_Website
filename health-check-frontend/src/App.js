import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/appointments";

function App() {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({ name: "", date: "", symptoms: "" });

  // Lấy danh sách lịch khám từ server
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setAppointments(response.data))
      .catch((error) => console.error("Error fetching appointments:", error));
  }, []);

  // Xử lý khi người dùng gửi form
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(API_URL, form)
      .then((response) => {
        setAppointments([...appointments, response.data]);
        setForm({ name: "", date: "", symptoms: "" });
      })
      .catch((error) => console.error("Error creating appointment:", error));
  };

  // Xử lý thay đổi dữ liệu form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="App">
      <h1>Health Check Appointment</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <textarea
          name="symptoms"
          placeholder="Describe your symptoms"
          value={form.symptoms}
          onChange={handleChange}
        />
        <button type="submit">Book Appointment</button>
      </form>

      <h2>Appointments List</h2>
      <ul>
        {appointments.map((appt) => (
          <li key={appt.id}>
            <strong>{appt.name}</strong> - {appt.date} - {appt.symptoms}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
