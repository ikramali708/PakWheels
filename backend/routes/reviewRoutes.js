import express from "express";
import {
    createReview,
    getReviewsByListing,
    getReviewsByUser,
    updateReview,
    deleteReview,
} from "../controllers/reviewController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create review
router.post("/", protect, createReview);

// Get all reviews for a listing
router.get("/listing/:listingId", getReviewsByListing);

// Get all reviews by a user
router.get("/user/:userId", getReviewsByUser);

// Update review
router.put("/:id", protect, updateReview);

// Delete review
router.delete("/:id", protect, deleteReview);

export default router;
