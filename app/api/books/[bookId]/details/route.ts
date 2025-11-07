import { BIBLE_API_ENDPOINT, BIBLE_API_KEY, BIBLE_API_ID } from '@/app/types';
import { NextRequest, NextResponse } from 'next/server';

type BookDetailsProps = {
  params: Promise<{ bookId: string }>;
};

/* 
  Next API: /api/books/[bookId]/details
  Bible API: https://bible-api/[bibleId]/books/[bookId]
  Desc: Fetch the book details
*/
export async function GET(request: NextRequest, { params }: BookDetailsProps) {
  try {
    const { bookId } = await params;

    const response = await fetch(`${BIBLE_API_ENDPOINT}/${BIBLE_API_ID}/books/${bookId}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'api-key': `${BIBLE_API_KEY}`,
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
