const User = require("../models/User");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const authRouter = require("express").Router();

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const userToken = { id: user.id, email: user.email };
    res
      .status(200)
      .json({
        token: jsonwebtoken.sign(JSON.stringify(userToken), JWT_SECRET),
      });
  } else {
    res.status(400).json({ error: "Invalid email or password" });
  }
});

module.exports = authRouter;
