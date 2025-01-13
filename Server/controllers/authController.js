const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Register user
const registerUser = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, panCardNumber, password } =
    req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const user = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      panCardNumber,
      password,
    });
    const pan = await User.findOne({ panCardNumber });
    if (pan) {
      return res.status(400).json({ message: "Enter Unique PAN card number" });
    }

    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
      expiresIn: "30d",
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordMatch = await user.matchPassword(password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
      expiresIn: "30d",
    });

    res.status(200).json({
      message: "Login successful",
      user,
      token,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
