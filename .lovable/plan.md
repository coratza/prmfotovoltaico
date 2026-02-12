

## Modifiche richieste al sito PRM Fotovoltaico

Ci sono 5 aree di intervento principali.

---

### 1. Rinominare "Calcola Preventivo" in "Calcola Rendimento"

Aggiornare il nome in tutti i punti dove compare:
- **Header** (navigazione desktop e mobile)
- **Route** in App.tsx: da `/calcola-preventivo` a `/calcola-rendimento`
- **Titolo della pagina** CalcolaPreventivo.tsx (che verra rinominato)
- **Testi dei bottoni** nelle varie sezioni che linkano a questa pagina
- **Footer** se presente

---

### 2. Pagina "Calcola il tuo Rendimento" - Hero piu accattivante

Attualmente la pagina mostra un hero grigio con solo icona e testo, poi il form appare sotto dopo scroll. La modifica:

- Rimuovere l'hero vuoto e portare il form subito in primo piano
- Aggiungere un layout a due colonne (desktop): a sinistra i vantaggi/motivazioni con icone, a destra il form step 1 immediatamente visibile
- Su mobile il form appare subito sotto un breve titolo
- Titolo: "Calcola il Tuo Rendimento"
- Sottotitolo breve e accattivante tipo: "Inserisci i tuoi dati e scopri subito quanto puoi risparmiare e guadagnare con il fotovoltaico"

---

### 3. Sezione Agevolazioni piu ricca

La pagina `/agevolazioni` e le sue sottopagine sono attualmente testuali e scarne. Interventi:

- Aggiungere immagini stock realistiche (da URL Unsplash) nella pagina hub `/agevolazioni`: foto di case con pannelli per privati, capannoni industriali per aziende
- Arricchire le card delle categorie con piu dettagli e punti elenco sui benefici
- Aggiungere una sezione "Come funziona" con 3 step illustrati (consulenza, installazione, detrazione)
- Nel template `AgevolazionePageTemplate`, aggiungere un'immagine hero e icone accanto ai requisiti

---

### 4. Lavori Realizzati - Foto diverse e realistiche

Attualmente i 6 progetti usano solo 3 foto ripetute (heroImage, villaSolar, industrialSolar). Ogni progetto avra una foto diversa da Unsplash (URL diretti a foto realistiche di impianti fotovoltaici su case, capannoni, ville, aziende agricole):

- Progetto 1 (Villa unifamiliare): foto casa residenziale con pannelli sul tetto
- Progetto 2 (Casa indipendente): foto diversa, casa con pannelli
- Progetto 3 (Capannone artigianale): foto capannone industriale con pannelli
- Progetto 4 (Bifamiliare): foto bifamiliare con pannelli
- Progetto 5 (Azienda agricola): foto struttura agricola con pannelli
- Progetto 6 (Villa con piscina): foto villa di pregio con pannelli

Verranno usate immagini da Unsplash via URL diretto per massima varieta e realismo.

---

### 5. Aggiornare telefono e email in tutto il sito

**Vecchio telefono:** +39 324 611 7388
**Nuovo telefono:** +39 335 611 7388

**Vecchia email:** info@prmfotovoltaico.it / info@solartech-bologna.it
**Nuova email:** prm.navone@legalmail.it

File da aggiornare (13 file contengono il vecchio numero):
- `src/components/layout/Header.tsx` (2 occorrenze)
- `src/components/layout/Footer.tsx` (telefono + email)
- `src/components/layout/MobileCallBar.tsx`
- `src/components/sections/HeroSection.tsx`
- `src/components/sections/ClaritySection.tsx`
- `src/pages/CalcolaPreventivo.tsx` (2 occorrenze)
- `src/pages/LavoriRealizzati.tsx`
- `src/pages/Contatti.tsx` (telefono + email, 3 occorrenze)
- `src/pages/ChiSiamo.tsx` (2 occorrenze)
- `src/pages/Agevolazioni.tsx`
- `src/pages/FotovoltaicoAziende.tsx` (2 occorrenze)
- `src/pages/FotovoltaicoPrivati.tsx`
- `src/components/AgevolazionePageTemplate.tsx`

---

### Dettagli tecnici

**File da modificare:**
- `src/App.tsx` - route rename
- `src/components/layout/Header.tsx` - nav label + telefono
- `src/components/layout/Footer.tsx` - telefono + email
- `src/components/layout/MobileCallBar.tsx` - telefono
- `src/pages/CalcolaPreventivo.tsx` - rinominare + nuovo layout hero/form
- `src/pages/Agevolazioni.tsx` - contenuto arricchito con immagini
- `src/components/AgevolazionePageTemplate.tsx` - aggiunta immagini + telefono
- `src/pages/LavoriRealizzati.tsx` - foto diverse per ogni progetto
- `src/components/sections/DetrazioniPreviewSection.tsx` - se contiene link
- `src/components/sections/HeroSection.tsx` - telefono
- `src/components/sections/ClaritySection.tsx` - telefono
- `src/pages/Contatti.tsx` - telefono + email
- `src/pages/ChiSiamo.tsx` - telefono
- `src/pages/FotovoltaicoAziende.tsx` - telefono
- `src/pages/FotovoltaicoPrivati.tsx` - telefono

**Nessuna modifica al database necessaria.**

