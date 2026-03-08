const mongoose = require("mongoose");

// optional general performance data per student
const studentPerformanceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    studentId: {
      type: String,
      required: true,
      unique: true,
    },

    fullName: {
      type: String,
      required: true,
    },

    homeworkCompletionRate: {
      type: Number,
      default: null,
      min: 0,
      max: 100,
    },

    behaviorScore: {
      type: Number,
      default: null,
      min: 0,
      max: 100,
    },

    generalFeedback: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("StudentPerformance", studentPerformanceSchema);