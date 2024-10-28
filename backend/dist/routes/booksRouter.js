"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/booksRouter.ts
const express_1 = __importDefault(require("express"));
const Book_1 = __importDefault(require("../models/Book"));
const router = express_1.default.Router();
// GET /books - Fetch paginated books with optional filters
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = '1', title, category, author } = req.query;
        const limit = 6;
        const pageNumber = parseInt(page, 10);
        const skip = (pageNumber - 1) * limit;
        const query = {};
        if (title)
            query.title = { $regex: title, $options: 'i' };
        if (category)
            query.category = category;
        if (author)
            query.author = author;
        const books = yield Book_1.default.find(query).skip(skip).limit(limit);
        const totalBooks = yield Book_1.default.countDocuments(query);
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
}));
// GET /books/filters - Fetch unique categories and authors
router.get('/filters', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield Book_1.default.distinct('category');
        const authors = yield Book_1.default.distinct('author');
        res.json({ categories, authors });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching filters', error });
    }
}));
// PUT /books/:id - Update book details
const updateBookHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, author, price } = req.body;
        const updatedBook = yield Book_1.default.findByIdAndUpdate(id, { title, author, price }, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.json({ message: "Book updated successfully", book: updatedBook });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update book", error });
    }
});
router.put('/:id', updateBookHandler);
// DELETE /books/:id - Delete a book
const deleteBookHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedBook = yield Book_1.default.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.json({ message: "Book deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete book", error });
    }
});
router.delete('/:id', deleteBookHandler);
exports.default = router;
