import { auth, db } from '../lib/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export type UserType = 'trader' | 'producer' | 'consumer';

interface SignupData {
  username: string;
  email: string;
  password: string;
  userType: UserType;
}

interface LoginData {
  email: string;
  password: string;
}

export const signup = async ({ username, email, password, userType }: SignupData) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Save extra user data in Firestore
  const userDoc = doc(db, 'users', user.uid);
  await setDoc(userDoc, {
    username,
    email,
    userType,
  });

  return {
    id: user.uid,
    username,
    email,
    userType,
  };
};

export const login = async ({ email, password }: LoginData) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Get additional user info from Firestore
  const userDoc = await getDoc(doc(db, 'users', user.uid));
  const userData = userDoc.data();

  if (!userData) {
    throw new Error('User data not found in Firestore');
  }

  return {
    id: user.uid,
    username: userData.username,
    email: user.email!,
    userType: userData.userType as UserType,
  };
};

export const logout = async () => {
  await signOut(auth);
};
