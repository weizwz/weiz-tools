---
trigger: always_on
---

# Vercel Geist Design System Rules (weiz-tools)

All UI pages, tool workbenches, and shared components in this repository MUST strictly follow the Vercel Geist Design specification defined in `app/globals.css`.

## 1. Color & Surface Tokens
- Always use semantic CSS variables (`bg-background`, `bg-secondary`, `bg-card`, `bg-popover`, `text-foreground`, `text-muted-foreground`, `border-border`). Never hardcode `bg-white`, `bg-gray-*`, `bg-slate-*`, or `dark:bg-[#409eff]` in application chrome.
- High-contrast stark neutrals:
  - Light: `#ffffff` canvas, `#fafafa` secondary surface, `#eaeaea` 1px borders, `#171717` ink.
  - Dark: `#000000` canvas, `#0a0a0a`/`#111111` elevated surface, `#222222` 1px borders, `#ededed` ink.
- Primary actions & active segmented states use inverted monochrome (`bg-foreground text-background`), reserving `--color-main` (`#0070f3` / `#3291ff`) strictly for subtle status indicators, focus accents, and canvas export guides.

## 2. Geometry, Borders & Elevation
- Keep border radius crisp and restrained: `rounded-md` (6px) for controls/inputs/buttons, `rounded-lg` (8px) for cards/panels/popovers. Avoid overly pill-heavy (`rounded-full`) action buttons except for compact status badges.
- Rely on crisp `1px solid var(--border)` hairline dividers rather than heavy drop shadows. Hover states sharpen borders (`hover:border-foreground/40`) and subtly shift surface tone without bouncy `translateY` jumps.
- Tool workbench canvases (e.g., preview backdrops) use `bg-secondary/50 geist-grid-bg`.

## 3. Typography & Micro-details
- Display headings use tight Geist tracking (`tracking-[-0.04em]`).
- Technical labels, section headers (`LAYOUT · ...`), counts, dimensions, shortcuts (`/`), and statistics MUST use `font-mono tabular-nums` and uppercase tracking (`text-[11px] font-mono uppercase tracking-wider text-muted-foreground`).
- Preserve domain-specific output rendering (e.g., `components/markdown-to-wechat/engine/*` WeChat article HTML styles and Canvas export logic) independently from the app UI chrome.
