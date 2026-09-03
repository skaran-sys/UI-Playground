'use client';

import React, { useState, useMemo } from 'react';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';

/* ── 1. Schema Types ── */
export interface ConfigType {
  layout_id: string;
  products_ids: string[];
  title: string;
  view_all_text: string;
  link: string;
  show_header: boolean;
  show_add_to_cart: boolean;
  show_quickbuy: boolean;
  show_wishlist: boolean;
  show_rating: boolean;
  show_price: boolean;
  show_subtitle: boolean;
  show_category: boolean;
  add_to_cart_text: string;
  quickbuy_text: string;
  heart_color: string;
  overflow: "carousel" | "grid" | string;
  header_size: "small" | "medium" | "large" | "extra-large";
  header_alignment: "left" | "center";
  card_size: "small" | "medium" | "large";
}

export interface Variant {
  label: string;
  id: string;
  price: string;
  color?: string;
}

export interface Item {
  id: string;
  image: string;
  hover_image: string;
  title: string;
  subtitle?: string;
  price: string;
  original_price: string;
  discount: string;
  badge: string;
  qtyInCart: number;
  wishlisted: boolean;
  category: string;
  link?: string;
  video_url?: string;
  variants?: Variant[];
  rating: number;
  review_count: number;
  stock: number;
  brand: string;
}

export interface ProductCardActions {
  addToCart: (
    id: string,
    qty: number,
    variantId?: string
  ) => void;

  quickBuy: (
    id: string,
    qty: number,
    variantId?: string
  ) => void;

  addToWishlist: (id: string) => void;

  updateQuantity: (
    id: string,
    qty: number
  ) => void;
}

export interface CollectionLayoutPropType extends ProductCardActions, ConfigType {
  items?: Item[];
  isLoading: boolean;
  link: string;
}

/* ── 2. Reusable Product Card Component ── */
function ProductCard({
  item,
  show_quickbuy,
  show_wishlist,
  show_price,
  show_subtitle,
  quickbuy_text,
  quickBuy,
  addToWishlist
}: {
  item: Item;
  show_quickbuy: boolean;
  show_wishlist: boolean;
  show_price: boolean;
  show_subtitle: boolean;
  quickbuy_text: string;
  quickBuy?: (id: string, qty: number) => void;
  addToWishlist?: (id: string) => void;
}) {
  const isSoldOut = item.badge?.toLowerCase().includes('sold') || item.stock === 0;

  return (
    <div className="group flex flex-col items-center text-center cursor-pointer w-full">
      {/* ── Image & Hover Container ── */}
      <div className="relative w-full aspect-[4/3] rounded-2xl p-4 sm:p-6 flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-[#F5F5F5] overflow-hidden">
        {/* Floating 'Sold out' Badge */}
        {isSoldOut && (
          <span
            style={{
              backgroundColor: 'var(--color-secondary, #4A4A4A)',
              color: 'var(--color-secondary-contrast, #FFFFFF)'
            }}
            className="absolute top-3 right-3 text-[10px] sm:text-[11px] font-medium px-2.5 py-0.5 rounded-sm z-20 shadow-2xs"
          >
            {item.badge || 'Sold out'}
          </span>
        )}

        {/* Wishlist Heart on Hover */}
        {show_wishlist && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (addToWishlist) addToWishlist(item.id);
            }}
            aria-label="Wishlist frame"
            style={{
              color: item.wishlisted ? 'var(--color-primary, #000000)' : 'var(--color-text-muted, #666666)'
            }}
            className="absolute top-3 left-3 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:scale-110 active:scale-90 cursor-pointer"
          >
            <Heart
              className={`w-4 h-4 stroke-[1.6] ${
                item.wishlisted ? 'fill-black text-black' : 'text-neutral-500 hover:text-black'
              }`}
            />
          </button>
        )}

        {/* Eyewear Frame Images (Primary + Optional Hover Swap) */}
        <a
          href={item.link || '#'}
          className="w-full h-full flex items-center justify-center relative"
        >
          <img
            src={item.image}
            alt={item.title || item.brand}
            className={`max-h-full max-w-full object-contain transition-all duration-300 ${
              item.hover_image ? 'group-hover:opacity-0 group-hover:scale-95' : 'group-hover:scale-105'
            }`}
            loading="lazy"
          />

          {item.hover_image && (
            <img
              src={item.hover_image}
              alt={`${item.title} alternative view`}
              className="absolute inset-0 m-auto max-h-full max-w-full object-contain opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
              loading="lazy"
            />
          )}
        </a>

        {/* Quick Shop Action Pill on Hover */}
        {show_quickbuy && !isSoldOut && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (quickBuy) quickBuy(item.id, 1);
            }}
            style={{
              backgroundColor: 'var(--color-surface-light, #FFFFFF)',
              color: 'var(--color-text, #111111)'
            }}
            className="absolute bottom-3 inset-x-8 sm:inset-x-12 py-2 rounded-full text-[11px] sm:text-[12px] font-medium shadow-md opacity-0 group-hover:opacity-100 transition-all hover:bg-neutral-50 active:scale-95 z-20 cursor-pointer"
          >
            {quickbuy_text || 'Quick Shop'}
          </button>
        )}
      </div>

      {/* ── Product Specifications ── */}
      <a
        href={item.link || '#'}
        className="block space-y-1 group-hover:opacity-80 transition-opacity w-full"
      >
        {/* Brand Title */}
        <h3
          style={{ color: 'var(--color-text, #111111)' }}
          className="text-xs sm:text-[13px] font-bold tracking-tight uppercase"
        >
          {item.brand || item.title}
        </h3>

        {/* Model Subtitle */}
        {show_subtitle && item.subtitle && (
          <p
            style={{ color: 'var(--color-text-muted, #666666)' }}
            className="text-xs sm:text-[12px] font-normal"
          >
            {item.subtitle}
          </p>
        )}

        {/* Price */}
        {show_price && item.price && (
          <p
            style={{ color: 'var(--color-text-muted, #666666)' }}
            className="text-xs sm:text-[12px] font-normal"
          >
            {item.price.includes('MRP') ? item.price : `MRP. ${item.price}/-`}
          </p>
        )}
      </a>
    </div>
  );
}

/* ── 3. Main Collection Layout Component ── */
export default function Layout(props: CollectionLayoutPropType) {
  const {
    items = [],
    isLoading = false,
    link = "/collections/all",
    view_all_text = "Shop Now",
    show_quickbuy = true,
    show_wishlist = true,
    show_price = true,
    show_subtitle = true,
    quickbuy_text = "Quick Shop",
    overflow = "grid",
    quickBuy,
    addToWishlist
  } = props;

  // Hardcoded Top Category Tabs
  const [activeTab, setActiveTab] = useState<'MAN' | 'WOMAN' | 'KIDS'>('MAN');
  const tabs: ('MAN' | 'WOMAN' | 'KIDS')[] = ['MAN', 'WOMAN', 'KIDS'];

  // Infinite Circular Carousel State Engine
  const totalItems = items.length;
  const [currentIndex, setCurrentIndex] = useState(totalItems);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Triple the items array to create seamless circular boundary padding
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

  // Silently reset indices at clone boundaries for infinite continuous loops
  const handleTransitionEnd = () => {
    if (currentIndex >= totalItems * 2) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev - totalItems);
    } else if (currentIndex < totalItems) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev + totalItems);
    }
  };

  const isCarousel = overflow === 'carousel';

  if (isLoading) {
    return (
      <div
        style={{
          backgroundColor: 'var(--color-background, #FFFFFF)',
          color: 'var(--color-text-muted, #666666)'
        }}
        className="w-full py-20 flex items-center justify-center text-xs tracking-widest uppercase"
      >
        Loading collection...
      </div>
    );
  }

  return (
    <section
      style={{
        backgroundColor: 'var(--color-background, #FFFFFF)'
      }}
      className="w-full py-10 sm:py-16 select-none overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative">
        
        {/* ── Top Category Selection Tabs ── */}
        <div className="flex items-center justify-center gap-6 sm:gap-10 mb-10 sm:mb-14">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                style={{
                  color: isActive ? 'var(--color-text, #111111)' : 'var(--color-text-muted, #666666)'
                }}
                className={`text-xs sm:text-[13px] tracking-[0.2em] uppercase transition-all pb-1 cursor-pointer font-medium ${
                  isActive
                    ? 'border-b-2 border-black font-semibold'
                    : 'hover:opacity-75 border-b-2 border-transparent'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* ── CASE 1: Infinite Circular Carousel Mode ── */}
        {isCarousel && totalItems > 0 ? (
          <div className="relative w-full">
            {/* Carousel Viewport */}
            <div className="overflow-hidden w-full">
              <div
                onTransitionEnd={handleTransitionEnd}
                style={{
                  transform: `translateX(calc(-1 * ${currentIndex} * (100% / var(--carousel-cols, 4))))`,
                  transition: isTransitioning ? 'transform 450ms ease-out' : 'none'
                }}
                className="flex w-full [--carousel-cols:2] sm:[--carousel-cols:3] lg:[--carousel-cols:4]"
              >
                {extendedItems.map((item, idx) => (
                  <div
                    key={`${item.id}-${idx}`}
                    className="flex-[0_0_calc(100%/var(--carousel-cols,4))] px-2 sm:px-3 lg:px-4 flex-shrink-0"
                  >
                    <ProductCard
                      item={item}
                      show_quickbuy={show_quickbuy}
                      show_wishlist={show_wishlist}
                      show_price={show_price}
                      show_subtitle={show_subtitle}
                      quickbuy_text={quickbuy_text}
                      quickBuy={quickBuy}
                      addToWishlist={addToWishlist}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Bare Carousel Chevrons (No background color) */}
            {totalItems > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous frames"
                  style={{ color: 'var(--color-text, #111111)' }}
                  className="absolute -left-3 sm:-left-6 lg:-left-8 top-[32%] -translate-y-1/2 z-30 p-1.5 bg-transparent hover:opacity-50 transition-opacity active:scale-90 cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 stroke-[1.2]" />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next frames"
                  style={{ color: 'var(--color-text, #111111)' }}
                  className="absolute -right-3 sm:-right-6 lg:-right-8 top-[32%] -translate-y-1/2 z-30 p-1.5 bg-transparent hover:opacity-50 transition-opacity active:scale-90 cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 stroke-[1.2]" />
                </button>
              </>
            )}
          </div>
        ) : (
          /* ── CASE 2: Responsive 4-Column Grid Mode ── */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 lg:gap-x-8 gap-y-10 sm:gap-y-12">
            {items.map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                show_quickbuy={show_quickbuy}
                show_wishlist={show_wishlist}
                show_price={show_price}
                show_subtitle={show_subtitle}
                quickbuy_text={quickbuy_text}
                quickBuy={quickBuy}
                addToWishlist={addToWishlist}
              />
            ))}
          </div>
        )}

        {/* ── Bottom 'Shop Now' Action Pill Button ── */}
        <div className="mt-12 sm:mt-16 flex justify-center">
          <a
            href={link || '#'}
            style={{
              backgroundColor: 'var(--color-primary, #000000)',
              color: 'var(--color-primary-contrast, #FFFFFF)'
            }}
            className="px-8 sm:px-12 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-medium tracking-wide uppercase hover:opacity-90 active:scale-95 transition-all shadow-xs cursor-pointer"
          >
            {view_all_text || 'Shop Now'}
          </a>
        </div>

      </div>
    </section>
  );
}