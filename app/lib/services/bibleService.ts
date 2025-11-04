import { lsGetBooks, lsStoreBooks } from '@/app/lib/helpers/localStorage';

// Next API: /api/books
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

// Next API: /api/books
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

    // get the chapters per books but using Promise.all()
    let booksWithChapters;
    if (data.length) {
      booksWithChapters = await Promise.all(
        data.map(async (book: { id: string }) => {
          // API call 80x in a loop
          const bookChapters = await getBookChapters(book.id);
          // restructure the object
          return { ...book, chapters: bookChapters.length };
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

// Next API: /api/chapters/[bookId]
export async function getBookChapters(bookId: string) {
  try {
    const res = await fetch(`/api/chapters/${bookId}`, { cache: 'no-store' }); // no caching in browser

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
