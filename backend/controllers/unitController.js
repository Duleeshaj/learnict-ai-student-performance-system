const Unit = require("../models/Unit");

// create a new unit
const createUnit = async (req, res) => {
  try {
    const { unitName, termName, startDate, endDate, notes } = req.body;

    // check required fields
    if (!unitName || !termName || !startDate) {
      return res.status(400).json({
        message: "unitName, termName and startDate are required",
      });
    }

    const newUnit = new Unit({
      unitName,
      termName,
      startDate,
      endDate,
      notes,
    });

    const savedUnit = await newUnit.save();

    res.status(201).json(savedUnit);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create unit",
      error: error.message,
    });
  }
};

// get all units
const getAllUnits = async (req, res) => {
  try {
    const units = await Unit.find().sort({ createdAt: -1 });
    res.status(200).json(units);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch units",
      error: error.message,
    });
  }
};

module.exports = {
  createUnit,
  getAllUnits,
};