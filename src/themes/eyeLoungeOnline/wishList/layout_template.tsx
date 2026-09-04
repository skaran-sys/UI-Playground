'use client';

import React from 'react';
import { Trash2 } from 'lucide-react';

/* ── 1. Schema Types ── */
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
  onAddToCart?: (id: string, qty: number) => void;
}

export interface LayoutProps extends Shared {
  products: Product[];
  config: ConfigType;
  loading: Boolean;
  addToCart: (id: string, qty: number) => void;
  updateQuantity: (id: string, qty: number) => void;
  cartItems: Record<string, number>;
}

/* ── 2. Product Card Component ── */
export function ProductCard({
  product,
  removeFromWishlist,
  onAddToCart
}: ProductCardPropsType) {
  return (
    <div className="group relative flex flex-col items-center select-none text-center">
      {/* Product Card Container */}
      <div
        style={{
          backgroundColor: 'transparent'
        }}
        className="relative w-full aspect-[4/5] sm:aspect-square flex items-center justify-center p-6 rounded-2xl transition-colors duration-300 group-hover:![background-color:var(--color-surface)]"
      >
        {/* Remove Trigger Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            removeFromWishlist(product.id);
          }}
          aria-label={`Remove ${product.title} from wishlist`}
          style={{
            color: 'var(--color-text-light)'
          }}
          className="absolute top-3 left-3 p-1.5 transition-colors hover:![color:var(--color-text)] z-20 cursor-pointer"
        >
          <Trash2 className="w-4 h-4 stroke-[1.4]" />
        </button>

        {/* Product Visual */}
        <a href={product.link} className="relative w-full h-full flex items-center justify-center">
          <img
            src={product.image}
            alt={product.alt || product.title}
            className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </a>

        {/* Quick Shop Action Pill */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.(product.id, 1);
            }}
            style={{
              backgroundColor: 'var(--color-surface-light)',
              color: 'var(--color-text)',
              borderColor: 'var(--color-border)'
            }}
            className="pointer-events-auto px-6 py-2  rounded-full border text-xs font-medium tracking-wide shadow-sm hover:![background-color:var(--color-primary)] hover:![color:var(--color-primary-contrast)] transition-all transform -translate-y-1 group-hover:translate-y-0 cursor-pointer"
          >
            Quick Shop
          </button>
        </div>

        {/* Variant / Size Badge */}
        {product.badge && (
          <span
            style={{ color: 'var(--color-text-muted)' }}
            className="absolute bottom-3 inset-x-0 mx-auto text-[11px] font-medium tracking-wider"
          >
            {product.badge}
          </span>
        )}
      </div>

      {/* Typography & Price Display */}
      <div className="mt-3 space-y-1 w-full px-2">
        <a href={product.link} className="block group-hover:underline">
          <h3
            style={{ color: 'var(--color-text)' }}
            className="text-xs sm:text-[13px] font-bold tracking-tight line-clamp-1"
          >
            {product.title}
          </h3>
        </a>

        <p
          style={{ color: 'var(--color-text-muted)' }}
          className="text-xs sm:text-[13px] font-normal"
        >
          {product.price}
        </p>
      </div>
    </div>
  );
}

/* ── 3. Main Wishlist Layout ── */
export default function Layout({
  products = [],
  config,
  loading,
  removeFromWishlist,
  addToCart
}: LayoutProps) {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-background)',
        color: 'var(--color-text)'
      }}
      className="w-full min-h-[60vh] select-none"
    >
      {/* Header Title Banner */}
      <header
        style={{
          backgroundColor: 'var(--color-secondary-light)',
          color: 'var(--color-secondary-contrast)'
        }}
        className="w-full py-12 sm:py-16 text-center flex items-center justify-center"
      >
        <h1 className="text-xl sm:text-2xl font-bold tracking-wider">
          {config?.title}
        </h1>
      </header>

      <main className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-10 sm:py-16">
        {/* Loading State */}
        {Boolean(loading) && (
          <div
            style={{ color: 'var(--color-text-light)' }}
            className="w-full py-24 flex items-center justify-center text-xs tracking-widest uppercase"
          >
            Loading wishlist...
          </div>
        )}

        {/* Empty State */}
        {!Boolean(loading) && products.length === 0 && (
          <div className="w-full py-24 text-center space-y-3">
            <p
              style={{ color: 'var(--color-text-muted)' }}
              className="text-sm font-light"
            >
              Your wishlist is currently empty.
            </p>
            <div>
              <a
                href="/collections/all"
                style={{
                  borderColor: 'var(--color-primary)',
                  color: 'var(--color-text)'
                }}
                className="inline-block px-8 py-2.5 rounded-full border text-xs font-medium uppercase tracking-wider hover:![background-color:var(--color-primary)] hover:![color:var(--color-primary-contrast)] transition-all"
              >
                Discover Collections
              </a>
            </div>
          </div>
        )}

        {/* Responsive 4-Column Product Grid */}
        {!Boolean(loading) && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                removeFromWishlist={removeFromWishlist}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}