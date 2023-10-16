const Student = require("../models/student");

// add student controller
const addStudent = async (req, res) => {
  try {
    const { name, contact, address, batch } = req.body;

    // validation start
    if (!name.trim())
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });

    if (!contact.trim())
      return res.status(400).json({
        success: false,
        message: "Contact is required",
      });

    if (!batch)
      return res.status(400).json({
        success: false,
        message: "Bacth information is required",
      });

    // create student
    const student = { name, contact: Number(contact), address, batch };

    const createStudent = new Student(student);
    await createStudent.save();

    return res.status(200).json({
      success: true,
      message: "Successfully student added",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// get all students controller
const getAllStudents = async (req, res) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const batchId = req.query.batch;
    if (!batchId) {
      return res
        .status(400)
        .json({ success: false, message: "Batch information no found" });
    }

    const searchRegExp = new RegExp(".*" + search + ".*", "i");

    const filter = { "batch.id": batchId, name: { $regex: searchRegExp } };

    const students = await Student.find(filter)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await Student.find(filter).countDocuments();
    const totalStudent = await Student.find({
      "batch.id": batchId,
    }).countDocuments();

    if (students.length === 0) {
      return res.status(404).json({ success: false, message: "No found" });
    }

    return res.status(200).json({
      success: true,
      students,
      totalStudent,
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

// get student by id controller
const getStudentById = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await Student.findById(id);

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "No student found" });
    }

    return res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "No student found" });
  }
};

// update student controller
const updateStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;

    const student = await Student.findByIdAndUpdate(id, update);

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "No student found" });
    }

    return res.status(200).json({
      success: true,
      message: "Update successfully",
      student,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "No student found" });
  }
};

// delete student controller
const deleteStudent = async (req, res) => {
  try {
    const id = req.params.id;

    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "No student found" });
    }

    return res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "No student found" });
  }
};

module.exports = {
  addStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
