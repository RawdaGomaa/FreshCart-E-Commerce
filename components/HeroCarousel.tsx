'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Leaf } from 'lucide-react';

const slides = [
  {
    eyebrow: 'Farm fresh, every day',
    lines: ['Fresh Products', 'Delivered', 'to your Door'],
    subtitle: 'Get 20% off your first order.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1800&q=90',
    primary: 'Shop Now', secondary: 'View Deals',
    primaryHref: '/products', secondaryHref: '/categories',
  },
  {
    eyebrow: 'Style that fits your day',
    lines: ['Fashion for', 'Every Style'],
    subtitle: 'Explore clothing, accessories, and fresh new looks.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1800&q=90',
    primary: 'Shop Fashion', secondary: 'View Categories',
    primaryHref: '/products?category=6439d58a0049ad0b52b9003f', secondaryHref: '/categories',
  },
  {
    eyebrow: 'Smart tech, better prices',
    lines: ['Discover Smart', 'Electronics'],
    subtitle: 'Find gadgets, mobile devices, and electronics you love.',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1800&q=90',
    primary: 'Shop Electronics', secondary: 'Browse Brands',
    primaryHref: '/products', secondaryHref: '/brands',
  },
];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);

  // Advance slides automatically every 2 seconds, including while hovered.
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive(index => (index + 1) % slides.length);
    }, 2000);
    return () => window.clearInterval(timer);
  }, []);

  const goTo = (index: number) => setActive((index + slides.length) % slides.length);

  return (
    <section
      aria-label="Featured promotions"
      aria-roledescription="carousel"
      className="relative isolate h-[370px] overflow-hidden bg-[#08763e] text-white sm:h-[430px] lg:h-[510px]"

    >
      {slides.map((slide, index) => (
        <div
          key={index}
          aria-hidden={active !== index}
          className={`pointer-events-none absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${active === index ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: `url("${slide.image}")` }}
        />
      ))}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,118,57,.92)_0%,rgba(0,179,86,.75)_48%,rgba(2,121,56,.42)_100%)]" />

      <div className="wrap relative flex h-full items-center">
        <div key={active} className="max-w-[660px] px-10 sm:px-14 lg:px-12" aria-live="polite" aria-atomic="true">
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold text-[#e8ffed] sm:mb-5 sm:text-sm">
            <Leaf size={15} />{slides[active].eyebrow}
          </p>
          <h1 className="text-[32px] font-extrabold leading-[1.08] tracking-[-1px] sm:text-[49px] lg:text-[62px]">
            {slides[active].lines.map((line, index) => <span key={index} className="block">{line}</span>)}
          </h1>
          <p className="mt-3 text-xs font-medium text-[#e8ffed] sm:mt-5 sm:text-base">{slides[active].subtitle}</p>
          <div className="mt-5 flex flex-wrap gap-3 sm:mt-7">
            <Link href={slides[active].primaryHref} className="rounded-md bg-white px-4 py-2.5 text-xs font-bold text-[#119b4c] transition hover:bg-[#effff3] sm:px-6 sm:py-3 sm:text-sm">{slides[active].primary}</Link>
            <Link href={slides[active].secondaryHref} className="rounded-md border border-white/60 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/10 sm:px-6 sm:py-3 sm:text-sm">{slides[active].secondary}</Link>
          </div>
        </div>
      </div>

      <button type="button" onClick={() => goTo(active - 1)} aria-label="Previous slide"
        className="absolute left-2 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white text-[#109b4f] shadow transition hover:scale-110 sm:left-5 sm:h-11 sm:w-11 lg:left-8">
        <ChevronLeft size={22} />
      </button>
      <button type="button" onClick={() => goTo(active + 1)} aria-label="Next slide"
        className="absolute right-2 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white text-[#109b4f] shadow transition hover:scale-110 sm:right-5 sm:h-11 sm:w-11 lg:right-8">
        <ChevronRight size={22} />
      </button>
      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2" aria-label="Choose slide">
        {slides.map((_, index) => (
          <button key={index} type="button" aria-label={`Go to slide ${index + 1}`}
            aria-current={active === index ? 'true' : undefined}
            onClick={() => goTo(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${active === index ? 'w-7 bg-white' : 'w-2.5 bg-white/60 hover:bg-white'}`} />
        ))}
      </div>
    </section>
  );
}
