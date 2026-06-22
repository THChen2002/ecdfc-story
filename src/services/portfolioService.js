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
import { toAcademicYear } from '@/utils/academicYear'

const COLLECTION = 'portfolios'

export const getPortfolios = async (filters = {}) => {
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
  let results = snapshot.docs.map((d) => {
    const data = d.data()
    return { id: d.id, ...data, year: toAcademicYear(data.year) }
  })
  if (filters.category && filters.category !== 'all') {
    results = results.filter((item) => item.category === filters.category)
  }
  results.sort((a, b) => (a.order || 0) - (b.order || 0))
  if (filters.limit) {
    results = results.slice(0, filters.limit)
  }
  return results
}

export const getPortfolioById = async (id) => {
  const docRef = doc(db, COLLECTION, id)
  const snapshot = await getDoc(docRef)
  if (!snapshot.exists()) return null
  const data = snapshot.data()
  return { id: snapshot.id, ...data, year: toAcademicYear(data.year) }
}

export const createPortfolio = async (data) => {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return docRef.id
}

export const updatePortfolio = async (id, data) => {
  const docRef = doc(db, COLLECTION, id)
  await updateDoc(docRef, { ...data, updatedAt: serverTimestamp() })
}

export const deletePortfolio = async (id) => {
  await deleteDoc(doc(db, COLLECTION, id))
}
