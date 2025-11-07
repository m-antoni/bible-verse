import { BIBLE_API_ENDPOINT, BIBLE_API_KEY, BIBLE_API_ID } from '@/app/types';
import { NextResponse } from 'next/server';

/* 
  Next API: /api/bible
  Bible API: https://bible-api/[bibleId]
  Desc: Fetch the bible details base on bible id 
*/
export async function GET() {
  try {
    const response = await fetch(`${BIBLE_API_ENDPOINT}/${BIBLE_API_ID}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'api-key': `${BIBLE_API_KEY}`,
      },
      next: { revalidate: 3600 }, // caching 1 day
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Bible API request failed, ${response.statusText}` },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: `Internal server error` }, { status: 500 });
  }
}
