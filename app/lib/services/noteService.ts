import * as NotesDb from '@/app/lib/supabase/notes';

export async function addUserNote() {
  try {
    const res = await NotesDb.addUserNoteDb('123459789', '321654987', '888888898', 'This is test');
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}
