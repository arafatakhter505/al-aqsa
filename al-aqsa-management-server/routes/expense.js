const express = require("express");
const {
  addExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
} = require("../controllers/expense");

const expenseRouter = express.Router();

// add expense
expenseRouter.post("/add-expense", addExpense);

// get all expense
expenseRouter.get("/", getAllExpenses);

// get expense by id
expenseRouter.get("/:id", getExpenseById);

// update expense
expenseRouter.put("/:id", updateExpense);

// delete expense
expenseRouter.delete("/:id", deleteExpense);

module.exports = expenseRouter;
