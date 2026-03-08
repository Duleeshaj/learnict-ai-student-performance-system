const axios = require("axios");
const Student = require("../models/Student");
const UnitAttendance = require("../models/UnitAttendance");
const UnitMark = require("../models/UnitMark");
const StudentPerformance = require("../models/StudentPerformance");

// predict using stored student records
const predictStudentFromRecords = async (req, res) => {
  try {
    const { studentId } = req.params;

    // find student
    const student = await Student.findOne({ studentId });
    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    // get all attendance records of the student
    const attendanceRecords = await UnitAttendance.find({ studentId });

    // calculate attendance percentage
    let attendance_percentage = 0;

    if (attendanceRecords.length > 0) {
      const presentCount = attendanceRecords.filter(
        (record) => record.status === "Present"
      ).length;

      attendance_percentage = (presentCount / attendanceRecords.length) * 100;
    }

    // get all unit marks of the student
    const unitMarks = await UnitMark.find({ studentId });

    // calculate average unit marks
    let avg_unit_marks = 0;

    if (unitMarks.length > 0) {
      const totalUnitMarks = unitMarks.reduce(
        (sum, record) => sum + record.unitExamMark,
        0
      );

      avg_unit_marks = totalUnitMarks / unitMarks.length;
    }

    // get general performance record
    const performance = await StudentPerformance.findOne({ studentId });

    if (!performance) {
      return res.status(404).json({
        message: "Student performance record not found",
      });
    }

    const sir_term_test_avg = performance.sirTermTestAvg || 0;
    const school_term_test_avg = performance.schoolTermTestAvg || 0;
    const homework_completion_rate = performance.homeworkCompletionRate || 0;
    const behavior_score = performance.behaviorScore || 0;

    // send summarized values to Flask AI API
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
        sir_term_test_avg,
        school_term_test_avg,
        homework_completion_rate,
        behavior_score,
      },
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