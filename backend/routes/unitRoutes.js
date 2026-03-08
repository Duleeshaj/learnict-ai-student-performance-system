const express = require("express");
const router = express.Router();

const {
  createUnit,
  getAllUnits,
} = require("../controllers/unitController");

// create unit
router.post("/", createUnit);

// get all units
router.get("/", getAllUnits);

module.exports = router;