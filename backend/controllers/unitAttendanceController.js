const UnitAttendance = require("../models/UnitAttendance");
const Student = require("../models/Student");
const Unit = require("../models/Unit");

// mark attendance for a student under a unit
const markUnitAttendance = async (req, res) => {
  try {
    const { qrCodeValue, unitId, attendanceDate, status } = req.body;

    // find student by qr code
    const student = await Student.findOne({
  $or: [
    { qrCodeValue: qrCodeValue },
    { studentId: qrCodeValue }
  ]
});
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // find unit
    const unit = await Unit.findById(unitId);
    if (!unit) {
      return res.status(404).json({ message: "Unit not found" });
    }

    // avoid duplicate attendance for same student, unit and date
    const existingRecord = await UnitAttendance.findOne({
      studentId: student.studentId,
      unit: unit._id,
      attendanceDate,
    });

    if (existingRecord) {
      return res.status(400).json({
        message: "Attendance already marked for this student on this unit date",
      });
    }

    const newAttendance = new UnitAttendance({
      student: student._id,
      studentId: student.studentId,
      fullName: student.fullName,
      unit: unit._id,
      unitName: unit.unitName,
      attendanceDate,
      status: status || "Present",
    });

    const savedAttendance = await newAttendance.save();

    res.status(201).json(savedAttendance);
  } catch (error) {
    res.status(500).json({
      message: "Failed to mark unit attendance",
      error: error.message,
    });
  }
};

// get all unit attendance
const getAllUnitAttendance = async (req, res) => {
  try {
    const records = await UnitAttendance.find().sort({ createdAt: -1 });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch unit attendance",
      error: error.message,
    });
  }
};

module.exports = {
  markUnitAttendance,
  getAllUnitAttendance,
};