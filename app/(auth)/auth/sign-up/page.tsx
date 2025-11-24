'use client';

import { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify/unstyled';
import 'react-toastify/ReactToastify.css';
import { CSSProperties } from 'react';
import { PuffLoader } from 'react-spinners';
import SignUpForm from '@/app/components/SignUpFom';
import authActions from '@/app/lib/actions/auth';

export default function SignUp() {
  const [form, setForm] = useState({ fullName: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  // handle submit signup button
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

    const result = await authActions.signUp(form);

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

  // form on change
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
      <div className="min-h-screen py-6 flex flex-col justify-center sm:py-1">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto -mt-10">
          <div className="relative px-4 py-10 bg-white rounded-3xl shadow-2xl">
            <div className="max-w-md mx-auto px-10">
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
