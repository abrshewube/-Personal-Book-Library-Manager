export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  readStatus: boolean;
  userRating: number;
  notes: string | null;
}

export interface BookInput {
  title: string;
  author: string;
  isbn: string;
  readStatus: boolean;
  userRating: number;
  notes: string | null;
}