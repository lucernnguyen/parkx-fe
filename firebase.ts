import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDuMCNpRJXs1cdAaQSgXv8Nv7o9ykJjB6U',
  authDomain: 'parkx-22f01.firebaseapp.com',
  projectId: 'parkx-22f01',
  storageBucket: 'parkx-22f01.appspot.com',
  messagingSenderId: '286648231344',
  appId: '1:286648231344:web:a2a5d527b33d9a1e816275',
  measurementId: 'G-9Y5B225T9S',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
