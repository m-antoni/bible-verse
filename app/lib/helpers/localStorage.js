export const lsStoreBooks = (books) => {
  if (typeof window === 'undefined') return; // guard for server
  localStorage.setItem('bible_books', JSON.stringify(books));
};

export const lsGetBooks = () => {
  if (typeof window === 'undefined') return null; // guard for server
  const bibleBooks = localStorage.getItem('bible_books');
  return bibleBooks ? JSON.parse(bibleBooks) : null;
};
