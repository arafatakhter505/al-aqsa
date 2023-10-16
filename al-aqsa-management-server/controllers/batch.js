const Batch = require("../models/batch");

// add batch controller
const addBatch = async (req, res) => {
  try {
    const { name, startDate, endDate, trainer } = req.body;

    // validation start
    if (!name.trim())
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });

    if (!startDate.trim())
      return res.status(400).json({
        success: false,
        message: "Start date is required",
      });

    if (!trainer.trim())
      return res.status(400).json({
        success: false,
        message: "Trainer information is required",
      });

    // create batch
    const batch = { name, startDate, endDate, trainer };

    const createBatch = new Batch(batch);
    await createBatch.save();

    return res.status(200).json({
      success: true,
      message: "Successfully batch added",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// get all batch controller
const getAllBatch = async (req, res) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const searchRegExp = new RegExp(".*" + search + ".*", "i");

    const filter = { name: { $regex: searchRegExp } };

    const batch = await Batch.find(filter)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await Batch.find(filter).countDocuments();

    if (batch.length === 0) {
      return res.status(404).json({ success: false, message: "No found" });
    }

    return res.status(200).json({
      success: true,
      batch,
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

// get batch by id controller
const getBatchById = async (req, res) => {
  try {
    const id = req.params.id;
    const batch = await Batch.findById(id);

    if (!batch) {
      return res
        .status(404)
        .json({ success: false, message: "No batch found" });
    }

    return res.status(200).json({
      success: true,
      batch,
    });
  } catch (error) {
    return res.status(404).json({ success: false, message: "No batch found" });
  }
};

// update batch controller
const updateBatch = async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;

    const batch = await Batch.findByIdAndUpdate(id, update);

    if (!batch) {
      return res
        .status(404)
        .json({ success: false, message: "No batch found" });
    }

    return res.status(200).json({
      success: true,
      message: "Update successfully",
      batch,
    });
  } catch (error) {
    return res.status(404).json({ success: false, message: "No batch found" });
  }
};

// delete batch controller
const deleteBatch = async (req, res) => {
  try {
    const id = req.params.id;
    const batch = await Batch.findByIdAndDelete(id);
    if (!batch) {
      return res
        .status(404)
        .json({ success: false, message: "No batch found" });
    }

    return res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    return res.status(404).json({ success: false, message: "No batch found" });
  }
};

module.exports = {
  addBatch,
  getAllBatch,
  getBatchById,
  updateBatch,
  deleteBatch,
};
