'use client';

import { FaBook, FaEye } from 'react-icons/fa';
import { getBibleBooks } from '@/app/lib/services/bibleService';
import { getFromLocalStorage, searchFromLocalStorage } from '@/app/lib/helpers';
import { useEffect, useState } from 'react';
import Spinner from '@/app/components/Spinner';
import Image from 'next/image';
import Link from 'next/link';
import { Book } from '@/app/types';

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
    const getFromLS = getFromLocalStorage<Book[]>('bible-books');

    if (getFromLS?.length) {
      setAllBooks(getFromLS); // store all books
      setBooks(getFromLS.slice(0, 10)); // show first 10 initially
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
      const getFromLS = searchFromLocalStorage(search, 'bible-books');
      setAllBooks(getFromLS); // update full search result
      setBooks(getFromLS.slice(0, rows)); // apply current row limit
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
    <div className="flex flex-wrap">
      <div className="flex-none w-full max-w-full -mb-2">
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
      <div className="flex-none w-full max-w-full">
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
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                    {books.map((book) => (
                      <div
                        key={book.id}
                        className="bg-white dark:bg-slate-850 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200 relative"
                      >
                        {/* Image at the top */}
                        <div className="relative w-full h-36 sm:h-44">
                          <Image
                            src="/assets/custom/note-section.jpg"
                            alt={book.name}
                            fill
                            className="object-cover"
                          />

                          {/* Action buttons overlay */}
                          <div className="absolute top-2 right-2 flex space-x-2">
                            {/* Link only on eye icon */}
                            <Link
                              href={`/read-bible/${book.id}/chapter/${book.chapter_01}`}
                              className="inline-flex items-center justify-center w-8 h-8 text-white bg-blue-500 rounded-full shadow hover:bg-blue-600 transition-colors duration-200"
                            >
                              <FaEye className="text-sm" />
                            </Link>

                            {/* Bookmark button */}
                            <button className="inline-flex items-center justify-center w-8 h-8 text-white bg-red-500 rounded-full shadow hover:bg-red-600 transition-colors duration-200">
                              <FaBook className="text-sm" />
                            </button>
                          </div>
                        </div>

                        {/* Text content below */}
                        <div className="p-4 flex flex-col justify-between h-32">
                          <h3 className="text-sm font-semibold dark:text-white -mb-1">
                            {book.name}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                            {book.nameLong}
                          </p>
                          <span className="mt-2 text-xs font-semibold text-slate-700">
                            {book.chapters} Chapters
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
