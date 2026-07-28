import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-brand-maroon text-brand-pink font-body border-t border-brand-maroon/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Column */}
          <div className="space-y-3">
            <h3 className="font-heading text-3xl text-white">Noelle Cakes</h3>
            <p className="text-brand-pink/80 text-sm leading-relaxed">
              Crafting artisan tortas, layer cakes, and fresh daily pastries with love and passion.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading text-xl text-brand-accent">Quick Links</h4>
            <ul className="space-y-2 text-sm text-brand-pink/80">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/menu/pastries" className="hover:text-white transition-colors">Pastries & Tortas</Link></li>
              <li><Link to="/menu/cakes" className="hover:text-white transition-colors">Custom Cakes</Link></li>
              <li><Link to="/menu/drinks" className="hover:text-white transition-colors">Drinks</Link></li>
            </ul>
          </div>

          {/* Hours */}
          <div className="space-y-3">
            <h4 className="font-heading text-xl text-brand-accent">Bakery Hours</h4>
            <ul className="space-y-1 text-sm text-brand-pink/80">
              <li className="flex justify-between max-w-50"><span>Tue - Fri:</span> <span>8:00 AM - 6:00 PM</span></li>
              <li className="flex justify-between max-w-50"><span>Saturday:</span> <span>9:00 AM - 5:00 PM</span></li>
              <li className="flex justify-between max-w-50"><span>Sun - Mon:</span> <span>Closed</span></li>
            </ul>
          </div>

          {/* Contact Snippet */}
          <div className="space-y-3">
            <h4 className="font-heading text-xl text-brand-accent">Visit Us</h4>
            <p className="text-sm text-brand-pink/80">
              123 Bakery Lane, Suite A<br />
              Cake City, CA 90210
            </p>
            <p className="text-sm text-brand-pink/80">
              hello@noellecakes.com<br />
              (555) 019-2834
            </p>
          </div>

        </div>

        {/* Divider & Copyright */}
        <div className="pt-8 border-t border-brand-pink/10 flex flex-col sm:flex-row justify-between items-center text-xs text-brand-pink/60 gap-4">
          <p>© {new Date().getFullYear()} Noelle Cakes. All rights reserved.</p>
          
          {/* Discreet Owner Login Link */}
          <Link to="/admin/login" className="hover:text-brand-accent transition-colors flex items-center gap-1 opacity-70 hover:opacity-100">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 002-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Owner Login
          </Link>
        </div>
      </div>
    </footer>
  );
}