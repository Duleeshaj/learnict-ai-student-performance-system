const express = require("express");
const router = express.Router();

const {
  predictStudentFromRecords,
} = require("../controllers/predictionSummaryController");

// predict using stored records of one student
router.post("/:studentId", predictStudentFromRecords);

module.exports = router;