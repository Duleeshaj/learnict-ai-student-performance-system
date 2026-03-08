const express = require("express");
const router = express.Router();

const {
  saveTermTestMark,
  getAllTermTestMarks,
} = require("../controllers/termTestMarkController");

// create or update term test mark
router.post("/", saveTermTestMark);

// get all term test marks
router.get("/", getAllTermTestMarks);

module.exports = router;