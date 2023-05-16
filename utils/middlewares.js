const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/User");
const logger = require("./logger");

const tokenExtractor = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth && auth.toLowerCase().startsWith("bearer "))
    req.token = auth.slice(7);
  else
    res.status(401).json({
      error: "Token required",
    });

  next();
};

const userExtractor = async (req, res, next) => {
  if (req.token) {
    const { id } = jsonwebtoken.verify(req.token, process.env.JWT_SECRET);
    const user = await User.findById(id);
    if (user) req.user = user;
    else
      res.status(401).json({
        error: "Invalid token",
      });
  }
  next();
};

const requestLogger = (req, _, next) => {
  logger.info(req.method, req.path, req.body);
  next();
};

const unknownEndpoint = (_, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "invalid token",
    });
  }

  next(error);
};

module.exports = {
  tokenExtractor,
  userExtractor,
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
