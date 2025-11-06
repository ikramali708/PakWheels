import UserImage from "../models/UserImage.js";
import User from "../models/User.js";

// Upload a new user image (URL-based)
export const uploadUserImage = async (req, res) => {
    try {
        const { userId, imageUrl, isProfile } = req.body;

        // Ensure user exists
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        // If profile image, make sure old one is not active
        if (isProfile) {
            await UserImage.updateMany(
                { userId },
                { $set: { isProfile: false } }
            );
        }

        const image = new UserImage({
            userId,
            imageUrl,
            isProfile: isProfile || false,
        });

        await image.save();
        res.status(201).json(image);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all images for a user
export const getImagesByUserId = async (req, res) => {
    try {
        const images = await UserImage.find({ userId: req.params.userId });
        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an image
export const deleteUserImage = async (req, res) => {
    try {
        const image = await UserImage.findByIdAndDelete(req.params.id);
        if (!image) return res.status(404).json({ message: "Image not found" });
        res.status(200).json({ message: "Image deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
