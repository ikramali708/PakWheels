// middleware/authMiddleware.js
import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
    try {
        // Get token from Authorization header (Bearer <token>)
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1]; // extract token after "Bearer"

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "mysecretkey");

        // Attach user info to request (for use in controllers)
        req.user = decoded;

        next(); // continue to next middleware or controller
    } catch (err) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};
