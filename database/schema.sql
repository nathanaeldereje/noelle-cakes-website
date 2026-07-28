-- ==========================================
-- NOELLE CAKES: DATABASE SCHEMA & SECURITY
-- ==========================================

-- 1. Create Categories Table
-- 1. Create Categories Table (Updated with description & image_url)
CREATE TABLE public.categories (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  display_order integer DEFAULT 0,
  description text,
  image_url text
);

-- 2. Create Menu Items Table
CREATE TABLE public.menu_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id uuid REFERENCES public.categories(id) ON DELETE RESTRICT,
  name text NOT NULL,
  description text,
  price numeric(10, 2) NOT NULL, 
  image_url text,
  is_special boolean DEFAULT false, 
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;

-- 4. Public Read Access (Anyone visiting the site can see the menu)
CREATE POLICY "Public can read categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public can read menu items" ON public.menu_items FOR SELECT USING (true);

-- 5. Admin Write Access (Only Betty / logged-in users can edit)
CREATE POLICY "Admins can insert categories" ON public.categories FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admins can update categories" ON public.categories FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admins can delete categories" ON public.categories FOR DELETE TO authenticated USING (true);

-- 6. Grant base access to the public schema
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- 7. Grant read access to the anonymous role (public visitors)
GRANT SELECT ON public.categories TO anon;
GRANT SELECT ON public.menu_items TO anon;

-- 8. Grant full access to the authenticated role (logged-in admin / Betty)
GRANT ALL ON public.categories TO authenticated;
GRANT ALL ON public.menu_items TO authenticated;