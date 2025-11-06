'use client';

import { FaEye } from 'react-icons/fa';
import { getBibleBooks } from '@/app/lib/services/bibleService';
import { lsFilterBooks, lsSearch } from '@/app/lib/helpers/localStorage';
import { useEffect, useState } from 'react';
import Spinner from '@/app/components/Spinner';
import Image from 'next/image';
import Link from 'next/link';

type Book = {
  id: number;
  abbreviation: string;
  bibleId: string;
  name: string;
  nameLong: string;
  chapters: number;
};

export default function ReadBible() {
  const [books, setBooks] = useState<Book[]>([]);
  const [allBooks, setAllBooks] = useState<Book[]>([]); // keep all books here
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [rows, setRows] = useState(10);
  const [open, setOpen] = useState(false);
  const options = [10, 20, 40, 80];

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
          const data = await getBibleBooks();
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

  // Search use debounce 500 milliseconds
  useEffect(() => {
    const timer = setTimeout(() => {
      const lsBooks = lsSearch(search);
      setAllBooks(lsBooks); // update full search result
      setBooks(lsBooks.slice(0, rows)); // apply current row limit
    }, 500);

    return () => clearTimeout(timer);
  }, [search, rows]);

  // handle the filter show list
  const handleSelectFilter = (opt: number) => {
    setRows(opt);
    setOpen(false);
    setBooks(allBooks.slice(0, opt)); // show the selected number of rows
  };

  // Spinner
  if (loading) return <Spinner />;

  return (
    <div className="flex flex-wrap -mx-3">
      <div className="flex-none w-full max-w-full px-3 -mb-2">
        <div className="relative min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
          <div className="flex rounded-lg ease">
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              type="text"
              className="pl-3 text-sm ease w-1/100 min-w-0 flex-auto rounded-lg border 
          border-solid border-gray-300 dark:bg-slate-850 dark:text-white bg-white py-2 pr-3 text-gray-700 
          placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:transition-shadow 
          mx-5 my-5 shadow-md"
              placeholder="Search here..."
            />

            <div className="text-left pr-5 py-5 relative">
              <button
                onClick={() => setOpen(!open)}
                disabled={search.length ? true : false}
                type="button"
                className={
                  search.length
                    ? `inline-flex justify-between w-32 px-4 py-2 text-sm font-medium text-gray-200 bg-white border 
      border-gray-300 rounded-md shadow-md focus:outline-none`
                    : `inline-flex justify-between w-32 px-4 py-2 text-sm font-medium text-gray-700 bg-white border 
      border-gray-300 rounded-md shadow-md focus:outline-none`
                }
              >
                Show: {rows}
                <svg
                  className={`w-4 h-4 ml-2 -mr-1 text-gray-500 transition-transform ${
                    open ? 'rotate-180' : 'rotate-0'
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {open && (
                <div
                  className="absolute right-0 z-10 w-32 mt-2 origin-top-right bg-white border border-gray-200 
        divide-y divide-gray-100 rounded-md shadow-md"
                >
                  {options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleSelectFilter(opt)}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                        rows === opt ? 'font-semibold text-blue-600' : 'text-gray-700'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex-none w-full max-w-full px-3">
        <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
          <div className="p-6 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
            <h6 className="dark:text-white">Bible Books</h6>
          </div>
          <div className="flex-auto px-0 pt-0 pb-2  min-h-[200px]">
            <div className="p-0 overflow-x-auto">
              {search.length && books.length === 0 ? (
                <div className="items-center w-full mb-0 align-top border-collapse dark:border-white/40 text-slate-500 ">
                  <div className="text-center px-5 py-10 font-semibold">~ NO SEARCH FOUND ~</div>
                </div>
              ) : (
                <table className="items-center w-full mb-0 align-top border-collapse dark:border-white/40 text-slate-500">
                  <thead className="align-bottom">
                    <tr>
                      <th
                        className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse 
                      shadow-none dark:border-white/40 dark:text-e text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70"
                      >
                        Book Name
                      </th>
                      <th
                        className=" px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse
                       shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap
                      text-slate-400 opacity-70"
                      >
                        <div className="hidden md:table-cell lg:table-cell">Version</div>
                      </th>
                      <th
                        className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-collapse
                       shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70"
                      >
                        Chapters
                      </th>
                      <th
                        className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-collapse
                       shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70"
                      >
                        Actions
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
                                  src="/assets/custom/bible.png"
                                  className="xl:block sm:hidden hidden inline-flex items-center justify-center mr-2 text-white transition-all duration-200 ease-in-out h-9 w-9 "
                                  alt="image"
                                  width={1}
                                  height={1}
                                />
                              </div>
                              <div className="flex flex-col justify-center">
                                <h6 className="mb-0 text-sm leading-normal dark:text-white font-semibold">
                                  {book.name}
                                </h6>
                                <p className="mb-0 text-xs leading-tight dark:text-white dark:opacity-80 text-slate-400 whitespace-normal break-words max-w-[40ch]">
                                  {book.nameLong}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-2 text-sm leading-normal text-left align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                            <div className="hidden md:table-cell lg:table-cell">
                              <p className="m-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-80">
                                King James Version (KJV)
                              </p>
                            </div>
                          </td>
                          <td className="p-2 text-sm leading-normal text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                            <p className="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-80">
                              {book.chapters}
                            </p>
                          </td>

                          <td className="p-2 align-right text-center bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                            <Link
                              href={`/read-bible/${book.id}`}
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
