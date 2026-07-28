// src\pages\Home.jsx
import { mockCategories, mockMenuItems } from '../data/mockData';
import HeroSection from '../components/home/HeroSection';
import StorySection from '../components/home/StorySection';
import SpecialsSection from '../components/home/SpecialsSection';
import CategoriesSection from '../components/home/CategoriesSection';
import FindUsSection from '../components/home/FindUsSection';
import ContactSection from '../components/home/ContactSection';

export default function Home() {
  const todaysSpecials = mockMenuItems.filter(item => item.is_special);

  return (
    <div className="space-y-16 pb-16 font-body text-brand-body">
      <HeroSection />
      <SpecialsSection specials={todaysSpecials} />
       <CategoriesSection categories={mockCategories} />
      <StorySection />
     
      <FindUsSection />
      <ContactSection />
    </div>
  );
}