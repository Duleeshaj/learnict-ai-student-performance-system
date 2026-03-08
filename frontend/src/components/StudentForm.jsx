import { useState } from "react";
import api from "../services/api";

function StudentForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    studentId: "",
    email: "",
    phone: "",
    school: "",
    gradeLevel: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/students", formData);
      alert("Student added successfully");
      setFormData({
        fullName: "",
        studentId: "",
        email: "",
        phone: "",
        school: "",
        gradeLevel: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add student");
    }
  };

  return (
    <div className="card">
      <h3>Add Student</h3>
      <p className="small-text">Enter the basic student details to create a student profile.</p>

      <form onSubmit={handleSubmit}>
        <input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} />
        <input name="studentId" placeholder="Student ID" value={formData.studentId} onChange={handleChange} />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
        <input name="school" placeholder="School" value={formData.school} onChange={handleChange} />
        <input name="gradeLevel" placeholder="Grade Level" value={formData.gradeLevel} onChange={handleChange} />
        <button type="submit">Save Student</button>
      </form>
    </div>
  );
}

export default StudentForm;