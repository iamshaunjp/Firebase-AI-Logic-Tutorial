import { FieldValue, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'

// Document — what you read from Firestore (after conversion)
export interface Entry {
  id: string
  userId: string
  createdAt: Date
  tags: string[]
  personality: string
  title: string
  original: string
  glorified: string
}

// Create Input — what you pass to addDoc
export interface CreateEntryInput {
  userId: string
  createdAt: FieldValue // serverTimestamp()
  tags: string[]
  personality: string
  title: string
  original: string
  glorified: string
}

// Update Input — partial fields for updateDoc
export interface UpdateEntryInput {
  tags?: string[]
  personality?: string
  title?: string
  original?: string
  glorified?: string
}

export const entryConverter = {
  toFirestore: (data: Entry): DocumentData => data,

  fromFirestore: (snapshot: QueryDocumentSnapshot): Entry => ({
    id: snapshot.id,
    ...snapshot.data(),
    createdAt: snapshot.data().createdAt?.toDate(),
  } as Entry),
}
