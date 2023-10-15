const Member = require("../models/member");

// add member controller
const addMember = async (req, res) => {
  try {
    const { name, contact, position } = req.body;

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

    // create member
    const member = { name, contact: Number(contact), position };

    const createMember = new Member(member);
    await createMember.save();

    return res.status(200).json({
      success: true,
      message: "Successfully member added",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// get all members controller
const getAllMembers = async (req, res) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const searchRegExp = new RegExp(".*" + search + ".*", "i");

    const filter = {
      $or: [
        { name: { $regex: searchRegExp } },
        { position: { $regex: searchRegExp } },
      ],
    };

    const members = await Member.find(filter)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await Member.find(filter).countDocuments();

    if (members.length === 0) {
      return res.status(404).json({ success: false, message: "No found" });
    }

    return res.status(200).json({
      success: true,
      members,
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

// get member by id controller
const getMemberById = async (req, res) => {
  try {
    const id = req.params.id;
    const member = await Member.findById(id);

    if (!member) {
      return res
        .status(404)
        .json({ success: false, message: "No member found" });
    }

    return res.status(200).json({
      success: true,
      member,
    });
  } catch (error) {
    return res.status(404).json({ success: false, message: "No member found" });
  }
};

// update member controller
const updateMember = async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;

    const member = await Member.findByIdAndUpdate(id, update);

    if (!member) {
      return res
        .status(404)
        .json({ success: false, message: "No member found" });
    }

    return res.status(200).json({
      success: true,
      message: "Update successfully",
      member,
    });
  } catch (error) {
    return res.status(404).json({ success: false, message: "No member found" });
  }
};

// delete member controller
const deleteMember = async (req, res) => {
  try {
    const id = req.params.id;

    const member = await Member.findByIdAndDelete(id);
    if (!member) {
      return res
        .status(404)
        .json({ success: false, message: "No member found" });
    }

    return res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    return res.status(404).json({ success: false, message: "No member found" });
  }
};

module.exports = {
  addMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
};
