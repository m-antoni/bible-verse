import { redirect } from 'next/navigation';

export default function Home() {
  // not using this just redirect the user to /dashbaord
  redirect('/dashboard');
  return (
    <>
      <h1>....</h1>
    </>
  );
}
