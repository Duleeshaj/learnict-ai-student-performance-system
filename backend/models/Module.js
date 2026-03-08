const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema(
  {
    moduleName: {
      type: String,
      required: true,
    },
    moduleCode: {
      type: String,
      required: true,
      unique: true,
    },
    startDate: {
      type: Date,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Module", moduleSchema);