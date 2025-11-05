
import express from "express";
import {
    createUser,
    loginUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
} from "../controllers/userController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes (no token needed)
router.post("/signup", createUser);
router.post("/login", loginUser);

// Protected routes (token required)
router.get("/", protect, getUsers);
router.get("/:id", protect, getUserById);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);

export default router;
