// src\pages\CategoryPage.jsx
import { useParams, Link } from 'react-router-dom';
import { mockCategories, mockMenuItems } from '../data/mockData';

export default function CategoryPage() {
  const { category } = useParams();

  // Find category details and items
  const categoryDetails = mockCategories.find(c => c.id === category);
  const items = mockMenuItems.filter(item => item.category_id === category);

  if (!categoryDetails) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="font-heading text-4xl text-brand-maroon mb-4">Category Not Found</h1>
        <Link to="/" className="text-brand-maroon underline font-semibold">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 font-body text-brand-body">
      
      {/* Category Navigation Bar / Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 border-b border-brand-divider pb-6">
        {mockCategories.map((cat) => (
          <Link
            key={cat.id}
            to={`/menu/${cat.id}`}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
              cat.id === category
                ? 'bg-brand-maroon text-brand-pink shadow-md'
                : 'bg-brand-pink text-brand-maroon hover:bg-brand-divider'
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Category Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h1 className="font-heading text-5xl text-brand-maroon capitalize">
          {categoryDetails.name}
        </h1>
        <p className="text-brand-muted text-base">
          {categoryDetails.description}
        </p>
      </div>

      {/* Items Box Grid */}
      {items.length === 0 ? (
        <p className="text-center text-brand-muted py-12">No items found in this category yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-xl overflow-hidden border border-brand-divider shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={item.image_url} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {item.is_special && (
                    <span className="absolute top-3 left-3 bg-brand-accent text-white text-xs font-bold uppercase px-2.5 py-1 rounded shadow">
                      Today's Special
                    </span>
                  )}
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-heading text-2xl text-brand-maroon">{item.name}</h3>
                    <span className="font-bold text-brand-maroon text-lg">{item.price.toFixed(2)} Birr</span>
                  </div>

                  {/* "What's Inside" Description Box */}
                  <div className="bg-brand-pink/50 p-3 rounded-lg border border-brand-divider/60">
                    <span className="block text-[11px] font-bold text-brand-maroon uppercase tracking-wider mb-1">
                      What's Inside:
                    </span>
                    <p className="text-brand-body/90 text-sm leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link 
                  to={`/menu/${category}/${item.id}`}
                  className="block w-full text-center bg-brand-pink text-brand-maroon hover:bg-brand-maroon hover:text-brand-pink font-semibold py-2.5 rounded-lg transition-colors text-sm border border-brand-divider"
                >
                  View Item Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Back Button */}
      <div className="text-center pt-6">
        <Link to="/" className="text-sm font-semibold text-brand-maroon hover:underline">
          ← Back to Main Menu
        </Link>
      </div>

    </div>
  );
}