const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());

// Connect to MongoDB Atlas
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

// Define the book schema that should be retrieved from the database
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  price: Number,
  description: String,
  category: String,
});

// Create the Book model based on the schema
const Book = mongoose.model("Book", bookSchema);


app.get("/books", async (req, res) => {
  try {
    const { page = 1, title } = req.query;
    const limit = 9;
    const skip = (page - 1) * limit;

    const query = {};
    if (title) query.title = { $regex: title, $options: "i" }; // Search books by title (case-insensitive)

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
