// routes/booksRouter.ts
import express from 'express';
import { getBooksHandler, getFiltersHandler, addBookHandler, updateBookHandler, deleteBookHandler } from '../controllers/booksController';

const router = express.Router();

router.get('/', getBooksHandler);
router.get('/filters', getFiltersHandler);
router.post('/', addBookHandler);
router.put('/:id', updateBookHandler);
router.delete('/:id', deleteBookHandler);

export default router;
