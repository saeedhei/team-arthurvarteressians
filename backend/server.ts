import express, { Request, Response } from 'express';
import mongoose, { Document, Model } from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());

// MongoDB connection
mongoose
  .connect("mongodb+srv://root:hap9S2%40NLSA2hX%40@bookstore.7e2l3.mongodb.net/bookstore")
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));



// Define the interface for the book schema
interface IBook extends Document {
  title: string;
  author: string;
  price: number;
  description: string;
  category: string;
}

// Define the book schema
const bookSchema = new mongoose.Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
});

// Create the Book model based on the schema
const Book: Model<IBook> = mongoose.model<IBook>('Book', bookSchema);


app.get('/books', async (req: Request, res: Response) => {
     try {
       const { page = '1', title, category, author } = req.query as {
         page?: string;
         title?: string;
         category?: string;
         author?: string;
       };
   
       const limit = 6;
       const pageNumber = parseInt(page, 10); // Convert page to number
       const skip = (pageNumber - 1) * limit;
   
       const query: any = {};
       if (title) query.title = { $regex: title, $options: 'i' };
       if (category) query.category = category;
       if (author) query.author = author;
   
       const books = await Book.find(query).skip(skip).limit(limit);
       const totalBooks = await Book.countDocuments(query);
   
       res.json({
         books,
         totalPages: Math.ceil(totalBooks / limit),
         currentPage: pageNumber,
         totalBooks,
       });
     } catch (error) {
       res.status(500).json({ message: 'Error fetching books', error });
     }
   });
   


// Get distinct categories and authors for filters
app.get('/books/filters', async (req: Request, res: Response) => {
  try {
    const categories = await Book.distinct('category'); // Unique categories
    const authors = await Book.distinct('author');      // Unique authors

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
