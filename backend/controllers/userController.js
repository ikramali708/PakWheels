import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//USER (Signup)
export const createUser = async (req, res) => {
    try {
        const { name, email, phone, password, userType } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ name, email, phone, password: hashedPassword, userType });
        const savedUser = await user.save();

        res.status(201).json({
            message: "User created successfully!",
            user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
                userType: savedUser.userType,
            },
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// LOGIN USER
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id, email: user.email, userType: user.userType },
            process.env.JWT_SECRET || "mysecretkey",
            { expiresIn: "1h" }
        );

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                userType: user.userType,
            },
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

//  GET ALL USERS 
export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password"); // Hide password
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// GET SINGLE USER 
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// UPDATE USER
export const updateUser = async (req, res) => {
    try {
        const { name, phone, userType } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name, phone, userType },
            { new: true }
        ).select("-password");

        if (!updatedUser) return res.status(404).json({ message: "User not found" });
        res.json({ message: "User updated", user: updatedUser });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

//  DELETE USER 
export const deleteUser = async (req, res) => {
    try {
        const deleted = await User.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "User not found" });
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
