const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
      trim: true,
    },
    endDate: {
      type: Date,
      default: "",
      trim: true,
    },
    trainer: {
      trainerName: {
        type: String,
        required: true,
        trim: true,
      },
      trainerContact: {
        type: Number,
        required: true,
        trim: true,
      },
      trainerAddress: {
        type: String,
        required: true,
        trim: true,
      },
    },
  },
  { timestamps: true }
);

const Batch = mongoose.model("Batch", batchSchema);

module.exports = Batch;
