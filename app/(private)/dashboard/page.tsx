'use client';

import { copyrightToHtml, verseToHtml } from '@/app/lib/helpers';
import { getBible } from '@/app/lib/services/bibleService';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { Bible } from '@/app/types';

type Dashboard = {
  bible: Bible[];
  notes: any[];
  finished: any[];
};

export default function Dashboard() {
  const { session } = useAuth();
  const [dashboard, setDashboard] = useState<Dashboard>({ bible: [], notes: [], finished: [] });

  // fetch bible details
  useEffect(() => {
    async function fetchBible() {
      const response = await getBible();
      setDashboard({ ...dashboard, bible: [response.data] });
    }

    fetchBible();
  }, []);

  // console.log(dashboard);
  // console.log(session);

  return (
    <>
      <div className="w-full mx-auto -mt-6">
        <div className="flex flex-wrap -mx-3">
          <div className="w-full  max-w-full px-3 mt-6 md:w-12/12 md:flex-none">
            <div className="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
              <div className="p-6 px-4 pb-0 mb-0 border-b-0 rounded-t-2xl">
                <h6 className="mb-0 dark:text-white">Dashboard Information</h6>
              </div>
              <div className="flex-auto p-4">
                <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                  <li className="relative flex p-6 mt-2 mb-2 border-0 rounded-xl bg-gray-50 dark:bg-slate-850">
                    <div className="flex flex-col">
                      <h6 className="mb-4 text-2xl leading-normal text-blue-500 font-semibold">
                        Welcome to BibleVerse 1.0
                      </h6>
                      <span className="mb-2 text-md leading-tight dark:text-white/80">
                        Discover the Word of God with ease. Search for verses, explore chapters, and
                        navigate the Bible effortlessly. Perfect for daily reading, study, and
                        reflection.
                        <span className="text-slate-700 dark:text-white sm:ml-2"></span>
                      </span>
                    </div>
                  </li>
                  <li className="relative flex mt-4 p-6 mb-2 border-0 rounded-xl bg-gray-50 dark:bg-slate-850">
                    <div className="flex flex-col">
                      <h6 className="mb-4 text-lg leading-normal dark:text-white font-semibold">
                        App Details:
                      </h6>

                      {dashboard.bible.length > 0 && (
                        <>
                          <span className="mb-2 text-md leading-tight dark:text-white/80">
                            Bible API:
                            <Link
                              href="https://scripture.api.bible/"
                              target="_blank"
                              className="text-blue-700 dark:text-white sm:ml-2"
                            >
                              https://scripture.api.bible
                            </Link>
                          </span>
                          {dashboard.bible.map((item, index) => (
                            <>
                              <div key={index}>
                                <div className="mb-2 text-md leading-tight dark:text-white/80">
                                  Name:
                                  <span className="text-slate-700 dark:text-white sm:ml-2">
                                    {item.name}
                                  </span>
                                </div>
                                <div className="mb-2 text-md leading-tight dark:text-white/80">
                                  Abbrevation:
                                  <span className="text-slate-700 dark:text-white sm:ml-2">
                                    {item.abbreviationLocal}
                                  </span>
                                </div>
                                <div className="text-md leading-tight dark:text-white/80">
                                  Languange:
                                  <span className="text-slate-700 dark:text-white sm:ml-2">
                                    {item.language?.name}
                                  </span>
                                </div>
                                <div className="mb-2 -mt-2 text-md leading-tight dark:text-white/80">
                                  <span className="text-slate-700 dark:text-white sm:ml-2">
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: copyrightToHtml(item.copyright),
                                      }}
                                    />
                                  </span>
                                </div>
                              </div>
                            </>
                          ))}
                        </>
                      )}
                    </div>
                  </li>
                  <li className="relative flex p-6 mt-4 mb-2 border-0 rounded-b-inherit rounded-xl bg-gray-50 dark:bg-slate-850">
                    <div className="flex flex-col">
                      <h6 className="mb-4 text-md leading-normal dark:text-white font-semibold">
                        User Details:
                      </h6>
                      <span className="mb-2 text-md leading-tight dark:text-white/80">
                        Name:
                        <span className="text-slate-700 dark:text-white sm:ml-2">
                          {session.user.user_metadata.full_name}
                        </span>
                      </span>
                      <span className="mb-2 text-md leading-tight dark:text-white/80">
                        Email:
                        <span className="text-blue-700 dark:text-white sm:ml-2">
                          {session.user.email}
                        </span>
                      </span>
                      <span className="mb-2 text-md leading-tight dark:text-white/80">
                        Account Created At:
                        <span className="text-slate-700 dark:text-white sm:ml-2">
                          {new Date(session.user.created_at).toLocaleString()}
                        </span>
                      </span>
                      <span className="mb-2 text-md leading-tight dark:text-white/80">
                        Your Last Sign-in:
                        <span className="text-slate-700 dark:text-white sm:ml-2">
                          {new Date(session.user.last_sign_in_at ?? '').toLocaleString()}
                        </span>
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* <div className="w-full max-w-full px-3 mt-6 md:w-5/12 md:flex-none">
            <div className="relative flex flex-col h-full min-w-0 mb-6 break-words bg-white border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl px-2">
              <div className="p-6 px-4 pb-0 mb-0 border-b-0 rounded-t-2xl">
                <div className="flex flex-wrap -mx-3">
                  <div className="max-w-full px-3 md:w-1/2 md:flex-none">
                    <h6 className="mb-0 dark:text-white">Recent History</h6>
                  </div>
                  <div className="flex items-center justify-end max-w-full px-3 dark:text-white/80 md:w-1/2 md:flex-none">
                    <i className="mr-2 far fa-calendar-alt"></i>
                  </div>
                </div>
              </div>
              <div className="flex-auto p-4 pt-6">
                <h6 className="mb-4 text-xs font-bold leading-tight uppercase dark:text-white text-slate-500">
                  Saved Notes
                </h6>
                <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                  <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 border-0 rounded-t-inherit text-inherit rounded-xl">
                    <div className="flex items-center">
                      <div className="flex flex-col">
                        <h6 className="mb-1 text-sm leading-normal dark:text-white text-slate-700">
                          Genesis 1:20
                        </h6>
                        <span className="text-xs leading-tight dark:text-white/80">
                          27 March 2020, at 12:30 PM
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <Link
                        href="#"
                        className="relative z-10 inline-block m-0 text-sm font-semibold leading-normal text-blue-500 bg-clip-text"
                      >
                        Click Here
                      </Link>
                    </div>
                  </li>
                </ul>

                <h6 className="my-4 mt-10 text-xs font-bold leading-tight uppercase dark:text-white text-slate-500">
                  Yesterday
                </h6>
                <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                  <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 border-0 rounded-t-inherit text-inherit rounded-xl">
                    <div className="flex items-center">
                      <div className="flex flex-col">
                        <h6 className="mb-1 text-sm leading-normal dark:text-white text-slate-700">
                          Luke 2:20
                        </h6>
                        <span className="text-xs leading-tight dark:text-white/80">
                          26 March 2020, at 13:45 PM
                        </span>
                      </div>
                    </div>
                  </li>
                  <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 border-0 border-t-0 text-inherit rounded-xl">
                    <div className="flex items-center">
                      <div className="flex flex-col">
                        <h6 className="mb-1 text-sm leading-normal dark:text-white text-slate-700">
                          Genesis 4:12
                        </h6>
                        <span className="text-xs leading-tight dark:text-white/80">
                          26 March 2020, at 12:30 PM
                        </span>
                      </div>
                    </div>
                  </li>

                  <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 border-0 border-t-0 rounded-b-inherit text-inherit rounded-xl">
                    <div className="flex items-center">
                      <div className="flex flex-col">
                        <h6 className="mb-1 text-sm leading-normal dark:text-white text-slate-700">
                          Song 20:1
                        </h6>
                        <span className="text-xs leading-tight dark:text-white/80">
                          26 March 2020, at 05:00 AM
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
