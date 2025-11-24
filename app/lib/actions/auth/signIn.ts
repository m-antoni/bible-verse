import * as auth from '@/app/lib/supabase/auth';
import { SignInFormType } from '@/app/types';

export default async function signIn(authForm: SignInFormType) {
  // get the form fields
  const { email, password } = authForm;
  try {
    // call the supabase sign in using email and password
    const { data, error } = await auth.signInWithEmailPassword(email, password);

    // error
    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true, data };
  } catch (error) {
    if (error instanceof Error) {
      console.error('Sign In failed:', error);
      return { success: false, message: 'Failed to sign in due to an unexpected error.' };
    }
  }
}
