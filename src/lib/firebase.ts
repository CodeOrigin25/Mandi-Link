// src/lib/firebase.ts

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// 🔒 Replace the below config with your actual Firebase project's config
const firebaseConfig = {
  apiKey: 'AIzaSyAIuaYHBB_ZYyUzx1YAMaUZrlBJCdPtnrw',
  authDomain: 'mandilink-2-0.firebaseapp.com',
  projectId: 'mandilink-2-0',
  storageBucket: 'mandilink-2-0.firebasestorage.app',
  messagingSenderId: '434798753826',
  appId: '1:434798753826:web:07aa54e0ecfa9b3ce8327b',
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
