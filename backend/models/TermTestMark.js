const mongoose = require("mongoose");

// stores sir term test and school term test marks
const termTestMarkSchema = new mongoose.Schema(
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

    testType: {
      type: String,
      enum: ["sir_term_test", "school_term_test"],
      required: true,
    },

    termName: {
      type: String,
      enum: ["1st Term", "2nd Term", "3rd Term"],
      required: true,
    },

    mark: {
      type: Number,
      required: true,
    },

    feedback: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TermTestMark", termTestMarkSchema);