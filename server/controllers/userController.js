import User from "../models/user.js";
import jwt from "jsonwebtoken";

const secretKey = "sckcksckikwmcmclzMlslasxasx,qw,o,x,ZX";

export const register = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, secretKey);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, secretKey);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

// DYNAMIC PROFILE DATA
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password"); // Password nahi bhejenge
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile" });
  }
};

export const fetchingUserDetailById = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(500).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching the user details" });
  }
};
