'use client';

import { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { authService } from '@/app/lib/services/authService';
import { ToastContainer, toast } from 'react-toastify/unstyled';
import 'react-toastify/ReactToastify.css';
import { CSSProperties } from 'react';
import { PuffLoader } from 'react-spinners';
import SignUpForm from '@/app/components/SignUpFom';

export default function SignUp() {
  const [form, setForm] = useState({ fullName: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleOnSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // input validations
    if (form.fullName === '' || form.email === '' || form.password === '') {
      toast.error('Please input all the fields.', {
        toastId: '01',
        icon: <FaTimes className="text-xl text-red-500" />,
      });

      return;
    }

    setLoading(true);

    const result = await authService.signUp(form);

    console.log(result);

    if (result && !result.success) {
      toast.error(`${result.message}`, {
        toastId: '02',
        icon: <FaTimes className="text-xl text-red-500" />,
      });
      setLoading(false);
    }

    if (result && result.success) {
      toast.success(`Confirmation sent to your email.`, {
        toastId: '02',
        icon: <FaCheck className="text-xl text-green-500" />,
      });
      setLoading(false);
    }
  };

  // form onchange
  const handleOnChange = (e: { target: { name: string; value: string } }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const override: CSSProperties = {
    display: 'block',
    margin: '0 auto',
    borderColor: 'red',
  };

  return (
    <>
      {/* <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12 bg-[url('/assets/custom/bible-03.jpg')] overflow-hidden bg-cover"> */}
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div
            // className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"
            className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"
          ></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            {loading ? (
              <div className="flex-grow flex items-center justify-center h-64 px-10 mx-10">
                <PuffLoader cssOverride={override} color="#2196F3" size={90} />
                <div className="pb-5"></div>
              </div>
            ) : (
              <SignUpForm
                form={form}
                handleOnSubmit={handleOnSubmit}
                handleOnChange={handleOnChange}
              />
            )}
          </div>
        </div>
        <ToastContainer
          position="top-center"
          // autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          rtl={false}
          // theme="dark"
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>
  );
}
