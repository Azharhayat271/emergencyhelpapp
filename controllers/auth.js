import { userModel } from "../models/User.js"; 
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

const signup = async (req, res, next) => {
  const { name, email, password, isAdmin } = req.body; // Include isAdmin from request body

  try {
    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create a new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword, // Correctly assign the hashed password
      isAdmin: isAdmin || false, // Default to false if isAdmin is not provided
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error); // Pass errors to the error handler middleware
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const validUser = await userModel.findOne({ email: email });
    if (!validUser) return next(errorHandler(404, "User not found!"));

    // Compare provided password with stored hashed password
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));

    // Create a JWT token
    const token = jwt.sign({ id: validUser._id, isAdmin: validUser.isAdmin }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Optional: Set token expiry time
    });

    // Exclude password from the response
    const { password: pass, ...rest } = validUser._doc;

    res
      .cookie("access_token", token, { httpOnly: true }) // Set the cookie
      .status(200)
      .json({ message: "User logged in successfully", user: rest });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    // Clear the access token cookie
    res.clearCookie("access_token");
    res.status(200).json({ message: "User has been logged out!" });
  } catch (error) {
    next(error);
  }
};

export { signup, login, logout };
