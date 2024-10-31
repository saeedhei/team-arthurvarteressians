// app.ts
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import booksRouter from './routes/booksRouter';
import { connectToDatabase } from './database';

dotenv.config();

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Database connection
connectToDatabase();

// Routes
app.use('/books', booksRouter);

// 404 Error Handler for Undefined Routes
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // Passes the error to the global error handler
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err); // Logs the error stack trace in the console

  // Set the status code based on the error or default to 500
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  // Provide detailed error message in development; otherwise, generic error
  res.json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }), // Stack trace only in development mode
  });
});

export default app;
