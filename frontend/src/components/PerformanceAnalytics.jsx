import { useEffect, useState } from "react";
import api from "../services/api";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  Legend,
} from "recharts";

function PerformanceAnalytics() {
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [summary, setSummary] = useState(null);
  const [termMarks, setTermMarks] = useState([]);
  const [unitMarks, setUnitMarks] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await api.get("/students");
      setStudents(res.data);
    } catch (error) {
      console.error("Failed to fetch students");
    }
  };

  const loadPerformanceData = async () => {
    if (!selectedStudentId) {
      alert("Please select a student");
      return;
    }

    try {
      const [summaryRes, termRes, unitRes] = await Promise.all([
        api.post(`/prediction-summary/${selectedStudentId}`),
        api.get("/term-test-marks"),
        api.get("/unit-marks"),
      ]);

      setSummary(summaryRes.data);

      const filteredTermMarks = termRes.data.filter(
        (item) => item.studentId === selectedStudentId
      );

      const filteredUnitMarks = unitRes.data.filter(
        (item) => item.studentId === selectedStudentId
      );

      setTermMarks(filteredTermMarks);
      setUnitMarks(filteredUnitMarks);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to load performance data");
    }
  };

  const comparisonData = summary
    ? [
        {
          name: "Attendance",
          value: summary.calculated_inputs.attendance_percentage,
        },
        {
          name: "Unit Avg",
          value: summary.calculated_inputs.avg_unit_marks,
        },
        {
          name: "Sir Term Avg",
          value: summary.calculated_inputs.sir_term_test_avg,
        },
        {
          name: "School Term Avg",
          value: summary.calculated_inputs.school_term_test_avg,
        },
      ]
    : [];

  const termTrendData = [
    {
      term: "1st Term",
      sirTerm:
        termMarks.find(
          (item) =>
            item.testType === "sir_term_test" && item.termName === "1st Term"
        )?.mark || 0,
      schoolTerm:
        termMarks.find(
          (item) =>
            item.testType === "school_term_test" &&
            item.termName === "1st Term"
        )?.mark || 0,
    },
    {
      term: "2nd Term",
      sirTerm:
        termMarks.find(
          (item) =>
            item.testType === "sir_term_test" && item.termName === "2nd Term"
        )?.mark || 0,
      schoolTerm:
        termMarks.find(
          (item) =>
            item.testType === "school_term_test" &&
            item.termName === "2nd Term"
        )?.mark || 0,
    },
    {
      term: "3rd Term",
      sirTerm:
        termMarks.find(
          (item) =>
            item.testType === "sir_term_test" && item.termName === "3rd Term"
        )?.mark || 0,
      schoolTerm:
        termMarks.find(
          (item) =>
            item.testType === "school_term_test" &&
            item.termName === "3rd Term"
        )?.mark || 0,
    },
  ];

  const unitMarksData = unitMarks.map((item, index) => ({
    unit: item.unitName || `Unit ${index + 1}`,
    mark: item.unitExamMark,
  }));

  return (
    <div className="card">
      <h3>Student Performance Analytics</h3>
      <p className="small-text">
        View comparative performance trends using stored attendance and marks data.
      </p>

      <select
        value={selectedStudentId}
        onChange={(e) => setSelectedStudentId(e.target.value)}
      >
        <option value="">Select Student ID</option>
        {students.map((student) => (
          <option key={student._id} value={student.studentId}>
            {student.studentId} - {student.fullName}
          </option>
        ))}
      </select>

      <button type="button" onClick={loadPerformanceData}>
        View Performance Analytics
      </button>

      {summary && (
        <div style={{ marginTop: "24px" }}>
          <div className="card" style={{ background: "#fffafc" }}>
            <h3 style={{ marginBottom: "14px" }}>Student Overview</h3>
            <div className="grid two-col">
              <div>
                <p><strong>Student Name:</strong> {summary.fullName}</p>
                <p><strong>Student ID:</strong> {summary.studentId}</p>
              </div>
              <div>
                <p>
                  <strong>Attendance Percentage:</strong>{" "}
                  {summary.calculated_inputs.attendance_percentage}%
                </p>
                <p>
                  <strong>Average Unit Marks:</strong>{" "}
                  {summary.calculated_inputs.avg_unit_marks}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: "14px" }}>Current Academic Comparison</h3>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="value" fill="#e11d48" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: "14px" }}>Term Marks Trend</h3>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={termTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="term" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sirTerm"
                  stroke="#e11d48"
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  dataKey="schoolTerm"
                  stroke="#2563eb"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: "14px" }}>Unit Test Performance</h3>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={unitMarksData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="unit" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="mark" fill="#fb7185" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}

export default PerformanceAnalytics;