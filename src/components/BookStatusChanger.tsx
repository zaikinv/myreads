import { ChangeEvent } from 'react';
import { BookRaw } from '../types/booksAPI.ts';

interface BookShelfChangerProps {
  onChange: (bookId: string, bookStatus: string) => void;
  book: BookRaw;
}

const BookStatusChanger = ({ onChange, book }: BookShelfChangerProps) => {
  const changeEventHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(book.id, event.target.value);
  };

  return (
    <div className="book-shelf-changer">
      <select
        onChange={changeEventHandler}
        value={book.shelf ? book.shelf : 'none'}
      >
        <option value="none" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
};

export default BookStatusChanger;
