import { useParams, Link, useNavigate } from 'react-router-dom';
import { mockMenuItems } from '../data/mockData';

export default function SpecialDetailPage() {
  const { item } = useParams();
  const navigate = useNavigate();

  const specialItem = mockMenuItems.find(i => i.id === item);

  if (!specialItem) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="font-heading text-4xl text-brand-maroon mb-4">Special Item Not Found</h1>
        <Link to="/" className="text-brand-maroon underline font-semibold">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto font-body text-brand-body">
      
      {/* Back Button */}
      <button 
        onClick={() => navigate('/')} 
        className="inline-flex items-center gap-2 text-sm font-semibold text-brand-maroon hover:underline mb-8 cursor-pointer"
      >
        ← Back to Home & Today's Specials
      </button>

      {/* Special Feature Card */}
      <div className="bg-white rounded-2xl overflow-hidden border-2 border-brand-accent shadow-2xl grid grid-cols-1 md:grid-cols-2">
        
        {/* Large Image */}
        <div className="relative h-80 md:h-full min-h-87.5">
          <img 
            src={specialItem.image_url} 
            alt={specialItem.name} 
            className="w-full h-full object-cover"
          />
          <span className="absolute top-4 left-4 bg-brand-accent text-white text-xs font-bold uppercase px-3 py-1.5 rounded shadow-lg animate-bounce">
            Today's Special Feature
          </span>
        </div>

        {/* Content */}
        <div className="p-8 sm:p-10 flex flex-col justify-between space-y-6 bg-linear-to-br from-white via-white to-brand-pink/30">
          <div className="space-y-4">
            <div className="inline-block bg-brand-pink text-brand-maroon text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-brand-divider">
              Daily Special
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl text-brand-maroon leading-tight">
              {specialItem.name}
            </h1>

            <span className="font-bold text-3xl text-brand-maroon block">
              {specialItem.price.toFixed(2)} Birr
            </span>

            {/* "What's Inside" Box */}
            <div className="bg-white p-6 rounded-xl border border-brand-divider shadow-sm space-y-2 mt-4">
              <span className="font-bold text-xs uppercase tracking-wider text-brand-maroon block">
                What's Inside / Recipe Details:
              </span>
              <p className="text-brand-body text-base leading-relaxed">
                {specialItem.description}
              </p>
            </div>
          </div>

          <div className="border-t border-brand-divider pt-6 text-xs text-brand-muted space-y-1">
            <p className="font-medium text-brand-maroon">• Available today!</p>
            {/* <p>• Showcase catalog item (In-store purchase only).</p> */}
          </div>
        </div>

      </div>

    </div>
  );
}