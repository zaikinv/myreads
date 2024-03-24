import { Link } from 'react-router-dom';
import BooksGrid from '../components/BooksGrid.tsx';
import { getAll, search, update } from '../BooksAPI.ts';
import { BooksRaw } from '../types/booksAPI.ts';
import { CSSProperties, FormEvent, useEffect, useState } from 'react';
import {
  replaceBookById,
  updateStatusIfFoundInBookshelf,
} from '../utils/transform.ts';

const styleNoBooksOverlay: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
  position: 'absolute',
  fontSize: '20px',
  color: 'grey',
};

const SearchBooks = () => {
  const [books, setBooks] = useState([] as BooksRaw);
  const [booksFromBookshelf, setBooksFromBookshelf] = useState([] as BooksRaw);

  const searchBooks = async (event: FormEvent<HTMLInputElement>) => {
    const query = (event.target as HTMLInputElement).value;

    if (!/^[a-zA-Z0-9]*$/.test(query)) {
      setBooks([]);
      return;
    }

    if (!query.length) {
      setBooks([]);
      return;
    }

    const books = await search(query.trim(), '10');

    if (books.error) {
      setBooks([]);
    } else {
      const updatedBooks = updateStatusIfFoundInBookshelf(
        books,
        booksFromBookshelf,
      );
      setBooks(updatedBooks);
    }
  };

  const updateBook = async (bookId: string, targetShelfId: string) => {
    const bookNew = books.find((book) => book.id === bookId)!;

    await update({ id: bookId }, targetShelfId);

    setBooks((currentBooks) =>
      replaceBookById(currentBooks, { ...bookNew, shelf: targetShelfId }),
    );
  };

  useEffect(() => {
    getAll().then((books) => {
      setBooksFromBookshelf(books);
    });
  }, []);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onInput={searchBooks}
          />
        </div>
      </div>
      <div className="search-books-results">
        {books.length === 0 ? (
          <div style={styleNoBooksOverlay}>Nothing found 😟</div>
        ) : (
          <BooksGrid books={books} onBookChanged={updateBook}></BooksGrid>
        )}
      </div>
    </div>
  );
};

export default SearchBooks;
