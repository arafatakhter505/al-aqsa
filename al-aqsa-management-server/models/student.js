const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    contact: {
      type: Number,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
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
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
