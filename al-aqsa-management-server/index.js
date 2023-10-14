const express = require("express");
const dev = require("./config");
const { rateLimit } = require("express-rate-limit");
const connectDb = require("./config/db");
const userRouter = require("./routes/auth");
const cors = require("cors");
const memberRouter = require("./routes/member");

const app = express();

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 50,
  message: "Too many requests from this IP. Please try again later",
});

// middleware
app.use(rateLimiter);
app.use(cors());
app.use(express.json());

// routes middleware
app.use("/api/users", userRouter);
app.use("/api/members", memberRouter);

app.get("/", (req, res) => res.send("Al Aqsa Server Application"));

// route error handle
app.all("*", (req, res) => res.status(404).send(`${req.url} route no found`));

// server port
const port = dev.app.serverPort;

// app listen
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  await connectDb();
});
