import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/Logo";

export default function Home() {
  return (
    <div className="landing-page">
      <div className="landing-spine" aria-hidden="true" />

      <nav className="landing-nav">
        <Logo />
      </nav>

      <main className="landing-main">
        <div className="landing-hero">
          <div className="landing-hero-rule" aria-hidden="true" />
          <h1 className="landing-hero-title">
            Your ordinary days,
            <br />
            <em>glorified.</em>
          </h1>
          <p className="landing-hero-body">Write anything — we&apos;ll make it sing.</p>
          <Button href="/auth/signup" className="landing-cta">
            Get started
          </Button>
        </div>
      </main>

      <footer className="landing-footer">
        <p className="landing-footer-copy">&copy; 2026 Chronicle.Me</p>
      </footer>
    </div>
  );
}
