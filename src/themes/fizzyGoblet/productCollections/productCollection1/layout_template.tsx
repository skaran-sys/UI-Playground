"use client";

import React, { useState } from 'react';
import { Heart, ShoppingBag, Star } from 'lucide-react';

export interface ConfigType {
  layout_id: string;
  [key: string]: any;
}

export type Item = {
  id: string;
  image: string;
  hover_image: string;
  title: string;
  description: string;
  price: string;
  originalPrice: string;
  discount: string;
  badge: string;
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

export interface CollectionLayoutPropType {
  items?: Item[];
  config: Config;
  isLoading: boolean;
}

export default function Layout(props: CollectionLayoutPropType) {
  const { items = [], config, isLoading = false } = props;
  const [wishlistState, setWishlistState] = useState<Record<string, boolean>>({});

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlistState((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleAddToCart = (item: Item, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  if (!items.length && !config?.show_header && !isLoading) {
    return null;
  }

  // Dynamic Header Sizing Classes
  const headerSizeClasses: Record<string, string> = {
    small: "text-lg sm:text-xl font-serif",
    medium: "text-xl sm:text-2xl font-serif",
    large: "text-2xl sm:text-3xl lg:text-4xl font-serif",
    "extra-large": "text-3xl sm:text-4xl lg:text-5xl font-serif"
  };
  const resolvedHeaderSize = headerSizeClasses[config?.header_size || "large"] || headerSizeClasses.large;

  // Dynamic Grid Columns based on card_size
  const gridClasses: Record<string, string> = {
    small: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4",
    medium: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8",
    large: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8"
  };
  const resolvedGridClass = gridClasses[config?.card_size || "medium"] || gridClasses.medium;

  // Dynamic Carousel Card Width based on card_size
  const carouselWidthClasses: Record<string, string> = {
    small: "w-[46%] sm:w-[30%] md:w-[22%] lg:w-[calc(16.666%-14px)]",
    medium: "w-[72%] sm:w-[45%] md:w-[31%] lg:w-[calc(25%-18px)]",
    large: "w-[85%] sm:w-[60%] md:w-[45%] lg:w-[calc(33.333%-16px)]"
  };
  const resolvedCarouselWidth = carouselWidthClasses[config?.card_size || "medium"] || carouselWidthClasses.medium;

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
      className="w-full py-4 select-none"
    >
      <div className="px-8 mx-auto">
        
        {/* ── 1. Section Header ── */}
        {config?.show_header && (
          <div
            className={`flex items-baseline mb-6 sm:mb-8 lg:mb-10 ${
              isHeaderCentered
                ? 'flex-col sm:flex-row justify-center items-center gap-2 text-center'
                : 'justify-between'
            }`}
          >
            {config.title && (
              <h2
                style={{ color: 'var(--color-text)' }}
                className={`${resolvedHeaderSize} font-bold tracking-tight`}
              >
                {config.title}
              </h2>
            )}

            {config.view_all_text && (
              <a
                href={viewAllLink}
                style={{ color: 'var(--color-text)' }}
                className="text-xs sm:text-sm font-semibold tracking-wider hover:opacity-75 transition-opacity relative group pb-0.5"
              >
                {config.view_all_text}
                <span
                  style={{ backgroundColor: 'var(--color-text)' }}
                  className="absolute bottom-0 left-0 w-full h-[1.5px] transition-transform duration-300"
                />
              </a>
            )}
          </div>
        )}

        {/* ── 2. Loading State Skeletons ── */}
        {isLoading ? (
          <div className={`grid ${resolvedGridClass}`}>
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="flex flex-col gap-3 animate-pulse">
                <div className="w-full aspect-[4/5] rounded-sm bg-[var(--color-surface-lighter)]" />
                <div className="h-4 bg-[var(--color-surface-lighter)] rounded w-3/4" />
                <div className="h-3 bg-[var(--color-surface-lighter)] rounded w-1/2" />
                <div className="h-4 bg-[var(--color-surface-lighter)] rounded w-1/4" />
              </div>
            ))}
          </div>
        ) : (
          /* ── 3. Product Presentation (Grid or Carousel Track) ── */
          <>
            {isGrid ? (
              /* Grid Layout */
              <div className={`grid ${resolvedGridClass}`}>
                {items.map((item) => (
                  <ProductCard
                    key={item.id}
                    item={item}
                    fallbackLink={viewAllLink}
                    config={config}
                    isWishlisted={Boolean(wishlistState[item.id])}
                    onToggleWishlist={toggleWishlist}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            ) : (
              /* Carousel Layout (Bounded Horizontal Scroll Rail) */
              <div
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}
                className="flex gap-4 sm:gap-6 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
              >
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`flex-shrink-0 snap-start ${resolvedCarouselWidth}`}
                  >
                    <ProductCard
                      item={item}
                      fallbackLink={viewAllLink}
                      config={config}
                      isWishlisted={Boolean(wishlistState[item.id])}
                      onToggleWishlist={toggleWishlist}
                      onAddToCart={handleAddToCart}
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

/* ── Product Card Sub-component ── */
function ProductCard({
  item,
  fallbackLink,
  config,
  isWishlisted,
  onToggleWishlist,
  onAddToCart
}: {
  item: Item;
  fallbackLink: string;
  config: Config;
  isWishlisted: boolean;
  onToggleWishlist: (id: string, e: React.MouseEvent) => void;
  onAddToCart: (item: Item, e: React.MouseEvent) => void;
}) {
  const itemUrl = item.link || fallbackLink || '#';

  return (
    <div className="group flex flex-col relative w-full">
      {/* Product Card Media Container */}
      <a
        href={itemUrl}
        className="relative block w-full aspect-[4/5] overflow-hidden rounded-sm bg-[var(--color-surface-lighter)]"
      >
        {/* Base Image */}
        {item.image && (
          <img
            src={item.image}
            alt={item.title}
            className={`w-full h-full object-cover object-center transition-all duration-500 ease-out ${
              item.hover_image ? 'group-hover:opacity-0' : 'group-hover:scale-105'
            }`}
            loading="lazy"
          />
        )}

        {/* Hover Secondary Image (Instant Smooth Fade Swap) */}
        {item.hover_image && (
          <img
            src={item.hover_image}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-out"
            loading="lazy"
          />
        )}

        {/* Badge Tag */}
        {item.badge && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <span
              style={{
                backgroundColor: 'var(--color-primary-lighter)',
                color: 'var(--color-surface-contrast)'
              }}
              className="px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold tracking-wide uppercase rounded-sm shadow-xs inline-block"
            >
              {item.badge}
            </span>
          </div>
        )}

        {/* Wishlist Heart Action */}
        {config?.show_wishlist && (
          <button
            type="button"
            onClick={(e) => onToggleWishlist(item.id, e)}
            aria-label="Wishlist item"
            style={{
              backgroundColor: 'var(--color-surface-light)',
              color: isWishlisted ? 'var(--color-primary)' : 'var(--color-text-muted)',
              borderColor: 'var(--color-border)'
            }}
            className="absolute top-2.5 right-2.5 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border shadow-sm transition-transform duration-200 hover:scale-110 active:scale-95"
          >
            <Heart
              className="w-4 h-4 transition-colors"
              fill={isWishlisted ? 'currentColor' : 'none'}
              strokeWidth={1.8}
            />
          </button>
        )}
      </a>

      {/* Product Meta & Actions Area */}
      <div className="pt-3 pb-1 flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <a
            href={itemUrl}
            style={{ color: 'var(--color-text)' }}
            className="block text-xs sm:text-sm font-semibold truncate hover:text-[var(--color-primary)] transition-colors"
          >
            {item.title}
          </a>

          {item.description && (
            <p
              style={{ color: 'var(--color-text-muted)' }}
              className="text-[11px] sm:text-xs font-normal truncate mt-0.5"
            >
              {item.description}
            </p>
          )}

          {/* Optional Rating Indicator */}
          {config?.show_rating && (
            <div className="flex items-center gap-1 mt-1 text-[var(--color-primary)]">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-[11px] font-medium text-[var(--color-text)]">4.9</span>
            </div>
          )}

          {/* Price & Discounts */}
          <div className="flex items-center gap-2 mt-1">
            {item.price && (
              <span
                style={{ color: 'var(--color-text)' }}
                className="text-xs sm:text-sm font-bold tracking-tight"
              >
                {item.price}
              </span>
            )}

            {item.originalPrice && (
              <span
                style={{ color: 'var(--color-text-light)' }}
                className="text-[11px] sm:text-xs line-through"
              >
                {item.originalPrice}
              </span>
            )}

            {item.discount && (
              <span
                style={{ color: 'var(--color-primary)' }}
                className="text-[11px] sm:text-xs font-semibold"
              >
                {item.discount}
              </span>
            )}
          </div>
        </div>

        {/* Quick Add To Cart Action */}
        {config?.show_add_to_cart && (
          <button
            type="button"
            onClick={(e) => onAddToCart(item, e)}
            title={config.cta_label || 'Add to cart'}
            aria-label={config.cta_label || 'Add to cart'}
            style={{ color: 'var(--color-text)' }}
            className="p-1 hover:text-[var(--color-primary)] transition-colors mt-0.5 flex-shrink-0"
          >
            <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[1.6]" />
          </button>
        )}
      </div>
    </div>
  );
} 