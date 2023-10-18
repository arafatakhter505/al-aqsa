const User = require("../models/user");

const verifyAdmin = async (req, res, next) => {
  const decodedEmail = req.decoded.email;
  const filter = { email: decodedEmail };
  const user = await User.findOne(filter);

  if (user?.role === "Admin" || user?.role === "Super Admin") {
    next();
  } else {
    return res.status(403).send({ message: "forebidden access" });
  }
};

module.exports = verifyAdmin;
