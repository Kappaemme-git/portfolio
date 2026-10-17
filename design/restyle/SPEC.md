# kappaemme.dev restyle: design spec

Design hand-off for restyling the **whole portfolio** in the visual language of `/grok-bot`. Codex implements it. This folder is the visual reference only; nothing in `index.html`, `coffee/` or `grok-bot/` has been changed.

| File | What it is |
|---|---|
| `prototype.html` | Hi-fi prototype of the restyled **home** (`index.html`) with all real content. CSS and JS are inline. |
| `coffee.html` | Hi-fi prototype of `/coffee` (`coffee/index.html`). Its shared CSS blocks are byte-identical to `prototype.html`. |
| `../../.shots/restyle/` | Screenshots at 1440×900 and 390×844 @2x: every home section, the footer lifting and fully revealed, the full page, the mobile menu, both coffee viewports and reduced motion. |

Preview from the repo root with `python3 -m http.server`, then open `/design/restyle/prototype.html` and `/design/restyle/coffee.html`. The prototypes use relative paths (`../../images/`, `../../grok-bot/assets/`, `prototype.html`, `coffee.html`). Production paths are in §9.

---

## 1. Direction in one paragraph

The base is **light**: off-white paper `#F2F2EF` (the `/grok-bot` footer ground) with black ink type. The type is huge, tight Geist 800 with negative tracking, plus calm grey ledes. Content sits on white cards and full-colour tiles with 2rem radius, as on the Grok Bot page and Tobia Donadon's reference. There are **exactly two dark moments**:
1. the Grok Bots teaser tile, so the bots sit on their own black ground;
2. the closing Contact band, which the page lifts off to reveal the paper footer with the sliding `kappaemme.dev` wordmark.

Colour comes from the work itself: Metodo ZAC navy and VibeDesk plum, both sampled from their images, the lavender of the portrait, and one Limit Coach blue stat. Sections are **left-aligned on a 12-column grid**, with a numbered hairline bar above each one. They are not centred templates. Motion uses the same calm vocabulary as `/grok-bot`: a staggered rise on load, a 26px fade-up on scroll, hairlines that draw in, light parallax and the footer reveal. Everything animates transform or opacity only and switches off under reduced motion.

---

## 2. Colour tokens

| Token | Value | Use |
|---|---|---|
| `--paper` | `#F2F2EF` | Page ground, footer, chips (78% alpha + blur), quote boxes |
| `--paper-2` | `#E8E8E3` | Badges, star pills |
| `--card` | `#FFFFFF` | Cards and tiles on paper |
| `--ink` | `#0A0A0A` | Text, primary buttons, index pills, ink tiles |
| `--ink-2` | `rgba(10,10,10,.68)` | Ledes, descriptions (≈6.7:1 on paper) |
| `--ink-3` | `rgba(10,10,10,.60)` | Mono counts, numbers, fine print (≈5.0:1 on paper, 5.2:1 on white) |
| `--line` / `--line-2` | `rgba(10,10,10,.10)` / `.20` | Hairlines, ghost-button rings |
| `--night` | `#000000` | Dark moments (same ground as `/grok-bot`) |
| `--panel` | `#161616` | Grok Bot app panel inside the teaser |
| `--text`, `--text-2`, `--text-3` | `#FFF`, 68%, 50% | Text on dark |
| `--line-d` | `rgba(255,255,255,.14)` | Hairlines on dark |
| **`--lc`** | **`#2474F7`** | Limit Coach blue. Used for the bot, its label, the "1.8M+" stat, the coffee "Build" tile, focus rings and `::selection`. Nowhere else. |
| `--live` | `#0E9F7A` | "Live" dot (darker than the old `#10a37f` so it reads on paper) |
| `--zac` | `#0B193E` | Metodo ZAC tile, sampled from `metodo-zac-app-icon.jpg` so the icon melts into it |
| `--vibe` | `#613F6D` | VibeDesk tile, sampled from `vibedesk-gallery.png` |
| `--me` | `#8D85C0` | Portrait placeholder while `me.jpg` loads (its backdrop) |
| `--stripe` | `#635BFF` | Only the 9px dot next to "Stripe payment" on `/coffee` |
| `theme-color` | `#F2F2EF` | Was `#000000` |

Rules:
- No gradients, glows or glass blobs. The only blur is on the fixed chrome, and only for legibility.
- Limit Coach only on dark or light grounds; Crankobot only on dark. These are the `/grok-bot` rules.
- Stack icons keep brand colours on white. Two exceptions: **C uses `#00599C`** (the official dark C blue; `#A8B9CC` vanishes on white), and **React uses `#149ECA`** (react.dev's light-mode cyan). GitHub and Railway turn ink, because they were white only because the old ground was black.

---

## 3. Typography

**Geist** 400–800 plus **Geist Mono** 400–600, loaded from Google Fonts as now with weight **800 added**. The URL is in `prototype.html` `<head>`. Body: Geist 500, tracking −0.01em, line height 1.5.

| Role | Size | Weight | LH | Tracking | Notes |
|---|---|---|---|---|---|
| Hero H1 | mobile `clamp(3.25rem, 13.6vw, 7.4rem)`; ≥640 `clamp(4.5rem, 9.2vw, 7.4rem)` | 800 | .88 | −.058em | `text-wrap: balance` |
| Coffee H1 | mobile `clamp(3.4rem, 15vw, 7.25rem)`; ≥640 `clamp(4.5rem, 9.4vw, 7.25rem)` | 800 | .88 | −.058em | max 9ch |
| Section H2 (`.k-h2`) | `clamp(2.6rem, 6.6vw, 5.4rem)` | 800 | .95 | −.05em | balance. Grok teaser `clamp(2.6rem, 5.4vw, 4.6rem)`, coffee card `clamp(2.5rem, 5.6vw, 4.6rem)` |
| Contact H2 | `clamp(3rem, 7.6vw, 6.2rem)` | 800 | .92 | −.055em | max 10ch |
| Tile H3 | `clamp(1.9rem, 3.3vw, 2.8rem)` | 800 | 1 | −.045em | max 17ch |
| Journey role H3 | `clamp(1.9rem, 3.4vw, 2.75rem)` | 800 | 1 | −.045em | |
| Card title ("More work", "Most starred") | 1.45rem | 800 | — | −.035em | |
| Row name | 1.15rem → 1.28rem (≥768); skills 1.08 → 1.15 | 700 | 1.2 | −.025em | `overflow-wrap: anywhere` for long repo names |
| Hero lede | 1.12rem → 1.32rem (≥768) | 500 | 1.5 / 1.45 | −.01em | first sentence in ink 600 |
| Lede (`.k-lede`) | 1.12rem → 1.22rem | 500 | 1.5 | −.01em | ink-2, max 40ch, `text-wrap: pretty` |
| Body / desc | .98–1.05rem | 500 | 1.45–1.5 | | |
| Bar label | .95rem | 600 | | | |
| Index pill | .68rem Geist Mono | 600 | 1 | .06em | ink pill, paper text |
| Mono count / badge | .66–.72rem Geist Mono, uppercase | 500–600 | 1 | .08em | |
| Pill label (`.k-pill`, `.k-label`) | .85–.92rem | 700 | | −.01em | |
| Footer wordmark | `clamp(2.25rem, 11.3vw, 9rem)` | 500 | .88 | −.045em | identical to `/grok-bot` |
| Footer links | .78 → .82rem uppercase | 500 | | .11em | identical to `/grok-bot` |

No orphans: every display heading uses `text-wrap: balance`, and every paragraph uses `pretty`. All screenshots were checked for widows.

---

## 4. Space, grid, radii

- **Container `.wrap`:** content max **76rem** (1216px) plus a gutter of **1.25rem** (<640) or **2rem** (≥640). At 1440 the content runs x 112 → 1328.
- **Grid:** section heads use 12 columns ≥1024. The bar spans 12, the H2 spans 1–7, and the lede spans 8–12, bottom-aligned. Two-up blocks use 1fr/1fr or 1.1fr/1fr.
- **Section rhythm `--section-y`:** 5.5rem mobile, 7rem ≥768, 8.5rem ≥1024. Measured from the hairline bar of one section to the bottom of the previous one.
- **Head to content:** 2.25rem mobile, 3.5rem ≥1024.
- **Gaps:** tiles 1rem (mobile) / 1.25rem; stat and stack tiles .6rem / 1rem; post cards .75rem / 1rem.
- **Radii:** 2rem for tiles, big cards and the portrait (`--r-tile`); 1.5rem for post cards and reasons (`--r-card`); 1.1–1.25rem for stat and stack tiles; 1.6rem for the Grok panel; 1rem for quote boxes; 999px for pills and buttons. The contact band uses 1.75rem (mobile) or 2.5rem (≥768).
- **Buttons:** min-height 3.5rem; pill links 2.6rem; round row arrows 2.5rem; chips ≥44px. Every tap target is ≥44px.

---

## 5. Components

| Component | Class | Spec |
|---|---|---|
| Brand chip | `.k-chip--brand` | Fixed top-left (1rem / 1.75rem ≥640). Paper 78% + blur 14px, ring `--line-2`. KM mark (`images/kappaemme-mark.svg`, 27×16) + "Kappaemme". Links to `#top`. Hover: ring darkens, mark tilts −6° with `--pop`. |
| Pill nav | `.k-nav` | Fixed, centred, ≥1024 only. Eight links: Projects · Skills · Grok Bots · On X · Stack · Journey · Coffee · Contact (13px/500, padding 6×13, 6×16 ≥1280). Paper 80% + blur 16px. **Lamp:** a 32×5 ink bar at the top edge with an ink radial glow below, sliding `left .5s --ease-out`. It is **scroll-spied**: whichever section crosses the middle band of the viewport (rootMargin `-45% 0 -54% 0`) gets `aria-current="true"` and the lamp; in the hero there is no lamp. "Grok Bots" lights while the teaser is in view, but its href goes to `/grok-bot`. |
| GitHub chip | `.k-chip--right` | Top-right, ≥1280 on home and ≥640 on sub-pages. |
| Menu button + sheet | `.k-chip--menu`, `.k-sheet` | Below 1024 an ink "Menu" chip replaces the pill. It opens a full-screen paper sheet with the eight links at `clamp(2rem, 9.4vw, 2.9rem)` 800, numbered 01–08 in mono, with hairlines. Socials sit at the bottom. Motion: sheet opacity .35s + translateY −1rem → 0 over .5s; items stagger 35ms. The burger morphs into an ×. `role="dialog"`, `aria-modal`, `inert` when closed; Esc closes and returns focus; `html.menu-open` locks scroll. |
| Section bar | `.k-bar` | Hairline on top (draws in), ink index pill "01", label, mono count on the right. On dark the hairline is white 14% and the index pill is white. |
| Buttons | `.k-btn`, `--ghost`, `--light` | Ink pill / transparent with a 1.5px ring / white pill. Hover: ink lifts to `#262626` with a soft shadow; arrows nudge 2px. |
| Wake-up CTA | `.gb-cta` | **Copied from `/grok-bot`** and used only once on home ("Meet the bots"). On click, letters fly in, the pill turns into Crankobot's face, the brows go grumpy and a bubble line appears. Navigation to `/grok-bot` happens at 1.35s. Cmd/Ctrl/Shift click and reduced motion navigate immediately. `pageshow` resets it for bfcache. |
| Badge | `.k-badge` | Mono .66rem uppercase pill on `--paper-2`. Variant on dark: white 14%. |
| Feature tile | `.k-tile` | The whole tile is a link. Label row: 1.9rem icon chip + name + badge, then H3, then pill link. The stage centres the art. ZAC icon at `clamp(9.5rem, 20vw, 13rem)`, radius 22.5%, deep shadow. VibeDesk art at `clamp(13rem, 27vw, 18.5rem)`, round. Hover: art −6px and scale 1.03, pill brightens, arrow nudges. |
| List card + row | `.k-card`, `.k-row` | White card, 2rem radius. Rows: number · name/desc · meta (badge, Live dot) · round arrow. Hairline on top of each row draws in, staggered 90ms. Hover: the arrow circle fills ink. Mobile areas: `"n main go" / ". meta go"`. |
| Stat tile | `.k-stat` | White / blue / ink. Big number `clamp(1.75rem, 5vw, 3.6rem)` 800. Hover: lift 3px and tilt −1° with `--pop`. |
| X post card | `.k-post` | White card, 1.5rem radius. Author row (avatar 2.5rem, name + blue check SVG, handle, X logo). Greg's line at 1.2rem 700. Quote box on paper holds Kappaemme's quote, kept in its original capitals, plus a mono tag. Mono meta: ♡ likes · views · "View on X ↗". Hover: lift 3px with a soft shadow. |
| Tech tile | `.k-tech` | White, 28px brand icon top-left, name + mono tag bottom-left. Same hover as stat tiles. |
| Footer | `.site-footer` | **Same markup, classes and maths as `/grok-bot`** (§6). The only difference on home: the wordmark links to `#top` with an ↑ arrow, and the corner mark is the KM mark in an ink circle (`/grok-bot` keeps Limit Coach). |
| Cursor | `.k-cursor` | Fine pointers only, off under reduced motion. 14px ink dot that grows to 46px at 14% over links and tiles. It turns **white over `[data-cursor-light]`** (teaser, project tiles, contact band) and **blue with a glow over `[data-cursor-blue]`** (Limit Coach). It follows the `/grok-bot` spring: k 1100, c 52, m .3, two sub-steps. |

---

## 6. Motion

Tokens are the same as `/grok-bot`:

| Token | Value |
|---|---|
| `--spring` | `linear(0, .42 9%, .84 21%, 1.02 33%, 1.05 41%, 1.01 55%, .99 70%, 1)` |
| `--ease-out` | `cubic-bezier(.22, 1, .36, 1)` |
| `--ease-soft` | `cubic-bezier(.2, .8, .2, 1)` |
| `--pop` | `cubic-bezier(.3, 1.7, .5, 1)` |

| Moment | Spec |
|---|---|
| **No intro curtain on home or `/coffee`.** | The curtain belongs to `/grok-bot`. The home has to be clear and fast. |
| Chrome in | `nav-in` .45s ease-out, .1s delay (opacity and visibility). |
| Hero rise | `rise` .7s `--ease-out`, `translateY(14px)` → 0. Delays: name pill .05s, H1 .12s, lede .22s, CTAs .30s, fine print .38s, portrait .20s. The portrait takes .9s and its image settles from `scale(1.06)` over 1.4s. |
| Portrait pills | `crew-in` .56s `--spring` from `translateY(1rem) scale(.6)`, delay .55s + i·80ms. |
| Scroll reveal | `.reveal`: elements below 92% of the viewport at load are armed with `opacity 0, translateY(26px)`. An IntersectionObserver (rootMargin `0 0 -12% 0`, threshold .15) adds `--in`: opacity .85s and transform .9s `--ease-out`. `.reveal__art` follows .12s later from `translateY(16px) rotate(−3.5°) scale(.94)`; this applies to the project art and the Grok panel. `[data-stagger]` siblings get 80ms steps. Classes are removed after 1.1s so hovers stay snappy. **Same code as `/grok-bot`.** |
| Hairlines | `.k-grow::before` goes `scaleX(0 → 1)` over 1.1s `--ease-soft`, staggered 90ms per row: section bars, list rows, journey entries, coffee steps, contact rows. |
| Parallax | One rAF loop with all reads first, then all writes, transform only. Hero portrait wrapper: `scrollY × 0.06` (hero only). Project art: `(offset from viewport centre) × −0.05`, only while on screen. |
| Bots | `grok-bot/assets/*-animated.svg` bob and blink by themselves, and their SVG-internal CSS honours reduced motion. Hovering a crew item plays `bot-hop` (.62s) on the avatar, and the label pops up 2px with scale 1.04. Limit Coach's label also gets a blue glow. |
| Live dot | Opacity pulse 2.4s. It is the only infinite animation besides the bots. Off under reduced motion. |
| Footer reveal | Footer is `position: fixed` under the page, and `body` gets `padding-bottom: var(--footer-h)` (37rem mobile, 36rem ≥768). `--reveal` (0 → 1) is measured on scroll in rAF. Text rises at `(r − .04 − .09i)·6`, the rule draws at `(r − .56)·3.4`, "kappaemme" and ".dev" slide in from opposite sides at `(r − .6/.66)·3` over 5vw, the arrow follows at `(r − .72)·3`, and the mark scales at `(r − .62)·4`. Chips and nav fade out while the footer is open. **Same maths as `/grok-bot`.** Focusing a footer link jumps to the bottom. |
| Anchors | Native smooth scroll with `scroll-padding-top: 5.5rem`, so headings clear the chrome. No smooth-scroll library. |

**Reduced motion:** no rise, pop, reveal, parallax, hairline draw, hover transforms, live pulse or cursor. The wake-up CTA navigates directly, and the bubble does not move. The footer becomes static and in flow (`body` padding 0). The bots stop by themselves.

**Performance:** only transform and opacity animate. `will-change` is set only on parallax targets. The rAF loop pauses when the tab is hidden. One fetch to the GitHub API, as today.

---

## 7. Section by section (home)

Desktop is 1440×900, mobile 390×844. ✓ means the screenshot was checked for alignment, overflow (none: `scrollWidth == clientWidth` at both widths) and orphans.

### Hero `#top` ✓ `home-desktop-01`, `home-mobile-01`
- **Desktop:** two columns, 1.72fr / 1fr, gap 4rem, vertically centred in `min(100svh − 11rem, 46rem)`, top padding 8rem.
  - Left column: name pill (2rem avatar, "Francesco Mistero · aka Kappaemme"), H1 **"Building apps and tools."** on two lines, lede, two CTAs ("See my work ↓" ink, "Get in touch" ghost), and a fine-print line with X, GitHub and email links.
  - Right column: portrait tile, 4:5, 2rem radius, lavender. Pills on top of it: "CS student" · "Indie hacker" · "@Kappaemmedev" (ink).
- **Mobile:** single column, H1 at ~53px on two lines, the two CTAs share one row, then the portrait at 5:4 below. The top of the hero sits under the chips at 7rem.
- **Replaces:** the centred 132px photo, the ASCII "KAPPAEMME" CRT banner and the icon row. The banner is retired on purpose: it was the dark/terminal style. The brand wordmark now lives in the footer. GitHub, Email and X stay as text links in the fine print and in the chrome.

### 01 Projects `#products` ✓ `home-desktop-02/03`, `home-mobile-02/03`
- Head: "01 Projects · 5 PROJECTS" / H2 "Selected work." / lede "A small gallery of products I build and maintain. Select a piece to explore it."
- **Two feature tiles**, side by side ≥768 and stacked on mobile; min-height 28rem / 32rem / 38rem (≥1024).
  - **Metodo ZAC** (navy): chip, "iPhone app" badge, H3 "Coach-led workouts, progress tracking and check-ins.", pill "View on the App Store ↗", app icon on stage.
  - **VibeDesk** (plum): chip `vibedesk-icon.png`, "Web app" badge, H3 "A study and work companion I am currently building.", pill "Visit the website ↗", round `vibedesk-gallery.png` on stage.
- **More work card:** title + "Explore all GitHub projects ↗", then three rows: Metodo ZAC · website, Pocketflow, Glorydraw, each with a type badge, a Live dot and an arrow.

### 02 Skill library `#skills` ✓ `home-desktop-04`, `home-mobile-04`
- Head: "02 Skill library · 10 FEATURED" / H2 "Codex skills, open source." / lede, unchanged.
- **Two cards, ≥1024 side by side:**
  - **Most starred** (rows 01–05): star pill under the description. The first star pill is ink. Footer note "Star counts refresh from GitHub on load."
  - **Recent releases** (rows 06–10, replacing the "Recent" labels). Footer link "All repositories on GitHub ↗".
- This replaces the 470px inner scroll box, so the whole list is visible with no nested scrolling.
- Star updates use the same API logic, now targeting `[data-stars]` inside each `[data-stars-repo]` row. Fallback labels: 1k+, 900+, 900+, 150+, 70+.

### 03 Grok Bots teaser `#grok-bots` (new anchor, dark moment #1) ✓ `home-desktop-05`, `home-mobile-05`
- Black tile, 2rem radius, inside the container. ≥1024 it splits 1fr / 1fr with 4rem padding and min-height 32rem.
- **Left:** bar "03 Grok Bots · 2 BOTS", H2 "My Grok Bots.", lede "Small bots I build and run inside Grok Bot. Each one does one job. The code is on GitHub." (all copy from `/grok-bot`), wake-up CTA "Meet the bots" → `/grok-bot`, and "New ones land there first."
- **Right:** a Grok Bot-style panel (`#161616`, header "Library · kappaemme.dev/grok-bot"), with a crew of `limit-coach-animated.svg` (blue label, subtitle "Claude + Codex limits") → `/grok-bot#bot-limit-coach`, `crankobot-animated.svg` (white label, "First Customer Finder") → `/grok-bot#bot-crankobot`, and `ghost-slot.svg` "Next bot / Soon". The ghost is hidden below 480px so the labels don't collide.
- If a bot is added in `grok-bot/bots.data.js`, add its crew item here and update the count. Keep it to at most three items, including the ghost.

### 04 Shared on X `#shared` ✓ `home-desktop-06/07`, `home-mobile-06/07`
- Head: "04 Shared on X · 5 QUOTE POSTS" / H2 "Shared by Greg Brockman." / the original intro.
- **Stat tiles:** 5 posts by Greg (white) · 1.8M+ combined views (blue) · 10K+ likes (ink). These are the existing figures, unchanged.
- **Five post cards**, original order, links, texts and figures:
  - ≥1024: a 6-column grid, cards 1–3 span 2 and cards 4–5 span 3.
  - <1024: a **horizontal scroll-snap carousel** (cards `min(84%, 22rem)`, bleeding to the screen edge, scrollbar hidden), so mobile doesn't scroll through five tall cards.
- Note "Engagement figures checked on 23 September 2026."

### 05 Stack `#stack` ✓ `home-desktop-08`, `home-mobile-07`
- Head: "05 Stack · 12 TOOLS" / H2 "The stack." / lede "The languages, frameworks and tools behind these projects."
- Twelve white tiles in the README order (C … Stripe): 6 columns ≥1024, 4 ≥768, 3 on mobile, so the grid is always balanced. Icons are the existing SVGs, recoloured per §2.

### 06 Journey `#journey` ✓ `home-desktop-09`, `home-mobile-08`
- The bar "06 Journey · 2023 — PRESENT" spans the full width. ≥1024 the section splits 5fr / 7fr.
- **Left (sticky top 7rem):** H2 "The journey so far." and lede "Computer Science at Federico II, and building in public since October 2025."
- **Right:** two entries. Each has a date badge, a role H3, the organisation, and the original three points as a dotted list with hairlines.
- The "@Kappaemmedev" handle in the org line is now a link.

### 07 Coffee `#coffee` ✓ `home-desktop-10`, `home-mobile-09`
- White card, 2rem radius. ≥1024 it splits 1.1fr / 1fr.
- **Left:** bar "07 Coffee · SUPPORT THE BUILD", H2 "Support the next build.", the original lede, and buttons: **Buy me a coffee** (ink, cup icon, Stripe link, new tab) · My work (`#products`) · Contact me (mailto). Fine print: "Donations go through Stripe. More on the coffee page." → `/coffee/`.
- **Right:** the three Build / Learn / Repeat reasons from `coffee/index.html`, as a numbered hairline list. On mobile the label stacks above the text.

### 08 Contact `#contact` (dark moment #2) ✓ `home-desktop-11`, `home-mobile-10`
- Full-bleed black band with all corners rounded. It is the **last thing in `.site-content`**, so the page lifts off the footer here.
- **Left:** H2 "Got a project or an idea? Let's talk." and the original sub-line.
- **Right:** three big hairline rows: Email `misterokappa12@gmail.com` · X `@Kappaemmedev` · GitHub `Kappaemme-git`, each with a round arrow that fills white on hover.

### Footer ✓ `home-desktop-12/13`, `home-mobile-11`
- Wordmark "kappaemme.dev ↑" (→ `#top`), the rule, then the lead "I build small apps, tools and bots, try them in the real world and keep the ones that work." (the `/grok-bot` footer line without its second sentence).
- Three link columns: Projects / Skills / Grok Bots / On X · Stack / Journey / Coffee / Contact · GitHub / X · @Kappaemmedev / Email.
- Meta: "© 2026 Francesco Mistero · Made one commit at a time.", "Back to the top ↑" and the KM mark. Below 640 the made-line and the back link are hidden; the wordmark already goes to the top.

---

## 8. `/coffee` (`coffee.html`) ✓ `coffee-desktop-*`, `coffee-mobile-*`

- **Chrome (sub-page variant):**
  - back chip "← Kappaemme" → `/`;
  - centred pill **Home · Grok Bots · Coffee · On X**, with the lamp resting on Coffee (`aria-current="page"`). Below 768 the items become icons only (home, bot, cup, X), right-aligned, as on `/grok-bot`;
  - GitHub chip ≥640.
- **Hero:** ≥1024 splits 1.4fr / 1fr.
  - **Left:** a white pill with a green dot reading "CS student & indie hacker", H1 "Support the next build.", mono sub "A tiny backing page for Kappaemme", the original intro, and buttons **Donate with Stripe** (ink, cup) · My work · Contact me. The original `stripeDonationLink` fallback logic is kept.
  - **Right:** a white donation panel. Its top half is the `km-logo.png` art on its own `#0B0B09` ground; the PNG's 1px border is hidden with `clip-path: inset(1px)`. Below: "Support page" badge, "Support my next project.", the original text, and the Stripe line ("● Stripe payment" / "Secure checkout").
- **01 Why donate:** H2 "Why it helps." and three tiles: Build (blue), Learn (ink), Repeat (white). Each has a mono kicker; the H3 and text are anchored to the bottom.
- **02 Contact me (dark band, the lift-off):** H2 "Write me directly." with two rows: Email ("Write me directly" / misterokappa12@gmail.com) and GitHub ("See the code" / github.com/Kappaemme-git).
- **Footer:** the shared one. Wordmark → `/` with ↗ (as `/grok-bot`), lead with "Everything else I make is on kappaemme.dev.", meta "· Created by Kappaemme".
- **Fonts:** Outfit, Space Mono and DM Sans are **dropped** in favour of Geist and Geist Mono. The radial purple glow and dot grid backgrounds are removed.

---

## 9. Implementation checklist for Codex

Work on a branch from `portfolio-restyle`. Do not touch `main` without Francesco's approval.

### Shared setup
- [ ] Recommended: create `assets/site.css` (the SHARED blocks of `prototype.html`: tokens, chrome, type, buttons, reveal, footer, cursor and reduced motion) and `assets/site.js` (reveal, grow, footer reveal, cursor and the rAF loop). Use them from `index.html` and `coffee/index.html`. Keeping everything inline, as today, is also fine; then copy the blocks verbatim. **Do not** load `site.css` in `grok-bot/index.html` (see below).
- [ ] Google Fonts URL: Geist `400;500;600;700;800` + Geist Mono `400;500;600`.
- [ ] Set `<meta name="theme-color" content="#F2F2EF">` and `color-scheme: light`. Keep all SEO, OG and Twitter tags and the Vercel Analytics snippet as they are.
- [ ] Paths: replace `../../images/` → `/images/`, `../../grok-bot/` → `/grok-bot`, `../../grok-bot/assets/` → `/grok-bot/assets/`, `coffee.html` → `/coffee/`, `prototype.html` → `/`, and `../../coffee/km-logo.png` → `/coffee/km-logo.png`.

### `index.html`: current → new
- [ ] `<header class="topbar">` → `.k-skip`, `.k-cursor`, `.k-chip--brand`, `.k-nav` (eight links, `data-spy`, Grok Bots href `/grok-bot`), `.k-chip--right`, `.k-chip--menu`, `#k-sheet`.
- [ ] `<main id="top">` → wrap in `<div class="site-content"><main id="main">`. The hero `<section>` takes `id="top"`.
- [ ] Hero (`.hero`, `.hero-photo`, `.ascii-banner`, `.hero-tagline`, `.hero-lede`, `.icon-row`) → `.k-hero` markup. Remove the ASCII banner and its CRT CSS.
- [ ] `#products`: `.gallery-grid` → `.k-features` (two `.k-tile`); `.more-work .board` → `.k-card.k-more` with three `.k-row`. Delete the `data-gallery-link` delayed-navigation script; the tile hover replaces it. Gallery links now open in the same tab, as before; rows open new tabs, as before.
- [ ] `#skills`: `.board.board-scroll` → `.k-skills` with two `.k-card`s (rows 1–5 and 6–10). Keep `data-stars-repo` on rows 1–5 and point the star script at `[data-stars]`.
- [ ] **New** `#grok-bots` teaser section between Skills and Shared, plus the wake-up CTA CSS and JS (`.gb-cta`, `.gb-bubble`).
- [ ] `#shared`: `.proof-top/.proof-stats/.proof-grid` → `.k-head`, `.k-stats`, `.k-posts`. Keep all five URLs, texts, figures and the date note. Keep Greg's avatar URL.
- [ ] `#stack`: `.stack-grid .tile` → `.k-stack .k-tech` (`<ul>`/`<li>`). Apply the C and React colours and switch GitHub and Railway to ink.
- [ ] `#journey`: `.timeline .tl-entry` → `.k-journey` with `.k-entry` items.
- [ ] `#coffee`: → `.k-coffee` card with the reasons list and the `/coffee/` link.
- [ ] `#contact`: → `.k-contact` band. It must be the **last child of `.site-content`**.
- [ ] `<footer class="site-footer">` → the shared fixed footer (home variant); add `body { padding-bottom: var(--footer-h) }`.
- [ ] Scripts: replace the old reveal script with the prototype IIFE (stagger, reveal, grow, lamp and scroll-spy, menu, stars, cursor and parallax, wake CTA, footer reveal).
- [ ] Update `README.md` §2–§5 and §8: light editorial style, eight sections, tokens, mobile menu.

### `coffee/index.html`: current → new
- [ ] `.nav` → sub-page chrome (back chip, `.k-nav--sub` with Coffee current, GitHub chip).
- [ ] `.hero` + `.support-panel` → `.c-hero` (`.c-eyebrow`, h1, `.c-sub`, `.c-intro`, `.c-actions`) + `.c-panel`. Keep `#donateHero` and the `stripeDonationLink` logic.
- [ ] `01 - Why donate` `.reasons` → `.k-section` with `.c-reasons` (blue / ink / white).
- [ ] `02 - Contact me` `.contact-grid` → `.k-contact` band (the last element of `.site-content`).
- [ ] `.footer` → the shared footer (sub-page variant). Favicon stays `km-logo.svg/png`.

### `grok-bot/index.html`: consistency only (the page design is approved; don't restyle it)
Allowed changes, nav and footer only:
- [ ] **Nav pill:** go from `Home · Grok Bots · On X` to **`Home · Grok Bots · Coffee · On X`**. Add a cup icon for the mobile icon mode (`#i-cup` path in `coffee.html`). Grok Bots stays `aria-current`. The pill stays dark (`rgba(22,22,22,.72)`), because the page ground is black; the light pill is only for light pages.
- [ ] **Footer link columns:** match the site, i.e. Projects / Skills / Grok Bots / On X · Stack / Journey / Coffee / Contact (root-relative `/#…`, `/coffee/`) · GitHub / X · @Kappaemmedev / Grok Bot ↗. Keep the bot project links (LimitNotch, First Customer Finder) by appending them to the second column, or keep the current data-driven column. Either is fine.
- [ ] Keep its wordmark → `https://kappaemme.dev/` ↗, its Limit Coach footer mark, intro curtain, cursor and everything else untouched. Its footer `--footer-h`, maths and classes are already identical.
- [ ] Optionally add `· Made one commit at a time.` to its footer meta ≥768.

### QA before merge
- [ ] At 390, 768, 1024, 1280 and 1440 there is no horizontal overflow (`scrollWidth == clientWidth`) and no orphan words in headings.
- [ ] Keyboard path: skip link → chips → nav or menu (Esc closes) → every link has a visible blue focus ring → footer links scroll the footer into view.
- [ ] Reduced motion: everything is visible at once, the footer sits in flow and the CTA navigates directly.
- [ ] With the GitHub API blocked, the star fallbacks show.
- [ ] Lighthouse: no CLS from the hero (images have width and height; the portrait is `fetchpriority="high"`, everything else is lazy).

---

## 10. Accessibility notes
- Landmarks: skip link, `<nav aria-label>` for sections, the menu dialog and the footer, `<main id="main">`, and `aria-labelledby` on every section.
- Contrast: ink-2 ≈6.7:1 and ink-3 ≈5.0:1 on paper; text-2 on black ≈9:1. White on `--lc` is ≈4.2:1, so it is used only for large or bold text (stat numbers, labels, tile headings), which passes AA large. Keep small body text off blue. White on the ZAC and VibeDesk tiles is above 8:1.
- Focus: a 2px Limit Coach blue outline with 4px offset everywhere, including on dark tiles.
- Avatars and decorative art are `alt=""` or `aria-hidden`; the portrait has a real alt. The verified badges carry `aria-label`. Project tiles have full `aria-label`s.
- Scroll-spy uses `aria-current="true"`; the sub-page pill uses `aria-current="page"`.
- The carousel is native scrolling and fully keyboard-reachable (cards are links); there are no hidden controls.
- The menu sheet is `inert` when closed, moves focus to the first link on open and returns it on Esc.

---

## 11. Content audit (what changed, what didn't)

**Kept verbatim:**
- every project, link, description and image;
- all ten skills with their descriptions and star fallbacks;
- all five X posts: texts, figures, URLs and the date note;
- the twelve stack items;
- both journey entries and their bullets;
- the coffee lede, the Stripe URL and the coffee page's three reasons and panel copy;
- the contact line and sub-line, the email, X, GitHub, © and "Made one commit at a time."

**New headings and small lines.** These are labels with no new claims; Francesco to approve:

| Where | New text |
|---|---|
| Hero H1 | "Building apps and tools." (from the tagline) |
| Projects | "Selected work." |
| Skills | "Codex skills, open source." |
| Stack | "The stack." + lede "The languages, frameworks and tools behind these projects." |
| Journey | "The journey so far." + lede "Computer Science at Federico II, and building in public since October 2025." |
| Coffee page | "Why it helps.", "Write me directly." (that one from the card title) |
| Skills card titles | "Most starred" / "Recent releases" (from the lede and the "Recent" labels) |
| Skills note | "Star counts refresh from GitHub on load." |
| Portrait pills | "CS student", "Indie hacker" (both from the Journey roles) |
| Hero fine print | "Follow the build on X, read the code on GitHub, or send an email." |

**Normalised:**
- "metodo ZAC · website", "pocketflow" and "glorydraw" are now "Metodo ZAC · website", "Pocketflow" and "Glorydraw". Revert if the lowercase was intentional.
- "Pocketflow" (home) and "PocketFlow" (coffee page copy) are both kept as written.

**Removed:**
- the ASCII CRT banner (style, not content);
- the coffee page's decorative gradients and dot grid.
