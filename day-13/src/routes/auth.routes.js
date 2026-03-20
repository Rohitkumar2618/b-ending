const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const authRouter = express.Router();

// ================= REGISTER API =================
authRouter.post("/register", async (req, res) => {
  // req.body se frontend se aaya data destructure kar rahe hain
  const { name, email, password } = req.body;

  // Database me check kar rahe hain ki same email wala user already hai ya nahi
  const isUserAlreadyExist = await userModel.findOne({ email });

  // Agar user already exist karta hai toh error response bhejenge
  if (isUserAlreadyExist) {
    return res.status(409).json({
      message: "User already exist",
    });
  }

  const hash = crypto.createHash("md5").update(password).digest("hex");

  // Agar user exist nahi karta toh new user create karenge database me
  const user = await userModel.create({
    name, // user ka name
    email, // user ka email
    password: hash, // user ka password (NOTE: ideally hash karna chahiye)
  });

  // JWT token generate kar rahe hain (user ko identify karne ke liye)
  const token = jwt.sign(
    {
      id: user._id, // user ka unique MongoDB ID
      email: user.email, // user ka email
    },
    process.env.JWT_SECRET, // secret key jo .env file me hoti hai
  );

  // Token ko cookie me store kar rahe hain (browser me save ho jayega)
  res.cookie("jwt_token", token);

  // Client ko success response bhej rahe hain
  res.status(201).json({
    message: "User Created Successfully",
    user, // created user ka data
    token, // generated JWT token
  });
});

// ================= LOGIN API =================

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User not found with this email address",
    });
  }

  const isPasswordMatched =
    user.password === crypto.createHash("md5").update(password).digest("hex");

  if (!isPasswordMatched) {
    return res.status(404).json({
      message: "Invalid Password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token", token);

  res.status(200).json({
    message: "User logged in",
    user,
  });
});

// Router ko export kar rahe hain taaki main server file me use ho sake
module.exports = authRouter;
