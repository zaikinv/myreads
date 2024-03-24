import { BooksRaw, BookRaw } from '../types/booksAPI.ts';
import Book from './Book.tsx';

interface BookGridComponentProps {
  books?: BooksRaw;
  onBookChanged?: (bookId: string, targetShelfId: string) => void;
}

const BooksGrid = ({ books = [], onBookChanged }: BookGridComponentProps) => {
  return (
    <ol className="books-grid">
      {books.map((book: BookRaw, index: number) => (
        <li key={index}>
          <Book book={book} onBookChanged={onBookChanged}></Book>
        </li>
      ))}
    </ol>
  );
};

export default BooksGrid;
