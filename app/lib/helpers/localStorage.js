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
  return books.slice(0, opt);
};

export const lsSearch = (text) => {
  const books = lsGetBooks();

  let found = books.filter(
    (book) =>
      book.name.toLowerCase().includes(text.toLowerCase()) ||
      book.nameLong.toLowerCase().includes(text.toLowerCase()),
  );

  // let filterValue = 0;
  // if (found.length < 10) filterValue = 10;
  // if (found.length >= 10 && found.length < 20) filterValue = 20;
  // if (found.length >= 20 && found.length < 40) filterValue = 40;
  // if (found.length >= 40) filterValue = 80;
  // return { query: found, filter: filterValue };

  // return the search query and filter value for dropdown
  return found;
};
