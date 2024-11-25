import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA-JWtlbXlGfT0rcsUJVXldi40p4ARHNJk',
  authDomain: 'nice-gadgets-75d92.firebaseapp.com',
  projectId: 'nice-gadgets-75d92',
  storageBucket: 'nice-gadgets-75d92.firebasestorage.app',
  messagingSenderId: '787451863122',
  appId: '1:787451863122:web:6727a6212044106d3b7f8b',
  measurementId: 'G-PVR54S63LW',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
