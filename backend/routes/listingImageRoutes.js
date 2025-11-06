import express from "express";
import {
    uploadListingImage,
    getImagesByListingId,
    deleteListingImage,
} from "../controllers/listingImageController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Upload image record (Protected)
router.post("/", protect, uploadListingImage);

// Get all images of one listing
router.get("/:listingId", getImagesByListingId);

// Delete specific image
router.delete("/:id", protect, deleteListingImage);

export default router;
