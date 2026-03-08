const express = require("express");
const router = express.Router();

const { predictStudentPerformance } = require("../controllers/predictionController");

// predict student performance
router.post("/", predictStudentPerformance);

module.exports = router;