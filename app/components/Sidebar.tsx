'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaEye, FaSearch, FaHeart, FaTimes } from 'react-icons/fa';

type SidebarProps = {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  sidebarDark: boolean;
};

export default function SideNavbar({ sidebarOpen, toggleSidebar, sidebarDark }: SidebarProps) {
  // get the current url page
  const pathname = usePathname();

  return (
    <aside
      className={`fixed inset-y-0 flex-wrap items-center justify-between block w-full p-0 my-4 overflow-y-auto antialiased transition-transform duration-300 border-0 rounded-2xl xl:left-0 xl:translate-x-0 max-w-64 ease-nav-brand z-990 xl:ml-6
      ${sidebarDark ? 'bg-slate-850 text-slate-200 shadow-none dark' : 'bg-white text-slate-700 shadow-xl'}
      ${sidebarOpen ? 'translate-x-0 left-0' : '-translate-x-full'}
      `}
      aria-expanded={sidebarOpen}
    >
      <div className="h-19">
        <FaTimes
          onClick={toggleSidebar}
          className="absolute top-3 right-3 text-xl fill-current text-slate-600 hover:text-slate-800 
          dark:text-white dark:hover:text-slate-300 cursor-pointer z-[9999] xl:hidden lg:hidden"
          data-sidenav-close
        />

        <Link
          className="block px-8 py-6 m-0 text-sm whitespace-nowrap dark:text-white text-slate-700"
          href="/dashboard"
        >
          {/* <img
            src="/assets/argon/img/logo-ct-dark.png"
            className="inline h-full max-w-full transition-all duration-200 dark:hidden ease-nav-brand max-h-8"
            alt="main_logo"
          /> */}
          {/* <img
            src="/assets/argon/img/logo-ct.png"
            className="hidden h-full max-w-full transition-all duration-200 dark:inline ease-nav-brand max-h-8"
            alt="main_logo"
          /> */}
          <span className="ml-1 font-semibold transition-all duration-200 ease-nav-brand">
            Bible Verse 1.0
          </span>
        </Link>
      </div>

      <hr className="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent" />

      <div className="items-center block w-auto max-h-screen overflow-auto h-sidenav grow basis-full">
        <ul className="flex flex-col pl-0 mb-0">
          <li className="mt-0.5 w-full">
            <Link
              className={
                pathname === '/dashboard'
                  ? `py-2.7 bg-blue-500/13 dark:text-white dark:opacity-80 text-sm ease-nav-brand my-0 mx-2 flex items-center 
              whitespace-nowrap rounded-lg px-4 font-semibold text-slate-700 transition-colors`
                  : `py-2.7 dark:text-white dark:opacity-80 text-sm ease-nav-brand my-0 mx-2 flex items-center 
              whitespace-nowrap rounded-lg px-4 font-semibold text-slate-700 transition-colors`
              }
              href="/dashboard"
            >
              <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                {/* <i className="relative top-0 text-sm leading-normal text-blue-500 fa fa-home"></i> */}
                <FaHome className="relative top-0 text-lg leading-normal text-blue-500" />
              </div>
              <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">
                Dashboard
              </span>
            </Link>
          </li>

          <li className="mt-0.5 w-full">
            <Link
              className={
                pathname === '/read-bible'
                  ? `bg-blue-500/13 rounded-lg dark:text-white dark:opacity-80 py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors`
                  : `dark:text-white dark:opacity-80 py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors`
              }
              href="/read-bible"
            >
              <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                {/* <i className="relative top-0 text-sm leading-normal text-emerald-500 fa fa-eye"></i> */}
                <FaEye className="relative top-0 text-lg leading-normal text-emerald-500 " />
              </div>
              <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">
                Read Bible
              </span>
            </Link>
          </li>

          <li className="mt-0.5 w-full">
            <a
              className={
                pathname === '/search'
                  ? `bg-blue-500/13 rounded-lg dark:text-white dark:opacity-80 py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors`
                  : `dark:text-white dark:opacity-80 py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors`
              }
              href="/search"
            >
              <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center fill-current stroke-0 text-center xl:p-2.5">
                {/* <i className="relative top-0 text-sm leading-normal text-cyan-500 fa fa-search"></i> */}
                <FaSearch className="relative top-0 text-lg leading-normal text-cyan-500" />
              </div>
              <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">Search</span>
            </a>
          </li>

          <li className="mt-0.5 w-full">
            <a
              className={
                pathname === '/favorites'
                  ? `bg-blue-500/13 rounded-lg dark:text-white dark:opacity-80 py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors`
                  : `dark:text-white dark:opacity-80 py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors`
              }
              href="/favorites"
            >
              <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                {/* <i className="relative top-0 text-sm leading-normal text-red-500 fa fa-heart"></i> */}
                <FaHeart className="relative top-0 text-lg leading-normal text-red-500" />
              </div>
              <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">
                Favorites
              </span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}
