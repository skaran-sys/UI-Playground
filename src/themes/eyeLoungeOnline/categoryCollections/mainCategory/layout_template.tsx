'use client';

import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/* ── 1. Schema Types ── */
export interface ConfigType {
  layout_id: string;
  [key: string]: any;
}

export type Item = {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
  link?: string;
};

export interface Config extends ConfigType {
  title?: string;
  view_all_text?: string;
  cta_label?: string;
  show_header?: boolean;
  overflow?: "carousel" | "grid" | string;
  header_size?: "small" | "medium" | "large" | "extra-large";
  header_alignment?: "left" | "center";
  card_size?: "small" | "medium" | "large";
  show_title: boolean;
  show_subtitle: boolean;
}

export interface CollectionLayoutPropType {
  items?: Item[];
  config: Config;
  isLoading?: boolean;
  link?: string;
}

/* ── 2. Category Card Component ── */
function CategoryCard({
  item,
  show_title = true,
  show_subtitle = false
}: {
  item: Item;
  show_title?: boolean;
  show_subtitle?: boolean;
}) {
  return (
    <a
      href={item.link || '#'}
      style={{
        backgroundColor: 'var(--color-surface, #F5F5F5)'
      }}
      className="group relative flex flex-row items-center w-full aspect-[16/9] sm:aspect-[2/1] overflow-hidden rounded-xs cursor-pointer select-none transition-all duration-300"
    >
      {/* ── Left Half: Lifestyle Image with Hover Zoom ── */}
      <div className="w-1/2 h-full overflow-hidden relative flex-shrink-0 flex items-center justify-center">
        <img
          src={item.image}
          alt={item.title.replace('\n', ' ')}
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-108"
          loading="lazy"
        />
      </div>

      {/* ── Right Half: Category Heading ── */}
      <div className="w-1/2 h-full flex flex-col justify-center items-end px-4 sm:px-8 lg:px-10">
        {show_title && (
          <h3
            style={{ color: 'var(--color-text, #111111)' }}
            className="font-sans font-bold text-xs sm:text-base md:text-lg lg:text-xl xl:text-[22px] tracking-[0.14em] uppercase leading-snug whitespace-pre-line text-left transition-opacity text-right"
          >
            {item.title}
          </h3>
        )}

        {show_subtitle && item.subtitle && (
          <p
            style={{ color: 'var(--color-text-muted, #666666)' }}
            className="text-[10px] sm:text-xs mt-1 tracking-wider uppercase text-right"
          >
            {item.subtitle}
          </p>
        )}
      </div>
    </a>
  );
}

/* ── 3. Main Category Collection Component ── */
export default function Layout({
  items = [],
  config,
  isLoading = false
}: CollectionLayoutPropType) {
  const isCarousel = config?.overflow === 'carousel';
  const totalItems = items?.length || 0;

  // Infinite Circular Carousel State Engine
  const [currentIndex, setCurrentIndex] = useState(totalItems);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Triple items for seamless boundary looping
  const extendedItems = useMemo(() => {
    if (totalItems === 0) return [];
    return [...items, ...items, ...items];
  }, [items, totalItems]);

  const handleNext = () => {
    if (totalItems <= 1) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (totalItems <= 1) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    if (currentIndex >= totalItems * 2) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev - totalItems);
    } else if (currentIndex < totalItems) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev + totalItems);
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          backgroundColor: 'var(--color-background, #FFFFFF)',
          color: 'var(--color-text-muted, #666666)'
        }}
        className="w-full py-20 flex items-center justify-center text-xs tracking-widest uppercase"
      >
        Loading categories...
      </div>
    );
  }

  if (totalItems === 0) {
    return null;
  }

  return (
    <section
      style={{
        backgroundColor: 'var(--color-background, #FFFFFF)'
      }}
      className="w-full py-6 sm:py-10 select-none overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative">
        
        {/* Optional Section Header */}
        {config?.show_header && config?.title && (
          <div className="mb-6 sm:mb-8 text-center">
            <h2
              style={{ color: 'var(--color-text, #111111)' }}
              className="text-lg sm:text-2xl font-bold tracking-[0.2em] uppercase"
            >
              {config.title}
            </h2>
          </div>
        )}

        {/* ── CASE 1: Continuous Circular Carousel Mode ── */}
        {isCarousel ? (
          <div className="relative w-full">
            <div className="overflow-hidden w-full">
              <div
                onTransitionEnd={handleTransitionEnd}
                style={{
                  transform: `translateX(calc(-1 * ${currentIndex} * (100% / var(--cat-cols, 2))))`,
                  transition: isTransitioning ? 'transform 450ms ease-out' : 'none'
                }}
                className="flex w-full [--cat-cols:1] md:[--cat-cols:2]"
              >
                {extendedItems.map((item, idx) => (
                  <div
                    key={`${item.id}-${idx}`}
                    className="flex-[0_0_calc(100%/var(--cat-cols,2))] px-2 sm:px-3 lg:px-4 flex-shrink-0"
                  >
                    <CategoryCard
                      item={item}
                      show_title={config?.show_title !== false}
                      show_subtitle={config?.show_subtitle === true}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Bare Chevrons (No background color) */}
            {totalItems > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous categories"
                  style={{ color: 'var(--color-text, #111111)' }}
                  className="absolute -left-3 sm:-left-6 lg:-left-8 top-1/2 -translate-y-1/2 z-30 p-1.5 bg-transparent hover:opacity-50 transition-opacity active:scale-90 cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 stroke-[1.2]" />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next categories"
                  style={{ color: 'var(--color-text, #111111)' }}
                  className="absolute -right-3 sm:-right-6 lg:-right-8 top-1/2 -translate-y-1/2 z-30 p-1.5 bg-transparent hover:opacity-50 transition-opacity active:scale-90 cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 stroke-[1.2]" />
                </button>
              </>
            )}
          </div>
        ) : (
          /* ── CASE 2: 2x2 Grid Mode ── */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {items.map((item) => (
              <CategoryCard
                key={item.id}
                item={item}
                show_title={config?.show_title !== false}
                show_subtitle={config?.show_subtitle === true}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}