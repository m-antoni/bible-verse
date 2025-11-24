import { getCurrentUser } from './getCurrentUser';
import { insertUser } from './insertUser';
import signIn from './signIn';
import signInGoogleAuth from './signInGoogleAuth';
import { signOut } from './signOut';
import signUp from './signUp';

const authActions = {
  getCurrentUser,
  insertUser,
  signUp,
  signIn,
  signInGoogleAuth,
  signOut,
};

export default authActions;
