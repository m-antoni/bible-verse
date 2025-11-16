import { TABLES } from '@/app/constants/table';
import { supabase } from '@/app/lib/supabase/client';
import { ENV } from '@/app/constants/env';
import { authService } from './authService';
import { noteBookChapterFormTypes, noteBookChapterTypes } from '@/app/types';

//*** Global Variables */
const BIBLE_NOTES_TABLE = TABLES.BIBLE_NOTES;
const USER_SESSION = await authService.getSession();

export const noteService = {
  //*** Add note */
  addNote: async (formDetails: noteBookChapterFormTypes) => {
    try {
      const addNoteParams = {
        user_id: USER_SESSION?.data?.session?.user.id,
        bible_id: ENV.BIBLE_API_ID,
        ...formDetails, // { book_id, book_chapter_id, note }
      };

      // store query supabase
      const { data, error } = await supabase
        .from(BIBLE_NOTES_TABLE)
        .insert([addNoteParams])
        .select();

      // error
      if (error) {
        return { success: false, message: error.message };
      }

      return { success: true, message: 'Note saved successfully.', data };
    } catch (error) {
      if (error instanceof Error) {
        console.error('Add note failed:', error);
        return { success: false, message: 'Failed to add note due to an unexpected error.' };
      }
    }
  },

  //*** Get note by chapter */
  getChapterNote: async (formDetails: noteBookChapterTypes) => {
    try {
      // select params
      const getChapterParams = {
        user_id: USER_SESSION?.data?.session?.user?.id,
        book_id: formDetails.book_id,
        book_chapter_id: formDetails.book_chapter_id,
      };

      // get query supabase
      const { data, error } = await supabase
        .from(BIBLE_NOTES_TABLE)
        .select('*')
        .eq('user_id', getChapterParams.user_id)
        .eq('book_id', getChapterParams.book_id)
        .eq('book_chapter_id', getChapterParams.book_chapter_id);

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
  },

  //*** Update note */
  updateNote: async (formDetails: noteBookChapterFormTypes) => {
    try {
      // update note params
      const updateNoteParams = {
        user_id: USER_SESSION?.data?.session?.user?.id,
        book_id: formDetails.book_id,
        book_chapter_id: formDetails.book_chapter_id,
        note: formDetails.note,
      };

      // update query supabase
      const { data, error } = await supabase
        .from(BIBLE_NOTES_TABLE)
        .update({ note: updateNoteParams.note })
        .eq('user_id', updateNoteParams.user_id)
        .eq('book_id', updateNoteParams.book_id)
        .eq('book_chapter_id', updateNoteParams.book_chapter_id);

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
  },

  //*** Delete note */
  deleteNote: async (formDetails: noteBookChapterTypes) => {
    try {
      const deleteParams = {
        user_id: USER_SESSION?.data?.session?.user?.id,
        book_id: formDetails.book_id,
        book_chapter_id: formDetails.book_chapter_id,
      };

      // delete query supabase
      const { data, error } = await supabase
        .from(BIBLE_NOTES_TABLE)
        .delete()
        .eq('user_id', deleteParams.user_id)
        .eq('book_id', deleteParams.book_id)
        .eq('book_chapter_id', deleteParams.book_chapter_id);

      // error
      if (error) {
        return { success: false, message: error.message };
      }

      return { success: true, message: 'Note deleted successfully.' };
    } catch (error) {
      if (error instanceof Error) {
        console.error('Get specific note:', error);
        return { success: false, message: 'Failed to add note due to an unexpected error.' };
      }
    }
  },

  //****** End on noteService ******//
};
