'use client';

import {
  FaBook,
  FaEye,
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaBookmark,
  FaCheck,
  FaHeart,
} from 'react-icons/fa';
import { getBibleBooks, getBookChapters } from '@/app/lib/services/bibleService';
import { lsFilterBooks, lsSearch } from '@/app/lib/helpers/localStorage';
import { useEffect, useState } from 'react';
import Spinner from '@/app/components/Spinner';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

type Book = {
  id: number;
  bibleId: string;
  bookId: string;
  number: string;
  reference: string;
};

export default function ReadBible() {
  const [books, setBooks] = useState<Book[]>([]);
  const [allBooks, setAllBooks] = useState<Book[]>([]); // keep all books here
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [rows, setRows] = useState(10);
  const [open, setOpen] = useState(false);

  const [chapter, setChapter] = useState('01');
  const chapters = ['01', '02', '03', '04', '05'];

  const params = useParams();
  const bookId = params.bookId as string;

  // fetch the books
  useEffect(() => {
    const lsBooks = lsFilterBooks();

    if (lsBooks?.length) {
      setAllBooks(lsBooks); // store all books
      setBooks(lsBooks.slice(0, 10)); // show first 10 initially
      setLoading(false);
    } else {
      // Fallback API Call
      (async () => {
        try {
          const data = await getBookChapters(bookId);
          console.log(data);
          setAllBooks(data);
          setBooks(data.slice(0, 10));
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, []);

  // handle the filter show list
  const handleSelectFilter = (opt: number) => {
    // setRows(opt);
    // setOpen(false);
    // setBooks(allBooks.slice(0, opt)); // show the selected number of rows
  };

  // handle books chapter
  const handleSelect = (ch: string) => {
    setChapter(ch);
    setOpen(false);
  };

  // Spinner
  if (loading) return <Spinner />;

  return (
    <div className="flex flex-wrap -mx-3">
      <div className="relative w-full mx-auto">
        <div
          className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between flex-auto min-w-0
         p-4 mx-6 overflow-visible break-words bg-white border-0 dark:bg-slate-850 dark:shadow-dark-xl shadow-3xl
          rounded-2xl bg-clip-border"
        >
          {/* Left Section — Image & Title */}
          <div className="flex items-center space-x-3 mb-4 sm:mb-0">
            <div
              className="relative inline-flex items-center justify-center text-white transition-all
              duration-200 ease-in-out text-base h-19 w-19 rounded-xl"
            >
              <Image
                src="/assets/custom/bible-01.png"
                alt="profile_image"
                className="w-full shadow-1xl rounded-xl -ml-3"
                width={500}
                height={500}
              />
            </div>

            <div className="h-full">
              <h5 className="mb-1 dark:text-white">Genesis</h5>
              <p className="mb-0 leading-normal dark:text-white dark:opacity-60 text-sm">
                The First Book of Moses, called Genesis
              </p>
            </div>
          </div>

          {/* Right Section — Dropdown */}
          <div className="relative text-right w-full sm:w-auto">
            <button
              onClick={() => setOpen(!open)}
              type="button"
              className=" w-full px-4 py-3 text-xs font-bold text-slate-700 text-slate-700 rounded-md border border-slate-300 
                hover:bg-slate-700 hover:text-white hover:border-slate-700 
                dark:border-slate-600 dark:hover:bg-slate-800 dark:hover:border-slate-800 dark:text-white 
                transition-all duration-200 shadow-sm hover:shadow-md"
            >
              MOVE TO NEXT BOOK
            </button>
          </div>
        </div>
      </div>
      {/* SECOND CARD */}
      <div className="flex-none w-full max-w-full px-6 mt-3">
        <div className="relative flex flex-col bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl">
          {/* <div className="p-6 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
            <h6 className="dark:text-white">Bible Books</h6>
          </div> */}
          <div className="flex-auto px-0 pt-0 pb-2 min-h-[200px] mt-3">
            <div className="p-0 overflow-x-auto">
              {search.length && books.length === 0 ? (
                <div className="items-center w-full mb-0 align-top border-collapse dark:border-white/40 text-slate-500 ">
                  <div className="text-center px-5 py-10 font-semibold">~ NO SEARCH FOUND ~</div>
                </div>
              ) : (
                <>
                  <table className="items-center w-full mb-0 align-top border-collapse dark:border-white/40 text-slate-500">
                    <thead className="align-bottom">
                      <tr>
                        <th
                          className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse 
                      shadow-none dark:border-white/40 dark:text-e text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70"
                        >
                          Chapter Title
                        </th>
                        <th
                          className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-collapse
                       shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70"
                        >
                          Verses
                        </th>
                        <th
                          className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-collapse
                       shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70"
                        >
                          Action
                        </th>
                        {/* <th className="px-6 py-3 font-semibold capitalize align-middle bg-transparent border-b border-collapse
                       border-solid shadow-none dark:border-white/40 dark:text-white tracking-none whitespace-nowrap text-slate-400 opacity-70"></th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {books?.map((book, key) => {
                        return (
                          <tr key={key}>
                            <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent whitespace-normal break-words">
                              <div className="flex px-2 py-1">
                                <div>
                                  <Image
                                    src="/assets/custom/chapter.png"
                                    className="xl:block sm:hidden hidden inline-flex items-center justify-center mr-2 text-white transition-all duration-200 ease-in-out h-9 w-9 "
                                    alt="image"
                                    width={1}
                                    height={1}
                                  />
                                </div>
                                <div className="flex flex-col justify-center">
                                  <h6 className="mb-0 text-sm leading-normal dark:text-white font-semibold">
                                    {book.reference}
                                  </h6>
                                  {/* <p className="mb-0 text-xs leading-tight dark:text-white dark:opacity-80 text-slate-400 whitespace-normal break-words max-w-[40ch]">
                                    {book.nameLong}
                                  </p> */}
                                </div>
                              </div>
                            </td>
                            <td className="p-2 text-sm leading-normal text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                              <p className="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-80">
                                {/* {book.chapters} */}
                              </p>
                            </td>

                            <td className="p-2 align-right text-center bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                              <Link
                                href={`/read-bible/${bookId}/chapter/${book.id}`}
                                className="inline-flex items-center justify-center px-3 py-1 text-xs font-semibold 
                              text-slate-700 rounded-md border border-slate-300 
                              hover:bg-slate-700 hover:text-white hover:border-slate-700 
                              dark:border-slate-600 dark:hover:bg-slate-800 dark:hover:border-slate-800 dark:text-white 
                              transition-all duration-200 shadow-sm hover:shadow-md"
                              >
                                <FaEye className="mr-2" />
                                Read
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
