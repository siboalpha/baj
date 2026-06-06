<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# BAJ Ltd — Frontend Conventions

## Project

**BAJ Ltd** is a waste management company based in Rwanda (Kigali · Gasabo).
This app is the **Waste Collection Fee Management System** — managing zones, collection routes, fees, recycling, and environmental reporting.

---

## Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript — strict mode, no `any`
- **Styling:** CSS Modules (`.module.css`) — no Tailwind, no CSS-in-JS
- **Icons:** Lucide React (`lucide-react`)
- **Fonts:** Inter (sans) + JetBrains Mono (mono) via `next/font/google`

---

## Design Tokens

All tokens are CSS custom properties defined in `app/globals.css`.

**Never hard-code colors, font sizes, spacing, or radii.**
Always use `var(--token-name)` in `.module.css` files.

### Key token groups

| Group | Prefix | Example |
|---|---|---|
| Backgrounds | `--bg-*` | `var(--bg-surface)` |
| Borders | `--border-*` | `var(--border-default)` |
| Text | `--text-*` | `var(--text-primary)` |
| Spacing | `--sp-*` | `var(--sp-4)` → 16px |
| Font size | `--fs-*` | `var(--fs-md)` → 14px |
| Font weight | `--fw-*` | `var(--fw-semibold)` → 600 |
| Border radius | `--r-*` | `var(--r-md)` → 8px |
| Shadows | `--shadow-*` | `var(--shadow-sm)` |
| Motion | `--dur-*`, `--ease-*` | `var(--dur-fast)` → 120ms |
| Status | `--status-*` | `var(--status-success)` |
| Z-index | `--z-*` | `var(--z-modal)` → 400 |

### Font family
```css
/* prose, labels, headings */
font-family: var(--font-sans);

/* zone codes, IDs, fee amounts, technical strings */
font-family: var(--font-mono);
```

### Dark mode
Dark mode is driven by `data-theme="dark"` on `<html>`.
Semantic tokens flip automatically — never write dark-mode overrides in component CSS.

---

## File & Folder Structure

```
app/                            # Next.js App Router pages
├── globals.css                 # All design tokens + base reset (edit here only)
├── layout.tsx                  # Root layout — fonts, metadata, html/body
├── page.tsx + page.module.css
└── [route]/
    ├── page.tsx
    └── page.module.css

components/
├── ui/                         # ⚠️ Reusable design-system atoms — use these first
│   ├── Button/
│   ├── InputField/
│   ├── Badge/
│   ├── Spinner/
│   ├── Avatar/
│   └── ServicePill/
└── forms/                      # Feature-specific form compositions
    └── LoginForm/

lib/                            # Utilities, hooks, types, API clients
├── types/
├── hooks/
└── utils/
```

### Rules

- **Co-location:** every `.tsx` file that needs styles has a `.module.css` in the same folder — no exceptions.
- **One component per folder:** `Button/Button.tsx` + `Button/Button.module.css`.
- **No global classes in components:** never use a plain class name from `globals.css` inside a component. `globals.css` is for tokens and base resets only.
- **No inline `style=` props** unless the value is dynamic and cannot be expressed as a CSS variable (e.g., a runtime width from JS). Even then, prefer CSS variables via `style={{ '--dynamic-val': value } as React.CSSProperties}`.

---

## UI Component Library

**Always reach for an existing component before writing new markup.**
Check `components/ui/` first. If a component exists, use it. If a variant is missing, extend the existing component — do not duplicate it.

### Available atoms

| Component | Path | Props |
|---|---|---|
| `Button` | `components/ui/Button` | `variant` · `size` · `loading` · `icon` · `iconRight` |
| `InputField` | `components/ui/InputField` | `label` · `hint` · `error` · `labelAction` · `as="textarea"` |
| `Badge` | `components/ui/Badge` | `variant` |
| `Spinner` | `components/ui/Spinner` | `size` · `label` |
| `Avatar` | `components/ui/Avatar` | `initials` · `variant` · `size` · `label` |
| `ServicePill` | `components/ui/ServicePill` | `type` |
| `Tabs` | `components/ui/Tabs` | `tabs` · `active` · `onChange` · optional `count` per tab |
| `Modal` | `components/ui/Modal` | `open` · `onClose` · `title` · `children` — portal, focus trap, Escape to close |

### Button variants & sizes
```tsx
// Variants: primary | secondary | ghost | danger | lime
// Sizes:    sm (28px) | md (36px, default) | lg (44px)

<Button variant="primary" size="md" loading={saving}>Save zone</Button>
<Button variant="secondary" icon={<Truck size={16} />}>Assign route</Button>
<Button variant="ghost" size="sm">Cancel</Button>
<Button variant="danger">Remove customer</Button>
<Button variant="lime" icon={<Recycle size={16} />}>Log recycling</Button>
```

### InputField usage
```tsx
// Basic
<InputField label="Zone code" placeholder="KGL-GAS-04" />

// With hint
<InputField label="Fee amount" hint="Amount in RWF" type="number" />

// With error
<InputField label="Email" error="Enter a valid email address" />

// With label action (e.g. forgot password)
<InputField
  label="Password"
  type="password"
  labelAction={<a href="/auth/forgot-password">Forgot password?</a>}
/>

// Textarea
<InputField as="textarea" label="Notes" placeholder="Special instructions…" />
```

### Badge variants
```tsx
// neutral | success | warning | danger | info | accent | lime
<Badge variant="success">paid</Badge>
<Badge variant="danger">overdue</Badge>
<Badge variant="lime" icon={<Recycle size={10} />}>recycling</Badge>
```

### Avatar variants & sizes
```tsx
// variant: accent | lime | neutral | danger
// size: 24 | 32 | 40 | 48
<Avatar initials="MK" variant="accent" size={40} />
```

### ServicePill types
```tsx
// collection | recycling | disposal | transport | consulting
<ServicePill type="recycling" />
```

### Planned (build when first needed)
These components are specified in the design system but not yet built.
When you need one, create it in `components/ui/` following the same pattern.

| Component | Notes |
|---|---|
| `Drawer` | 420px from right, `--shadow-lg` |
| `Toast` | Needs context provider, 5s auto-dismiss |
| `DataTable` | Toolbar → headers → rows → pagination |
| `FilterChip` | Dashed border at rest, solid accent when active |
| `EmptyState` | Icon + title + description + primary action |
| `FeeCard` | BAJ-specific: avatar + name + fee amount + status badge |

---

## Component Conventions

### Naming
- Component files: `PascalCase` (`Button.tsx`, `FeeCard.tsx`)
- CSS module classes: `camelCase` (`.primaryButton`, `.feeCard`)
- Props interfaces: `ComponentNameProps` (`ButtonProps`, `FeeCardProps`)

### Structure
```tsx
// ComponentName.tsx
import styles from './ComponentName.module.css';

interface ComponentNameProps {
  // props
}

export default function ComponentName({ ...props }: ComponentNameProps) {
  return <div className={styles.root}>...</div>;
}
```

### Variants via `data-*` attributes
Prefer `data-variant` / `data-size` / `data-state` attributes over conditional class concatenation:

```css
/* ComponentName.module.css */
.btn { height: 36px; padding: 0 var(--sp-4); }
.btn[data-variant="primary"] { background: var(--bg-accent); color: var(--text-on-accent); }
.btn[data-variant="ghost"]   { background: transparent; color: var(--text-secondary); }
.btn[data-size="sm"]         { height: 28px; font-size: var(--fs-sm); }
```

```tsx
<button className={styles.btn} data-variant="primary" data-size="sm">
  Schedule Collection
</button>
```

---

## Domain Vocabulary

Use these terms consistently in code, labels, and copy:

| Term | Meaning |
|---|---|
| `zone` | A geographic waste collection area (e.g. `KGL-GAS-04`) |
| `route` | A driver's collection path within a zone |
| `collection` | A single waste pickup event |
| `fee` | The recurring charge per customer for collection service |
| `customer` | A household or business registered for collection |
| `vehicle` | A collection truck/van in the fleet |
| `recycling` | Sorted material recovery separate from general waste |
| `disposal` | Managed dumping at authorised sites |

---

## Accessibility

- Every interactive element must be keyboard-navigable.
- Focus styles use `var(--shadow-focus)` — never `outline: none` without a replacement.
- Minimum hit target: 28×28px (icon-only), 36×36px preferred.
- Never use color alone to convey meaning — pair with label or icon.
- All `<img>` elements must have descriptive `alt` text.

---

## Copy & Tone

- Sentence case everywhere: "Schedule collection", not "SCHEDULE COLLECTION".
- No exclamation marks in UI copy.
- Use "waste", not "garbage" or "trash".
- Numbers: comma thousands separators (e.g. `RWF 3,500`).
- Dates: relative in lists ("3 days ago"), absolute in detail views ("Jun 1, 2026 · 9:00 AM").
