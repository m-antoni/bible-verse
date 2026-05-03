'use client';

import { copyrightToHtml, getFromLocalStorage, getRandomIntroText } from '@/app/lib/helpers';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { Bible } from '@/app/types';
import bibleActions from '@/app/lib/actions/bible';
import authActions from '@/app/lib/actions/auth';
import Spinner from '@/app/components/Spinner';

type Dashboard = {
  bible: Bible[];
};

export default function Dashboard() {
  const { user } = useAuth();
  const [dashboard, setDashboard] = useState<Dashboard>({ bible: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // ** Get the value from localstorage
    const bible = getFromLocalStorage<Bible>('bible');

    if (bible) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDashboard((prev) => ({
        ...prev,
        bible: [bible],
      }));
    } else {
      // ** Fallback calling the API
      (async () => {
        setLoading(true);
        const fetchBibleDB = async () => {
          const response = await bibleActions.getBibleDB();
          setDashboard((prev) => ({
            ...prev,
            bible: [response.data],
          }));
        };
        // ** This will insert the user data from Google OAuth
        const insertGoogleUser = async () => {
          if (user?.user_metadata?.provider_id) await authActions.insertUser(user);
        };

        await insertGoogleUser();
        await fetchBibleDB();
        setLoading(false);
      })();
    }
  }, [user]);

  if (loading) {
    return <Spinner />;
  }

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
                  <li className="relative flex p-6 mt-2 mb-2 border-0 rounded-xl bg-gray-100 dark:bg-slate-850">
                    <div className="flex flex-col">
                      <h6 className="mb-4 text-2xl leading-normal text-blue-500 font-semibold">
                        Welcome to BibleVerse 1.0
                      </h6>
                      <span className="mb-2 text-md leading-tight dark:text-white/80">
                        {getRandomIntroText()}
                        <span className="text-slate-700 dark:text-white sm:ml-2"></span>
                      </span>
                    </div>
                  </li>
                  <li className="relative flex mt-4 p-6 mb-2 border-0 rounded-xl bg-gray-100 dark:bg-slate-850">
                    <div className="flex flex-col">
                      <h6 className="mb-4 text-lg leading-normal dark:text-white font-semibold">
                        App Details:
                      </h6>

                      {dashboard.bible.length > 0 && (
                        <>
                          <span className="mb-2 text-sm sm:text-base md:text-lg leading-tight dark:text-white/80">
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
                            <div key={index}>
                              <div className="mb-2 text-sm sm:text-base md:text-lg leading-tight dark:text-white/80">
                                Name:
                                <span className="text-slate-700 dark:text-white sm:ml-2">
                                  {item.name}
                                </span>
                              </div>
                              <div className="mb-2 text-sm sm:text-base md:text-lg leading-tight dark:text-white/80">
                                Abbrevation:
                                <span className="text-slate-700 dark:text-white sm:ml-2">
                                  {item.abbreviationLocal ?? item.abbreviationlocal}
                                </span>
                              </div>
                              <div className="text-sm sm:text-base md:text-lg leading-tight dark:text-white/80">
                                Languange:
                                <span className="text-slate-700 dark:text-white sm:ml-2">
                                  {item.language?.name ?? item.language}
                                </span>
                              </div>
                              <div className="mb-2 text-sm sm:text-base md:text-lg mt-2 md:-mt-2 leading-tight dark:text-white/80 ">
                                <span className="text-slate-700 dark:text-white sm:ml-2">
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: copyrightToHtml(item.copyright),
                                    }}
                                  />
                                </span>
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </li>
                  <li className="relative flex p-6 mt-4 mb-2 border-0 rounded-b-inherit rounded-xl bg-gray-100 dark:bg-slate-850">
                    <div className="flex flex-col">
                      <h6 className="mb-4 text-sm sm:text-base md:text-lg leading-normal dark:text-white font-semibold">
                        User Details:
                      </h6>
                      <span className="mb-2 text-sm sm:text-base md:text-lg leading-tight dark:text-white/80">
                        Name:
                        <span className="text-slate-700 dark:text-white sm:ml-2">
                          {user.user_metadata.full_name}
                        </span>
                      </span>
                      <span className="mb-2 text-sm sm:text-base md:text-lg leading-tight dark:text-white/80">
                        Email:
                        <span className="text-blue-700 dark:text-white sm:ml-2">{user.email}</span>
                      </span>
                      <span className="mb-2 text-sm sm:text-base md:text-lg leading-tight dark:text-white/80">
                        Account Created At:
                        <span className="text-slate-700 dark:text-white sm:ml-2">
                          {new Date(user.created_at).toLocaleString()}
                        </span>
                      </span>
                      <span className="mb-2 text-sm sm:text-base md:text-lg leading-tight dark:text-white/80">
                        Your Last Sign-in:
                        <span className="text-slate-700 dark:text-white sm:ml-2">
                          {new Date(user.last_sign_in_at ?? '').toLocaleString()}
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
