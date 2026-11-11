import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { storeInfo } from '../data/storeInfo';
import noelleMotif from '../assets/noelle-motif.svg';

// Crisp Vector Icons for Mobile & Navigation
function HomeIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function StoryIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}

function SpecialsIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
}

function MenuGridIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  );
}

function MapPinIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function ChatIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
}

function PhoneIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function ChevronRightIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    </svg>
  );
}

function ClockIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  { id: 'story', label: 'Our Story', icon: StoryIcon },
  { id: 'specials', label: "Today's Specials", isSpecial: true, icon: SpecialsIcon },
  { id: 'categories', label: 'Menu', icon: MenuGridIcon },
  { id: 'find-us', label: 'Find Us', icon: MapPinIcon },
  { id: 'contact', label: 'Contact', icon: ChatIcon },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHomeSection, setActiveHomeSection] = useState('home');

  const navigate = useNavigate();
  const location = useLocation();

  // Reset mobile drawer on route change using React's recommended state-during-render pattern
  const [prevPath, setPrevPath] = useState(location.pathname);
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setIsMobileMenuOpen(false);
  }

  // Calculate current active section directly during render (no cascading effect renders)
  let activeSection = activeHomeSection;
  if (location.pathname !== '/') {
    if (location.pathname.startsWith('/menu')) {
      activeSection = 'categories';
    } else if (location.pathname.startsWith('/specials')) {
      activeSection = 'specials';
    } else {
      activeSection = '';
    }
  }

  // Handle scroll detection for glassmorphism elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section on the homepage via scroll events
  useEffect(() => {
    if (location.pathname !== '/') return;

    const sectionIds = ['home', 'story', 'specials', 'categories', 'find-us', 'contact'];
    const handleActiveSection = () => {
      const scrollPos = window.scrollY + 220; // viewport offset below navbar
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveHomeSection(sectionIds[i]);
          return;
        }
      }
      setActiveHomeSection('home');
    };

    window.addEventListener('scroll', handleActiveSection, { passive: true });
    handleActiveSection();
    return () => window.removeEventListener('scroll', handleActiveSection);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open to prevent background scrolling
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Smooth navigation to home sections from anywhere
  const handleSectionLink = (sectionId) => {
    setIsMobileMenuOpen(false);

    const scrollToTarget = () => {
      if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    if (location.pathname !== '/') {
      navigate(sectionId === 'home' ? '/' : `/#${sectionId}`);
      // Retry in case Home component is still loading Supabase data
      let attempts = 0;
      const interval = setInterval(() => {
        const el = document.getElementById(sectionId);
        if (el || attempts > 20) {
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          clearInterval(interval);
        }
        attempts++;
      }, 100);
    } else {
      scrollToTarget();
    }
  };

  return (
    <>
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-brand-pink/95 backdrop-blur-md border-b border-brand-maroon/10 shadow-[0_4px_20px_-4px_rgba(101,0,30,0.08)]' 
            : 'bg-brand-pink/90 backdrop-blur-sm border-b border-brand-divider/70 shadow-xs'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18 sm:h-20">
            
            {/* Logo / Brand Mark */}
            <Link 
              to="/" 
              onClick={() => handleSectionLink('home')}
              className="group flex items-center gap-3 focus:outline-none"
              aria-label="Noelle Cakes & Pastries Home"
            >
              <div className="transition-transform duration-300 group-hover:scale-105 w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white/80 border border-brand-divider/80 p-1 flex items-center justify-center shadow-xs">
                <img src={noelleMotif} alt="Noelle Cakes Motif" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-heading text-2xl sm:text-[28px] lg:text-3xl text-brand-maroon leading-tight tracking-tight group-hover:text-brand-accent transition-colors">
                  Noelle
                </span>
                <span className="font-body text-[9px] sm:text-[10px] font-bold text-brand-muted tracking-[0.24em] uppercase -mt-0.5 leading-none">
                  Cakes & Pastries
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav 
              className="hidden md:flex items-center space-x-1 lg:space-x-2 font-body text-sm font-medium"
              aria-label="Main Navigation"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;

                if (item.isSpecial) {
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSectionLink(item.id)}
                      className={`relative px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer flex items-center gap-1.5 border text-xs sm:text-sm font-semibold ${
                        isActive
                          ? 'bg-brand-accent/25 text-brand-maroon border-brand-accent shadow-xs scale-[1.02]'
                          : 'bg-brand-accent/15 text-brand-maroon border-brand-accent/40 hover:bg-brand-accent/25 hover:border-brand-accent/70'
                      }`}
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
                      </span>
                      <span>{item.label}</span>
                    </button>
                  );
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSectionLink(item.id)}
                    className={`relative px-3 py-1.5 rounded-full text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'text-brand-maroon font-bold bg-brand-maroon/10 shadow-xs'
                        : 'text-brand-body/80 hover:text-brand-maroon hover:bg-brand-maroon/5'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-brand-accent rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Desktop Right CTA / Quick Order Button */}
            <div className="hidden md:flex items-center">
              <a
                href={`tel:${storeInfo.phone}`}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 lg:px-4 lg:py-2 rounded-full bg-brand-maroon text-brand-pink hover:bg-brand-body text-xs font-semibold uppercase tracking-wider shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                title={`Call ${storeInfo.phone}`}
              >
                <PhoneIcon className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                <span className="hidden lg:inline">Order / Call</span>
                <span className="lg:hidden">Call</span>
              </a>
            </div>

            {/* Mobile Header Actions (Quick Call + Hamburger) */}
            <div className="md:hidden flex items-center gap-2">
              {/* Direct One-Tap Call Button on Mobile */}
              <a
                href={`tel:${storeInfo.phone}`}
                className="p-2 rounded-full text-brand-maroon bg-white/70 border border-brand-divider shadow-xs hover:bg-white active:scale-95 transition-all"
                aria-label={`Call bakery at ${storeInfo.phone}`}
              >
                <PhoneIcon className="w-4 h-4 text-brand-maroon" />
              </a>

              {/* Animated Hamburger Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2.5 rounded-xl text-brand-maroon bg-white/70 border border-brand-divider hover:bg-white active:bg-brand-maroon/10 focus:outline-none focus:ring-2 focus:ring-brand-maroon/30 transition-all cursor-pointer"
                aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isMobileMenuOpen}
              >
                <div className="w-5 h-4 flex flex-col justify-between items-center relative">
                  <span 
                    className={`w-full h-0.5 bg-brand-maroon rounded-full transition-all duration-300 origin-center ${
                      isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
                    }`} 
                  />
                  <span 
                    className={`w-full h-0.5 bg-brand-maroon rounded-full transition-all duration-200 ${
                      isMobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
                    }`} 
                  />
                  <span 
                    className={`w-full h-0.5 bg-brand-maroon rounded-full transition-all duration-300 origin-center ${
                      isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
                    }`} 
                  />
                </div>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 top-18 sm:top-20 bg-brand-body/40 backdrop-blur-sm z-40 md:hidden animate-fadeIn"
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Menu Panel */}
      {isMobileMenuOpen && (
        <div 
          className="fixed top-18 sm:top-20 left-0 right-0 max-h-[calc(100dvh-5rem)] overflow-y-auto bg-brand-pink border-b border-brand-maroon/15 shadow-2xl z-50 md:hidden rounded-b-3xl animate-slideDown"
          role="dialog"
          aria-label="Mobile Navigation Menu"
        >
          <div className="px-5 pt-4 pb-6 space-y-4">
            
            {/* Bakery Status Banner */}
            <div className="flex items-center justify-between bg-white/60 border border-brand-divider px-3.5 py-2.5 rounded-2xl shadow-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-bold text-brand-maroon uppercase tracking-wide">
                  Open Today
                </span>
              </div>
              <span className="text-xs text-brand-muted font-medium">
                {storeInfo.hours.tueFri}
              </span>
            </div>

            {/* Mobile Nav Links */}
            <div className="space-y-1.5 font-body">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                const IconComponent = item.icon;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSectionLink(item.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-brand-maroon text-white font-semibold shadow-sm'
                        : 'bg-white/40 text-brand-body hover:bg-white hover:text-brand-maroon active:bg-brand-pink'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          isActive 
                            ? 'bg-white/20 text-brand-accent' 
                            : 'bg-brand-pink text-brand-maroon'
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="text-base font-medium">
                        {item.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.isSpecial && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 ${
                          isActive 
                            ? 'bg-brand-accent text-brand-maroon' 
                            : 'bg-brand-accent/20 text-brand-maroon border border-brand-accent/40'
                        }`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-maroon animate-pulse" />
                          Fresh
                        </span>
                      )}
                      <ChevronRightIcon 
                        className={`w-4 h-4 transition-transform ${
                          isActive ? 'text-brand-pink translate-x-0.5' : 'text-brand-muted'
                        }`} 
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Direct Action Buttons Hub */}
            <div className="pt-2 border-t border-brand-divider/80 space-y-2.5">
              <a
                href={`tel:${storeInfo.phone}`}
                className="w-full py-3.5 px-4 rounded-2xl bg-brand-maroon text-brand-pink hover:bg-brand-body font-semibold text-sm flex items-center justify-center gap-2.5 shadow-md active:scale-[0.99] transition-transform"
              >
                <PhoneIcon className="w-4 h-4 text-brand-accent" />
                <span>Call Bakery ({storeInfo.phone})</span>
              </a>

              <a
                href={storeInfo.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-2xl bg-white text-brand-maroon border border-brand-divider font-semibold text-sm flex items-center justify-center gap-2 hover:bg-brand-pink/50 active:scale-[0.99] transition-transform"
              >
                <MapPinIcon className="w-4 h-4 text-brand-accent" />
                <span>Get Directions ({storeInfo.address.street})</span>
              </a>
            </div>

            {/* Quick Operating Info Footer */}
            <div className="pt-1 text-center">
              <p className="text-[11px] text-brand-muted font-medium flex items-center justify-center gap-1.5">
                <ClockIcon className="w-3.5 h-3.5 text-brand-accent" />
                <span>Sat: {storeInfo.hours.saturday} • Sun-Mon: {storeInfo.hours.sunMon}</span>
              </p>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
