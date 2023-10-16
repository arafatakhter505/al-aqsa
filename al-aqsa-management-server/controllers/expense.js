const Expense = require("../models/expense");

// add expense controller
const addExpense = async (req, res) => {
  try {
    const { date, about, amount, expensePerson } = req.body;

    // validation start
    if (!date.trim())
      return res.status(400).json({
        success: false,
        message: "Date is required",
      });

    if (!about.trim())
      return res.status(400).json({
        success: false,
        message: "About is required",
      });

    if (!amount.trim())
      return res.status(400).json({
        success: false,
        message: "Amount is required",
      });

    if (!expensePerson.trim())
      return res.status(400).json({
        success: false,
        message: "Expense Person is required",
      });

    // create expense
    const expense = { date, about, amount: Number(amount), expensePerson };

    const createExpense = new Expense(expense);
    await createExpense.save();

    return res.status(200).json({
      success: true,
      message: "Successfully expense added",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// get all expense controller
const getAllExpenses = async (req, res) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const fromDate = req.query.from;
    const toDate = req.query.to;

    const searchRegExp = new RegExp(".*" + search + ".*", "i");

    const filter =
      fromDate && toDate
        ? {
            $or: [
              { about: { $regex: searchRegExp } },
              { expensePerson: { $regex: searchRegExp } },
            ],
            date: { $gte: fromDate, $lte: toDate },
          }
        : {
            $or: [
              { about: { $regex: searchRegExp } },
              { expensePerson: { $regex: searchRegExp } },
            ],
          };

    const expenses = await Expense.find(filter)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await Expense.find(filter).countDocuments();

    if (expenses.length === 0) {
      return res.status(404).json({ success: false, message: "No found" });
    }

    return res.status(200).json({
      success: true,
      expenses,
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

// get expense by id controller
const getExpenseById = async (req, res) => {
  try {
    const id = req.params.id;
    const expense = await Expense.findById(id);

    if (!expense) {
      return res
        .status(404)
        .json({ success: false, message: "No expense found" });
    }

    return res.status(200).json({
      success: true,
      expense,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "No expense found" });
  }
};

// update expense controller
const updateExpense = async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;

    const expense = await Expense.findByIdAndUpdate(id, update);

    if (!expense) {
      return res
        .status(404)
        .json({ success: false, message: "No expense found" });
    }

    return res.status(200).json({
      success: true,
      message: "Update successfully",
      expense,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "No expense found" });
  }
};

// delete expense controller
const deleteExpense = async (req, res) => {
  try {
    const id = req.params.id;
    const expense = await Expense.findByIdAndDelete(id);
    if (!expense) {
      return res
        .status(404)
        .json({ success: false, message: "No expense found" });
    }

    return res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "No expense found" });
  }
};

module.exports = {
  addExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
};
