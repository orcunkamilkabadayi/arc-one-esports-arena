# ARC//ONE Esports Website

## Project overview

ARC//ONE is a cinematic, scroll-driven esports landing page built with React, Vinext, Vite, and Node.js. The homepage introduces a fictional esports arena, then transitions through tournament-grade keyboard, mouse, and headset chapters as the visitor scrolls.

The visual language is intentionally premium and broadcast-inspired: graphite/black surfaces, acid-lime accents, condensed uppercase typography, thin technical rules, and restrained motion.

## Local development

Run commands from the project root:

```powershell
npm.cmd run dev
npm.cmd run build
npm.cmd run lint
```

The local preview runs at `http://localhost:3000`.

## Important files

- `app/page.tsx` — the homepage, scroll progress logic, chapter content, navigation, and trailer modal.
- `app/globals.css` — shared tokens, responsive layout, motion, and visual system.
- `app/layout.tsx` — metadata, fonts, and Open Graph/X preview configuration.
- `public/arena-hero.png` — generated arena and pro-equipment hero image.
- `public/og.png` — social preview image.
- `.openai/hosting.json` — Sites project metadata; keep its `project_id` intact.

## Implementation guidelines

- Preserve the ARC//ONE visual system unless a redesign is explicitly requested.
- Keep the scroll narrative smooth and meaningful on touch and desktop screens.
- Maintain keyboard focus states, semantic landmarks, ARIA labels, Escape-to-close modal behavior, and `prefers-reduced-motion` support.
- Use the existing shadcn `Button` primitive and Lucide icons for interface controls.
- Do not replace the generated hero imagery with CSS/SVG scene stand-ins.
- Keep dependencies minimal and respect the existing npm lockfile.
- Never commit secrets, tokens, local credentials, or generated build/cache directories.

## Git and approval workflow

The GitHub repository is `https://github.com/orcunkamilkabadayi/arc-one-esports-arena`.

- `github` is the GitHub remote and `origin` is the private Sites remote; keep both remotes intact.
- Do not push speculative or unapproved product changes.
- Once a user-approved change is complete, run the relevant validation (`npm.cmd run build` at minimum for source changes), then immediately:

  ```powershell
  git add <approved files>
  git commit -m "<concise change summary>"
  git push github main
  ```

- Every approved change must end with the GitHub `main` branch synchronized with the local commit.
- If validation fails, fix the actual failure before committing or pushing.
- Use small, focused commits and never rewrite shared history or run destructive reset/checkout commands without explicit instruction.

## Handoff checklist

Before reporting completion:

1. Confirm the requested behavior is implemented.
2. Run the relevant build/lint checks.
3. Confirm `git status` is clean or clearly explain any intentional local changes.
4. Commit and push all approved changes to `github/main`.
5. Report the GitHub URL and any remaining blocker plainly.
