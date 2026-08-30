'use client';

import React, { useState } from 'react';
import { Star, Tag } from 'lucide-react';

/* ── 1. Schema Types ── */
export interface Product {
  id: string;
  title: string;
  slug?: string;
  image: string;
  alt: string;
  link: string;
  price: string;
  originalPrice: string;
  discount: string;
  rating: number;
  reviewCount: number;
  stock: number;
  brand: string;
  badge: string;
  hoverImages?: string[];
  skinType?: string;
  offerPrice?: string;
  variants?: {
    label: string;
    id: string;
    price: string;
    offerPrice?: string;
  }[];
  [key: string]: any;
}

export type CardPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export type ButtonStyle = "filled" | "bordered" | "text";
export type SlideType = "manual" | "auto";

export interface BadgeConfig {
  isVisible: boolean;
  bgColor: string;
  position: CardPosition;
}

export interface DiscountConfig {
  isVisible: boolean;
  bgColor: string;
  position: CardPosition;
  overlay?: boolean;
}

export interface WishlistConfig {
  isVisible: boolean;
  color?: string;
  overlay?: boolean;
  position?: CardPosition;
}

export interface RatingConfig {
  isVisible: boolean;
  color?: string;
  overlay?: boolean;
}

export interface CoverVideoConfig {
  isVisible: boolean;
  loop?: boolean;
}

export interface SlideShowConfig {
  isVisible: boolean;
  autoSlideDuration?: number;
  slideType?: SlideType;
}

export interface ActionButtonConfig {
  isVisible: boolean;
  btnStyle?: ButtonStyle;
  color?: string;
  btnText?: string;
}

export interface ProductCardConfig {
  overlay: boolean;
  spacing: number;
  corner: number;
  shadow: boolean;
  showSubTitle: boolean;
  showPrice: boolean;
  coverImage: boolean;
  badge: BadgeConfig;
  discount: DiscountConfig;
  ratings: RatingConfig;
  wishlist: WishlistConfig;
  coverVideo: CoverVideoConfig;
  slideShow?: SlideShowConfig;
  buyNow: ActionButtonConfig;
  addToCart: ActionButtonConfig;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface LayoutConfig {
  title: string;
  subtitle?: string;
  card: ProductCardConfig;
  showFilters: boolean;
}

export type FilterValueItem =
  | {
      name: string;
      count: number;
      [key: string]: any;
    }
  | {
      min: number;
      max: number;
      label: string;
      count: number;
      [key: string]: any;
    };

export interface Filter {
  key: string;
  label: string;
  isMulti: boolean;
  value: FilterValueItem[];
  [key: string]: any;
}

export interface SortOption {
  key: string;
  label: string;
}

export interface FiltersResponse {
  filters: Filter[];
  sortOptions: SortOption[];
}

interface ProductActions {
  addToCart: (id: string, qty: number) => void;
  addToWishlist: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  isWishlisted: (id: string) => boolean;
  cartItems: Record<string, number>;
}

export interface ProductCardPropsType extends ProductActions {
  product: Product;
  config: ProductCardConfig;
  index?: number;
}

export interface LayoutPropsTypes extends ProductActions {
  products: Product[];
  config: LayoutConfig;
  pagination?: Pagination;
  onPageChange: (page: number) => void;
  filters: Filter[];
  sortOptions: SortOption[];
  applyFilters: () => void;
  clearFilters: () => void;
  loading: boolean;
}

/* ── 2. Top Hero Category Banner ── */
function CategoryPromoBanner({ subtitle }: { subtitle?: string }) {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-r from-[#FFA259] via-[#FF5F85] to-[#FF8FA9] p-6 sm:p-10 mb-10 shadow-xs flex flex-col md:flex-row items-center justify-between min-h-[190px] sm:min-h-[220px]">
      {/* Decorative Floating Artwork */}
      <div className="flex items-center gap-4 z-10">
        <div className="relative">
          <span className="absolute -top-3 right-0 bg-[#FF6A00] text-white text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-full shadow-xs uppercase tracking-tight z-20">
            NEW AGE UV FILTERS
          </span>
          <div className="w-32 sm:w-44 h-28 sm:h-36 flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=85&w=400"
              alt="Watermelon Range"
              className="max-h-full object-contain drop-shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Right Typographic Title */}
      <div className="text-center md:text-right mt-4 md:mt-0 z-10 space-y-1 sm:space-y-2">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-wider uppercase drop-shadow-sm">
          WATERMELON
        </h1>
        {subtitle && (
          <div className="inline-block bg-[#FF2E93] text-white font-bold text-xs sm:text-sm px-4 py-1.5 rounded-full shadow-xs">
            {subtitle}
          </div>
        )}
      </div>

      {/* Background Soft Glow Accents */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10 pointer-events-none" />
    </div>
  );
}

/* ── 3. Product Card Component ── */
export function ProductCard({
  product,
  config,
  addToCart
}: ProductCardPropsType) {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants && product.variants.length > 0 ? product.variants[0] : null
  );

  const displayPrice = selectedVariant ? selectedVariant.price : product.price;
  const displayOfferPrice = selectedVariant?.offerPrice || product.offerPrice;

  return (
    <div
      style={{
        backgroundColor: 'var(--color-surface-light, #FFFFFF)',
        borderColor: 'var(--color-border, #F1F5F9)'
      }}
      className="flex flex-col justify-between rounded-2xl bg-white p-3 hover:shadow-md transition-all duration-300 group"
    >
      <div>
        {/* ── Top Media Area with Floating Badge ── */}
        <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#FFF3F6] mb-3">
          {/* Badge (e.g. BESTSELLER ★, TOP PICK, JUST IN ♥) */}
          {config.badge.isVisible && product.badge && (
            <div className="absolute -top-1 -left-1 z-10">
              <span className="bg-[#FFF0F6] border border-[#FF2E93] text-[#FF2E93] text-[10px] sm:text-[11px] font-black px-2 py-0.5 rounded-md shadow-2xs tracking-tight">
                {product.badge}
              </span>
            </div>
          )}

          {/* Product Thumbnail */}
          <a href={product.link} className="block w-full h-full">
            <img
              src={product.image}
              alt={product.alt || product.title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </a>
        </div>

        {/* ── Skin Suitability Tag ── */}
        {product.skinType && (
          <div className="mb-1.5">
            <span className="inline-block bg-[#F1F5F9] text-neutral-600 text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-sm">
              {product.skinType}
            </span>
          </div>
        )}

        {/* ── Product Title ── */}
        <a href={product.link} className="block group-hover:underline">
          <h3
            style={{ color: 'var(--color-text, #0F172A)' }}
            className="text-xs sm:text-[13px] font-bold leading-snug line-clamp-2 min-h-[34px]"
          >
            {product.title}
          </h3>
        </a>

        {/* ── Star Ratings ── */}
        {config.ratings.isVisible && (
          <div className="flex items-center gap-1 mt-1.5">
            <div className="flex items-center text-[#70B33F]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating || 5)
                      ? 'fill-[#70B33F] text-[#70B33F]'
                      : 'text-neutral-200'
                  }`}
                />
              ))}
            </div>
            {product.reviewCount > 0 && (
              <span className="text-[11px] font-semibold text-neutral-500">
                ({product.reviewCount})
              </span>
            )}
          </div>
        )}

        {/* ── Size Variant Selector Pills ── */}
        {product.variants && product.variants.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {product.variants.map((v) => {
              const isSelected = selectedVariant?.id === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelectedVariant(v)}
                  className={`px-2.5 py-0.5 rounded-sm text-[11px] font-bold border transition-colors cursor-pointer ${
                    isSelected
                      ? 'border-[#FF2E93] text-[#FF2E93] bg-[#FFF0F6]'
                      : 'border-neutral-300 text-neutral-700 bg-white hover:border-neutral-400'
                  }`}
                >
                  {v.label}
                </button>
              );
            })}
          </div>
        )}

        {/* ── Price Row & Discount Offer Tag ── */}
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span
              style={{ color: 'var(--color-text, #0F172A)' }}
              className="text-base sm:text-lg font-black tracking-tight"
            >
              ₹{displayPrice}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-neutral-400 line-through font-semibold">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {displayOfferPrice && (
            <div className="mt-1">
              <span className="inline-flex items-center gap-1 bg-[#FFF0F6] text-[#FF2E93] text-[10px] sm:text-[11px] font-black px-2 py-0.5 rounded-sm">
                <Tag className="w-3 h-3 stroke-[2.5]" />
                Get at ₹{displayOfferPrice}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Add to Cart CTA Button ── */}
      {config.addToCart.isVisible && (
        <div className="mt-4 pt-1">
          <button
            type="button"
            onClick={() => addToCart(product.id, 1)}
            style={{
              backgroundColor: 'var(--color-primary, #FF2E93)',
              color: 'var(--color-primary-contrast, #FFFFFF)'
            }}
            className="w-full py-2.5 rounded-lg text-xs sm:text-[13px] font-black tracking-wider uppercase hover:opacity-90 active:scale-[0.98] shadow-xs transition-all cursor-pointer"
          >
            {config.addToCart.btnText || 'ADD TO CART'}
          </button>
        </div>
      )}
    </div>
  );
}

/* ── 4. Main Product Listing Layout ── */
export default function Layout({
  products = [],
  config,
  loading = false,
  addToCart,
  addToWishlist,
  updateQuantity,
  isWishlisted,
  cartItems = {}
}: LayoutPropsTypes) {
  if (loading) {
    return (
      <div className="w-full py-24 flex justify-center text-sm font-medium text-[var(--color-text-muted,#64748B)]">
        Loading collection...
      </div>
    );
  }

  return (
    <section
      style={{ backgroundColor: 'var(--color-background, #FFFFFF)' }}
      className="w-full py-8 px-4 sm:px-6 lg:px-12 select-none"
    >
      <div className="max-w-[1380px] mx-auto">
        
        {/* ── Top Promo Header Banner ── */}
        <CategoryPromoBanner subtitle={config.subtitle} />

        {/* ── Section Title ── */}
        {config.title && (
          <div className="text-center mb-8 sm:mb-10">
            <h2
              style={{ color: 'var(--color-text, #0F172A)' }}
              className="text-2xl sm:text-3xl font-black tracking-tight"
            >
              {config.title}
            </h2>
          </div>
        )}

        {/* ── Responsive 4-Column Product Grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              config={config.card}
              index={idx}
              addToCart={addToCart}
              addToWishlist={addToWishlist}
              updateQuantity={updateQuantity}
              isWishlisted={isWishlisted}
              cartItems={cartItems}
            />
          ))}
        </div>
      </div>
    </section>
  );
}