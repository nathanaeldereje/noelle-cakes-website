import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function CategoryPage() {
  const { category: categoryId } = useParams();

  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategoryData() {
      setLoading(true);

      // 1. Fetch all categories for navigation tabs
      const { data: catData } = await supabase
        .from('categories')
        .select('*')
        .order('display_order', { ascending: true });

      setCategories(catData || []);

      // 2. Find current category object
      const foundCategory = catData?.find(c => c.id === categoryId);
      setCurrentCategory(foundCategory || null);

      // 3. Fetch items belonging to this category
      if (categoryId) {
        const { data: itemData } = await supabase
          .from('menu_items')
          .select('*')
          .eq('category_id', categoryId)
          .order('name', { ascending: true });

        setItems(itemData || []);
      }

      setLoading(false);
    }

    fetchCategoryData();
  }, [categoryId]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center font-body text-brand-maroon">
        <div className="animate-pulse text-lg font-semibold">Loading Menu Category...</div>
      </div>
    );
  }

  if (!currentCategory) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center font-body">
        <h1 className="font-heading text-4xl text-brand-maroon mb-4">Category Not Found</h1>
        <Link to="/" className="text-brand-maroon underline font-semibold">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 font-body text-brand-body">
      
      {/* Category Navigation Bar / Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 border-b border-brand-divider pb-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/menu/${cat.id}`}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
              cat.id === categoryId
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
          {currentCategory.name}
        </h1>
      </div>

      {/* Items Box Grid */}
      {items.length === 0 ? (
        <div className="text-center text-brand-muted py-16 bg-brand-pink/30 rounded-2xl border border-brand-divider">
          <p className="text-lg font-semibold text-brand-maroon mb-1">No items in this category yet!</p>
          <p className="text-sm">Check back soon or check out our other categories.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-xl overflow-hidden border border-brand-divider shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-56 overflow-hidden bg-brand-pink/20">
                  {item.image_url ? (
                    <img 
                      src={item.image_url} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-brand-muted text-sm">No Photo Available</div>
                  )}
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
                      {item.description || 'Delicately made with authentic bakery ingredients.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link 
                  to={`/menu/${categoryId}/${item.id}`}
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