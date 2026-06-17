import Link from "next/link";
import type { Entry } from "@/types/firestore";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { formatDate } from "@/lib/format";
import styles from "@/app/dashboard/Dashboard.module.css";

interface EntryCardProps {
  entry: Entry;
}

export function EntryCard({ entry }: EntryCardProps) {
  return (
    <Link href={`/dashboard/journal/${entry.id}`} className={styles.cardLink}>
      <Card variant="raised" padding="none" clickable>
        <div className={styles.cardInner}>
          <div className={styles.cardMeta}>
            <span className={styles.cardDate}>{formatDate(entry.createdAt)}</span>
          </div>
          <h2 className={styles.cardTitle}>{entry.title}</h2>
          <p className={styles.cardExcerpt}>
            {entry.glorified || <em>Glorifying…</em>}
          </p>
          <div className={styles.cardTags}>
            {entry.tags.map((tag) => (
              <Badge key={tag} variant="secondary" size="xs">{tag}</Badge>
            ))}
          </div>
        </div>
      </Card>
    </Link>
  );
}
