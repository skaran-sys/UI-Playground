'use client';

import React, { useState, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Sparkles,
  Zap,
  Flame
} from 'lucide-react';

/* ── 1. Appended Schema Types ── */
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
  variants?: {
    label: string;
    id: string;
    price: string;
    color?: string;
  }[];
  rating?: number;
  reviewCount?: number;
  offerPrice?: string;
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
  tabs?: { id: string; label: string }[];
}

export interface CollectionLayoutPropType {
  items?: Item[];
  config: Config;
  isLoading: boolean;
  addToCart: (id: string, qty: number, variantId?: string) => void;
  addToWishlist: (id: string) => void;
  updateQuantity: (id: string, qty: number, variantId?: string) => void;
  isWishlisted: (id: string) => boolean;
}

/* ── 2. Top-Left Badge Icon Resolver Component ── */
const ProductBadge = ({ badge }: { badge: string }) => {
  if (!badge) return null;

  // Clean any raw emojis from string
  const cleanBadgeText = badge.replace(/[^\w\s-]/gi, '').trim();
  const upperBadge = cleanBadgeText.toUpperCase();

  const renderBadgeIcon = () => {
    if (upperBadge.includes('BESTSELLER')) {
      return <Star className="w-3 h-3 fill-amber-400 text-amber-400 stroke-[2]" />;
    }
    if (upperBadge.includes('TOP PICK')) {
      return <Zap className="w-3 h-3 fill-amber-400 text-amber-400 stroke-[2]" />;
    }
    if (upperBadge.includes('TRENDING')) {
      return <Flame className="w-3 h-3 fill-amber-400 text-amber-400 stroke-[2]" />;
    }
    return <Sparkles className="w-3 h-3 fill-amber-400 text-amber-400 stroke-[2]" />;
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--color-surface-light)',
        borderColor: '#FDE68A',
        color: '#D97706'
      }}
      className="absolute top-0 left-0 border border-t-0 border-l-0 px-2.5 py-1 text-[10px] font-bold tracking-wider rounded-br-xl z-10 shadow-2xs flex items-center gap-1 uppercase"
    >
      <span>{cleanBadgeText}</span>
      {renderBadgeIcon()}
    </div>
  );
};

/* ── 3. Individual Product Card Component ── */
const ProductCard = ({
  item,
  config,
  addToCart
}: {
  item: Item;
  config: Config;
  addToCart: (id: string, qty: number, variantId?: string) => void;
}) => {
  const [activeVariant, setActiveVariant] = useState(
    item.variants && item.variants.length > 0 ? item.variants[0] : null
  );

  const displayPrice = activeVariant ? activeVariant.price : item.price;

  return (
    <div
      style={{
        backgroundColor: 'var(--color-surface-light)',
        borderColor: 'var(--color-border)'
      }}
      className="group w-full flex flex-col rounded-2xl border shadow-xs hover:shadow-md transition-shadow select-none overflow-hidden"
    >
      {/* Product Image Box with Dynamic Lucide Badge */}
      <a
        href={item.link || '#'}
        draggable={false}
        className="relative aspect-[4/4.5] w-full block overflow-hidden bg-[var(--color-surface-lighter)] cursor-pointer"
      >
        <ProductBadge badge={item.badge} />

        <img
          src={item.image}
          alt={item.title}
          draggable={false}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 pointer-events-none"
        />
      </a>

      {/* Product Information Body */}
      <div className="flex flex-col flex-1 p-4">
        {/* Skin Type Tag */}
        {item.description && (
          <div
            style={{
              backgroundColor: 'var(--color-surface-lighter)',
              color: 'var(--color-text-muted)'
            }}
            className="self-start px-2 py-0.5 rounded-sm mb-2"
          >
            <span className="text-[10px] font-semibold tracking-wide">
              {item.description}
            </span>
          </div>
        )}

        {/* Title */}
        <a href={item.link || '#'} className="block cursor-pointer">
          <h3
            style={{ color: 'var(--color-text)' }}
            className="text-[13px] font-bold leading-snug line-clamp-2 min-h-[38px] group-hover:text-[var(--color-primary)] transition-colors"
          >
            {item.title}
          </h3>
        </a>

        {/* Ratings with Lucide Star */}
        {config.show_rating && item.rating !== undefined && (
          <div className="flex items-center gap-1 mt-2">
            <div className="flex items-center text-emerald-600">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(item.rating!)
                      ? 'fill-emerald-500 text-emerald-500'
                      : 'text-emerald-200'
                  }`}
                />
              ))}
            </div>
            {item.reviewCount && (
              <span
                style={{ color: 'var(--color-text-muted)' }}
                className="text-[11px] font-medium ml-1"
              >
                ({item.reviewCount})
              </span>
            )}
          </div>
        )}

        {/* Variants Selector */}
        <div className="flex flex-wrap gap-2 mt-3 min-h-[26px]">
          {item.variants?.map((variant) => {
            const isSelected = activeVariant?.id === variant.id;
            return (
              <button
                key={variant.id}
                type="button"
                onClick={() => setActiveVariant(variant)}
                style={{
                  borderColor: isSelected
                    ? 'var(--color-primary)'
                    : 'var(--color-text)',
                  color: isSelected
                    ? 'var(--color-primary)'
                    : 'var(--color-text)',
                  backgroundColor: isSelected
                    ? 'var(--color-surface)'
                    : 'transparent'
                }}
                className="px-2.5 py-0.5 text-[11px] font-bold border rounded-[4px] cursor-pointer transition-colors"
              >
                {variant.label}
              </button>
            );
          })}
        </div>

        {/* Price & Offer Row */}
        <div className="mt-3 flex flex-col">
          <div className="flex items-baseline gap-2">
            <span
              style={{ color: 'var(--color-text)' }}
              className="text-lg font-black tracking-tight"
            >
              ₹{displayPrice}
            </span>
            {item.originalPrice && item.originalPrice !== displayPrice && (
              <span
                style={{ color: 'var(--color-text-light)' }}
                className="text-xs line-through"
              >
                ₹{item.originalPrice}
              </span>
            )}
          </div>

          {/* Offer Tag with Lucide Sparkles */}
          {item.offerPrice && (
            <div
              style={{
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-primary)'
              }}
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] w-max mt-1.5 font-bold"
            >
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span className="text-[10px] tracking-wide">
                Get at ₹{item.offerPrice}
              </span>
            </div>
          )}
        </div>

        {/* Add to Cart Button */}
        {config.show_add_to_cart && (
          <button
            type="button"
            onClick={() => addToCart(item.id, 1, activeVariant?.id)}
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-primary-contrast)'
            }}
            className="w-full mt-4 py-2.5 rounded-[4px] text-xs font-bold tracking-wider uppercase transition-all hover:opacity-90 active:scale-98 cursor-pointer shadow-xs"
          >
            {config.cta_label || 'ADD TO CART'}
          </button>
        )}
      </div>
    </div>
  );
};

/* ── 4. Main Collection Layout (Exactly 4 Cards Displayed in Frame) ── */
export default function Layout({
  items = [],
  config,
  isLoading,
  addToCart
}: CollectionLayoutPropType) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<string>(
    config.tabs && config.tabs.length > 0 ? config.tabs[0].id : ''
  );

  const scrollPrev = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.clientWidth / 4;
      scrollRef.current.scrollBy({ left: -(cardWidth * 2), behavior: 'smooth' });
    }
  };

  const scrollNext = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.clientWidth / 4;
      scrollRef.current.scrollBy({ left: cardWidth * 2, behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <div
        style={{ color: 'var(--color-text-muted)' }}
        className="w-full py-20 flex justify-center text-sm font-medium"
      >
        Loading collections...
      </div>
    );
  }

  if (!items || items.length === 0) return null;

  return (
    <section
      style={{ backgroundColor: 'var(--color-background)' }}
      className="w-full py-12 px-4 sm:px-6 lg:px-12 select-none overflow-hidden"
    >
      <div className="max-w-[1380px] mx-auto">
        
        {/* ── Section Header & Category Tabs ── */}
        {config.show_header && (
          <div
            className={`mb-8 flex flex-col ${
              config.header_alignment === 'left'
                ? 'items-start'
                : 'items-center'
            }`}
          >
            <h2
              style={{ color: 'var(--color-text)' }}
              className="text-2xl sm:text-3xl font-black tracking-tight mb-6"
            >
              {config.title}
            </h2>

            {config.tabs && config.tabs.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3">
                {config.tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      style={{
                        backgroundColor: isActive
                          ? 'var(--color-primary)'
                          : 'var(--color-surface-light)',
                        color: isActive
                          ? 'var(--color-primary-contrast)'
                          : 'var(--color-text)',
                        borderColor: isActive
                          ? 'var(--color-primary)'
                          : 'var(--color-border)'
                      }}
                      className="px-6 py-2 rounded-lg text-xs sm:text-sm font-bold border transition-all cursor-pointer shadow-2xs hover:border-[var(--color-primary)]"
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── Carousel Track Wrapper ── */}
        <div className="relative w-full mt-6 group/track">
          
          {/* Left Arrow */}
          <button
            type="button"
            onClick={scrollPrev}
            style={{
              color: 'var(--color-primary)',
              borderColor: 'var(--color-primary)',
              backgroundColor: 'var(--color-surface-light)'
            }}
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full border flex items-center justify-center shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-transform"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* Track: Exactly 4 items visible per viewport row */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 pt-2 px-1 scrollbar-none snap-x snap-mandatory scroll-smooth"
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="snap-start flex-shrink-0 w-[82%] sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)]"
              >
                <ProductCard
                  item={item}
                  config={config}
                  addToCart={addToCart}
                />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={scrollNext}
            style={{
              color: 'var(--color-primary)',
              borderColor: 'var(--color-primary)',
              backgroundColor: 'var(--color-surface-light)'
            }}
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full border flex items-center justify-center shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-transform"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.2]" />
          </button>
        </div>

        {/* ── Bottom View All Action ── */}
        {config.view_all_text && config.link && (
          <div className="mt-8 flex justify-center">
            <a
              href={config.link}
              style={{
                color: 'var(--color-primary)',
                borderColor: 'var(--color-primary)'
              }}
              className="px-10 py-2.5 rounded-md border font-bold text-xs sm:text-sm tracking-wider uppercase hover:bg-[var(--color-surface)] transition-colors cursor-pointer"
            >
              {config.view_all_text}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}