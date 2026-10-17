/*
 * Grok Bot library — single source of truth for every bot on the page.
 *
 * To add a bot: append one object to the array. The stage, examples,
 * repository rows and footer bot links render from here.
 *
 * Avatar geometry lives in a 100 × 100 viewBox:
 *   shape "circle" → <circle cx=50 cy=50 r=45>
 *   shape "blob"   → soft, slightly squashed circle (see BLOB in assets/site.js)
 *   eyes           → capsules: centre (cx, cy), width w, height h, rotation rot (deg)
 * Eyes are clipped to the body, so cursor-follow can never push them outside.
 *
 * Facts only: every claim below comes from the public READMEs of the repos
 * (checked 17 Oct 2026). Mock values are tagged `example` and are copied from
 * those READMEs, not invented.
 */
window.GROK_BOTS = [
  {
    id: "limit-coach",
    name: "Limit Coach",
    featured: true,
    subtitle: "Claude + Codex limits",
    projectName: "LimitNotch",
    // Only strong colour on the page.
    color: "#2474F7",
    pill: { bg: "#2474F7", fg: "#FFFFFF" },
    tile: "blue", // blue | light | dark
    avatar: {
      shape: "circle",
      body: "#2474F7",
      eye: "#050505",
      // Measured from the Grok Bot app avatar: two dashes, top-centre/right,
      // tilted ~37°, the far eye thinner (sphere looking up-right).
      eyes: [
        { cx: 55, cy: 35, w: 10, h: 21, rot: -37 },
        { cx: 75.5, cy: 26, w: 7, h: 19, rot: -37 }
      ]
    },
    label: "Featured bot",
    headline: "It watches my limits, so I don't have to.",
    body:
      "Limit Coach keeps an eye on my Claude and Codex usage limits, right on my Mac. It feeds LimitNotch, the little app that lives in the MacBook notch and shows how much is left before the next reset.",
    handles: [
      "Claude 5-hour window",
      "Claude weekly window",
      "Codex usage windows",
      "Feeds LimitNotch in the notch"
    ],
    links: [
      { label: "LimitNotch on GitHub", url: "https://github.com/Kappaemme-git/limit-notch" }
    ],
    mock: {
      type: "notch",
      example: true,
      // From the limit-notch README: "Claude · Resets in 1h 52m", claude_5h 49.9
      value: "50%",
      caption: "Claude · Resets in 1h 52m",
      switch: ["Auto", "Claude", "Codex"]
    }
  },
  {
    id: "crankobot",
    name: "Crankobot",
    featured: false,
    subtitle: "First Customer Finder",
    projectName: "First Customer Finder",
    color: "#FFFFFF",
    pill: { bg: "#FFFFFF", fg: "#0A0A0A" },
    tile: "light",
    avatar: {
      shape: "blob",
      body: "#FFFFFF",
      eye: "#050505",
      // Two vertical-ish ovals, top right, tilted ~22°.
      eyes: [
        { cx: 59, cy: 38, w: 9, h: 20, rot: -22 },
        { cx: 78.5, cy: 32.5, w: 6.5, h: 19, rot: -22 }
      ]
    },
    label: "Crankobot",
    headline: "It finds the people already asking.",
    body:
      "Crankobot looks for public signals of demand, like people asking for a tool or stuck on a manual workaround, and turns them into a shortlist of potential first customers. It runs on First Customer Finder, my open-source Codex skill. It never sends outreach for you.",
    handles: [
      "Reads public demand signals",
      "Qualifies and scores prospects",
      "Checks for a public contact route",
      "Drafts the next manual step"
    ],
    links: [
      {
        label: "First Customer Finder on GitHub",
        url: "https://github.com/Kappaemme-git/codex-first-customer-finder-skill"
      }
    ],
    // Real, from GitHub on 17 Oct 2026 (1,094 stars, MIT). Refresh before launch.
    proof: "MIT · 1,000+ stars on GitHub",
    mock: {
      type: "files",
      example: true,
      // File names as they appear in Crankobot's Grok Bot library.
      files: ["report.html", "prospects.csv", "report.md"],
      // Prompt pattern from the skill README ("P1 and P3 fit… find 5 more").
      message: "P1 and P3 fit. Find 5 more."
    }
  }
];
