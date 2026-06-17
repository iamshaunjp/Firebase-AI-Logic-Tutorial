import { FieldValue, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'

// Document — what you read from Firestore (after conversion)
export interface User {
  id: string // Firebase Auth UID
  email: string
  displayName: string | null
  createdAt: Date
}

// Create Input — what you pass to setDoc on first sign-up
export interface CreateUserInput {
  email: string
  displayName: string | null
  createdAt: FieldValue // serverTimestamp()
}

// Update Input — partial fields for updateDoc
export interface UpdateUserInput {
  email?: string
  displayName?: string | null
}

export const userConverter = {
  toFirestore: (data: Partial<User>): DocumentData => data,

  fromFirestore: (snapshot: QueryDocumentSnapshot): User => ({
    id: snapshot.id,
    ...snapshot.data(),
    createdAt: snapshot.data().createdAt?.toDate(),
  } as User),
}
