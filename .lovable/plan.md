
# Aggiornamento dimensioni loghi

## Header (barra in alto)
- Usare il **logo tondo** (`prm-logo-round.png`) con dimensioni `h-16 w-16 md:h-20 md:w-20`
- Il logo tondo e' l'unica scelta sensata per l'header dove lo spazio e' limitato e la scritta non si legge

## Footer (in basso)
- Usare il **logo orizzontale con scritta** (`prm-logo.png`) con dimensioni `h-25 w-35` (ovvero `h-[100px] w-[140px]` in Tailwind, dato che h-25 = 100px e w-35 = 140px)
- Il footer ha spazio sufficiente per mostrare la scritta "PRM Fotovoltaico" in modo leggibile
- Mantiene il filtro `brightness-0 invert` per il bianco su sfondo blu

## Dettagli tecnici

### File modificati
1. **`src/components/layout/Header.tsx`**
   - Cambiare l'import da `prm-logo.png` a `prm-logo-round.png`
   - Cambiare la classe dell'immagine da `h-16 md:h-20 w-auto` a `h-16 w-16 md:h-20 md:w-20`

2. **`src/components/layout/Footer.tsx`**
   - Cambiare la classe dell'immagine da `h-16 w-auto` a `h-[100px] w-[140px]`
   - Resta il logo orizzontale con scritta (gia' importato)
