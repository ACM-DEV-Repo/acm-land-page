
-- Fix bd_cms_lp_v2: drop broken policy and recreate
DROP POLICY IF EXISTS "Admin full access V2" ON public.bd_cms_lp_v2;
CREATE POLICY "Admin full access V2"
  ON public.bd_cms_lp_v2
  FOR ALL
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- Fix bd_cms_history_v2: drop broken policy and recreate
DROP POLICY IF EXISTS "Admin full access history V2" ON public.bd_cms_history_v2;
CREATE POLICY "Admin full access history V2"
  ON public.bd_cms_history_v2
  FOR ALL
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- Fix bd_cms_form_submissions_v2: drop broken read policy and recreate
DROP POLICY IF EXISTS "Admin read submissions V2" ON public.bd_cms_form_submissions_v2;
CREATE POLICY "Admin read submissions V2"
  ON public.bd_cms_form_submissions_v2
  FOR SELECT
  USING (auth.uid() IS NOT NULL);
