"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import type { CreateEntryInput } from "@/types/firestore";
import { COLLECTIONS } from "@/types/firestore";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { PERSONALITIES } from "@/lib/personalities";
import styles from "@/app/dashboard/Dashboard.module.css";

const MAX_TAGS = 3;

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [personality, setPersonality] = useState("");
  const [tagFocused, setTagFocused] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const tagInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { user } = useAuth();

  function addTag(raw: string) {
    const value = raw.trim().toLowerCase();
    if (!value) return;
    if (tags.length >= MAX_TAGS) return;
    if (tags.includes(value)) {
      setTagInput("");
      return;
    }
    setTags((prev) => [...prev, value]);
    setTagInput("");
  }

  function removeTag(tag: string) {
    setTags((prev) => prev.filter((t) => t !== tag));
  }

  function handleTagKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "," || e.key === "Enter") {
      e.preventDefault();
      addTag(tagInput);
    } else if (e.key === "Backspace" && tagInput === "" && tags.length > 0) {
      setTags((prev) => prev.slice(0, -1));
    }
  }

  function handleTagInputChange(value: string) {
    if (value.includes(",")) {
      const parts = value.split(",");
      parts.slice(0, -1).forEach((p) => addTag(p));
      setTagInput(parts[parts.length - 1]);
    } else {
      setTagInput(value);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;

    setSubmitError("");
    setSubmitting(true);
    try {
      const data: CreateEntryInput = {
        userId: user.uid,
        createdAt: serverTimestamp(),
        tags,
        personality,
        title,
        original: body,
        glorified: "",
      };
      await addDoc(collection(db, COLLECTIONS.ENTRIES), data);
      router.push("/dashboard/journal");
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const atTagLimit = tags.length >= MAX_TAGS;

  return (
    <>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>New entry</h1>
          <p className={styles.pageSubtitle}>What happened today?</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className={styles.createForm}>
        <Input
          label="Title"
          placeholder="Give today a headline…"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={submitting}
        />

        <Textarea
          label="Entry"
          rows={8}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          disabled={submitting}
        />

        {/* Tags */}
        <div className={styles.formField}>
          <label className={styles.fieldLabel}>Tags</label>
          <div
            className={[
              styles.tagArea,
              tagFocused ? styles.tagAreaFocused : "",
              atTagLimit ? styles.tagAreaDisabled : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => tagInputRef.current?.focus()}
          >
            {tags.map((tag) => (
              <span key={tag} className={styles.tagChip}>
                {tag}
                <button
                  type="button"
                  className={styles.tagChipRemove}
                  onClick={(e) => { e.stopPropagation(); removeTag(tag); }}
                  aria-label={`Remove tag ${tag}`}
                >
                  ×
                </button>
              </span>
            ))}
            {!atTagLimit && (
              <input
                ref={tagInputRef}
                type="text"
                className={styles.tagInput}
                placeholder={tags.length === 0 ? "Type a tag, press comma or Enter…" : "Add another…"}
                value={tagInput}
                onChange={(e) => handleTagInputChange(e.target.value)}
                onKeyDown={handleTagKeyDown}
                onFocus={() => setTagFocused(true)}
                onBlur={() => { setTagFocused(false); addTag(tagInput); }}
                disabled={submitting}
              />
            )}
          </div>
          <p className={styles.fieldHint}>
            {atTagLimit ? "Maximum 3 tags reached." : `Up to ${MAX_TAGS} tags. Comma or Enter to add.`}
          </p>
        </div>

        {/* Personality */}
        <div className={styles.formField}>
          <label htmlFor="personality" className={styles.fieldLabel}>Personality</label>
          <select
            id="personality"
            className={styles.select}
            value={personality}
            onChange={(e) => setPersonality(e.target.value)}
            required
            disabled={submitting}
          >
            {PERSONALITIES.map((p) => (
              <option key={p.value} value={p.value} disabled={p.value === ""}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formActions}>
          {submitError && <p className={styles.fieldError}>{submitError}</p>}
          <Button type="submit" variant="primary" size="md" disabled={submitting}>
            {submitting ? "Saving…" : "Glorify entry"}
          </Button>
          <Button href="/dashboard/journal" variant="outline" size="md">
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
}
