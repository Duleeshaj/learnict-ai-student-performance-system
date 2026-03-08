import { useEffect, useState } from "react";
import api from "../services/api";

function AttendanceForm() {
  const [students, setStudents] = useState([]);
  const [units, setUnits] = useState([]);
  const [formData, setFormData] = useState({
    qrCodeValue: "",
    unitId: "",
    attendanceDate: "",
    status: "Present",
  });

  useEffect(() => {
    fetchStudents();
    fetchUnits();
  }, []);

  const fetchStudents = async () => {
    const res = await api.get("/students");
    setStudents(res.data);
  };

  const fetchUnits = async () => {
    const res = await api.get("/units");
    setUnits(res.data);
  };

  const handleStudentChange = (e) => {
    const selectedStudentId = e.target.value;
    const selectedStudent = students.find((s) => s._id === selectedStudentId);

    setFormData({
      ...formData,
      qrCodeValue: selectedStudent ? selectedStudent.qrCodeValue : "",
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
      await api.post("/unit-attendance/mark", formData);
      alert("Attendance marked successfully");
      setFormData({
        qrCodeValue: "",
        unitId: "",
        attendanceDate: "",
        status: "Present",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to mark attendance");
    }
  };

  return (
    <div className="card">
      <h3>Mark Unit Attendance</h3>
      <form onSubmit={handleSubmit}>
        <select onChange={handleStudentChange} defaultValue="">
          <option value="">Select Student</option>
          {students.map((student) => (
            <option key={student._id} value={student._id}>
              {student.fullName} ({student.studentId})
            </option>
          ))}
        </select>

        <select name="unitId" value={formData.unitId} onChange={handleChange}>
          <option value="">Select Unit</option>
          {units.map((unit) => (
            <option key={unit._id} value={unit._id}>
              {unit.unitName}
            </option>
          ))}
        </select>

        <input
          name="attendanceDate"
          type="date"
          value={formData.attendanceDate}
          onChange={handleChange}
        />

        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>

        <button type="submit">Save Attendance</button>
      </form>
    </div>
  );
}

export default AttendanceForm;