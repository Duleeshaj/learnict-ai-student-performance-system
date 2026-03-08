const UnitMark = require("../models/UnitMark");
const Student = require("../models/Student");
const Unit = require("../models/Unit");

// save unit exam mark for a student
const createUnitMark = async (req, res) => {
  try {
    const { studentId, unitId, unitExamMark } = req.body;

    // find student
    const student = await Student.findOne({ studentId });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // find unit
    const unit = await Unit.findById(unitId);
    if (!unit) {
      return res.status(404).json({ message: "Unit not found" });
    }

    // check existing unit mark
    const existingMark = await UnitMark.findOne({
      studentId: student.studentId,
      unit: unit._id,
    });

    if (existingMark) {
      existingMark.unitExamMark = unitExamMark;
      const updatedMark = await existingMark.save();
      return res.status(200).json(updatedMark);
    }

    const newUnitMark = new UnitMark({
      student: student._id,
      studentId: student.studentId,
      fullName: student.fullName,
      unit: unit._id,
      unitName: unit.unitName,
      unitExamMark,
    });

    const savedUnitMark = await newUnitMark.save();

    res.status(201).json(savedUnitMark);
  } catch (error) {
    res.status(500).json({
      message: "Failed to save unit mark",
      error: error.message,
    });
  }
};

// get all unit marks
const getAllUnitMarks = async (req, res) => {
  try {
    const marks = await UnitMark.find().sort({ createdAt: -1 });
    res.status(200).json(marks);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch unit marks",
      error: error.message,
    });
  }
};

module.exports = {
  createUnitMark,
  getAllUnitMarks,
};