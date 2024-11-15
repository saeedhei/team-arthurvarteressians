// controllers/booksController.ts
import { Request, Response } from 'express';
import { getBooks, countBooks, getDistinctCategories, getDistinctAuthors, addBook, updateBookById, deleteBookById } from '../services/booksService';

export const getBooksHandler = async (req: Request, res: Response) => {
  try {
    const { page = '1', title, category, author, sort = 'desc' } = req.query as {
      page?: string;
      title?: string;
      category?: string;
      author?: string;
      sort?: 'asc' | 'desc';
    };
    const limit = 6;
    const pageNumber = parseInt(page, 10);
    const skip = (pageNumber - 1) * limit;

    const query: any = {};
    if (title) query.title = { $regex: title, $options: 'i' };
    if (category) query.category = category;
    if (author) query.author = author;

    const sortOrder = sort === 'desc' ? -1 : 1;

    const books = await getBooks(query, sortOrder, skip, limit);
    const totalBooks = await countBooks(query);

    res.json({
      books,
      totalPages: Math.ceil(totalBooks / limit),
      currentPage: pageNumber,
      totalBooks,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error });
  }
};

export const getFiltersHandler = async (req: Request, res: Response) => {
  try {
    const categories = await getDistinctCategories();
    const authors = await getDistinctAuthors();
    res.json({ categories, authors });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching filters', error });
  }
};

export const addBookHandler = async (req: Request, res: Response) => {
  try {
    const book = await addBook(req.body);
    res.status(201).json({ message: 'Book added successfully', book });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add book', error });
  }
};

export const updateBookHandler = async (req: Request, res: Response) => {
  try {
    const updatedBook = await updateBookById(req.params.id, req.body);
    if (!updatedBook) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }
    res.json({ message: 'Book updated successfully', book: updatedBook });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update book', error });
  }
};

export const deleteBookHandler = async (req: Request, res: Response) => {
  try {
    const deletedBook = await deleteBookById(req.params.id);
    if (!deletedBook) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete book', error });
  }
};
