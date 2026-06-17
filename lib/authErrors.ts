import { FirebaseError } from 'firebase/app'

export function getSignupErrorMessage(error: unknown): string {
  if (!(error instanceof FirebaseError)) return 'Something went wrong. Please try again.'
  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'That email is already registered. Try signing in instead.'
    case 'auth/weak-password':
      return 'Password must be at least 6 characters.'
    case 'auth/invalid-email':
      return 'Please enter a valid email address.'
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.'
    default:
      return 'Something went wrong. Please try again.'
  }
}

export function getLoginErrorMessage(_error: unknown): string {
  return 'Credentials not correct.'
}
