export enum ShelfType {
  currentlyReading = 'currentlyReading',
  wantToRead = 'wantToRead',
  read = 'read',
  none = 'none',
}

type shelfType = {
  shelfName: ShelfType;
  shelfDisplayName: 'Currently Reading' | 'Want to Read' | 'Read' | 'None';
};

export const shelves: Record<string, shelfType> = {
  currentlyReading: {
    shelfName: ShelfType.currentlyReading,
    shelfDisplayName: 'Currently Reading',
  },
  wantToRead: {
    shelfName: ShelfType.wantToRead,
    shelfDisplayName: 'Want to Read',
  },
  read: {
    shelfName: ShelfType.read,
    shelfDisplayName: 'Read',
  },
  none: {
    shelfName: ShelfType.none,
    shelfDisplayName: 'None',
  },
};
