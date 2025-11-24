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
