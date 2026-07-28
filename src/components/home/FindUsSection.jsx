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
                <p className="text-brand-muted text-sm">123 Bakery Lane, Suite A, Cake City, CA 90210</p>
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
                <p className="text-brand-muted text-sm">Tuesday – Friday: 8:00 AM – 6:00 PM</p>
                <p className="text-brand-muted text-sm">Saturday: 9:00 AM – 5:00 PM</p>
                <p className="text-brand-muted text-sm font-medium mt-1">Closed Sunday & Monday</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl overflow-hidden shadow-lg border border-brand-divider bg-white p-2 aspect-4/3 flex flex-col justify-center items-center text-center">
          <div className="bg-brand-pink w-full h-full rounded-lg border border-dashed border-brand-maroon/30 flex flex-col justify-center items-center p-6">
            <svg className="w-12 h-12 text-brand-maroon/60 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <h4 className="font-heading text-2xl text-brand-maroon">Interactive Map</h4>
            <p className="text-xs text-brand-muted mt-1 max-w-xs">Located conveniently near downtown Cake City with ample parking behind the shop.</p>
          </div>
        </div>

      </div>
    </section>
  );
}