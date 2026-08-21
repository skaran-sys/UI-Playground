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
    large: "text-3xl sm:text-4xl lg:text-5xl font-serif",
    "extra-large": "text-4xl sm:text-5xl lg:text-6xl font-serif"
  };
  const resolvedHeaderSize = headerSizeClasses[config?.header_size || "large"] || headerSizeClasses.large;

  // Grid Layout Columns based on card_size
  const gridClasses: Record<string, string> = {
    small: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8 lg:gap-10",
    medium: "grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12",
    large: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-14"
  };
  const resolvedGridClass = gridClasses[config?.card_size || "medium"] || gridClasses.medium;

  // Touch & Mouse Scroll Rail Card Widths
  const carouselWidthClasses: Record<string, string> = {
    small: "w-[45%] sm:w-[30%] md:w-[22%] lg:w-[calc(16.666%-14px)]",
    medium: "w-[70%] sm:w-[45%] md:w-[30%] lg:w-[calc(25%-18px)]",
    large: "w-[85%] sm:w-[60%] md:w-[45%] lg:w-[calc(33.333%-16px)]"
  };
  const resolvedCarouselWidth = carouselWidthClasses[config?.card_size || "medium"] || carouselWidthClasses.medium;

  const isHeaderCentered = config?.header_alignment === "center";
  const isGrid = (config?.overflow || "grid") === "grid";
  const viewAllLink = config?.link || "#";
  const viewAllText = config?.view_all_text || "View All";

  return (
    <section
      id={config?.layout_id}
      style={{
        backgroundColor: 'var(--color-surface-light)',
        color: 'var(--color-text)'
      }}
      className="w-full py-10 sm:py-16 select-none"
    >
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* ── 1. Section Header ── */}
        {config?.show_header && (
          <div className="relative flex items-center mb-8 sm:mb-12">
            {/* Title Container */}
            <div className={`w-full ${isHeaderCentered ? 'text-center' : 'text-left pr-20 sm:pr-24'}`}>
              {config.title && (
                <h2
                  style={{ color: 'var(--color-text)' }}
                  className={`${resolvedHeaderSize} font-bold tracking-tight inline-block`}
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

        {/* ── 2. Loading State Skeletons ── */}
        {isLoading ? (
          <div className={`grid ${resolvedGridClass}`}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="flex flex-col items-center gap-3 animate-pulse">
                <div className="w-full aspect-[4/5] bg-transparent" />
                <div className="h-4 w-28 bg-[var(--color-surface-lighter)] rounded mt-2" />
              </div>
            ))}
          </div>
        ) : (
          /* ── 3. Category Presentation (Grid or Carousel Track) ── */
          <>
            {isGrid ? (
              /* Grid Layout */
              <div className={`grid ${resolvedGridClass}`}>
                {items.map((item) => (
                  <TransparentProductCategoryCard
                    key={item.id}
                    item={item}
                    fallbackLink={viewAllLink}
                    viewAllText={viewAllText}
                  />
                ))}
              </div>
            ) : (
              /* Carousel Layout (Finger & Mouse Scroll Rail) */
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
                    <TransparentProductCategoryCard
                      item={item}
                      fallbackLink={viewAllLink}
                      viewAllText={viewAllText}
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

/* ── Transparent Product Category Card with Hover "View All" ── */
function TransparentProductCategoryCard({
  item,
  fallbackLink,
  viewAllText
}: {
  item: Item;
  fallbackLink: string;
  viewAllText: string;
}) {
  const itemUrl = item.link || fallbackLink || '#';

  return (
    <a
      href={itemUrl}
      className="group flex flex-col items-center w-full focus:outline-none"
    >
      {/* 100% Transparent Media Box with Isolated Footwear Cutout and Bottom Hover CTA */}
      <div className="relative w-full aspect-[4/5] flex items-center justify-center p-3 sm:p-4 bg-transparent overflow-hidden">
        {/* Primary Cutout Image */}
        {item.image && (
          <img
            src={item.image}
            alt={item.title}
            className={`w-full h-full object-contain object-center transition-transform duration-500 ease-out group-hover:scale-100 ${
              item.hover_image ? 'group-hover:opacity-0' : ''
            }`}
            loading="lazy"
          />
        )}

        {/* Alternate Hover Image */}
        {item.hover_image && (
          <img
            src={item.hover_image}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-contain object-center p-3 sm:p-4 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-out"
            loading="lazy"
          />
        )}

        {/* Hover "View All" Action Overlay Pin */}
        <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out z-10 pointer-events-none">
          <span
            style={{ color: 'var(--color-text)' }}
            className="text-[11px] sm:text-xs font-normal tracking-wider relative whitespace-nowrap pb-0.5"
          >
            {viewAllText}
            <span
              style={{ backgroundColor: 'var(--color-text)' }}
              className="absolute bottom-0 left-0 w-full h-[1px]"
            />
          </span>
        </div>
      </div>

      {/* Category Title */}
      <div className="pt-2 text-center flex flex-col items-center">
        <h3
          style={{ color: 'var(--color-text)' }}
          className="text-xs sm:text-sm font-serif font-normal tracking-wide transition-colors group-hover:text-[var(--color-primary)]"
        >
          {item.title}
        </h3>

        {item.subtitle && (
          <p
            style={{ color: 'var(--color-text-muted)' }}
            className="text-[10px] sm:text-xs font-normal opacity-80 mt-0.5 line-clamp-1"
          >
            {item.subtitle}
          </p>
        )}
      </div>
    </a>
  );
}