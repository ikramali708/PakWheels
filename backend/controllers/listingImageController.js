import ListingImage from "../models/ListingImage.js";
import Listing from "../models/Listing.js";

// Upload image record (not the actual file yet)
export const uploadListingImage = async (req, res) => {
    try {
        const { listingId, imageUrl, isPrimary } = req.body;

        // Ensure listing exists
        const listing = await Listing.findById(listingId);
        if (!listing) return res.status(404).json({ message: "Listing not found" });

        const image = new ListingImage({
            listingId,
            imageUrl,
            isPrimary: isPrimary || false,
        });

        await image.save();
        res.status(201).json(image);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all images for a specific listing
export const getImagesByListingId = async (req, res) => {
    try {
        const images = await ListingImage.find({ listingId: req.params.listingId });
        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an image
export const deleteListingImage = async (req, res) => {
    try {
        const image = await ListingImage.findByIdAndDelete(req.params.id);
        if (!image) return res.status(404).json({ message: "Image not found" });
        res.status(200).json({ message: "Image deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
