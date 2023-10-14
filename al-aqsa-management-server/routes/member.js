const express = require("express");
const {
  addMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
} = require("../controllers/member");

const memberRouter = express.Router();

// add member
memberRouter.post("/add-member", addMember);

// get all members
memberRouter.get("/", getAllMembers);

// get member by id
memberRouter.get("/:id", getMemberById);

// update member
memberRouter.put("/:id", updateMember);

// delete member
memberRouter.delete("/:id", deleteMember);

module.exports = memberRouter;
