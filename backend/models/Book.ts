// models/Book.ts
import mongoose, { Document, Schema, Model } from 'mongoose';

// Define the IBook interface extending Document for TypeScript typing
export interface IBook extends Document {
  title: string;
  author: string;
  price: number;
  description: string;
  category: string;
}

// Define the book schema
const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
});

// Create the Book model
const Book: Model<IBook> = mongoose.model<IBook>('Book', bookSchema);
export default Book;
