'use client';
import { useState } from 'react';

function getInitialStatus() {
  if (typeof window === 'undefined') return 'pending';

  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  const error = params.get('error');

  if (code) return 'confirmed';
  if (error) return 'error';
  return 'pending';
}

function getInitialErrorMessage() {
  if (typeof window === 'undefined') return '';
  const params = new URLSearchParams(window.location.search);
  return params.get('error_description') || '';
}

export default function WelcomeMessage() {
  const [status] = useState<'pending' | 'confirmed' | 'error'>(getInitialStatus());
  const [errorMessage] = useState(getInitialErrorMessage());

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {status === 'pending' && (
        <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md w-full mx-auto mt-20 text-center">
          <h1 className="text-2xl font-semibold mb-4">Welcome!</h1>
          <p>Please confirm your email to proceed.</p>
        </div>
      )}

      {status === 'confirmed' && (
        <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md w-full mx-auto mt-20 text-center">
          <h1 className="text-2xl font-semibold mb-4">Thanks for verifying your email!</h1>
          <p>
            You can now sign in here:{' '}
            <a href="/auth/sign-in" className="text-blue-600 underline hover:text-blue-800">
              Sign In
            </a>
          </p>
        </div>
      )}

      {status === 'error' && (
        <div className="bg-white shadow-lg rounded-2xl px-5 max-w-md w-full mx-auto mt-20 py-10 text-center">
          <h1 className="text-2xl font-semibold mb-4 text-red-600">Email verification failed</h1>
          <p className="mb-8">{errorMessage}</p>
          <a
            href="/auth/sign-in"
            className="bg-slate-700 text-white px-4 py-2 rounded hover:bg-slate-800 transition"
          >
            Go to Sign In
          </a>
        </div>
      )}
    </div>
  );
}
