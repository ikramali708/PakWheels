import mongoose from "mongoose";

const userImageSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    imageURL: String,
    uploadedDate: { type: Date, default: Date.now },
});

export default mongoose.model("UserImage", userImageSchema);
