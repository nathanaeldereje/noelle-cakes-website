// src\pages\Home.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

import HeroSection from '../components/home/HeroSection';
import StorySection from '../components/home/StorySection';
import SpecialsSection from '../components/home/SpecialsSection';
import CategoriesSection from '../components/home/CategoriesSection';
import FindUsSection from '../components/home/FindUsSection';
import ContactSection from '../components/home/ContactSection';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [specials, setSpecials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPublicHomeData() {
      setLoading(true);

      // 1. Fetch Categories ordered by display_order
      const { data: catData } = await supabase
        .from('categories')
        .select('*')
        .order('display_order', { ascending: true });

      setCategories(catData || []);

      // 2. Fetch Active Specials
      let { data: specialData } = await supabase
        .from('menu_items')
        .select('*, categories(name)')
        .eq('is_special', true)
        .order('updated_at', { ascending: false });

      // Persistence Fallback: If Betty didn't mark any specials, fetch the 3 most recently updated items so it NEVER goes blank!
      if (!specialData || specialData.length === 0) {
        const { data: fallbackData } = await supabase
          .from('menu_items')
          .select('*, categories(name)')
          .order('updated_at', { ascending: false })
          .limit(3);
        
        specialData = fallbackData || [];
      }

      setSpecials(specialData || []);
      setLoading(false);
    }

    fetchPublicHomeData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center font-body text-brand-maroon">
        <div className="animate-pulse text-lg font-semibold">Loading Fresh Daily Menu...</div>
      </div>
    );
  }

  return (
    <div className="space-y-16 pb-16 font-body text-brand-body">
      <HeroSection />
      <SpecialsSection specials={specials} />
      <CategoriesSection categories={categories} />
      <StorySection />
      <FindUsSection />
      <ContactSection />
    </div>
  );
}