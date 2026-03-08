const express = require("express");
const router = express.Router();

// import controller functions
const {
  createStudent,
  getAllStudents,
  getStudentById,
  deleteStudent,
  getStudentQRCode,
} = require("../controllers/studentController");

// create a new student
router.post("/", createStudent);

// get all students
router.get("/", getAllStudents);

// get qr code for one student
router.get("/:id/qrcode", getStudentQRCode);

// get one student by id
router.get("/:id", getStudentById);

// delete a student by id
router.delete("/:id", deleteStudent);

module.exports = router;