"use client";

import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

export type QuoteItem = {
  image: string;
  title: string;
  subtitle: string;
  text: string;
  rating: number;
};

export type Config = {
  title: string;
  is_carousel: boolean;
  layout_id: string;
};

export interface ComponentPropType {
  config: Config;
}

export interface LayoutPropType {
  reviews: QuoteItem[];
  config: Config;
}

export default function Layout(props: LayoutPropType) {
  const { reviews = [], config } = props;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState<boolean>(false);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(false);

  const checkScrollState = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const isOverflowing = scrollWidth > clientWidth + 2;
      setHasOverflow(isOverflowing);
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    checkScrollState();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollState);
    }
    window.addEventListener('resize', checkScrollState);
    return () => {
      if (container) container.removeEventListener('scroll', checkScrollState);
      window.removeEventListener('resize', checkScrollState);
    };
  }, [reviews]);

  if (!reviews.length && !config?.title) {
    return null;
  }

  const isCarousel = Boolean(config?.is_carousel);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section
      id={config?.layout_id}
      style={{
        backgroundColor: 'var(--color-surface-light)',
        color: 'var(--color-text)'
      }}
      className="w-full py-10 sm:py-14 select-none"
    >
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* ── 1. Section Header ── */}
        {config?.title && (
          <div className="mb-6 sm:mb-8 text-left">
            <h2
              style={{ color: 'var(--color-text)' }}
              className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight"
            >
              {config.title}
            </h2>
          </div>
        )}

        {/* ── 2. UGC Presentation (Grid or Carousel Track) ── */}
        <div className="relative group/rail">
          {isCarousel ? (
            /* Carousel Mode */
            <div className="relative flex items-center w-full">
              {/* Left Chevron (Only visible when scrolled right) */}
              {hasOverflow && canScrollLeft && (
                <button
                  type="button"
                  onClick={handleScrollLeft}
                  aria-label="Scroll left"
                  style={{
                    backgroundColor: 'var(--color-surface-contrast)',
                    color: 'var(--color-surface-light)'
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-lg opacity-85 hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft className="w-5 h-5 stroke-[2]" />
                </button>
              )}

              {/* Horizontal Scroll Track */}
              <div
                ref={scrollContainerRef}
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}
                className="flex items-start gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth w-full py-1 [&::-webkit-scrollbar]:hidden justify-start"
              >
                {reviews.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex-shrink-0 snap-start w-[65%] sm:w-[38%] md:w-[26%] lg:w-[calc(20%-13px)]"
                  >
                    <SocialCard item={item} />
                  </div>
                ))}
              </div>

              {/* Right Chevron (Only visible when overflow remains to the right) */}
              {hasOverflow && canScrollRight && (
                <button
                  type="button"
                  onClick={handleScrollRight}
                  aria-label="Scroll right"
                  style={{
                    backgroundColor: 'var(--color-surface-contrast)',
                    color: 'var(--color-surface-light)'
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-lg opacity-85 hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="w-5 h-5 stroke-[2]" />
                </button>
              )}
            </div>
          ) : (
            /* Grid Mode */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              {reviews.map((item, idx) => (
                <SocialCard key={idx} item={item} />
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

/* ── Social Card Sub-component ── */
function SocialCard({ item }: { item: QuoteItem }) {
  return (
    <div className="group relative w-full flex flex-col overflow-hidden rounded-xs bg-[var(--color-surface-lighter)]">
      {/* 1:1 Aspect Ratio Media Container */}
      <div className="relative w-full aspect-square overflow-hidden">
        {item.image && (
          <img
            src={item.image}
            alt={item.title || "Social Post"}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        )}

        {/* Text / Overlay Caption if present */}
        {(item.title || item.text) && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-white">
            {item.title && (
              <p className="text-xs font-semibold truncate drop-shadow-xs">
                {item.title}
              </p>
            )}
            {item.subtitle && (
              <p className="text-[10px] text-white/80 truncate drop-shadow-xs">
                {item.subtitle}
              </p>
            )}
            {item.text && (
              <p className="text-[11px] text-white/90 line-clamp-2 mt-0.5 leading-snug drop-shadow-xs">
                {item.text}
              </p>
            )}
            {typeof item.rating === 'number' && item.rating > 0 && (
              <div className="flex items-center gap-0.5 mt-1 text-amber-400">
                {Array.from({ length: Math.min(item.rating, 5) }).map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}