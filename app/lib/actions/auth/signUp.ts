import * as auth from '@/app/lib/supabase/auth';
import { SignUpFormType } from '@/app/types';

export default async function signUp(authForm: SignUpFormType) {
  // get the form fields
  const { fullName, email, password } = authForm;

  try {
    // call the supabase sign up using email and password
    const { data, error } = await auth.signUpWithEmailPassword(fullName, email, password);

    // error
    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true, data };
  } catch (error) {
    if (error instanceof Error) {
      console.error('Sign Up failed:', error);
      return { success: false, message: 'Failed to sign up due to an unexpected error.' };
    }
  }
}
