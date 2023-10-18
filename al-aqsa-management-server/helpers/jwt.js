const jwt = require("jsonwebtoken");
const dev = require("../config");

const createJWT = (payload, secretKey) => {
  const token = jwt.sign(payload, secretKey);
  return token;
};

const verifyJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(401)
      .json({ success: false, message: "unauthorized access" });
  }
  const token = authHeader.split(" ")[1];

  jwt.verify(token, dev.app.jwtSecretKey, (err, decoded) => {
    if (err) {
      return res.status(403).send({ message: "Forbidden access" });
    }
    req.decoded = decoded;

    next();
  });
};

module.exports = { createJWT, verifyJWT };
