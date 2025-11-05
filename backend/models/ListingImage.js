import mongoose from "mongoose";

const listingImageSchema = new mongoose.Schema({
    listingId: { type: mongoose.Schema.Types.ObjectId, ref: "Listing" },
    imageURL: String,
    uploadedDate: { type: Date, default: Date.now },
});

export default mongoose.model("ListingImage", listingImageSchema);
