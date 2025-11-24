import { storeToLocalStorage } from '@/app/lib/helpers/localStorage';
import { supabase } from '@/app/lib/supabase/client';
import { getBibleBooks } from './getBibleBooks';
import { TABLES } from '@/app/constants/table';

// ** Get Bible Books from SUPABASE
// ** With Fallback to call the public Bible API
export async function getBibleBooksDB() {
  try {
    // ** call supabase fetch all 80 rows of books in order
    const { data, error } = await supabase.from(TABLES.BIBLE_BOOKS).select('*');

    if (error || !data || data.length === 0) {
      // ** Fallback call the publi Bible API
      console.warn('Supabase fetch failed or empty, falling back to public Bible API', error);

      const fallbackData = await getBibleBooks();
      if (fallbackData.length > 0) {
        storeToLocalStorage(fallbackData, 'bible-books');
        return { success: true, message: 'ok (fallback)', data: fallbackData };
      } else {
        return {
          success: false,
          message: `Fetching Bible books failed: ${error?.message || 'No data from fallback'}`,
        };
      }
    }

    // Store to localStorage for caching
    storeToLocalStorage(data, 'bible-books');

    return { success: true, message: 'ok', data };
  } catch (error) {
    console.error('Error fetching book chapters: ', error);

    // ** Try fallback on unexpected errors
    const fallbackData = await getBibleBooks();
    if (fallbackData.length > 0) {
      storeToLocalStorage(fallbackData, 'bible-books');

      return { success: true, message: 'ok (fallback)', data: fallbackData };
    }

    return { success: false, message: `Unexpected error: ${(error as Error).message}` };
  }
}
