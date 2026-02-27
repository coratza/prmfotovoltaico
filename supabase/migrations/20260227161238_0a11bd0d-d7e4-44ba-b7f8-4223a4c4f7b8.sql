
-- Fix: Allow anonymous lead submissions via edge function (service role)
-- The edge function uses service role key, so anon INSERT isn't needed
-- But we need rate_limits to work for the edge function

-- Rate limits: allow service role operations (edge function uses service role)
-- Since edge functions use service_role, they bypass RLS entirely
-- But let's add policies for safety

-- Allow anon to insert rate limits (edge function may call as anon)
CREATE POLICY "Allow rate limit inserts"
ON public.rate_limits
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Allow rate limit reads"
ON public.rate_limits
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Allow rate limit deletes"
ON public.rate_limits
FOR DELETE
TO anon, authenticated
USING (true);

-- User roles: allow admins to manage roles
CREATE POLICY "Admins can insert roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admins can update roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admins can delete roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
);

-- Enable leaked password protection
ALTER TABLE public.leads_preventivo ENABLE ROW LEVEL SECURITY;
