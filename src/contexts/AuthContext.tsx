import React, { createContext, useContext, useState, useEffect } from 'react';
import * as authService from '../services/authService'; // 🔄 Import Firebase service
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth } from '../lib/firebase'; // 🔄 Import Firebase auth
import { setDoc } from 'firebase/firestore'; // Add this line
import { deleteDoc } from 'firebase/firestore';



const db = getFirestore(); // Firestore initialized

export type UserType = 'trader' | 'producer' | 'consumer';

interface User {
  id: string;
  username: string;
  email: string;
  userType: UserType;
  //token: string; // Token for authentication
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, userType: UserType) => Promise<void>;
  signup: (username: string, email: string, password: string, userType: UserType) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
  updateUserPreferences: (preferences: object) => void; // For updating user preferences
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check for saved user in localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('apmc_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  // Login function with user status tracking
  const login = async (email: string, password: string, userType: UserType) => {
  setIsLoading(true);
  setError(null);
  try {
    // Attempt to log in (remove token logic)
    const loggedInUser = await authService.login({ email, password, userType });

    // Fetch user details from Firestore
    const userDoc = await getDoc(doc(db, 'users', loggedInUser.id));

    if (userDoc.exists()) {
      const storedUserType = userDoc.data().userType;

      // Check if the userType matches
      if (storedUserType !== userType) {
        setError('You cannot log in with this role.');
        return;
      }

      // Proceed with login if roles match
      setUser({
        id: loggedInUser.id,
        username: loggedInUser.username,
        email: loggedInUser.email,
        userType: loggedInUser.userType,
      });
      localStorage.setItem('apmc_user', JSON.stringify(loggedInUser));

      // Update user status to online
      await updateDoc(doc(db, 'users', loggedInUser.id), {
        onlineStatus: 'online',
      });
      
      // Add to activeUsers/<userType>/<userId>
await setDoc(doc(db, 'activeUsers', loggedInUser.userType, 'list', loggedInUser.id), {
  id: loggedInUser.id,
  username: loggedInUser.username,
  email: loggedInUser.email,
  userType: loggedInUser.userType,
  status: 'online',
});

    } else {
      setError('User not found.');
    }
  } catch (err: any) {
    console.error(err);
    setError(err.message || 'Login failed. Please try again.');
  } finally {
    setIsLoading(false);
  }
};


  // Signup function
  const signup = async (username: string, email: string, password: string, userType: UserType) => {
  setIsLoading(true);
  setError(null);
  try {
    const newUser = await authService.signup({ username, email, password, userType });
    
    // Save user data without token
    setUser({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      userType: newUser.userType,
    });
    localStorage.setItem('apmc_user', JSON.stringify(newUser));
  } catch (err: any) {
    console.error(err);
    setError(err.message || 'Signup failed. Please try again.');
  } finally {
    setIsLoading(false);
  }
};


  // Logout function with status update
  const logout = async () => {
    if (user) {
      // Set user status to offline when logging out
      await updateDoc(doc(db, 'users', user.id), {
        onlineStatus: 'offline',
      });
    }

    // Remove from activeUsers/<userType>/<userId>
await deleteDoc(doc(db, 'activeUsers', user.userType, 'list', user.id));


    await authService.logout();
    setUser(null);
    localStorage.removeItem('apmc_user');
  };

  // Update user preferences (if any)
  const updateUserPreferences = (preferences: object) => {
    if (user) {
      const updatedUser = { ...user, preferences };
      setUser(updatedUser);
      localStorage.setItem('apmc_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading, error, updateUserPreferences }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
