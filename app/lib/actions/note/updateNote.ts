import { TABLES } from '@/app/constants/table';
import { supabase } from '@/app/lib/supabase/client';
import authActions from '@/app/lib/actions/auth';
import { noteBookChapterFormTypes } from '@/app/types';

//*** Global Variables */
const BIBLE_NOTES_TABLE = TABLES.BIBLE_NOTES;
const user = await authActions.getCurrentUser(); // Get user session data

//*** Update note */
export async function updateNote(formDetails: noteBookChapterFormTypes) {
  try {
    // update note params
    const updateNoteParams = {
      auth_id: user?.id,
      book_id: formDetails.book_id,
      book_chapter_id: formDetails.book_chapter_id,
      note: formDetails.note,
    };

    // update query supabase
    const { data, error } = await supabase
      .from(BIBLE_NOTES_TABLE)
      .update({ note: updateNoteParams.note })
      .eq('auth_id', updateNoteParams.auth_id)
      .eq('book_id', updateNoteParams.book_id)
      .eq('book_chapter_id', updateNoteParams.book_chapter_id)
      .select()
      .single();

    // error
    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true, message: 'Note updated successfully.', data };
  } catch (error) {
    if (error instanceof Error) {
      console.error('Get specific note:', error);
      return { success: false, message: 'Failed to add note due to an unexpected error.' };
    }
  }
}
