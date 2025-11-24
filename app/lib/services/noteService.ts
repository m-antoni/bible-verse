import { TABLES } from '@/app/constants/table';
import { supabase } from '@/app/lib/supabase/client';
import { ENV } from '@/app/constants/env';
import { authService } from './authService';
import { noteBookChapterFormTypes, noteBookChapterTypes } from '@/app/types';

//*** Global Variables */
const BIBLE_NOTES_TABLE = TABLES.BIBLE_NOTES;
// Get user session data
const USER_SESSION = await authService.getSession();
const user = USER_SESSION?.data?.session?.user;

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

//*** Get note by chapter */
export async function getChapterNote(formDetails: noteBookChapterTypes) {
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

//*** Delete note */
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
