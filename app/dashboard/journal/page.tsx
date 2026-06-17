"use client";

import { useEntries } from "@/context/EntriesContext";
import { EntryCard } from "@/components/dashboard/EntryCard";
import { Badge } from "@/components/ui/Badge";
import styles from "@/app/dashboard/Dashboard.module.css";

export default function JournalPage() {
  const { entries, loading, error } = useEntries();

  return (
    <>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Your entries</h1>
          <p className={styles.pageSubtitle}>A record of your ordinary, glorified days.</p>
        </div>
        {!loading && <Badge variant="accent">{entries.length} entries</Badge>}
      </header>

      {loading && (
        <p className={styles.pageSubtitle}>Loading…</p>
      )}

      {!loading && error && (
        <p className={styles.pageSubtitle}>{error}</p>
      )}

      {!loading && !error && entries.length === 0 && (
        <p className={styles.pageSubtitle}>
          No entries yet —{" "}
          <a href="/dashboard/create">write your first one</a>.
        </p>
      )}

      {!loading && !error && entries.length > 0 && (
        <div className={styles.entryList}>
          {entries.map((entry) => (
            <EntryCard key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </>
  );
}
