import express from 'express';
import mongoose from 'mongoose'
import cors from 'cors';
import dotenv from 'dotenv';
import Router from '../backend/routes/record.js'

dotenv.config();
const app=express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/financial-records", Router);

app.get('/', (req, res) => {
    res.send('Server is running!');
  });

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }) 
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("MongoDB connection error:", error));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));