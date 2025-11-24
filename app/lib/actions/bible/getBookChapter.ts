import { storeToLocalStorage } from '@/app/lib/helpers/localStorage';
import { getBookDetails } from './getBookDetails';
import { getBookChapters } from './getBookChapters';
import { sendFumsToken } from './sendFumsToken';

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
