/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Spinner from '@/app/components/Spinner';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaArrowCircleLeft,
  FaBookmark,
  FaHeart,
} from 'react-icons/fa';
import Image from 'next/image';
import { getBookChapter } from '@/app/lib/services/bibleService';
import { useParams, usePathname, useRouter } from 'next/navigation';
import {
  copyrightToHtml,
  dropDownSelectChapter,
  excludeIntroPage,
  verseToHtml,
} from '@/app/lib/helpers';
import { getFromLocalStorage } from '@/app/lib/helpers/localStorage';
import { BookChapterAndDetails } from '@/app/types';

type ChapterState = {
  book_chapter_data: any[]; // or better, define a proper type
  book_chapter_details: any;
};

export default function BookRead() {
  const { bookId, chapterId } = useParams();
  const [chapter, setChapter] = useState<ChapterState>({
    book_chapter_data: [],
    book_chapter_details: null,
  });
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownValue, setDropdownValue] = useState(1);
  const [dropdownOptions, setDropdownOptions] = useState<number[]>([]);

  // get the url parts
  const pathname = usePathname();
  const urlParts = pathname.split('/').filter(Boolean);
  const router = useRouter();

  // Check if items exist in localStorage otherwise fall back to an API call.
  // This ensures that on refresh, data is loaded from localStorage first.
  useEffect(() => {
    const BOOK_ID = bookId as string;
    const CHAPTER_ID = chapterId as string;
    const getFromLS = getFromLocalStorage<BookChapterAndDetails>('book-chapter');

    if (getFromLS && Object.keys(getFromLS).length && getFromLS.data.id === CHAPTER_ID) {
      // console.log(getFromLS);
      setChapter({
        book_chapter_data: [getFromLS.data],
        book_chapter_details: getFromLS.details,
      });

      // create an array base on the total chapters set to dropdown
      const arr = Array.from({ length: getFromLS.details.total_chapter }, (_, i) => i + 1);
      setDropdownOptions(arr);
      setLoading(false);
      setDropdownValue(Number(getFromLS.data.number));
    } else {
      // Fallback API Call
      (async () => {
        try {
          const data = await getBookChapter(BOOK_ID, CHAPTER_ID);
          setChapter({
            book_chapter_data: [data.data],
            book_chapter_details: data.details,
          });

          // create an array base on the total chapters
          const arr = Array.from({ length: data.details.total_chapter }, (_, i) => i + 1);
          setDropdownOptions(arr);
          setDropdownValue(Number(data.data.number));
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [bookId, chapterId]);

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

  // Handle selection
  const onSelect = (chapter: number) => {
    handleSelectChapter(chapter);
    setOpen(false);
  };

  // handle books chapter
  const handleSelectChapter = (ch: number) => {
    const redirectUrl = dropDownSelectChapter(urlParts, ch);
    router.push(redirectUrl);
    setDropdownValue(ch);
    setOpen(false);
  };

  // Spinner;
  if (loading) return <Spinner />;

  return (
    <div className="flex flex-wrap">
      {/* main end wrap */}
      <div className="flex-none w-full max-w-full">
        <div
          className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between flex-auto min-w-0 p-4
          overflow-visible break-words bg-white border-0 dark:bg-slate-850 dark:shadow-dark-xl shadow-3xl 
         rounded-2xl bg-clip-border"
        >
          {/* Left Section — Image & Title */}
          <div className="flex items-center space-x-3 mb-4 sm:mb-0">
            <div
              className="relative inline-flex items-center justify-center text-white transition-all
        duration-200 ease-in-out text-base h-19 w-19 rounded-xl"
            >
              <Image
                src="/assets/custom/book_chapter.png"
                alt="profile_image"
                className="w-full shadow-1xl rounded-xl -ml-3"
                width={500}
                height={500}
              />
            </div>

            <div className="h-full">
              <h5 className="mb-1 dark:text-white">{chapter.book_chapter_details.name}</h5>
              <p className="mb-0 leading-normal dark:text-white dark:opacity-60 text-sm">
                {chapter.book_chapter_details.nameLong}
              </p>
            </div>
          </div>

          {/* Right Section — Dropdown */}
          <div ref={dropdownRef} className="relative text-right w-full sm:w-auto">
            <button
              onClick={() => setOpen(!open)}
              type="button"
              className="inline-flex justify-between items-center w-full sm:w-48 px-5 py-3 text-sm font-medium text-gray-700 bg-white border 
        border-gray-300 rounded-lg shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            >
              Chapter: {dropdownValue}
              <svg
                className={`w-4 h-4 ml-2 text-gray-500 transition-transform ${
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
                className="absolute right-0 z-50 w-full sm:w-48 mt-2 origin-top-right bg-white border border-gray-200 
          divide-y divide-gray-100 rounded-md shadow-lg overflow-y-auto max-h-60 sm:max-h-72 
          scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
              >
                {dropdownOptions.map((ch) => (
                  <button
                    key={ch}
                    onClick={() => onSelect(ch)}
                    className={`w-full px-4 py-2 text-left text-sm sm:text-base hover:bg-gray-100 transition-colors duration-150 ${
                      dropdownValue === ch
                        ? 'font-semibold text-blue-600 bg-blue-50'
                        : 'text-gray-700'
                    }`}
                  >
                    Chapter {ch}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-none w-full max-w-full mt-4">
        <div className="flex flex-wrap -mx-3">
          {chapter.book_chapter_data &&
            chapter.book_chapter_data.map((ch, key) => (
              <div key={key} className="w-full max-w-full px-3 shrink-0 md:w-8/12 md:flex-0">
                <div className="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
                  <div className="border-black/12.5 rounded-t-2xl border-b-0 border-solid p-6 pb-0 -mb-5">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <Link href={`/read-bible`}>
                        <button
                          type="button"
                          className="flex px-3 py-2 mb-4 font-bold leading-normal text-center text-white
                        transition-all ease-in bg-slate-700 border-0 rounded-lg shadow-md cursor-pointer text-xs tracking-tight-rem 
                        hover:shadow-xs hover:-translate-y-px active:opacity-85"
                        >
                          <FaArrowCircleLeft className="text-lg mr-2" />
                          <span>Back </span>
                        </button>
                      </Link>

                      {/* Buttons */}
                      <div className="flex justify-end w-full sm:w-auto gap-2">
                        <button
                          type="button"
                          className="relative inline-flex items-center justify-center w-8 h-8 text-red-500 
                            border border-red-500 rounded-full bg-red-500
                            hover:bg-red-500 text-white transition-all duration-200 shadow-sm
                            active:scale-90"
                        >
                          <FaHeart />
                        </button>

                        <button
                          type="button"
                          className="relative z-10 cursor-pointer inline-flex items-center justify-center w-8 h-8
                            border border-slate-700 rounded-full bg-slate-700 
                            hover:bg-slate-700 text-white transition-all duration-200 shadow-sm
                            active:scale-90"
                        >
                          <FaBookmark />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <hr
                      className="h-px mx-0 my-2 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent 
                    dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent "
                    />

                    {/* Chapter Title */}
                    <p className="pb-4 sm:mb-0 dark:text-white/80 text-left">{ch.reference}</p>

                    <div>
                      <div
                        className="space-y-2"
                        dangerouslySetInnerHTML={{ __html: verseToHtml(ch.content) }}
                      />
                    </div>

                    <hr
                      className="h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent 
                    dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent "
                    />

                    <div className="mt-5">
                      <h3>Total Verse: {ch.verseCount}</h3>

                      <div
                        className="text-sm text-slate-700 mt-4"
                        dangerouslySetInnerHTML={{
                          __html: copyrightToHtml(
                            'Copyright: PUBLIC DOMAIN except in the United Kingdom, where a Crown Copyright applies to printing the KJV. See http://www.cambridge.org/about-us/who-we-are/queens-printers-patent',
                          ),
                        }}
                      />
                    </div>

                    <hr
                      className="h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent 
                    dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent "
                    />

                    <div className="flex justify-between content-center -mb-4">
                      {/* PREV BUTTON */}
                      {ch.number !== 'intro' && ch.id !== 'GEN.1' ? (
                        <Link
                          href={excludeIntroPage(
                            `/${urlParts[0]}/${bookId}/${urlParts[2]}/${ch.previous.id}`,
                            'prev',
                          )}
                        >
                          <button
                            type="button"
                            className="flex mr-2 inline-block px-3 py-2 mb-4 font-bold leading-normal text-center text-white
                        transition-all ease-in bg-slate-700 border-0 rounded-lg shadow-md cursor-pointer text-xs tracking-tight-rem 
                        hover:shadow-xs hover:-translate-y-px active:opacity-85"
                          >
                            <FaArrowAltCircleLeft className="text-lg" />
                            <span className="ml-2">Prev </span>
                          </button>
                        </Link>
                      ) : (
                        <button
                          disabled
                          type="button"
                          className="flex mr-2 items-center px-3 py-2 mb-4 font-bold leading-normal text-center text-gray-400 
                              bg-gray-100 border-0 rounded-lg shadow-sm cursor-not-allowed text-xs tracking-tight-rem 
                              transition-all duration-200 ease-in hover:line-through"
                        >
                          <FaArrowAltCircleLeft className="text-lg" />
                          <span className="ml-2">Prev</span>
                        </button>
                      )}

                      {/* NEXT BUTTON */}
                      <Link
                        href={excludeIntroPage(
                          `/${urlParts[0]}/${bookId}/${urlParts[2]}/${ch.next.id}`,
                          'next',
                        )}
                      >
                        <button
                          type="button"
                          className="flex inline-block px-3 py-2 mb-4 font-bold leading-normal text-center text-white
                        transition-all ease-in bg-slate-700 border-0 rounded-lg shadow-md cursor-pointer text-xs tracking-tight-rem 
                        hover:shadow-xs hover:-translate-y-px active:opacity-85"
                        >
                          <span className="mr-2">Next </span>
                          <FaArrowAltCircleRight className="text-lg" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {/* "" */}

          {/* Noted section */}
          <div className="w-full max-w-full px-3 mt-6 shrink-0 md:w-4/12 md:flex-0 md:mt-0">
            <div
              className="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-xl dark:bg-slate-850 
            dark:shadow-dark-xl rounded-2xl bg-clip-border"
            >
              <Image
                className="w-full rounded-t-2xl"
                src="/assets/custom/note-section.jpg"
                alt="notes"
                // fill={true}
                width={500}
                height={500}
              />

              <div className="border-black/12.5 rounded-t-2xl p-6 text-center pt-0 pb-6 lg:pt-2 lg:pb-4">
                <div className="mb-4">
                  <label
                    htmlFor="address"
                    className="flex py-3 text-lgf text-slate-700 dark:text-white/80 mr-0"
                  >
                    Notes:
                  </label>
                  <textarea
                    name="address"
                    className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none 
                    rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none 
                    transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none h-48"
                    placeholder="Enter your notes..."
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="px-4 py-2 font-bold leading-normal text-center text-white align-middle transition-all ease-in border-0 
                    rounded-lg shadow-md cursor-pointer text-xs bg-slate-700 lg:block tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85"
                  >
                    <div className="flex">
                      {/* <FaFloppyDisk className="text-lg" /> */}
                      <span className="">Save Note</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* main end wrap */}
    </div>
  );
}
