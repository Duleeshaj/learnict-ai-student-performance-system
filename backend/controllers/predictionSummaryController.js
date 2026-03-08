const axios = require("axios");
const Student = require("../models/Student");
const UnitAttendance = require("../models/UnitAttendance");
const UnitMark = require("../models/UnitMark");
const StudentPerformance = require("../models/StudentPerformance");
const TermTestMark = require("../models/TermTestMark");

// predict using stored student records
const predictStudentFromRecords = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await Student.findOne({ studentId });
    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    // overall attendance percentage
    const attendanceRecords = await UnitAttendance.find({ studentId });

    let attendance_percentage = 0;

    if (attendanceRecords.length > 0) {
      const presentCount = attendanceRecords.filter(
        (record) => record.status === "Present"
      ).length;

      attendance_percentage = (presentCount / attendanceRecords.length) * 100;
    }

    // average unit marks
    const unitMarks = await UnitMark.find({ studentId });

    let avg_unit_marks = 0;

    if (unitMarks.length > 0) {
      const totalUnitMarks = unitMarks.reduce(
        (sum, record) => sum + record.unitExamMark,
        0
      );

      avg_unit_marks = totalUnitMarks / unitMarks.length;
    }

    // average sir term test marks
    const sirTermMarks = await TermTestMark.find({
      studentId,
      testType: "sir_term_test",
    });

    let sir_term_test_avg = 0;

    if (sirTermMarks.length > 0) {
      const totalSirMarks = sirTermMarks.reduce(
        (sum, record) => sum + record.mark,
        0
      );

      sir_term_test_avg = totalSirMarks / sirTermMarks.length;
    }

    // average school term test marks
    const schoolTermMarks = await TermTestMark.find({
      studentId,
      testType: "school_term_test",
    });

    let school_term_test_avg = 0;

    if (schoolTermMarks.length > 0) {
      const totalSchoolMarks = schoolTermMarks.reduce(
        (sum, record) => sum + record.mark,
        0
      );

      school_term_test_avg = totalSchoolMarks / schoolTermMarks.length;
    }

    // optional practical fields
    const performance = await StudentPerformance.findOne({ studentId });

    const homework_completion_rate =
      performance?.homeworkCompletionRate ?? 0;

    const behavior_score =
      performance?.behaviorScore ?? 0;

    const feedback = performance?.generalFeedback || "";

    // send summarized values to Flask API
    const response = await axios.post(process.env.FLASK_API_URL, {
      attendance_percentage,
      avg_unit_marks,
      sir_term_test_avg,
      school_term_test_avg,
      homework_completion_rate,
      behavior_score,
    });

    res.status(200).json({
      studentId: student.studentId,
      fullName: student.fullName,
      calculated_inputs: {
        attendance_percentage: Number(attendance_percentage.toFixed(2)),
        avg_unit_marks: Number(avg_unit_marks.toFixed(2)),
        sir_term_test_avg: Number(sir_term_test_avg.toFixed(2)),
        school_term_test_avg: Number(school_term_test_avg.toFixed(2)),
        homework_completion_rate,
        behavior_score,
      },
      feedback,
      prediction: response.data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to predict student performance from records",
      error: error.message,
    });
  }
};

module.exports = {
  predictStudentFromRecords,
};