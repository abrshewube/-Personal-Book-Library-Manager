import React from 'react';
import { Book } from '../types/book';
import { Star, Trash2, Edit, Book as BookIcon } from 'lucide-react';
import { clsx } from 'clsx';

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (id: number) => void;
  onToggleRead: (id: number, readStatus: boolean) => void;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  onEdit,
  onDelete,
  onToggleRead,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-[1.02]">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{book.title}</h3>
          <p className="text-gray-600">{book.author}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(book)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
          > 
            <Edit size={18} />
          </button>
          <button
            onClick={() => onDelete(book.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-full"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-3">
        <button
          // onClick={() => onToggleRead(book.id, !book.readStatus)}
          className={clsx(
            "flex items-center gap-2 px-3 py-1 rounded-full text-sm",
            book.readStatus
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          )}
        >
          <BookIcon size={14} />
          {book.readStatus ? "Read" : "Unread"}
        </button>
        
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              size={16}
              className={clsx(
                "transition-colors",
                index < book.userRating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              )}
            />
          ))}
        </div>
      </div>

      {book.notes && (
        <p className="text-sm text-gray-600 mt-2">{book.notes}</p>
      )}
      
      <div className="mt-3 text-xs text-gray-500">
        ISBN: {book.isbn}
      </div>
    </div>
  );
};