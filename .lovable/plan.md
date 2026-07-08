## Obiettivo

Costruire un'architettura SEO parallela al funnel di conversione. La homepage e `/preventivo-bologna` **non vengono modificate nei contenuti né appesantite** — restano pagine di conversione. Tutta la nuova SEO vive su pagine dedicate che linkano al form/WhatsApp della home.

## Cosa esiste già (non duplicare)

- Home `/` (conversione — non toccare contenuti)
- Landing `/preventivo-bologna` (conversione — non toccare)
- `/fotovoltaico-privati`, `/fotovoltaico-aziende` → esistono, verranno arricchiti
- `/agevolazioni/detrazioni-privati` + 4 città (BO/MO/FE/RA) → esistono
- `/agevolazioni/agevolazioni-aziende` + 4 città → esistono
- `/calcola-rendimento`, `/lavori-realizzati`, `/chi-siamo`, `/contatti` → esistono

## Nuove pagine da creare

**Pagine città "Fotovoltaico [città]"** (informative, NON confondere con landing pubblicitaria Bologna):
- `/fotovoltaico-bologna` (informativa SEO, distinta da `/preventivo-bologna` che è la landing ADS)
- `/fotovoltaico-modena`
- `/fotovoltaico-ferrara`
- `/fotovoltaico-ravenna`

Ogni pagina città avrà: H1 unico, 600-900 parole di testo UNICO per città (specifiche irraggiamento zona, riferimenti a quartieri/aree, casi installati locali quando disponibili), 2-3 foto diverse, FAQ 6-8 domande, breadcrumb, Schema LocalBusiness + FAQPage, sezione "Approfondimenti correlati" (4 link).

**Blog** (5 articoli iniziali):
- `/blog` (indice)
- `/blog/conviene-fotovoltaico`
- `/blog/quanto-costa-impianto-fotovoltaico`
- `/blog/accumulo-fotovoltaico-conviene`
- `/blog/incentivi-fotovoltaico-aziende`
- `/blog/roi-fotovoltaico`

Ogni articolo: 800-1200 parole, H1/H2/H3 coerenti, Schema Article + BreadcrumbList, CTA finale al form/WhatsApp, 4 link interni correlati.

## Componenti riutilizzabili (nuovi)

1. **`SEOFAQ`** — accordion FAQ + injection automatica JSON-LD FAQPage
2. **`Breadcrumb`** — visuale + Schema BreadcrumbList
3. **`ApprofondimentiCorrelati`** — box "Potrebbero interessarti" con 4 link interni configurabili
4. **`CTAConversione`** — CTA doppia "Richiedi sopralluogo" (link al form home #contatti) + "Chiama ora" (tel:), presente in ogni pagina informativa

## Modifiche a pagine esistenti (leggere, non-invasive)

Su `/fotovoltaico-privati`, `/fotovoltaico-aziende`, `/agevolazioni*`, `/chi-siamo`, `/lavori-realizzati`, `/calcola-rendimento`:
- Aggiungere in fondo `<ApprofondimentiCorrelati>` con 4 link contestuali
- Aggiungere `<Breadcrumb>` sotto l'header
- Verificare presenza di 2 CTA (sopralluogo + chiama)
- Aggiungere FAQ solo dove sensato (fotovoltaico-privati, fotovoltaico-aziende, agevolazioni index)

**Home e `/preventivo-bologna`**: NESSUNA modifica di contenuto. Solo verifica che i link nel footer/header portino alle nuove pagine città e blog.

## SEO tecnico

- **Sitemap**: aggiornare `public/sitemap.xml` con tutte le nuove URL (4 città + 6 blog)
- **Canonical**: ogni nuova pagina self-referential via `SEOHead`
- **Robots**: verificare che nessuna nuova pagina abbia noindex
- **Title/Description**: unici, 55-60 / 140-155 caratteri, con menzione città/tema
- **Open Graph**: og:title + og:description differenti per pagina
- **Schema.org**: LocalBusiness (nelle città), Organization (già in index.html), BreadcrumbList (tutte informative), FAQPage (dove ci sono FAQ), Article (blog)
- **Link interni città**: le pagine `fotovoltaico-[città]` linkano `agevolazioni-privati-[città]` e viceversa (silo tematico)

## Routing

Aggiungere in `src/App.tsx`:
```
/fotovoltaico-bologna, /fotovoltaico-modena, /fotovoltaico-ferrara, /fotovoltaico-ravenna
/blog, /blog/:slug (o 6 route esplicite lazy-loaded)
```

## Footer

Ristrutturare il footer in 4 colonne linkando la nuova architettura (Fotovoltaico per città, Agevolazioni, Blog, Contatti) — massimizza link interni verso tutte le pagine SEO e aiuta l'indicizzazione delle 17 pagine "rilevate ma non indicizzate" in GSC.

## Fasi di implementazione

1. Componenti riutilizzabili (`SEOFAQ`, `Breadcrumb`, `ApprofondimentiCorrelati`, `CTAConversione`)
2. 4 pagine città "Fotovoltaico [città]" con contenuto unico differenziato
3. Blog: indice + 5 articoli
4. Iniezione FAQ/Breadcrumb/Correlati nelle pagine esistenti
5. Footer ristrutturato con tutti i link interni
6. Sitemap + routing aggiornati
7. Genero 4-6 immagini nuove (una per città + copertine blog)

## Fuori scope (per rispettare l'obiettivo conversione)

- Nessun testo lungo su `/` e `/preventivo-bologna`
- Nessun cambio ai form di conversione
- Nessuna modifica al calcolatore

Vuoi che parta subito con l'esecuzione di tutte le 7 fasi? È un intervento lungo (~15-20 file nuovi + 8-10 modificati).