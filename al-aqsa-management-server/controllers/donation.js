const Donation = require("../models/donation");

// add donation controller
const addDonation = async (req, res) => {
  try {
    const { date, donerName, amount, comment } = req.body;

    // validation start
    if (!date.trim())
      return res.status(400).json({
        success: false,
        message: "Date is required",
      });

    if (!donerName.trim())
      return res.status(400).json({
        success: false,
        message: "Doner name is required",
      });

    if (!amount.trim())
      return res.status(400).json({
        success: false,
        message: "Amount is required",
      });

    // create donation
    const donation = { date, donerName, amount: Number(amount), comment };

    const createDonation = new Donation(donation);
    await createDonation.save();

    return res.status(200).json({
      success: true,
      message: "Successfully donation added",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// get all donation controller
const getAllDonation = async (req, res) => {
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
              { donerName: { $regex: searchRegExp } },
              { comment: { $regex: searchRegExp } },
            ],
            date: { $gte: fromDate, $lte: toDate },
          }
        : {
            $or: [
              { donerName: { $regex: searchRegExp } },
              { comment: { $regex: searchRegExp } },
            ],
          };

    const donations = await Donation.find(filter)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await Donation.find(filter).countDocuments();

    if (donations.length === 0) {
      return res.status(404).json({ success: false, message: "No found" });
    }

    return res.status(200).json({
      success: true,
      donations,
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

// get donation by id controller
const getDonationById = async (req, res) => {
  try {
    const id = req.params.id;
    const donation = await Donation.findById(id);

    if (!donation) {
      return res
        .status(404)
        .json({ success: false, message: "No donation found" });
    }

    return res.status(200).json({
      success: true,
      donation,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "No donation found" });
  }
};

// update donation controller
const updateDonation = async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;

    const donation = await Donation.findByIdAndUpdate(id, update);

    if (!donation) {
      return res
        .status(404)
        .json({ success: false, message: "No donation found" });
    }

    return res.status(200).json({
      success: true,
      message: "Update successfully",
      donation,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "No donation found" });
  }
};

// delete donation controller
const deleteDonation = async (req, res) => {
  try {
    const id = req.params.id;
    const donation = await Donation.findByIdAndDelete(id);
    if (!donation) {
      return res
        .status(404)
        .json({ success: false, message: "No donation found" });
    }

    return res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "No donation found" });
  }
};

module.exports = {
  addDonation,
  getAllDonation,
  getDonationById,
  updateDonation,
  deleteDonation,
};
