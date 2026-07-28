import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLayout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navLinks = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Categories', path: '/admin/categories' },
    { name: 'Menu Items', path: '/admin/items' },
    { name: 'Daily Specials', path: '/admin/specials' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-body text-gray-800">
      
      {/* Admin Top Header */}
      <header className="bg-brand-maroon text-brand-pink px-4 sm:px-8 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
          <Link to="/admin" className="font-heading text-2xl text-white tracking-wide">
            Noelle Cakes Admin
          </Link>
          <span className="hidden sm:inline bg-brand-pink/20 text-brand-pink text-xs px-2.5 py-0.5 rounded-full font-sans">
            CMS Portal
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link 
            to="/" 
            target="_blank" 
            className="text-xs text-brand-pink/80 hover:text-white underline flex items-center gap-1"
          >
            View Live Site ↗
          </Link>
          <button
            onClick={handleLogout}
            className="bg-brand-pink/10 hover:bg-brand-pink/20 text-brand-pink text-xs font-semibold px-3 py-1.5 rounded transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Admin Navigation Sub-bar */}
      <nav className="bg-white border-b border-gray-200 px-4 sm:px-8 flex overflow-x-auto gap-2">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`py-3.5 px-4 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
                isActive
                  ? 'border-brand-maroon text-brand-maroon'
                  : 'border-transparent text-gray-500 hover:text-brand-maroon'
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Main Admin Page Content */}
      <main className="grow max-w-7xl w-full mx-auto p-4 sm:p-8">
        <Outlet />
      </main>

    </div>
  );
}