"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, onSnapshot } from "firebase/firestore";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import type { Entry } from "@/types/firestore";
import { COLLECTIONS, entryConverter } from "@/types/firestore";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/format";
import styles from "@/app/dashboard/Dashboard.module.css";

export default function EntryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [entry, setEntry] = useState<Entry | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!user || !id) return;
    const ref = doc(db, COLLECTIONS.ENTRIES, id).withConverter(entryConverter);
    const unsubscribe = onSnapshot(
      ref,
      (snap) => {
        if (!snap.exists() || snap.data().userId !== user.uid) {
          setNotFound(true);
        } else {
          setEntry(snap.data());
        }
        setLoading(false);
      },
      () => {
        setNotFound(true);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, [user, id]);

  if (loading) {
    return <p className={styles.pageSubtitle}>Loading…</p>;
  }

  if (notFound || !entry) {
    return (
      <>
        <Link href="/dashboard/journal" className={styles.backButton}>
          ← All entries
        </Link>
        <p className={styles.pageSubtitle}>Entry not found.</p>
      </>
    );
  }

  return (
    <>
      <Link href="/dashboard/journal" className={styles.backButton}>
        ← All entries
      </Link>

      <div className={styles.detailMeta}>
        <span className={styles.detailDate}>{formatDate(entry.createdAt)}</span>
        {entry.tags.map((tag) => (
          <Badge key={tag} variant="secondary" size="xs">{tag}</Badge>
        ))}
      </div>

      <h1 className={styles.glorifiedTitle}>{entry.title}</h1>

      {entry.glorified
        ? <p className={styles.glorifiedBody}>{entry.glorified}</p>
        : <p className={styles.glorifiedBody}><em>Glorifying…</em></p>
      }

      <div className={styles.divider}>
        <div className={styles.dividerLine} />
        <span className={styles.dividerLabel}>Your original entry</span>
        <div className={styles.dividerLine} />
      </div>

      <div className={styles.originalBox}>
        <p className={styles.originalTitle}>{entry.title}</p>
        <p className={styles.originalBody}>{entry.original}</p>
      </div>
    </>
  );
}
