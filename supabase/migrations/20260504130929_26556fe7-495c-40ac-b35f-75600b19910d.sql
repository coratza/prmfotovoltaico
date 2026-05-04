ALTER TABLE public.leads_preventivo
  ADD COLUMN IF NOT EXISTS whatsapp_status TEXT NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS whatsapp_error TEXT,
  ADD COLUMN IF NOT EXISTS whatsapp_sent_at TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS whatsapp_response TEXT;

CREATE INDEX IF NOT EXISTS idx_leads_whatsapp_status ON public.leads_preventivo(whatsapp_status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads_preventivo(created_at DESC);