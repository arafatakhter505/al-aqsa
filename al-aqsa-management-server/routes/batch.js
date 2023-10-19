const express = require("express");
const {
  addBatch,
  getAllBatch,
  getBatchById,
  updateBatch,
  deleteBatch,
} = require("../controllers/batch");

const batchRouter = express.Router();

// add batch
batchRouter.post("/add-batch", addBatch);

// get all batch
batchRouter.get("/", getAllBatch);

// get batch by id
batchRouter.get("/id/:id", getBatchById);

// update batch
batchRouter.put("/:id", updateBatch);

// delete batch
batchRouter.delete("/:id", deleteBatch);

module.exports = batchRouter;
