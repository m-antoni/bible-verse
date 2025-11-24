import { Book } from '@/app/types';
import { getFromLocalStorage, storeToLocalStorage } from '@/app/lib/helpers/localStorage';
import pLimit from 'p-limit';
import { getBookChapters } from './getBookChapters';

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
