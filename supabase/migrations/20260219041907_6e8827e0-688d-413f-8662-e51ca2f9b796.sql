
-- Make bd_cms_lp_v2 admin policy fully open (no auth required)
DROP POLICY IF EXISTS "Admin full access V2" ON public.bd_cms_lp_v2;
CREATE POLICY "Admin full access V2"
  ON public.bd_cms_lp_v2
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Make bd_cms_history_v2 fully open
DROP POLICY IF EXISTS "Admin full access history V2" ON public.bd_cms_history_v2;
CREATE POLICY "Admin full access history V2"
  ON public.bd_cms_history_v2
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Make bd_cms_form_submissions_v2 read open
DROP POLICY IF EXISTS "Admin read submissions V2" ON public.bd_cms_form_submissions_v2;
CREATE POLICY "Admin read submissions V2"
  ON public.bd_cms_form_submissions_v2
  FOR SELECT
  USING (true);
