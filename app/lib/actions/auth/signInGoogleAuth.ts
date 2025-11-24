import * as auth from '@/app/lib/supabase/auth';

export default async function signInGoogleAuth() {
  try {
    const url = await auth.signInWithGoogle();

    // error
    if (!url) {
      console.log(`Could not get the OAuth URL`);
      return;
    }

    // ** Redirect browser to Google OAuth
    // ** Auth Service will handle the redirect instead of the client component
    window.location.href = url;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Getting Session failed:', error);
      return { success: false, message: 'Failed to get session due to an unexpected error.' };
    }
  }
}
