export default function ContactSection() {
  return (
    <section id="contact" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-20">
      <div className="bg-white rounded-2xl p-8 sm:p-12 border border-brand-divider shadow-xl space-y-8">
        
        <div className="text-center space-y-2">
          <span className="text-brand-accent font-semibold uppercase text-xs tracking-widest">Get In Touch</span>
          <h2 className="font-heading text-4xl text-brand-maroon">
            Have a Question for Noelle?
          </h2>
          <p className="text-brand-muted text-sm max-w-lg mx-auto">
            Want to inquire about custom cake availability or catering? Send us a message below and we will get back to you during business hours.
          </p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-maroon mb-2">Your Name</label>
              <input 
                type="text" 
                placeholder="Jane Doe"
                className="w-full px-4 py-3 rounded-lg border border-brand-divider focus:outline-none focus:border-brand-maroon text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-maroon mb-2">Email Address</label>
              <input 
                type="email" 
                placeholder="jane@example.com"
                className="w-full px-4 py-3 rounded-lg border border-brand-divider focus:outline-none focus:border-brand-maroon text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-maroon mb-2">Your Message</label>
            <textarea 
              rows="4" 
              placeholder="Ask about flavor options, custom cake lead times..."
              className="w-full px-4 py-3 rounded-lg border border-brand-divider focus:outline-none focus:border-brand-maroon text-sm"
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="w-full bg-brand-maroon text-brand-pink font-semibold py-3.5 rounded-lg hover:bg-brand-body transition-colors shadow-md"
          >
            Send Message
          </button>
        </form>

      </div>
    </section>
  );
}