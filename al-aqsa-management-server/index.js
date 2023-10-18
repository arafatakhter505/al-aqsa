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
const attendanceRouter = require("./routes/attendance");
const { verifyJWT } = require("./helpers/jwt");
const { userLogin } = require("./controllers/auth");

const app = express();

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP. Please try again later",
});

// middleware
app.use(rateLimiter);
app.use(cors());
app.use(express.json());

// routes middleware
app.use("/api/users", verifyJWT, userRouter);
app.use("/api/members", verifyJWT, memberRouter);
app.use("/api/donation", verifyJWT, donationRouter);
app.use("/api/expenses", verifyJWT, expenseRouter);
app.use("/api/batch", verifyJWT, batchRouter);
app.use("/api/students", verifyJWT, studentRouter);
app.use("/api/attendances", verifyJWT, attendanceRouter);

// user login
app.post("/api/login", userLogin);

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
