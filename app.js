require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/auth");
const noteRouter = require("./routes/notes");
const userRouter = require("./routes/user");
const logger = require("./utils/logger");
const { DB_URI } = require("./utils/config");
const {
  unknownEndpoint,
  errorHandler,
  requestLogger,
} = require("./utils/middlewares");

const app = express();
mongoose.set("strictQuery", true);
mongoose
  .connect(DB_URI)
  .then(() => {
    logger.info("Connected to DB:", DB_URI);
  })
  .catch((err) => {
    logger.error(err.message);
  });

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(requestLogger);

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/notes", noteRouter);
app.get("/status", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
