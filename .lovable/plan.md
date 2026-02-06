

# Aggiornamento Numero di Telefono + Calcolatore Preventivo ROI

## Parte 1: Sostituzione numero di telefono

Sostituire tutte le occorrenze di `+39051123456` e `051 123 456` con `+393246117388` e `324 611 7388` in tutti i file del progetto (12 file coinvolti):

- Header.tsx, Footer.tsx, MobileCallBar.tsx, HeroSection.tsx
- ClaritySection.tsx, AgevolazionePageTemplate.tsx
- FotovoltaicoPrivati.tsx, FotovoltaicoAziende.tsx
- Agevolazioni.tsx, Contatti.tsx, ChiSiamo.tsx, LavoriRealizzati.tsx

---

## Parte 2: Calcolatore Preventivo ROI

### Nuova pagina: `/calcola-preventivo`

Un calcolatore interattivo che raccoglie i dati del lead e calcola il ROI basandosi sulle formule esatte del foglio Excel fornito. Il calcolo viene eseguito interamente lato client con le formule del modello, senza AI.

### Dati raccolti dal form (step 1 - Dati personali)
- Nome e Cognome
- Telefono
- Email

### Dati raccolti dal form (step 2 - Dati impianto)
- Tipologia cliente: Privato / Azienda
- Provincia: Bologna / Modena / Ferrara / Ravenna
- Tipo immobile: Casa singola / Condominio / Capannone
- Connessione rete: Connesso / Off-grid
- Potenza impianto: 3 kW / 6 kW
- Sistema di accumulo: Si / No
- Consumo annuo (kWh) - da bolletta
- Spesa annua attuale bolletta (EUR)

### Logica di calcolo (dal foglio Excel)

Le formule sono completamente deterministiche, nessun bisogno di AI:

1. **Producibilita per provincia**: Bologna 1250, Modena 1270, Ferrara 1230, Ravenna 1200 kWh/kW/anno
2. **Produzione annua** = Potenza x Producibilita
3. **Autoconsumo %**: Privato senza accumulo 30%, con accumulo 70%; Azienda senza accumulo 50%, con accumulo 80%
4. **Autoconsumo kWh** = min(Produzione x Autoconsumo%, Consumo annuo)
5. **Prezzo variabile** derivato dalla bolletta: (Spesa - Quota fissa) / Consumo
6. **Quota fissa** = 35% della spesa annua (stima ARERA)
7. **Risparmio annuo** = Autoconsumo kWh x Prezzo variabile
8. **Costi impianto**: 3kW = 6500 EUR, 6kW = 10500 EUR, accumulo = 4500 EUR, manutenzione annua = 100 EUR
9. **Incentivi**: Privati detrazione 50%, Aziende maggiorazione 180% con aliquota 28%
10. **Costo netto** = Costo lordo - Beneficio incentivi
11. **Payback** = Costo netto / (Risparmio annuo - Manutenzione)
12. **ROI annuo** = (Risparmio annuo - Manutenzione) / Costo netto
13. **Degrado annuo**: 0.5%/anno sulla produzione

### Output mostrato al lead (frontend)

Una scheda risultati con:
- Risparmio annuo stimato in EUR
- Payback in anni
- ROI annuo in percentuale
- Messaggio: "Puoi risparmiare fino a X EUR/anno e rientrare dal tuo investimento in circa X anni"
- Disclaimer chiaro: "Questa e una stima indicativa basata sui dati forniti. I risultati reali dipendono da fattori specifici che verranno valutati durante il sopralluogo."
- CTA: "Vuoi una valutazione precisa? Chiamaci" con link al numero reale

### Dati inviati al backend (per le chiamate di chiusura)

Tutti i dati del lead + tutti i risultati calcolati vengono inviati via Supabase Edge Function e salvati su database:
- Dati contatto (nome, telefono, email)
- Dati impianto (provincia, tipo immobile, potenza, accumulo, consumi, spesa)
- Risultati calcolati (costo lordo, costo netto, risparmio annuo, payback, ROI, incentivi)
- Timestamp

### Struttura tecnica

```text
Nuovi file:
- src/pages/CalcolaPreventivo.tsx        (pagina principale con form multi-step)
- src/lib/roiCalculator.ts              (logica di calcolo pura, testabile)
- supabase/functions/save-lead/index.ts  (edge function per salvare i dati)

Modifiche:
- src/App.tsx                            (aggiunta route /calcola-preventivo)
- src/components/layout/Header.tsx       (aggiunta link nel menu)
```

### Database (Supabase)

Tabella `leads_preventivo` con colonne per tutti i dati raccolti e calcolati.

### Note importanti sulla precisione

- Il calcolatore usa le stesse formule del foglio Excel, quindi i risultati sono coerenti
- Ogni risultato e accompagnato da disclaimer legale
- I valori di producibilita, autoconsumo e costi sono parametri iniziali del modello, non promesse
- Off-grid per condominio viene disabilitato (come da nota nel foglio)
- La pagina specifica chiaramente che si tratta di una STIMA e che il sopralluogo e necessario per dati definitivi

