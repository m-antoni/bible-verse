import { NextResponse, NextRequest } from 'next/server';
import { ENV } from '@/app/constants/env';

//**** ENVS ****/
const BIBLE_API_ENDPOINT = ENV.BIBLE_API_ENDPOINT;
const BIBLE_API_KEY = ENV.BIBLE_API_KEY;
const BIBLE_API_ID = ENV.BIBLE_API_ID;

/* 
    Next API: /api/search?query=<TEXT>&limit=<10>&offset=<0>&range=<gen.1,lev.1>
    Bible API: https://bible-api/[bibleId]/search?query=<TEXT>&limit=<10>&offset=<0>&range=<gen.1,lev.1>
    Desc: Search by keyword
*/
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // search query params
    const params = {
      query: searchParams.get('query'), // text eq. "Jesus"
      limit: searchParams.get('limit') || '10', // shows 10, 50, 100
      offset: searchParams.get('offset') || '0', // skip 10, 50, 100 etc
      sort: 'relevance', // default value
    };

    // formatted url search query with params
    const url = `query=${params.query}&limit=${params.limit}&offset=${params.offset}&sort=${params.sort}`;

    const response = await fetch(`${BIBLE_API_ENDPOINT}/${BIBLE_API_ID}/search?${url}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'api-key': `${BIBLE_API_KEY}`,
      },
      next: { revalidate: 36000 }, // cache 1 day
    });

    // error handling
    if (!response.ok) {
      return NextResponse.json(
        { error: `Bible API Search request failed: ${response.statusText}` },
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
