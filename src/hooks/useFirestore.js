import { useState, useEffect, useCallback } from 'react'
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  limit,
  serverTimestamp,
  onSnapshot,
} from 'firebase/firestore'
import { db } from '@/services/firebase'

export const useFirestore = (collectionName) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(
    async (constraints = []) => {
      setLoading(true)
      setError(null)
      try {
        const q = query(collection(db, collectionName), ...constraints)
        const snapshot = await getDocs(q)
        const results = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }))
        setData(results)
        return results
      } catch (err) {
        setError(err.message)
        return []
      } finally {
        setLoading(false)
      }
    },
    [collectionName]
  )

  const getById = useCallback(
    async (id) => {
      try {
        const docRef = doc(db, collectionName, id)
        const snapshot = await getDoc(docRef)
        if (!snapshot.exists()) return null
        return { id: snapshot.id, ...snapshot.data() }
      } catch (err) {
        setError(err.message)
        return null
      }
    },
    [collectionName]
  )

  const add = useCallback(
    async (docData) => {
      const docRef = await addDoc(collection(db, collectionName), {
        ...docData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
      return docRef.id
    },
    [collectionName]
  )

  const update = useCallback(
    async (id, docData) => {
      const docRef = doc(db, collectionName, id)
      await updateDoc(docRef, {
        ...docData,
        updatedAt: serverTimestamp(),
      })
    },
    [collectionName]
  )

  const remove = useCallback(
    async (id) => {
      await deleteDoc(doc(db, collectionName, id))
    },
    [collectionName]
  )

  const subscribe = useCallback(
    (constraints = [], callback) => {
      const q = query(collection(db, collectionName), ...constraints)
      return onSnapshot(q, (snapshot) => {
        const results = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }))
        setData(results)
        if (callback) callback(results)
      })
    },
    [collectionName]
  )

  return {
    data,
    loading,
    error,
    fetchData,
    getById,
    add,
    update,
    remove,
    subscribe,
  }
}
