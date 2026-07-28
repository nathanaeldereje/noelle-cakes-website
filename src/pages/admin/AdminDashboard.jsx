import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ categories: 0, items: 0, specials: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const { count: catCount } = await supabase.from('categories').select('*', { count: 'exact', head: true });
      const { count: itemCount } = await supabase.from('menu_items').select('*', { count: 'exact', head: true });
      const { count: specialCount } = await supabase.from('menu_items').select('*', { count: 'exact', head: true }).eq('is_special', true);

      setStats({
        categories: catCount || 0,
        items: itemCount || 0,
        specials: specialCount || 0
      });
      setLoading(false);
    }

    fetchStats();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-gray-500 font-body">Loading Live Dashboard...</div>;
  }

  return (
    <div className="space-y-8 font-body">
      
      <div>
        <h1 className="font-heading text-4xl text-brand-maroon">Welcome Back, Betty!</h1>
        <p className="text-gray-500 text-sm mt-1">Here is a quick overview of your current menu content live on Supabase.</p>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-1">
          <span className="text-xs font-semibold uppercase text-gray-400">Total Categories</span>
          <p className="text-4xl font-bold text-brand-maroon">{stats.categories}</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-1">
          <span className="text-xs font-semibold uppercase text-gray-400">Total Menu Items</span>
          <p className="text-4xl font-bold text-brand-maroon">{stats.items}</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-1">
          <span className="text-xs uppercase text-brand-accent font-bold">Active Specials</span>
          <p className="text-4xl font-bold text-brand-accent">{stats.specials}</p>
        </div>
      </div>

      {/* Quick Action Navigation */}
      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <h2 className="font-heading text-2xl text-brand-maroon">Quick Management</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link 
            to="/admin/categories" 
            className="p-4 border border-gray-200 rounded-lg hover:border-brand-maroon hover:bg-brand-pink/20 transition-all font-semibold text-brand-maroon text-sm text-center"
          >
            Manage Categories
          </Link>
          <Link 
            to="/admin/items" 
            className="p-4 border border-gray-200 rounded-lg hover:border-brand-maroon hover:bg-brand-pink/20 transition-all font-semibold text-brand-maroon text-sm text-center"
          >
            Manage Menu Items
          </Link>
          <Link 
            to="/admin/specials" 
            className="p-4 border border-gray-200 rounded-lg hover:border-brand-maroon hover:bg-brand-pink/20 transition-all font-semibold text-brand-maroon text-sm text-center"
          >
            Update Daily Specials
          </Link>
        </div>
      </div>

    </div>
  );
}