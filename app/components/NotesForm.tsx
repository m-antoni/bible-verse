import Image from 'next/image';
import { toast } from 'react-toastify/unstyled';
import 'react-toastify/ReactToastify.css';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { ParamValue } from 'next/dist/server/request/params';
import { noteBookChapterFormTypes } from '../types';
import noteActions from '@/app/lib/actions/note';

type BibleChapterProps = {
  bibleChapter: {
    book_id: ParamValue;
    book_chapter_id: ParamValue;
  };
};

export default function NotesForm({ bibleChapter }: BibleChapterProps) {
  const [form, setForm] = useState({ note: '' });
  const [loading, setLoading] = useState(false);

  // ** Fetch the chapter book notes from Supabase
  useEffect(() => {
    async function getChapterNoteFunc() {
      const getChapterFormParams = {
        book_id: String(bibleChapter.book_id),
        book_chapter_id: String(bibleChapter.book_chapter_id),
      };

      const response = await noteActions.getChapterNote(getChapterFormParams);

      // error occured
      if (response && !response.success) {
        toast(`${response.message}`, {
          toastId: '02',
          icon: <FaTimes className="text-xl text-red-500" />,
        });
        // setLoading(false);
      }

      // success responseponse
      if (response && response.success) {
        const noteUpdate = response?.data ? response?.data.note : '';
        setForm({ note: noteUpdate });
        // console.log(response);
      }
    }

    // call the function
    getChapterNoteFunc();
  }, [bibleChapter.book_chapter_id, bibleChapter.book_id]);

  // handle save note
  const submitNote = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);

    // form params
    const notesForm: noteBookChapterFormTypes = {
      book_id: String(bibleChapter.book_id),
      book_chapter_id: String(bibleChapter.book_chapter_id),
      note: form.note,
    };

    // call supabase db
    const response = await noteActions.addNote(notesForm);
    // console.log(response);

    // error occured
    if (!response?.success) {
      toast.error(`${response?.message}`, {
        toastId: '02',
        icon: <FaTimes className="text-xl text-red-500" />,
      });
      setLoading(false);
    }

    // success response
    if (response?.success) {
      toast.success(`${response.message}`, {
        toastId: '02',
        icon: <FaCheck className="text-xl text-green-500" />,
      });
      const noteUpdate = response?.data ? response?.data.note : '';
      setForm({ note: noteUpdate });
      setLoading(false);
    }
  };

  // handle on change
  const handleOnChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <>
      <div
        className="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-xl dark:bg-slate-850 
        dark:shadow-dark-xl rounded-2xl bg-clip-border"
      >
        <Image
          className="w-full rounded-t-2xl"
          src="/assets/custom/note.jpg"
          alt="notes"
          width={500}
          height={500}
        />

        <form className="border-black/12.5 rounded-t-2xl p-6 text-center pt-0 pb-6 lg:pt-2 lg:pb-4">
          <div className="mb-4">
            <label
              htmlFor="address"
              className="flex py-3 text-lgf text-slate-700 dark:text-white/80 mr-0"
            >
              Notes:
            </label>
            <textarea
              onChange={handleOnChange}
              name="note"
              value={form.note}
              className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none 
                    rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none 
                    transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none h-48"
              placeholder="Enter your notes..."
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              onClick={submitNote}
              type="button"
              disabled={loading}
              className={`px-4 py-2 font-bold leading-normal flex justify-center items-center transition-all ease-in border-0 rounded-lg shadow-md text-xs tracking-tight-rem
                ${loading ? 'bg-white text-gray-500 cursor-not-allowed border border-gray-300' : 'bg-slate-700 text-white hover:shadow-xs hover:-translate-y-px active:opacity-85'}`}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-2"></span>
                  Saving changes...
                </>
              ) : (
                <span>Save Note</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
