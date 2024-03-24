import type { Bookshelf } from '../types/bookshelf.ts';
import BooksGrid from './BooksGrid.tsx';
import { shelves } from '../constants';

interface BookShelfComponentProps {
  bookshelf: Bookshelf;
  onBookShelfChanged: (
    bookId: string,
    sourceShelfId: string,
    targetShelfId: string,
  ) => void;
}

const Bookshelf = ({
  bookshelf,
  onBookShelfChanged,
}: BookShelfComponentProps) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">
        {shelves[bookshelf.title].shelfDisplayName}
      </h2>
      {bookshelf.books.length === 0 ? (
        <div>Nothing here...</div>
      ) : (
        <div className="bookshelf-books">
          <BooksGrid
            books={bookshelf.books}
            onBookChanged={(bookId, targetShelfId) =>
              onBookShelfChanged(bookId, bookshelf.title, targetShelfId)
            }
          ></BooksGrid>
        </div>
      )}
    </div>
  );
};

export default Bookshelf;
