// services/booksService.ts
import Book from '../models/Book';
import { FilterQuery } from 'mongoose';

export const getBooks = async (query: FilterQuery<typeof Book>, sortOrder: 1 | -1, skip: number, limit: number) => {
  return await Book.find(query).sort({ _id: sortOrder }).skip(skip).limit(limit);
};

export const countBooks = async (query: FilterQuery<typeof Book>) => {
  return await Book.countDocuments(query);
};

export const getDistinctCategories = async () => {
  return await Book.distinct('category');
};

export const getDistinctAuthors = async () => {
  return await Book.distinct('author');
};

export const addBook = async (data: any) => {
  const newBook = new Book(data);
  return await newBook.save();
};

export const updateBookById = async (id: string, data: any) => {
  return await Book.findByIdAndUpdate(id, data, { new: true });
};

export const deleteBookById = async (id: string) => {
  return await Book.findByIdAndDelete(id);
};
