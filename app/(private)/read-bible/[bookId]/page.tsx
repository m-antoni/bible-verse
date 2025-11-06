'use client';

import Spinner from '@/app/components/Spinner';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaBookmark,
  FaCheck,
  FaHeart,
} from 'react-icons/fa';
import { FaBookAtlas, FaFloppyDisk } from 'react-icons/fa6';
import Image from 'next/image';

export default function BookRead() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [chapter, setChapter] = useState('01');
  const chapters = ['01', '02', '03', '04', '05'];

  // handle books chapter
  const handleSelect = (ch) => {
    setChapter(ch);
    setOpen(false);
  };
  // Spinner
  //   if (loading) return <Spinner />;
  return (
    <div className="flex flex-wrap -mx-3">
      {/* main end wrap */}
      <div className="relative w-full mx-auto">
        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between flex-auto min-w-0 p-4 mx-6 overflow-visible break-words bg-white border-0 dark:bg-slate-850 dark:shadow-dark-xl shadow-3xl rounded-2xl bg-clip-border">
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
              className="inline-flex justify-between items-center w-full sm:w-40 px-5 py-3 text-sm font-medium text-gray-700 bg-white border 
        border-gray-300 rounded-lg shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            >
              Chapter: {chapter}
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
                className="absolute right-0 z-50 w-full sm:w-40 mt-2 origin-top-right bg-white border border-gray-200 
              divide-y divide-gray-100 rounded-md shadow-lg overflow-hidden"
              >
                {chapters.map((ch) => (
                  <button
                    key={ch}
                    onClick={() => handleSelect(ch)}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors duration-150 ${
                      chapter === ch ? 'font-semibold text-blue-500 bg-blue-50' : 'text-gray-700'
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

      <div className="w-full p-6 mx-auto">
        <div className="flex flex-wrap -mx-3">
          <div className="w-full max-w-full px-3 shrink-0 md:w-8/12 md:flex-0">
            <div className="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
              <div className="border-black/12.5 rounded-t-2xl border-b-0 border-solid p-6 pb-0 -mb-5">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  {/* Text */}
                  <p className="mb-2 sm:mb-0 dark:text-white/80 text-left">Chapter 01</p>

                  {/* Buttons */}
                  <div className="flex justify-end w-full sm:w-auto gap-2">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center w-8 h-8 text-red-500 
                        border border-red-500 rounded-full bg-transparent
                        hover:bg-red-500 hover:text-white transition-all duration-200 shadow-sm
                        active:scale-50"
                    >
                      <FaHeart />
                    </button>

                    <button
                      type="button"
                      className="inline-flex items-center justify-center w-8 h-8 text-slate-700 
                        border border-slate-700 rounded-full bg-transparent 
                        hover:bg-slate-700 hover:text-white transition-all duration-200 shadow-sm
                        active:scale-50"
                    >
                      <FaBookmark />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <hr
                  className="h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent 
                dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent "
                />
                <div>
                  <p className="mt-2">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex
                    sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis
                    convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla
                  </p>

                  <p className="mt-2">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex
                    sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis
                    convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla
                  </p>

                  <p className="mt-2">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex
                    sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis
                    convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla
                  </p>

                  <p className="mt-2">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex
                    sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis
                  </p>

                  <p className="mt-2">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex
                    sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis
                    convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla
                  </p>
                </div>

                <hr
                  className="h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent 
                dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent "
                />

                <div className="flex justify-between content-center -mb-4">
                  <button
                    type="button"
                    className="flex mr-2 inline-block px-3 py-2 mb-4 font-bold leading-normal text-center text-white
                    transition-all ease-in bg-slate-700 border-0 rounded-lg shadow-md cursor-pointer text-xs tracking-tight-rem 
                    hover:shadow-xs hover:-translate-y-px active:opacity-85"
                  >
                    <FaArrowAltCircleLeft className="text-lg" />
                    <span className="ml-2">Prev </span>
                  </button>
                  <button
                    type="button"
                    className="flex inline-block px-3 py-2 mb-4 font-bold leading-normal text-center text-white
                    transition-all ease-in bg-slate-700 border-0 rounded-lg shadow-md cursor-pointer text-xs tracking-tight-rem 
                    hover:shadow-xs hover:-translate-y-px active:opacity-85"
                  >
                    <span className="mr-2">Next </span>
                    <FaArrowAltCircleRight className="text-lg" />
                  </button>
                </div>
              </div>
            </div>
          </div>
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
