import BookCover from './BookCover.tsx';
import BookStatusChanger from './BookStatusChanger.tsx';
import { BookRaw } from '../types/booksAPI.ts';

export interface BookComponentProps {
  book: BookRaw;
  onBookChanged?: (bookId: string, targetShelfId: string) => void;
}

const Book = ({ book, onBookChanged }: BookComponentProps) => {
  const changeStatus = async (bookId: string, targetShelfId: string) => {
    try {
      if (onBookChanged) onBookChanged(bookId, targetShelfId);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div className="book">
      <div className="book-top">
        <BookCover
          backgroundImage={book?.imageLinks?.smallThumbnail || ''}
        ></BookCover>
        <BookStatusChanger
          onChange={changeStatus}
          book={book}
        ></BookStatusChanger>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{(book.authors || []).join(', ')}</div>
    </div>
  );
};

export default Book;
