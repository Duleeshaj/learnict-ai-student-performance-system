import { useEffect, useState } from "react";
import api from "../services/api";

function PerformanceForm() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    studentId: "",
    sirTermTestAvg: "",
    schoolTermTestAvg: "",
    homeworkCompletionRate: "",
    behaviorScore: "",
    generalFeedback: "",
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await api.get("/students");
    setStudents(res.data);
  };

  const handleStudentChange = (e) => {
    setFormData({
      ...formData,
      studentId: e.target.value,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/student-performance", formData);
      alert("Performance saved successfully");
      setFormData({
        studentId: "",
        sirTermTestAvg: "",
        schoolTermTestAvg: "",
        homeworkCompletionRate: "",
        behaviorScore: "",
        generalFeedback: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to save performance");
    }
  };

  return (
    <div className="card">
      <h3>Save General Performance</h3>
      <form onSubmit={handleSubmit}>
        <select value={formData.studentId} onChange={handleStudentChange}>
          <option value="">Select Student</option>
          {students.map((student) => (
            <option key={student._id} value={student.studentId}>
              {student.fullName} ({student.studentId})
            </option>
          ))}
        </select>

        <input name="sirTermTestAvg" placeholder="Sir Term Test Average" value={formData.sirTermTestAvg} onChange={handleChange} />
        <input name="schoolTermTestAvg" placeholder="School Term Test Average" value={formData.schoolTermTestAvg} onChange={handleChange} />
        <input name="homeworkCompletionRate" placeholder="Homework Completion Rate" value={formData.homeworkCompletionRate} onChange={handleChange} />
        <input name="behaviorScore" placeholder="Behavior Score" value={formData.behaviorScore} onChange={handleChange} />
        <textarea name="generalFeedback" placeholder="General Feedback" value={formData.generalFeedback} onChange={handleChange} />
        <button type="submit">Save Performance</button>
      </form>
    </div>
  );
}

export default PerformanceForm;