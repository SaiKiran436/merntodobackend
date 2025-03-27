const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();

const loginUser = async (req, res) => {
  const data = req.body;

  const existingUser = await User.findOne({ email: data.email });

  if (!existingUser) {
    return res.status(403).send("User Doesn't exist");
  }

  const compare = await bcrypt.compare(data.password, existingUser.password);

  if (!compare) {
    return res.status(403).send("Wrong password");
  }

  res.status(200).send({ message: "Login Successful" });
};

const registerUser = async (req, res) => {
  const data = req.body;

  const existingUser = await User.findOne({ email: data.email });

  if (existingUser) {
    return res.status(403).send("User Already exist");
  }

  //hash the password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const createUser = await User.create({
    ...data,
    password: hashedPassword,
  });

  res.send(createUser);
};

router.post("/register", registerUser);
router.post("/login", loginUser);
module.exports = router;
