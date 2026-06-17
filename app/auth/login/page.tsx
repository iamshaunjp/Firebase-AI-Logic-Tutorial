"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getLoginErrorMessage } from "@/lib/authErrors";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import styles from "../Auth.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(getLoginErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.card}>
      <h1 className={styles.title}>Welcome back.</h1>
      <p className={styles.subtitle}>Sign in to your journal.</p>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
          disabled={loading}
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
          disabled={loading}
        />
        <div className={styles.actions}>
          {error && <p className={styles.fieldError}>{error}</p>}
          <Button type="submit" fullWidth disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </Button>
        </div>
      </form>

      <p className={styles.footer}>
        Don&apos;t have an account?{" "}
        <a href="/auth/signup">Get started</a>
      </p>
    </div>
  );
}
