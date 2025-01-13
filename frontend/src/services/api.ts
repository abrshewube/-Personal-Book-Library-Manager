import axios from 'axios';
import { Book, BookInput } from '../types/book';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    throw new Error(error.response?.data?.error || 'An error occurred');
  }
  throw new Error('An unexpected error occurred');
};

export const bookService = {
  getAllBooks: async (): Promise<Book[]> => {
    try {
      const { data } = await api.get('/books');
      return data;
    } catch (error) {
      throw handleError(error);
    }
  },

  getBookById: async (id: number): Promise<Book> => {
    try {
      const { data } = await api.get(`/books/${id}`);
      return data;
    } catch (error) {
      throw handleError(error);
    }
  },

  createBook: async (book: BookInput): Promise<Book> => {
    try {
      const { data } = await api.post('/books', book);
      return data;
    } catch (error) {
      throw handleError(error);
    }
  },

  updateBook: async (id: number, book: BookInput): Promise<Book> => {
    try {
      const { data } = await api.put(`/books/${id}`, book);
      return data;
    } catch (error) {
      throw handleError(error);
    }
  },

  deleteBook: async (id: number): Promise<void> => {
    try {
      await api.delete(`/books/${id}`);
    } catch (error) {
      throw handleError(error);
    }
  },

  searchBookByISBN: async (isbn: string) => {
    try {
      const { data } = await api.get(`/books/search/${isbn}`);
      return data;
    } catch (error) {
      throw handleError(error);
    }
  },
};