'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { Logo } from '@/components/Logo'
import styles from './Auth.module.css'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) router.replace('/dashboard/journal')
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="landing-page">
        <div className="landing-spine" aria-hidden="true" />
      </div>
    )
  }

  if (user) return null

  return (
    <div className="landing-page">
      <div className="landing-spine" aria-hidden="true" />
      <nav className="landing-nav">
        <Logo />
      </nav>
      <main className={styles.main}>{children}</main>
    </div>
  )
}
