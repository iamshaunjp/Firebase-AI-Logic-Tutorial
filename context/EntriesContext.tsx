import { createContext, useContext } from 'react'
import type { Entry } from '@/types/firestore'

interface EntriesContextValue {
  entries: Entry[]
  loading: boolean
  error: string
}

export const EntriesContext = createContext<EntriesContextValue>({
  entries: [],
  loading: true,
  error: '',
})

export function useEntries() {
  return useContext(EntriesContext)
}
