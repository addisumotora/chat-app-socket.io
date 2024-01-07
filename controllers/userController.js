const mongoose = require("mongoose");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json("user already exists");

    if (!name || !email || !password)
      return res.status(400).json("all fields are required");
    if (!validator.isEmail(email))
      return res.status(400).json("email must be valid email");
    if (!validator.isStrongPassword)
      return res.status(400).json("must be strong password");

    const salt = bcrypt.genSaltSync(12);
    hashedPassword = bcrypt.hashSync(password, salt);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_KEY,
      { expiresIn: "1hr" }
    );
    return res
      .status(201)
      .json({ id: user._id, name: user.name, emial: user.email, token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { registerUser };
