
-- Drop the overly permissive insert policy
DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads_preventivo;

-- No public INSERT policy needed - the edge function uses service_role_key which bypasses RLS
-- This means only the server-side edge function can insert leads, not anonymous clients
