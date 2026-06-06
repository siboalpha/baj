<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# BAJ Ltd — Staff Dashboard Conventions

## Project

**BAJ Ltd** is a waste management company based in Rwanda (Kigali · Gasabo).
This app is the **internal staff dashboard** — for BAJ employees managing clients, zones, collections, and financials. It is NOT the client-facing app (that lives in `/frontend`).

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
| Layout | `--sidebar-width`, `--topbar-height` | 240px, 56px |

### Font family
```css
font-family: var(--font-sans);   /* prose, labels, headings */
font-family: var(--font-mono);   /* zone codes, IDs, amounts */
```

### Dark mode
Dark mode is driven by `data-theme="dark"` on `<html>`.
Semantic tokens flip automatically — never write dark-mode overrides in component CSS.

---

## File & Folder Structure

```
app/
├── globals.css                 # All design tokens + base reset
├── layout.tsx                  # Root layout — fonts, metadata
├── (dashboard)/                # Route group: staff shell
│   ├── layout.tsx              # Sidebar + topbar shell
│   ├── clients/page.tsx        # Client management
│   ├── zones/page.tsx          # Zone management
│   └── financials/page.tsx     # Financials
└── auth/login/page.tsx

components/
├── ui/                         # Reusable atoms — use these first
│   ├── Button/
│   ├── InputField/
│   ├── Badge/
│   ├── Spinner/
│   ├── Avatar/
│   ├── Tabs/
│   └── Modal/
└── layout/                     # Dashboard shell components
    ├── Sidebar/
    └── Topbar/

lib/
├── types/
├── hooks/
└── utils/
```

### Rules

- **Co-location:** every `.tsx` that needs styles has a `.module.css` in the same folder.
- **One component per folder:** `Button/Button.tsx` + `Button/Button.module.css`.
- **No global classes in components:** `globals.css` is for tokens and base resets only.
- **No inline `style=` props** unless the value is dynamic and truly can't be a CSS variable.

---

## UI Component Library

**Always reach for an existing component before writing new markup.**

### Available atoms

| Component | Path | Props |
|---|---|---|
| `Button` | `components/ui/Button` | `variant` · `size` · `loading` · `icon` · `iconRight` |
| `InputField` | `components/ui/InputField` | `label` · `hint` · `error` · `labelAction` · `as="textarea"` |
| `Badge` | `components/ui/Badge` | `variant` · `icon` |
| `Spinner` | `components/ui/Spinner` | `size` · `label` |
| `Avatar` | `components/ui/Avatar` | `initials` · `variant` · `size` · `label` |
| `Tabs` | `components/ui/Tabs` | `tabs` · `active` · `onChange` · optional `count` per tab |
| `Modal` | `components/ui/Modal` | `open` · `onClose` · `title` · `children` — portal, focus trap, Escape to close |

### Button variants & sizes
```tsx
// Variants: primary | secondary | ghost | danger | lime
// Sizes:    sm (28px) | md (36px, default) | lg (44px)
<Button variant="primary" size="md" loading={saving}>Save client</Button>
<Button variant="secondary" icon={<Plus size={16} />}>Add zone</Button>
<Button variant="ghost" size="sm">Cancel</Button>
<Button variant="danger">Delete client</Button>
```

### Badge variants
```tsx
// neutral | success | warning | danger | info | accent | lime
<Badge variant="success">active</Badge>
<Badge variant="danger">overdue</Badge>
<Badge variant="warning">pending</Badge>
```

### Layout components (built)
| Component | Path | Notes |
|---|---|---|
| `Sidebar` | `components/layout/Sidebar` | Fixed 240px, active nav via `usePathname`, mobile overlay with backdrop |
| `Topbar` | `components/layout/Topbar` | Sticky 56px, auto page title from pathname, user chip + sign out |

### Planned (build when first needed)
| Component | Notes |
| `DataTable` | Toolbar → headers → rows → pagination |
| `FilterChip` | Dashed border at rest, solid accent when active |
| `EmptyState` | Icon + title + description + primary action |
| `Toast` | Context provider, 5s auto-dismiss |
| `Drawer` | 480px from right, for detail panels |
| `SelectField` | Styled `<select>` matching InputField look |
| `SearchInput` | InputField with search icon and clear button |

---

## Component Conventions

### Variants via `data-*` attributes
```css
.btn[data-variant="primary"] { background: var(--bg-accent); }
.btn[data-size="sm"]         { height: 28px; }
```

---

## Dashboard Layout

The staff dashboard uses a two-column shell:

```
┌─────────────┬──────────────────────────────────┐
│             │  Topbar (56px, sticky)            │
│  Sidebar    ├──────────────────────────────────┤
│  (240px)    │                                  │
│             │  Page content (scrollable)       │
│             │                                  │
└─────────────┴──────────────────────────────────┘
```

Use `--sidebar-width` (240px) and `--topbar-height` (56px) tokens for layout math.

---

## Domain Vocabulary

| Term | Meaning |
|---|---|
| `client` | A household, small business, commercial building, or hotel registered for waste collection |
| `client type` | `household` · `small_business` · `commercial` · `hotel` |
| `zone` | A geographic waste collection area |
| `sector` | Administrative unit within the Rwandan hierarchy |
| `route` | A driver's collection path within a zone |
| `fee` | The recurring monthly charge per client |
| `collection` | A single waste pickup event |
| `vehicle` | A collection truck/van in the fleet |

### Administrative hierarchy (Rwanda)
```
Province → District → Sector → Cell → Village → Isibo
```
A client can be located at any level of this hierarchy.

---

## Accessibility

- Every interactive element must be keyboard-navigable.
- Focus styles use `var(--shadow-focus)` — never `outline: none` without a replacement.
- Minimum hit target: 28×28px (icon-only), 36×36px preferred.
- Never use color alone to convey meaning.

---

## Development / Testing Helpers

Every form in this project must include a visible test-data helper so developers and testers can fill forms instantly without typing. Two patterns — choose based on the form type:

### Auth forms (login, OTP)
Show a small hint text below the form inputs — **not a button**. The hint lists the fake credentials in plain text so they are visible at a glance.

```tsx
// LoginForm.tsx — below the submit button
<p className={styles.devHint}>
  Dev: <span>admin@baj.rw</span> / <span>Admin@123</span>
</p>
```

```tsx
// OtpForm.tsx — below the boxes
<p className={styles.devHint}>Dev OTP: <span>123456</span></p>
```

Style: `--fs-xs`, `--text-tertiary`, mono font for the credential values. No button — just passive visible text.

### All other forms (client, zone, payment, etc.)
Add a **"Use dummy data"** button (variant `ghost`, size `sm`) at the top-right of the form or just above the first field. On click, it fills every field with realistic mock values so the tester can submit immediately.

```tsx
<Button type="button" variant="ghost" size="sm" onClick={fillDummy}>
  Use dummy data
</Button>
```

This button must be present on **every** form that collects user input — client creation, zone assignment, payment recording, search filters, etc.

---

## Copy & Tone

- Sentence case everywhere: "Add client", not "ADD CLIENT".
- No exclamation marks.
- Use "waste", not "garbage" or "trash".
- Numbers: comma thousands separators (`RWF 3,500`).
- Dates: absolute in tables (`Jun 1, 2026`), relative in activity feeds (`3 days ago`).
