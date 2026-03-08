import { useEffect, useState } from "react";
import api from "../services/api";

function MarksEntryForm() {
  const [students, setStudents] = useState([]);
  const [units, setUnits] = useState([]);

  const [formData, setFormData] = useState({
    studentId: "",
    testType: "",
    unitId: "",
    termName: "",
    mark: "",
    feedback: "",
    homeworkCompletionRate: "",
    behaviorScore: "",
  });

  useEffect(() => {
    fetchStudents();
    fetchUnits();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await api.get("/students");
      setStudents(res.data);
    } catch (error) {
      console.error("Failed to fetch students");
    }
  };

  const fetchUnits = async () => {
    try {
      const res = await api.get("/units");
      setUnits(res.data);
    } catch (error) {
      console.error("Failed to fetch units");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const saveOptionalPerformance = async () => {
    const hasOptionalData =
      formData.feedback ||
      formData.homeworkCompletionRate ||
      formData.behaviorScore;

    if (!hasOptionalData || !formData.studentId) return;

    await api.post("/student-performance", {
      studentId: formData.studentId,
      homeworkCompletionRate: formData.homeworkCompletionRate || null,
      behaviorScore: formData.behaviorScore || null,
      generalFeedback: formData.feedback || "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.studentId || !formData.testType || !formData.mark) {
        alert("Please fill student, test type, and mark.");
        return;
      }

      if (formData.testType === "unit_test_mark") {
        if (!formData.unitId) {
          alert("Please select the unit.");
          return;
        }

        await api.post("/unit-marks", {
          studentId: formData.studentId,
          unitId: formData.unitId,
          unitExamMark: Number(formData.mark),
        });
      }

      if (
        formData.testType === "sir_term_test" ||
        formData.testType === "school_term_test"
      ) {
        if (!formData.termName) {
          alert("Please select the term.");
          return;
        }

        await api.post("/term-test-marks", {
          studentId: formData.studentId,
          testType: formData.testType,
          termName: formData.termName,
          mark: Number(formData.mark),
          feedback: formData.feedback || "",
        });
      }

      await saveOptionalPerformance();

      alert("Marks saved successfully");

      setFormData({
        studentId: "",
        testType: "",
        unitId: "",
        termName: "",
        mark: "",
        feedback: "",
        homeworkCompletionRate: "",
        behaviorScore: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to save marks");
    }
  };

  return (
    <div className="card">
      <h3>Enter Marks</h3>
      <p className="small-text">
        Select student ID and test type. The next field changes automatically.
      </p>

      <form onSubmit={handleSubmit}>
        <select
          name="studentId"
          value={formData.studentId}
          onChange={handleChange}
        >
          <option value="">Select Student ID</option>
          {students.map((student) => (
            <option key={student._id} value={student.studentId}>
              {student.studentId} - {student.fullName}
            </option>
          ))}
        </select>

        <select
          name="testType"
          value={formData.testType}
          onChange={handleChange}
        >
          <option value="">Select Test Type</option>
          <option value="unit_test_mark">Unit Test Mark</option>
          <option value="sir_term_test">Sir&apos;s Term Test Mark</option>
          <option value="school_term_test">School Term Test Mark</option>
        </select>

        {formData.testType === "unit_test_mark" && (
          <select
            name="unitId"
            value={formData.unitId}
            onChange={handleChange}
          >
            <option value="">Select Unit No</option>
            {units.map((unit) => (
              <option key={unit._id} value={unit._id}>
                {unit.unitName} - {unit.termName}
              </option>
            ))}
          </select>
        )}

        {(formData.testType === "sir_term_test" ||
          formData.testType === "school_term_test") && (
          <select
            name="termName"
            value={formData.termName}
            onChange={handleChange}
          >
            <option value="">Select Term</option>
            <option value="1st Term">1st Term</option>
            <option value="2nd Term">2nd Term</option>
            <option value="3rd Term">3rd Term</option>
          </select>
        )}

        <input
          type="number"
          name="mark"
          placeholder="Enter Mark"
          value={formData.mark}
          onChange={handleChange}
          min="0"
          max="100"
        />

        <textarea
          name="feedback"
          placeholder="Feedback (optional)"
          value={formData.feedback}
          onChange={handleChange}
        />

        <input
          type="number"
          name="homeworkCompletionRate"
          placeholder="Homework Completion Rate (optional)"
          value={formData.homeworkCompletionRate}
          onChange={handleChange}
          min="0"
          max="100"
        />

        <input
          type="number"
          name="behaviorScore"
          placeholder="Behavior Score (optional)"
          value={formData.behaviorScore}
          onChange={handleChange}
          min="0"
          max="100"
        />

        <button type="submit">Save Marks</button>
      </form>
    </div>
  );
}

export default MarksEntryForm;