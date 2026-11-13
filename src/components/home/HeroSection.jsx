import hero_image from '../../assets/hero_v2.webp';
import pattern2 from '../../assets/pattern2.png';

export default function HeroSection() {
  return (
    <section id="home" className="relative bg-brand-pink py-16 lg:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-24 overflow-hidden">
      
      {/* Subtle single-sided pattern accent fading out from the right */}
      <div 
        className="absolute inset-y-0 right-0 w-full lg:w-7/12 opacity-70 mix-blend-multiply pointer-events-none bg-repeat"
        style={{ 
          backgroundImage: `url(${pattern2})`, 
          backgroundSize: '240px 240px',
          maskImage: 'linear-gradient(to left, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0) 85%)',
          WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0) 85%)'
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <div className="space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-brand-divider shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-accent animate-pulse"></span>
            <span className="text-xs font-semibold text-brand-maroon uppercase tracking-wider">Fresh From The Oven Today</span>
          </div>

          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl text-brand-maroon leading-tight">
            Artisan Tortas & Custom Cakes
          </h1>

          <p className="text-brand-body/80 text-lg sm:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Crafted daily with authentic recipes, rich dulce de leche, and premium ingredients in the heart of Cake City.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
            <a 
              href="#categories" 
              className="bg-brand-maroon text-brand-pink hover:bg-brand-body font-semibold px-8 py-3.5 rounded-md shadow-md transition-all text-center"
            >
              Explore Menu
            </a>
            <a 
              href="#specials" 
              className="bg-white text-brand-maroon border border-brand-maroon/20 hover:bg-brand-pink font-semibold px-8 py-3.5 rounded-md shadow-sm transition-all text-center"
            >
              Today's Specials
            </a>
          </div>
        </div>

        <div className="rounded-xl overflow-hidden shadow-lg border border-brand-divider aspect-4/3 max-w-md mx-auto lg:max-w-none w-full">
          <img 
            src={hero_image} 
            alt="Artisan cake handcrafted by Noelle Cakes & Pastries"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
        </div>

      </div>
    </section>
  );
}
