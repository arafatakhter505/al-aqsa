const express = require("express");
const {
  addAttendance,
  getAllAttendances,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
} = require("../controllers/attendance");

const attendanceRouter = express.Router();

// add attendance
attendanceRouter.post("/add-attendance", addAttendance);

// get all attendances
attendanceRouter.get("/", getAllAttendances);

// get attendance by id
attendanceRouter.get("/:id", getAttendanceById);

// update attendance
attendanceRouter.put("/:id", updateAttendance);

// delete attendance
attendanceRouter.delete("/:id", deleteAttendance);

module.exports = attendanceRouter;
