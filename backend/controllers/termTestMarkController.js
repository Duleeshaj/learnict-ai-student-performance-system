const TermTestMark = require("../models/TermTestMark");
const Student = require("../models/Student");

// create or update term test mark
const saveTermTestMark = async (req, res) => {
  try {
    const { studentId, testType, termName, mark, feedback } = req.body;

    const student = await Student.findOne({ studentId });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    let existingRecord = await TermTestMark.findOne({
      studentId,
      testType,
      termName,
    });

    if (existingRecord) {
      existingRecord.mark = mark;
      existingRecord.feedback = feedback || "";
      const updatedRecord = await existingRecord.save();
      return res.status(200).json(updatedRecord);
    }

    const newRecord = new TermTestMark({
      student: student._id,
      studentId: student.studentId,
      fullName: student.fullName,
      testType,
      termName,
      mark,
      feedback: feedback || "",
    });

    const savedRecord = await newRecord.save();

    res.status(201).json(savedRecord);
  } catch (error) {
    res.status(500).json({
      message: "Failed to save term test mark",
      error: error.message,
    });
  }
};

// get all term test marks
const getAllTermTestMarks = async (req, res) => {
  try {
    const records = await TermTestMark.find().sort({ createdAt: -1 });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch term test marks",
      error: error.message,
    });
  }
};

module.exports = {
  saveTermTestMark,
  getAllTermTestMarks,
};