const express = require("express");
const Joi = require("joi");
const db = require("../database/db");
const openLibraryService = require("../services/openLibraryService");

const router = express.Router();

// Validation schema
const bookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  isbn: Joi.string().required(),
  readStatus: Joi.boolean().default(false),
  userRating: Joi.number().min(0).max(5).optional(),
  notes: Joi.string().optional(),
});

// Get all books
router.get("/", async (req, res) => {
  const books = await db.getAllBooks();
  res.json(books);
});

// Add a new book
router.post("/", async (req, res) => {
  const { error, value } = bookSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const book = await db.addBook(value);
  res.status(201).json(book);
});

// Get a book by ID
router.get("/:id", async (req, res) => {
  const book = await db.getBookById(req.params.id);
  if (!book) return res.status(404).json({ error: "Book not found" });

  res.json(book);
});

// Update a book
router.put("/:id", async (req, res) => {
  const { error, value } = bookSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const updatedBook = await db.updateBook(req.params.id, value);
  if (!updatedBook) return res.status(404).json({ error: "Book not found" });

  res.json(updatedBook);
});

// Delete a book
router.delete("/:id", async (req, res) => {
  const deleted = await db.deleteBook(req.params.id);
  if (!deleted) return res.status(404).json({ error: "Book not found" });

  res.status(204).send();
});

// Search books using Open Library API
router.get("/search/:isbn", async (req, res) => {
  try {
    const bookDetails = await openLibraryService.searchBookByISBN(req.params.isbn);
    if (!bookDetails) return res.status(404).json({ error: "Book not found" });

    res.json(bookDetails);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch book details" });
  }
});

module.exports = router;
