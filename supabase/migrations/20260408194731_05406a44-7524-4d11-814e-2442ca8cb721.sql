
DROP POLICY "Public can read non-sensitive settings" ON public.admin_settings;

CREATE POLICY "Public can read non-sensitive settings"
  ON public.admin_settings
  FOR SELECT
  TO public
  USING (id IN ('shop_live', 'tour_live', 'admin_password'));
