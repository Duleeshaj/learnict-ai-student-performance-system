const mongoose = require("mongoose");

// attendance per student per unit per class date
const unitAttendanceSchema = new mongoose.Schema(
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

    attendanceDate: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Present", "Absent"],
      default: "Present",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UnitAttendance", unitAttendanceSchema);