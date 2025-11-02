'use client';

import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);
  const [sidebarDark, setSidebarDark] =
    useState(false);

  const toggleSidebar = () =>
    setSidebarOpen(!sidebarOpen);
  const toggleSidebarTheme = () =>
    setSidebarDark(!sidebarDark);

  return (
    <>
      <div className="absolute w-full bg-blue-500 dark:hidden min-h-75"></div>
      {/* <!-- sidenav  --> */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        sidebarDark={sidebarDark}
      />

      {/* <!-- end sidenav --> */}

      <main className="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl">
        {/* <!-- Navbar --> */}
        <nav
          className="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all ease-in shadow-none duration-250 rounded-2xl lg:flex-nowrap lg:justify-start"
          data-navbar-main
          navbar-scroll="false"
        >
          <div className="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
            <nav>
              <ol className="flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
                <li className="text-sm leading-normal">
                  <a
                    className="text-white opacity-50"
                    href="javascript:;"
                  >
                    Pages
                  </a>
                </li>
                <li
                  className="text-sm pl-2 capitalize leading-normal text-white before:float-left before:pr-2 before:text-white before:content-['/']"
                  aria-current="page"
                >
                  Dashboard
                </li>
              </ol>
              <h6 className="mb-0 font-bold text-white capitalize">
                Dashboard
              </h6>
            </nav>

            <div className="flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
              <div className="flex items-center md:ml-auto md:pr-4">
                {/* <div className="relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease">
                  <span
                    className="text-sm ease leading-5.6 absolute z-50 -ml-px flex h-full items-center whitespace-nowrap rounded-lg 
                  rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal 
                  text-slate-500 transition-all"
                  >
                    <i className="fas fa-search"></i>
                  </span>
                  <input
                    type="text"
                    className="pl-9 text-sm focus:shadow-primary-outline ease w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 dark:bg-slate-850 dark:text-white bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:transition-shadow"
                    placeholder="Type here..."
                  />
                </div> */}
              </div>
              <ul className="flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full">
                {/* <!-- online builder btn  -->
            <!-- <li className="flex items-center">
              <a className="inline-block px-8 py-2 mb-0 mr-4 text-xs font-bold text-center text-blue-500 uppercase align-middle transition-all ease-in bg-transparent border border-blue-500 border-solid rounded-lg shadow-none cursor-pointer leading-pro hover:-translate-y-px active:shadow-xs hover:border-blue-500 active:bg-blue-500 active:hover:text-blue-500 hover:text-blue-500 tracking-tight-rem hover:bg-transparent hover:opacity-75 hover:shadow-none active:text-white active:hover:bg-transparent" target="_blank" href="https://www.creative-tim.com/builder/soft-ui?ref=navbar-dashboard&amp;_ga=2.76518741.1192788655.1647724933-1242940210.1644448053">Online Builder</a>
            </li> --> */}
                <li className="flex items-center">
                  <a
                    href="../pages/sign-in.html"
                    className="block px-0 py-2 text-sm font-semibold text-white transition-all ease-nav-brand"
                  >
                    <i className="fa fa-user sm:mr-1"></i>
                    <span className="hidden sm:inline">
                      Michael
                    </span>
                  </a>
                </li>
                <li className="flex items-center pl-4 xl:hidden">
                  <a
                    href="javascript:;"
                    className="block p-0 text-sm text-white transition-all ease-nav-brand"
                    onClick={toggleSidebar}
                  >
                    <div className="w-4.5 overflow-hidden">
                      <i className="ease mb-0.75 relative block h-0.5 rounded-sm bg-white transition-all"></i>
                      <i className="ease mb-0.75 relative block h-0.5 rounded-sm bg-white transition-all"></i>
                      <i className="ease relative block h-0.5 rounded-sm bg-white transition-all"></i>
                    </div>
                  </a>
                </li>
                <li className="flex items-center px-2">
                  <a
                    href="javascript:;"
                    className="p-0 text-sm text-white transition-all ease-nav-brand"
                  ></a>
                </li>

                {/* <!-- notifications --> */}
                <li className="relative flex items-center pr-2">
                  <p className="hidden transform-dropdown-show"></p>
                  <a
                    href="javascript:;"
                    className="block p-0 text-sm text-white transition-all ease-nav-brand"
                    data-dropdown-trigger
                    aria-expanded="false"
                  >
                    {/* Sun / Moon icon for sidebar theme */}
                    <i
                      onClick={toggleSidebarTheme}
                      className={`fa cursor-pointer text-lg transition-colors duration-300 ${
                        sidebarDark
                          ? 'fa-sun text-yellow-400'
                          : 'fa-moon text-slate-700'
                      }`}
                    ></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* <!-- end Navbar --> */}

        {/* <!-- cards --> */}
        <div className="w-full px-6 py-6 mx-auto">
          <div className="flex flex-wrap mt-6 -mx-3">
            <div className="w-full max-w-full px-3 mt-0 mb-6 lg:mb-0 lg:w-12/12 lg:flex-none">
              <div className="relative flex flex-col min-w-0 break-words bg-white border-0 border-solid shadow-xl dark:bg-slate-850 dark:shadow-dark-xl dark:bg-gray-950 border-black-125 rounded-2xl bg-clip-border">
                <div className="p-4 pb-0 mb-0 rounded-t-4">
                  <div className="flex justify-between">
                    <h6 className="mb-2 dark:text-white">
                      Sales by Country
                    </h6>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="items-center w-full mb-4 align-top border-collapse border-gray-200 dark:border-white/40">
                    <tbody>
                      <tr>
                        <td className="p-2 align-middle bg-transparent border-b w-3/10 whitespace-nowrap dark:border-white/40">
                          <div className="flex items-center px-2 py-1">
                            <div>
                              <img
                                src="/assets/argon/img/icons/flags/US.png"
                                alt="Country flag"
                              />
                            </div>
                            <div className="ml-6">
                              <p className="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-60">
                                Country:
                              </p>
                              <h6 className="mb-0 text-sm leading-normal dark:text-white">
                                United States
                              </h6>
                            </div>
                          </div>
                        </td>
                        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap dark:border-white/40">
                          <div className="text-center">
                            <p className="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-60">
                              Sales:
                            </p>
                            <h6 className="mb-0 text-sm leading-normal dark:text-white">
                              2500
                            </h6>
                          </div>
                        </td>
                        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap dark:border-white/40">
                          <div className="text-center">
                            <p className="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-60">
                              Value:
                            </p>
                            <h6 className="mb-0 text-sm leading-normal dark:text-white">
                              $230,900
                            </h6>
                          </div>
                        </td>
                        <td className="p-2 text-sm leading-normal align-middle bg-transparent border-b whitespace-nowrap dark:border-white/40">
                          <div className="flex-1 text-center">
                            <p className="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-60">
                              Bounce:
                            </p>
                            <h6 className="mb-0 text-sm leading-normal dark:text-white">
                              29.9%
                            </h6>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 align-middle bg-transparent border-b w-3/10 whitespace-nowrap dark:border-white/40">
                          <div className="flex items-center px-2 py-1">
                            <div>
                              <img
                                src="/assets/argon/img/icons/flags/DE.png"
                                alt="Country flag"
                              />
                            </div>
                            <div className="ml-6">
                              <p className="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-60">
                                Country:
                              </p>
                              <h6 className="mb-0 text-sm leading-normal dark:text-white">
                                Germany
                              </h6>
                            </div>
                          </div>
                        </td>
                        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap dark:border-white/40">
                          <div className="text-center">
                            <p className="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-60">
                              Sales:
                            </p>
                            <h6 className="mb-0 text-sm leading-normal dark:text-white">
                              3.900
                            </h6>
                          </div>
                        </td>
                        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap dark:border-white/40">
                          <div className="text-center">
                            <p className="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-60">
                              Value:
                            </p>
                            <h6 className="mb-0 text-sm leading-normal dark:text-white">
                              $440,000
                            </h6>
                          </div>
                        </td>
                        <td className="p-2 text-sm leading-normal align-middle bg-transparent border-b whitespace-nowrap dark:border-white/40">
                          <div className="flex-1 text-center">
                            <p className="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-60">
                              Bounce:
                            </p>
                            <h6 className="mb-0 text-sm leading-normal dark:text-white">
                              40.22%
                            </h6>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 align-middle bg-transparent border-b w-3/10 whitespace-nowrap dark:border-white/40">
                          <div className="flex items-center px-2 py-1">
                            <div>
                              <img
                                src="/assets/argon/img/icons/flags/GB.png"
                                alt="Country flag"
                              />
                            </div>
                            <div className="ml-6">
                              <p className="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-60">
                                Country:
                              </p>
                              <h6 className="mb-0 text-sm leading-normal dark:text-white">
                                Great Britain
                              </h6>
                            </div>
                          </div>
                        </td>
                        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap dark:border-white/40">
                          <div className="text-center">
                            <p className="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-60">
                              Sales:
                            </p>
                            <h6 className="mb-0 text-sm leading-normal dark:text-white">
                              1.400
                            </h6>
                          </div>
                        </td>
                        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap dark:border-white/40">
                          <div className="text-center">
                            <p className="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-60">
                              Value:
                            </p>
                            <h6 className="mb-0 text-sm leading-normal dark:text-white">
                              $190,700
                            </h6>
                          </div>
                        </td>
                        <td className="p-2 text-sm leading-normal align-middle bg-transparent border-b whitespace-nowrap dark:border-white/40">
                          <div className="flex-1 text-center">
                            <p className="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-60">
                              Bounce:
                            </p>
                            <h6 className="mb-0 text-sm leading-normal dark:text-white">
                              23.44%
                            </h6>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- end cards --> */}
      </main>

      {/* <div data-fixed-plugin>
        <a
          data-fixed-plugin-button
          className="fixed px-4 py-2 text-xl bg-white shadow-lg cursor-pointer bottom-8 right-8 z-990 rounded-circle text-slate-700"
        >
          <i className="py-2 pointer-events-none fa fa-cog">
            {' '}
          </i>
        </a>
      </div> */}
    </>
  );
}
