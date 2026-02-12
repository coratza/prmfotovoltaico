

## Fix: Scroll automatico in cima alla pagina quando si cambia pagina

### Problema

Quando navighi tra le pagine cliccando sui link del menu (es. "Per Privati", "Per Aziende"), la pagina non scrolla in alto e resti nella stessa posizione (tipicamente il footer). Questo e' il comportamento predefinito di React Router, che non resetta la posizione di scroll al cambio di route.

### Soluzione

Creare un componente `ScrollToTop` che ascolta i cambi di route e forza lo scroll in cima alla pagina, poi inserirlo dentro il `BrowserRouter` in `App.tsx`.

### Dettagli tecnici

**Nuovo file: `src/components/ScrollToTop.tsx`**

Componente che usa `useLocation` e `useNavigationType` di React Router per intercettare ogni navigazione e chiamare `window.scrollTo(0, 0)`. Non resetta lo scroll quando l'utente usa il tasto "Indietro" del browser (navigazione POP).

**File modificato: `src/App.tsx`**

Aggiungere `<ScrollToTop />` subito dopo `<BrowserRouter>`, prima di `<Routes>`. Nessun'altra modifica necessaria.

