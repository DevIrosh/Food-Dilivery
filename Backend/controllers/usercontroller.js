import User from "../models/usermodels.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";  
import validator from "validator";

// Create JWT token helper function
const createtoken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
}

// User **login controller logic
export const loginuser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // Create token and send response
        const token = createtoken(user._id);
        res.json({ success: true, message: "Login successful", token });

    } catch (error) {
        console.error("Error during user login:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}

// **Register user controller logic
export const registeruser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword,
        });

        // Save user to database
        const savedUser = await newUser.save();
        const token = createtoken(savedUser._id);
        res.json({ success: true, message: "User registered successfully", token });

    } catch (error) {
        console.error("Error during user registration:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}