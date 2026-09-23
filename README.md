# Kappaemme — Portfolio

Sito personale di **Francesco Mistero** (Kappaemme): CS student & indie hacker.
Estetica **dark / terminale**, allineamento a sinistra per le sezioni, hero centrato.

---

## 1. File e tecnologia

- **Pagina principale: `index.html`** — HTML, CSS e JavaScript senza framework né build.
- **Asset locali:** la cartella `images/` contiene foto, icone e anteprima social. La pagina `coffee/index.html` è separata.
- **Dipendenze esterne (solo queste):**
  - Google Fonts: **Geist** + **Geist Mono** (`fonts.googleapis.com`).
  - GitHub API (`api.github.com`) per aggiornare le stelle delle skill selezionate; la lista resta visibile anche se l'API non risponde.
- Stili, animazioni e icone della pagina principale sono **incorporati** nel file.
- SEO incluso: `<title>`, meta description, Open Graph / Twitter card, favicon (monogramma KM), `theme-color`.

---

## 2. Struttura delle sezioni (in ordine)

| # | Sezione | Note |
|---|---------|------|
| — | **Header / nav** | Sticky, blur. Voci: Projects, Skills, On X, Stack, Journey, Coffee, Contact. |
| — | **Hero** | Nome + scritta ASCII "KAPPAEMME" + tagline + lede + icone social. |
| 01 | **Projects** | Sette progetti, inclusi l'app iPhone e il sito Metodo ZAC, Microdex e Breathe 3D. |
| 02 | **Skill library** | Dieci skill selezionate: successi open source e nuove uscite. |
| 03 | **Shared on X** | Cinque card con i quote post di Greg Brockman e link ai post originali. |
| 04 | **Stack** | Griglia di 12 tessere tecnologiche con icone a colori di brand. |
| 05 | **Journey** | Timeline (CS student @ Federico II, indie hacker). |
| 06 | **Coffee** | "Support the next build." + bottone Stripe. |
| 07 | **Contact** | GitHub / Email / X. |
| — | **Footer** | Copyright + link social. |

---

## 3. Design tokens (colori e font)

- Sfondo: `#000000` · Testo: `#ffffff` (secondario 60%, terziario 40%).
- Bordi: bianco 10% / 22%.
- Accento "live": verde `#10a37f` (dot di stato).
- Font testo: **Geist** · Font mono/accenti: **Geist Mono**.
- Raggi, spaziature e transizioni gestiti con variabili CSS in `:root`.

---

## 4. Effetti e animazioni

### Ingresso (al caricamento)
- Header in dissolvenza dall'alto.
- Hero (nome, tagline, lede, icone) in **fade-up scaglionato**.
- Sezioni che salgono dolcemente allo scroll (IntersectionObserver).

### Scritta "Kappaemme" (ASCII) — effetto CRT retro
- **Reveal a "stampa"** da sinistra a destra a scatti (`steps`), stile terminale.
- **Bagliore fosforo** (text-shadow morbido).
- **Scanline** orizzontali sottili (vecchio monitor).
- **Flicker** leggero e frequente (ciclo ~2,8s).
- **Hover:** il bagliore si intensifica.

> Tutte le animazioni si disattivano automaticamente con `prefers-reduced-motion`.
> Senza JavaScript le sezioni restano comunque visibili.

---

## 5. Stack — tessere e colori

Ordine: **C, Java, JavaScript, Python, React, Electron, GitHub, VS Code, Firebase, PostgreSQL, Railway, Stripe** (12 tessere, così la griglia resta bilanciata).

Icone SVG incorporate, con colori di brand ufficiali:
`C #A8B9CC` · `Java #5382A1` · `JavaScript #F7DF1E` · `Python #3776AB/#FFD43B` · `React #61DAFB` · `Electron #47848F` · `VS Code #007ACC` · `Firebase #FFA000` · `PostgreSQL #4169E1` · `Stripe #635BFF`.
**GitHub** e **Railway** restano **bianchi** (il loro logo è nero → invisibile su sfondo nero).

---

## 6. Skill library — logica

La lista è curata direttamente in `index.html`: le prime righe evidenziano le skill con maggiore riscontro su GitHub; seguono alcune uscite recenti. Un'unica chiamata alla GitHub API aggiorna le stelle delle prime cinque righe. Se la richiesta fallisce, restano visibili le etichette di riserva. Per aggiungere una skill, modifica la lista HTML e il conteggio nella testata.

La sezione **Shared on X** contiene cinque link ai quote post pubblici di Greg Brockman. Le cifre di interazione sono una fotografia verificata il 23 settembre 2026, riportata anche sotto le card. Non dipende dall'API di X.

---

## 7. Coffee — donazioni

- Titolo: **"Support the next build."**
- Bottone **Buy me a coffee** → link Stripe:
  `https://buy.stripe.com/bJedR96H14WF5xmezS57W03` (apre in nuova scheda).
- Bottoni secondari: *My work* (→ Projects) e *Contact me* (→ email).

---

## 8. Mobile (≤ 760px)

- Menu **scorrevole in orizzontale** (tutte le voci raggiungibili).
- Tabelle Projects e Skills compattate a 3 colonne.
- Stack a 2 colonne · Timeline impilata in verticale.
- Scritta ASCII rimpicciolita per non sforare. Nessun overflow orizzontale.

---

## 9. Pubblicazione (GitHub → Vercel)

1. Metti `index.html` nella **radice** del repo collegato a Vercel, sovrascrivendo la home.
2. `git add index.html && git commit -m "Update portfolio" && git push`
3. Vercel ridistribuisce da solo (~1 min) su `kappaemmedev.vercel.app`.

> ⚠️ Verifica prima la struttura del repo: se la home attuale **non** è un `index.html` semplice (es. file con front-matter `meta-...`, oppure cartelle separate `coffee/`, `contact/`), il sito è generato da uno strumento e va integrato diversamente — non sovrascrivere alla cieca.
