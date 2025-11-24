'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Bible } from '@/app/types';
import Spinner from '@/app/components/Spinner';
import bibleActions from '@/app/lib/actions/bible';

type Dashboard = {
  bible: Bible[];
  // notes: any[];
  // finished: any[];
};

export default function About() {
  const [dashboard, setDashboard] = useState<Dashboard>({ bible: [] });
  const [loading, setLoading] = useState(false);

  // fetch bible details
  useEffect(() => {
    async function fetchBible() {
      setLoading(true);
      const response = await bibleActions.getBible();
      // console.log(response);
      setDashboard({ ...dashboard, bible: [response.data.data] });
      setLoading(false);
    }

    fetchBible();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="w-full mx-auto -mt-6">
        <div className="flex flex-wrap -mx-3">
          <div className="w-full  max-w-full px-3 mt-6 md:w12/12 md:flex-none">
            <div className="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
              <div className="flex-auto p-4">
                <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                  <li className="relative flex p-6 mt-2 mb-5 border-0 rounded-xl bg-gray-100 dark:bg-slate-850">
                    <div className="flex flex-col">
                      <h6 className="mb-4 text-xl leading-normal text-blue-500 font-semibold">
                        Project Overview
                      </h6>
                      <span className="mb-2 md:text-md xs:text-sm leading-tight dark:text-white/80">
                        This is a personal, non-commercial side project developed primarily for
                        learning, development, and enjoyment by utilizing the{' '}
                        <Link
                          className="text-blue-500"
                          href="https://scripture.api.bible/"
                          target="_blank"
                        >
                          Bible API{' '}
                        </Link>
                        The application provides a customizable and efficient way to access, read,
                        and search for specific Bible passages and details.
                      </span>
                      <span className="mb-2 mt-3 md:text-md xs:text-sm leading-tight dark:text-white/80">
                        Bible API:
                        <Link
                          href="https://scripture.api.bible/"
                          target="_blank"
                          className="text-blue-700 dark:text-white sm:ml-2"
                        >
                          https://scripture.api.bible
                        </Link>
                      </span>
                      <span className="mb-2 md:text-md xs:text-sm leading-tight dark:text-white/80">
                        Github Project:
                        <Link
                          href="https://github.com/m-antoni/bible-verse"
                          target="_blank"
                          className="text-blue-700 dark:text-white sm:ml-2"
                        >
                          https://github.com/m-antoni/bible-verse
                        </Link>
                      </span>
                    </div>
                  </li>
                  <li className="relative flex p-6 mb-5 border-0 rounded-b-inherit rounded-xl bg-gray-100 dark:bg-slate-850">
                    <div className="flex flex-col -pt-10">
                      <h6 className="mb-4 md:text-md xs:text-sm leading-normal dark:text-white font-semibold">
                        Contact:
                      </h6>
                      <span className="mb-2 md:text-md xs:text-sm leading-tight dark:text-white/80">
                        Website:
                        <Link
                          href="https://michaelantoni.vercel.app"
                          target="_blank"
                          className="text-blue-700 dark:text-white sm:ml-2"
                        >
                          https://michaelantoni.vercel.app
                        </Link>
                      </span>
                      <span className="mb-2 md:text-md xs:text-sm leading-tight dark:text-white/80">
                        LinkedIn:
                        <Link
                          href="https://www.linkedin.com/in/m-antoni"
                          target="_blank"
                          className="text-blue-700 dark:text-white sm:ml-2"
                        >
                          https://www.linkedin.com/in/m-antoni
                        </Link>
                      </span>
                      <span className="mb-2 md:text-md xs:text-sm leading-tight dark:text-white/80">
                        Github:
                        <Link
                          href="https://github.com/m-antoni"
                          target="_blank"
                          className="text-blue-700 dark:text-white sm:ml-2"
                        >
                          https://github.com/m-antoni
                        </Link>
                      </span>
                      <span className="mb-2 md:text-md xs:text-sm leading-tight dark:text-white/80">
                        Email:
                        <span className="text-slate-700 dark:text-white sm:ml-2">
                          michaelantoni.tech@gmail.com
                        </span>
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
