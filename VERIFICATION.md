# Verification

## Automated checks

- Production build: passed with the Sites build pipeline.
- Application lint: `app/page.tsx` and `app/layout.tsx` passed Oxlint.
- Production dependency audit: 0 vulnerabilities.
- Desktop: 1440 x 900, no horizontal overflow, all five equipment hotspots visible.
- Mobile: 390 x 844, no horizontal overflow, hero title stays within two lines.
- Keyboard: equipment dialog closes with Escape and returns focus.
- Reduced motion: pinned scenes collapse to normal document flow and all visual layers remain visible.
- Browser console: no runtime errors, failed requests, or error responses.

## Design verification

- Reading order remains clear without scroll animation.
- Stadium assembly is the narrative peak.
- Equipment details use semantic buttons and a native dialog.
- Decorative images do not replace meaningful text.
- Footer location is `Serdivan/Sakarya`.
