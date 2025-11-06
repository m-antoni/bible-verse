// store the books to localstorage
export const lsStoreBooks = (books) => {
  if (typeof window === 'undefined') return; // guard for server
  localStorage.setItem('bible_books', JSON.stringify(books));
};

// get the books from localstorage
export const lsGetBooks = () => {
  if (typeof window === 'undefined') return null; // guard for server
  const bibleBooks = localStorage.getItem('bible_books');
  return bibleBooks ? JSON.parse(bibleBooks) : null;
};

// filter the books by [10, 20, 40, 80] base on args
export const lsFilterBooks = (opt) => {
  const books = lsGetBooks();
  if (books) {
    return books.slice(0, opt);
  }
};

// search query through the localstorage
export const lsSearch = (text) => {
  const books = lsGetBooks();
  let found = books.filter(
    (book) =>
      book.name.toLowerCase().includes(text.toLowerCase()) ||
      book.nameLong.toLowerCase().includes(text.toLowerCase()) ||
      book.chapters.toString().includes(text),
  );

  return found;
};
