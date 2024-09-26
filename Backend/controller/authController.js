import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const login = async (req, res) => {
  try {
    console.log("Login function started");
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ success: false, error: "User Not Found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password mismatch");
      return res.status(404).json({ success: false, error: "Wrong Password" });
    }

    // Generate token if credentials are valid
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: "10d" }
    );

    // Send success response
    console.log("Login successful");
    return res.status(200).json({
      success: true,
      token,
      user: { _id: user._id, name: user.name, role: user.role },
    });

  } catch (error) {
    console.error("Error in login function:", error.message);
    if (!res.headersSent) {
      // Only send response if headers aren't already sent
      return res.status(500).json({ success: false, error: error.message });
    }
  }
};

export { login };
