import React from 'react';
import { Book, BookInput } from '../types/book';
import { Search } from 'lucide-react';

interface BookFormProps {
  initialData?: Book;
  onSubmit: (data: BookInput) => void;
  onCancel: () => void;
  onSearchISBN: (isbn: string) => Promise<void>;
}

export const BookForm: React.FC<BookFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  onSearchISBN,
}) => {
  const [formData, setFormData] = React.useState<BookInput>({
    title: initialData?.title || '',
    author: initialData?.author || '',
    isbn: initialData?.isbn || '',
    readStatus: initialData?.readStatus || false,
    userRating: initialData?.userRating || 0,
    notes: initialData?.notes || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">ISBN</label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              value={formData.isbn}
              onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
              className="flex-1 rounded-l-md border border-gray-300 px-3 py-2"
              placeholder="Enter ISBN"
            />
            <button
              type="button"
              onClick={() => onSearchISBN(formData.isbn)}
              className="inline-flex items-center px-4 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
            >
              <Search size={18} />
            </button>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Author</label>
        <input
          type="text"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Rating</label>
        <select
          value={formData.userRating}
          onChange={(e) => setFormData({ ...formData, userRating: Number(e.target.value) })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        >
          <option value="0">No rating</option>
          {[1, 2, 3, 4, 5].map((rating) => (
            <option key={rating} value={rating}>
              {rating} star{rating !== 1 ? 's' : ''}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.readStatus}
            onChange={(e) => setFormData({ ...formData, readStatus: e.target.checked })}
            className="rounded border-gray-300 text-blue-600"
          />
          <span className="text-sm text-gray-700">Mark as read</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Notes</label>
        <textarea
          value={formData.notes || ''}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={3}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
        >
          {initialData ? 'Update Book' : 'Add Book'}
        </button>
      </div>
    </form>
  );
};