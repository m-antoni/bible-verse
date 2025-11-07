import { getFromLocalStorage, storeToLocalStorage } from '@/app/lib/helpers/localStorage';
import { Book } from '@/app/types';

/* 
  Report the usage to API.Bible (if token exists)
  API Docs: https://docs.api.bible/guides/fair-use/
  Desc: allowing me to use the API for tracking, function purpose is to send and forget
*/
const sendFumsToken = async (fumsToken: string) => {
  if (fumsToken) {
    await fetch(`https://fums.api.bible/f3?t=${fumsToken}`, {
      method: 'GET',
      mode: 'no-cors',
    });
    // console.log('fums_token', fumsTokenResponse);
  }
};

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
export async function getBibleBooks(): Promise<Book[]> {
  // Check local cache first
  const cached = getFromLocalStorage<Book[]>('bible-books');
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
    const booksWithChapters = await Promise.all(
      data.map(async (book: Book) => {
        const bookChapters = await getBookChapters(book.id);
        return {
          ...book,
          chapters: bookChapters.length,
          chapter_01: bookChapters[1]?.id || null, // safe indexing
        };
      }),
    );

    // Store to localStorage for caching
    storeToLocalStorage(booksWithChapters, 'bible-books');

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
  Next API: /api/books/[bookId]/details
  Bible API: https://bible-api/[bibleId]/books/[bookId]
  Desc: Fetch the book details
*/
export async function getBookDetails(bookId: string) {
  try {
    const res = await fetch(`/api/books/${bookId}/details`);

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
    const data = await res.json();

    // send fumsToken
    await sendFumsToken(data?.meta?.fumsToken);

    // get the book details and total chapters
    const [chapters, bookDetails] = await Promise.all([
      getBookChapters(bookId),
      getBookDetails(bookId),
    ]);

    const excludeIntro = chapters.length - 1; // exclude the intro page
    const details = { ...bookDetails, total_chapter: excludeIntro };

    // structure output data
    const returnData = { data: data?.data, details };

    // store to localstorage for caching
    storeToLocalStorage(returnData, 'book-chapter');

    return returnData;
  } catch (error) {
    console.error('Error fetching bible books: ', error);
    throw error;
  }
}
