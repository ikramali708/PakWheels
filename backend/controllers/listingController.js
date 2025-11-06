import Listing from "../models/Listing.js";
import Category from "../models/Category.js";

// Create Listing
export const createListing = async (req, res) => {
    try {
        const listing = new Listing(req.body);
        await listing.save();
        res.status(201).json(listing);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get All Listings
export const getAllListings = async (req, res) => {
    try {
        const listings = await Listing.find()
            .populate("userId", "name email")
            .populate("categoryId", "name");
        res.status(200).json(listings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Single Listing
export const getListingById = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id)
            .populate("userId", "name email")
            .populate("categoryId", "name");

        if (!listing) return res.status(404).json({ message: "Listing not found" });

        res.status(200).json(listing);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Listing
export const updateListing = async (req, res) => {
    try {
        const listing = await Listing.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!listing) return res.status(404).json({ message: "Listing not found" });

        res.status(200).json(listing);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete Listing
export const deleteListing = async (req, res) => {
    try {
        const listing = await Listing.findByIdAndDelete(req.params.id);
        if (!listing) return res.status(404).json({ message: "Listing not found" });
        res.status(200).json({ message: "Listing deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
