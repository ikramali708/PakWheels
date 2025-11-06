import express from "express";
import {
    uploadUserImage,
    getImagesByUserId,
    deleteUserImage,
} from "../controllers/userImageController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, uploadUserImage);
router.get("/:userId", protect, getImagesByUserId);
router.delete("/:id", protect, deleteUserImage);

export default router;
