"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getSignupErrorMessage } from "@/lib/authErrors";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import styles from "../Auth.module.css";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleConfirmChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setConfirmPassword(value);
    if (value && value !== password) {
      setConfirmError("Passwords do not match.");
    } else {
      setConfirmError("");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setConfirmError("Passwords do not match.");
      return;
    }
    setFormError("");
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setFormError(getSignupErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.card}>
      <h1 className={styles.title}>Start your journal.</h1>
      <p className={styles.subtitle}>Your ordinary days, glorified.</p>

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
          autoComplete="new-password"
          required
          disabled={loading}
        />
        <Input
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmChange}
          autoComplete="new-password"
          error={confirmError}
          required
          disabled={loading}
        />
        <div className={styles.actions}>
          {formError && <p className={styles.fieldError}>{formError}</p>}
          <Button type="submit" fullWidth disabled={loading || !!confirmError}>
            {loading ? "Creating account…" : "Create account"}
          </Button>
        </div>
      </form>

      <p className={styles.footer}>
        Already have an account?{" "}
        <a href="/auth/login">Sign in</a>
      </p>
    </div>
  );
}
