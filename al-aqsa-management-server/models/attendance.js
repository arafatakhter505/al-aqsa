const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    batch: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Batch",
      },
      name: {
        type: String,
        required: true,
        trim: true,
      },
    },
    students: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Student",
        },
        attendance: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
