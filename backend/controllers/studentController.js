const Student = require("../models/Student");
const QRCode = require("qrcode");

// create a student
const createStudent = async (req, res) => {
  try {
    const { fullName, studentId, email, phone, school, gradeLevel } = req.body;

    // validate required fields
    if (!fullName || !studentId) {
      return res.status(400).json({
        message: "Full name and student ID are required",
      });
    }

    // check duplicate student id
    const existingStudent = await Student.findOne({ studentId });

    if (existingStudent) {
      return res.status(400).json({
        message: "Student ID already exists",
      });
    }

    // generate QR value from student id
    const qrCodeValue = `LEARNICT-${studentId}`;

    const newStudent = new Student({
      fullName,
      studentId,
      email,
      phone,
      school,
      gradeLevel,
      qrCodeValue,
    });

    const savedStudent = await newStudent.save();

    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create student",
      error: error.message,
    });
  }
};

// get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch students",
      error: error.message,
    });
  }
};

// get one student by id
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch student",
      error: error.message,
    });
  }
};

// delete student
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    await Student.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete student",
      error: error.message,
    });
  }
};

// generate qr code for one student
const getStudentQRCode = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    // create qr image as base64 data url
    const qrImage = await QRCode.toDataURL(student.qrCodeValue);

    res.status(200).json({
      studentId: student.studentId,
      fullName: student.fullName,
      qrCodeValue: student.qrCodeValue,
      qrImage: qrImage,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to generate QR code",
      error: error.message,
    });
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  deleteStudent,
  getStudentQRCode,
};