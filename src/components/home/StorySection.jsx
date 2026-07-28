export default function StorySection() {
  return (
    <section id="story" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="rounded-xl overflow-hidden shadow-lg border border-brand-divider aspect-square max-w-md mx-auto md:max-w-none w-full">
          <img 
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800" 
            alt="Us baking in kitchen"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="space-y-6">
          <span className="text-brand-accent font-semibold uppercase text-xs tracking-widest">Our Heritage</span>
          <h2 className="font-heading text-4xl sm:text-5xl text-brand-maroon">
            Baked with Passion by Noelle & Family
          </h2>
          <p className="text-brand-body/80 text-base leading-relaxed">
            At Noelle Cakes, baking is more than a craft—it is a family legacy. Our bakery brings timeless artisanal recipes to life with every slice. 
          </p>
          <p className="text-brand-body/80 text-base leading-relaxed">
            From our famous multi-layered tortas filled with rich dulce de leche to handcrafted custom celebration cakes, every single creation is baked fresh using traditional methods and zero shortcuts.
          </p>
          <div className="pt-2">
            <span className="font-accent text-3xl text-brand-maroon block">Noelle Something</span>
            <span className="text-xs text-brand-muted uppercase tracking-wider">Founder & Master Baker</span>
          </div>
        </div>
      </div>
    </section>
  );
}