export type BookChapter = {
  id: string;
  bibleId: string;
  bookId: string;
  reference: string;
  copyright: string;
  verseCount: 31;
  content: string;
  next: {
    id: string;
    number: string;
    bookId: string;
  };
  previous: {
    id: string;
    number: string;
    bookId: string;
  };
};
