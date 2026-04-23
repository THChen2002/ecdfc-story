import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './firebase'

const COLLECTION = 'teamMembers'

export const getTeamMembers = async (filters = {}) => {
  let q
  if (filters.visible !== undefined) {
    q = query(
      collection(db, COLLECTION),
      where('visible', '==', filters.visible)
    )
  } else {
    q = query(collection(db, COLLECTION))
  }
  const snapshot = await getDocs(q)
  const results = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
  results.sort((a, b) => (a.order || 0) - (b.order || 0))
  return results
}

export const getTeamMemberById = async (id) => {
  const snapshot = await getDoc(doc(db, COLLECTION, id))
  if (!snapshot.exists()) return null
  return { id: snapshot.id, ...snapshot.data() }
}

export const createTeamMember = async (data) => {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return docRef.id
}

export const updateTeamMember = async (id, data) => {
  const docRef = doc(db, COLLECTION, id)
  await updateDoc(docRef, { ...data, updatedAt: serverTimestamp() })
}

export const deleteTeamMember = async (id) => {
  await deleteDoc(doc(db, COLLECTION, id))
}
