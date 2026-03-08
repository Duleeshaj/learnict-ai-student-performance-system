const StudentPerformance = require("../models/StudentPerformance");
const Student = require("../models/Student");

// create or update optional general student performance data
const saveStudentPerformance = async (req, res) => {
  try {
    const {
      studentId,
      homeworkCompletionRate,
      behaviorScore,
      generalFeedback,
    } = req.body;

    const student = await Student.findOne({ studentId });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    let performance = await StudentPerformance.findOne({ studentId });

    if (performance) {
      performance.homeworkCompletionRate =
        homeworkCompletionRate ?? performance.homeworkCompletionRate;

      performance.behaviorScore =
        behaviorScore ?? performance.behaviorScore;

      performance.generalFeedback =
        generalFeedback ?? performance.generalFeedback;

      const updatedPerformance = await performance.save();
      return res.status(200).json(updatedPerformance);
    }

    const newPerformance = new StudentPerformance({
      student: student._id,
      studentId: student.studentId,
      fullName: student.fullName,
      homeworkCompletionRate: homeworkCompletionRate ?? null,
      behaviorScore: behaviorScore ?? null,
      generalFeedback: generalFeedback || "",
    });

    const savedPerformance = await newPerformance.save();

    res.status(201).json(savedPerformance);
  } catch (error) {
    res.status(500).json({
      message: "Failed to save student performance",
      error: error.message,
    });
  }
};

// get all student performance records
const getAllStudentPerformance = async (req, res) => {
  try {
    const records = await StudentPerformance.find().sort({ createdAt: -1 });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch student performance",
      error: error.message,
    });
  }
};

module.exports = {
  saveStudentPerformance,
  getAllStudentPerformance,
};