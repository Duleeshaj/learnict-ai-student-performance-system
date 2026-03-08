const express = require("express");
const router = express.Router();

const {
  saveStudentPerformance,
  getAllStudentPerformance,
} = require("../controllers/studentPerformanceController");

// create or update general performance
router.post("/", saveStudentPerformance);

// get all performance records
router.get("/", getAllStudentPerformance);

module.exports = router;