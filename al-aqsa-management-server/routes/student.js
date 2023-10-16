const express = require("express");
const {
  addStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require("../controllers/student");

const studentRouter = express.Router();

// add student
studentRouter.post("/add-student", addStudent);

// get all students
studentRouter.get("/", getAllStudents);

// get student by id
studentRouter.get("/:id", getStudentById);

// update student
studentRouter.put("/:id", updateStudent);

// delete student
studentRouter.delete("/:id", deleteStudent);

module.exports = studentRouter;
