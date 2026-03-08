const express = require("express");
const router = express.Router();

const {
  markUnitAttendance,
  getAllUnitAttendance,
} = require("../controllers/unitAttendanceController");

// mark attendance under a unit
router.post("/mark", markUnitAttendance);

// get all unit attendance
router.get("/", getAllUnitAttendance);

module.exports = router;