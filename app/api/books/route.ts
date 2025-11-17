import { NextResponse } from 'next/server';
import { ENV } from '@/app/constants/env';

//**** ENVS ****/
const BIBLE_API_ENDPOINT = ENV.BIBLE_API_ENDPOINT;
const BIBLE_API_KEY = ENV.BIBLE_API_KEY;
const BIBLE_API_ID = ENV.BIBLE_API_ID;

/*
  Next API: /api/books
  Bible API: https://bible-api/[bibleId]/books
  Desc: Fetch the list of books 
*/
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
