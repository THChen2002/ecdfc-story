import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyClXJda5tLnNABwNkotKPLl8UvGBZ-KOvs",
  authDomain: "ecdfc-story.firebaseapp.com",
  projectId: "ecdfc-story",
  storageBucket: "ecdfc-story.firebasestorage.app",
  messagingSenderId: "1052801473345",
  appId: "1:1052801473345:web:f9797bedb82a03fef01fc0"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const isConfigured = true
export default app
