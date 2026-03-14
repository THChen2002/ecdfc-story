import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from './firebase'

const googleProvider = new GoogleAuthProvider()

/**
 * 將使用者資料寫入 Firestore users collection。
 * 使用 merge 確保不會覆蓋既有欄位（如 role）。
 */
const saveUserToFirestore = async (user) => {
  if (!user) return
  const userRef = doc(db, 'users', user.uid)
  await setDoc(userRef, {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || '',
    photoURL: user.photoURL || '',
    lastLoginAt: serverTimestamp(),
  }, { merge: true })
}

/**
 * 從 Firestore 讀取使用者的 role 欄位。
 */
export const getUserRole = async (uid) => {
  const snap = await getDoc(doc(db, 'users', uid))
  return snap.exists() ? (snap.data().role || null) : null
}

export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider)
  await saveUserToFirestore(result.user)
  const role = await getUserRole(result.user.uid)
  return { ...result, role }
}

export const logout = () => signOut(auth)

export const onAuthChange = (callback) =>
  onAuthStateChanged(auth, callback)
