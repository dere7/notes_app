require("dotenv").config();
const { PORT, JWT_SECRET, DB_URI, DB_URI_TEST, NODE_ENV } = process.env;
module.exports = {
  PORT,
  JWT_SECRET,
  DB_URI: NODE_ENV === "test" ? DB_URI_TEST : DB_URI,
  NODE_ENV,
};
