

# Favicon, Validazione Contatti e Nuovo Calcolatore ROI/IRR (aggiornato)

## 1. Favicon con logo tondo
- Copiare `src/assets/prm-logo-round.png` in `public/favicon.png`
- Aggiornare `index.html` con `<link rel="icon" href="/favicon.png" type="image/png">`

## 2. Validazione telefono e email (anti-spam)

### Telefono
- Rifiutare numeri con tutte cifre uguali (es. `3240000000`, `1111111111`)
- Rifiutare sequenze ripetitive
- Minimo 9 cifre
- Validazione client-side e server-side

### Email (facoltativa)
- Se compilata, rifiutare domini usa e getta e pattern finti (es. `test@test.com`, `aaa@aaa.com`)

## 3. Rimozione campi dal form (Step 2)

Rimossi per tutti (decisi dall'operatore):
- Connessione alla rete
- Potenza impianto
- Sistema di accumulo

## 4. Form differenziato Privato vs Azienda

### Privato
Campi Step 2:
- Tipologia (gia' selezionato "Privato")
- Provincia
- Tipo immobile (casa singola / condominio)
- Consumo annuo (kWh) -- obbligatorio
- Spesa annua (EUR) -- obbligatorio

Il dimensionamento kWp viene calcolato automaticamente dal consumo:
`kWp = Consumo / Producibilita * 1.1` (leggero sovradimensionamento standard)

### Azienda
Campi Step 2:
- Tipologia (gia' selezionato "Azienda")
- Provincia
- Tipo immobile (capannone)
- Consumo annuo (kWh) -- obbligatorio
- Spesa annua (EUR) -- obbligatorio
- **m2 tetto disponibile** -- obbligatorio, solo per aziende
- **Profilo attivita'** (Diurno / Misto / H24) -- solo per aziende
- **Hai gia' un impianto?** (Si/No) -- solo per aziende; se Si, messaggio "contattaci per ottimizzazione"

Per le aziende il kWp viene calcolato dai m2: `kWp = m2 * 0.18` (cap a 1000)

## 5. Logica di calcolo (`roiCalculator.ts`)

### 5.1 Dimensionamento kWp
- **Privato**: `kWp = Consumo / Producibilita * 1.1` (cap a 20 kWp)
- **Azienda**: `kWp = m2 * 0.18` (cap a 1000 kWp)

### 5.2 Producibilita' per provincia
Bologna 1250, Modena 1270, Ferrara 1230, Ravenna 1200 kWh/kWp/anno

### 5.3 Autoconsumo
- **Privato**: profilo fisso "Misto" = 70%
- **Azienda**: dal profilo selezionato (Diurno 80%, Misto 70%, H24 65%)

Formula: `Autoconsumo(kWh) = MIN(Produzione, Consumo * 0.95) * %profilo`

### 5.4 Prezzo energia
- Prezzo medio = Spesa / Consumo
- Prezzo evitato = Prezzo medio * 0.80
- Prezzo immissione = 0.06 EUR/kWh

### 5.5 CAPEX stimato
| Taglia      | EUR/kWp |
|-------------|---------|
| < 50 kWp    | 1.200   |
| 50-200 kWp  | 1.000   |
| 200-500 kWp | 850     |
| > 500 kWp   | 750     |

### 5.6 Beneficio annuo
- Risparmio = Autoconsumo * Prezzo evitato
- Ricavo immissione = Immissione * 0.06
- Beneficio annuo = Risparmio + Ricavo immissione

### 5.7 IRR a 25 anni
- **Privato**: solo IRR base (CF0 = -CAPEX, CF1..25 = Beneficio)
- **Azienda**: IRR base + IRR con super ammortamento 180% (TaxAnnual = CAPEX * 1.80 * 0.24 / 10 aggiunto ai primi 10 anni)
- Calcolo con Newton-Raphson

### 5.8 Controlli coerenza
- Prezzo medio < 0.08 o > 0.35: avviso "dati non coerenti"
- Produzione > 1.3 * Consumo: riduzione automatica kWp

## 6. Output al frontend

### Per Privati
- "Rendimento stimato: X% annuo" (IRR base)
- Payback in anni
- Disclaimer standard

### Per Aziende
- "Rendimento stimato fino a X% annuo" (IRR_max con 180%)
- Payback in anni
- Disclaimer con nota su agevolazione fiscale
- **Domande di qualifica 180%** (4 domande Si/No/Non so):
  1. Impresa con sede operativa in Italia?
  2. Investimento nuovo e strumentale all'attivita' produttiva?
  3. Disponibilita' a documentazione tecnica e adempimenti?
  4. Prevedi utile/capienza fiscale nei prossimi anni?
- Esito: "Potenzialmente idoneo" oppure "Verifica necessaria, contattaci"

## 7. Database e Backend

### Migrazione SQL -- nuove colonne su `leads_preventivo`
`mq_tetto`, `profilo_attivita`, `ha_impianto_esistente`, `kwp_calcolati`, `irr_base`, `irr_max`, `capex_stimato`, `immissione_kwh`, `ricavo_immissione`, `qualifica_180`

### Edge function (`save-lead/index.ts`)
- Rimuovere `potenza` dai campi obbligatori
- `mq_tetto` e `profilo_attivita` obbligatori solo se tipologia = "azienda"
- Validazione anti-spam telefono/email server-side
- Salvataggio nuovi campi calcolati

## Dettagli tecnici

### File modificati/creati
1. `public/favicon.png` -- copia del logo tondo
2. `index.html` -- link favicon
3. `src/lib/roiCalculator.ts` -- riscrittura completa con logica differenziata privato/azienda
4. `src/pages/CalcolaPreventivo.tsx` -- form condizionale, nuova sezione risultati, domande qualifica 180% solo per aziende
5. `supabase/functions/save-lead/index.ts` -- validazione anti-spam, campi condizionali per tipologia
6. Migrazione SQL -- nuove colonne

