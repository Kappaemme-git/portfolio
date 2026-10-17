# kappaemme.dev restyle: design spec

> **Current direction: v3 hybrid (below).** Everything from v2 dark (sections further down) still applies unless v3 overrides it. That includes the motion, the caret motif, the components, the content and the accessibility. v3 changes only the **palette, the grounds and the colour blocks**, and makes internal links clean relative URLs.

---

## v3 hybrid

Francesco loves the v2 animations and interactions, but black-on-black was too much. v3 brings back the **light paper base** of the first version. Black appears only where it creates an effect, and the colour blocks of the old Grok Bot page come back. **Every v2 animation and interaction is kept exactly:**
- `~/` section labels;
- the nav caret underline;
- the `cd ~/grok-bots` busy label and blue scan transition;
- the boot log;
- the bot stage (eye tracking, blink, float, scroll sway and squash, tap hop);
- the typed `kappaemme.dev` floor with its blinking blue caret;
- the skills terminal;
- the system cursor (no custom cursor).

### v3.1 How it works: token scopes
`:root` now holds the **light** values of the same tokens the v2 components already use (`--bg`, `--raise`, `--text`, `--line`, …). Two scopes re-assign them:
- **Dark objects** (`.k-dark`, `.k-floor`, `.k-term`, `.k-stage`, `.gb-set`, `.gb-boot`, `.k-tile--night`, `.k-tile--panel`) get the v2 dark values back. Inside them every component looks exactly as in v2.
- **Blue blocks** (`.k-blue`, `.k-tile--blue`) get white-on-Limit-Coach-blue values.

So **no component CSS had to be rewritten.** Only the tokens and a handful of hard-coded dark colours changed.

### v3.2 Palette

| Token | Value | Use |
|---|---|---|
| `--paper` = `--bg` | `#F2F2EF` | Page ground on home, `/coffee`, `/grok-bot`; `theme-color` |
| `--paper-2` = `--raise-2` | `#E8E8E3` | Nested (X quote boxes) |
| `--card` = `--raise` | `#FFFFFF` | Cards, white tiles |
| `--ink` = `--text` | `#0A0A0A` | Type, primary buttons |
| `--text-2` / `--text-3` | ink 68% / 60% | Ledes (≈6.7:1) / meta and the dim half of headlines (≈5.0:1) |
| `--line` / `--line-2` / `--line-3` | ink 10% / 18% / 34% | Hairlines, rings |
| `--lc-text` | `#1A5FD6` (paper), `#6AA1FF` (dark), `#FFF` (blue) | `~/`, kickers, the 1.8M+ stat |
| `--night` | `#0A0A0A` | Terminal, stage, floor, scan fill, night tiles |
| `--panel` | `#161616` | "Under the hood" tile |
| `--lc` | `#2474F7` | Limit Coach blocks, nav caret, scan line, footer caret |
| `--live` | `#10A37F` | **Only** the small live/online dots and terminal ✓ |
| `--r-tile` | `28px` | Colour blocks |

**Tile family**, and nothing else:

| Class | Ground |
|---|---|
| `.k-tile--blue` | `#2474F7` |
| `.k-tile--white` | `#FFFFFF` + hairline |
| `.k-tile--night` | `#0A0A0A` |
| `.k-tile--panel` | `#161616` |

No green, red or coral tiles. Bot rules hold: Limit Coach never on blue (its chip sits on a night square), Crankobot only on dark or blue.

### v3.3 Where the dark and colour moments are (light dominates)

| Page | Paper | White | Blue `#2474F7` | Night `#0A0A0A` / Panel `#161616` |
|---|---|---|---|---|
| Home | hero, projects, skill list, on X, stack, journey, contact | skills teaser tile, project/post cards, coffee card | **Grok Bots teaser tile** (white type, white keycap with blue label) | terminal *object* inside the skills tile, bot stage *object* inside the blue tile, floor |
| `/coffee` | hero, contact | donation panel, "repeat" tile | "build" tile | "learn" tile, KM logo screen, floor |
| `/grok-bot` | hero, closing | **Crankobot tile** | **Limit Coach tile** | boot night frame, **stage band**, the Grok Bot app panels inside the tiles, **"Under the hood" panel tile**, floor |

### v3.4 Signature elements re-tuned for paper
- **Nav:** the scrolled top bar is paper 82% + blur with an ink hairline. The brand mark is no longer inverted. The blue caret underline is unchanged.
- **Buttons:** primary is an ink keycap with a paper label; on blue it is a white keycap with a blue label. Keycaps derive from `currentColor`, so they work on any ground.
- **Terminal:** stays a dark object (`--night`) with a soft drop shadow, sitting in a white tile.
- **Scan:** unchanged. A blue line sweeps down over a `--night` fill. On paper this reads as a deliberate dark wipe, and it hands off seamlessly to the boot's first (night) frame.
- **Floor:** dark `#0A0A0A` under the paper page. The page's rounded bottom lifts off it. The typed wordmark is off-white, ".dev" is dimmed, and the blue caret blinks.
- **Boot (`/grok-bot`):** the same log, now over **the old coloured intro frames** (0.4s each): night (`$ cd ~/grok-bots`), paper + Limit Coach (`limit-coach online`), blue + Crankobot (`crankobot online`). Then the scan sweeps down. See `../grok-bot/SPEC.md` §v3.

### v3.5 Clean relative URLs (works on raw.githack previews and Vercel)
Never use root-absolute paths (`/grok-bot/` breaks githack), and never `…/index.html`.

| From | To home | Sections | Coffee | Grok Bots |
|---|---|---|---|---|
| home (`index.html`) | `#top` | `#skills` etc. | `coffee/` | `grok-bot/` |
| `/coffee/` | `../` | `../#skills` etc. | `#top` | `../grok-bot/` |
| `/grok-bot/` | `../` | `../#products`, `../#skills` | `../coffee/` | `#library` |

The footer wordmark and "More of my work at kappaemme.dev" on sub-pages now use `../` with `data-scan`. Canonical and OG URLs stay absolute (`https://kappaemme.dev/…`).

### v3.6 Codex checklist (incremental, against commit 9de31fe)
Exact unified diffs are in **`design/restyle/v3-patches/`**. Each one was generated from the prototypes with the path mapping and verified with `git apply --check` on a 9de31fe worktree. You can apply them directly (`git apply design/restyle/v3-patches/*.patch`) or follow the list below.

**`assets/site.css`** (`assets-site.css.patch`; it is identical to `design/restyle/shared.css`):
- [ ] `:root`: `color-scheme: light`. Add `--paper --paper-2 --card --ink --night --panel --r-tile`. Re-point `--bg --raise --raise-2 --floor --text --text-2 --text-3 --line* --lc-text` to the light values (§v3.2).
- [ ] Add the **scope block** after the media queries: the dark scope selector list, the blue scope, `.k-tile` and its four variants.
- [ ] Remove hard-coded dark colours:

  | Rule | Change |
  |---|---|
  | `.k-skip`, `.k-btn`, `a:hover > .k-go` | `color: var(--bg)` |
  | `.k-top.is-scrolled` | `rgba(242,242,239,.82)` |
  | `.k-brand__mark img` | no `invert` |
  | `.k-brand:hover .k-brand__mark` | ink 5% |
  | `.k-btn:hover`, `.k-key`, `.k-btn--ghost*` | `color-mix(... currentColor / var(--text) ...)` |
  | `.k-scan__fill` | `var(--night)` |
- [ ] Nothing else changes: all animations, timings and the floor maths are untouched.

**`assets/site.js`:** no change.

**`index.html`** (`index.html.patch`):
- [ ] `theme-color` `#F2F2EF`.
- [ ] `.k-term`: `background: var(--night)` + drop shadow.
- [ ] `.k-stage`: `background: var(--night)`, 18px radius, drop shadow.
- [ ] `.k-tech:hover` uses ink 3%.
- [ ] Skills teaser: `k-card` → `k-tile k-tile--white`. Grok teaser: `k-card` → `k-tile k-tile--blue`.
- [ ] Stack icon colours for paper: C `#00599C`, React `#149ECA`, PostgreSQL `#4169E1`, Stripe `#635BFF`.
- [ ] Links: `grok-bot/index.html` → `grok-bot/`, `coffee/index.html` → `coffee/` (nav, sheet, teaser CTA, coffee fine print, footer).

**`coffee/index.html`** (`coffee-index.html.patch`):
- [ ] `theme-color` `#F2F2EF`.
- [ ] Why-donate cards: build → `k-tile k-tile--blue`, learn → `k-tile k-tile--night`, repeat → `k-tile k-tile--white`. The hover becomes a 3px lift.
- [ ] Links: `../index.html` → `../`, `../index.html#x` → `../#x`, `../grok-bot/index.html` → `../grok-bot/`.

**`grok-bot/index.html`** (`grok-bot-index.html.patch`; details in `../grok-bot/SPEC.md` §v3):
- [ ] `theme-color` `#F2F2EF`.
- [ ] Boot: add the three `.gb-boot__frame` layers (night / paper + `assets/limit-coach.svg` / blue + `assets/crankobot.svg`) and the new boot CSS. Timings: 0.4s per frame, scan at 1.25s, `--enter: 1.4s`. The log text colour follows the frame.
- [ ] Stage: `.gb-set` becomes the night band (`--r-tile`) with the actors only; the actors are pinned to grid columns 1 and 2.
- [ ] **Colour tiles:** `#gb-examples` → `#gb-tiles`. The render code builds one `article.gb-tile.k-tile` per bot, coloured from `bots.data.js` (`tile: blue → k-tile--blue`, `light → k-tile--white`, `dark → k-tile--panel`). Each tile holds the info (night chip with the mini avatar, name, subtitle tag, headline, body, handles, GitHub keycap, proof) and its Grok Bot app panel (`.gb-ex.k-dark`) at the bottom.
- [ ] "Under the hood": `.gb-hood` gets `k-tile k-tile--panel reveal` + padding.
- [ ] Mobile notch scales below 480px.
- [ ] Links: `../index.html*` → `../…`, `../coffee/index.html` → `../coffee/`. Closing "kappaemme.dev" and the floor wordmark use `../` + `data-scan` (was `https://kappaemme.dev/`).

**QA:**
- [ ] 390 / 768 / 1024 / 1440 with no overflow (the prototypes pass at 390 and 1440).
- [ ] Contrast spot-checks: ink-3 on paper and white-80% on blue are used for meta only.
- [ ] Reduced motion: no boot or scan, and the floor is static.
- [ ] On touch, tapping a bot makes it hop.
- [ ] Links work on raw.githack and Vercel.

### v3.7 Screenshots (`.shots/restyle-v3/`)
- **Home:**
  - `home-desktop-01…13`, plus `-full`;
  - `home-mobile-*` (sections, menu, footer lifting and revealed);
  - the scan, frame by frame: `home-scan-03-scan-1-busy`, `-04-scan-2-sweep`, `-05/06-arrive` (boot frames) and `-07-arrived`.
- **Coffee:** `coffee-desktop-*`, `coffee-mobile-*`.
- **Grok Bot:** `grok-desktop-01/02-boot-*`, `-03-hero`, `-04-library` (stage), `-05/06-gb-tiles` (colour tiles), `-07-hood`, `-09/10-stage-look-*` (eye tracking), `-11/12-footer`, plus `grok-mobile-*`.
- **Reduced motion:** `reduced-home-*`.

---

# v2 dark (superseded where v3 says so)

Design hand-off for the whole site: home, `/coffee` and `/grok-bot`. Codex implemented it at commit 9de31fe. The custom cursor described below was dropped in implementation; v3 keeps the system cursor.

| File | What it is |
|---|---|
| `shared.css` | **The shared dark system:** tokens, top bar, headers, keycap buttons, rows, bots, scan transition, floor footer, cursor, reduced motion. Becomes `/assets/site.css`. |
| `shared.js` | **The shared behaviour:** nav caret + scroll-spy, menu sheet, reveals, GitHub stars, bot avatars + stage physics, scan transition, floor reveal, cursor. One rAF loop. Becomes `/assets/site.js`. |
| `prototype.html` | Home (`index.html`) with all real content. |
| `coffee.html` | `/coffee` (`coffee/index.html`). |
| `../grok-bot/prototype.html` | `/grok-bot` (`grok-bot/index.html`); its own spec is `../grok-bot/SPEC.md`. |
| `../../.shots/restyle-dark/` | 67 screenshots: desktop 1440×900, mobile 390×844 @2x, every section, footer lifting and revealed, the scan transition frame by frame, the Grok Bot boot, the bot stage tracking the cursor, and reduced motion. |

Preview from the repo root with `python3 -m http.server`, then open `/design/restyle/prototype.html`. The three prototypes link to each other, so the scan transition and the boot intro can be tried for real (home → "Meet the bots").

---

## 1. Direction

**Black throughout.** The page is `#000`, type is off-white `#F3F3EF`, and the only colours are the bots (Limit Coach blue `#2474F7`, Crankobot white), the green "live" dot from the original site, and the real colours inside project art. There are no light sections anywhere, including the footer.

The personality comes from Francesco's own roots. The original site was a terminal/CRT page with an ASCII banner, so the whole system is built on **one motif: the caret.** It appears as:
- the cursor (a block caret);
- the active-nav marker (a blue caret bar);
- the skills terminal and its blinking caret;
- the page transition (a blue scan line);
- the boot log on `/grok-bot`;
- the footer wordmark, which types itself and ends in a blinking blue caret.

Section headers are un-numbered `~/path` labels.

The motion vocabulary Francesco likes is kept: staggered rise on load, 26px fade-up on scroll, hairlines that draw in, calm parallax, the footer revealed under the page. It is all transform/opacity only and off under reduced motion.

---

## 2. Diversification from reference (Tobia Donadon / previous version)

| # | Signature element | Before (Tobia-like) | After (Francesco's own) |
|---|---|---|---|
| 1 | Page ground | Light paper `#F2F2EF`, white cards, colour tiles | **Black** `#000`, near-black cards `#0B0B0B` with 1px hairlines, colour only from bots and project art |
| 2 | Primary CTA "Meet the bots" | White pill whose letters fly into a Crankobot face, grumpy brows, speech bubble | **Keycap button** (`label + ↵ key`). On click the label becomes a typed mono line `cd ~/grok-bots ▍`, then the **scan transition** runs (#3) |
| 3 | Page transition / intro | 6 full-bleed coloured layers with a word each, then a curtain lifts up (5.4s) | **Scan:** a 2px blue scan line sweeps **down**; black fills behind it on leave, and on arrival the new page is revealed behind the same line (0.6s + 0.75s). `/grok-bot` adds a 1s **boot log** (`$ cd ~/grok-bots` / `● limit-coach online` / `● crankobot online`) before the sweep. Skippable; once per session |
| 4 | Footer | Paper footer; "kappaemme" and ".dev" slide in from opposite sides; Limit Coach mark scales in | **Dark "floor"** `#0E0E0E` under a page with a rounded, hairline-edged bottom. Order is inverted: links on top, the **mono wordmark at the bottom types itself letter by letter** as the page lifts (".dev" dimmed), then a **blue block caret** blinks. A terminal-style status line closes it |
| 5 | Navigation | Floating centred dark pill + "lamp" + corner chips | **Full-width top bar:** KM monogram + mono `kappaemme`, mono lowercase links, a **blue caret bar** that slides under the active item, transparent at the top and blurred black after scroll. Mobile: `menu` button + full-screen sheet with `~/` links |
| 6 | Section headers | Numbered pill bars "01 Projects" … "08 Contact" | **Un-numbered `~/path` labels** (`~/projects`, `~/skills` …) with a mono count on the right |
| 7 | Display type | Geist **800**, very tight, single colour | Geist **600**, −0.045 to −0.058em, **two-tone headlines** (statement in off-white, continuation dimmed: "Building apps *and tools.*"), with many **Geist Mono** accents |
| 8 | Buttons, tags | Full pills, pill labels on photos | **12px-radius buttons with a keycap**, 7px mono tags, square arrow keys (`k-go`). No pill labels on the portrait: it gets a **figure caption** in mono |
| 9 | Hero | Centred crew of avatars + huge centred headline | Left-aligned editorial hero, matted portrait (a frame 7px outside the photo), mono links row |
| 10 | Project tiles | Full-colour 2rem tiles with H3 + pill + floating art | **Spec-sheet cards:** brand-coloured "screen" with the art, then the name, line and a mono `type / open` spec table |
| 11 | Stat tiles | Colour blocks (white / blue / ink) | **Inline stats on hairlines**, the views figure in blue |
| 12 | Stack | Rounded tiles with gaps | **Hairline cell grid** (no radius, no gaps) |
| 13 | Bots | Gallery of tiles + centred crew + dashed "Next bot / Soon" slots | **A stage:** two large bots side by side on a horizon line, each on a breathing ring; eyes track the pointer, blink, float, and **sway and squash with scroll velocity**. **No empty slots anywhere** |
| 14 | Skills | Plain list | **Terminal teaser** (`ls --most-starred`, `ls --recent`): lines type in when it scrolls into view, live star counts, blinking caret; then the full list |
| 15 | Cursor | Round dot that grows | **Block caret** (9×17) that becomes a 34px rounded square over links and turns blue over Limit Coach |

---

## 3. Tokens (`shared.css :root`)

**Colour**

| Token | Value | Use |
|---|---|---|
| `--bg` | `#000000` | Every page, `theme-color` |
| `--raise` | `#0B0B0B` | Cards |
| `--raise-2` | `#141414` | Nested panels (quote boxes, Grok Bot files) |
| `--floor` | `#0E0E0E` | Footer floor |
| `--text` | `#F3F3EF` | Primary text |
| `--text-2` | `rgba(243,243,239,.66)` | Ledes, descriptions (≈8:1) |
| `--text-3` | `rgba(243,243,239,.50)` | Meta, mono labels, dim half of headlines (≈4.8:1) |
| `--line` / `--line-2` / `--line-3` | white 9% / 16% / 30% | Hairlines, card rings, hover rings |
| `--lc` | `#2474F7` | Limit Coach, nav caret, scan line, focus ring, footer caret, `::selection` |
| `--lc-text` | `#6AA1FF` | Blue for **small** text on black (`~/`, kickers, the 1.8M+ stat) (≈7.8:1) |
| `--live` | `#10A37F` | Live dots, terminal ✓, boot "online" (the original site's green) |
| `--zac`, `--vibe`, `--me`, `--stripe` | `#0B193E`, `#613F6D`, `#8D85C0`, `#635BFF` | Project screens, portrait placeholder, Stripe dot |

Stack icons keep their original brand colours, which now read on black again. PostgreSQL is lifted to `#6C8FEF` and Stripe to `#7A73FF` for contrast.

**Type** (Geist 400–700 + Geist Mono 400–600; weight 800 is no longer needed)

| Role | Size | Weight / tracking |
|---|---|---|
| H1 (hero, coffee, grok) | mobile `clamp(3.3rem, 13.6–14.4vw, 7.75rem)`, ≥640 `clamp(4.6rem, ~9.4vw, 7.5–7.75rem)` | 600 / −.058em, lh .93 |
| Section H2 `.k-h2` | `clamp(2.4rem, 5.8vw, 4.75rem)` | 600 / −.045em, lh 1 |
| Closing H2 (contact, grok close) | `clamp(3rem, 7.6vw, 6.2rem)` | 600 / −.055em, lh .95 |
| Card names, roles | 1.6rem / `clamp(1.75rem, 3.2vw, 2.5rem)` | 600 / −.035 to −.04em |
| Lede | 1.08 → 1.16rem (hero 1.1 → 1.28rem) | 400 |
| Mono labels | .7–.8rem Geist Mono | 500 |
| Footer wordmark | `clamp(2.3rem, 10.2vw, 9.75rem)` **Geist Mono** | 500 / −.045em |

Two-tone rule: `<span class="k-dim">` holds the second half of a headline. Use it only on H1s and closing H2s.

**Shape and space:** cards 16px, buttons and screens 12px (inner screens 10px), keycaps and tags 7px. Container 76rem + gutter 1.25rem (<640) or 2rem. `--section-y` is 6 / 8 / 9rem. Top bar 64px. Floor 34rem (<768) or 30rem.

**Motion:** `--ease-out cubic-bezier(.22,1,.36,1)`, `--ease-soft cubic-bezier(.2,.8,.2,1)`, `--ease-io cubic-bezier(.65,0,.35,1)` (scan), `--spring` (bot hop only). `--enter` offsets every entrance while a scan or boot plays.

---

## 4. Components

| Component | Spec |
|---|---|
| **Top bar** `.k-top` | Fixed, 64px, transparent; `.is-scrolled` (scrollY > 8) adds black 74%, blur 14px and a bottom hairline. Brand = 34px KM monogram tile + mono `kappaemme`. Links are mono .78rem, `--text-3`, and white when hovered or current. **Caret** `.k-caret`: a 2px blue bar under the current link, `translateX + scaleX` .5s `--ease-out`. GitHub chip ≥1280. |
| Home nav | Eight links (projects, skills, grok bots, on x, stack, journey, coffee, contact), scroll-spied (`rootMargin -45% 0 -54% 0`, hero = none). "grok bots" goes to `/grok-bot` with the scan. Below 1024 a `menu` button opens `.k-sheet`: a full-screen black sheet, `~/` + 2.6rem links, 32ms stagger, `inert` when closed, Esc closes. |
| Sub-page nav `.k-top--sub` | Back arrow + monogram (name hidden <640) → home; four links **home · grok bots · coffee · on x ↗**, current one has the caret (`aria-current="page"`); short labels <640 (`home bots coffee x`). |
| Header `.k-head` | `~/path` (blue `~/`) + mono count right; H2 cols 1–7, lede cols 8–12 ≥1024. |
| Buttons `.k-btn` | Off-white with black label + keycap `.k-key` (mono glyph or icon, inset bevel, presses 1px on `:active`). `--ghost` is a hairline variant, `--plain` has no keycap. Hover lifts 1px. Busy state (scan links with `data-busy-text`): label hidden, mono text + blinking caret. |
| Card `.k-card` | `#0B0B0B`, 16px, inset 1px `--line`; hover ring `--line-3`. |
| Row `.k-row` | Hairline-topped grid: main (name + desc) · meta (tags) · `k-go` square arrow key (fills off-white on hover). Hairlines draw in (`.k-grow`, 90ms stagger). |
| Project card `.k-proj` | 8px inset card: brand screen 16:10.5 with a mono type tag and the art (ZAC icon 22.5% radius; VibeDesk round), then name, line and the `type / open` spec table in mono. |
| Terminal `.k-term` | `#050505` panel, mono .8rem, header `~/codex-skills · Kappaemme-git`, `$` commands in blue, ✓ in green, name (ellipsis), live star count or `recent`. Every line is a link to its repo. Lines animate in (`term-in` .45s, 70ms stagger) when 20% in view; the final caret blinks at 1s. |
| Stage `.k-stage` / `.gb-set` | `#050505` panel; actors `.k-actor` = inline SVG avatar + hairline ring (blue for Limit Coach) that breathes with the bob; mono caption under each. |
| Floor `.k-floor` | See §6. |
| Cursor `.k-cursor` | Fine pointers only. 9×17 off-white block; over links, buttons and bots it becomes 34px / 10px radius / white 10% with a 55% ring; blue + glow over Limit Coach (`[data-cursor-blue]`). Spring k1100 c52 m.3. |

---

## 5. Signature interaction: the scan

**Leaving a page** (any `a[data-scan]`: "Meet the bots", the cross-page nav, footer and wordmark links):
1. 0ms: `data-busy` → the label swaps to the `data-busy-text` mono line with a blinking caret (only on buttons that have it).
2. 180ms: `.k-scan.is-out`. The fill `scaleY(0→1)` (origin top) and the line `translateY(-6px → 100vh)` run over .6s `--ease-io`.
3. 820ms: `sessionStorage.k-scan = 1`, then navigate.

Modifier clicks, middle clicks and reduced motion navigate normally. `pageshow` (bfcache) resets the state.

**Arriving** (head inline script): if `k-scan` is set, set `html[data-scan="in"]` before first paint. The fill and line continue down (`translateY(0 → 100%)` / `0 → 100vh`, .75s); `--enter: .45s` delays the hero rise so it surfaces behind the line. `/grok-bot` plays the **boot** instead (see `../grok-bot/SPEC.md`).

Frames: `.shots/restyle-dark/home-scan-03…07-*`.

---

## 6. The floor (footer)

- **Placement:** `position: fixed` under the page; `body { padding-bottom: var(--floor-h) }`. `.site-content` has a rounded bottom (28/40px) and `box-shadow: 0 1px 0 var(--line-2)`, so the page reads as a sheet lifting off a slightly lighter floor.
- **Reveal:** `--reveal` (0→1) is measured on scroll in rAF (same maths as before).
  - Lead and link columns rise with `(r − .05 − .08i)·6`, 18px.
  - **Wordmark letters** each reveal with `(r − .42 − .03i)·12` (opacity + .2em rise). It is typed left to right, ".dev" dimmed.
  - The **caret** fades in at `(r − .86)·10`. At `r ≥ .92` the floor gets `.is-typed` and the caret blinks (1.1s steps).
  - The top bar fades out while the floor is open.
- **Content:**
  - lead line;
  - three mono columns: `index` · `more` · `elsewhere` (on /grok-bot: `index` · `bots` · `elsewhere`);
  - the wordmark: home → `#top`, sub-pages → `/` (production: `https://kappaemme.dev/`);
  - status line: `© 2026 Francesco Mistero · Made one commit at a time.` (coffee: `· Created by Kappaemme`) + `↑ back to top`.
- **Reduced motion:** static, in flow, fully shown.

---

## 7. Home, section by section (`prototype.html`)

Order: hero · projects · skills (teaser + list) · grok bots (teaser) · on x · stack · journey · coffee · contact · floor.

1. **Hero** `#top` (`data-spy-none`):
   - eyebrow "Francesco Mistero · aka Kappaemme";
   - H1 "Building apps *and tools.*";
   - lede "**CS student at Federico II.** I build iPhone apps, websites and open-source tools, and share what I learn through Codex skills.";
   - keycap CTAs "See my work ↓" / "Get in touch @";
   - mono links github / x / email;
   - right: matted portrait (4:5 desktop, 5:4 mobile) with caption "● Building in public since October 2025 · @Kappaemmedev", parallax ×0.05.
2. **`~/projects`** `#products`:
   - "Selected work." + the original lede;
   - spec cards **Metodo ZAC** (iPhone app → App Store) and **VibeDesk** (Web app → website), art parallax −0.04;
   - "More work" hairline rows **metodo ZAC · website**, **pocketflow**, **glorydraw** (original capitalisation), each with a type tag and a live dot.
3. **`~/skills`** `#skills`:
   - **Teaser card**: "My Codex skills." Lede built only from existing skill descriptions: "Open-source skills for Codex, from finding first customers to auditing an iOS app before App Store submission. Recent releases and the ones developers have starred most."
   - CTAs "See all ten ↓" (→ `#skill-list`) and "On GitHub" (→ repositories).
   - The terminal lists the 5 most-starred skills (with live stars) and the 5 recent ones.
   - **`#skill-list`**: two columns, Most starred (star tags) and Recent releases, with the original descriptions.
4. **`~/grok-bots`** `#grok-bots`:
   - **Teaser card**, flipped (stage left, copy right): "My Grok Bots." + the `/grok-bot` lede.
   - "Meet the bots ↵" (scan, busy text `cd ~/grok-bots`) and "New ones land there first."
   - Mini stage with **only Limit Coach and Crankobot**: eyes track, scroll sway, captions "Claude + Codex limits" / "First Customer Finder". No placeholder.
5. **`~/on-x`** `#shared`:
   - "Shared by Greg Brockman." + the original intro;
   - inline stats 5 / **1.8M+** / 10K+;
   - five dark post cards (grid ≥1024, scroll-snap carousel below);
   - the date note.
6. **`~/stack`**: "The stack." + hairline grid of 12 (6 / 4 / 3 columns).
7. **`~/journey`**: "The journey so far." Two entries in a 4/8 grid (mono date | role, org, the original points with mono dashes).
8. **`~/coffee`**: card with "Support the next build.", the original lede, "Buy me a coffee" (Stripe), "My work", "Contact me", "Donations go through Stripe · the coffee page →" (scan), and the Build / Learn / Repeat list.
9. **`~/contact`** (last): "Got a project or an idea? *Let's talk.*", the original sub-line, and hairline rows for email / x / github.

---

## 8. `/coffee` (`coffee.html`)

Black, unified with the rest:
- **Chrome:** sub-page top bar.
- **Hero:**
  - left: "● CS Student & Indie Hacker", H1 "Support *the next build.*", mono sub "A tiny backing page for Kappaemme", the original intro, and **Donate with Stripe** (keycap cup, `#donateHero` + the original `stripeDonationLink` fallback), "My work" (scan → `/#products`), "Contact me".
  - right: a card with the `km-logo.png` screen (`#0B0B09`, `clip-path: inset(1px)` hides the PNG's border), "support page" tag, "Support my next project.", the original text, and the Stripe line.
- **`~/why-donate`:** "Why it helps." with three dark cards (build / learn / repeat, original copy).
- **`~/contact-me`** (last): "Write me *directly.*" with rows Email ("Write me directly" / misterokappa12@gmail.com) and GitHub ("See the code" / github.com/Kappaemme-git).
- **Floor:** wordmark → home.

The old fonts (Outfit, Space Mono, DM Sans) and the purple glow / dot grid are removed.

---

## 9. Codex checklist

Work on `portfolio-restyle`. Do not merge to `main` without Francesco's approval. Keep every SEO / OG / Twitter tag and the Vercel Analytics snippet.

### Shared
- [ ] Add `/assets/site.css` = `design/restyle/shared.css` and `/assets/site.js` = `design/restyle/shared.js`, verbatim. Load `site.css` in `<head>`, then `/grok-bot/bots.data.js` (home and grok-bot only), and `site.js` at the end of `<body>` followed by `KM.boot()` (grok-bot calls it after rendering, see its spec).
- [ ] Fonts: `Geist:wght@400;500;600;700` + `Geist+Mono:wght@400;500;600`.
- [ ] `<meta name="theme-color" content="#000000">`.
- [ ] In `<head>`, before the stylesheet, add the inline script from `prototype.html`: it adds `html.js` and handles scan arrival. `/grok-bot` uses its boot variant instead.
- [ ] Every page gets, right after `<body>`: the icon sprite, `.k-skip`, `.k-cursor` and `.k-scan` (fill + line).
- [ ] Path mapping from the prototypes:

  | Prototype path | Production path |
  |---|---|
  | `../../images/` | `/images/` |
  | `../../coffee/km-logo.png` | `/coffee/km-logo.png` |
  | `prototype.html` | `/` |
  | `coffee.html` | `/coffee/` |
  | `../grok-bot/prototype.html` | `/grok-bot` |
  | `../restyle/…` (from grok-bot) | `/…` |
  | footer wordmark on sub-pages | `https://kappaemme.dev/` |
- [ ] Remove everything light from the previous restyle: `--paper` tokens, `.k-chip*`, `.k-nav` pill + lamp, `.k-bar` / `.k-index` numbered bars, `.site-footer` paper footer, `.gb-cta` wake-up CTA and `.gb-bubble`.

### `index.html`
- [ ] Header → `.k-top` (brand, `.k-links` with `data-spy`, `.k-caret`, `.k-top__gh`, `.k-menu`) + `#k-sheet`. The "grok bots" link and sheet item get `data-scan`.
- [ ] Wrap content in `.site-content > main#main`. Each section becomes markup exactly as in `prototype.html`, in this order: hero (`#top`, `data-spy-none`), `#products`, `#skills` (teaser + `#skill-list`), `#grok-bots`, `#shared`, `#stack`, `#journey`, `#coffee`, `#contact`.
- [ ] **Remove all numbered labels** (`01`–`08`, `k-index`). Use `.k-path` (`<b>~/</b>name` + optional `.k-count`).
- [ ] Project names keep the original capitalisation: "Metodo ZAC", "VibeDesk", "metodo ZAC · website", "pocketflow", "glorydraw".
- [ ] Skills: the terminal star cells use `data-stars-repo` + `data-stars` + `data-stars-short` (number only); list rows keep `data-stars-repo` with an inner `[data-stars]`. One fetch updates both (`KM.loadStars`). Fallbacks: 1k+, 900+, 900+, 150+, 70+.
- [ ] Grok teaser: actor markup `<div class="k-actor" data-bot="…"><div class="k-actor__body"><span data-bot-slot="…"></span></div><span class="k-actor__ring"></span></div>`. Two actors only. `KM.paintBots` renders the SVGs from `bots.data.js`. The CTA is `<a class="k-btn" href="/grok-bot" data-scan data-busy-text="cd ~/grok-bots">`.
- [ ] Footer → `.k-floor` (home variant: wordmark `href="#top"`). Delete the old footer script; the floor reveal lives in `site.js`.
- [ ] Remove the old inline scripts (reveal, stars, wake CTA, lamp) and keep only `KM.boot()`.
- [ ] Update `README.md` (dark system, caret motif, `~/` headers, scan, floor).

### `coffee/index.html`
- [ ] Chrome → `.k-top.k-top--sub`, with "coffee" current and home / grok bots links `data-scan`.
- [ ] Hero, `#why`, `#contact` and floor markup as in `coffee.html`. Keep `#donateHero` and the `stripeDonationLink` script, then `KM.boot()`.
- [ ] Drop the Outfit / Space Mono / DM Sans fonts and all the old CSS.

### `grok-bot/index.html`
Follow `design/grok-bot/SPEC.md` §9. In short:
- [ ] replace the curtain with the boot + scan;
- [ ] replace the floating pill + chips with `.k-top--sub`;
- [ ] replace the hero crew, library tiles, ghost slots and sticky bar with the left-aligned hero + **stage**;
- [ ] replace the paper footer with `.k-floor`;
- [ ] remove the wake CTA everywhere.

### QA
- [ ] No horizontal overflow at 390 / 768 / 1024 / 1280 / 1440 (the prototypes pass at 390 and 1440). No orphan words in headings.
- [ ] Keyboard: skip link → top bar → menu (Esc) → every link shows the blue focus ring → footer links scroll the floor into view.
- [ ] Reduced motion:
  - no scan, boot, rise, reveal, parallax, sway or blink;
  - the floor is static and in flow;
  - the terminal lines are visible immediately;
  - scan links navigate directly.
- [ ] GitHub API blocked → star fallbacks show.
- [ ] Touch: bots react to taps (eyes look, boop), nothing is hover-only, and the info is always visible.
- [ ] Performance: one rAF loop that pauses when the tab is hidden; actors update only while intersecting; transforms only.

---

## 10. Accessibility
- Contrast on black: text ≈18:1, `--text-2` ≈8:1, `--text-3` ≈4.8:1 (meta only), `--lc-text` ≈7.8:1. White on the ZAC / VibeDesk screens is above 8:1.
- Focus: 2px blue outline with 3px offset.
- Landmarks: skip link, `nav[aria-label]`, `main#main`, `aria-labelledby` on every section, and the footer labelled.
- Bot SVGs are `aria-hidden`; the names are real text. The terminal is `role="group"` with a label, and its decorative command lines are `aria-hidden`.
- The scan and boot overlays are `aria-hidden` and never trap focus. The boot is skippable with any key, wheel, touch or click.
- The menu sheet is `role="dialog"`, `aria-modal`, `inert` when closed, and returns focus on Esc.

---

## 11. Content audit
- **Kept verbatim:**
  - all projects, links, descriptions and images (with the original capitalisation);
  - all ten skills, descriptions and star fallbacks;
  - the five X posts, figures and date note;
  - the 12 stack items;
  - the journey entries;
  - the coffee lede, Stripe URL, reasons and panel copy;
  - the contact copy, email, X, GitHub, © and "Made one commit at a time."
- **New labels (no new claims), for Francesco to approve:**
  - Headings: "Building apps and tools." (from the tagline), "Selected work.", "My Codex skills.", "The stack.", "The journey so far.", "Why it helps."
  - Path labels: the `~/…` labels.
  - Small UI lines: "Building in public since October 2025" (from Journey); the terminal commands `ls --most-starred` / `ls --recent`, which are UI chrome, not claims; "stars refresh from GitHub"; "2 online".
  - The skills teaser lede, built only from existing descriptions.
- **Removed:**
  - the dashed "Next bot / Soon" placeholders (no empty slots anywhere);
  - the numbered section labels;
  - the light paper base.
