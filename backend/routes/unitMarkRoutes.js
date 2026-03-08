const express = require("express");
const router = express.Router();

const {
  createUnitMark,
  getAllUnitMarks,
} = require("../controllers/unitMarkController");

// create or update unit mark
router.post("/", createUnitMark);

// get all unit marks
router.get("/", getAllUnitMarks);

module.exports = router;