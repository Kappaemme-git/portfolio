# Kappaemme — Portfolio

Sito personale di **Francesco Mistero** (Kappaemme), studente di Computer Science e indie hacker. Home, pagina Coffee e libreria Grok Bots condividono il restyle v2: fondo nero, tipografia Geist e Geist Mono, etichette `~/section`, dettagli ispirati al terminale e accenti blu Limit Coach.

## Pagine e file

- `index.html` — home con progetti, skill Codex, anteprima di Limit Coach e Crankobot, post condivisi su X, stack, percorso, supporto e contatti.
- `coffee/index.html` — pagina di supporto con donazione tramite Stripe, motivi per contribuire e contatti.
- `grok-bot/index.html` — libreria Grok Bots con introduzione boot-log, palco condiviso, esempi e link ai repository.
- `grok-bot/bots.data.js` — dati dei due bot usati dalla home e dalla libreria.
- `assets/site.css` e `assets/site.js` — stile e interazioni comuni alle tre pagine. Il CSS specifico di ogni pagina resta nel suo HTML.
- `images/`, `coffee/km-logo.*` e `grok-bot/assets/` — foto, loghi, icone e favicon.

Il sito è statico, senza framework o build. I riferimenti locali tra pagine e asset sono relativi alla cartella di ciascuna pagina, così funzionano anche quando il sito è pubblicato sotto un sottopercorso. Il wordmark finale di Grok Bots punta al dominio pubblico.

## Interazioni

La barra di navigazione usa un caret blu per la sezione o pagina corrente. Su mobile, il menu della home apre un pannello a tutta pagina. I link tra le pagine possono avviare una breve transizione con scan line; all'arrivo in Grok Bots compare un boot log saltabile. Le skill mostrano le stelle aggiornate da GitHub, mantenendo i valori di riserva se l'API non risponde.

Limit Coach e Crankobot sono gli unici bot mostrati. I loro occhi seguono il puntatore, reagiscono allo scroll e al tap. Il footer scuro emerge sotto la pagina e mostra il wordmark `kappaemme.dev` lettera per lettera. Le animazioni rispettano `prefers-reduced-motion`; il puntatore del mouse resta quello di sistema.

La home conserva i tag SEO, Open Graph e Twitter e lo snippet Vercel Web Analytics. Il link Stripe è `https://buy.stripe.com/bJedR96H14WF5xmezS57W03`.

## Anteprima locale

Dalla radice del repository:

```sh
python3 -m http.server 8769
```

Apri `/index.html`, `/coffee/index.html` o `/grok-bot/index.html`.
