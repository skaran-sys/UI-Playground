'use client';

import React, { useState, useRef, useEffect } from 'react';
import { SlidersHorizontal, ChevronDown, ChevronUp, Heart } from 'lucide-react';

/* ── 1. Schema Definitions ── */
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

export interface ProductFilterProps {
  filters?: Filter[];
  sortOptions?: SortOption[];
  totalResults?: number;
  applyFilters?: (payload: any) => void;
  clearFilters?: () => void;
}

/* ── 2. Product Card Component ── */
export function ProductCard({
  product,
  config,
  addToCart,
  addToWishlist,
  isWishlisted
}: ProductCardPropsType) {
  const wishlisted = isWishlisted(product.id);
  const showWishlist = config?.wishlist?.isVisible !== false;
  const showBadge = config?.badge?.isVisible !== false && Boolean(product.badge);
  const wishlistActiveColor = config?.wishlist?.color || '#E11D48';

  const getPositionClass = (pos?: CardPosition) => {
    switch (pos) {
      case 'top-right':
        return 'top-3 right-3';
      case 'bottom-left':
        return 'bottom-3 left-3';
      case 'bottom-right':
        return 'bottom-3 right-3';
      case 'top-left':
      default:
        return 'top-3 left-3';
    }
  };

  return (
    <div className="group relative flex flex-col items-center select-none text-center h-full">
      {/* ── Fixed Height Image Canvas ── */}
      <div
        style={{
          backgroundColor: 'transparent',
          borderRadius: `${config?.corner ?? 16}px`
        }}
        className="relative w-full h-[280px] sm:h-[320px] md:h-[350px] overflow-hidden flex items-center justify-center p-6 transition-colors duration-300 group-hover:![background-color:var(--color-surface)] flex-shrink-0"
      >
        {/* Wishlist Action */}
        {showWishlist && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToWishlist(product.id);
            }}
            aria-label={`Toggle wishlist for ${product.title}`}
            className={`absolute ${getPositionClass(config?.wishlist?.position)} p-1.5 transition-transform active:scale-90 z-20 cursor-pointer`}
          >
            <Heart
              style={{
                fill: wishlisted ? wishlistActiveColor : 'transparent',
                color: wishlisted ? wishlistActiveColor : 'var(--color-text-light)'
              }}
              className="w-4 h-4 stroke-[1.5] transition-colors"
            />
          </button>
        )}

        {/* Product Visual */}
        <a
          href={product.link}
          className="relative w-full h-full flex items-center justify-center overflow-hidden"
        >
          <img
            src={product.image}
            alt={product.alt || product.title}
            className="max-h-full max-w-full w-auto h-auto object-contain transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </a>

        {/* Quick Shop Action Pill */}
        {config?.addToCart?.isVisible !== false && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product.id, 1);
              }}
              style={{
                backgroundColor: 'var(--color-surface-light)',
                color: 'var(--color-text)',
                borderColor: 'var(--color-border)'
              }}
              className="pointer-events-auto px-6 py-2 rounded-full border text-xs font-medium tracking-wide shadow-sm hover:![background-color:var(--color-primary)] hover:![color:var(--color-primary-contrast)] transition-all transform -translate-y-1 group-hover:translate-y-0 cursor-pointer"
            >
              {config?.addToCart?.btnText || "Quick Shop"}
            </button>
          </div>
        )}

        {/* Badge Indicator */}
        {showBadge && (
          <span
            style={{
              color: 'var(--color-text-muted)',
              backgroundColor: config?.badge?.bgColor || 'transparent'
            }}
            className="absolute bottom-3 inset-x-0 mx-auto text-[11px] font-medium tracking-wider"
          >
            {product.badge}
          </span>
        )}
      </div>

      {/* ── Brand, Title & Price (Auto Adjusting Content) ── */}
      <div className="mt-3.5 space-y-1 w-full px-2 flex flex-col flex-1 justify-start">
        {product.brand && (
          <h4
            style={{ color: 'var(--color-text)' }}
            className="text-xs font-bold tracking-tight uppercase"
          >
            {product.brand}
          </h4>
        )}

        {config?.showSubTitle !== false && (
          <a href={product.link} className="block group-hover:underline">
            <h3
              style={{ color: 'var(--color-text)' }}
              className="text-xs font-normal tracking-tight line-clamp-1"
            >
              {product.title}
            </h3>
          </a>
        )}

        {config?.showPrice !== false && (
          <p
            style={{ color: 'var(--color-text-muted)' }}
            className="text-xs font-normal mt-auto"
          >
            {product.price}
          </p>
        )}
      </div>
    </div>
  );
}

/* ── 3. Main Product Listing Layout ── */
export default function Layout(props: LayoutPropsTypes) {
  const {
    products = [],
    config,
    pagination,
    onPageChange,
    filters = [],
    sortOptions = [],
    applyFilters,
    clearFilters,
    loading,
    addToCart,
    addToWishlist,
    updateQuantity,
    isWishlisted,
    cartItems
  } = props;

  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState<string>(
    sortOptions[0]?.label || "Alphabetically, A-Z"
  );

  const availabilityFilter = filters.find((f) => f.key === 'availability');
  const priceFilter = filters.find((f) => f.key === 'price');
  const priceItem = priceFilter?.value?.[0] as { min: number; max: number } | undefined;

  const minPrice = priceItem?.min ?? 0;
  const maxPrice = priceItem?.max ?? 100000;

  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(maxPrice);

  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResetFilters = () => {
    setSelectedAvailability([]);
    setPriceRange(maxPrice);
    clearFilters();
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--color-background)',
        color: 'var(--color-text)'
      }}
      className="w-full min-h-screen select-none"
    >
      {/* Title Banner */}
      <header className="w-full pt-14 pb-10 text-center">
        <h1
          style={{ color: 'var(--color-text)' }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-[0.25em] uppercase"
        >
          {config?.title || "EYEGLASSES"}
        </h1>
        {config?.subtitle && (
          <p
            style={{ color: 'var(--color-text-muted)' }}
            className="text-xs sm:text-sm mt-2 font-normal"
          >
            {config.subtitle}
          </p>
        )}
      </header>

      <main className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pb-20">
        
        {/* ── Toolbar: Filter Button & Sort Dropdown ── */}
        <div className="flex items-center justify-between gap-4 py-4 mb-6">
          {/* Filter Toggle Button */}
          {config?.showFilters !== false ? (
            <button
              type="button"
              onClick={() => setFilterPanelOpen(!filterPanelOpen)}
              style={{ color: 'var(--color-text)' }}
              className="flex items-center gap-1.5 text-xs font-normal tracking-wide hover:opacity-70 cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 stroke-[1.8]" />
              <span>Filter</span>
            </button>
          ) : <div />}

          {/* Sort Dropdown */}
          {sortOptions.length > 0 && (
            <div ref={sortRef} className="relative">
              <button
                type="button"
                onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                style={{
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text)',
                  backgroundColor: 'var(--color-surface-light)'
                }}
                className="flex items-center justify-between gap-3 px-4 py-2 rounded-full border text-xs tracking-tight cursor-pointer min-w-[180px]"
              >
                <span>{selectedSort}</span>
                {sortDropdownOpen ? (
                  <ChevronUp className="w-3.5 h-3.5 stroke-[1.6]" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 stroke-[1.6]" />
                )}
              </button>

              {sortDropdownOpen && (
                <div
                  style={{
                    backgroundColor: 'var(--color-surface-light)',
                    borderColor: 'var(--color-border)'
                  }}
                  className="absolute right-0 top-full mt-2 w-56 rounded-lg border shadow-xl py-1.5 z-30 max-h-60 overflow-y-auto"
                >
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => {
                        setSelectedSort(opt.label);
                        setSortDropdownOpen(false);
                        applyFilters();
                      }}
                      style={{
                        backgroundColor:
                          selectedSort === opt.label
                            ? 'var(--color-surface)'
                            : 'transparent',
                        color: 'var(--color-text)'
                      }}
                      className="w-full text-left px-4 py-2 text-xs hover:![background-color:var(--color-surface)] transition-colors cursor-pointer"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Expandable Filter Container ── */}
        {config?.showFilters !== false && filterPanelOpen && (
          <div
            style={{
              borderColor: 'var(--color-border)',
              backgroundColor: 'var(--color-surface-light)'
            }}
            className="border rounded-xl p-6 mb-12 grid grid-cols-1 md:grid-cols-2 gap-8 shadow-xs"
          >
            {/* Availability Checkboxes */}
            {availabilityFilter && (
              <div>
                <h3
                  style={{
                    borderColor: 'var(--color-text)',
                    color: 'var(--color-text)'
                  }}
                  className="text-xs font-bold uppercase tracking-wider pb-1.5 mb-4 border-b inline-block"
                >
                  Availability
                </h3>
                <div className="space-y-2.5">
                  {(availabilityFilter.value as any[]).map((val, idx) => {
                    const isChecked = selectedAvailability.includes(val.name);

                    return (
                      <label key={idx} className="flex items-center gap-2.5 cursor-pointer text-xs">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedAvailability([...selectedAvailability, val.name]);
                            } else {
                              setSelectedAvailability(
                                selectedAvailability.filter((n) => n !== val.name)
                              );
                            }
                          }}
                          style={{
                            borderColor: 'var(--color-border)',
                            accentColor: 'var(--color-primary)'
                          }}
                          className="w-3.5 h-3.5 rounded cursor-pointer"
                        />
                        <span style={{ color: 'var(--color-text)' }}>
                          {val.name}({val.count})
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Price Range Slider & Filter Actions */}
            {priceFilter && (
              <div>
                <h3
                  style={{
                    borderColor: 'var(--color-text)',
                    color: 'var(--color-text)'
                  }}
                  className="text-xs font-bold uppercase tracking-wider pb-1.5 mb-4 border-b inline-block"
                >
                  Price
                </h3>

                <div className="space-y-4 max-w-sm">
                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    style={{ accentColor: 'var(--color-primary)' }}
                    className="w-full cursor-pointer"
                  />

                  <p
                    style={{ color: 'var(--color-text-muted)' }}
                    className="text-xs font-medium"
                  >
                    Price:{' '}
                    <strong style={{ color: 'var(--color-text)' }}>
                      MRP. ₹{minPrice.toLocaleString('en-IN')}/-
                    </strong>{' '}
                    —{' '}
                    <strong style={{ color: 'var(--color-text)' }}>
                      MRP. ₹{priceRange.toLocaleString('en-IN')}/-
                    </strong>
                  </p>

                  <div className="flex items-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={applyFilters}
                      style={{
                        borderColor: 'var(--color-text)',
                        color: 'var(--color-primary-contrast)',
                        backgroundColor: 'var(--color-primary)'
                      }}
                      className="px-6 py-1.5 rounded-full border text-[11px] font-bold uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer"
                    >
                      FILTER
                    </button>

                    <button
                      type="button"
                      onClick={handleResetFilters}
                      style={{ color: 'var(--color-text-muted)' }}
                      className="text-[11px] font-medium underline hover:text-[var(--color-text)] transition-colors cursor-pointer"
                    >
                      Clear All
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Loading State ── */}
        {loading && (
          <div
            style={{ color: 'var(--color-text-light)' }}
            className="w-full py-24 flex items-center justify-center text-xs tracking-widest uppercase"
          >
            Loading collection...
          </div>
        )}

        {/* ── Product Grid ── */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12 transition-all duration-300 items-stretch">
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
        )}

        {/* ── Bottom Pagination ── */}
        {pagination && pagination.totalPages > 1 && (
          <div
            style={{ borderColor: 'var(--color-border)' }}
            className="mt-20 pt-8 border-t flex items-center justify-center gap-4 text-xs font-normal"
          >
            {Array.from({ length: Math.min(3, pagination.totalPages) }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => onPageChange(page)}
                  style={{
                    color:
                      pagination.page === page
                        ? 'var(--color-primary)'
                        : 'var(--color-text-muted)',
                    fontWeight: pagination.page === page ? 'bold' : 'normal'
                  }}
                  className="p-1 cursor-pointer hover:opacity-70"
                >
                  {page}
                </button>
              )
            )}

            {pagination.totalPages > 4 && (
              <span style={{ color: 'var(--color-text-light)' }}>..</span>
            )}

            {pagination.totalPages > 3 && (
              <button
                type="button"
                onClick={() => onPageChange(pagination.totalPages)}
                style={{
                  color:
                    pagination.page === pagination.totalPages
                      ? 'var(--color-primary)'
                      : 'var(--color-text-muted)',
                  fontWeight: pagination.page === pagination.totalPages ? 'bold' : 'normal'
                }}
                className="p-1 cursor-pointer hover:opacity-70"
              >
                {pagination.totalPages}
              </button>
            )}

            {pagination.hasNextPage && (
              <button
                type="button"
                onClick={() => onPageChange(pagination.page + 1)}
                style={{ color: 'var(--color-text)' }}
                className="p-1 cursor-pointer hover:opacity-70 ml-2"
              >
                Next
              </button>
            )}
          </div>
        )}

      </main>
    </div>
  );
}