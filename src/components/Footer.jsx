import { Link } from 'react-router-dom';
import { storeInfo } from '../data/storeInfo';

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
              <li className="flex justify-between max-w-xs">
                <span>Tue - Fri:</span> 
                <span>{storeInfo.hours.tueFri}</span>
              </li>
              <li className="flex justify-between max-w-xs">
                <span>Saturday:</span> 
                <span>{storeInfo.hours.saturday}</span>
              </li>
              <li className="flex justify-between max-w-xs">
                <span>Sun - Mon:</span> 
                <span>{storeInfo.hours.sunMon}</span>
              </li>
            </ul>
          </div>

          {/* Contact Snippet */}
          <div className="space-y-3">
            <h4 className="font-heading text-xl text-brand-accent">Visit Us</h4>
            <p className="text-sm text-brand-pink/80">
              {storeInfo.address.street}<br />
              {storeInfo.address.city}
            </p>
            <p className="text-sm text-brand-pink/80">
              <a href={`mailto:${storeInfo.email}`} className="hover:text-white transition-colors block">
                {storeInfo.email}
              </a>
              <a href={`tel:${storeInfo.phone}`} className="hover:text-white transition-colors block">
                {storeInfo.phone}
              </a>
            </p>
            {/* Google Maps Link */}
            <a 
              href={storeInfo.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-brand-accent hover:text-white transition-colors inline-flex items-center gap-1"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Get Directions
            </a>
          </div>

        </div>

        {/* Divider & Copyright */}
        <div className="pt-8 border-t border-brand-pink/10 flex flex-col sm:flex-row justify-between items-center text-xs text-brand-pink/60 gap-3 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Noelle Cakes. All rights reserved.</p>
          <p className="text-brand-pink/40">Handcrafted with love in Addis Ababa, Ethiopia</p>
        </div>
      </div>
    </footer>
  );
}
