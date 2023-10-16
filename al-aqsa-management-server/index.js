const express = require("express");
const cors = require("cors");
const dev = require("./config");
const { rateLimit } = require("express-rate-limit");
const connectDb = require("./config/db");
const userRouter = require("./routes/auth");
const memberRouter = require("./routes/member");
const donationRouter = require("./routes/donation");
const expenseRouter = require("./routes/expense");
const batchRouter = require("./routes/batch");
const studentRouter = require("./routes/student");

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
app.use("/api/donation", donationRouter);
app.use("/api/expenses", expenseRouter);
app.use("/api/batch", batchRouter);
app.use("/api/students", studentRouter);

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
