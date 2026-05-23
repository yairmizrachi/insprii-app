# Agent guide

Conventions for AI agents and contributors working in this monorepo. Read this before making changes.

## Components

- Components stay modular and dumb. Generic names, generic props. Handlers and state come from a higher orchestration layer (a screen, a feature folder, or a store) — avoid prop drilling more than two levels.
- Keep constants outside the component body. One file per feature for constants/types.
- One feature per folder under `src/components/<feature>/`. `src/components/ui/` holds primitives reused across features.
- Prefer composition over options-bloat. If a component grows a third "mode" prop, split it.

## Code style

- Don't write complex expressions on one line. Pull intermediates into named consts at the top of the function so the body reads as English.
- No comments containing em-dashes or stray dashes (these come from LLM output and look unnatural). Comments only explain *why* — not what.
- Single source of truth: theme tokens in `tooling/tailwind/theme.css`, types in `packages/validators` or feature `types.ts`, env in `.env.example`.

## Utilities and libraries

- Before writing a util (formatting, dates, regex, slugification, color manipulation, etc.), search for a small focused library on npm. Reach for `date-fns`, `nanoid`, `slugify`, etc. instead of hand-rolling.
- If a util really does need to be local, put it in `src/utils/<name>.ts` (not inline in the component). Name it for what it does, not how (`msToIso`, not `formatDate`).
- Initialization for SDKs (mail clients, redis, supabase, etc.) goes in `packages/<feature>/src/client.ts` or `src/utils/lib/<sdk>.ts`. Singletons, not per-call construction.

## Folder structure (web/react)

```
src/
  components/
    <feature>/      one folder per feature (db table or domain concept)
      <Feature>.tsx
      hooks.ts
      types.ts
    ui/             dumb primitives shared across features
  utils/
    <name>.ts       focused util functions
    lib/<sdk>.ts    SDK clients
  app/              Next.js routes (or screens for expo)
```

## State and analytics

- Use Zustand stores for cross-component client state. Server state stays in tRPC + react-query.
- Track analytics events on **public** apps only (nextjs, expo). Backend services don't emit user analytics.
- Each event carries the metadata you'd actually want to filter by — id, source, surface, plan tier. No "click_button" with no context.

## Scoping work

- Don't build for hypothetical scale. This is a small-team product; pick boring infra. No microservices, no orchestration, no load balancers unless there's a real reason.
- Don't add error handling, fallbacks, or validation for things that can't happen. Only validate at boundaries (user input, external APIs).
- When customizing the boilerplate, build the UI shell with empty states + dummy callbacks first. Wire data last.

## Generic-by-default

- All copy, asset references, package names, bundle ids, and brand strings are placeholders unless explicitly part of a feature. The boilerplate ships generic; downstream forks brand it.

## When you finish a task

- Run `pnpm typecheck` from the repo root. Don't claim the task is done if it fails.
- Don't add new docs files unless asked. Update `README.md` and `AGENTS.md` if the change affects setup or conventions.
- Don't run destructive git ops (`reset --hard`, `push --force`, branch delete) without confirming with the user.
