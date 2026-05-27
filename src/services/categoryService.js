import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  writeBatch,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './firebase'

const COLLECTION = 'portfolio_categories'
const PORTFOLIO_COLLECTION = 'portfolios'

export const getPortfolioCategories = async () => {
  const snapshot = await getDocs(collection(db, COLLECTION))
  const results = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
  results.sort((a, b) => (a.order || 0) - (b.order || 0))
  return results
}

export const createPortfolioCategory = async ({ label, order }) => {
  const docRef = await addDoc(collection(db, COLLECTION), {
    label: label.trim(),
    order: Number(order) || 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return docRef.id
}

export const updatePortfolioCategory = async (id, { label, order }) => {
  await updateDoc(doc(db, COLLECTION, id), {
    label: label.trim(),
    order: Number(order) || 0,
    updatedAt: serverTimestamp(),
  })
}

/**
 * 刪除分類前，把所有引用此分類的成果改為「未分類」（category: ''）。
 * 回傳被影響的成果數量，方便 UI 提示。
 */
export const countPortfoliosUsingCategory = async (id) => {
  const q = query(collection(db, PORTFOLIO_COLLECTION), where('category', '==', id))
  const snap = await getDocs(q)
  return snap.size
}

export const deletePortfolioCategory = async (id) => {
  const q = query(collection(db, PORTFOLIO_COLLECTION), where('category', '==', id))
  const snap = await getDocs(q)
  if (!snap.empty) {
    const batch = writeBatch(db)
    snap.docs.forEach((d) => {
      batch.update(d.ref, { category: '', updatedAt: serverTimestamp() })
    })
    await batch.commit()
  }
  await deleteDoc(doc(db, COLLECTION, id))
  return snap.size
}
