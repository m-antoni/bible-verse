import { lsGetBooks, lsStoreBooks } from '@/app/lib/helpers/localStorage';

/* 
  Next API: /api/bible
  Bible API: https://bible-api/[bibleId]
  Desc: Fetch the bible details base on bible id 
*/
export async function getBible() {
  try {
    const res = await fetch('/api/bible');
    if (!res.ok) {
      throw new Error(`Failed fetching book details: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error(`Error fetching book details`, error);
    throw error;
  }
}

/*
  Next API: /api/books
  Bible API: https://bible-api/[bibleId]/books
  Desc: Fetch the list of books 
*/
export async function getBibleBooks() {
  // Check local cache first
  const cached = lsGetBooks();
  if (cached) {
    return cached;
  }

  try {
    const res = await fetch('/api/books', { cache: 'no-store' }); // no caching in browser

    if (!res.ok) {
      throw new Error('Failed to fetch Bible books: ${res.statusText}');
    }

    const { data } = await res.json();

    /* 
      Call: getBookChapters(bookId)
      get the chapters per books but using Promise.all()
    */
    let booksWithChapters;
    if (data.length) {
      booksWithChapters = await Promise.all(
        data.map(async (book: { id: string }) => {
          // API call 80x in a loop
          const bookChapters = await getBookChapters(book.id);
          // restructure the object
          return { ...book, chapters: bookChapters.length, chapter_01: bookChapters[1].id };
        }),
      );
    }

    // Store to localStorage for caching
    lsStoreBooks(booksWithChapters);

    return booksWithChapters;
  } catch (error) {
    console.error('Error fetching bible books: ', error);
    throw error;
  }
}

/* 
  Next API: /api/books/[bookId]
  Bible API: https://bible-api/[bibleId]/books/[booksId]/chapters
  Desc: Fetch the chapters of a book
*/
export async function getBookChapters(bookId: string) {
  try {
    const res = await fetch(`/api/books/${bookId}`, { cache: 'no-store' }); // no caching in browser

    if (!res.ok) {
      throw new Error(`Failed to fetch book chapters: ${res.statusText}`);
    }

    const { data } = await res.json();

    return data;
  } catch (error) {
    console.error('Error fetching book chapters: ', error);
    throw error;
  }
}

/* 
    Next API: /api/books/[bookId]/chapters/[chapterId]
    Bible API: https://bible-api/[bibleId]/chapters/[chapterId]
    Desc: Fetch chapter of a book eq. chapter 1 of Genesis
*/
export async function getBookChapter(bookId: string, chapterId: string) {
  try {
    const res = await fetch(`/api/books/${bookId}/chapters/${chapterId}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch chapter of book`);
    }

    const { data } = await res.json();

    return data;
  } catch (error) {
    console.error('Error fetching bible books: ', error);
    throw error;
  }
}
