
CREATE TABLE public.leads_preventivo (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  -- Dati contatto
  nome TEXT NOT NULL,
  telefono TEXT NOT NULL,
  email TEXT,
  -- Dati impianto
  tipologia TEXT NOT NULL, -- 'privato' | 'azienda'
  provincia TEXT NOT NULL,
  tipo_immobile TEXT NOT NULL, -- 'casa_singola' | 'condominio' | 'capannone'
  connessione TEXT NOT NULL DEFAULT 'connesso', -- 'connesso' | 'offgrid'
  potenza INTEGER NOT NULL, -- 3 o 6
  accumulo BOOLEAN NOT NULL DEFAULT false,
  consumo_annuo NUMERIC NOT NULL,
  spesa_annua NUMERIC NOT NULL,
  -- Risultati calcolati
  produzione_annua NUMERIC,
  autoconsumo_pct NUMERIC,
  autoconsumo_kwh NUMERIC,
  prezzo_variabile NUMERIC,
  costo_lordo NUMERIC,
  beneficio_incentivi NUMERIC,
  costo_netto NUMERIC,
  risparmio_annuo NUMERIC,
  payback_anni NUMERIC,
  roi_annuo NUMERIC,
  risparmio_25_anni NUMERIC
);

-- RLS: i lead sono pubblici in inserimento (nessun auth richiesto), ma solo admin può leggere
ALTER TABLE public.leads_preventivo ENABLE ROW LEVEL SECURITY;

-- Chiunque può inserire un lead (form pubblico)
CREATE POLICY "Anyone can insert leads" ON public.leads_preventivo
  FOR INSERT WITH CHECK (true);

-- Nessuno può leggere tramite API pubblica (solo accesso diretto dal backend/dashboard)
CREATE POLICY "No public read access" ON public.leads_preventivo
  FOR SELECT USING (false);
