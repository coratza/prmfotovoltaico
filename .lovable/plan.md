

## Potenziamento SEO pagine Agevolazioni Aziende (Bologna, Modena, Ferrara, Ravenna)

Le 4 pagine esistenti sono troppo scarne (3 sezioni brevi, 5 requisiti generici, nessuna FAQ, nessuno schema markup). Verranno riscritte completamente con contenuti SEO-oriented molto piu ricchi.

---

### Modifiche al template `AgevolazionePageTemplate.tsx`

Il template attuale non supporta FAQ ne schema markup. Verra esteso con:

- **Nuova prop `faqs`**: array di `{ question, answer }` per la sezione FAQ con accordion
- **Nuova prop `introText`**: paragrafo introduttivo SEO-friendly separato dalle sezioni
- **Nuova prop `ctaButtonText`**: testo CTA personalizzabile (es. "Verifica la tua agevolazione")
- **Sezione FAQ** con componente Accordion gia presente nel progetto
- **JSON-LD FAQ Schema** generato automaticamente dalle FAQ e iniettato nel `<head>`
- **JSON-LD LocalBusiness Schema** con riferimento provinciale, generato automaticamente
- **Keyword prop** passata al componente SEOHead per meta keywords specifiche per pagina

---

### Contenuto di ogni pagina provinciale

Ogni pagina avra questa struttura (circa 1500-2000 parole per pagina):

**1. SEO Title** (55-70 caratteri)
- Bologna: "Incentivi Fotovoltaico Aziende Bologna | PRM Fotovoltaico"
- Modena: "Agevolazioni Fotovoltaico Aziende Modena | PRM Fotovoltaico"
- Ferrara: "Contributi Fotovoltaico PMI Ferrara | PRM Fotovoltaico"
- Ravenna: "Agevolazioni Fotovoltaico Aziende Ravenna | PRM Fotovoltaico"

**2. Meta Description** (140-160 caratteri)
Descrizione persuasiva con keyword locale + invito al contatto.

**3. Hero Section**
Headline con focus SEO locale, sottotitolo chiaro, badge -180%.

**4. Introduzione SEO-friendly**
Paragrafo di apertura con keyword integrate naturalmente, che spiega perche le aziende della provincia dovrebbero leggere questa pagina.

**5. Sezioni principali (6-7 sezioni per pagina)**

Per ogni provincia:
- **Incentivi nazionali: Piano Transizione 5.0 e credito d'imposta** - Spiegazione del credito d'imposta fino al 45%, cumulabilita con ammortamento, beneficio fino al 180%
- **Contributi locali e bandi regionali** - Riferimenti a bandi CCIAA provinciale, fondi regionali Emilia-Romagna, PNRR, incentivi fondo perduto
- **Cumulabilita delle agevolazioni e requisiti** - Quali incentivi si possono combinare, limiti, requisiti di accesso
- **Documenti e tempistiche** - Cosa serve per la domanda, tempi di presentazione, portali (GSE, MIMIT, Regione)
- **Errori comuni da evitare** - Errori nella documentazione, scadenze mancate, mancata comunicazione al GSE
- **Il fotovoltaico per le imprese di [Provincia]** - Sezione locale con riferimenti al tessuto produttivo specifico (distretti, zone industriali, tipologie aziende)
- **Zone servite nella provincia** - Elenco comuni e zone industriali

**6. Requisiti principali** (piu dettagliati, 7-8 punti)

**7. FAQ** (almeno 4 domande per pagina)
Domande specifiche per provincia, ad esempio:
- "Quali agevolazioni fiscali ci sono per il fotovoltaico aziendale a Bologna?"
- "Il credito d'imposta Transizione 5.0 e cumulabile con altri incentivi?"
- "Quanto tempo serve per ottenere le agevolazioni?"
- "Serve una perizia tecnica per accedere al credito d'imposta?"

**8. CTA finale**
"Verifica la tua agevolazione a [Provincia]" con rassicurazione sulla verifica caso per caso.

---

### Dettagli tecnici

**File da modificare:**

- `src/components/AgevolazionePageTemplate.tsx` - Aggiunta props `faqs`, `introText`, `keywords`; sezione FAQ con Accordion; JSON-LD FAQ + LocalBusiness schema iniettati nel head; passaggio keywords a SEOHead
- `src/pages/agevolazioni/AgevolazioniAziendeBologna.tsx` - Riscrittura completa con contenuti SEO ricchi (7 sezioni, 8 requisiti, 4+ FAQ, intro, keywords)
- `src/pages/agevolazioni/AgevolazioniAziendeModena.tsx` - Riscrittura completa
- `src/pages/agevolazioni/AgevolazioniAziendeFerrara.tsx` - Riscrittura completa
- `src/pages/agevolazioni/AgevolazioniAziendeRavenna.tsx` - Riscrittura completa
- `src/components/SEOHead.tsx` - Nessuna modifica necessaria (supporta gia keywords)

**Nessuna nuova route necessaria** - le pagine esistono gia. Nessuna modifica al database.

