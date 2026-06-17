import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Avatar } from "@/components/ui/Avatar";

// ── Helpers ──────────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-xs font-semibold uppercase tracking-caps text-stone-400 mb-6">
      {children}
    </p>
  );
}

function Divider() {
  return <hr className="border-stone-200 my-16" />;
}

// ── Logo mark (inline SVG so CSS vars resolve correctly) ─────────────────────

function LogoMark({ size = 22 }: { size?: number }) {
  const h = Math.round(size * 1.227);
  return (
    <svg width={size} height={h} viewBox="0 0 22 27" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="20" height="25" fill="#FAF7F2" stroke="#A6917A" strokeWidth="1" />
      <rect x="1" y="1" width="3" height="25" fill="#D97757" />
      <line x1="6.5" y1="8" x2="18" y2="8" stroke="#C9B9A5" strokeWidth="0.75" />
      <line x1="6.5" y1="13" x2="18" y2="13" stroke="#C9B9A5" strokeWidth="0.75" />
      <line x1="6.5" y1="18" x2="18" y2="18" stroke="#C9B9A5" strokeWidth="0.75" />
      <line x1="6.5" y1="22" x2="14" y2="22" stroke="#D97757" strokeWidth="1" />
    </svg>
  );
}

// ── Color swatch ─────────────────────────────────────────────────────────────

interface SwatchProps {
  bgClass: string;
  hex: string;
  name: string;
  light?: boolean;
}

function Swatch({ bgClass, hex, name, light = false }: SwatchProps) {
  return (
    <div className="flex flex-col gap-1 min-w-0">
      <div className={`h-12 rounded-none ${bgClass}`} />
      <div className={`font-sans text-[9px] font-semibold uppercase tracking-wider ${light ? "text-stone-400" : "text-stone-600"}`}>
        {name}
      </div>
      <div className="font-mono text-[9px] text-stone-400">{hex}</div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function PreviewPage() {
  return (
    <div className="min-h-screen bg-stone-50">

      {/* ── Header ─────────────────────────────────────────────────── */}
      <header className="bg-white border-b border-stone-200">
        <div className="max-w-300 mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LogoMark size={24} />
            <div>
              <div className="font-sans font-extrabold text-[13px] text-stone-900 leading-none tracking-tight">
                Chronicle
              </div>
              <div className="font-serif italic text-[10px] text-orange-500 mt-0.75 tracking-wide">
                .Me
              </div>
            </div>
          </div>
          <span className="font-sans text-xs font-semibold uppercase tracking-caps text-stone-400">
            Design System Preview
          </span>
        </div>
      </header>

      <main className="max-w-300 mx-auto px-8 py-12">

        {/* ── COLOUR PALETTE ─────────────────────────────────────── */}
        <SectionLabel>Color palette</SectionLabel>

        <div className="space-y-8">
          {/* Orange */}
          <div>
            <p className="font-sans text-xs font-medium text-stone-500 mb-3">Orange — primary accent</p>
            <div className="grid grid-cols-10 gap-2">
              <Swatch bgClass="bg-orange-50"  hex="#FFF2EC" name="50"  />
              <Swatch bgClass="bg-orange-100" hex="#FFD9C2" name="100" />
              <Swatch bgClass="bg-orange-200" hex="#FFBC97" name="200" />
              <Swatch bgClass="bg-orange-300" hex="#F59F6E" name="300" />
              <Swatch bgClass="bg-orange-400" hex="#E88050" name="400" />
              <Swatch bgClass="bg-orange-500" hex="#D97757" name="500" light />
              <Swatch bgClass="bg-orange-600" hex="#BF5F36" name="600" light />
              <Swatch bgClass="bg-orange-700" hex="#9C4B23" name="700" light />
              <Swatch bgClass="bg-orange-800" hex="#773714" name="800" light />
              <Swatch bgClass="bg-orange-900" hex="#4D2208" name="900" light />
            </div>
          </div>

          {/* Green */}
          <div>
            <p className="font-sans text-xs font-medium text-stone-500 mb-3">Slate green — secondary</p>
            <div className="grid grid-cols-10 gap-2">
              <Swatch bgClass="bg-green-50"  hex="#EEF4EF" name="50"  />
              <Swatch bgClass="bg-green-100" hex="#D2E5D4" name="100" />
              <Swatch bgClass="bg-green-200" hex="#AACBAE" name="200" />
              <Swatch bgClass="bg-green-300" hex="#7DAD83" name="300" />
              <Swatch bgClass="bg-green-400" hex="#5A8D61" name="400" />
              <Swatch bgClass="bg-green-500" hex="#4A6B4E" name="500" light />
              <Swatch bgClass="bg-green-600" hex="#385338" name="600" light />
              <Swatch bgClass="bg-green-700" hex="#283C29" name="700" light />
              <Swatch bgClass="bg-green-800" hex="#19261A" name="800" light />
              <Swatch bgClass="bg-green-900" hex="#0D150E" name="900" light />
            </div>
          </div>

          {/* Stone */}
          <div>
            <p className="font-sans text-xs font-medium text-stone-500 mb-3">Stone — earthy neutrals</p>
            <div className="grid grid-cols-10 gap-2">
              <Swatch bgClass="bg-stone-50"  hex="#FAF7F2" name="50"  />
              <Swatch bgClass="bg-stone-100" hex="#F2EBE0" name="100" />
              <Swatch bgClass="bg-stone-200" hex="#E4D8C8" name="200" />
              <Swatch bgClass="bg-stone-300" hex="#C9B9A5" name="300" />
              <Swatch bgClass="bg-stone-400" hex="#A6917A" name="400" />
              <Swatch bgClass="bg-stone-500" hex="#887460" name="500" light />
              <Swatch bgClass="bg-stone-600" hex="#6C5B47" name="600" light />
              <Swatch bgClass="bg-stone-700" hex="#504333" name="700" light />
              <Swatch bgClass="bg-stone-800" hex="#352C21" name="800" light />
              <Swatch bgClass="bg-stone-900" hex="#1E1811" name="900" light />
            </div>
          </div>

          {/* Semantic */}
          <div>
            <p className="font-sans text-xs font-medium text-stone-500 mb-3">Semantic</p>
            <div className="flex flex-wrap gap-3">
              {[
                { bg: "bg-[var(--color-bg)]",               label: "bg",               border: true },
                { bg: "bg-[var(--color-surface)]",          label: "surface",          border: true },
                { bg: "bg-[var(--color-surface-warm)]",     label: "surface-warm",     border: true },
                { bg: "bg-[var(--color-accent)]",           label: "accent" },
                { bg: "bg-[var(--color-accent-hover)]",     label: "accent-hover" },
                { bg: "bg-[var(--color-accent-subtle)]",    label: "accent-subtle",    border: true },
                { bg: "bg-[var(--color-secondary)]",        label: "secondary" },
                { bg: "bg-[var(--color-secondary-subtle)]", label: "secondary-subtle", border: true },
                { bg: "bg-[var(--color-sidebar-bg)]",       label: "sidebar-bg" },
                { bg: "bg-error",                           label: "error" },
              ].map(({ bg, label, border }) => (
                <div key={label} className="flex flex-col gap-1" style={{ width: 80 }}>
                  <div className={`h-8 rounded-none ${bg} ${border ? "border border-stone-200" : ""}`} />
                  <div className="font-mono text-[8px] text-stone-500 truncate">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Divider />

        {/* ── TYPOGRAPHY ─────────────────────────────────────────── */}
        <SectionLabel>Typography</SectionLabel>

        <div className="space-y-10">
          {/* Raleway headings */}
          <div className="space-y-3">
            <p className="font-sans text-xs font-medium text-stone-400 uppercase tracking-caps mb-4">Raleway — headings & UI</p>
            <div className="font-sans text-[3rem] font-black leading-tight tracking-tight text-stone-900">
              Display — Raleway Black
            </div>
            <div className="font-sans text-[2.25rem] font-bold leading-tight text-stone-900">
              H1 — Write your story
            </div>
            <div className="font-sans text-[1.875rem] font-bold leading-snug text-stone-900">
              H2 — Every moment is worth remembering
            </div>
            <div className="font-sans text-[1.5rem] font-semibold leading-snug text-stone-900">
              H3 — Your glorified entry
            </div>
            <div className="font-sans text-[1.25rem] font-semibold leading-normal text-stone-900">
              H4 — Making it shine
            </div>
          </div>

          {/* Label style */}
          <div>
            <p className="font-sans text-xs font-medium text-stone-400 uppercase tracking-caps mb-4">Label style</p>
            <div className="flex flex-wrap gap-6 items-center">
              <span className="font-sans text-xs font-semibold uppercase tracking-caps text-stone-600">
                Label — uppercase raleway
              </span>
              <span className="font-sans text-xs font-semibold uppercase tracking-caps text-orange-500">
                Active label
              </span>
              <span className="font-sans text-xs font-semibold uppercase tracking-caps text-stone-400">
                Muted label
              </span>
            </div>
          </div>

          {/* Merriweather body */}
          <div>
            <p className="font-sans text-xs font-medium text-stone-400 uppercase tracking-caps mb-4">Merriweather — body & prose</p>
            <div className="max-w-[62ch] space-y-4">
              <p className="font-serif text-base leading-relaxed text-stone-900">
                Body text — Today was one of those days that slips by without ceremony, yet somehow felt full. I walked to the corner shop twice, forgot what I needed the second time, and spent twenty minutes watching pigeons on the fire escape.
              </p>
              <p className="font-serif text-lg leading-diary text-stone-900">
                Entry prose — The late-afternoon light came in at an angle I rarely notice, golden and slightly dusty, and I thought: this is what I'll forget first. The exact colour of it. The way the mug felt warm between my palms. The silence that wasn't quite silent.
              </p>
              <p className="font-serif text-lg italic leading-diary text-stone-600">
                Italic prose — "We transformed it" — the brand's one promise, worn lightly, like a knowing smile from a friend who also happens to be a great editor.
              </p>
            </div>
          </div>
        </div>

        <Divider />

        {/* ── BUTTONS ─────────────────────────────────────────────── */}
        <SectionLabel>Buttons</SectionLabel>

        <div className="space-y-6">
          {/* All variants — md */}
          <div>
            <p className="font-sans text-[10px] text-stone-400 uppercase tracking-wider mb-3">Variants — md</p>
            <div className="flex flex-wrap gap-3 items-center">
              <Button variant="primary">Write today</Button>
              <Button variant="secondary">Browse themes</Button>
              <Button variant="ghost">Cancel</Button>
              <Button variant="outline">Options</Button>
              <Button variant="subtle">More</Button>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <p className="font-sans text-[10px] text-stone-400 uppercase tracking-wider mb-3">Sizes</p>
            <div className="flex flex-wrap gap-3 items-center">
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
              <Button variant="secondary" size="sm">Small</Button>
              <Button variant="secondary" size="md">Medium</Button>
              <Button variant="secondary" size="lg">Large</Button>
            </div>
          </div>

          {/* States */}
          <div>
            <p className="font-sans text-[10px] text-stone-400 uppercase tracking-wider mb-3">States</p>
            <div className="flex flex-wrap gap-3 items-center">
              <Button variant="primary" disabled>Making it shine…</Button>
              <Button variant="ghost" disabled>Disabled ghost</Button>
              <Button variant="outline" disabled>Disabled outline</Button>
            </div>
          </div>

          {/* Full width */}
          <div className="max-w-xs">
            <p className="font-sans text-[10px] text-stone-400 uppercase tracking-wider mb-3">Full width</p>
            <Button variant="primary" fullWidth>Glorify this entry</Button>
          </div>
        </div>

        <Divider />

        {/* ── BADGES ──────────────────────────────────────────────── */}
        <SectionLabel>Badges</SectionLabel>

        <div className="space-y-6">
          <div>
            <p className="font-sans text-[10px] text-stone-400 uppercase tracking-wider mb-3">Variants — sm</p>
            <div className="flex flex-wrap gap-3 items-center">
              <Badge variant="default">Default</Badge>
              <Badge variant="orange">Orange</Badge>
              <Badge variant="green">Green</Badge>
              <Badge variant="accent">Accent</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="dark">Dark</Badge>
            </div>
          </div>

          <div>
            <p className="font-sans text-[10px] text-stone-400 uppercase tracking-wider mb-3">Sizes</p>
            <div className="flex flex-wrap gap-3 items-center">
              <Badge variant="orange" size="xs">xs — Glorified</Badge>
              <Badge variant="orange" size="sm">sm — Glorified</Badge>
              <Badge variant="orange" size="md">md — Glorified</Badge>
              <Badge variant="green" size="xs">xs — Reflective</Badge>
              <Badge variant="green" size="sm">sm — Reflective</Badge>
              <Badge variant="green" size="md">md — Reflective</Badge>
            </div>
          </div>

          <div>
            <p className="font-sans text-[10px] text-stone-400 uppercase tracking-wider mb-3">In context</p>
            <div className="flex flex-wrap gap-2 items-center">
              <Badge variant="accent">Adventure</Badge>
              <Badge variant="secondary">Calm</Badge>
              <Badge variant="default">Personal</Badge>
              <Badge variant="orange">New</Badge>
              <Badge variant="dark">Archive</Badge>
              <Badge variant="outline">Draft</Badge>
            </div>
          </div>
        </div>

        <Divider />

        {/* ── CARDS ───────────────────────────────────────────────── */}
        <SectionLabel>Cards</SectionLabel>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          <Card variant="default" padding="md">
            <Badge variant="accent" className="mb-3">Adventure</Badge>
            <h3 className="font-sans text-base font-semibold text-stone-900 mb-2">
              Default card
            </h3>
            <p className="font-serif text-sm leading-relaxed text-stone-600">
              White background, 1px stone-200 border. The standard entry container.
            </p>
          </Card>

          <Card variant="raised" padding="md">
            <Badge variant="secondary" className="mb-3">Calm</Badge>
            <h3 className="font-sans text-base font-semibold text-stone-900 mb-2">
              Raised card
            </h3>
            <p className="font-serif text-sm leading-relaxed text-stone-600">
              White with a warm shadow beneath — elevates the card above the page surface.
            </p>
          </Card>

          <Card variant="warm" padding="md">
            <Badge variant="default" className="mb-3">Personal</Badge>
            <h3 className="font-sans text-base font-semibold text-stone-900 mb-2">
              Warm card
            </h3>
            <p className="font-serif text-sm leading-relaxed text-stone-600">
              Stone-100 background — slightly recessed sections, alternate surfaces.
            </p>
          </Card>

          <Card variant="bordered" padding="md">
            <Badge variant="orange" className="mb-3">Glorified</Badge>
            <h3 className="font-sans text-base font-semibold text-stone-900 mb-2">
              Bordered card
            </h3>
            <p className="font-serif text-sm leading-relaxed text-stone-600">
              2px stone-300 border — stronger visual frame for featured content.
            </p>
          </Card>

          <Card variant="dark" padding="md">
            <Badge variant="dark" className="mb-3">Dark theme</Badge>
            <h3 className="font-sans text-base font-semibold text-stone-100 mb-2">
              Dark card
            </h3>
            <p className="font-serif text-sm leading-relaxed text-stone-300">
              Stone-900 background — sidebar chrome, inverted surfaces. Ink-brown, not pure black.
            </p>
          </Card>

          <Card variant="raised" padding="md" clickable>
            <Badge variant="accent" className="mb-3">Clickable</Badge>
            <h3 className="font-sans text-base font-semibold text-stone-900 mb-2">
              Clickable card
            </h3>
            <p className="font-serif text-sm leading-relaxed text-stone-600">
              Hover to see shadow elevation and border darken. No scale transform — editorial gravity.
            </p>
          </Card>
        </div>

        <Divider />

        {/* ── INPUTS & TEXTAREA ───────────────────────────────────── */}
        <SectionLabel>Form inputs</SectionLabel>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">

          <Input
            label="Your name"
            placeholder="Alex Reed"
            hint="Used in your glorified entries"
          />

          <Input
            label="Email"
            placeholder="alex@example.com"
            type="email"
            error="Please enter a valid email address"
          />

          <Input
            label="Disabled field"
            placeholder="Cannot edit"
            disabled
            defaultValue="Locked value"
          />

          <Input
            label="Date"
            type="date"
            inputSize="sm"
            hint="Small size variant"
          />

          <div className="md:col-span-2">
            <Textarea
              label="Today's entry"
              placeholder="What happened today? Don't worry about how it sounds."
              rows={5}
            />
          </div>

          <div className="md:col-span-2">
            <Textarea
              label="Entry with error"
              error="Entry must be at least 20 characters"
              defaultValue="Too short"
              rows={3}
            />
          </div>

        </div>

        <Divider />

        {/* ── AVATARS ─────────────────────────────────────────────── */}
        <SectionLabel>Avatars</SectionLabel>

        <div className="space-y-8">

          <div>
            <p className="font-sans text-[10px] text-stone-400 uppercase tracking-wider mb-4">Sizes — initials fallback</p>
            <div className="flex flex-wrap gap-4 items-end">
              <div className="flex flex-col items-center gap-2">
                <Avatar name="Alex Reed" size="xs" />
                <span className="font-sans text-[9px] text-stone-400">xs — 24px</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Avatar name="Alex Reed" size="sm" />
                <span className="font-sans text-[9px] text-stone-400">sm — 32px</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Avatar name="Alex Reed" size="md" />
                <span className="font-sans text-[9px] text-stone-400">md — 40px</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Avatar name="Alex Reed" size="lg" />
                <span className="font-sans text-[9px] text-stone-400">lg — 56px</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Avatar name="Alex Reed" size="xl" />
                <span className="font-sans text-[9px] text-stone-400">xl — 80px</span>
              </div>
            </div>
          </div>

          <div>
            <p className="font-sans text-[10px] text-stone-400 uppercase tracking-wider mb-4">Deterministic warm hues</p>
            <div className="flex flex-wrap gap-3 items-center">
              <Avatar name="Alex Reed" size="md" />
              <Avatar name="Jordan Blake" size="md" />
              <Avatar name="Priya Nair" size="md" />
              <Avatar name="Samuel Chen" size="md" />
              <Avatar name="Olivia Park" size="md" />
              <Avatar name="Marcus Wright" size="md" />
              <Avatar name="Freya Lindqvist" size="md" />
              <Avatar size="md" />
            </div>
          </div>

          <div>
            <p className="font-sans text-[10px] text-stone-400 uppercase tracking-wider mb-4">In context — user row</p>
            <Card variant="default" padding="sm" className="max-w-xs">
              <div className="flex items-center gap-3 px-3 py-2">
                <Avatar name="Alex Reed" size="sm" />
                <div>
                  <div className="font-sans text-xs font-semibold text-stone-900">Alex Reed</div>
                  <div className="font-sans text-[10px] text-stone-400">Personal journal</div>
                </div>
              </div>
            </Card>
          </div>

        </div>

        <Divider />

        {/* ── BRAND FOUNDATIONS ───────────────────────────────────── */}
        <SectionLabel>Brand foundations</SectionLabel>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Corners */}
          <Card variant="warm" padding="md">
            <h4 className="font-sans text-sm font-semibold text-stone-900 mb-3">Hard corners</h4>
            <div className="flex gap-3 mb-3">
              <div className="w-12 h-12 bg-orange-500 rounded-none" />
              <div className="w-12 h-12 bg-green-500 rounded-none" />
              <div className="w-12 h-12 bg-stone-300 rounded-none" />
            </div>
            <p className="font-serif text-xs text-stone-600 leading-relaxed">
              border-radius: 0 everywhere — buttons, cards, inputs, badges, avatars. Clean, editorial, printed-page quality.
            </p>
          </Card>

          {/* Shadows */}
          <Card variant="warm" padding="md">
            <h4 className="font-sans text-sm font-semibold text-stone-900 mb-3">Warm shadows</h4>
            <div className="flex gap-3 mb-3 items-end">
              <div className="w-10 h-10 bg-white rounded-none shadow-sm" />
              <div className="w-10 h-10 bg-white rounded-none shadow-md" />
              <div className="w-10 h-10 bg-white rounded-none shadow-lg" />
            </div>
            <p className="font-serif text-xs text-stone-600 leading-relaxed">
              Stone-hued shadows — rgba(30, 24, 17, α). Never cool gray. sm on cards, md on hover, lg on modals.
            </p>
          </Card>

          {/* Voice */}
          <Card variant="warm" padding="md">
            <h4 className="font-sans text-sm font-semibold text-stone-900 mb-3">Voice & tone</h4>
            <div className="space-y-2 mb-3">
              <Badge variant="accent" size="xs">Warm</Badge>
              <Badge variant="secondary" size="xs" className="ml-2">Encouraging</Badge>
              <Badge variant="default" size="xs" className="ml-2">Literary</Badge>
            </div>
            <p className="font-serif text-xs italic text-stone-600 leading-relaxed">
              "Write anything — we'll make it sing."
            </p>
          </Card>

        </div>

        {/* Bottom spacing */}
        <div className="h-16" />

      </main>
    </div>
  );
}
