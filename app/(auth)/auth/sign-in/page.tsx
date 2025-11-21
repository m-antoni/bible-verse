'use client';

import { useState } from 'react';
import { PuffLoader } from 'react-spinners';
import { CSSProperties } from 'react';
import { authService } from '@/app/lib/services/authService';
import { FaTimes } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import SignInForm from '@/app/components/SignInForm';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // handle form submit
  const handleOnSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // input validations
    if (form.email === '' || form.password === '') {
      toast('Please input all the fields.', {
        toastId: '01',
        icon: <FaTimes className="text-xl text-red-500" />,
      });
      return;
    }

    setLoading(true);

    const result = await authService.signIn(form);

    if (result && !result.success) {
      toast(`${result.message}`, {
        toastId: '02',
        icon: <FaTimes className="text-xl text-red-500" />,
      });
      setLoading(false);
    }

    if (result && result.success) {
      // IMPORTANT: refresh the page so the server-side layout reads the cookie
      router.refresh();
    }

    // console.log(result);
  };

  // handle on form
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
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          {/* <div className="relative px-4 py-10 bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.15)]"> */}
          <div className="relative px-4 py-10 bg-white rounded-3xl shadow-2xl -mt-15">
            <div className="max-w-md mx-auto px-10">
              {loading ? (
                <div className="flex-grow flex items-center justify-center h-64 px-10 mx-10">
                  <PuffLoader cssOverride={override} color="#2196F3" size={90} />
                  <div className="pb-5"></div>
                </div>
              ) : (
                <SignInForm
                  form={form}
                  handleOnSubmit={handleOnSubmit}
                  handleOnChange={handleOnChange}
                />
              )}
              <ToastContainer
                position="top-center"
                autoClose={3000}
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
          </div>
        </div>
      </div>
    </>
  );
}
