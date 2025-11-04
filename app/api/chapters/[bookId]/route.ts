import { BIBLE_API_ENDPOINT, BIBLE_API_KEY, BIBLE_API_ID } from '@/app/api/constants';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

type ChapterProps = {
  params: Promise<{ bookId: string }>;
};

// Next API: /api/chapters/[bookId]
// Bible API: https://bible-api-endpoint/[bibleId]/books/[booksId]/chapters
export async function GET(request: NextRequest, { params }: ChapterProps) {
  try {
    const { bookId } = await params;

    console.log('BOOK_ID', bookId);

    const response = await fetch(`${BIBLE_API_ENDPOINT}/${BIBLE_API_ID}/books/${bookId}/chapters`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'api-key': BIBLE_API_KEY,
      },
      next: { revalidate: 3600 }, // cache 1 day
    });

    // error handling
    if (!response.ok) {
      return NextResponse.json(
        { error: `Bible API request failed: ${response.statusText}` },
        { status: response.status },
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
