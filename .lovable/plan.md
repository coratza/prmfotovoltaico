

## Piano: Notifiche WhatsApp + Dashboard Admin

### Panoramica
Quando arriva un nuovo lead dal calcolatore, il titolare riceve un messaggio WhatsApp istantaneo sul cellulare con i dati principali. In piu, una dashboard protetta da login nel sito permette di visualizzare, filtrare e esportare tutti i lead.

---

### 1. Notifiche WhatsApp via CallMeBot (gratuito)

CallMeBot e un servizio gratuito che permette di inviare messaggi WhatsApp tramite una semplice chiamata HTTP. Non servono account business o API a pagamento.

**Setup richiesto dal titolare (una tantum, 2 minuti):**
1. Salvare il numero `+34 644 31 89 43` (CallMeBot) nei contatti WhatsApp
2. Inviare il messaggio "I allow callmebot to send me messages" a quel numero
3. Ricevere in risposta una API Key personale
4. Comunicarci il numero di telefono e la API Key

**Implementazione tecnica:**
- Salvare due segreti nel backend: `WHATSAPP_PHONE` e `CALLMEBOT_APIKEY`
- Modificare la edge function `save-lead` per inviare un messaggio WhatsApp dopo il salvataggio del lead
- Il messaggio conterra: nome, telefono, tipologia, provincia, kWp stimati, risparmio annuo

---

### 2. Dashboard Admin protetta

**Autenticazione:**
- Pagina `/admin` con login via email + password
- Tabella `user_roles` con ruolo `admin` per autorizzare l'accesso
- Il titolare viene configurato come admin manualmente nel database
- RLS policy sulla tabella `leads_preventivo` per permettere la lettura solo agli admin

**Funzionalita dashboard:**
- Tabella con tutti i lead ordinati per data (piu recenti prima)
- Filtri per: tipologia (privato/azienda), provincia, data
- Ricerca per nome o telefono
- Export CSV con un click
- Badge con conteggio lead totali e del mese corrente
- Dettaglio lead espandibile con tutti i dati calcolati (kWp, IRR, payback, qualifica 180%)

**Pagine e componenti:**
- `src/pages/Admin.tsx` - pagina login + dashboard
- `src/pages/AdminDashboard.tsx` - contenuto della dashboard
- Nuova route `/admin` in App.tsx

---

### 3. Struttura del database

Nuove tabelle/modifiche:
- Tipo enum `app_role` con valore `admin`
- Tabella `user_roles` (user_id, role) con RLS
- Funzione `has_role()` security definer
- Policy SELECT su `leads_preventivo` per gli admin autenticati
- Policy SELECT su `user_roles` per gli utenti autenticati (solo propri ruoli)

---

### 4. Sequenza di implementazione

```text
1. Richiedere i segreti WHATSAPP_PHONE e CALLMEBOT_APIKEY
2. Creare tabelle database (user_roles, enum, funzione has_role)
3. Aggiungere RLS policies
4. Aggiornare edge function save-lead con invio WhatsApp
5. Creare pagina login admin
6. Creare dashboard con tabella lead, filtri e export CSV
7. Aggiungere route /admin in App.tsx
```

---

### Alternativa: se CallMeBot non piace

Se preferisci una soluzione piu professionale, possiamo usare l'API ufficiale di WhatsApp Business (richiede account Meta Business e costa circa 0.05 EUR/messaggio) oppure Twilio per WhatsApp. Fammi sapere se preferisci una di queste alternative.

