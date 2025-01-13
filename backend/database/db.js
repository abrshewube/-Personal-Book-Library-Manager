const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(":memory:");

// Initialization to database
db.serialize(() => {
  db.run(`CREATE TABLE books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    isbn TEXT UNIQUE NOT NULL,
    readStatus BOOLEAN DEFAULT 0,
    userRating INTEGER DEFAULT 0,
    notes TEXT
  )`);
});

function getAllBooks() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM books", [], (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
}

function getBookById(id) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM books WHERE id = ?", [id], (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
}

function addBook(book) {
  return new Promise((resolve, reject) => {
    const { title, author, isbn, readStatus, userRating, notes } = book;
    db.run(
      `INSERT INTO books (title, author, isbn, readStatus, userRating, notes)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [title, author, isbn, readStatus, userRating, notes],
      function (err) {
        if (err) reject(err);
        resolve({ id: this.lastID, ...book });
      }
    );
  });
}

function updateBook(id, book) {
  return new Promise((resolve, reject) => {
    const { title, author, isbn, readStatus, userRating, notes } = book;
    db.run(
      `UPDATE books SET title = ?, author = ?, isbn = ?, readStatus = ?, userRating = ?, notes = ?
       WHERE id = ?`,
      [title, author, isbn, readStatus, userRating, notes, id],
      function (err) {
        if (err) reject(err);
        resolve(this.changes ? { id, ...book } : null);
      }
    );
  });
}

function deleteBook(id) {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM books WHERE id = ?", [id], function (err) {
      if (err) reject(err);
      resolve(this.changes > 0);
    });
  });
}

module.exports = {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
};
