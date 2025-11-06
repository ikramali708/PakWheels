
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import listingImageRoutes from "./routes/listingImageRoutes.js";
import userImageRoutes from "./routes/userImageRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/listing-images", listingImageRoutes);
app.use("/api/user-images", userImageRoutes);
app.use("/api/reviews", reviewRoutes);




// Simple route
app.get("/", (req, res) => res.send("API is running..."));

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(" MongoDB Error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
