import { useParams, Link, useNavigate } from 'react-router-dom';
import { mockMenuItems, mockCategories } from '../data/mockData';

export default function ItemDetailPage() {
  const { category, item } = useParams();
  const navigate = useNavigate();

  const menuItem = mockMenuItems.find(i => i.id === item);
  const categoryDetails = mockCategories.find(c => c.id === category);

  if (!menuItem) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="font-heading text-4xl text-brand-maroon mb-4">Item Not Found</h1>
        <Link to={`/menu/${category}`} className="text-brand-maroon underline font-semibold">Back to Category</Link>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto font-body text-brand-body">
      
      {/* Back Breadcrumb */}
      <button 
        onClick={() => navigate(`/menu/${category}`)} 
        className="inline-flex items-center gap-2 text-sm font-semibold text-brand-maroon hover:underline mb-8 cursor-pointer"
      >
        ← Back to {categoryDetails?.name || 'Menu'}
      </button>

      {/* Item Detail Card */}
      <div className="bg-white rounded-2xl overflow-hidden border border-brand-divider shadow-xl grid grid-cols-1 md:grid-cols-2">
        
        {/* Large Image */}
        <div className="relative h-80 md:h-full min-h-80">
          <img 
            src={menuItem.image_url} 
            alt={menuItem.name} 
            className="w-full h-full object-cover"
          />
          {menuItem.is_special && (
            <span className="absolute top-4 left-4 bg-brand-accent text-white text-xs font-bold uppercase px-3 py-1 rounded shadow-md">
              Today's Special
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-8 sm:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-xs font-bold text-brand-accent uppercase tracking-widest block">
              Category: {categoryDetails?.name}
            </span>

            <h1 className="font-heading text-4xl sm:text-5xl text-brand-maroon leading-tight">
              {menuItem.name}
            </h1>

            <span className="font-bold text-3xl text-brand-maroon block">
              ${menuItem.price.toFixed(2)}
            </span>

            {/* "What's Inside" Highlight Box */}
            <div className="bg-brand-pink p-6 rounded-xl border border-brand-divider space-y-2 mt-4">
              <span className="font-bold text-xs uppercase tracking-wider text-brand-maroon block">
                What's Inside / Ingredients:
              </span>
              <p className="text-brand-body text-base leading-relaxed">
                {menuItem.description}
              </p>
            </div>
          </div>

          <div className="border-t border-brand-divider pt-6 text-xs text-brand-muted space-y-1">
            <p>• Handcrafted fresh daily in limited quantities.</p>
            <p>• Showcase catalog item (In-store pickup only).</p>
          </div>
        </div>

      </div>

    </div>
  );
}