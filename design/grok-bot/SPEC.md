# Grok Bot library: design spec

> **Current direction: v3 hybrid (below).** The v2 sections further down still describe the motion, data flow, bot physics, content and accessibility. v3 changes the grounds and brings back the colour tiles. The shared palette, the scopes and the Codex checklist for `assets/` are in `../restyle/SPEC.md` §v3.

---

## v3 hybrid

**Kept exactly from v2:**
- the boot log text and timing feel;
- the scan line;
- the left-aligned hero;
- the stage with two large bots (eye tracking, blink, float, scroll sway and squash, hover hop, tap boop, the hint "they follow your cursor" / "tap a bot", the wake hop after the boot);
- the typed floor;
- the `~/` labels;
- the nav caret;
- data-driven rendering from `bots.data.js`;
- **no placeholder slots**.

### v3.1 Page composition (paper base, colour blocks)
1. **Boot**: the log is now played over **the old coloured intro frames**, 0.4s each.

   | # | Frame | Bot | Log line |
   |---|---|---|---|
   | 0 | night `#0A0A0A` | — | `$ cd ~/grok-bots` |
   | 1 | paper `#F2F2EF` | Limit Coach pops (`assets/limit-coach.svg`, spring .6s) | `limit-coach ● online` |
   | 2 | blue `#2474F7` | Crankobot pops (`assets/crankobot.svg`) | `crankobot ● online` |

   At 1.25s the whole overlay slides down (`translateY(100%)`, .8s `--ease-io`); its 2px blue top edge is the scan line. The log colour steps with the frame (off-white → ink → white). Limit Coach's log dot gets a `currentColor` ring so it survives the blue frame. `--enter: 1.4s`. It is skippable as before and plays once per session or after a scan.
2. **Hero** on paper (unchanged layout).
3. **Stage band** (`.gb-set`): a night `#0A0A0A` block, 28px radius, holding only the two actors, the horizon and the head row. Actors are pinned to grid columns 1 and 2 (the horizon spans both).
4. **Colour tiles** (`#gb-tiles`, 2 columns ≥900, stacked below), one per bot, directly under its bot, coloured from data:

   | Bot | Tile | Button |
   |---|---|---|
   | Limit Coach | **blue** | white keycap with a blue label |
   | Crankobot | **white** (+ hairline) | ink keycap |

   Each tile holds:
   - a 2.2rem **night chip** with the bot's mini avatar (so Limit Coach never sits on blue);
   - name + subtitle tag;
   - the headline (Geist 600, `clamp(1.9rem, 3.3vw, 2.75rem)`) and the body;
   - the handles (hairlines draw in);
   - the GitHub keycap and the proof;
   - at the bottom, its **Grok Bot app panel**, a night object with the `example` tag: the LimitNotch notch or Crankobot's library files plus the message.

   This mirrors the old blue featured tile and light tile with dark panels inside. The notch scales down below 480px.
5. **Under the hood**: a **panel `#161616` tile** (the old dark tile) with the copy, the "Get Grok Bot" ghost keycap and the per-bot repo rows, followed by the note on paper.
6. **Closing** on paper: the "Follow on X" ink keycap, and "More of my work at kappaemme.dev" (`../`, scan).
7. **Floor**: dark, typed wordmark → `../` (scan).

Tile colours used: blue `#2474F7`, white / paper, night `#0A0A0A`, panel `#161616`. Nothing else. Green `#10a37f` is used only for the online / live dots.

### v3.2 Codex checklist for `grok-bot/index.html` (against 9de31fe)
Apply `../restyle/v3-patches/grok-bot-index.html.patch` (verified with `git apply --check`), or by hand:
- [ ] `theme-color` → `#F2F2EF`.
- [ ] Replace the boot CSS block with the v3 one (`.gb-boot`, `.gb-boot__frame`, `frame-on`, `frame-pop`, `log-tint`; boot-out delay 1.25s; `--enter: 1.4s`). Add the three frame `div`s before `.gb-boot__line`, with `assets/limit-coach.svg` and `assets/crankobot.svg`.
- [ ] Replace the stage CSS block with the v3 one: `.gb-set` night band, actors pinned to columns 1/2, `.gb-tiles`, `.gb-tile`, `.gb-chip`, info, `.gb-ex` night panel, notch, files. In `.gb-msg`, `color: var(--bg)`.
- [ ] Markup: `#gb-examples` → `<div class="gb-tiles" id="gb-tiles" data-stagger>`.
- [ ] Script:
  - `#gb-cast` renders the actors + horizon only;
  - a new `TILE` map + `example(b)` + `#gb-tiles` render;
  - remove the `who`/`whoMini` helpers and the old examples render.
- [ ] `.gb-hood`: add `k-tile k-tile--panel reveal` and the padding rules.
- [ ] Links:
  - `../index.html` → `../`, `../index.html#x` → `../#x`;
  - `../coffee/index.html` → `../coffee/`;
  - the closing "kappaemme.dev" link and the `.k-mark` wordmark → `../` with `data-scan`.

  Canonical and OG URLs stay absolute.
- [ ] `bots.data.js`: no change needed. `tile` already says `blue` / `light`, which drives the tile colour.

---

# v2 dark (superseded where v3 says so)

Design hand-off for `/grok-bot` (`grok-bot/index.html`), implemented at 9de31fe. v2 replaced the Tobia-derived design (6-layer curtain, centred crew, wake-up CTA, tile gallery with ghost slots, mobile sticky bar, paper footer). The custom cursor described below was dropped in implementation.

## Changelog
- **2026-10-17 (b):**
  - Dark, diversified direction.
  - Boot log + scan replace the curtain.
  - A **two-bot stage** replaces the crew and tile gallery.
  - No empty slots.
  - The floor footer replaces the paper footer.
  - The shared top bar replaces the pill nav and chips.
  - The sticky bar is removed.
- **2026-10-17 (a):** the `kappaemme.dev` footer wordmark; the builder section was removed. Both still hold: no builder section, and the wordmark links home at the end.

| File | What it is |
|---|---|
| `prototype.html` | Working prototype. Page CSS and JS inline; shared CSS and JS from `../restyle/`; bots from `../../grok-bot/bots.data.js`. |
| `../../grok-bot/bots.data.js` | **Single data file** (unchanged format). The stage, the info blocks, the examples, the under-the-hood rows, the repo links and the footer "bots" column all render from `GROK_BOTS`. `GROK_BOT_INTRO` and `GROK_BOT_SLOTS` are **no longer used** (see §9). |
| `assets/`, `../../grok-bot/assets/` | Avatar SVGs. The page draws the same geometry inline (`KM.avatar`) so the eyes can move. |
| `../../.shots/restyle-dark/grok-*` | Boot frames, hero, stage (eyes tracking up / left), examples, under the hood, closing, footer lifting and revealed, mobile, reduced motion. |

---

## 1. What changed and why (diversification)

| Before | After |
|---|---|
| 6 coloured full-screen layers with words (5.4s), curtain lifts **up** | **Boot**, about 1.8s: a black screen with a 3-line terminal log (`$ cd ~/grok-bots`, `● limit-coach online`, `● crankobot online`), then the blue **scan line sweeps down** and reveals the page behind it. Once per session, or whenever you arrive via the home scan (whose busy label is also `cd ~/grok-bots`, so the two read as one continuous command). Any key, wheel, touch or click skips it. |
| Centred huge "My Grok Bots" + crew of avatars with pill labels + ghost "Next bot / Soon" | **Left-aligned two-column hero:** `~/grok-bots`, H1 "My Grok *Bots.*" (two-tone, Geist 600), the sub-lines and fine print on the right. **No placeholders.** |
| Featured blue tile + light tile + dashed open slot (sequential gallery) | **The stage:** one shared dark set where Limit Coach and Crankobot stand **side by side, large** (up to 17.5rem), on a horizon line, each on a breathing ring. Each bot's **real info sits directly under it**: name with a mini avatar, subtitle tag, headline, body, handles, GitHub link and proof. |
| "Meet the bots" pill wakes into Crankobot's face + bubble | Removed. The stage is right under the hero, so no CTA is needed. The closing CTA "Follow on X" is a keycap button. |
| Under-the-hood dark tile with per-bot handle cards (duplicated the handles) | Two columns: copy + "Get Grok Bot" keycap; on the right, one hairline row per bot (avatar · name · "runs LimitNotch / First Customer Finder" · repo arrow). |
| Floating pill nav with lamp, back chip, GitHub chip, mobile sticky bar | Shared top bar (`home · grok bots · coffee · on x ↗`), blue caret under "grok bots". The sticky bar is removed. |
| Paper footer, sliding split wordmark, Limit Coach mark | Shared dark **floor** with the typed mono wordmark + blinking blue caret; the "bots" column lists the projects from the data. |
| Round dot cursor | Shared block-caret cursor (blue over Limit Coach). |

---

## 2. Colour
Same as the site (`../restyle/SPEC.md` §3): black `#000`, cards `#0B0B0B`, stage set `#050505`, floor `#0E0E0E`, off-white text.

- **Limit Coach blue `#2474F7`** is the strong colour. It is used on the bot, its ring, its subtitle tag, the boot dot, the scan line and the cursor over it.
- **Crankobot** stays white on dark only.
- **No gradients on avatars.** The only gradient is the horizon hairline fading at its ends.

## 3. Avatars (unchanged geometry, 100×100 viewBox)
- **Limit Coach:** `<circle cx=50 cy=50 r=45 fill=#2474F7>`. Capsule eyes rotated −37°: A (55, 35) 10×21; B (75.5, 26) 7×19.
- **Crankobot:** blob `M50 8.5C76.5 8.5 96.5 27.5 96.5 51.5C96.5 75.5 77 94 50.5 94C24 94 3.5 76 3.5 52C3.5 28 23.5 8.5 50 8.5Z`, fill `#FFFFFF`. Oval eyes rotated −22°: A (59, 38) 9×20; B (78.5, 32.5) 6.5×19.
- **Layers:** `svg.gbot > g.gbot__squash > g.gbot__bob > body + g[clip] > g.gbot__look > g.gbot__blink > eyes`. Eyes are clipped to the body.

---

## 4. Motion

| Moment | Spec |
|---|---|
| **Boot** `.gb-boot` | Set from `<head>` (`html[data-boot]`) when the session has no `kgb-booted` flag or `k-scan` is set; never under reduced motion. Log lines `boot-line` .35s, delays .08 / .25 / .42s. At 1.0s the overlay goes `translateY(0 → 100%)` over .8s `--ease-io`; its 2px blue top edge is the scan line. `--enter: 1.15s` delays the page entrance so the hero rises behind the line. Skip → `.is-skip` (.28s fade) and `--enter: 0s`. On finish both bots **hop** (120ms + 140ms stagger) as if waking up. |
| Entrance | Shared `.k-rise` (.75s `--ease-out`, 16px): path .02s, H1 .08s, sub .16s, fine print .24s, stage .3s (+ `--enter`). |
| **Bots, idle** | `bot-bob` 3.6s (−5%), ring breathes in sync (`scale .9`, opacity .65); `bot-blink` 5.6s, staggered per instance. |
| **Bots, pointer** | Eyes follow the pointer: ±7 / ±6 units scaled by `min(1, d/260)`, lerp `1 − 0.0009^dt`. Idle after 3.5s → random glances. Touch: a tap aims the eyes and boops. |
| **Bots, scroll** | From the smoothed scroll velocity `vel` (px/frame, lerp .18): **sway** `rotate(clamp(vel·.3, ±6°))`, mirrored for the second bot; **squash** `scale(1+s·.6, 1−s)` with `s = min(|vel|·.004, .05)`; eyes look in the scroll direction (`+clamp(vel·.35, ±4)`); **lift** parallax `(offset from centre)·−0.05`. Everything eases back to rest. |
| Bots, hover / click | Hover (mouse) `bot-hop` .62s + double blink; click or tap `bot-boop` .8s. |
| Reveal | Shared `.reveal` (26px fade-up, 80ms sibling stagger) for the examples, under the hood and closing; hairlines draw in for handles and rows. |
| Examples | Notch reading fades in (.4s / .6s, .2s delay) when in view; notch eyes blink; Crankobot's "typing" dots loop (only while not reduced). |
| Floor | Shared typed wordmark (see the restyle spec §6). |
| Reduced motion | No boot, scan, rise, reveal, bob, blink, sway or eye-follow. The floor is static and the examples are fully visible. |

Performance: the shared single rAF loop reads all rects first, then writes. Actors update only while intersecting (100px margin), and the loop pauses when the tab is hidden. In the stage, only transforms change.

---

## 5. Type
Shared: Geist 600 display with Geist Mono accents.

| Role | Size |
|---|---|
| H1 | `clamp(3.3rem, 14vw, 7.5rem)` → ≥640 `clamp(4.6rem, 9vw, 7.5rem)`, −.058em |
| Bot headline | `clamp(1.75rem, 3vw, 2.5rem)`, max 17ch |
| Body | 1.04rem `--text-2`, max 46ch |
| Handles | mono .8rem with ▸ |
| Closing H2 | `clamp(3rem, 7.4vw, 6rem)` |

## 6. Layout
- **Hero:**
  - top padding: top bar + 3rem (4.25rem ≥1024);
  - columns ≥1024: path + H1 in 1–7, sub + fine print in 8–12, bottom-aligned.
- **Stage `.gb-set`:**
  - padding 3.5 / 4.25 / 4.75rem top;
  - head row: `grok bot · library` and `● they follow your cursor` (fine pointer) or `● tap a bot` (touch).
  - **Cast grid** (`.gb-cast`):

    | Width | Grid areas |
    |---|---|
    | ≥900 | `"a b" / "ia ib"`, column gap 4rem |
    | <900 | `"a b" / "ia ia" / "ib ib"` |

    So on a 390px phone **both bots still stand side by side** (≈8.75rem each). The two info blocks then follow, each led by a mini avatar of its bot and separated by a hairline.
  - Actor size `clamp(8.75rem, 36vw, 17.5rem)`. The horizon sits at ring centre (`margin-bottom: actor × .07`).
- **Examples:** two cards under the stage (columns ≥900), each with the bot, the label and an `example` tag.
- **Under the hood:** 1fr / 1fr ≥1024, then the note.
- **Closing:** `~/next`, H2 + lede on the left; steps 1–3 + the "Follow on X" keycap + "More of my work at kappaemme.dev" (scan) on the right. This is the last section before the floor.

---

## 7. Structure (content unchanged)
1. Boot.
2. **Hero:** "My Grok Bots", "Small bots I build and run inside Grok Bot. / Each one does one job. The code is on GitHub.", "Built by Francesco Mistero. Follow the build on X, or read the code on GitHub. Two bots so far. New ones land here first."
3. **Stage `#library`:**
   - Limit Coach `#bot-limit-coach` and Crankobot `#bot-crankobot`: name, subtitle, headline, body, 4 handles, GitHub link, proof (Crankobot: "MIT · 1,000+ stars on GitHub").
   - Examples: the LimitNotch notch (50%, "Claude · Resets in 1h 52m", Auto / Claude / Codex) and Crankobot's library (report.html, prospects.csv, report.md, "P1 and P3 fit. Find 5 more.").
4. **Under the hood:** "They run on Grok Bot." + body + Get Grok Bot (x.ai/bot) + per-bot repo rows + "Want one of your own? Start from the code. Both bots are built on public repositories."
5. **Closing:** "Small bots, built in the open." + lede + 3 steps + Follow on X + "More of my work at kappaemme.dev."
6. **Floor:** lead; columns `index` (home, projects, skills, coffee), `bots` (grok bots + LimitNotch ↗ + First Customer Finder ↗ from data), `elsewhere` (github, x, grok bot ↗); wordmark → `https://kappaemme.dev/`; status line.

**Copy and facts:** unchanged from the READMEs (checked 17 Oct 2026). The mocks stay tagged `example`. There is no builder section, and no empty slots.

## 8. Accessibility
- The boot is `aria-hidden`, non-blocking for assistive tech and skippable.
- The stage heading is visually hidden ("The library"). Bot names and info are real text, always visible, and work on touch with nothing hover-only. Avatars are `aria-hidden`; the actor body is not focusable (decorative).
- Focus ring: 2px blue. Top bar current page: `aria-current="page"`.

---

## 9. Codex checklist for `grok-bot/index.html`
- [ ] `<head>`:
  - fonts Geist 400–700 + Geist Mono;
  - `<link rel="stylesheet" href="/assets/site.css">` (from `design/restyle/shared.css`);
  - **the boot inline script from `prototype.html` before it**;
  - `bots.data.js`.
- [ ] **Delete** the old inline CSS and markup for:
  - `.gb-intro` (curtain) and its intro script;
  - `.gb-chip*`, `.gb-nav*` (pill + lamp);
  - `.gb-crew*`, `.gb-label`;
  - `.gb-cta*` + `.gb-bubble` + `LINES` wake code;
  - `.gb-tiles` / `.gb-tile*` / `.gb-slot`;
  - `.gb-sticky`;
  - the old `.site-footer` paper footer and its reveal code;
  - `.gb-cursor`.
- [ ] Add after `<body>`: the icon sprite (`i-ne`, `i-back`, `i-gh`, `i-x`, `i-file`), `.gb-boot` markup, `.k-skip`, `.k-cursor`, `.k-scan`, and the `.k-top.k-top--sub` header (Grok Bots current; home, coffee, brand and "kappaemme.dev" links with `data-scan`).
- [ ] Main content: hero, `#library` (`.gb-set > .gb-cast#gb-cast` + `#gb-examples`), `#hood`, closing, all as in `prototype.html`, inside `.site-content > main#main`. Then the `.k-floor` with the wordmark `href="https://kappaemme.dev/"`.
- [ ] Copy the page `<style>` block (boot, hero, stage, info, examples, hood, closing) and the page script (render from `GROK_BOTS`, then `KM.boot()`, then the boot / skip / wake logic). Load `/assets/site.js` before it.
- [ ] `bots.data.js`: keep `GROK_BOTS` as is. `GROK_BOT_INTRO` and `GROK_BOT_SLOTS` become unused; delete them or leave them. The page never renders slots.
- [ ] Production links:

  | Link | Target |
  |---|---|
  | home | `/` |
  | coffee | `/coffee/` |
  | footer projects, skills | `/#products`, `/#skills` |
  | wordmark, "More of my work" | `https://kappaemme.dev/` |
- [ ] Keep `<title>`, description, canonical, OG tags and favicon (`assets/limit-coach.svg`). Set `theme-color` to `#000000`; the dynamic theme-color code is removed with the curtain.
- [ ] QA:
  - 390px: both bots side by side, info blocks below with mini avatars, no overflow;
  - reduced motion: no boot and a static floor;
  - touch: tap boops and aims the eyes.
- [ ] Before launch: refresh the star count in `bots.data.js` (`proof`), and confirm the Limit Coach subtitle "Claude + Codex limits" with Francesco.
