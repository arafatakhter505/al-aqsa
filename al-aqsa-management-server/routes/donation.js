const express = require("express");
const {
  addDonation,
  getAllDonation,
  getDonationById,
  updateDonation,
  deleteDonation,
  getAllDonationMonth,
} = require("../controllers/donation");

const donationRouter = express.Router();

// add donation
donationRouter.post("/add-donation", addDonation);

// get all donation
donationRouter.get("/", getAllDonation);

// get donation by id
donationRouter.get("/:id", getDonationById);

// update donation
donationRouter.put("/:id", updateDonation);

// delete donation
donationRouter.delete("/:id", deleteDonation);

module.exports = donationRouter;
