import { TABLES } from '@/app/constants/table';
import { supabase } from '@/app/lib/supabase/client';
import authActions from '@/app/lib/actions/auth';
import { noteBookChapterFormTypes } from '@/app/types';
import { getChapterNote } from './getChapterNote';
import { deleteNote } from './deleteNote';
import { updateNote } from './updateNote';
import { ENV } from '@/app/constants/env';

//*** Global Variables */
const BIBLE_NOTES_TABLE = TABLES.BIBLE_NOTES;
const user = await authActions.getCurrentUser(); // Get user session data

//*** Add note */
export async function addNote(formDetails: noteBookChapterFormTypes) {
  try {
    const userBookChapterNoteDetails = {
      book_id: formDetails.book_id,
      book_chapter_id: formDetails.book_chapter_id,
    };

    // *** Check if user has note chapter, Call the getChapterNote()
    const bookChapterNote = await getChapterNote(userBookChapterNoteDetails);

    if (bookChapterNote?.data && bookChapterNote.data !== null) {
      // *** Check if user empty the note fields, Call the deleteNote()
      if (formDetails.note === '') {
        return await deleteNote(userBookChapterNoteDetails);
      }

      // *** Update the note if has already, Call the updateNote()
      return await updateNote(formDetails); // { book_id, book_chapter_id, note }
    } else {
      // *** If the user don't have note but submitted the form
      if (formDetails.note === '') {
        return { success: false, message: 'Please fill in the empty field.' };
      }

      // *** Creating new note parameters
      const addNoteParams = {
        auth_id: user?.id,
        bible_id: ENV.BIBLE_API_ID,
        ...formDetails, // { book_id, book_chapter_id, note }
      };

      // *** Create new note
      const { data, error } = await supabase
        .from(BIBLE_NOTES_TABLE)
        .insert([addNoteParams])
        .select();

      // error
      if (error) {
        return { success: false, message: error.message };
      }
      return { success: true, message: 'Note created successfully.', data };
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Add note failed:', error);
      return { success: false, message: 'Failed to add note due to an unexpected error.' };
    }
  }
}
