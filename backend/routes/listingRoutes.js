import express from "express";
import {
    createListing,
    getAllListings,
    getListingById,
    updateListing,
    deleteListing,
} from "../controllers/listingController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getAllListings);
router.get("/:id", getListingById);

// Protected
router.post("/", protect, createListing);
router.put("/:id", protect, updateListing);
router.delete("/:id", protect, deleteListing);

export default router;
