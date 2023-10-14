const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    donerName: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      trim: true,
    },
    comment: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

const Donation = mongoose.model("Donation", donationSchema);

module.exports = Donation;
