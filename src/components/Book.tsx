import BookCover from './BookCover.tsx';
import BookStatusChanger from './BookStatusChanger.tsx';
import { update } from '../BooksAPI';
import { BookRaw } from '../types/booksAPI.ts';

export interface BookComponentProps {
  book: BookRaw;
  onBookChanged?: (book: BookRaw) => void;
}

const Book = ({ book, onBookChanged }: BookComponentProps) => {
  const changeStatus = async (bookId: string, shelfId: string) => {
    try {
      await update({ id: bookId }, shelfId);
      if (onBookChanged) onBookChanged(book);
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
      <div className="book-authors">{book.authors}</div>
    </div>
  );
};

export default Book;
