import { storeInfo } from '../../data/storeInfo';

export default function FindUsSection() {
  return (
    <section id="find-us" className="bg-brand-pink py-16 px-4 sm:px-6 lg:px-8 scroll-mt-20 border-t border-brand-divider">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <div className="space-y-6">
          <span className="text-brand-accent font-semibold uppercase text-xs tracking-widest">Location & Hours</span>
          <h2 className="font-heading text-4xl sm:text-5xl text-brand-maroon">
            Come Visit Our Bakery
          </h2>
          <p className="text-brand-body/80 text-base leading-relaxed">
            Stop by to smell the fresh pastries or pick up your pre-ordered custom cake. We would love to see you!
          </p>

          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-4">
              <div className="bg-brand-maroon text-brand-pink p-3 rounded-lg shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-brand-maroon text-lg">Address</h4>
                <p className="text-brand-muted text-sm">
                  {storeInfo.address.street}<br />
                  {storeInfo.address.city}
                </p>
                <a 
                  href={storeInfo.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-accent text-xs hover:underline inline-flex items-center gap-1 mt-1"
                >
                  Get Directions
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-brand-maroon text-brand-pink p-3 rounded-lg shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-brand-maroon text-lg">Operating Hours</h4>
                <p className="text-brand-muted text-sm">Tuesday – Friday: {storeInfo.hours.tueFri}</p>
                <p className="text-brand-muted text-sm">Saturday: {storeInfo.hours.saturday}</p>
                <p className="text-brand-muted text-sm font-medium mt-1">Closed Sunday & Monday</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-brand-maroon text-brand-pink p-3 rounded-lg shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-brand-maroon text-lg">Contact</h4>
                <p className="text-brand-muted text-sm">{storeInfo.email}</p>
                <p className="text-brand-muted text-sm">{storeInfo.phone}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl overflow-hidden shadow-lg border border-brand-divider bg-white p-2 aspect-4/3">
          <iframe
            src={storeInfo.googleMapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Noelle Cakes Location"
            className="rounded-lg"
          ></iframe>
        </div>

      </div>
    </section>
  );
}