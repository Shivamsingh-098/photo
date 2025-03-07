import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

// Cloudinary Config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1);
    }
};

connectDB();

// Image Schema
const ImageSchema = new mongoose.Schema({
    url: String,
    createdAt: { type: Date, default: Date.now },
});
const Image = mongoose.model("Image", ImageSchema);

// Multer Setup for File Uploads
const storage = multer.diskStorage({});
const upload = multer({ storage });

// Upload Route
app.post("/upload", upload.single("image"), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        fs.unlinkSync(req.file.path); // Remove file after upload

        const newImage = new Image({ url: result.secure_url });
        await newImage.save();

        res.json({ success: true, url: result.secure_url });
    } catch (error) {
        res.status(500).json({ success: false, message: "Upload failed" });
    }
});

// Fetch Images Route
app.get("/images", async (req, res) => {
    try {
        const images = await Image.find();
        res.json(images);
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch images" });
    }
});

// Delete Image Route
app.delete("/delete/:id", async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) return res.status(404).json({ success: false, message: "Image not found" });

        // Extract Cloudinary public ID from URL
        const publicId = image.url.split("/").pop().split(".")[0];

        // Delete from Cloudinary
        await cloudinary.uploader.destroy(publicId);

        // Delete from MongoDB
        await Image.findByIdAndDelete(req.params.id);

        res.json({ success: true, message: "Image deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Delete failed" });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
