import { BIBLE_API_ENDPOINT, BIBLE_API_KEY, BIBLE_API_ID } from '@/app/api/constants';

// Next API: /api/books
// Bible API = https://bible-api-endpoint/[bibleId]
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
      return Response.json(
        { error: `Bible API request failed, ${response.statusText}` },
        { status: response.status },
      );
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.log(error);
    return Response.json({ error: `Internal server error` }, { status: 500 });
  }
}
