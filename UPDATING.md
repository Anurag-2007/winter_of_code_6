# Updating the site

Almost everything that changes between editions lives in `data/` and is edited through one script.

## Quick commands

```bash
# New edition (updates data/site.json, README, package name) + registration window
npm run site:update -- --edition 7.0 --reg-start 20-12-2027 --reg-end 31-12-2027

# Only move the registration dates (DD-MM-YYYY)
npm run site:update -- --reg-start 22-12-2026 --reg-end 02-01-2027

# New Devfolio / registration link (used by both REGISTER NOW buttons)
npm run site:update -- --register-link https://woc7.devfolio.co

# Start of a new cycle: clear old events (events page shows "Coming Soon")
npm run site:update -- --reset-events

# Look for stale edition mentions left anywhere in the code/data
npm run site:check

# Add --dry-run to any update to preview
```

## Where things live

| What | File | Notes |
|---|---|---|
| Edition number, registration link | `data/site.json` | Read by title, About, Getting Started, footer, register buttons |
| Registration window + phase dates | `data/timeline.json` | Dates are `DD-MM-YYYY`. The "Student Applications" entry is the registration window |
| Events page | `data/events.json` | `[]` shows "Coming Soon". Posters go in `public/events/`, speaker photos in `public/speakers/` |
| FAQs | `data/faq.json` | |
| Team | `data/team.json` | photos in `public/team/` |
| Projects page | `data/projects.json` | |
| Resource videos | `data/videos.json` | |
| Past editions | `components/past-organizations.tsx`, `data/pastOrgs.json`, `data/pastStats.json` | |
| Navbar links | `components/navbar.tsx` | |

## Per-edition checklist

1. `npm run site:update -- --edition X.0 --reg-start ... --reg-end ...`
2. Edit the remaining phase dates in `data/timeline.json` (inaugural, proposal, coding, evaluation, closing).
3. `npm run site:update -- --reset-events` if old events are still listed.
4. Review `data/projects.json`, `data/videos.json`, `data/faq.json` for edition-specific text.
5. `npm run site:check`, then `npm run build`.

## Bringing back sponsors / organisations / community partners

They were removed in one dedicated commit ("Remove sponsors, organisations and community partners").
To restore them when they are announced:

```bash
git log --oneline -- components/sponsors.tsx     # find the removal commit
git revert <that-commit>                          # restores components, data, assets, nav links
```

Then re-add `<Organisations />` / `<Sponsors />` to `app/page.tsx` if the revert conflicts.
