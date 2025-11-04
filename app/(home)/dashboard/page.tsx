export default function Dashboard() {
  return (
    <>
      <div className="w-full mx-auto">
        <div className="flex flex-wrap -mx-3">
          <div className="max-w-full px-3 lg:w-2/3 lg:flex-none">
            <div className="flex flex-wrap -mx-3">
              <div className="w-full max-w-full px-3 mb-6 xl:mb-0 xl:w-1/2 xl:flex-none"></div>
              <div className="w-full max-w-full px-3 xl:w-1/2 xl:flex-none"></div>
            </div>
          </div>
          {/* <div className="w-full max-w-full px-3 lg:w-1/3 lg:flex-none">
              <div className="relative flex flex-col h-full min-w-0 break-words bg-white border-0 border-transparent border-solid shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
                <div className="p-4 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                  <div className="flex flex-wrap -mx-3">
                    <div className="flex items-center flex-none w-1/2 max-w-full px-3">
                      <h6 className="mb-0 dark:text-white">
                        Invoices
                      </h6>
                    </div>
                    <div className="flex-none w-1/2 max-w-full px-3 text-right">
                      <button className="inline-block px-8 py-2 mb-0 text-xs font-bold leading-normal text-center text-blue-500 align-middle transition-all ease-in bg-transparent border border-blue-500 border-solid rounded-lg shadow-none cursor-pointer bg-150 active:opacity-85 hover:-translate-y-px tracking-tight-rem bg-x-25 hover:opacity-75">
                        View All
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex-auto p-4 pb-0">
                  <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                    <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 border-0 rounded-t-inherit text-inherit rounded-xl">
                      <div className="flex flex-col">
                        <h6 className="mb-1 text-sm font-semibold leading-normal dark:text-white text-slate-700">
                          March, 01, 2020
                        </h6>
                        <span className="text-xs leading-tight dark:text-white dark:opacity-80">
                          #MS-415646
                        </span>
                      </div>
                      <div className="flex items-center text-sm leading-normal dark:text-white/80">
                        $180
                        <button className="dark:text-white inline-block px-0 py-2.5 mb-0 ml-6 font-bold leading-normal text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer ease-in bg-150 text-sm active:opacity-85 hover:-translate-y-px tracking-tight-rem bg-x-25 text-slate-700">
                          <i className="mr-1 text-lg leading-none fas fa-file-pdf"></i>
                          PDF
                        </button>
                      </div>
                    </li>
                    <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 border-0 rounded-xl text-inherit">
                      <div className="flex flex-col">
                        <h6 className="mb-1 text-sm font-semibold leading-normal dark:text-white text-slate-700">
                          February, 10, 2021
                        </h6>
                        <span className="text-xs leading-tight dark:text-white dark:opacity-80">
                          #RV-126749
                        </span>
                      </div>
                      <div className="flex items-center text-sm leading-normal dark:text-white/80">
                        $250
                        <button className="dark:text-white inline-block px-0 py-2.5 mb-0 ml-6 font-bold leading-normal text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer ease-in bg-150 text-sm active:opacity-85 hover:-translate-y-px tracking-tight-rem bg-x-25 text-slate-700">
                          <i className="mr-1 text-lg leading-none fas fa-file-pdf"></i>
                          PDF
                        </button>
                      </div>
                    </li>
                    <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 border-0 rounded-xl text-inherit">
                      <div className="flex flex-col">
                        <h6 className="mb-1 text-sm font-semibold leading-normal dark:text-white text-slate-700">
                          April, 05, 2020
                        </h6>
                        <span className="text-xs leading-tight dark:text-white dark:opacity-80">
                          #FB-212562
                        </span>
                      </div>
                      <div className="flex items-center text-sm leading-normal dark:text-white/80">
                        $560
                        <button className="dark:text-white inline-block px-0 py-2.5 mb-0 ml-6 font-bold leading-normal text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer ease-in bg-150 text-sm active:opacity-85 hover:-translate-y-px tracking-tight-rem bg-x-25 text-slate-700">
                          <i className="mr-1 text-lg leading-none fas fa-file-pdf"></i>
                          PDF
                        </button>
                      </div>
                    </li>
                    <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 border-0 rounded-xl text-inherit">
                      <div className="flex flex-col">
                        <h6 className="mb-1 text-sm font-semibold leading-normal dark:text-white text-slate-700">
                          June, 25, 2019
                        </h6>
                        <span className="text-xs leading-tight dark:text-white dark:opacity-80">
                          #QW-103578
                        </span>
                      </div>
                      <div className="flex items-center text-sm leading-normal dark:text-white/80">
                        $120
                        <button className="dark:text-white inline-block px-0 py-2.5 mb-0 ml-6 font-bold leading-normal text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer ease-in bg-150 text-sm active:opacity-85 hover:-translate-y-px tracking-tight-rem bg-x-25 text-slate-700">
                          <i className="mr-1 text-lg leading-none fas fa-file-pdf"></i>
                          PDF
                        </button>
                      </div>
                    </li>
                    <li className="relative flex justify-between px-4 py-2 pl-0 border-0 rounded-b-inherit rounded-xl text-inherit">
                      <div className="flex flex-col">
                        <h6 className="mb-1 text-sm font-semibold leading-normal dark:text-white text-slate-700">
                          March, 01, 2019
                        </h6>
                        <span className="text-xs leading-tight dark:text-white dark:opacity-80">
                          #AR-803481
                        </span>
                      </div>
                      <div className="flex items-center text-sm leading-normal dark:text-white/80">
                        $300
                        <button className="dark:text-white inline-block px-0 py-2.5 mb-0 ml-6 font-bold leading-normal text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer ease-in bg-150 text-sm active:opacity-85 hover:-translate-y-px tracking-tight-rem bg-x-25 text-slate-700">
                          <i className="mr-1 text-lg leading-none fas fa-file-pdf"></i>
                          PDF
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div> */}
        </div>

        <div className="flex flex-wrap -mx-3">
          <div className="w-full max-w-full px-3 mt-6 md:w-7/12 md:flex-none">
            <div className="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
              <div className="p-6 px-4 pb-0 mb-0 border-b-0 rounded-t-2xl">
                <h6 className="mb-0 dark:text-white">
                  Start Reading
                </h6>
              </div>
              <div className="flex-auto p-4 pt-6">
                <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                  <li className="relative flex p-6 mb-2 border-0 rounded-t-inherit rounded-xl bg-gray-50 dark:bg-slate-850">
                    <div className="flex flex-col">
                      <h6 className="mb-4 text-sm leading-normal dark:text-white">
                        Oliver Liam
                      </h6>
                      <span className="mb-2 text-xs leading-tight dark:text-white/80">
                        Company Name:
                        <span className="font-semibold text-slate-700 dark:text-white sm:ml-2">
                          Viking Burrito
                        </span>
                      </span>
                      <span className="mb-2 text-xs leading-tight dark:text-white/80">
                        Email Address:
                        <span className="font-semibold text-slate-700 dark:text-white sm:ml-2">
                          oliver@burrito.com
                        </span>
                      </span>
                      <span className="text-xs leading-tight dark:text-white/80">
                        VAT Number:
                        <span className="font-semibold text-slate-700 dark:text-white sm:ml-2">
                          FRB1235476
                        </span>
                      </span>
                    </div>
                    <div className="ml-auto text-right">
                      <a
                        className="relative z-10 inline-block px-4 py-2.5 mb-0 font-bold text-center text-transparent align-middle transition-all border-0 rounded-lg shadow-none cursor-pointer leading-normal text-sm ease-in bg-150 bg-gradient-to-tl from-red-600 to-orange-600 hover:-translate-y-px active:opacity-85 bg-x-25 bg-clip-text"
                        href="javascript:;"
                      >
                        <i className="mr-2 far fa-trash-alt bg-150 bg-gradient-to-tl from-red-600 to-orange-600 bg-x-25 bg-clip-text"></i>
                        Delete
                      </a>
                      <a
                        className="inline-block dark:text-white px-4 py-2.5 mb-0 font-bold text-center align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-normal text-sm ease-in bg-150 hover:-translate-y-px active:opacity-85 bg-x-25 text-slate-700"
                        href="javascript:;"
                      >
                        <i
                          className="mr-2 fas fa-pencil-alt text-slate-700"
                          aria-hidden="true"
                        ></i>
                        Edit
                      </a>
                    </div>
                  </li>
                  <li className="relative flex p-6 mt-4 mb-2 border-0 rounded-xl bg-gray-50 dark:bg-slate-850">
                    <div className="flex flex-col">
                      <h6 className="mb-4 text-sm leading-normal dark:text-white">
                        Lucas Harper
                      </h6>
                      <span className="mb-2 text-xs leading-tight dark:text-white/80">
                        Company Name:
                        <span className="font-semibold text-slate-700 dark:text-white sm:ml-2">
                          Stone Tech Zone
                        </span>
                      </span>
                      <span className="mb-2 text-xs leading-tight dark:text-white/80">
                        Email Address:
                        <span className="font-semibold text-slate-700 dark:text-white sm:ml-2">
                          lucas@stone-tech.com
                        </span>
                      </span>
                      <span className="text-xs leading-tight dark:text-white/80">
                        VAT Number:
                        <span className="font-semibold text-slate-700 dark:text-white sm:ml-2">
                          FRB1235476
                        </span>
                      </span>
                    </div>
                    <div className="ml-auto text-right">
                      <a
                        className="relative z-10 inline-block px-4 py-2.5 mb-0 font-bold text-center text-transparent align-middle transition-all border-0 rounded-lg shadow-none cursor-pointer leading-normal text-sm ease-in bg-150 bg-gradient-to-tl from-red-600 to-orange-600 hover:-translate-y-px active:opacity-85 bg-x-25 bg-clip-text"
                        href="javascript:;"
                      >
                        <i className="mr-2 far fa-trash-alt bg-150 bg-gradient-to-tl from-red-600 to-orange-600 bg-x-25 bg-clip-text"></i>
                        Delete
                      </a>
                      <a
                        className="inline-block dark:text-white px-4 py-2.5 mb-0 font-bold text-center align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-normal text-sm ease-in bg-150 hover:-translate-y-px active:opacity-85 bg-x-25 text-slate-700"
                        href="javascript:;"
                      >
                        <i
                          className="mr-2 fas fa-pencil-alt text-slate-700"
                          aria-hidden="true"
                        ></i>
                        Edit
                      </a>
                    </div>
                  </li>
                  <li className="relative flex p-6 mt-4 mb-2 border-0 rounded-b-inherit rounded-xl bg-gray-50 dark:bg-slate-850">
                    <div className="flex flex-col">
                      <h6 className="mb-4 text-sm leading-normal dark:text-white">
                        Ethan James
                      </h6>
                      <span className="mb-2 text-xs leading-tight dark:text-white/80">
                        Company Name:
                        <span className="font-semibold text-slate-700 dark:text-white sm:ml-2">
                          Fiber Notion
                        </span>
                      </span>
                      <span className="mb-2 text-xs leading-tight dark:text-white/80">
                        Email Address:
                        <span className="font-semibold text-slate-700 dark:text-white sm:ml-2">
                          ethan@fiber.com
                        </span>
                      </span>
                      <span className="text-xs leading-tight dark:text-white/80">
                        VAT Number:
                        <span className="font-semibold text-slate-700 dark:text-white sm:ml-2">
                          FRB1235476
                        </span>
                      </span>
                    </div>
                    <div className="ml-auto text-right">
                      <a
                        className="relative z-10 inline-block px-4 py-2.5 mb-0 font-bold text-center text-transparent align-middle transition-all border-0 rounded-lg shadow-none cursor-pointer leading-normal text-sm ease-in bg-150 bg-gradient-to-tl from-red-600 to-orange-600 hover:-translate-y-px active:opacity-85 bg-x-25 bg-clip-text"
                        href="javascript:;"
                      >
                        <i className="mr-2 far fa-trash-alt bg-150 bg-gradient-to-tl from-red-600 to-orange-600 bg-x-25 bg-clip-text"></i>
                        Start
                      </a>
                      <a
                        className="inline-block dark:text-white px-4 py-2.5 mb-0 font-bold text-center align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-normal text-sm ease-in bg-150 hover:-translate-y-px active:opacity-85 bg-x-25 text-slate-700"
                        href="javascript:;"
                      >
                        <i
                          className="mr-2 fa fa-heart text-red-500"
                          aria-hidden="true"
                        ></i>
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="w-full max-w-full px-3 mt-6 md:w-5/12 md:flex-none">
            <div className="relative flex flex-col h-full min-w-0 mb-6 break-words bg-white border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
              <div className="p-6 px-4 pb-0 mb-0 border-b-0 rounded-t-2xl">
                <div className="flex flex-wrap -mx-3">
                  <div className="max-w-full px-3 md:w-1/2 md:flex-none">
                    <h6 className="mb-0 dark:text-white">
                      Read History
                    </h6>
                  </div>
                  <div className="flex items-center justify-end max-w-full px-3 dark:text-white/80 md:w-1/2 md:flex-none">
                    <i className="mr-2 far fa-calendar-alt"></i>
                    <small>
                      23 - 30 March 2020
                    </small>
                  </div>
                </div>
              </div>
              <div className="flex-auto p-4 pt-6">
                <h6 className="mb-4 text-xs font-bold leading-tight uppercase dark:text-white text-slate-500">
                  Newest
                </h6>
                <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                  <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 border-0 rounded-t-inherit text-inherit rounded-xl">
                    <div className="flex items-center">
                      {/* <button className="leading-pro ease-in text-xs bg-150 w-6.5 h-6.5 p-1.2 rounded-3.5xl tracking-tight-rem bg-x-25 mr-4 mb-0 flex 
                        cursor-pointer items-center justify-center border border-solid border-red-600 border-transparent bg-transparent text-center align-middle font-bold uppercase text-red-600 transition-all hover:opacity-75">
                          <i className="fas fa-check text-3xs"></i>
                        </button> */}
                      <div className="flex flex-col">
                        <h6 className="mb-1 text-sm leading-normal dark:text-white text-slate-700">
                          Genesis 1:20
                        </h6>
                        <span className="text-xs leading-tight dark:text-white/80">
                          27 March 2020, at 12:30
                          PM
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <p className="relative z-10 inline-block m-0 text-sm font-semibold leading-normal text-blue-500 bg-clip-text">
                        On Going
                      </p>
                    </div>
                  </li>
                  <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 border-0 rounded-t-inherit text-inherit rounded-xl">
                    <div className="flex items-center">
                      <div className="flex flex-col">
                        <h6 className="mb-1 text-sm leading-normal dark:text-white text-slate-700">
                          Deuteronomy 10:20
                        </h6>
                        <span className="text-xs leading-tight dark:text-white/80">
                          27 March 2020, at 12:30
                          PM
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <p className="relative z-10 inline-block m-0 text-sm font-semibold leading-normal text-green-500 bg-clip-text">
                        Completed
                      </p>
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
                          26 March 2020, at 13:45
                          PM
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
                          26 March 2020, at 12:30
                          PM
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
                          26 March 2020, at 05:00
                          AM
                        </span>
                      </div>
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
