
-- Add new columns to leads_preventivo for the updated calculator
ALTER TABLE public.leads_preventivo
  ALTER COLUMN potenza DROP NOT NULL,
  ALTER COLUMN connessione DROP NOT NULL,
  ALTER COLUMN connessione SET DEFAULT NULL,
  ALTER COLUMN accumulo SET DEFAULT NULL;

ALTER TABLE public.leads_preventivo
  ADD COLUMN IF NOT EXISTS mq_tetto integer,
  ADD COLUMN IF NOT EXISTS profilo_attivita text,
  ADD COLUMN IF NOT EXISTS ha_impianto_esistente boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS kwp_calcolati numeric,
  ADD COLUMN IF NOT EXISTS irr_base numeric,
  ADD COLUMN IF NOT EXISTS irr_max numeric,
  ADD COLUMN IF NOT EXISTS capex_stimato numeric,
  ADD COLUMN IF NOT EXISTS immissione_kwh numeric,
  ADD COLUMN IF NOT EXISTS ricavo_immissione numeric,
  ADD COLUMN IF NOT EXISTS qualifica_180 text;
