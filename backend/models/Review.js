import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    listingId: { type: mongoose.Schema.Types.ObjectId, ref: "Listing" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comment: String,
    rating: Number,
    reviewDate: { type: Date, default: Date.now },
});

export default mongoose.model("Review", reviewSchema);
