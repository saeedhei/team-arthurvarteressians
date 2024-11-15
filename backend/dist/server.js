"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const booksRouter_1 = __importDefault(require("./routes/booksRouter"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json()); // Middleware to parse JSON bodies
// MongoDB connection
mongoose_1.default.connect(process.env.MONGO_URI)
    .then(() => {
    console.log("Connected to MongoDB Atlas");
})
    .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});
// Use the books router
app.use('/books', booksRouter_1.default);
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
