"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// MongoDB connection
mongoose_1.default
    .connect("mongodb+srv://root:hap9S2%40NLSA2hX%40@bookstore.7e2l3.mongodb.net/bookstore")
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));
// Define the book schema
const bookSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
});
// Create the Book model based on the schema
const Book = mongoose_1.default.model('Book', bookSchema);
app.get('/books', async (req, res) => {
    try {
        const { page = '1', title, category, author } = req.query;
        const limit = 6;
        const pageNumber = parseInt(page, 10); // Convert page to number
        const skip = (pageNumber - 1) * limit;
        const query = {};
        if (title)
            query.title = { $regex: title, $options: 'i' };
        if (category)
            query.category = category;
        if (author)
            query.author = author;
        const books = await Book.find(query).skip(skip).limit(limit);
        const totalBooks = await Book.countDocuments(query);
        res.json({
            books,
            totalPages: Math.ceil(totalBooks / limit),
            currentPage: pageNumber,
            totalBooks,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching books', error });
    }
});
// Get distinct categories and authors for filters
app.get('/books/filters', async (req, res) => {
    try {
        const categories = await Book.distinct('category'); // Unique categories
        const authors = await Book.distinct('author'); // Unique authors
        res.json({ categories, authors });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching filters', error });
    }
});
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
