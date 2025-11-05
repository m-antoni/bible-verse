'use client';

import { FaEye, FaHeart } from 'react-icons/fa';
import { getBibleBooks } from '@/app/lib/services/bibleService';
import { lsFilterBooks, lsSearch } from '@/app/lib/helpers/localStorage';
import { useEffect, useState } from 'react';
import Spinner from '@/app/components/Spinner';

export default function ReadBible() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  // handle filter
  const [rows, setRows] = useState(10);
  const [open, setOpen] = useState(false);
  const options = [10, 20, 40, 80];
  // using debounce

  useEffect(() => {
    async function getBook() {
      try {
        // setLoading(true);
        const data = await getBibleBooks();
        // console.log(data);
        setBooks(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        handleSelectFilter(10);
      }
    }

    getBook();
  }, []);

  // Debounce input
  useEffect(() => {
    const timer = setTimeout(() => {
      const lsBooks = lsSearch(search);
      setBooks(lsBooks);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // handle books filter
  const handleSelectFilter = (opt: number) => {
    setRows(opt);
    setOpen(false);
    // get filter values from Local Storage
    const lsBooks = lsFilterBooks();
    const filtered = lsBooks.slice(0, opt);
    setBooks(filtered);
  };

  // Spinner
  if (loading) return <Spinner />;

  return (
    <div className="flex flex-wrap -mx-3">
      <div className="flex-none w-full max-w-full px-3 -mb-2">
        <div className="relative min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
          <div className="flex rounded-lg ease ">
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              type="text"
              className="pl-3 text-sm focus:shadow-primary-outline ease w-1/100 min-w-0 flex-auto rounded-lg border 
                    border-solid border-gray-300 dark:bg-slate-850 dark:text-white bg-white py-2 pr-3 text-gray-700 
                    placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:transition-shadow mx-5 my-5"
              placeholder="Search here..."
            />

            <div className="text-left pr-5 py-5">
              <button
                onClick={() => setOpen(!open)}
                disabled={search.length ? true : false}
                type="button"
                className={
                  search.length
                    ? `inline-flex justify-between w-32 px-4 py-2 text-sm font-medium text-gray-200 bg-white border 
                border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none`
                    : `inline-flex justify-between w-32 px-4 py-2 text-sm font-medium text-gray-700 bg-white border 
                border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none`
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
                <div className="absolute right-0 z-10 w-32 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
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
            <h6 className="dark:text-white">Bible List of Books</h6>
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
                      shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70"
                      >
                        Book Name
                      </th>
                      <th
                        className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse
                       shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap
                      text-slate-400 opacity-70 lg:block md:hidden hidden"
                      >
                        Version
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
                                <img
                                  src="/assets/custom/bible.png"
                                  className="xl:block sm:hidden hidden inline-flex items-center justify-center mr-2 text-white transition-all duration-200 ease-in-out h-9 w-9 "
                                  alt="user1"
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
                          <td
                            className="p-2 align-middle bg-transparent border-b dark:border-white/40 
                            whitespace-nowrap shadow-transparent lg:block md:hidden hidden"
                          >
                            <p className="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-80">
                              King James Version (KJV)
                            </p>
                            {/* <p className="mb-0 text-xs leading-tight dark:text-white dark:opacity-80 text-slate-400"></p> */}
                          </td>
                          <td className="p-2 text-sm leading-normal text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                            <p className="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-80">
                              {book.chapters}
                            </p>
                          </td>

                          <td className="p-2 align-right text-center bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                            <a
                              href="javascript:;"
                              className="flex justify-center text-xs font-semibold dark:text-white dark:opacity-80 text-slate-400"
                            >
                              <span className="px-2 text-lg">
                                <FaHeart />
                              </span>
                              <span className="px-2 text-lg">
                                <FaEye />
                              </span>
                            </a>
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
