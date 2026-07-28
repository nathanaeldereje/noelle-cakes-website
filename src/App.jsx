import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ItemDetailPage from './pages/ItemDetailPage';
import SpecialDetailPage from './pages/SpecialDetailPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
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
    </Router>
  );
}

export default App;