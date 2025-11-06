import Review from "../models/Review.js";
import Listing from "../models/Listing.js";
import User from "../models/User.js";

// Create a new review
export const createReview = async (req, res) => {
    try {
        const { userId, listingId, rating, comment } = req.body;

        const user = await User.findById(userId);
        const listing = await Listing.findById(listingId);
        if (!user || !listing)
            return res.status(404).json({ message: "User or Listing not found" });

        // Check if user already reviewed this listing
        const existing = await Review.findOne({ userId, listingId });
        if (existing)
            return res.status(400).json({ message: "You have already reviewed this listing" });

        const review = new Review({
            userId,
            listingId,
            rating,
            comment,
        });

        await review.save();
        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all reviews for a specific listing
export const getReviewsByListing = async (req, res) => {
    try {
        const reviews = await Review.find({ listingId: req.params.listingId })
            .populate("userId", "name email")
            .sort({ datePosted: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all reviews by a specific user
export const getReviewsByUser = async (req, res) => {
    try {
        const reviews = await Review.find({ userId: req.params.userId })
            .populate("listingId", "title price location");
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a review
export const updateReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!review) return res.status(404).json({ message: "Review not found" });
        res.status(200).json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a review
export const deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) return res.status(404).json({ message: "Review not found" });
        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
