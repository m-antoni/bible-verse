import { getFromLocalStorage, storeToLocalStorage } from '@/app/lib/helpers/localStorage';
import { Book, searchQueryType } from '@/app/types';
import { supabase } from '@/app/lib/supabase/client';
import { TABLES } from '@/app/constants/table';
import pLimit from 'p-limit';
import { ENV } from '@/app/constants/env';

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
      // throw new Error(`Failed fetching book details: ${res.statusText}`);
      return { success: false, message: res.statusText, data: null };
    }

    const data = await res.json();

    return { success: true, message: res.statusText, data };
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

    // ** Get the chapters per books but using Promise.all()
    // const booksWithChapters = await Promise.all(
    //   data.map(async (book: Book) => {
    //     const bookChapters = await getBookChapters(book.id);
    //     return {
    //       ...book,
    //       chapters: bookChapters.length,
    //       chapter_01: bookChapters[1]?.id || null, // safe indexing
    //     };
    //   }),
    // );

    // ** Limit concurrency to 5 for getBookChapters requests to avoid overloading
    // ** Run up to 7 getBookChapters requests at the same time for better performance
    const limit = pLimit(7); // Limit 5 concurrent request
    const booksWithChapters = await Promise.all(
      data.map((book: { id: string }) =>
        limit(async () => {
          const chapters = await getBookChapters(book.id);
          return {
            ...book,
            chapters: chapters.length,
            chapter_01: chapters[0]?.id || null,
          };
        }),
      ),
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

    // Send fumsToken
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

/* 
    Next API: /api/search?query=<TEXT>&limit=<10>&offset=<0>&range=<gen.1,lev.1>
    Bible API: https://bible-api/[bibleId]/search?query=<TEXT>&limit=<10>&offset=<0>&range=<gen.1,lev.1>
    Desc: Search by keyword
*/
export async function searchKeyword(queryParams: searchQueryType) {
  try {
    // search query params
    const params = {
      query: queryParams.query, // text eq. "Jesus"
      limit: queryParams.limit || '10', // shows 10, 50, 100
      offset: queryParams.offset || '0', // skip 10, 50, 100 etc
    };

    // formatted url search query with params
    const url = `query=${params.query}&limit=${params.limit}&offset=${params.offset}`;

    const res = await fetch(`/api/search?${url}`);

    // error
    if (!res.ok) {
      return { success: false, message: res.statusText, data: null };
    }

    const data = await res.json();

    // Send fumsToken
    await sendFumsToken(data?.meta?.fumsToken);

    return { success: true, message: 'success.', data: data.data };
  } catch (error) {
    if (error instanceof Error) {
      console.error('Search error:', error);
      return { success: false, message: 'Failed to search due to an unexpected error.' };
    }
  }
}

// ** Get Bible Books from SUPABASE
// ** With Fallback to call the public Bible API
export async function getBibleBooksDB() {
  try {
    // ** call supabase fetch all 80 rows of books in order
    const { data, error } = await supabase.from(TABLES.BIBLE_BOOKS).select('*');

    if (error || !data || data.length === 0) {
      // ** Fallback call the publi Bible API
      console.warn('Supabase fetch failed or empty, falling back to public Bible API', error);

      const fallbackData = await getBibleBooks();
      if (fallbackData.length > 0) {
        storeToLocalStorage(fallbackData, 'bible-books');
        return { success: true, message: 'ok (fallback)', data: fallbackData };
      } else {
        return {
          success: false,
          message: `Fetching Bible books failed: ${error?.message || 'No data from fallback'}`,
        };
      }
    }

    // Store to localStorage for caching
    storeToLocalStorage(data, 'bible-books');

    return { success: true, message: 'ok', data };
  } catch (error) {
    console.error('Error fetching book chapters: ', error);

    // ** Try fallback on unexpected errors
    const fallbackData = await getBibleBooks();
    if (fallbackData.length > 0) {
      storeToLocalStorage(fallbackData, 'bible-books');

      return { success: true, message: 'ok (fallback)', data: fallbackData };
    }

    return { success: false, message: `Unexpected error: ${(error as Error).message}` };
  }
}

// ** Get Bible details from SUPABASE
// ** With Fallback to call the public Bible API
export async function getBibleDB() {
  try {
    // ** call supabase db
    const { data, error } = await supabase
      .from(TABLES.BIBLE)
      .select('*')
      // .eq('bible_id', `${ENV.BIBLE_API_ID}`) // can't access ENV in server-side in NextJS
      .eq('bible_id', `de4e12af7f28f599-01`)
      .single();

    if (error || !data) {
      // ** Fallback call the publi Bible API
      console.warn('Supabase fetch failed or empty, falling back to public Bible API', error);

      const { success, data: bibleData } = await getBible();

      // console.log('FALLBACK', success, bibleData);
      if (success && bibleData.data.name) {
        // store to local storage
        storeToLocalStorage(bibleData.data, 'bible');
        return { success, message: 'ok (fallback)', data: bibleData.data };
      } else {
        return {
          success: false,
          message: `Fetching Bible books failed: ${error?.message || 'No data from fallback'}`,
        };
      }
    } else {
      // console.log('SUCCESS', data);
      // store to local storage
      storeToLocalStorage(data, 'bible');

      return { success: true, message: 'ok', data };
    }
  } catch (error) {
    console.error('Error fetching bible details: ', error);

    // ** Try fallback on unexpected errors
    const { success, data: bibleData } = await getBible();
    if (success) {
      // store to local storage
      storeToLocalStorage(bibleData.data, 'bible');
      return { success, message: 'ok (fallback)', data: bibleData.data };
    }

    return { success: false, message: `Unexpected error: ${(error as Error).message}` };
  }
}
