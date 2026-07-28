import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function AdminSpecials() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all menu items with category names
  const fetchItems = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from('menu_items')
      .select('*, categories(name)')
      .order('name', { ascending: true });

    if (error) {
      setError('Failed to fetch menu items.');
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // One-click toggle special status
  const handleToggleSpecial = async (item) => {
    const newStatus = !item.is_special;

    // Optimistically update state so the UI reacts instantly
    setItems(prevItems => 
      prevItems.map(i => i.id === item.id ? { ...i, is_special: newStatus } : i)
    );

    const { error } = await supabase
      .from('menu_items')
      .update({ 
        is_special: newStatus,
        updated_at: new Date().toISOString()
      })
      .eq('id', item.id);

    if (error) {
      setError(`Failed to update "${item.name}". Reverting...`);
      fetchItems(); // Revert on error
    }
  };

  const activeSpecials = items.filter(i => i.is_special);
  const nonSpecials = items.filter(i => 
    !i.is_special && 
    (i.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     i.categories?.name?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8 font-body text-gray-800">
      
      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl text-brand-maroon">Daily Specials Manager</h1>
        <p className="text-gray-500 text-sm mt-1">
          Easily highlight items as "Today's Special". Active specials automatically feature on the home page carousel!
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Helpful Persistence Reminder Card */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 text-amber-800 text-xs sm:text-sm">
        <span className="text-xl">💡</span>
        <div>
          <p className="font-bold">Persistence Rule Active:</p>
          <p className="mt-0.5 text-amber-700">
            If you don't update your specials tomorrow, whatever items are currently checked here will continue showing on the home page so the specials section never goes blank!
          </p>
        </div>
      </div>

      {/* 1. CURRENTLY ACTIVE SPECIALS SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
          <h2 className="font-heading text-2xl text-brand-maroon flex items-center gap-2">
            ⭐ Active Specials Right Now
            <span className="text-xs font-sans font-bold bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full border border-amber-200">
              {activeSpecials.length}
            </span>
          </h2>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading specials...</div>
        ) : activeSpecials.length === 0 ? (
          <div className="bg-white p-8 rounded-xl border border-dashed border-gray-300 text-center text-gray-500 space-y-1">
            <p className="font-bold">No specials active right now.</p>
            <p className="text-xs">Pick an item from the list below to feature it as Today's Special!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeSpecials.map((special) => (
              <div 
                key={special.id} 
                className="bg-white rounded-xl border-2 border-amber-300 p-4 shadow-sm flex items-center gap-4 relative overflow-hidden group"
              >
                {special.image_url ? (
                  <img src={special.image_url} alt={special.name} className="w-16 h-16 rounded-lg object-cover border" />
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-amber-50 flex items-center justify-center text-amber-400 text-xs">No img</div>
                )}

                <div className="grow min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                    {special.categories?.name || 'Item'}
                  </span>
                  <h3 className="font-bold text-gray-900 truncate mt-1">{special.name}</h3>
                  <p className="text-brand-maroon font-bold text-sm">{special.price.toFixed(2)} Birr</p>
                </div>

                <button
                  onClick={() => handleToggleSpecial(special)}
                  className="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold px-3 py-2 rounded-lg transition-colors whitespace-nowrap self-center"
                >
                  Remove ⭐
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 2. ALL OTHER MENU ITEMS LIST */}
      <div className="space-y-4 pt-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-2">
          <h2 className="font-heading text-2xl text-brand-maroon">
            Add More Items to Today's Specials
          </h2>

          {/* Search Filter */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search items or categories..."
            className="px-4 py-2 text-xs rounded-lg border border-gray-300 focus:outline-none focus:border-brand-maroon max-w-xs w-full bg-white"
          />
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {nonSpecials.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-sm">
              {searchTerm ? 'No matching items found.' : 'All items are currently marked as specials!'}
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {nonSpecials.map((item) => (
                <div key={item.id} className="p-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors gap-4">
                  
                  <div className="flex items-center gap-3 min-w-0">
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.name} className="w-12 h-12 rounded-lg object-cover border" />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-xs">No img</div>
                    )}
                    <div className="min-w-0">
                      <p className="font-bold text-gray-900 truncate">{item.name}</p>
                      <p className="text-xs text-gray-400">{item.categories?.name} • {item.price.toFixed(2)} Birr</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleSpecial(item)}
                    className="bg-brand-pink text-brand-maroon hover:bg-brand-maroon hover:text-white font-semibold text-xs px-4 py-2 rounded-lg transition-colors whitespace-nowrap shadow-xs"
                  >
                    + Make Special ⭐
                  </button>

                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}