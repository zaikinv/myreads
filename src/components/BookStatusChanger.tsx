import { ChangeEvent } from 'react';
import { BookRaw } from '../types/booksAPI.ts';
import { shelves } from '../constants';

interface BookShelfChangerProps {
  onChange: (bookId: string, targetShelfId: string) => void;
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
        <option disabled>Move to...</option>
        {Object.values(shelves).map((option) => (
          <option key={option.shelfName} value={option.shelfName}>
            {option.shelfDisplayName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BookStatusChanger;
