# pakhale.com

My personal site — [pratik.pakhale.com](https://pratik.pakhale.com).

React + Vite, prerendered to static HTML at build time and served from Vercel.
There is no server and no client-side data fetching: every route ships as a real
HTML file with its content already in it.

## Stack

| | |
|---|---|
| UI | React 19, TypeScript |
| Build | Vite 8, [`vite-prerender-plugin`](https://github.com/preactjs/vite-prerender-plugin) |
| Styles | Tailwind CSS 4 |
| Routing | React Router 7 |
| Content | YAML files in `src/data/`, imported at build time |
| Host | Vercel |

## Running it

```bash
bun install
bun run dev      # dev server
bun run build    # typecheck, bundle, prerender every route into dist/
bun run preview  # serve the built output
bun run lint
```

## How it's put together

- **Content lives in YAML, not JSX.** `src/data/*.yaml` holds the work history,
  projects, research, hardware builds and side quests. Editing the site's
  substance means editing YAML; `src/lib/data.ts` parses and types it.
- **Routes are declared once.** `src/routes.tsx` is the router's route table and
  the prerenderer's page list, so a route can't exist without being built.
- **SEO metadata is declared once too.** `src/lib/seo.ts` holds the canonical
  origin plus the title and description for every route. `vite.config.ts`
  imports the same list to emit `sitemap.xml` and `robots.txt`, so the sitemap
  can't drift from the pages that actually exist.
- **404s are real 404s.** Because every route is prerendered there is no SPA
  catch-all rewrite, so an unknown URL genuinely misses instead of returning a
  200 with an empty shell.

## Notes

`public/sw.js` is a tombstone. This domain previously ran a Gatsby site whose
service worker is still registered in returning visitors' browsers; that file
exists to unregister it. See the comment inside for when it can go.

## License

MIT — see [LICENSE](./LICENSE).
