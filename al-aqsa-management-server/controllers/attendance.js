const Attendance = require("../models/attendance");

// add attendance controller
const addAttendance = async (req, res) => {
  try {
    const { date, batch, students } = req.body;

    // validation start
    if (!date)
      return res.status(400).json({
        success: false,
        message: "Date is required",
      });

    if (!batch)
      return res.status(400).json({
        success: false,
        message: "Bathc is required",
      });

    if (!students)
      return res.status(400).json({
        success: false,
        message: "Students is required",
      });

    // create attendance
    const attendance = { date, batch, students };

    const createAttendance = new Attendance(attendance);
    await createAttendance.save();

    return res.status(200).json({
      success: true,
      message: "Successfully attendance added",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// get all attendances controller
const getAllAttendances = async (req, res) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const date = req.query.date;

    const searchRegExp = new RegExp(".*" + search + ".*", "i");

    const filter = date
      ? { date: date, "batch.name": { $regex: searchRegExp } }
      : { "batch.name": { $regex: searchRegExp } };

    const attendances = await Attendance.find(filter)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await Attendance.find(filter).countDocuments();

    if (attendances.length === 0) {
      return res.status(404).json({ success: false, message: "No found" });
    }

    return res.status(200).json({
      success: true,
      attendances,
      pagination: {
        totalPage: Math.ceil(count / limit),
        currentPage: page,
        previousPage: page - 1 > 0 ? page - 1 : null,
        nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// get attendance by id controller
const getAttendanceById = async (req, res) => {
  try {
    const id = req.params.id;
    const attendance = await Attendance.findById(id);

    if (!attendance) {
      return res
        .status(404)
        .json({ success: false, message: "No attendance found" });
    }

    return res.status(200).json({
      success: true,
      attendance,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "No attendance found" });
  }
};

// update attendance controller
const updateAttendance = async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;

    const attendance = await Attendance.findByIdAndUpdate(id, update);

    if (!attendance) {
      return res
        .status(404)
        .json({ success: false, message: "No attendance found" });
    }

    return res.status(200).json({
      success: true,
      message: "Update successfully",
      attendance,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "No attendance found" });
  }
};

// delete attendance controller
const deleteAttendance = async (req, res) => {
  try {
    const id = req.params.id;

    const attendance = await Attendance.findByIdAndDelete(id);
    if (!attendance) {
      return res
        .status(404)
        .json({ success: false, message: "No attendance found" });
    }

    return res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "No attendance found" });
  }
};

module.exports = {
  addAttendance,
  getAllAttendances,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
};
