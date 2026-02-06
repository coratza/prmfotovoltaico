

# Sostituzione Logo con Versione Orizzontale

## Cosa cambia

Sostituire il logo quadrato attuale con la nuova versione orizzontale fornita dall'utente ("Progetto_senza_titolo_7.png"). Questo risolve il problema della visibilita senza dover aggiungere testo separato.

## Dettagli tecnici

### 1. Copiare il nuovo logo
- Copiare `user-uploads://Progetto_senza_titolo_7.png` in `src/assets/prm-logo.png` (sovrascrive il vecchio)

### 2. Header (`src/components/layout/Header.tsx`)
- Rimuovere il testo "PRM Fotovoltaico" aggiunto accanto al logo (se presente)
- Impostare l'altezza del logo a `h-14 md:h-16` per una buona visibilita
- Il logo orizzontale si adattera naturalmente in larghezza

### 3. Footer (`src/components/layout/Footer.tsx`)
- Stessa logica: rimuovere eventuale testo separato
- Impostare altezza logo a `h-14` con filtro `brightness-0 invert` per renderlo bianco su sfondo blu
- Rimuovere il testo "PRM Fotovoltaico" separato se presente

### Risultato
Il logo orizzontale apparira nitido e ben proporzionato in header e footer, senza bisogno di testo aggiuntivo.

