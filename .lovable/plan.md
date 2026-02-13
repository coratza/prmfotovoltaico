

## Ottimizzazione SEO completa per PRM Fotovoltaico

Stessa struttura del piano approvato, con una modifica: il title della Home avra "PRM Fotovoltaico" prima delle keyword geografiche.

---

### 1. index.html - Rebranding e meta tag

- **Title**: "PRM Fotovoltaico | Impianti Fotovoltaici Bologna, Modena, Ferrara, Ravenna"
- **Description**: keyword-rich con tutte e 4 le province
- **Keywords**: lista completa con tutte le keyword fornite
- **Author**: "PRM Fotovoltaico"
- **Canonical**: aggiornato a `https://prmfotovoltaico.lovable.app`
- **OG/Twitter tags**: aggiornati con brand PRM prima
- **JSON-LD structured data**: schema LocalBusiness con nome, indirizzo, telefono, aree servite

### 2. Componente SEOHead riutilizzabile

Nuovo file `src/components/SEOHead.tsx` che imposta `document.title` e meta description/keywords dinamiche per ogni pagina.

### 3. Title dinamici per ogni pagina

- **Home**: "PRM Fotovoltaico | Impianti Fotovoltaici Bologna, Modena, Ferrara, Ravenna"
- **Fotovoltaico Privati**: "Fotovoltaico Residenziale Bologna | Installazione Chiavi in Mano | PRM Fotovoltaico"
- **Fotovoltaico Aziende**: "Fotovoltaico Aziendale e Industriale Emilia-Romagna | PRM Fotovoltaico"
- **Calcola Rendimento**: "Calcola Rendimento Fotovoltaico | Preventivo Gratuito | PRM Fotovoltaico"
- **Lavori Realizzati**: "Lavori Realizzati Fotovoltaico Bologna e Emilia-Romagna | PRM Fotovoltaico"
- **Chi Siamo**: "Chi Siamo - Installatore Fotovoltaico Bologna | PRM Fotovoltaico"
- **Contatti**: "Contatti PRM Fotovoltaico | Installatore Bologna Modena Ferrara Ravenna"
- **Agevolazioni hub**: "Detrazioni e Agevolazioni Fotovoltaico Emilia-Romagna | PRM Fotovoltaico"
- **Sottopagine agevolazioni**: title dinamici dal template

### 4. ChiSiamo.tsx - Correggere alt immagine

Da "SolarTech" a "PRM Fotovoltaico"

### 5. Creare public/sitemap.xml

19 URL con priorita differenziate (Home 1.0, pagine principali 0.9, sottopagine 0.7-0.8)

### 6. Aggiornare robots.txt

Aggiungere `Sitemap: https://prmfotovoltaico.lovable.app/sitemap.xml`

---

### Dettagli tecnici

**File da creare:**
- `src/components/SEOHead.tsx`
- `public/sitemap.xml`

**File da modificare:**
- `index.html` - rebranding + JSON-LD
- `public/robots.txt` - sitemap
- `src/pages/ChiSiamo.tsx` - alt immagine
- `src/pages/Index.tsx` - aggiunta SEOHead
- `src/pages/FotovoltaicoPrivati.tsx` - aggiunta SEOHead
- `src/pages/FotovoltaicoAziende.tsx` - aggiunta SEOHead
- `src/pages/CalcolaPreventivo.tsx` - aggiunta SEOHead
- `src/pages/LavoriRealizzati.tsx` - aggiunta SEOHead
- `src/pages/Contatti.tsx` - aggiunta SEOHead
- `src/pages/Agevolazioni.tsx` - aggiunta SEOHead
- `src/components/AgevolazionePageTemplate.tsx` - aggiunta SEOHead dinamico

Nessuna modifica al database.

