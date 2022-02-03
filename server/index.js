const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./userData");
const getAllDataRouter = require("./getDataForAdmin");
const adminRouter = require("./loginForAdmin");
const helmet = require("helmet");
const rateLimiter = require("express-rate-limit");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");

const job = require("./cronJob");
const dotenv = require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

const limiter = rateLimiter({
  max: 10,
  windowMs: 1 * 60 * 1000,
  handler: function (req, res, next) {
    return res.status(429).json({
      error: "You sent too many requests. Please wait a while then try again",
    });
  },
});

app.use("/api", limiter);
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());

job.start();

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("db connected 😊");
});
app.use(express.json());
app.use(cors("http://localhost:3000/"));
app.use("/api/visited-data", userRouter);
app.use("/api/", getAllDataRouter);
app.use("/admin-panel/", adminRouter);

app.listen(PORT, () => console.log(`app started on ${PORT} `));
