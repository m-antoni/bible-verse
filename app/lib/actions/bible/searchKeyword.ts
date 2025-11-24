import { searchQueryType } from '@/app/types';
import { sendFumsToken } from './sendFumsToken';

/* 
    Next API: /api/search?query=<TEXT>&limit=<10>&offset=<0>&range=<gen.1,lev.1>
    Bible API: https://bible-api/[bibleId]/search?query=<TEXT>&limit=<10>&offset=<0>&range=<gen.1,lev.1>
    Desc: Search by keyword
*/
export async function searchKeyword(queryParams: searchQueryType) {
  try {
    // search query params
    const params = {
      query: queryParams.query, // text eq. "Jesus"
      limit: queryParams.limit || '10', // shows 10, 50, 100
      offset: queryParams.offset || '0', // skip 10, 50, 100 etc
    };

    // formatted url search query with params
    const url = `query=${params.query}&limit=${params.limit}&offset=${params.offset}`;

    const res = await fetch(`/api/search?${url}`);

    // error
    if (!res.ok) {
      return { success: false, message: res.statusText, data: null };
    }

    const data = await res.json();

    // Send fumsToken
    await sendFumsToken(data?.meta?.fumsToken);

    return { success: true, message: 'success.', data: data.data };
  } catch (error) {
    if (error instanceof Error) {
      console.error('Search error:', error);
      return { success: false, message: 'Failed to search due to an unexpected error.' };
    }
  }
}
