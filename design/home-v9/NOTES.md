# Home v9: dev-minimal (branch `home-dev-minimal`)

Brief from Francesco: "the home looks like a SaaS". Redesign only the home: dev-polished, clear, minimal.
Keep every animation and all real content. Only `index.html` changed; `design/home-v9/index.before.html` is the previous version, kept for diffing.

## What made it read as SaaS, and what replaced it
| Before | After |
|---|---|
| Big rounded pill CTAs, ghost pills, white pill on black | **`.h-cmd`**: one bordered mono command per section (8px radius, 1px border), with a small keycap arrow. On hover/focus it turns blue (`--lc-text` / `--lc`) and the key fills blue. Every other action is a **`.h-link`**: a mono text link with an arrow and a 2px blue underline on hover, like the nav caret. |
| Two 38rem colour tiles with pill links | Two framed thumbnails (brand colour, 16px radius) with a mono domain bar (`apps.apple.com ↗`). Under each: name · type, headline and a text link. The art keeps its lag reveal, parallax and hover lift. |
| White cards holding rows with round ↗ buttons | Hairline **indexed rows** (`01…10`, name, desc, mono meta, small ↗). Skill repo names are set in Geist Mono. Stars use a small bordered tag; the top skill keeps the black one. |
| Coloured stat tiles + 5 social cards with avatars | A 3-cell stat strip between rules. One author line (Greg Brockman quote-posted Kappaemme). Five post rows: skill (blue mono), Greg's text, `↳ @Kappaemmedev · QUOTE`, ♡/views, "View on X ↗". |
| 12 tool tiles | A config-style listing grouped by the existing category labels (`language C · Java · JavaScript · Python`, …). Brand icons are small; the hover tilt is kept. |
| Pills as dates | Mono blue dates; bullet points use mono "–" dashes. |
| Coffee as a second black slab right before black contact | Coffee sits on paper with rules (no black on black). Contact is now the single black closing block, like the sub-pages, with rounded bottom corners matching the sheet. |

Black is used twice: the Grok Bots teaser (bots standing on breathing rings, as on /grok-bot) and the contact close.

## Sibling system
- The home now loads `assets/site.css` + `assets/site.js` (unchanged) and calls `KM.boot()`, like coffee, grok-bot and skills. Scan, reveal/stagger, hairline draw-in, parallax, live GitHub stars and the typed `kappaemme.dev` floor all run the same shared code. The ~200-line inline duplicate script is gone.
- **Header** is the sub-page `k-top--sub` bar: KM logo · home · skills · grok bots · coffee · on x ↗ · GitHub. The mobile menu sheet is gone because siblings don't have one. On the home the blue caret rests under "home" and slides to skills / grok bots / coffee while those teaser sections are in view (`data-spy` + `data-spy-none`, handled by site.js; "home" dims meanwhile via `:has`).
- **Footer** is the shared `k-floor` (index / more / elsewhere, typed wordmark, `↑ back to top`).
- Section navigation lost from the header lives in the hero as a listing: `$ ls ~/  projects/ skills/ grok-bots/ on-x/ stack/ journey/ coffee/ contact/`.

## Kept exactly
All texts, links, aria-labels, alt text, projects, 10 skills with `data-stars-repo` + fallbacks, X posts and figures, stack, journey, coffee, contact. Every `data-scan` (skills/coffee in nav, "See all skills", "More on the coffee page", footer) is kept: `use-Kappaemme's skill` / `cd ~/coffee`. Hero starts with "Building apps and tools." ("and tools." dimmed, like "Codex *skills.*" and "My Grok *Bots.*"). No name pill, no numbered section labels, system cursor.

## Checked (local server, headless Chromium)
- 390 / 375 / 1440: no horizontal overflow. On mobile every link/button is ≥44px tall. Body text is 16px+; mono meta goes up to 14px under 640px.
- Caret states per section; scan out to /skills and /coffee and the arrival scan back on home; live stars load.
- Keyboard focus shows the blue outline; no console errors. Under reduced motion all content is visible (0 hidden reveal elements); site.css switches off motion and the fixed floor.
- Contrast: body `--text-2` ≈ 6.7:1, meta `--text-3` ≈ 5:1, blue small text `#1A5FD6` ≈ 5.2:1 on paper, `#6AA1FF` on black. Bot labels use ink on blue (white on #2474F7 failed AA at that size).
