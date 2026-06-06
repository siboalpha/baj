# BAJ Ltd — Design System
**Version 1.0 · June 2026**
Leading sustainable waste management in Rwanda.

---

## 1. Design Principles

1. **Green is purposeful** — The BAJ green palette is reserved for primary actions, eco-indicators, and brand identity. It is not decoration.
2. **Neutrals carry the UI** — ~90 % of surfaces and text are neutral. Color communicates status and action.
3. **Mono = data** — JetBrains Mono is used exclusively for token values, codes, IDs, and technical strings. Inter handles all prose and UI labels.
4. **Borders before shadows** — inline cards use 1 px borders; elevated elements (modals, dropdowns) earn shadows.
5. **Every empty state has a next step** — no screen leaves the user without a clear primary action.
6. **Eco-clarity** — icons and labels always reinforce environmental meaning (recycling, collection, disposal). Never omit context that helps users understand waste flows.

---

## 2. Brand Identity

**Company:** BAJ Ltd
**Founded:** 2013
**Location:** Rwanda · Kigali · Gasabo
**Domain:** baj.rw
**Sector:** Waste Management & Environmental Services

### Tagline
> Leading sustainable waste management in Rwanda.

### Voice & Copy
- Calm, professional, purposeful — no exclamation points.
- Sentence case for all UI labels ("Schedule collection", not "SCHEDULE COLLECTION").
- Numbers: comma thousands separators. Currency: locale-correct. Percentages: one decimal place.
- Time: relative in lists ("3 days ago"), absolute in detail views ("Jun 1, 2026 · 9:00 AM").
- Use "waste" not "garbage" or "trash" — it is the professional term in this sector.

---

## 3. Color

### 3.1 Brand Palette (source)

| Name | Hex | Usage |
|---|---|---|
| Medium Jungle Green | `#50994F` | Primary accent mid-tone |
| Lime Moss | `#7AB701` | Energetic secondary / recycling |
| Deep Green | `#007900` | Accent dark / text on light |
| Deep Green 2 | `#017301` | Accent dark variant |
| Tea Green | `#CADFBAff` | Tinted backgrounds / soft accent |

### 3.2 Accent Scale (OKLCH · hue 145)

Used for primary buttons, links, focus rings, key data points.

| Token | Lightness | Use |
|---|---|---|
| `--accent-50` | 97 % | Tinted background (hover areas) |
| `--accent-100` | 93 % | Soft badge background |
| `--accent-200` | 87 % | ≈ Tea Green — section tints |
| `--accent-300` | 78 % | Borders on accent surfaces |
| `--accent-400` | 68 % | Hover ring, icon fills |
| `--accent-500` | 59 % | ≈ Medium Jungle — icon accents |
| `--accent-600` | 52 % | Focus border, secondary text |
| `--accent-700` | 46 % | ≈ Deep Green — primary button fill |
| `--accent-800` | 36 % | Pressed state |
| `--accent-900` | 25 % | Darkest accent |

### 3.3 Lime Scale (OKLCH · hue 120)

Used for recycling indicators, eco-status badges, and energetic highlights.

| Token | Lightness | Use |
|---|---|---|
| `--lime-50` | 97 % | Recycling section tint |
| `--lime-200` | 85 % | Subtle border on eco cards |
| `--lime-500` | 68 % | ≈ Lime Moss — recycling badge fill |
| `--lime-700` | 48 % | Text on lime-tinted backgrounds |

### 3.4 Neutral Scale (hue 145 — subtle earth warmth)

`--n-0` (white) → `--n-1000` (near-black). 16-step scale.

### 3.5 Status Colors

| Token | Meaning | Example |
|---|---|---|
| `--status-success` | Completed, on-schedule | Collection done |
| `--status-warning` | Delayed, attention needed | Route behind schedule |
| `--status-danger` | Missed, critical | Overdue fee, violation |
| `--status-info` | Informational | System notice |

Each status has a `*-soft` variant for badge/chip backgrounds.

### 3.6 Semantic Tokens

Always use semantic tokens in components — never raw scale tokens.

**Backgrounds:** `--bg-base`, `--bg-surface`, `--bg-sunken`, `--bg-elevated`, `--bg-hover`, `--bg-active`, `--bg-accent`, `--bg-accent-soft`, `--bg-lime-soft`

**Borders:** `--border-subtle`, `--border-default`, `--border-strong`, `--border-focus`, `--border-accent`

**Text:** `--text-primary`, `--text-secondary`, `--text-tertiary`, `--text-disabled`, `--text-inverse`, `--text-accent`, `--text-lime`, `--text-on-accent`

---

## 4. Typography

**Primary:** Inter (400, 500, 600, 700) — all prose, labels, headings
**Mono:** JetBrains Mono (400, 500, 600) — codes, IDs, token values, fee amounts

| Token | Size | Use |
|---|---|---|
| `--fs-2xs` | 11 px | Timestamps, helper text |
| `--fs-xs` | 12 px | Captions, badges, mono data |
| `--fs-sm` | 13 px | Table cells, secondary labels |
| `--fs-md` | 14 px | Body default |
| `--fs-lg` | 16 px | Section labels, callouts |
| `--fs-xl` | 18 px | Card titles |
| `--fs-2xl` | 22 px | Page sub-headings |
| `--fs-3xl` | 28 px | Page headings |
| `--fs-4xl` | 36 px | Hero headings |
| `--fs-5xl` | 48 px | Display |
| `--fs-6xl` | 64 px | Marketing hero only |

**Line heights:** `--lh-tight` 1.15 · `--lh-snug` 1.30 · `--lh-normal` 1.50 · `--lh-loose` 1.70
**Weights:** `--fw-regular` 400 · `--fw-medium` 500 · `--fw-semibold` 600 · `--fw-bold` 700

---

## 5. Spacing

4 px base grid. Use `--sp-*` tokens exclusively — never hard-coded pixel values.

`--sp-0` 0 · `--sp-1` 4 px · `--sp-2` 8 px · `--sp-3` 12 px · `--sp-4` 16 px · `--sp-5` 20 px · `--sp-6` 24 px · `--sp-7` 32 px · `--sp-8` 40 px · `--sp-9` 48 px · `--sp-10` 64 px · `--sp-11` 80 px · `--sp-12` 96 px

---

## 6. Border Radii

| Token | Value | Use |
|---|---|---|
| `--r-xs` | 4 px | Chips, tight inputs |
| `--r-sm` | 6 px | Badges, small tags |
| `--r-md` | 8 px | Cards, inputs (default) |
| `--r-lg` | 12 px | Panels, drawers |
| `--r-xl` | 16 px | Modals, hero sections |
| `--r-2xl` | 24 px | Large feature cards |
| `--r-full` | 999 px | Pills, avatars, toggles |

---

## 7. Shadows

Use shadow tokens based on elevation, not decoration.

| Token | Elevation level |
|---|---|
| `--shadow-xs` | Topbar, sticky headers |
| `--shadow-sm` | Inline cards, table rows |
| `--shadow-md` | Dropdowns, tooltips |
| `--shadow-lg` | Drawers, sidepanels |
| `--shadow-xl` | Modals |
| `--shadow-focus` | Focus ring (3 px accent glow) |

---

## 8. Motion

| Token | Duration | Easing | Use |
|---|---|---|---|
| `--dur-fast` | 120 ms | `--ease-out` | Hover, button press |
| `--dur-base` | 180 ms | `--ease-in-out` | Theme switch, panel toggle |
| `--dur-slow` | 280 ms | `--ease-in-out` | Page transitions, drawer open |

Always wrap transitions in `@media (prefers-reduced-motion: no-preference)` when adding motion to components. The `tokens.css` file includes a global `prefers-reduced-motion: reduce` override.

---

## 9. Icons

**Library:** [Lucide Icons](https://lucide.dev)

- Default size: 16 px (inline) / 20 px (standalone) / 24 px (feature callouts)
- Stroke width: 1.5 px
- Color: inherit from parent text color — use `currentColor`
- Never fill icons unless intentionally filled (e.g., active state toggle)

### Domain Icon Map

| Concept | Lucide Icon |
|---|---|
| Waste collection | `trash-2` |
| Transportation / vehicles | `truck` |
| Recycling | `recycle` |
| Disposal / dumping | `package-x` |
| Environmental / leaf | `leaf` |
| Schedule / calendar | `calendar-clock` |
| Fee / payment | `credit-card` |
| Report / analytics | `bar-chart-2` |
| User / customer | `user` |
| Location / zone | `map-pin` |
| Alert / warning | `alert-triangle` |
| Success / done | `check-circle-2` |
| Settings | `settings-2` |
| Notification | `bell` |
| Download / export | `download` |

---

## 10. Components

### 10.1 Button

**Variants:** `primary` · `secondary` · `ghost` · `danger` · `lime`
**Sizes:** `sm` (28 px) · `md` (36 px, default) · `lg` (44 px)

Rules:
- One primary button per surface. Two primaries = neither is primary.
- Icon-only buttons require `aria-label`.
- Disabled buttons have `opacity: 0.45` and `cursor: not-allowed` — do not use a different color.
- Loading state: replace label with a 16 px spinner; preserve button width.

```css
/* Example: primary */
.btn-primary {
  background: var(--bg-accent);
  color: var(--text-on-accent);
  border: none;
  border-radius: var(--r-md);
  font-family: var(--font-sans);
  font-size: var(--fs-md);
  font-weight: var(--fw-medium);
  padding: 0 var(--sp-4);
  height: 36px;
  display: inline-flex;
  align-items: center;
  gap: var(--sp-2);
  cursor: pointer;
  transition: background var(--dur-fast) var(--ease-out),
              box-shadow var(--dur-fast) var(--ease-out);
}
.btn-primary:hover  { background: var(--accent-800); }
.btn-primary:focus-visible { outline: none; box-shadow: var(--shadow-focus); }
.btn-primary:active { background: var(--accent-900); }
```

### 10.2 Input

**Types:** text · search · textarea · select · date
**Height:** 36 px (single-line). Textarea: min 80 px.

Rules:
- 1 px `--border-default` border at rest; `--border-focus` + `--shadow-focus` on focus.
- Always pair with a visible `<label>`. Use `aria-invalid` and `aria-describedby` for errors.
- Error state: `--status-danger` border + helper text below.

### 10.3 Checkbox & Radio

- 16 × 16 px hit area minimum.
- 1.5 px border, `--accent-700` checked fill, white checkmark.
- Focus ring via `--shadow-focus`.

### 10.4 Toggle

- 32 × 18 px track, 14 px circular knob.
- Off: `--n-300` track. On: `--accent-700` track.
- Knob transitions `left` in `var(--dur-fast)`.

### 10.5 Badge

Used for status, counts, and category labels.

**Variants:** `neutral` · `success` · `warning` · `danger` · `info` · `accent` · `lime`

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px var(--sp-2);
  border-radius: var(--r-full);
  font-family: var(--font-mono);
  font-size: var(--fs-2xs);
  font-weight: var(--fw-medium);
  white-space: nowrap;
}
.badge--success {
  background: var(--status-success-soft);
  color: var(--status-success);
}
.badge--lime {
  background: var(--bg-lime-soft);
  color: var(--text-lime);
}
```

### 10.6 Service Pill

Identifies waste service type in lists and map overlays.

**Variants:** `collection` · `recycling` · `disposal` · `transport` · `consulting`

Structure: 6 px colored dot + mono label.

### 10.7 Avatar

Circular user/driver/zone identifier.

**Sizes:** 24 px · 32 px · 40 px · 48 px
**Variants:** `accent` · `lime` · `neutral` · `danger` (for alert states)
Stacking: -8 px overlap, 1 px `--bg-surface` ring.

### 10.8 Data Table

Structure: Toolbar → Column Headers → Body Rows → Pagination Footer

Rules:
- Alternating row backgrounds: `--bg-surface` / `--bg-sunken`.
- Hover: `--bg-hover`.
- Selected row: `--bg-accent-soft` + `--border-accent` left border 2 px.
- Sort indicator: Lucide `chevrons-up-down` → `chevron-up` / `chevron-down`.
- Empty state fills the table body — never an empty container.

### 10.9 Filter Chip

Used in table toolbars and search interfaces.

```css
.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: var(--sp-1);
  padding: var(--sp-1) var(--sp-3);
  border: 1px dashed var(--border-default);
  border-radius: var(--r-full);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  color: var(--text-secondary);
  cursor: pointer;
  background: transparent;
  transition: all var(--dur-fast) var(--ease-out);
}
.filter-chip.is-active {
  border-style: solid;
  border-color: var(--accent-400);
  background: var(--bg-accent-soft);
  color: var(--text-accent);
}
```

### 10.10 Sidebar Navigation

Width: 240 px (desktop) · hidden (mobile, use drawer).

Structure: Logo → Nav sections (label + links) → Footer (user + version)

Active link: 2 px `--accent-600` left border + `--bg-accent-soft` background.

### 10.11 Tabs

Used for sub-navigation within a page section.

Active indicator: 2 px bottom border `--accent-600`. No filled background on active tab.
Optional count badge: `--badge--neutral` inline after label.

### 10.12 Modal

Max-width: 480 px. Centered in viewport with `--bg-elevated` + `--shadow-xl`.
Overlay: `oklch(0% 0 0 / 0.45)`.

Structure: Header (title + close) → Body (scrollable) → Footer (actions, right-aligned).

Rules:
- Footer: secondary action left, primary action right.
- Never auto-dismiss modals that contain destructive actions.
- Trap focus inside modal when open.

### 10.13 Drawer

Slides from right. Width: 420 px.
Scrollable body. Never blocks the sidebar nav.

Use for: record detail, edit forms, audit logs.

### 10.14 Toast / Notification

**Variants:** `success` · `warning` · `danger` · `info`

Position: bottom-right, 16 px from edges. Stack upward.
Auto-dismiss: 5 s (success/info). Persistent: warning/danger until dismissed.

Structure: Icon + Title + Body text + optional inline action.

### 10.15 Empty State

Used when a table, list, or page has no data.

Structure: Lucide icon (40 px, `--text-tertiary`) → Title → Description → Primary action button.

Rules: always provide a primary action. If read-only context, provide a contextual explanation.

### 10.16 Loading States

**Spinner** (inline / button): 16 px, `--accent-500`, 700 ms linear rotation.
**Skeleton**: `--n-150` base → `--n-100` shimmer, 1.4 s ease-in-out loop.
**Page loader**: centered spinner + "Loading…" label in `--text-secondary`.

### 10.17 Map & Zone Overlay *(BAJ-specific)*

Used in the waste collection zone management view.

- Zone polygons: `--accent-500` fill at 20 % opacity, `--accent-700` stroke 1.5 px.
- Recycling zones: `--lime-500` fill at 15 % opacity, `--lime-700` stroke.
- Selected zone: `--shadow-focus` glow effect.
- Vehicle markers: `truck` icon inside 32 px `--accent-700` circle.

### 10.18 Fee Card *(BAJ-specific)*

Displays collection fee status per household / business.

Structure: Avatar (zone initial) → Name + address → Fee amount (mono) → Status badge → Action button.

States: `paid` (success), `pending` (warning), `overdue` (danger).

---

## 11. Dark Mode

Toggle via `data-theme="dark"` on `<html>`.

JavaScript snippet:
```js
const toggle = document.querySelector('.ds-themetoggle');
toggle?.addEventListener('click', () => {
  const html = document.documentElement;
  html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
  toggle.textContent = html.dataset.theme === 'dark' ? '☀ Light' : '◑ Dark';
});
```

All semantic tokens flip automatically. Do not hard-code light-mode colors in components.

---

## 12. Accessibility

- **Contrast:** ≥ 4.5 : 1 for body text, ≥ 3 : 1 for large text and UI components. Verified both light and dark.
- **Focus:** Never remove the focus ring. `--shadow-focus` is the canonical indicator.
- **Hit targets:** Minimum 28 × 28 px for icon-only controls; 36 × 36 px preferred.
- **Color redundancy:** Never rely on color alone. Pair with label, icon, or pattern.
- **Motion:** Respect `prefers-reduced-motion`. Global override is in `tokens.css`.
- **Labels:** Every input has a visible `<label>`. Use `aria-invalid` + `aria-describedby` for validation messages.
- **Landmarks:** Use `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>` in page structure.

---

## 13. File Structure

```
desing-system/
├── tokens.css              — CSS custom properties (primitives + semantics + dark mode)
├── page.css                — Base styles, layout classes, specimen helpers
├── showcase.css            — Design System HTML reference page styles
├── DESIGN_SYSTEM.md        — This document
└── BAJ Design System.html  — Visual reference (canonical source of truth)
```

Import order in any BAJ application:
```css
@import './desing-system/tokens.css';
/* Then your component stylesheets */
```

---

## 14. Changelog

| Version | Date | Notes |
|---|---|---|
| 1.0 | Jun 2026 | Initial release — tokens, 18 components, dark mode |
