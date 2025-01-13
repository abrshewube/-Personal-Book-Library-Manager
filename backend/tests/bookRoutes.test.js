const request = require('supertest');
const app = require('../index'); 

describe('Book Routes API', () => {
  let bookId;

  test('GET /api/books - should return all books (initially empty)', async () => {
    const response = await request(app).get('/api/books');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]); 
  });

  test('POST /api/books - should create a new book', async () => {
    const newBook = {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      isbn: '9780743273565',
      readStatus: false,
      userRating: 5,
      notes: 'A classic book.',
    };

    const response = await request(app).post('/api/books').send(newBook);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe(newBook.title);

    bookId = response.body.id; // Save book ID for other tests
  });

  test('GET /api/books/:id - should return a book by ID', async () => {
    const response = await request(app).get(`/api/books/${bookId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', bookId);
    expect(response.body.title).toBe('The Great Gatsby');
  });

  test('PUT /api/books/:id - should update a book', async () => {
    const updatedBook = {
      title: 'The Great Gatsby - Updated',
      author: 'F. Scott Fitzgerald',
      isbn: '9780743273565',
      readStatus: true,
      userRating: 4,
      notes: 'An updated note.',
    };

    const response = await request(app).put(`/api/books/${bookId}`).send(updatedBook);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('title', updatedBook.title);
    expect(response.body.readStatus).toBe(true);
  });

  test('DELETE /api/books/:id - should delete a book', async () => {
    const response = await request(app).delete(`/api/books/${bookId}`);
    expect(response.status).toBe(204);

    // Verify the book was deleted
    const getResponse = await request(app).get(`/api/books/${bookId}`);
    expect(getResponse.status).toBe(404);
  });

  test('GET /api/books/search/:isbn - should fetch book details from Open Library API', async () => {
    const isbn = '9780743273565';
    const response = await request(app).get(`/api/books/search/${isbn}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('title', 'The Great Gatsby');
  });
});
