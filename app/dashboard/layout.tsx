'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { EntriesProvider } from '@/context/EntriesProvider'
import { Sidebar } from '@/components/dashboard/Sidebar'
import styles from './Dashboard.module.css'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) router.replace('/auth/login')
  }, [user, loading, router])

  if (loading) {
    return (
      <div className={styles.layout}>
        <Sidebar />
        <main className={styles.main}>
          <div className={styles.mainInner} />
        </main>
      </div>
    )
  }

  if (!user) return null

  return (
    <EntriesProvider>
      <div className={styles.layout}>
        <Sidebar />
        <main className={styles.main}>
          <div className={styles.mainInner}>{children}</div>
        </main>
      </div>
    </EntriesProvider>
  )
}
