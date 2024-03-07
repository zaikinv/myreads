export type BooksRaw = BookRaw[];

export type BookRaw = {
  title: string;
  subtitle?: string;
  authors: string[];
  publisher?: string;
  publishedDate: string;
  description: string;
  industryIdentifiers: IndustryIdentifier[];
  readingModes: ReadingModes;
  pageCount: number;
  printType: string;
  categories?: string[];
  averageRating?: number;
  ratingsCount?: number;
  maturityRating: string;
  allowAnonLogging: boolean;
  contentVersion: string;
  panelizationSummary?: PanelizationSummary;
  imageLinks: ImageLinks;
  language: string;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
  id: string;
  shelf: string;
};

export type ImageLinks = {
  smallThumbnail: string;
  thumbnail: string;
};

export type IndustryIdentifier = {
  type: Type;
  identifier: string;
};

export enum Type {
  Isbn10 = 'ISBN_10',
  Isbn13 = 'ISBN_13',
}

export type PanelizationSummary = {
  containsEpubBubbles: boolean;
  containsImageBubbles: boolean;
};

export type ReadingModes = {
  text: boolean;
  image: boolean;
};
