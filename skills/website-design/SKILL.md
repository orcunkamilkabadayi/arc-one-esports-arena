---
name: website-design
description: Design or refine ARC//ONE web pages and landing experiences with a distinctive, brand-consistent visual system. Use for new pages, redesigns, conversion improvements, design-token work, or diagnosing generic AI-looking UI; do not use for slides, videos, or data visualizations.
---

# ARC//ONE Website Design

Create cinematic, usable esports experiences that feel like a broadcast system—not a generic SaaS template.

## Start with the brief

For a new page or redesign, identify the primary goal, audience, and page type (landing, corporate, portfolio, ecommerce, or SaaS). Confirm a material ambiguity before designing. Use [BRAND.md](../../BRAND.md) as the source of truth for ARC//ONE's visual language and [design-tokens.json](../../design-tokens.json) for implementation values.

Choose one intentional aesthetic direction before writing UI: ARC//ONE defaults to **retro-futuristic industrial esports**. A different direction requires an explicit user request.

## Design decisions

- Build around one memorable visual idea: arena scale, match telemetry, competition hardware, or broadcast tension.
- Preserve the acid-lime / graphite system and technical editorial rhythm. Use high contrast, thin rules, controlled asymmetry, and restrained motion.
- Use atmospheric texture with purpose: subtle grid, scanline, grain, layered shadow, or real arena imagery. Do not introduce generic decorative blobs or unrelated gradients.
- Keep sections meaningful and varied; do not add a stock three-card feature grid, generic testimonial carousel, or ornamental counters without a product reason.
- Keep typography deliberate. Reuse the existing type system unless a redesign explicitly changes it; do not introduce a competing third family casually.

## Implementation

- Mobile-first. Test the 720px breakpoint and ensure touch controls and scroll interactions remain usable.
- Express reusable colors, spacing, radii, and type in CSS custom properties. Keep `design-tokens.json` synchronized when the system changes.
- Prefer one coherent page-load or scroll choreography over many unrelated micro-animations. Respect `prefers-reduced-motion`.
- Use semantic landmarks, visible keyboard focus, ARIA labels for icon controls, and sufficient text contrast.
- Use real copy and actual product/event intent. Avoid placeholder claims and AI-style filler.

## Review before handoff

Ask: “Would this look like a generic AI-generated site?” If yes, remove the trigger (template layout, overused color treatment, weak hierarchy, or decorative noise) and strengthen the page-specific visual idea.

For a substantial visual change, update `DESIGN_BRIEF.md`, validate with `npm.cmd run build`, and preserve the project secret-handling and Git workflow in `CLAUDE.md`.
