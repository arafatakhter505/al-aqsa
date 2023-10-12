const { hashPassword } = require("../helpers/auth");
const User = require("../models/user");

// user register controller
const registerUser = async (req, res) => {
  try {
    const { fullName, userName, email, password, role } = req.body;

    // validation start
    if (!fullName.trim())
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });

    if (!userName.trim())
      return res.status(400).json({
        success: false,
        message: "Username is required",
      });

    if (!email.trim())
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });

    if (!password || password.length < 6)
      return res.status(400).json({
        success: false,
        message: "Password must be atleast 6 characters",
      });

    // existing user
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail)
      return res.status(400).json({
        success: false,
        message: "User already exist with this email",
      });
    const existingUserByUserName = await User.findOne({ userName });
    if (existingUserByUserName)
      return res.status(400).json({
        success: false,
        message: "User already exist with this username",
      });

    // create user
    const hashedPassword = await hashPassword(password);
    const user = {
      fullName,
      userName,
      email,
      password: hashedPassword,
      role,
    };
    const createUser = new User(user);
    await createUser.save();

    return res.status(200).json({
      success: true,
      message: "Successfully user created",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// get all users controller
const getAllUsers = async (req, res) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const searchRegExp = new RegExp(".*" + search + ".*", "i");

    const filter = {
      $or: [
        { fullName: { $regex: searchRegExp } },
        { email: { $regex: searchRegExp } },
        { userName: { $regex: searchRegExp } },
      ],
    };

    const options = { password: 0 };

    const users = await User.find(filter, options)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await User.find(filter).countDocuments();

    if (users.length === 0) {
      return res.status(404).json({ success: false, message: "No found" });
    }

    return res.status(200).json({
      success: true,
      users,
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

// update user
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;
    const user = await User.findByIdAndUpdate(id, update);

    if (!user) {
      return res.status(404).json({ success: false, message: "No user found" });
    }

    return res.status(200).json({
      success: true,
      message: "Update successfully",
    });
  } catch (error) {
    return res.status(404).json({ success: false, message: "No user found" });
  }
};

module.exports = { registerUser, getAllUsers, updateUser };
