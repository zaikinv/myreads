import { BooksRaw } from './booksAPI.ts';

export type Bookshelf = {
  title: string;
  books: BooksRaw;
};
