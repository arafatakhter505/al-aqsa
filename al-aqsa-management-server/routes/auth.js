const express = require("express");
const {
  registerUser,
  getAllUsers,
  updateUser,
  getUserById,
  deleteUser,
} = require("../controllers/auth");
const verifyAdmin = require("../helpers/admin");

const userRouter = express.Router();

// user register
userRouter.post("/register", verifyAdmin, registerUser);

// get all users
userRouter.get("/", verifyAdmin, getAllUsers);

// get user by id
userRouter.get("/:id", getUserById);

// update user
userRouter.put("/:id", updateUser);

// delete user
userRouter.delete("/:id", verifyAdmin, deleteUser);

module.exports = userRouter;
