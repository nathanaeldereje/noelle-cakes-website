import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Shared Public Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public Pages
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ItemDetailPage from './pages/ItemDetailPage';
import SpecialDetailPage from './pages/SpecialDetailPage';

// Admin Imports (Lazy Loaded to save 90 KB on initial page load!)
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';

const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminCategories = lazy(() => import('./pages/admin/AdminCategories'));
const AdminItems = lazy(() => import('./pages/admin/AdminItems'));
const AdminSpecials = lazy(() => import('./pages/admin/AdminSpecials'));
// const AdminMessages = lazy(() => import('./pages/admin/AdminMessages'));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

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
        <Suspense fallback={<div className="min-h-screen bg-brand-pink flex items-center justify-center font-body text-brand-maroon">Loading...</div>}>
          <Routes>
            
            {/* Admin Login */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Admin Protected CMS Shell */}
            <Route path="/admin" element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="categories" element={<AdminCategories />} />
                <Route path="items" element={<AdminItems />} />
                <Route path="specials" element={<AdminSpecials />} />
                {/* <Route path="messages" element={<AdminMessages />} /> */}
              </Route>
            </Route>

            {/* Public Website Routes */}
            <Route path="/*" element={<PublicLayout />} />

          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;