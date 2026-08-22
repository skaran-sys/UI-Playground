"use client";

import React from 'react';

export interface ConfigType {
  layout_id: string;
  [key: string]: any;
}

type Item = {
  id: string;
  image: string;
  hover_image?: string;
  title: string;
  subtitle?: string;
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

  // Header Sizing Classes
  const headerSizeClasses: Record<string, string> = {
    small: "text-xl sm:text-2xl font-serif",
    medium: "text-2xl sm:text-3xl font-serif",
    large: "text-3xl sm:text-4xl lg:text-5xl font-serif",
    "extra-large": "text-4xl sm:text-5xl lg:text-6xl font-serif"
  };
  const resolvedHeaderSize = headerSizeClasses[config?.header_size || "large"] || headerSizeClasses.large;

  // Editorial Grid Column Classes
  const gridClasses: Record<string, string> = {
    small: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6",
    medium: "grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8",
    large: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
  };
  const resolvedGridClass = gridClasses[config?.card_size || "medium"] || gridClasses.medium;

  // Editorial Carousel Card Width Classes
  const carouselWidthClasses: Record<string, string> = {
    small: "w-[48%] sm:w-[32%] md:w-[24%] lg:w-[calc(20%-18px)]",
    medium: "w-[75%] sm:w-[48%] md:w-[32%] lg:w-[calc(25%-18px)]",
    large: "w-[85%] sm:w-[60%] md:w-[45%] lg:w-[calc(33.333%-16px)]"
  };
  const resolvedCarouselWidth = carouselWidthClasses[config?.card_size || "medium"] || carouselWidthClasses.medium;

  const isHeaderCentered = config?.header_alignment === "center";
  const isGrid = (config?.overflow || "carousel") === "grid";
  const viewAllLink = config?.link || "#";

  return (
    <section
      id={config?.layout_id}
      style={{
        backgroundColor: 'var(--color-surface-light)',
        color: 'var(--color-text)'
      }}
      className="w-full py-6 select-none"
    >
      <div className="p-2 mx-auto">
        
        {/* ── 1. Section Header (Title dynamic alignment, "View All" strictly pinned right) ── */}
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

            {/* View All Button - Stays fixed to the right regardless of title alignment */}
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
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="flex flex-col items-center gap-3 animate-pulse">
                <div className="w-full aspect-[3/4] sm:aspect-[4/5] rounded-xs bg-[var(--color-surface-lighter)]" />
                <div className="h-4 w-20 bg-[var(--color-surface-lighter)] rounded mt-2" />
              </div>
            ))}
          </div>
        ) : (
          /* ── 3. Category Presentation (Editorial Grid or Carousel Track) ── */
          <>
            {isGrid ? (
              /* Editorial Grid Layout */
              <div className={`grid ${resolvedGridClass}`}>
                {items.map((item) => (
                  <EditorialCategoryCard
                    key={item.id}
                    item={item}
                    fallbackLink={viewAllLink}
                  />
                ))}
              </div>
            ) : (
              /* Editorial Touch & Mouse Scrollable Rail (No Chevrons) */
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
                    <EditorialCategoryCard
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

/* ── Editorial Portrait Category Card Sub-component ── */
function EditorialCategoryCard({
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
      {/* Tall Portrait Media Container */}
      <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] overflow-hidden rounded-xs bg-[var(--color-surface-lighter)]">
        {/* Primary Image */}
        {item.image && (
          <img
            src={item.image}
            alt={item.title}
            className={`w-full h-full object-cover object-center transition-all duration-700 ease-out ${
              item.hover_image ? 'group-hover:opacity-0' : 'group-hover:scale-105'
            }`}
            loading="lazy"
          />
        )}

        {/* Hover Image (Smooth Fade Transition) */}
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
      <div className="pt-3.5 pb-1 text-center flex flex-col items-center">
        <span
          style={{ color: 'var(--color-text)' }}
          className="text-xs sm:text-sm font-medium tracking-wide group-hover:text-[var(--color-primary)] transition-colors inline-block"
        >
          {item.title}
        </span>

        {item.subtitle && (
          <span
            style={{ color: 'var(--color-text-muted)' }}
            className="text-[11px] sm:text-xs font-normal opacity-80 mt-0.5 line-clamp-1"
          >
            {item.subtitle}
          </span>
        )}
      </div>
    </a>
  );
}