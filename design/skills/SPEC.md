# Skills page (`/skills/`): design spec

Design source: `design/skills/prototype.html`. Screenshots: `.shots/skills-design/`.
Codex implements this as `skills/index.html`. It uses the same light v3 system as `/grok-bot` and `/coffee` (`assets/site.css`, `assets/site.js`).

**Rules**
- **Content.** Only the ten real skills from the home "Skill library": real names, descriptions, repos, star mechanism and fallbacks.
- **Copy.** Every sentence comes from existing site wording. "built for Codex" appears as plain text only.
- **No brand marks.** No OpenAI or Codex logo or mark anywhere: no icon, favicon, OG image or boot art.
- **Labels and cursor.** No numbered labels. Normal system cursor.

---

## 1. Port the prototype to `skills/index.html`

1. Copy `design/skills/prototype.html` to `skills/index.html`.
2. Rewrite the prototype-only paths (they are flagged in a comment in `<head>`):
   - `../../assets/` → `../assets/` (site.css, site.js);
   - `../../images/` → `../images/` (favicon, KM mark).
3. Delete the `PROTOTYPE PATHS` comment.
4. Leave every page link as it is. They are already the production links: `../`, `../grok-bot/`, `../grok-bot/#bot-crankobot`, `../coffee/`, `../#products`, `#top`, `#most-starred`, `#recent`.

## 2. Page composition

| # | Block | Notes |
|---|---|---|
| 0 | **Boot** `.sk-boot` | Colour frames: paper → white → blue, 0.4s apart. Then the `ls` log. The overlay slides down at 1.5s (`translateY(100%)`, .8s `--ease-io`); its 2px blue top edge is the scan line. `--enter: 1.65s`. |
| 1 | **Hero** `.sk-hero` | Same two-column head as `/grok-bot`. Left: `~/codex-skills` and the h1 "Codex *skills.*" (`.k-dim`). Right: the sub and the mono fine print. |
| 2 | **Most starred** `#most-starred` | `.k-head` with `~/most-starred` and the count "5 skills", then the 12-col bento and the note "Star counts refresh from GitHub on load." |
| 3 | **Recent releases** `#recent` | `.k-head` with `~/recent-releases` and "5 skills", then the bento. |
| 4 | **Closing** `.sk-close` | `~/next`, "Read the code *on GitHub.*", and two reach rows: GitHub (all repositories) and home (`../`, scan). |
| 5 | **Floor** | Shared typed `kappaemme.dev` wordmark with the blinking blue caret. Columns: index / skills / elsewhere. |

### 2.1 Boot (detail)
- **Frames** (`--i` 0/1/2, `--f` = `#F2F2EF` / `#FFFFFF` / `#2474F7`), with the centre art `.sk-deck`. The deck sits at 42% from the top (27% below 768px) and is hidden when the viewport is shorter than 600px.
  - **Frame 0:** a blinking blue caret block (the site's caret motif).
  - **Frame 1:** a blue skill card pops (`card-pop`, `--spring`, .6s).
  - **Frame 2:** a white card and an ink card fan out to ±9°. The blue card stays in front with a 1.5px ink ring, so it survives the blue frame (same trick as Limit Coach's log dot).
  - The cards are the page's tiles in miniature (bars only, no text, no logos).
- **Log** (ink on every frame; `--at` per line):
  ```
  $ cd ~/codex-skills          .06s
  $ ls                         .34s
  ● <10 repo names>            .48s + 50ms each   (2 columns ≥768: most starred | recent; 1 column below)
  10 skills online · built for Codex   1.08s
  ```
  The green dots are `--live` with a `currentColor` ring.
- **Same contract as `/grok-bot`:**
  - plays once per session (`sessionStorage` key `ksk-booted`), or whenever the page is entered through the scan (`k-scan`);
  - skippable on keydown, wheel, touchstart or pointerdown (`.is-skip`, `--enter: 0s`);
  - hard fallback hide at 2.9s;
  - never plays under reduced motion.

### 2.2 Tiles
Each small tile is one `<a class="sk-tile k-tile k-tile--{white|blue|night} reveal">` that opens the GitHub repo in a new tab.

**Small tile contents, top to bottom:**
1. The star chip (most starred only).
2. `.k-go` arrow (absolute, top right).
3. Mono path `Kappaemme-git /`, pushed to the bottom with `margin-top: auto`.
4. Repo name: Geist 600, `clamp(1.5rem, 2.25vw, 1.9rem)`, with `<wbr>` after hyphens so long names break cleanly.
5. Description.

**Featured tile.** "codex-first-customer-finder-skill" is an `<article class="sk-feature k-tile k-tile--blue">`, not a link, because it holds two links:
- the live star count as the headline number (`clamp(4.75rem, 11vw, 9.5rem)`), with a star and the caption "stars on GitHub" plus a `most starred` tag;
- the ink keycap "Open on GitHub";
- the line "Crankobot runs on it. Meet the bot" → `../grok-bot/#bot-crankobot` (scan). This is real: the Grok Bot page says Crankobot runs on First Customer Finder.

**Colour plan.** Two blue tiles and one black accent tile, everything else white.

| Group | Tile | Colour |
|---|---|---|
| Most starred | codex-first-customer-finder-skill | **blue** (featured, spans 7 cols × 2 rows) |
| | codex-startup-pressure-test-skill | white |
| | codex-complexity-optimizer | **night** `#0A0A0A` (the one black accent; its star chip turns light) |
| | local-client-prospector-skill | white |
| | codex-bug-reproducer | white |
| Recent releases | astra-ad-studio | **blue** |
| | codex-code-avengers, codex-dev-team, startup-feedback-engine, app-store-review-guardian | white |

**Bento grid.**
- `<768`: 1 column. Small tiles use `min-height: 0` and compact spacing.
- 768–1023: 2 columns. The featured tile and an odd last child span both columns.
- ≥1024, Most starred (12 cols):

  ```
  [ featured 1–7, 2 rows ][ pressure-test 8–12  ]
                          [ complexity 8–12     ]
  [ prospector 1–6       ][ bug-reproducer 7–12 ]
  ```

- ≥1024, Recent: `4 / 4 / 4` then `6 / 6`.

**Order.** The order matches the home exactly (the home's "Most starred" order and its "Recent releases" order).

## 3. Stars: reuse `KM.loadStars()`, same fallbacks as the home
- `KM.boot()` already calls `KM.loadStars()`. It fetches `https://api.github.com/users/Kappaemme-git/repos?per_page=100` and fills each `[data-stars]` inside a `[data-stars-repo]` (repo name, lowercase).
- **Fallbacks** are identical to `index.html` and are kept when the fetch fails:

  | Repo | Fallback |
  |---|---|
  | codex-first-customer-finder-skill | `1k+` (featured number, `data-stars-short`, so no " stars" suffix) |
  | codex-startup-pressure-test-skill | `900+ stars` |
  | codex-complexity-optimizer | `900+ stars` |
  | local-client-prospector-skill | `150+ stars` |
  | codex-bug-reproducer | `70+ stars` |

- **Recent releases show no star chip**, exactly as on the home (the home has no verified fallback for them). Do not add one.
- **Verified in the prototype:** the live counts load (1,095 · 991 · 913 · 155 · 76 at capture time) and there are no console errors.

## 4. Copy (all from existing site wording)

| Where | Text | Source |
|---|---|---|
| title | `Codex skills — Kappaemme · Francesco Mistero` | (pattern of the Grok Bot title) |
| h1 | Codex *skills.* | home "Codex skills, open source." |
| hero sub | I share what I learn through Codex skills. / Recent releases and the open-source skills developers have starred most. | home hero lede and Skills lede |
| hero fine | Built by Francesco Mistero, built for Codex. Read the code on GitHub. Star counts refresh from GitHub on load. | Grok Bot fine print and home skills note; "built for Codex" as requested |
| Most starred lede | The open-source skills developers have starred most. | home Skills lede |
| Recent lede | The newest skills in the library, open source on GitHub. | restates "Recent releases" and "open source"; no claims |
| closing | Read the code *on GitHub.* / Published Codex skills used and starred by developers around the world. | home "read the code on GitHub" and the home Journey bullet |
| reach rows | All repositories on GitHub · github.com/Kappaemme-git / More of my work · kappaemme.dev | home and Grok Bot closing |

There are no invented numbers. The "5 skills" and "10 skills online" counts are just the size of the lists.

## 5. Navigation changes on the other pages (clean relative links only)

**Recommended:**
- Home nav "skills" keeps scrolling to `#skills`, so the scroll-spy caret still works.
- The home Skills section gets a clear way into `skills/`.

**Home `index.html`:**
- [ ] The top nav and the sheet menu keep `href="#skills"` (no change).
- [ ] In `#skills`, under the two cards (after `.k-skills`), add:
  ```html
  <div class="k-skills__more reveal"><a class="k-btn k-btn--ghost" href="skills/" data-scan data-busy-text="cd ~/codex-skills"><span class="k-btn__label">See all skills</span><span class="k-key"><svg aria-hidden="true"><use href="#i-ne"/></svg></span></a></div>
  ```
  with `.k-skills__more { display: flex; justify-content: center; margin-top: 1.75rem; }`.
  - The home uses its own inline scan code: if `data-scan` isn't wired there, a plain `href="skills/"` is fine.
  - `data-busy-text` is supported by the shared `site.js` scan.
- [ ] Footer "Skills" link → `skills/`.

**`grok-bot/index.html` and `coffee/index.html` (sub-page nav `.k-links`):** insert after "home":
```html
<a href="../skills/" data-scan><span class="t">skills</span><span class="s">skills</span></a>
```
- [ ] The Grok Bot floor "skills" link changes from `../#skills` to `../skills/` (data-scan).
- [ ] The Coffee floor "skills" link changes from `../#skills` to `../skills/` (data-scan).

**On `skills/` itself:**
- nav: home · **skills** (`#top`, `aria-current="page"`) · grok bots · coffee · on x ↗;
- the brand link goes `../` with the back arrow.

**Five links on sub-pages:**
- At 390 the short labels (`home skills bots coffee x`) fit; this is verified on the skills page.
- The prototype adds `@media (max-width: 389px) { .k-top--sub .k-links a { padding: .75rem .42rem; } }` for 360px phones. **Move this rule into `assets/site.css`**, since Grok Bot and Coffee now have five links too.

**Don't:**
- use root-absolute or `index.html` URLs;
- link to `../#skills` from the sub-pages any more.

## 6. Reused vs new

**Reused from `assets/site.css` / `site.js`, unchanged:**
- layout and type: `.wrap`, `.site-content`, `.k-top--sub`, `.k-brand`, `.k-links` + `.k-caret` (aria-current), `.k-top__gh`, `.k-path`, `.k-count`, `.k-head`, `.k-h2`, `.k-lede`, `.k-dim`;
- tiles and controls: `.k-tile` + `--blue/--white/--night`, `.k-btn`, `.k-key`, `.k-go`, `.k-tag`, `.u-link`;
- motion: `.k-rise`, `.reveal` + `[data-stagger]`, `.k-grow`/`[data-grow]`, `.k-scan` and `data-scan`;
- the floor: `.k-floor` + `.k-mark` typed wordmark;
- JS: `KM.boot()` (reveal, floor, `loadStars`, rAF).

**New, page-local CSS in `skills/index.html` `<style>`:**
- `.sk-boot*`, `.sk-deck`, `.sk-card*` (boot);
- `.sk-hero*`;
- `.sk-group`, `.sk-bento*`;
- `.sk-tile*`, `.sk-stars`;
- `.sk-feature*`;
- `.sk-note`;
- `.sk-close*`;
- `.k-reach` (copied from `/coffee`).

**New JS (page-local, about 15 lines):** the boot finish/skip handler, a copy of `/grok-bot`'s without the bot wake.

**Optional cleanup:** `.gb-boot` and `.sk-boot` now share the same keyframes (`boot-out`, `frame-on`, `boot-line`, `boot-skip`), and `.k-reach` is duplicated in `/coffee` and `/skills`. Both could move into `site.css` as `.k-boot*` / `.k-reach` later. That isn't required for this page.

## 7. Motion and accessibility
- **Hero:** `.k-rise` delays .02 to .24s, offset by `--enter` after the boot or scan.
- **Reveals:** the bento tiles reveal with an 80ms stagger. Hover is a `translateY(-3px)` lift; white tiles also get a soft shadow; `.k-go` fills with the tile's text colour.
- **Reduced motion:** no boot, no lift, and the floor is static (handled in `site.css`).
- **Semantics:**
  - the boot overlay is `aria-hidden`;
  - each section is `aria-labelledby` its h2;
  - the featured tile is an `<article>` labelled by its h3;
  - every external link uses `target="_blank" rel="noopener"`.
- **Contrast:** blue tiles use ink for all text (`.k-tile--blue` scope), and the night tile uses the dark scope. Small text meets AA on every ground.
- **Overflow:** no horizontal overflow at 390 or 1440 (checked).

## 8. Screenshots (`.shots/skills-design/`)
- **Boot:** `desktop-boot-{a,b,c,d}.png`, `mobile-boot-{a,b,c,d}.png` (0.3 / 0.7 / 1.3 / 1.9s).
- **Hero:** `*-01-hero.png`.
- **Most starred:** `*-02-most-starred*.png`.
- **Recent releases:** `*-02-recent*.png`.
- **Closing:** `*-03-close.png`.
- **Footer:** `*-04-footer.png`.
- **Other:** `desktop-full.png`, `desktop-05-hover.png` (black tile hover), `tablet-900-most-starred.png`.
