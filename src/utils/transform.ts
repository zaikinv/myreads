import { BookRaw, BooksRaw } from '../types/booksAPI';
import { Bookshelf } from '../types/bookshelf';
import { ShelfType } from '../constants';

export const booksToBookshelves = (books: BooksRaw): Bookshelf[] => {
  const initialState: Bookshelf[] = [
    {
      title: ShelfType.currentlyReading,
      books: [],
    },
    {
      title: ShelfType.wantToRead,
      books: [],
    },
    {
      title: ShelfType.read,
      books: [],
    },
    {
      title: ShelfType.none,
      books: [],
    },
  ];
  return books.reduce(
    (acc: Array<{ title: string; books: BooksRaw }>, book) => {
      const index = acc.findIndex((shelf) => shelf.title === book.shelf);
      if (index > -1) {
        acc[index].books.push(book);
      } else {
        acc.push({
          title: book.shelf,
          books: [book],
        });
      }
      return acc;
    },
    initialState,
  );
};

export const replaceBookById = (
  currentBooks: BooksRaw,
  bookNew: BookRaw,
): BooksRaw => {
  const index = currentBooks.findIndex((b) => b.id === bookNew.id);
  if (index >= 0) {
    const updatedBooks = [
      ...currentBooks.slice(0, index),
      bookNew,
      ...currentBooks.slice(index + 1),
    ];
    return updatedBooks;
  }
  return currentBooks;
};

export const updateStatusIfFoundInBookshelf = (
  books: BooksRaw,
  booksFromBookshelf: BooksRaw,
): BooksRaw => {
  return books.map((searchBook: BookRaw) => {
    const bookFound = booksFromBookshelf.find(
      (shelfBook) => shelfBook.id === searchBook.id,
    );
    if (bookFound) {
      return { ...searchBook, shelf: bookFound.shelf };
    } else {
      return { ...searchBook, shelf: 'none' };
    }
  });
};
