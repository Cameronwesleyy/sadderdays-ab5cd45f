
-- =============================================
-- 1. FIX admin_settings policies
-- =============================================
DROP POLICY IF EXISTS "Anyone can read admin settings" ON public.admin_settings;
DROP POLICY IF EXISTS "Authenticated can manage admin settings" ON public.admin_settings;

-- Public can only read non-sensitive settings
CREATE POLICY "Public can read non-sensitive settings"
  ON public.admin_settings FOR SELECT
  TO public
  USING (id IN ('shop_live', 'tour_live'));

-- Admins can read all settings
CREATE POLICY "Admins can read all settings"
  ON public.admin_settings FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can manage all settings
CREATE POLICY "Admins can manage admin settings"
  ON public.admin_settings FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- =============================================
-- 2. FIX songs policies
-- =============================================
DROP POLICY IF EXISTS "Authenticated can manage songs" ON public.songs;

CREATE POLICY "Admins can manage songs"
  ON public.songs FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- =============================================
-- 3. FIX music_releases policies
-- =============================================
DROP POLICY IF EXISTS "Authenticated can manage releases" ON public.music_releases;

CREATE POLICY "Admins can manage releases"
  ON public.music_releases FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- =============================================
-- 4. FIX tour_dates policies
-- =============================================
DROP POLICY IF EXISTS "Authenticated can manage tour dates" ON public.tour_dates;

CREATE POLICY "Admins can manage tour dates"
  ON public.tour_dates FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- =============================================
-- 5. FIX site_content policies
-- =============================================
DROP POLICY IF EXISTS "Authenticated can insert site content" ON public.site_content;
DROP POLICY IF EXISTS "Authenticated can update site content" ON public.site_content;

CREATE POLICY "Admins can insert site content"
  ON public.site_content FOR INSERT
  TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update site content"
  ON public.site_content FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- =============================================
-- 6. FIX storage policies for site-images
-- =============================================
DROP POLICY IF EXISTS "Allow uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow updates" ON storage.objects;
DROP POLICY IF EXISTS "Allow deletes" ON storage.objects;

CREATE POLICY "Admins can upload images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'site-images'
    AND has_role(auth.uid(), 'admin'::app_role)
  );

CREATE POLICY "Admins can update images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'site-images'
    AND has_role(auth.uid(), 'admin'::app_role)
  );

CREATE POLICY "Admins can delete images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'site-images'
    AND has_role(auth.uid(), 'admin'::app_role)
  );
