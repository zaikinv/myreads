import { BookRaw, BooksRaw } from '../types/booksAPI';
import { Bookshelf } from '../types/bookshelf';

export const booksToBookshelves = (books: BooksRaw): Bookshelf[] => {
  return books.reduce(
    (acc: Array<{ title: string; books: BooksRaw }>, book) => {
      const index = acc.findIndex(
        (shelf) => shelf.title === camelCaseToSentence(book.shelf),
      );
      if (index > -1) {
        acc[index].books.push(book);
      } else {
        acc.push({ title: camelCaseToSentence(book.shelf), books: [book] });
      }
      return acc;
    },
    [],
  );
};

export const replaceBookById = (
  currentBooks: BooksRaw,
  bookNew: BookRaw,
  book: BookRaw,
): BooksRaw => {
  const index = currentBooks.findIndex((b) => b.id === book.id);
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
  booksFromBookShelf: BooksRaw,
): BooksRaw => {
  return books.map((book) => {
    const bookFromBookshelf = booksFromBookShelf.find((b) => b.id === book.id);
    if (bookFromBookshelf) {
      return bookFromBookshelf;
    }
    return book;
  });
};

const camelCaseToSentence = (camelCase: string): string => {
  return camelCase
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase());
};
