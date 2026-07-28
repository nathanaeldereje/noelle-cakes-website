import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function ItemDetailPage() {
  const { category: categoryId, item: itemId } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItemDetail() {
      setLoading(true);
      const { data } = await supabase
        .from('menu_items')
        .select('*, categories(name)')
        .eq('id', itemId)
        .single();

      setItem(data || null);
      setLoading(false);
    }

    fetchItemDetail();
  }, [itemId]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center font-body text-brand-maroon">
        <div className="animate-pulse text-lg font-semibold">Loading Item Details...</div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center font-body">
        <h1 className="font-heading text-4xl text-brand-maroon mb-4">Item Not Found</h1>
        <Link to={`/menu/${categoryId}`} className="text-brand-maroon underline font-semibold">Back to Category</Link>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto font-body text-brand-body">
      
      <button 
        onClick={() => navigate(`/menu/${categoryId}`)} 
        className="inline-flex items-center gap-2 text-sm font-semibold text-brand-maroon hover:underline mb-8 cursor-pointer"
      >
        ← Back to {item.categories?.name || 'Menu'}
      </button>

      <div className="bg-white rounded-2xl overflow-hidden border border-brand-divider shadow-xl grid grid-cols-1 md:grid-cols-2">
        
        <div className="relative h-80 md:h-full min-h-80 bg-brand-pink/20">
          {item.image_url ? (
            <img 
              src={item.image_url} 
              alt={item.name} 
              className="w-full h-full object-cover"
              loading="eager"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-brand-muted">No Image</div>
          )}
          {item.is_special && (
            <span className="absolute top-4 left-4 bg-brand-accent text-white text-xs font-bold uppercase px-3 py-1 rounded shadow-md">
              Today's Special
            </span>
          )}
        </div>

        <div className="p-8 sm:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-xs font-bold text-brand-accent uppercase tracking-widest block">
              Category: {item.categories?.name}
            </span>

            <h1 className="font-heading text-4xl sm:text-5xl text-brand-maroon leading-tight">
              {item.name}
            </h1>

            <span className="font-bold text-3xl text-brand-maroon block">
              {item.price.toFixed(2)} Birr
            </span>

            <div className="bg-brand-pink p-6 rounded-xl border border-brand-divider space-y-2 mt-4">
              <span className="font-bold text-xs uppercase tracking-wider text-brand-maroon block">
                What's Inside / Ingredients:
              </span>
              <p className="text-brand-body text-base leading-relaxed">
                {item.description || 'Authentic handcrafted recipe.'}
              </p>
            </div>
          </div>

          <div className="border-t border-brand-divider pt-6 text-xs text-brand-muted space-y-1">
            <p>• Handcrafted fresh daily in limited quantities.</p>
            <p>• Showcase catalog item (In-store purchase only).</p>
          </div>
        </div>

      </div>

    </div>
  );
}