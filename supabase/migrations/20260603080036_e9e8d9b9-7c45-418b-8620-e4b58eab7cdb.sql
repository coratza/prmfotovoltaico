
-- 1. Rate limits: drop permissive policies, add admin-only read
DROP POLICY IF EXISTS "Allow rate limit inserts" ON public.rate_limits;
DROP POLICY IF EXISTS "Allow rate limit reads" ON public.rate_limits;
DROP POLICY IF EXISTS "Allow rate limit deletes" ON public.rate_limits;

CREATE POLICY "Admins can view rate limits"
ON public.rate_limits
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 2. user_roles: drop client-side admin management policies
-- Role changes must go through service_role (edge functions or direct DB access)
DROP POLICY IF EXISTS "Admins can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can update roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can delete roles" ON public.user_roles;

-- 3. Restrict EXECUTE on has_role: revoke from anon (RLS for tables only triggers
-- for authenticated users querying admin-protected tables).
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon, public;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;
