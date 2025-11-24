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
