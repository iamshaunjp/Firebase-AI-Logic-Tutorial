"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import styles from "@/app/dashboard/Dashboard.module.css";

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const email = user?.email ?? "";
  const isJournalActive = pathname.startsWith("/dashboard/journal");
  const isPersonalitiesActive = pathname.startsWith("/dashboard/personalities");

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarLogoArea}>
        <Logo variant="light" />
      </div>

      <div className={styles.sidebarCtaArea}>
        <Button href="/dashboard/create" variant="primary" size="sm" fullWidth>
          Write today
        </Button>
      </div>

      <nav className={styles.navSection}>
        <p className={styles.navSectionLabel}>Journal</p>
        <Link
          href="/dashboard/journal"
          className={`${styles.navItem} ${isJournalActive ? styles.navItemActive : ""}`}
        >
          <span className={styles.navItemLabel}>Entries</span>
        </Link>
        <Link
          href="/dashboard/personalities"
          className={`${styles.navItem} ${isPersonalitiesActive ? styles.navItemActive : ""}`}
        >
          <span className={styles.navItemLabel}>Personalities</span>
        </Link>
      </nav>

      <div className={styles.sidebarUser}>
        <Avatar name={email} size="sm" />
        <div className={styles.userInfo}>
          <p className={styles.userEmail}>{email}</p>
          <button
            className={styles.logoutButton}
            onClick={() => signOut(auth)}
          >
            Log out
          </button>
        </div>
      </div>
    </aside>
  );
}
