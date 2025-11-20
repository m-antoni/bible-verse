'use client';

import { FaSearch, FaTimes } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { searchQueryType, SearchResponseData } from '@/app/types';
import { searcKeyword } from '@/app/lib/services/bibleService';
import { ToastContainer, toast } from 'react-toastify/unstyled';
import 'react-toastify/ReactToastify.css';
import { PuffLoader } from 'react-spinners';
import { CSSProperties } from 'react';

export default function Search() {
  const [searchData, setSearchData] = useState<SearchResponseData>({
    query: '',
    limit: 10,
    offset: 0,
    total: 0,
    verseCount: 0,
    verses: [],
  });
  const [search, setSearch] = useState<searchQueryType>({ query: '', limit: 10, offset: 0 });
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState(10);
  const [open, setOpen] = useState(false);
  const options = [10, 20, 50, 80, 100];
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Spinner style
  const override: CSSProperties = {
    display: 'block',
    margin: '0 auto',
    borderColor: 'red',
  };

  // Search use debounce 500 milliseconds
  useEffect(() => {
    const timer = setTimeout(() => {
      // This will prevent to trigger the search API
      if (!search.query || search.query.trim() === '') {
        setSearchData({
          query: '',
          limit: 10,
          offset: 0,
          total: 0,
          verseCount: 0,
          verses: [],
        });
        return;
      }

      // Self-invoking funtion to call the search API
      (async () => {
        try {
          setLoading(true);
          const res = await searcKeyword(search);

          if (res && !res.success) {
            toast.error(`${res.message}`, {
              toastId: '01',
              icon: <FaTimes className="text-xl text-red-500" />,
            });
            setSearchData({
              query: '',
              limit: 10,
              offset: 0,
              total: 0,
              verseCount: 0,
              verses: [],
            });
          }

          if (res && res.success) {
            // create an array base on the total chapters
            // const arr = Array.from({ length: data.details.total_chapter }, (_, i) => i + 1);
            // setDropdownOptions(arr);
            // setDropdownValue(Number(data.data.number));
            setSearchData(res.data);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      })();
    }, 500);

    // clean up
    return () => clearTimeout(timer);
  }, [search]);

  // handle the filter show list
  const handleSelectFilter = (opt: number) => {
    setRows(opt);
    setSearch({ ...search, limit: opt });
    setOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  console.log('searchData', searchData);

  return (
    <div className="flex flex-wrap">
      <div className="flex-none w-full max-w-full -mb-2">
        <div
          className="relative min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-xl 
        dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border"
        >
          <div className="flex rounded-lg ease py-3">
            <input
              onChange={(e) => setSearch({ ...search, query: e.target.value })}
              value={search.query}
              type="text"
              className="pl-3 text-sm ease w-1/100 min-w-0 flex-auto rounded-lg border 
          border-solid border-gray-300 dark:bg-slate-850 dark:text-white bg-white py-2 pr-3 text-gray-700 
          placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:transition-shadow 
          mx-5 my-5 shadow-md"
              placeholder="Search here..."
            />

            {/* Right Section — Dropdown */}
            <div ref={dropdownRef} className="text-left pr-5 py-5 relative">
              <button
                onClick={() => setOpen(!open)}
                type="button"
                className="inline-flex justify-between w-32 px-4 py-2 text-sm font-medium text-gray-700 bg-white border 
                    border-gray-300 rounded-md shadow-md focus:outline-none"
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
                <div className="absolute right-0 z-20 w-34 mr-5 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-md">
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
        <div
          className="relative min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid
             shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border
             h-auto max-h-[80vh] overflow-y-auto p-4"
        >
          <div className="p-5 pt-5 pb-3 dark:border-gray-700 dark:bg-slate-800 bg-white sticky -top-5 z-10">
            <h6 className="text-sm text-gray-600 dark:text-gray-300">
              Found{' '}
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {searchData?.total || 0}
              </span>{' '}
              results for{' '}
              <span className="font-semibold text-blue-500 dark:text-white">
                {search.query ?? `&quot;${search.query}&quot;`}
              </span>
            </h6>
          </div>
          <div className="flex-auto px-0 pt-0 pb-8  min-h-[250px]">
            {loading ? (
              <div className="text-center px-5 py-5 font-semibold">
                <div className="flex-grow flex items-center justify-center h-80">
                  <PuffLoader cssOverride={override} color="#2196F3" size={90} />
                  <div className="pb-5"></div>
                </div>
              </div>
            ) : searchData?.verses?.length > 0 ? (
              searchData.verses.map((verse, index) => (
                <div key={index} className="flex-auto px-4">
                  <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                    <li className="relative flex p-6 mt-4 mb-2 border-0 rounded-b-inherit rounded-xl bg-gray-100 dark:bg-slate-850">
                      <div className="flex flex-col">
                        <h6 className="mb-4 text-sm leading-normal dark:text-white font-semibold">
                          {verse.reference}
                        </h6>

                        <span className="mb-2 text-sm leading-tight dark:text-white/80">
                          {verse.text}
                        </span>
                        <span className="pt-2 text-sm leading-tight">
                          <Link
                            href={`/read-bible/${verse.bookId}/chapter/${verse.chapterId}`}
                            className="inline-block px-2 py-1 bg-slate-700 text-white rounded-md hover:bg-slate-800 transition"
                          >
                            Visit Chapter
                          </Link>
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center w-full mb-4">
                <img
                  src="/assets/custom/search.gif"
                  className="w-48 h-48 object-contain mb-20"
                  alt="Search Animation"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        // transition={Flip}
        // theme="dark"
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
