import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// Shared Public Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public Pages
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ItemDetailPage from './pages/ItemDetailPage';
import SpecialDetailPage from './pages/SpecialDetailPage';

// Admin Imports
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCategories from './pages/admin/AdminCategories';
import AdminItems from './pages/admin/AdminItems';
import AdminSpecials from './pages/admin/AdminSpecials';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

// Wrapper for all public pages that share the public Navbar & Footer
function PublicLayout() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between font-body text-brand-body">
      <Navbar />
      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu/:category" element={<CategoryPage />} />
          <Route path="/menu/:category/:item" element={<ItemDetailPage />} />
          <Route path="/specials/:item" element={<SpecialDetailPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          
          {/* Admin Login (Unprotected) */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Protected CMS Shell */}
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="items" element={<AdminItems />} />
              <Route path="specials" element={<AdminSpecials />} />
            </Route>
          </Route>

          {/* Public Website Routes */}
          <Route path="/*" element={<PublicLayout />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;