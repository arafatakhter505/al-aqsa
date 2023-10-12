const express = require("express");
const {
  registerUser,
  getAllUsers,
  updateUser,
} = require("../controllers/auth");

const userRouter = express.Router();

// user register
userRouter.post("/register", registerUser);

// get all users
userRouter.get("/", getAllUsers);

// update user
userRouter.put("/:id", updateUser);

module.exports = userRouter;
