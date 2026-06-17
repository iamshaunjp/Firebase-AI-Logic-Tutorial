'use client'

import { useState, useEffect } from 'react'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { useAuth } from '@/context/AuthContext'
import { db } from '@/lib/firebase'
import type { Entry } from '@/types/firestore'
import { COLLECTIONS, entryConverter } from '@/types/firestore'
import { EntriesContext } from './EntriesContext'

export function EntriesProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<Entry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return
    const q = query(
      collection(db, COLLECTIONS.ENTRIES).withConverter(entryConverter),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    )
    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        setEntries(snap.docs.map((d) => d.data()))
        setLoading(false)
      },
      () => {
        setError('Failed to load entries.')
        setLoading(false)
      }
    )
    return unsubscribe
  }, [user])

  return (
    <EntriesContext.Provider value={{ entries, loading, error }}>
      {children}
    </EntriesContext.Provider>
  )
}
