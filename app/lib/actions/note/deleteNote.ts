import { TABLES } from '@/app/constants/table';
import { supabase } from '@/app/lib/supabase/client';
import authActions from '@/app/lib/actions/auth';
import { noteBookChapterTypes } from '@/app/types';

//*** Global Variables */
const BIBLE_NOTES_TABLE = TABLES.BIBLE_NOTES;
const user = await authActions.getCurrentUser(); // Get user session data

export async function deleteNote(formDetails: noteBookChapterTypes) {
  try {
    const deleteParams = {
      auth_id: user?.id,
      book_id: formDetails.book_id,
      book_chapter_id: formDetails.book_chapter_id,
    };

    // delete query supabase
    const { error } = await supabase
      .from(BIBLE_NOTES_TABLE)
      .delete()
      .eq('auth_id', deleteParams.auth_id)
      .eq('book_id', deleteParams.book_id)
      .eq('book_chapter_id', deleteParams.book_chapter_id);

    // error
    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true, message: 'Note deleted successfully.', data: null };
  } catch (error) {
    if (error instanceof Error) {
      console.error('Get specific note:', error);
      return { success: false, message: 'Failed to add note due to an unexpected error.' };
    }
  }
}
