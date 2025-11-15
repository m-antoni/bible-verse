'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FaHome,
  FaEye,
  FaSearch,
  FaHeart,
  FaTimes,
  FaDoorOpen,
  FaDoorClosed,
} from 'react-icons/fa';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { authService } from '../lib/services/authService';

type SidebarProps = {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  sidebarDark: boolean;
};

export default function SideNavbar({ sidebarOpen, toggleSidebar, sidebarDark }: SidebarProps) {
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close sidebar when clicking outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && sidebarOpen) {
        toggleSidebar();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarOpen, toggleSidebar]);

  // Helper for closing sidebar when a link is clicked
  const handleLinkClick = () => {
    if (sidebarOpen) toggleSidebar();
  };

  // handle signout
  const handleSigOut = () => {
    authService.signOut();
  };

  return (
    <aside
      ref={sidebarRef}
      className={`fixed inset-y-0 flex-wrap items-center justify-between block w-full p-0 my-4 overflow-y-auto antialiased transition-transform duration-300 border-0 rounded-2xl xl:left-0 xl:translate-x-0 max-w-64 ease-nav-brand z-[9999] xl:ml-6
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
          onClick={handleLinkClick}
        >
          {/* <Image
            src="/assets/custom/bible.png"
            className="hidden h-full max-w-full transition-all duration-200 dark:inline ease-nav-brand max-h-8 -ml-3"
            alt="main_logo"
            width={35}
            height={100}
          /> */}
          <span className="ml-1 pl-2 font-semibold transition-all duration-200 ease-nav-brand">
            Bible Verse 1.0
          </span>
        </Link>
      </div>

      <hr className="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent" />

      <div className="items-center block w-auto max-h-screen overflow-auto h-sidenav grow basis-full">
        <ul className="flex flex-col pl-0 mb-0">
          {[
            {
              href: '/dashboard',
              icon: <FaHome className="text-blue-500 text-lg" />,
              label: 'Dashboard',
            },
            {
              href: '/read-bible',
              icon: <FaEye className="text-emerald-500 text-lg" />,
              label: 'Read Bible',
            },
            {
              href: '/search',
              icon: <FaSearch className="text-cyan-500 text-lg" />,
              label: 'Search',
            },
            {
              href: '/favorites',
              icon: <FaHeart className="text-red-500 text-lg" />,
              label: 'Favorites',
            },
          ].map(({ href, icon, label }) => (
            <li key={href} className="mt-0.5 w-full">
              <Link
                href={href}
                onClick={handleLinkClick}
                className={`py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap rounded-lg px-4 transition-colors
                  dark:text-white dark:opacity-80 ${
                    pathname === href
                      ? 'bg-blue-500/13 font-semibold text-slate-800'
                      : 'text-slate-700'
                  }`}
              >
                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                  {icon}
                </div>
                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">
                  {label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: '3rem' }} className="mx-4">
        <p className="invisible hidden text-gray-800 text-red-500 text-red-600 text-blue-500 after:bg-gradient-to-tl after:from-zinc-800 after:to-zinc-700 after:from-blue-700 after:to-cyan-500 after:from-orange-500 after:to-yellow-500 after:from-green-600 after:to-lime-400 after:from-red-600 after:to-orange-600 after:from-slate-600 after:to-slate-300 text-emerald-500 text-cyan-500 text-slate-400"></p>
        <div
          className="relative flex flex-col min-w-0 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border"
          data-sidenav-card
        >
          {/* <img
            className="w-1/2 mx-auto"
            src="/assets/custom/bible-02.g"
            alt="sidebar illustrations"
          />
          <div className="flex-auto w-full p-4 pt-0 text-center">
            <div className="transition-all duration-200 ease-nav-brand">
              <h6 className="mb-0 dark:text-white text-slate-700">Need help?</h6>
              <p className="-mb-1 text-xs font-semibold leading-tight dark:text-white dark:opacity-60">
                Please check our docs
              </p>
            </div>
          </div> */}
        </div>
        <Link
          href="/"
          className="inline-block w-full px-8 py-2 mb-3 text-xs font-semibold leading-normal text-center text-white capitalize 
          transition-all ease-in rounded-lg shadow-md bg-purple-800 bg-150 hover:shadow-xs hover:-translate-y-px"
        >
          About Me
        </Link>
        <Link
          href="https://scripture.api.bible/"
          target="_blank"
          className="inline-block w-full px-8 py-2 mb-4 text-xs font-semibold leading-normal text-center text-white capitalize 
          transition-all ease-in rounded-lg shadow-md bg-black bg-150 hover:shadow-xs hover:-translate-y-px"
        >
          Bible API Docs
        </Link>
        <hr
          className="h-px mx-0 mb-3 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent 
          via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent "
        />

        <Link
          onClick={handleSigOut}
          className="inline-block w-full px-8 py-2 text-xs font-semibold leading-normal text-center 
          text-white align-middle transition-all ease-in bg-slate-700 border-0 rounded-lg shadow-md 
          select-none bg-150 bg-x-25 hover:shadow-xs hover:-translate-y-px"
          href="#0"
        >
          Sign-out
        </Link>
      </div>
    </aside>
  );
}
