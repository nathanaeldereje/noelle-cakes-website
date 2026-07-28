import { Link } from 'react-router-dom';

export default function CategoriesSection({ categories }) {
  return (
    <section id="categories" className="bg-brand-pink/40 border-y border-brand-divider py-12 sm:py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
          <span className="text-brand-accent font-semibold uppercase text-xs tracking-widest">Our Offerings</span>
          <h2 className="font-heading text-4xl sm:text-5xl text-brand-maroon">
            Explore Menu Categories
          </h2>
          <p className="text-brand-body/80 text-base">
            Select a category below to view all items and see "what's inside" every delicious creation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={`/menu/${category.id}`} 
              className="bg-white rounded-xl overflow-hidden border border-brand-divider shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
            >
              <div className="relative h-52 overflow-hidden">
                <img 
                  src={category.image_url || category.image || 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800'} 
                  alt={category.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 right-4 font-heading text-3xl text-white">
                  {category.name}
                </h3>
              </div>

              <div className="p-6 grow flex flex-col justify-between space-y-4">
                <p className="text-brand-muted text-sm leading-relaxed">
                  {category.description}
                </p>
                <div className="flex items-center text-brand-maroon font-semibold text-sm group-hover:translate-x-1 transition-transform">
                  Browse {category.name} →
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}