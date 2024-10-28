import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import booksRouter from './routes/booksRouter';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// MongoDB connection
mongoose.connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Use the books router
app.use('/books', booksRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
