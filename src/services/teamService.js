import {
  collection,
  getDocs,
  query,
  where,
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
