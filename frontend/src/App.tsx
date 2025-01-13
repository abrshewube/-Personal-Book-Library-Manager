import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { BookCard } from './components/BookCard';
import { BookForm } from './components/BookForm';
import { SearchBar } from './components/SearchBar';
import { bookService } from './services/api';
import { Book, BookInput } from './types/book';
import { Plus, Library } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  
  const queryClient = useQueryClient();

  const { data: books = [], isLoading, error: booksError } = useQuery('books', bookService.getAllBooks, {
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const createBookMutation = useMutation(bookService.createBook, {
    onSuccess: () => {
      queryClient.invalidateQueries('books');
      toast.success('Book added successfully');
      setShowForm(false);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const updateBookMutation = useMutation(
    ({ id, data }: { id: number; data: BookInput }) => 
      bookService.updateBook(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('books');
        toast.success('Book updated successfully');
        setShowForm(false);
        setEditingBook(null);
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    }
  );

  const deleteBookMutation = useMutation(bookService.deleteBook, {
    onSuccess: () => {
      queryClient.invalidateQueries('books');
      toast.success('Book deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleSearchISBN = async (isbn: string) => {
    try {
      const bookData = await bookService.searchBookByISBN(isbn);
      toast.success('Book details found');
      // Handle the found book data
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Failed to search book');
      }
    }
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase()) ||
    book.isbn.includes(search)
  );

  if (booksError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Books</h2>
          <p className="text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Library size={32} className="text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Book Manager</h1>
          </div>
          <button
            onClick={() => {
              setEditingBook(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={20} />
            Add Book
          </button>
        </div>

        <div className="mb-6">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-semibold mb-4">
                {editingBook ? 'Edit Book' : 'Add New Book'}
              </h2>
              <BookForm
                initialData={editingBook || undefined}
                onSubmit={(data) => {
                  if (editingBook) {
                    updateBookMutation.mutate({ id: editingBook.id, data });
                  } else {
                    createBookMutation.mutate(data);
                  }
                }}
                onCancel={() => {
                  setShowForm(false);
                  setEditingBook(null);
                }}
                onSearchISBN={handleSearchISBN}
              />
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-12">Loading...</div>
        ) : filteredBooks.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No books found. Add some books to get started!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onEdit={(book) => {
                  setEditingBook(book);
                  setShowForm(true);
                }}
                onDelete={(id) => {
                  if (window.confirm('Are you sure you want to delete this book?')) {
                    deleteBookMutation.mutate(id);
                  }
                }}
                onToggleRead={(id, readStatus) => {
                  const book = books.find(b => b.id === id);
                  if (book) {
                    updateBookMutation.mutate({
                      id,
                      data: { ...book, readStatus },
                    });
                  }
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;