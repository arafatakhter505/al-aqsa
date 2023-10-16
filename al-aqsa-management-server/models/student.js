const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
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
    default: "",
    trim: true,
  },
  batch: {
    id: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
