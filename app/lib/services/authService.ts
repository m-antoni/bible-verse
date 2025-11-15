import * as auth from '@/app/lib/supabase/auth';

export const authService = {
  // Sign up service
  signUp: async (fullName: string, email: string, password: string) => {
    try {
      const { data, error } = await auth.signUpWithEmailPassword(fullName, email, password);

      // error
      if (error) throw new Error(error.message);

      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Sign Up failed:', error);
        throw new Error('Failed to sign up. ' + error.message);
      }
      throw new Error('Failed to sign up due to an unknown error.');
    }
  },

  // Sign In service
  signIn: async (email: string, password: string) => {
    try {
      const { data, error } = await auth.signInWithEmailPassword(email, password);

      // error
      if (error) throw new Error(error.message);

      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Sign In failed:', error);
        throw new Error('Failed to sign in. ' + error.message);
      }
      throw new Error('Failed to sign in due to an unknown error.');
    }
  },

  // Sign out
  signOut: async () => {
    try {
      const { error } = await auth.signOut();
      // error
      if (error) throw new Error(error.message);

      // nothing to return here
    } catch (error) {
      if (error instanceof Error) {
        console.error('Sign out failed:', error);
        throw new Error('Failed to sign out. ' + error.message);
      }
      throw new Error('Failed to sign out due to an unknown error.');
    }
  },

  // Get Session
  getSession: async () => {
    try {
      const { data, error } = await auth.getCurrentSession();

      // error
      if (error) throw new Error(error.message);

      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Get current session failed:', error);
        throw new Error('Failed session. ' + error.message);
      }
      throw new Error('Failed to get session, an unknown error.');
    }
  },
};
