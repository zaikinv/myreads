import Bookshelf from '../components/Bookshelf.tsx';
import { useEffect, useState } from 'react';
import { Bookshelf as BookshelfType } from '../types/bookshelf.ts';
import { booksToBookshelves } from '../utils';
import { getAll } from '../BooksAPI';
import { Link } from 'react-router-dom';

export interface ListBooksProps {
  title: string;
}

const styleLoadingListBooks = {
  filter: 'blur(4px)',
};

const ListBooks = ({ title }: ListBooksProps) => {
  const [bookshelves, setBookshelves] = useState([] as BookshelfType[]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const books = await getAll();
      setBookshelves(booksToBookshelves(books));
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateBookshelves = () => {
    fetchData();
  };

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>{title}</h1>
      </div>
      <div className="list-books-content">
        <div style={loading ? styleLoadingListBooks : {}}>
          {bookshelves.map((bookshelf, index) => (
            <Bookshelf
              key={index}
              bookshelf={bookshelf}
              onBookShelfChanged={updateBookshelves}
            ></Bookshelf>
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

export default ListBooks;
