// server.js

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// routes
import albumRoutes from "./routes/albumRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import photoRoutes from "./routes/photoRoutes.js";

// connect .env
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use("/api/albums", albumRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/photos", photoRoutes);
app.use("/uploads", express.static("uploads"));

// connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(5000, () => console.log("🚀 Server running on port 5000"));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
