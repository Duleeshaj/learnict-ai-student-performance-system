const mongoose = require("mongoose");

// general performance data per student
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

    sirTermTestAvg: {
      type: Number,
      default: 0,
    },

    schoolTermTestAvg: {
      type: Number,
      default: 0,
    },

    homeworkCompletionRate: {
      type: Number,
      default: 0,
    },

    behaviorScore: {
      type: Number,
      default: 0,
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