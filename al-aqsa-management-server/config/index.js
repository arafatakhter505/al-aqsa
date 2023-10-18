require("dotenv").config();

const dev = {
  app: {
    serverPort: process.env.PORT,
    jwtSecretKey: process.env.JWT_SECRET_KEY,
  },
  db: {
    mongoDbUrl: process.env.MONGO_DB_URL,
  },
};

module.exports = dev;
