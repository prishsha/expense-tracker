import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Router from '../backend/routes/record.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for API requests
app.use(cors());
app.use(express.json());

// API routes
app.use("/financial-records", Router);

// Serve frontend files after build
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../frontend/build"))); // Serve frontend build

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log("MongoDB connection error:", error));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
