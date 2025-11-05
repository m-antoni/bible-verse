import { BIBLE_API_ENDPOINT, BIBLE_API_KEY, BIBLE_API_ID } from '@/app/api/constants';
import { NextResponse } from 'next/server';

// const headers: HeadersInit = {
//   accept: 'application/json',
//   ...(BIBLE_API_KEY ? { 'api-key': BIBLE_API_KEY } : {}),
// };

// Next API: /api/books
// Bible API = https://bible-api-endpoint/[bibleId]/books
export async function GET() {
  try {
    const response = await fetch(`${BIBLE_API_ENDPOINT}/${BIBLE_API_ID}/books`, {
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
