const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
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
    position: {
      type: String,
      default: "Member",
      trim: true,
    },
  },
  { timestamps: true }
);

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
