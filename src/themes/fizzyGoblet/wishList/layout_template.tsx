"use client";

import React from 'react';
import { Trash2 } from 'lucide-react';

export interface ConfigType {
  layout_id: string;
  [key: string]: any;
}

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
}

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

export type CardPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export type ButtonStyle = "filled" | "bordered" | "text";

export type SlideType = "manual" | "auto";

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

interface Shared {
  removeFromWishlist: (productId: string) => void;
}

export interface ProductCardPropsType extends Shared {
  product: Product;
  addToCart?: (id: string, qty: number) => void;
  ctaLabel?: string;
}

export interface LayoutProps extends Shared {
  products: Product[];
  config: ConfigType;
  loading: Boolean;
  addToCart: (id: string, qty: number) => void;
  updateQuantity: (id: string, qty: number) => void;
  cartItems: Record<string, number>;
}

export default function Layout(props: LayoutProps) {
  const {
    products = [],
    config,
    loading = false,
    removeFromWishlist,
    addToCart
  } = props;

  const pageTitle = config?.title;
  const shareBtnText = config?.share_button_text;
  const clearAllText = config?.clear_all_text;
  const ctaLabel = config?.cta_label;

  const handleClearAll = () => {
    products.forEach((p) => removeFromWishlist(p.id));
  };

  const handleShareWishlist = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: pageTitle,
        url: window.location.href
      }).catch(() => { });
    }
  };

  return (
    <section
      id={config?.layout_id}
      style={{
        backgroundColor: 'var(--color-surface-light)',
        color: 'var(--color-text)'
      }}
      className="w-full min-h-screen py-8 sm:py-12 select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── 1. Wishlist Header & Actions ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-12">
          <h1
            style={{ color: 'var(--color-text)' }}
            className="text-2xl sm:text-3xl font-serif font-bold tracking-tight"
          >
            {pageTitle}
          </h1>

          {products.length > 0 && !loading && (
            <div className="flex items-center gap-3">
              {
                shareBtnText
                &&
                <button
                  type="button"
                  onClick={handleShareWishlist}
                  className="px-4 py-2 text-xs font-semibold tracking-wider text-white bg-[#1e4d40] hover:bg-[#163b31] transition-colors rounded-xs"
                >
                  {shareBtnText}
                </button>
              }

              {
                clearAllText
                &&
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="px-4 py-2 text-xs font-semibold tracking-wider text-white bg-[#222222] hover:bg-black transition-colors rounded-xs"
                >
                  {clearAllText}
                </button>
              }

            </div>
          )}
        </div>

        {/* ── 2. Loading State Skeletons ── */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="flex flex-col gap-3 animate-pulse">
                <div className="w-full aspect-[4/5] bg-[var(--color-surface-lighter)] rounded-xs" />
                <div className="h-4 bg-[var(--color-surface-lighter)] rounded w-3/4 mx-auto mt-2" />
                <div className="h-3 bg-[var(--color-surface-lighter)] rounded w-1/2 mx-auto" />
                <div className="h-3 bg-[var(--color-surface-lighter)] rounded w-1/4 mx-auto" />
                <div className="h-10 bg-[var(--color-surface-lighter)] rounded-xs w-full mt-2" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          /* ── Empty State ── */
          <div className="py-20 text-center flex flex-col items-center justify-center space-y-4">
            <p className="text-base sm:text-lg text-[var(--color-text-muted)] font-serif">
              Your wishlist is currently empty.
            </p>
            <a
              href="/"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-primary-contrast)'
              }}
              className="px-8 py-3 text-xs font-semibold tracking-widest uppercase transition-opacity hover:opacity-90 rounded-xs"
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          /* ── 3. Product Wishlist Grid ── */
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {products.map((product) => (
              <WishlistProductCard
                key={product.id}
                product={product}
                removeFromWishlist={removeFromWishlist}
                addToCart={addToCart}
                ctaLabel={ctaLabel}
              />
            ))}
          </div>
        )
        }
      </div>
    </section>
  );
}

/* ── Individual Wishlist Product Card Sub-component ── */
export function WishlistProductCard({
  product,
  removeFromWishlist,
  addToCart,
  ctaLabel = "Add To Bag"
}: ProductCardPropsType) {
  const productUrl = product.link || (product.slug ? `/products/${product.slug}` : '#');

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (addToCart) {
      addToCart(product.id, 1);
    }
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    removeFromWishlist(product.id);
  };

  return (
    <div className="group flex flex-col w-full relative">
      {/* ── Card Media Window ── */}
      <div className="relative w-full aspect-[4/5] overflow-hidden rounded-xs bg-[var(--color-surface-lighter)]">
        <a href={productUrl} className="block w-full h-full">
          {product.image && (
            <img
              src={product.image}
              alt={product.alt || product.title}
              className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
              loading="lazy"
            />
          )}
        </a>

        {/* Delete / Remove Action Trigger */}
        <button
          type="button"
          onClick={handleRemoveClick}
          aria-label={`Remove ${product.title} from wishlist`}
          style={{
            backgroundColor: 'rgba(30, 30, 30, 0.75)',
            color: '#ffffff'
          }}
          className="absolute top-2.5 right-2.5 z-10 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-xs transition-colors hover:bg-black active:scale-95"
        >
          <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.8]" />
        </button>
      </div>

      {/* ── Product Meta Details ── */}
      <div className="pt-3 pb-2 text-center flex flex-col items-center">
        {/* Title */}
        <a href={productUrl} className="block w-full">
          <h2
            style={{ color: 'var(--color-text)' }}
            className="text-xs sm:text-sm font-normal truncate"
          >
            {product.title}
          </h2>
        </a>

        {/* Variant / Badge Tag */}
        {product.badge && (
          <p
            style={{ color: 'var(--color-text-muted)' }}
            className="text-[11px] sm:text-xs font-normal truncate mt-0.5"
          >
            {product.badge}
          </p>
        )}

        {/* Pricing */}
        {product.price && (
          <div className="flex items-center justify-center gap-2 mt-1">
            <span
              style={{ color: 'var(--color-text)' }}
              className="text-xs sm:text-sm font-semibold tracking-tight"
            >
              ₹{product.price}
            </span>

            {product.originalPrice && (
              <span className="text-[11px] sm:text-xs line-through text-[var(--color-text-light)]">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
        )}
      </div>

      {/* ── Add To Bag Action Button ── */}
      <button
        type="button"
        onClick={handleAddToCartClick}
        className="w-full mt-1 py-2.5 sm:py-3 bg-[#333333] hover:bg-black text-white text-xs sm:text-sm font-medium tracking-wide uppercase transition-colors rounded-xs cursor-pointer shadow-xs active:scale-[0.99]"
      >
        {ctaLabel}
      </button>
    </div>
  );
}