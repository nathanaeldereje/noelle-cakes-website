import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const todaysDate = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
});

export default function SpecialsSection({ specials }) {
  const autoplay = Autoplay({
    delay: 2500,
    stopOnInteraction: true,
    stopOnMouseEnter: true,
  });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: specials.length > 1,
      align: 'start',
    },
    [autoplay]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();

    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  if (!specials.length) return null;

  return (
    <section
      id="specials"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-20"
    >
      <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
        <span className="text-brand-accent font-semibold uppercase text-xs tracking-widest">
          {todaysDate}
        </span>

        <h2 className="font-heading text-4xl sm:text-5xl text-brand-maroon">
          Today's Specials
        </h2>

        <p className="text-brand-body/80 text-base">
          Prepared in limited batches each morning. Get them while they last!
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        <div className="relative">
          <div className="overflow-hidden rounded-xl" ref={emblaRef}>
            <div className="flex">
              {specials.map((special) => (
                <div
                  key={special.id}
                  className="min-w-0 flex-[0_0_100%]"
                >
                  <Link
                    to={`/specials/${special.id}`}
                    className="bg-white rounded-xl overflow-hidden border border-brand-divider shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col sm:flex-row"
                  >
                    <div className="relative h-52 sm:h-64 sm:w-1/2 overflow-hidden">
                      <img
                        src={special.image_url}
                        alt={special.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent sm:hidden"></div>

                      <span className="absolute top-3 left-3 bg-brand-accent text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded shadow">
                        Special
                      </span>
                    </div>

                    <div className="sm:w-1/2 p-6 flex flex-col justify-center space-y-2">
                      <h3 className="font-heading text-2xl sm:text-3xl text-brand-maroon">
                        {special.name}
                      </h3>

                      <p className="text-brand-muted text-sm leading-relaxed line-clamp-2">
                        {special.description}
                      </p>

                      <span className="font-body font-bold text-lg text-brand-maroon pt-1">
                        {special.price.toFixed(2)} Birr
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {specials.length > 1 && (
            <>
              <button
                onClick={scrollPrev}
                aria-label="Previous special"
                className="hidden sm:flex items-center justify-center absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 border border-brand-divider shadow-md text-brand-maroon hover:bg-white transition"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={scrollNext}
                aria-label="Next special"
                className="hidden sm:flex items-center justify-center absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 border border-brand-divider shadow-md text-brand-maroon hover:bg-white transition"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}
        </div>

        {specials.length > 1 && (
          <div className="flex justify-center gap-2">
            {specials.map((special, index) => (
              <button
                key={special.id}
                onClick={() => scrollTo(index)}
                aria-label={`Go to special ${index + 1}`}
                className={`transition-all rounded-full ${
                  selectedIndex === index
                    ? 'w-6 h-1.5 bg-brand-maroon'
                    : 'w-1.5 h-1.5 bg-brand-divider'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}