const mongoose = require("mongoose");

const markSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
      required: true,
    },
    unitExamMark: {
      type: Number,
      default: 0,
    },
    sirTermTestMark: {
      type: Number,
      default: 0,
    },
    schoolTermTestMark: {
      type: Number,
      default: 0,
    },
    behaviorScore: {
      type: Number,
      default: 0,
    },
    homeworkCompletionRate: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Mark", markSchema);