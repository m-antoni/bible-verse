import * as auth from '@/app/lib/supabase/auth';
import { SignInFormType, SignUpFormType } from '@/app/types';

export const authService = {
  // Sign up service
  signUp: async (authForm: SignUpFormType) => {
    // get the form fields
    const { fullName, email, password } = authForm;

    try {
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
  },

  // Sign In service
  signIn: async (authForm: SignInFormType) => {
    // get the form fields
    const { email, password } = authForm;
    try {
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
  },

  // Sign out
  signOut: async () => {
    try {
      const { error } = await auth.signOut();
      // error
      if (error) {
        return { success: false, message: error.message };
      }
      return { success: true };
    } catch (error) {
      if (error instanceof Error) {
        console.error('Sign Out failed:', error);
        return { success: false, message: 'Failed to sign out due to an unexpected error.' };
      }
    }
  },

  // Get Session
  getSession: async () => {
    try {
      const { data, error } = await auth.getCurrentSession();

      // error
      if (error) {
        return { success: false, message: error.message };
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Getting Session failed:', error);
        return { success: false, message: 'Failed to get session due to an unexpected error.' };
      }
    }
  },
};
