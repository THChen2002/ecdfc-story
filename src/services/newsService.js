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
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './firebase'

const COLLECTION = 'news'

export const getNewsList = async (filters = {}) => {
  let q
  if (filters.published !== undefined) {
    q = query(
      collection(db, COLLECTION),
      where('published', '==', filters.published)
    )
  } else {
    q = query(collection(db, COLLECTION))
  }
  const snapshot = await getDocs(q)
  let results = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
  if (filters.category && filters.category !== 'all') {
    results = results.filter((item) => item.category === filters.category)
  }
  if (filters.pinned !== undefined) {
    results = results.filter((item) => item.pinned === filters.pinned)
  }
  results.sort((a, b) => {
    const dateA = a.publishDate?.toDate?.() || new Date(0)
    const dateB = b.publishDate?.toDate?.() || new Date(0)
    return dateB - dateA
  })
  if (filters.limit) {
    results = results.slice(0, filters.limit)
  }
  return results
}

export const getNewsById = async (id) => {
  const docRef = doc(db, COLLECTION, id)
  const snapshot = await getDoc(docRef)
  if (!snapshot.exists()) return null
  return { id: snapshot.id, ...snapshot.data() }
}

export const createNews = async (data) => {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return docRef.id
}

export const updateNews = async (id, data) => {
  const docRef = doc(db, COLLECTION, id)
  await updateDoc(docRef, { ...data, updatedAt: serverTimestamp() })
}

export const deleteNews = async (id) => {
  await deleteDoc(doc(db, COLLECTION, id))
}
