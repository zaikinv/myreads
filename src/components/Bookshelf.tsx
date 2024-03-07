import type { Bookshelf } from '../types/bookshelf.ts';
import BooksGrid from './BooksGrid.tsx';

interface BookShelfComponentProps {
  bookshelf: Bookshelf;
  onBookShelfChanged: () => void;
}

const Bookshelf = ({
  bookshelf,
  onBookShelfChanged,
}: BookShelfComponentProps) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{bookshelf.title}</h2>
      <div className="bookshelf-books">
        <BooksGrid
          books={bookshelf.books}
          onBookChanged={onBookShelfChanged}
        ></BooksGrid>
      </div>
    </div>
  );
};

export default Bookshelf;
