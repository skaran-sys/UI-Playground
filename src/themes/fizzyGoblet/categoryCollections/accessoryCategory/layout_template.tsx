"use client";

import React from 'react';

export interface ConfigType {
  layout_id: string;
  [key: string]: any;
}

type Item = {
  id: string;
  image: string;
  hover_image: string;
  title: string;
  subtitle: string;
  link?: string;
};

export interface Config extends ConfigType {
  title: string;
  view_all_text: string;
  link: string;
  cta_label: string;
  show_header: boolean;
  show_add_to_cart: boolean;
  show_wishlist: boolean;
  show_rating: boolean;
  overflow?: "carousel" | "grid" | string;
  header_size?: "small" | "medium" | "large" | "extra-large";
  header_alignment?: "left" | "center";
  card_size?: "small" | "medium" | "large";
}

export interface CollectionProps {
  config: Config;
}

export interface CollectionLayoutPropType {
  items?: Item[];
  config: Config;
  isLoading: boolean;
}

export default function Layout(props: CollectionLayoutPropType) {
  const { items = [], config, isLoading = false } = props;

  if (!items.length && !config?.show_header && !isLoading) {
    return null;
  }

  // Header Sizing Hierarchy
  const headerSizeClasses: Record<string, string> = {
    small: "text-xl sm:text-2xl font-serif",
    medium: "text-2xl sm:text-3xl font-serif",
    large: "text-2xl sm:text-3xl lg:text-4xl font-serif",
    "extra-large": "text-3xl sm:text-4xl lg:text-5xl font-serif"
  };
  const resolvedHeaderSize = headerSizeClasses[config?.header_size || "large"] || headerSizeClasses.large;

  // 2-Column Focus Grid Widths based on card_size
  const gridClasses: Record<string, string> = {
    small: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6",
    medium: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8",
    large: "grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
  };
  const resolvedGridClass = gridClasses[config?.card_size || "large"] || gridClasses.large;

  // Touch-Scroll Rail Card Widths
  const carouselWidthClasses: Record<string, string> = {
    small: "w-[70%] sm:w-[45%] md:w-[32%] lg:w-[calc(25%-18px)]",
    medium: "w-[80%] sm:w-[55%] md:w-[45%] lg:w-[calc(33.333%-16px)]",
    large: "w-[88%] sm:w-[70%] md:w-[calc(50%-16px)]"
  };
  const resolvedCarouselWidth = carouselWidthClasses[config?.card_size || "large"] || carouselWidthClasses.large;

  const isHeaderCentered = config?.header_alignment === "center";
  const isGrid = (config?.overflow || "grid") === "grid";
  const viewAllLink = config?.link || "#";

  return (
    <section
      id={config?.layout_id}
      style={{
        backgroundColor: 'var(--color-surface-light)',
        color: 'var(--color-text)'
      }}
      className="w-full py-8 sm:py-14 select-none"
    >
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* ── 1. Section Header ── */}
        {config?.show_header && (
          <div className="relative flex items-center mb-6 sm:mb-10">
            {/* Title Container */}
            <div className={`w-full ${isHeaderCentered ? 'text-center' : 'text-left pr-20 sm:pr-24'}`}>
              {config.title && (
                <h2
                  style={{ color: 'var(--color-text)' }}
                  className={`${resolvedHeaderSize} font-normal tracking-tight inline-block`}
                >
                  {config.title}
                </h2>
              )}
            </div>

            {/* View All Button */}
            {config.view_all_text && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
                <a
                  href={viewAllLink}
                  style={{ color: 'var(--color-text)' }}
                  className="text-xs sm:text-sm font-semibold tracking-wider hover:opacity-75 transition-opacity relative group pb-0.5 whitespace-nowrap"
                >
                  {config.view_all_text}
                  <span
                    style={{ backgroundColor: 'var(--color-text)' }}
                    className="absolute bottom-0 left-0 w-full h-[1.5px] transition-transform duration-300"
                  />
                </a>
              </div>
            )}
          </div>
        )}

        {/* ── 2. Loading Skeletons ── */}
        {isLoading ? (
          <div className={`grid ${resolvedGridClass}`}>
            {[1, 2].map((n) => (
              <div key={n} className="flex flex-col items-center gap-3 animate-pulse">
                <div className="w-full aspect-[4/3] rounded-xs bg-[var(--color-surface-lighter)]" />
                <div className="h-4 w-24 bg-[var(--color-surface-lighter)] rounded mt-2" />
              </div>
            ))}
          </div>
        ) : (
          /* ── 3. 2-Column Banner Presentation ── */
          <>
            {isGrid ? (
              /* Grid Layout */
              <div className={`grid ${resolvedGridClass}`}>
                {items.map((item) => (
                  <DuoCategoryCard
                    key={item.id}
                    item={item}
                    fallbackLink={viewAllLink}
                  />
                ))}
              </div>
            ) : (
              /* Touch/Mouse Swipe Rail */
              <div
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}
                className="flex items-start gap-4 sm:gap-6 lg:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth w-full py-2 px-1 [&::-webkit-scrollbar]:hidden justify-start"
              >
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`flex-shrink-0 snap-start ${resolvedCarouselWidth}`}
                  >
                    <DuoCategoryCard
                      item={item}
                      fallbackLink={viewAllLink}
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
}

/* ── Large Editorial Category Card Sub-component ── */
function DuoCategoryCard({
  item,
  fallbackLink
}: {
  item: Item;
  fallbackLink: string;
}) {
  const itemUrl = item.link || fallbackLink || '#';

  return (
    <a
      href={itemUrl}
      className="group flex flex-col items-center w-full focus:outline-none"
    >
      {/* Landscape Editorial Container */}
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xs bg-[var(--color-surface-lighter)]">
        {/* Base Image */}
        {item.image && (
          <img
            src={item.image}
            alt={item.title}
            className={`w-full h-full object-cover object-center transition-all duration-700 ease-out ${
              item.hover_image ? 'group-hover:opacity-0' : 'group-hover:scale-100'
            }`}
            loading="lazy"
          />
        )}

        {/* Hover Alternate Image */}
        {item.hover_image && (
          <img
            src={item.hover_image}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
            loading="lazy"
          />
        )}
      </div>

      {/* Category Labels */}
      <div className="pt-4 pb-1 text-center flex flex-col items-center">
        <span
          style={{ color: 'var(--color-text)' }}
          className="text-base sm:text-lg font-serif font-medium tracking-wide group-hover:text-[var(--color-primary)] transition-colors inline-block"
        >
          {item.title}
        </span>

        {item.subtitle && (
          <span
            style={{ color: 'var(--color-text-muted)' }}
            className="text-xs sm:text-sm font-normal opacity-80 mt-0.5 line-clamp-1"
          >
            {item.subtitle}
          </span>
        )}
      </div>
    </a>
  );
}