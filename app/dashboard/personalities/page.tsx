"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PERSONALITIES } from "@/lib/personalities";
import styles from "@/app/dashboard/Dashboard.module.css";
import { model } from "@/lib/firebase";

export default function PersonalitiesPage() {
  const [input, setInput] = useState("");
  const [personality, setPersonality] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setLoading(true);
    
    // make a prompt
    const prompt = `
      You are a ${personality}.
      Rewrite the following text to match your persona: ${input}
      Return only the rewritten text, no explanations or preamble.
    `

    // send prompt and await result
    const result = await model.generateContent(prompt);

    // get the response text
    setResult(result.response.text());

    setLoading(false);
  }

  const canSubmit = input.trim() !== "" && personality !== "";

  return (
    <>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Personalities</h1>
          <p className={styles.pageSubtitle}>Test how each personality transforms your text.</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className={styles.createForm}>
        <Textarea
          label="Your text"
          rows={6}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
          disabled={loading}
        />

        <div className={styles.formField}>
          <label htmlFor="personality" className={styles.fieldLabel}>Personality</label>
          <select
            id="personality"
            className={styles.select}
            value={personality}
            onChange={(e) => setPersonality(e.target.value)}
            required
            disabled={loading}
          >
            {PERSONALITIES.map((p) => (
              <option key={p.value} value={p.value} disabled={p.value === ""}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formActions}>
          <Button type="submit" variant="primary" size="md" disabled={loading || !canSubmit}>
            {loading ? "Thinking…" : "Test personality"}
          </Button>
        </div>
      </form>

      {result && (
        <div className={styles.resultArea}>
          <Card variant="warm" padding="md">
            <h3 className="text-bold text-2xl">{result}</h3>
            <p className={styles.glorifiedBody}>{result}</p>
          </Card>
        </div>
      )}
    </>
  );
}
