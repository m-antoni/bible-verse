import { BIBLE_API_ENDPOINT, BIBLE_API_KEY, BIBLE_API_ID } from '@/app/types';
import { NextRequest, NextResponse } from 'next/server';

type ChapterProps = {
  params: Promise<{ bookId: string; chapterId: string }>;
};

/* 
    Next API: /api/books/[bookId]/chapters/[chapterId]
    Bible API: https://bible-api/[bibleId]/chapters/[chapterId]
    Desc: Fetch chapter of a book eq. chapter 1 of Genesis
*/
export async function GET(request: NextRequest, { params }: ChapterProps) {
  try {
    const { bookId, chapterId } = await params;

    const response = await fetch(`${BIBLE_API_ENDPOINT}/${BIBLE_API_ID}/chapters/${chapterId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
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

    return Response.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
