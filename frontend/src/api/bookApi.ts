import axios from "axios";

const API_URL = "http://localhost:3000/api/books";

export const getBooks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addBook = async (book: any) => {
  const response = await axios.post(API_URL, book);
  return response.data;
};

// Add more API methods as needed
