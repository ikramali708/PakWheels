import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: String,
    description: String,
    price: Number,
    location: String,
    status: String,
    datePosted: { type: Date, default: Date.now },
});

export default mongoose.model("Listing", listingSchema);
