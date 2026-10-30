# demo-dashboard

A small Vite app used to demo and test [BranchWars](../../CLAUDE.md).

- `main`: Dashboard with three stat cards, an orders table and an Export button top-right.
- `feature/new-dashboard`: adds a monthly revenue bar chart and moves Export next to the title.

```bash
npm ci
npm run build
npm run start   # http://localhost:3000
```

The page deliberately includes two sources of noise that BranchWars must neutralize:
a random avatar (masked via `branchwars.config.json`) and a "Last updated" timestamp
(handled by freezing the clock during capture).

Note: checked by BranchWars pull request integration (push 1).
Note: push 2 replaces push 1.

BranchWars PR check, push 3 (Review Reporter).

Server check
