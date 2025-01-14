# Personal Book Library Manager

A full-stack web application for managing your personal book collection. Keep track of your books, reading status, ratings, and notes all in one place.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-blue)](https://personal-book-library-manager.vercel.app/)

## Features

- 📚 Manage your personal book collection
- 🔍 Search books by ISBN using Open Library API
- ⭐ Rate and review books
- ✏️ Add personal notes for each book
- 📖 Track reading status
- 🎯 RESTful API backend
- 💫 Modern, responsive UI

## Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- Vite for build tooling

### Backend
- Node.js
- Express.js
- SQLite database
- Open Library API integration

## API Endpoints

### Books Management

#### `GET /api/books`
List all books in the library
- Response: `200 OK`
```json
[
  {
    "id": 1,
    "title": "Book Title",
    "author": "Author Name",
    "isbn": "1234567890",
    "readStatus": false,
    "userRating": 0,
    "notes": null
  }
]
```

#### `POST /api/books`
Add a new book
- Request Body:
```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "isbn": "9780743273565",
  "readStatus": true,
  "userRating": 5,
  "notes": "A classic book."
}
```
- Response: `201 Created`

#### `GET /api/books/:id`
Get a specific book by ID
- Response: `200 OK`
- Error: `404 Not Found` if book doesn't exist

#### `PUT /api/books/:id`
Update a book's details
- Request Body: Same as POST
- Response: `200 OK`
- Error: `404 Not Found` if book doesn't exist

#### `DELETE /api/books/:id`
Delete a book
- Response: `204 No Content`
- Error: `404 Not Found` if book doesn't exist

#### `GET /api/books/search/:isbn`
Search for a book by ISBN using Open Library API
- Response: `200 OK`
```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "isbn": "9780743273565"
}
```
- Error: `404 Not Found` if ISBN not found

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Docker (optional)

### Installation

#### Option 1: Local Setup

1. Clone the repository:
```bash
git clone https://github.com/abrshewube/-Personal-Book-Library-Manager.git
```

2. Frontend setup:
```bash
cd frontend
npm install
npm run dev
```

3. Backend setup:
```bash
cd backend
npm install
npm run dev
```

#### Option 2: Docker Setup

1. Clone the repository:
```bash
git clone https://github.com/abrshewube/-Personal-Book-Library-Manager.git
```

2. Build and run with Docker Compose:
```bash
docker-compose up --build
```

This will:
- Build the frontend container
- Build the backend container
- Start both services
- Frontend will be available at http://localhost:5173
- Backend will be available at http://localhost:3000

To stop the containers:
```bash
docker-compose down
```

## Testing

The project includes comprehensive test coverage for all API endpoints using Jest and Supertest.

### Running Tests

#### Local Testing
```bash
cd backend
npm test
```

### Test Coverage
- GET /api/books - List all books
- POST /api/books - Create new book
- GET /api/books/:id - Get single book
- PUT /api/books/:id - Update book
- DELETE /api/books/:id - Delete book
- GET /api/books/search/:isbn - Search by ISBN

## Live Demo

Visit the live demo at [https://personal-book-library-manager.vercel.app/](https://personal-book-library-manager.vercel.app/)

## Acknowledgments
- [Open Library API](https://openlibrary.org/developers/api) for book data
