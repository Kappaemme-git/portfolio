# Kappaemme — Portfolio

Sito personale di **Francesco Mistero** (Kappaemme), studente di Computer Science e indie hacker. La home usa uno stile editoriale chiaro: fondo carta, testo nero, grandi titoli Geist e card arrotondate. I progetti portano i propri colori; Grok Bots e Contact sono le due sezioni scure.

## 1. File e tecnologia

- `index.html` — home su `/`, con HTML, CSS e JavaScript senza framework né build.
- `coffee/index.html` — pagina di supporto su `/coffee/`, con lo stesso linguaggio visivo della home.
- `grok-bot/index.html` — libreria su `/grok-bot/`, con la sua interfaccia scura approvata. Bot e frame dell'intro sono definiti in `grok-bot/bots.data.js`.
- `images/`, `coffee/km-logo.*` e `grok-bot/assets/` — foto, icone e immagini delle pagine. I percorsi della home partono dalla radice del sito.
- CSS, icone SVG dell'interfaccia e JavaScript delle pagine sono incorporati nei rispettivi file. Geist e Geist Mono arrivano da Google Fonts.
- La home aggiorna le stelle delle skill con una richiesta alla GitHub API; i valori di riserva restano visibili quando l'API non risponde. Lo snippet Vercel Web Analytics e i tag SEO, Open Graph, Twitter e favicon sono nella home.

Per l'anteprima locale, dalla radice del repo esegui `python3 -m http.server 8767`, poi apri `/`, `/coffee/` o `/grok-bot/`.

## 2. Struttura della home

La navigazione fissa porta a otto sezioni. Su schermi piccoli diventa un pulsante **Menu** che apre un pannello a tutta pagina.

| # | Sezione | Contenuto |
|---|---------|-----------|
| — | Hero | Presentazione, ritratto, link a progetti, contatti e social. |
| 01 | Projects | Metodo ZAC e VibeDesk in evidenza; metodo ZAC · website, pocketflow e glorydraw nella lista. |
| 02 | Skill library | Dieci skill open source, divise tra le più apprezzate e le uscite recenti. |
| 03 | Grok Bots | Limit Coach e Crankobot, con link alla libreria. |
| 04 | Shared on X | Cinque quote post di Greg Brockman, con link ai post originali e cifre datate. |
| 05 | Stack | Dodici linguaggi, framework e strumenti. |
| 06 | Journey | Computer Science alla Federico II e progetti costruiti in pubblico. |
| 07 | Coffee | Link Stripe e motivi per sostenere il lavoro, con rimando a `/coffee/`. |
| 08 | Contact | Email, X e GitHub su una fascia scura. |

Il footer color carta viene rivelato sotto l'ultima sezione e raccoglie il wordmark, i link del sito e i contatti.

## 3. Design tokens

- Fondo `#F2F2EF`, card bianche `#FFFFFF`, testo `#0A0A0A`.
- Grok Bots e Contact su nero; pannello dei bot `#161616`.
- Blu Limit Coach `#2474F7` per bot, focus e pochi accenti; verde `#0E9F7A` per gli indicatori Live.
- Tessere dei progetti nei colori Metodo ZAC `#0B193E` e VibeDesk `#613F6D`.
- **Geist** per il testo e i titoli, **Geist Mono** per numeri, badge e dettagli.
- Container fino a 76rem, griglia a 12 colonne per le testate, card arrotondate e barre numerate.

## 4. Effetti e accessibilità

Hero e sezioni entrano con lievi movimenti verticali e dissolvenze; le righe si disegnano all'apparire. Il pulsante “Meet the bots” riprende la piccola interazione della libreria Grok Bots. Il footer scorre in vista sotto il contenuto. Le animazioni rispettano `prefers-reduced-motion`: contenuto subito visibile, footer nel flusso normale e navigazione diretta.

Ogni sezione ha un titolo e un'ancora; è presente un link per saltare al contenuto. Menu e pulsanti hanno etichette e focus visibile. Le card di Shared on X scorrono orizzontalmente su mobile tramite scroll nativo.

## 5. Stack — tessere e colori

Ordine: **C, Java, JavaScript, Python, React, Electron, GitHub, VS Code, Firebase, PostgreSQL, Railway, Stripe**. Le icone mantengono i colori di brand sulle tessere bianche; C usa `#00599C`, React `#149ECA`, GitHub e Railway usano il nero.

## 6. Skill library e Shared on X

Le dieci skill sono curate in `index.html`. Una sola chiamata alla GitHub API aggiorna le stelle delle prime cinque righe; se fallisce, rimangono i valori di riserva. Le cinque card di Shared on X conservano URL, testi e cifre dei post; la data di verifica è indicata sotto le card.

## 7. Coffee

Il bottone **Buy me a coffee** della home e **Donate with Stripe** su `/coffee/` aprono lo stesso link Stripe: `https://buy.stripe.com/bJedR96H14WF5xmezS57W03`. La pagina Coffee presenta Build, Learn e Repeat, oltre ai link Email e GitHub.

## 8. Responsive

- Sotto 1024px la home usa il menu a pannello; la pagina Coffee e Grok Bots mostrano le icone della navigazione sui viewport più stretti.
- I progetti passano da due colonne a una, le skill restano completamente visibili senza scroll interno e lo stack si dispone su 6, 4 o 3 colonne secondo la larghezza.
- Le card di Shared on X diventano un carosello a scorrimento nativo. Journey e Coffee si impilano in verticale.
- Il layout è pensato per viewport mobili da 390px senza overflow orizzontale.
