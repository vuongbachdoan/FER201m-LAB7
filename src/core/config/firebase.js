import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';

const firebaseConfig = {
   apiKey: 'AIzaSyAWiRdVFvqPwQjq-CQfSfqMivkektY7tUk',
   authDomain: 'fer201-15ba6.firebaseapp.com',
   projectId: 'fer201-15ba6',
   storageBucket: 'fer201-15ba6.appspot.com',
   messagingSenderId: '979887904550',
   appId: '1:979887904550:web:8fba103d2275399ba5d3e7',
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();