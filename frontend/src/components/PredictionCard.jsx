import { useEffect, useState } from "react";
import api from "../services/api";

function PredictionCard() {
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await api.get("/students");
    setStudents(res.data);
  };

  const getRecommendation = (riskLevel, predictedGrade) => {
    if (riskLevel === "HIGH" || predictedGrade === "W") {
      return "Student requires immediate academic intervention and close progress monitoring.";
    }

    if (riskLevel === "MEDIUM" || predictedGrade === "S" || predictedGrade === "C") {
      return "Student should be monitored regularly and given targeted support to improve performance.";
    }

    return "Student is performing at a satisfactory level. Continue current academic guidance and maintain consistency.";
  };

  const handlePredict = async () => {
    if (!selectedStudentId) {
      alert("Please select a student");
      return;
    }

    try {
      const res = await api.post(`/prediction-summary/${selectedStudentId}`);
      setResult(res.data);
    } catch (error) {
      alert(error.response?.data?.message || "Prediction failed");
    }
  };

  return (
    <div className="card">
      <h3>AI Prediction Report</h3>
      <p className="small-text">
        Select a student and generate the current AI-based academic prediction report.
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

      <button type="button" onClick={handlePredict}>
        Get Prediction
      </button>

      {result && (
        <div style={{ marginTop: "24px" }}>
          <div className="card" style={{ background: "#fffafc" }}>
            <h3 style={{ marginBottom: "14px" }}>Student Detail Report</h3>

            <div className="list-item">
              <p><strong>Student Name:</strong> {result.fullName}</p>
              <p><strong>Student ID:</strong> {result.studentId}</p>
            </div>

            <div className="list-item">
              <p>
                <strong>Overall Attendance Percentage:</strong>{" "}
                {result.calculated_inputs.attendance_percentage}%
              </p>
              <p>
                <strong>Average Unit Test Marks:</strong>{" "}
                {result.calculated_inputs.avg_unit_marks}
              </p>
              <p>
                <strong>Average Sir&apos;s Term Test Marks:</strong>{" "}
                {result.calculated_inputs.sir_term_test_avg}
              </p>
              <p>
                <strong>Average School Term Test Marks:</strong>{" "}
                {result.calculated_inputs.school_term_test_avg}
              </p>
            </div>

            <div className="list-item">
              <p>
                <strong>Homework Completion Rate:</strong>{" "}
                {result.calculated_inputs.homework_completion_rate}
              </p>
              <p>
                <strong>Behavior Score:</strong>{" "}
                {result.calculated_inputs.behavior_score}
              </p>
              <p><strong>Feedback:</strong> {result.feedback || "No feedback available"}</p>
            </div>

            <div className="list-item">
              <p><strong>Predicted Grade:</strong> {result.prediction.predicted_grade}</p>
              <p><strong>Performance Trend:</strong> {result.prediction.performance_trend}</p>
              <p><strong>Risk Score:</strong> {result.prediction.risk_score}</p>
              <p><strong>Risk Level:</strong> {result.prediction.risk_level}</p>
            </div>

            <div>
              <p>
                <strong>Recommendation:</strong>{" "}
                {getRecommendation(
                  result.prediction.risk_level,
                  result.prediction.predicted_grade
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PredictionCard;