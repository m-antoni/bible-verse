import { supabase } from './client';

/*
    Create Note
*/
export const addUserNoteDb = async (
  bible_id: string,
  book_id: string,
  book_chapter_id: string,
  note: string,
) => {
  const { data, error } = await supabase
    .from('bible_notes')
    .insert([{ bible_id, book_id, book_chapter_id, note }])
    .select();

  if (error) throw error;
  return data;
};
