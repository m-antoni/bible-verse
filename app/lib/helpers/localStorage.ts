import { Book } from '@/app/types';

// store the books to localstorage
export const lsStoreBooks = (books: Partial<Book>[] | undefined) => {
  if (typeof window === 'undefined') return; // guard for server
  localStorage.setItem('bible_books', JSON.stringify(books));
};

// get the books from localstorage
export const lsGetBooks = () => {
  if (typeof window === 'undefined') return null; // guard for server
  const bibleBooks = localStorage.getItem('bible_books');
  return bibleBooks ? JSON.parse(bibleBooks) : null;
};

// search query through the localstorage
export const lsSearch = (text: string) => {
  const books = lsGetBooks();
  if (!Array.isArray(books)) return []; // handle null or invalid data
  const found = books.filter(
    (book: { name: string; nameLong: string; chapters: { toString: () => string | string[] } }) =>
      book.name.toLowerCase().includes(text.toLowerCase()) ||
      book.nameLong.toLowerCase().includes(text.toLowerCase()) ||
      book.chapters.toString().includes(text),
  );

  return found;
};
