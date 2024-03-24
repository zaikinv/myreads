import Bookshelf from '../components/Bookshelf.tsx';
import { useEffect, useState } from 'react';
import { Bookshelf as BookshelfType } from '../types/bookshelf.ts';
import { booksToBookshelves } from '../utils';
import { getAll, update } from '../BooksAPI';
import { Link } from 'react-router-dom';

export interface ListBooksProps {
  title: string;
}

const ListBooks = ({ title }: ListBooksProps) => {
  const [bookshelves, setBookshelves] = useState([] as BookshelfType[]);

  const fetchData = async () => {
    try {
      const books = await getAll();
      setBookshelves(booksToBookshelves(books));
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateBookshelves = async (
    bookId: string,
    sourceShelfId: string,
    targetShelfId: string,
  ) => {
    const sourceBookshelf = bookshelves.find(
      (bookshelf) => bookshelf.title === sourceShelfId,
    )!;
    const targetBookshelf = bookshelves.find(
      (bookshelf) => bookshelf.title === targetShelfId,
    )!;

    const bookIndex = sourceBookshelf.books.findIndex((b) => b.id === bookId);
    const book = sourceBookshelf.books[bookIndex];
    book.shelf = targetShelfId;

    sourceBookshelf.books.splice(bookIndex, 1);
    targetBookshelf.books.push(book);

    await update({ id: bookId }, targetShelfId);

    setBookshelves([...bookshelves]);
  };

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>{title}</h1>
      </div>
      <div className="list-books-content">
        <div>
          {bookshelves.map((bookshelf, index) => {
            return (
              bookshelf.title !== 'none' && (
                <Bookshelf
                  key={index}
                  bookshelf={bookshelf}
                  onBookShelfChanged={updateBookshelves}
                ></Bookshelf>
              )
            );
          })}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

export default ListBooks;
