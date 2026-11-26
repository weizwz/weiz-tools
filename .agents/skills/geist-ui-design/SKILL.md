---
name: geist-ui-design
description: >-
  Project UI design guide implementing Vercel Geist Design System for weiz-tools.
  Use when creating new tool pages, workbenches, panels, modals, or refactoring UI components.
---

# Geist UI Design Skill (weiz-tools)

## Design Philosophy
Build crisp, high-contrast, engineering-grade utility interfaces inspired by Vercel Geist Design:
- **Stark Monochrome Contrast**: Pure `#ffffff`/`#000000` canvases, `1px` hairline borders (`#eaeaea`/`#222222`), inverted primary buttons (`bg-foreground text-background`).
- **Precision Grid & Crosshairs**: Use `geist-grid-bg` for hero/canvas backdrops and `+` corner markers on featured structural frames.
- **Restrained Radii**: `rounded-md` for inputs/buttons/tabs, `rounded-lg` for cards/menus/containers.

## Component Patterns

### 1. Workbench Layout (3-Pane or 2-Pane Split)
- Container: `h-[calc(100vh-56px)] overflow-hidden bg-background` under `<Navbar />`.
- Sidebars (`w-76` or `w-80`): `bg-background border-r` or `border-l border-border`, sections separated by `border-t border-border`.
- Section Headings: `text-[11px] font-mono uppercase tracking-wider text-muted-foreground`.
- Canvas Backdrop: `bg-secondary/50 geist-grid-bg` with `ring-1 ring-border` around the artboard.

### 2. Segmented Controls & Tabs
- Track: `rounded-md border border-border bg-secondary/60 p-0.5`.
- Active item: `bg-foreground text-background rounded-sm font-medium`.
- Inactive item: `text-muted-foreground hover:text-foreground`.

### 3. Cards & Lists
- Use `.card-style` (`1px` border, `rounded-lg`, border/surface shift on hover).
- Lists with index numbers: `divide-y divide-border` with `font-mono text-[11px] tabular-nums` (`01`, `02`, `03`).

### 4. Verification Checklist
Before finishing any UI change:
1. Verify both light and dark modes have zero hardcoded `bg-white` / `bg-gray-*` / `bg-slate-*` in UI chrome.
2. Verify numeric counters, dimensions, and shortcuts use `font-mono tabular-nums`.
3. Run `pnpm exec eslint app/ components/`, `pnpm exec tsc --noEmit`, and `pnpm build`.
