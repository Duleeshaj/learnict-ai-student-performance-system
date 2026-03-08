const mongoose = require("mongoose");

// one unit exam mark per student per unit
const unitMarkSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    studentId: {
      type: String,
      required: true,
    },

    fullName: {
      type: String,
      required: true,
    },

    unit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Unit",
      required: true,
    },

    unitName: {
      type: String,
      required: true,
    },

    unitExamMark: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UnitMark", unitMarkSchema);