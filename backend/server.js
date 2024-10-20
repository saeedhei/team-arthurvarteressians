const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize the express app
const app = express();
app.use(cors());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://root:hap9S2%40NLSA2hX%40@bookstore.7e2l3.mongodb.net/bookstore', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Define the Book Schema
const bookSchema = new mongoose.Schema({
  id: Number,
  title: String,
  author: String,
  price: Number,
  description: String,
  category: String,
});

// Create the Book model
const Book = mongoose.model('Book', bookSchema);

// API endpoint to fetch all books
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
