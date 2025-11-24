import { TABLES } from '@/app/constants/table';
import { supabase } from '@/app/lib/supabase/client';
import authActions from '@/app/lib/actions/auth';
import { noteBookChapterTypes } from '@/app/types';

//*** Get note by chapter */
export async function getChapterNote(formDetails: noteBookChapterTypes) {
  const BIBLE_NOTES_TABLE = TABLES.BIBLE_NOTES;
  const user = await authActions.getCurrentUser();

  try {
    // select params
    const getChapterParams = {
      auth_id: user?.id,
      book_id: formDetails.book_id,
      book_chapter_id: formDetails.book_chapter_id,
    };

    // get query supabase
    const { data, error } = await supabase
      .from(BIBLE_NOTES_TABLE)
      .select('*')
      .eq('auth_id', getChapterParams.auth_id)
      .eq('book_id', getChapterParams.book_id)
      .eq('book_chapter_id', getChapterParams.book_chapter_id)
      .maybeSingle();

    // error
    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true, message: 'Get chapter note success', data };
  } catch (error) {
    if (error instanceof Error) {
      console.error('Get specific note:', error);
      return { success: false, message: 'Failed to add note due to an unexpected error.' };
    }
  }
}
