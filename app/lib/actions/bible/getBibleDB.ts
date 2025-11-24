import { TABLES } from '@/app/constants/table';
import { storeToLocalStorage } from '@/app/lib/helpers/localStorage';
import { supabase } from '@/app/lib/supabase/client';
import { getBible } from './getBible';

// ** Get Bible details from SUPABASE
// ** With Fallback to call the public Bible API
export async function getBibleDB() {
  try {
    // ** call supabase db
    const { data, error } = await supabase
      .from(TABLES.BIBLE)
      .select('*')
      // .eq('bible_id', `${ENV.BIBLE_API_ID}`) // can't access ENV in server-side in NextJS
      .eq('bible_id', `de4e12af7f28f599-01`)
      .single();

    if (error || !data) {
      // ** Fallback call the publi Bible API
      console.warn('Supabase fetch failed or empty, falling back to public Bible API', error);

      const { success, data: bibleData } = await getBible();

      // console.log('FALLBACK', success, bibleData);
      if (success && bibleData.data.name) {
        // store to local storage
        storeToLocalStorage(bibleData.data, 'bible');
        return { success, message: 'ok (fallback)', data: bibleData.data };
      } else {
        return {
          success: false,
          message: `Fetching Bible books failed: ${error?.message || 'No data from fallback'}`,
        };
      }
    } else {
      // console.log('SUCCESS', data);
      // store to local storage
      storeToLocalStorage(data, 'bible');

      return { success: true, message: 'ok', data };
    }
  } catch (error) {
    console.error('Error fetching bible details: ', error);

    // ** Try fallback on unexpected errors
    const { success, data: bibleData } = await getBible();
    if (success) {
      // store to local storage
      storeToLocalStorage(bibleData.data, 'bible');
      return { success, message: 'ok (fallback)', data: bibleData.data };
    }

    return { success: false, message: `Unexpected error: ${(error as Error).message}` };
  }
}
