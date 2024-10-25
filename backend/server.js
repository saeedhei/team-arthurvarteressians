const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());

// Connect to MongoDB Atlas.
mongoose
  .connect(
    "mongodb+srv://root:hap9S2%40NLSA2hX%40@bookstore.7e2l3.mongodb.net/bookstore",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Define the book schema, get info from DB.
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  price: Number,
  description: String,
  category: String,
});

// Create the book model based on the schema
const Book = mongoose.model("Book", bookSchema);


app.get("/books", async (req, res) => { // Our endpoint
  try {
    const { page = 1, title, category, author } = req.query; // Get info based on requirements.
    const limit = 6; // Content limit for each request.
    const skip = (page - 1) * limit; // Because our data is low, I used the skip method. But for larger data, we can use _id method.

    const query = {}; // Initializes an empty query obj for hold conditions.
    if (title) query.title = { $regex: title, $options: "i" }; // Search books by title (case-insensitive for match any case variation)
    if (category) query.category = category;
    if (author) query.author = author;

    const books = await Book.find(query).skip(skip).limit(limit);
    const totalBooks = await Book.countDocuments(query);

    res.json({
      books,
      totalPages: Math.ceil(totalBooks / limit),
      currentPage: parseInt(page),
      totalBooks,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
});

app.get("/books/filters", async (req, res) => {
  try {
    const categories = await Book.distinct('category'); // Get unique categories
    const authors = await Book.distinct('author');      // Get unique authors

    res.json({ categories, authors });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching filters', error });
  }
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
