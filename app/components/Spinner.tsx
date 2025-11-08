'use client';

import { PuffLoader, SyncLoader } from 'react-spinners';
import { CSSProperties } from 'react';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};

export default function Spinner() {
  return (
    <div className="flex flex-wrap -mx-3">
      <div className="flex-none w-full max-w-full px-3">
        <div className="min-h-[800px] relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
          <div className="p-6 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
            <h6 className="dark:text-white"></h6>
          </div>
          <div className="px-0 pt-0 pb-2">
            <div className="flex-grow flex items-center justify-center h-64">
              <PuffLoader cssOverride={override} color="#2196F3" size={90} />
              <div className="pb-5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
