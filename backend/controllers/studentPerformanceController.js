const StudentPerformance = require("../models/StudentPerformance");
const Student = require("../models/Student");

// create or update general student performance data
const saveStudentPerformance = async (req, res) => {
  try {
    const {
      studentId,
      sirTermTestAvg,
      schoolTermTestAvg,
      homeworkCompletionRate,
      behaviorScore,
      generalFeedback,
    } = req.body;

    // find student
    const student = await Student.findOne({ studentId });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // check existing record
    let performance = await StudentPerformance.findOne({ studentId });

    if (performance) {
      performance.sirTermTestAvg = sirTermTestAvg;
      performance.schoolTermTestAvg = schoolTermTestAvg;
      performance.homeworkCompletionRate = homeworkCompletionRate;
      performance.behaviorScore = behaviorScore;
      performance.generalFeedback = generalFeedback;

      const updatedPerformance = await performance.save();
      return res.status(200).json(updatedPerformance);
    }

    const newPerformance = new StudentPerformance({
      student: student._id,
      studentId: student.studentId,
      fullName: student.fullName,
      sirTermTestAvg,
      schoolTermTestAvg,
      homeworkCompletionRate,
      behaviorScore,
      generalFeedback,
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