# Grok Bot library — design spec

Design hand-off for the `/grok-bot` page of kappaemme.dev. The production implementation is in `../../grok-bot/`; this folder remains the visual reference.

| File | What it is |
|---|---|
| `prototype.html` | Working design prototype. All CSS and JS are inline; it reads the shared data file in `../../grok-bot/`. Final copy. |
| `../../grok-bot/bots.data.js` | **Single data file.** `window.GROK_BOTS` is an array, one object per bot; the production route and prototype read the same file. |
| `assets/` | SVG avatars: static, self-animated, Grok Bot panel previews and the empty-slot ghost. |
| `../../.shots/grok-bot/` | Desktop (1440×900) and mobile (390×844 @2x) screenshots of every section, the intro frames and the interaction states. |

Open it from the repository root with `python3 -m http.server` → `http://localhost:8000/design/grok-bot/prototype.html`. Opening the file directly with `file://` also works, apart from the favicon.

---

## 1. References and what was taken from each

1. **Primary: tobiadonadon.com, "Viral Machine" page.** I studied its HTML, CSS and JS chunks and took screenshots every 450px of scroll and every 0.1–0.5s of the intro. Its structure, rhythm, timings and easings are copied **1:1** (values are in §4). Its text, assets, colours and brand were not copied.
2. **Bot look: the Grok Bot app avatars** (Francesco's screenshots `limitcoach_avatar_ref.png` and `crankobot_avatar_ref.png`). Shapes, eye positions and eye tilt were measured from the pixels (§3).
3. **Secondary: cursor.com/download/bot.** It shows warm off-white grounds, dark pill buttons, regular-weight sans headings and a quiet grey subline. These inform the light grounds (`#F2F2EF`) and the pill buttons.
   `x.ai/bot` returned **HTTP 403 (Cloudflare)** to both headless Chrome and WebFetch, so I could not study it directly.

No SpaceXAI, xAI or Cursor logos or marks are used. "Grok Bot" appears only as text, and the page links to https://x.ai/bot.

---

## 2. Colour

Black and white. **The only strong colour is Limit Coach blue.**

| Token | Value | Use |
|---|---|---|
| `--page` | `#000000` | Page ground (same as kappaemme.dev `--bg`) |
| `--ink` | `#0A0A0A` | Near-black intro layer, text on light grounds |
| `--panel` | `#161616` | Grok Bot app panel, dark tiles, nav pill (72% alpha) |
| `--panel-2` | `#1F1F1F` | Cards inside dark panels |
| `--paper` | `#F2F2EF` | Light tiles, light intro layers, footer |
| `--text` | `#FFFFFF` | Primary text |
| `--text-2` | `rgba(255,255,255,.62)` | Secondary text / ledes |
| `--text-3` | `rgba(255,255,255,.40)` | Tertiary / fine print |
| `--line` / `--line-2` | `rgba(255,255,255,.10)` / `.22` | Hairlines, chip borders |
| **`--lc`** | **`#2474F7`** | **Limit Coach.** Measured from the app avatar. Francesco's brief said "about #2F6BFF"; the pixel value is `#2474F7`. |
| `--lc-glow` | `rgba(36,116,247,.45)` | Glow on notch eyes, label hover and cursor over Limit Coach |
| Eyes | `#050505` | Eyes of both bots |

Rules:
- Limit Coach only sits on **dark or light** grounds, never on blue, so it always reads as the blue circle with black eyes.
- Crankobot only sits on **blue or dark** grounds, never on light, so it always reads as the white blob with black eyes.
- **No gradients, outlines or mouths on avatars.** The only exception is the empty-slot ghost, which is a dashed outline because it is not a bot.

---

## 3. Avatars (SVG, 100×100 viewBox)

Rendered by `gbAvatar(bot)` in the prototype, and as files in `assets/`.

**Limit Coach.** `<circle cx=50 cy=50 r=45 fill=#2474F7>`. Two capsule eyes, rotated −37°, sitting top-centre/right. The far eye is thinner and slightly shorter, like a sphere looking up and to the right.
- eye A: centre (55, 35), 10 × 21
- eye B: centre (75.5, 26), 7 × 19

**Crankobot.** A soft blob, slightly wider than tall (≈ 93 × 85.5):
`M50 8.5C76.5 8.5 96.5 27.5 96.5 51.5C96.5 75.5 77 94 50.5 94C24 94 3.5 76 3.5 52C3.5 28 23.5 8.5 50 8.5Z`, fill `#FFFFFF`. Two oval eyes, rotated −22°, top right.
- eye A: centre (59, 38), 9 × 20
- eye B: centre (78.5, 32.5), 6.5 × 19

Instance structure (each layer is animated independently):

```
svg.gbot[data-bot]
 └ g.gbot__squash      ← hover hop / click boop (transform-origin: bottom)
   └ g.gbot__bob       ← float
     ├ body
     └ g[clip-path=body]  ← eyes can never leave the body
       └ g.gbot__look     ← cursor follow (JS translate)
         └ g.gbot__blink  ← blink (scaleY)
           └ rect × 2
```

Add `.gbot--alive` to make an instance bob and blink. The intro avatars stay static, as in the reference.

The Grok Bot panel look (`assets/*-panel.svg`, `.gb-panel`): avatar centred on `#161616`, radius 24px (1.6rem in the page), name in white Geist 500 at ~19px, subtitle in `#8A8A8A` Geist 400 at 13px.

---

## 4. Motion (values lifted from the reference unless marked *new*)

### Easing tokens
| Token | Value | Where |
|---|---|---|
| `--spring` | `linear(0, .42 9%, .84 21%, 1.02 33%, 1.05 41%, 1.01 55%, .99 70%, 1)` | Every pop: intro bots and words, hero crew, notch morph |
| `--curtain-out` | `cubic-bezier(.7, 0, .2, 1)` | Curtain lift |
| `--ease-out` | `cubic-bezier(.22, 1, .36, 1)` | Reveals, rises, hops |
| `--ease-soft` | `cubic-bezier(.2, .8, .2, 1)` | Hairline draw-in |
| `--pop` | `cubic-bezier(.3, 1.7, .5, 1)` | CTA face, label hover, stat hover |

### Intro curtain (`.gb-intro`, fixed, z 2000)
- **6 layers**, layer *i* appears at `i × 0.9s` (each turns visible with a 1ms step animation).
- Background tint steps with `step-end` across the 5.4s: `#0A0A0A → #2474F7 → #F2F2EF → #161616 → #2474F7 → #F2F2EF`.
- Bot: `intro-pop-bot` 0.62s `--spring`, delay `i×0.9s`, from `translateY(40%) scale(.4)` and opacity 0 (opacity reaches 1 at 30%). In the duo layer the second bot follows 70ms later.
- Word: `intro-pop` 0.56s `--spring`, delay `i×0.9s + 90ms`, from `translateY(.14em) scale(.8)`.
- Caption "Kappaemme · Grok Bots" at the bottom, 0.95rem/700, 70% opacity.
- **Curtain lift:** at **5.4s**, `translateY(-100%)` over 0.65s with `--curtain-out`.
- **Skip:** the first `wheel`, `touchmove`, `keydown` or `pointerdown` sets `[data-done]`, and the curtain lifts immediately over 0.45s. JS then restarts the crew, rise, nav and chip animations so they still play instead of jumping to their end state.
- `meta[name=theme-color]` follows each layer's ground, then returns to `#000`.

| # | Ground | Bot | Word |
|---|---|---|---|
| 0 | `#0A0A0A` | Limit Coach | Watches my limits. |
| 1 | `#2474F7` | Crankobot | Finds first customers. |
| 2 | `#F2F2EF` | Limit Coach | Lives in the notch. |
| 3 | `#161616` | both | Runs on Grok Bot. |
| 4 | `#2474F7` | Crankobot | Reads public demand. |
| 5 | `#F2F2EF` | Limit Coach | Built in public. |

### After the curtain
- **Nav pill and chips:** `nav-in` 0.4s ease-out at 5.6s (0.3s with no delay after a skip).
- **Hero crew:** `crew-in` 0.56s `--spring`, delay `5.75s + i×80ms`, from `translateY(1.2rem) scale(.6)`.
- **Hero copy (`.gb-rise`):** 0.7s `--ease-out`, `translateY(14px)` to 0, delays 0.05 / 0.15 / 0.25 / 0.32 / 0.38 / 0.5s after the curtain.

### Living bots
| Behaviour | Spec |
|---|---|
| Float | `bot-bob` 3.4s ease-in-out infinite, `translateY(-6%)` at 50%. Delays are staggered by −1.1s per instance. |
| Blink | `bot-blink` 5.6s infinite, `scaleY(.12)` at 96%. Delays are staggered by 1.3s (mod 5.6). |
| Eyes follow cursor | Up to ±6 units on x and ±5 on y in the 100 viewBox, scaled by `min(1, distance/320px)`. A frame-rate-independent lerp, `1 − 0.0009^dt`, gives roughly a 120ms catch-up. |
| Idle glance | After 3.5s with no pointer movement (and always on touch), eyes pick a random target every 1.4–3.6s, returning to centre 35% of the time. |
| Hover hop | `bot-hop` 0.62s `--ease-out`: squash `1.12/.86` → jump `−16%` + stretch `.92/1.1` → land `1.06/.94` → settle. Plays together with a double blink (`bot-blink2`, 0.42s). |
| Click boop | `bot-boop` 0.8s: bigger squash `1.18/.8`, jump `−30%` with `rotate(−8°)`, land, settle. |

### Scroll
- **Native scroll, no smooth-scroll library**, as in the reference. Anchors use `scroll-behavior: smooth`.
- **Reveal (`.reveal`):** elements below 92% of the viewport at load are armed with `opacity 0, translateY(26px)`. An IntersectionObserver (`rootMargin 0 0 -12% 0`, threshold .15) adds `.reveal--in`: opacity 0.85s and transform 0.9s, both `--ease-out`. Art inside (`.reveal__art`) follows 0.12s later from `translateY(16px) rotate(−3.5°) scale(.94)`. Sibling tiles are staggered by 80ms. After 1.1s the reveal classes are removed so hover transitions stay snappy.
- **Hairlines (`.gb-grow`):** `scaleX(0 → 1)` over 1.1s with `--ease-soft`, staggered 90ms per row, when the list enters the viewport.
- **Parallax:** single rAF loop that does all reads first, then all writes, transforms only.
  - Hero crew: `scrollY × 0.12`
  - Hero title: `scrollY × 0.06` (hero only, so the content lags slightly)
  - Bot panels in tiles: `(offset from viewport centre) × −0.05`
- **LimitNotch mock:** the notch morphs from 9.6 × 1.45rem to 15 × 8.6rem (`--spring` 0.55s) when fully in view, and springs again on hover. Its eyes glance down and grow; the reading fades in after 0.18s.
- **Footer reveal:** the footer is fixed underneath the page and `body` has `padding-bottom: var(--footer-h)` (40rem mobile, 36rem desktop). As the page lifts off, `--reveal` goes from 0 to 1:
  - footer text rises (`(reveal − .04 − .09·i) × 6`, 20px)
  - the rule draws in (`(reveal − .56) × 3.4`)
  - "Keep" and "building." slide in from opposite sides (`(reveal − .6/.66) × 3`, 5vw)
  - the Limit Coach mark scales in (`(reveal − .62) × 4`)
  - the corner chips hide while the footer is open
- **Mobile sticky bar:** appears when the hero has scrolled away, hides when the closing section arrives, 0.5s `--ease-out` with a 1.5rem slide.

### Interactions
- **CTA "wakes up" into Crankobot:** on click, each letter flies to the button centre (`--dx/--dy`, 0.36s `cubic-bezier(.55,0,.35,1)`, staggered 10ms per letter, fading after 0.12s). The pill shrinks to a circle (`width: var(--h)`, 0.4s `cubic-bezier(.6,0,.25,1)`, delay 0.18s). Two black eye pills then pop in with `--pop` (delay 0.3s), so the white pill becomes Crankobot's face.
  After 700ms, grumpy brows rotate in (±28°), the button huffs (0.42s shake), and a speech bubble pops for 1.8s with `bubble` keyframes: scale .4 → 1.08 → 1, then drifts up 10px and fades. The lines are new copy, cycling. The hero CTA then smooth-scrolls to `#library` after 950ms.
- **Idle ring on the hero CTA:** 2.8s, white 28% box-shadow growing to 14px and fading.
- **Custom cursor (fine pointers only, disabled with reduced motion):** a 16px dot that grows to 48px at 22% fill over anything interactive. It is ink-coloured over light grounds (`[data-cursor-ink]`) and **turns Limit Coach blue with a glow** over Limit Coach (`[data-cursor-blue]`). It follows a spring (stiffness 1100, damping 52, mass 0.3, two sub-steps per frame); size and colour transitions take 0.18s with `--ease-out`.
- **Nav lamp:** a 32 × 5px white bar resting on the active pill item, with a soft radial glow below. It slides between items over 0.5s with `--ease-out`.
- **Stat tiles:** hover lifts 3px and tilts −1° with `--pop`. Tile links lift 1px and their arrow nudges 2px up-right.

### `prefers-reduced-motion: reduce`
- **Intro:** layers fade (no pop, no lift) and the curtain fades out instead of sliding.
- **Bots:** no bob, blink, hop, eye follow or parallax.
- **Page:** reveals are shown immediately, the crew and copy appear without animation, the CTA does not transform, and the bubble does not move.
- **Footer:** static, in normal flow.
- **Cursor:** the system cursor stays.

---

## 5. Typography

**Geist**, the repo's existing font, at 400–800 (the prototype adds weight 800 to the Google Fonts request), plus **Geist Mono** for badges and small UI. The reference uses Host Grotesk 800. Geist 800 with the same tracking gives the same dense, heavy look while staying in Francesco's system. If Francesco wants it even closer, Host Grotesk is the drop-in swap.

| Role | Size | Weight | Line height | Tracking |
|---|---|---|---|---|
| Intro word | `clamp(2.9rem, 10.5vw, 8.5rem)`, max 11ch | 800 | .92 | −.045em |
| Hero H1 | `clamp(3.4rem, 11vw, 9rem)` | 800 | .88 | −.055em |
| Hero sub | 1.08 → 1.3 (≥640) → 1.45rem (≥768) | 500 | 1.45 | −.01em |
| Section H2 | `clamp(2.5rem, 7vw, 5rem)` (builder `clamp(2.6rem, 7.4vw, 5.6rem)`) | 800 | .95 | −.05em |
| Tile H3 | `clamp(2rem, 4.4vw, 2.9rem)`, featured `clamp(2.6rem, 4.6vw, 3.9rem)` | 800 | .98 | −.045em |
| Closing H2 | `clamp(3rem, 7.5vw, 5.8rem)` | 800 | .92 | −.055em |
| Footer words | `clamp(3rem, 12.5vw, 9rem)` | 500 | .88 | −.045em |
| Lede | 1.15rem (builder 1.12 → 1.25) | 500 | 1.5 | −.01em |
| Tile body | 1.06rem | 500 | 1.5 | — |
| Crew label pill | .85 → .92rem, padding .375 × .75rem | 700 | — | −.01em |
| Badge (EXAMPLE) | .66rem Geist Mono, uppercase | 600 | 1 | .08em |
| Footer links | .78 → .82rem uppercase, underline offset 6 → 4px on hover | 500 | — | .11em |

---

## 6. Layout and spacing

| Section | Container | Padding | Notes |
|---|---|---|---|
| Hero | max 72rem, min-height 92svh, centred | top 7rem (8 ≥768), bottom 4rem | Crew grid: 3 cols (mobile, second ghost hidden), 4 cols ≥640, max 34rem. Avatars 3.6rem (4.4 ≥640). Title 2.5rem (3 ≥768) below the crew. |
| Builder | max 72rem, centred | bottom 6rem (8 ≥768) | Three stat tiles (blue / light / dark), radius 1rem, min-height 6.5rem, gap 1rem, max 54rem. |
| Library | max 76rem | 0 1rem 6rem (0 2rem 8rem ≥640) | Tiles: radius 2rem, copy padding 2/1.75rem (2.5/2.25 ≥640), grid gap 1–1.25rem, 2 cols ≥1024. The featured tile spans both columns as a 1.05fr / 1fr split, min-height 38rem. |
| Under the hood | full-width dark tile | inner cards 1.4rem radius | Two cards, one per bot, generated from `handles`. |
| Closing | max 72rem, hairline on top | 6/7rem top, 8/9rem bottom | Two columns ≥1024: left has H2, lede and crew; right has the numbered steps and CTA. |
| Footer | max 96rem | 3/3.5rem top, 1.75/2.25rem bottom | Fixed underneath (see §4). |

Fixed chrome:
- **Back chip:** top-left, 1.25rem (1.75 ≥640).
- **Nav pill:** centred (right-aligned on mobile, icons only below 768).
- **GitHub chip:** top-right, hidden below 640.

Tile grounds:
- Limit Coach: **blue**, with a dark Grok Bot panel inside so the blue avatar stays visible.
- Crankobot: **light**, with a dark panel.
- Open slot: transparent with a 1.5px white hairline at 14%.
- Under the hood: `#161616`.

---

## 7. Section structure

The order mirrors the reference: intro, hero, proof, everything-it-does tiles, full-width dark tile, note, two-column close, footer reveal.

1. **Intro curtain:** the 6 layers above.
2. **Hero:**
   - crew (Limit Coach, Crankobot, "Next bot", "Soon")
   - H1 "My Grok Bots" with a two-line sub
   - "Meet the bots" CTA
   - fine print linking X and GitHub
   - "Who builds them" pill
3. **Builder:** "A CS student who ships in public." Federico II, since October 2025, apps, tools, Codex skills, building in public. Three stat tiles carry facts, not numbers.
4. **Library:** "The library."
   - **Limit Coach** featured, wide, blue: copy, LimitNotch link, the 4 handles, panel plus LimitNotch notch mock.
   - **Crankobot**, light: copy, repo link, "MIT · 1,000+ stars on GitHub", panel with library files and a chat message.
   - **Open slot.**
5. **Under the hood:** "They run on Grok Bot." Links to https://x.ai/bot, with one card per bot.
6. **Note:** start from the code.
7. **Closing:** "Small bots, built in the open." Three steps: read the code, get Grok Bot, follow @Kappaemmedev. "Follow on X" CTA (it also wakes up).
8. **Footer:** "Keep building." Links to Home / Projects / Skills, Grok Bots / LimitNotch / First Customer Finder, and GitHub / X / Grok Bot.

### Copy and facts
- All claims come from the public READMEs (checked 17 Oct 2026):
  - LimitNotch reads the Claude 5-hour and weekly windows and the Codex windows, and lives in the notch.
  - First Customer Finder researches public demand signals, qualifies and scores prospects, checks public contact routes and drafts next steps. It "never sends outreach automatically", is MIT-licensed and had 1,094 stars.
- **The mocks are tagged EXAMPLE** and their values come from the READMEs:
  - "Claude · Resets in 1h 52m" and `claude_5h: 49.9` → 50%
  - the prompt pattern "P1 and P3 fit… find 5 more"
  - the file names `report.html`, `prospects.csv` and `report.md`, from Crankobot's Grok Bot library screenshot
- The site is in English, so the page is in English.

---

## 8. Integration notes for Codex

- **Route:** `/grok-bot` is implemented at `grok-bot/index.html`. Its bot data lives in `grok-bot/bots.data.js`, and production SVG assets live in `grok-bot/assets/`. The home nav links to it between Skills and On X.
- **Fonts:** the Grok Bot page loads Geist at 400–800 and Geist Mono, consistent with the main site's typography.
- **Back chip, nav and footer links** use root-relative paths (`/`, `/#products`, `/#skills`). Keep them root-relative once the page lives at `/grok-bot`.
- **Keep the intro inline script right after the intro markup.** It paints the data-driven layers and avatars synchronously so their pops stay on the CSS clock. Load `bots.data.js` before it, as a synchronous `<script>` in `<head>`.
- **Adding a bot:** append to `GROK_BOTS` in `grok-bot/bots.data.js`.
  - Required: `id`, `name`, `subtitle`, `projectName`, `pill`, `tile` (`blue` | `light` | `dark`), `avatar` (`circle` | `blob` + eyes), `headline`, `body`, `handles`, `links`.
  - The six intro frames are in `GROK_BOT_INTRO` in the same file. Edit them only when changing the cinematic sequence.
  - Optional: `mock`, `proof`.
  - `featured: true` makes the bot the wide first tile and the "lead" (sticky bar and footer mark).
  - `GROK_BOT_SLOTS` controls how many empty slots follow.
  - New mock types go in `mockHTML()`.
  - Keep the colour rule: any new bot is black and white unless Francesco gives it its own accent.
- **Accessibility:**
  - Avatars are `aria-hidden` and names are real text.
  - The intro is `aria-hidden` and skippable with any key.
  - The sticky bar is `inert` while hidden.
  - Footer links scroll the footer fully into view on focus.
- **Performance:**
  - Animation uses transforms and opacity only.
  - One rAF loop: all reads first, then writes. It pauses when the tab is hidden, and eyes update only for visible bots.
  - Headless Chrome scripted-scroll test: median frame 16.7ms, p95 16.8ms, no frame over 20ms across 240 frames.
- **Theme colour:** the page sets `theme-color` dynamically during the intro and resets it to `#000000`.
- **Before launch:**
  - Refresh the star count in `bots.data.js`.
  - Confirm with Francesco that the Limit Coach subtitle "Claude + Codex limits" matches the bot's label in the app. The app screenshot showed "Aggiungi un'etichetta" (no label set yet).
