"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Heart,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Plus,
  X,
  Loader2
} from 'lucide-react';

export interface Product {
  id: string;
  title: string;
  slug?: string;
  image: string;
  hoverImages?: string[];
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

/* ---------------------------- PAGINATION TYPE ---------------------------- */

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/* ---------------------------- CONFIG TYPE ---------------------------- */

export interface LayoutConfig {
  title: string;
  subtitle?: string;
  card: ProductCardConfig;
  showFilters: boolean;
}

// -------------------------
// GENERIC FILTER VALUE
// -------------------------

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

// -------------------------
// FILTER (FULLY DYNAMIC KEY)
// -------------------------

export interface Filter {
  key: string;
  label: string;
  isMulti: boolean;
  value: FilterValueItem[];
  [key: string]: any;
}

// -------------------------
// SORT OPTION
// -------------------------

export interface SortOption {
  key: string;
  label: string;
}

// -------------------------
// ROOT RESPONSE
// -------------------------

export interface FiltersResponse {
  filters: Filter[];
  sortOptions: SortOption[];
}

/* ---------------------------- LAYOUT PROPS ---------------------------- */

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

export default function Layout(props: LayoutPropsTypes) {
  const {
    products = [],
    config,
    filters = [],
    sortOptions = [],
    addToCart,
    addToWishlist,
    updateQuantity,
    isWishlisted,
    cartItems,
    pagination,
    onPageChange,
    applyFilters,
    clearFilters,
    loading = false
  } = props;

  const [selectedSort, setSelectedSort] = useState<string>(
    sortOptions[0]?.key || "featured"
  );
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    product_type: false,
    price: true,
    size: false,
    color: false
  });

  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  // Dynamic price bounds derived from filter config
  const priceFilterConfig = useMemo(() => {
    const pFilter = filters.find((f) => f.key === "price");
    if (pFilter && pFilter.value && pFilter.value.length > 0) {
      const val = pFilter.value[0];
      if ("min" in val && "max" in val) {
        return { min: val.min, max: val.max };
      }
    }
    return { min: 0, max: 9990 };
  }, [filters]);

  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: priceFilterConfig.min,
    max: priceFilterConfig.max
  });

  const [isPriceFilterActive, setIsPriceFilterActive] = useState<boolean>(false);

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleCheckboxToggle = (filterKey: string, itemName: string) => {
    setSelectedFilters((prev) => {
      const currentList = prev[filterKey] || [];
      const updatedList = currentList.includes(itemName)
        ? currentList.filter((item) => item !== itemName)
        : [...currentList, itemName];

      const next = { ...prev, [filterKey]: updatedList };
      if (applyFilters) applyFilters();
      return next;
    });
  };

  const handleRemoveAppliedFilter = (filterKey: string, itemName: string) => {
    handleCheckboxToggle(filterKey, itemName);
  };

  const handleRemovePriceFilter = () => {
    setPriceRange({ min: priceFilterConfig.min, max: priceFilterConfig.max });
    setIsPriceFilterActive(false);
    if (applyFilters) applyFilters();
  };

  const handleClearAllFilters = () => {
    setSelectedFilters({});
    setPriceRange({ min: priceFilterConfig.min, max: priceFilterConfig.max });
    setIsPriceFilterActive(false);
    if (clearFilters) clearFilters();
  };

  const hasAppliedFilters =
    isPriceFilterActive ||
    Object.values(selectedFilters).some((arr) => arr && arr.length > 0);

  // Infinite Scroll Sentinel Observer
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sentinelRef.current || !pagination?.hasNextPage || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && pagination?.hasNextPage && !loading) {
          onPageChange(pagination.page + 1);
        }
      },
      { rootMargin: "300px" }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [pagination, loading, onPageChange]);

  const activeSortLabel =
    sortOptions.find((opt) => opt.key === selectedSort)?.label || "Featured";

  return (
    <section
      style={{
        backgroundColor: 'var(--color-surface-light)',
        color: 'var(--color-text)'
      }}
      className="w-full min-h-screen py-6 sm:py-10 select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── 1. Editorial Header ── */}
        <div className="text-center mb-8 sm:mb-12">
          {config?.title && (
            <h1
              style={{ color: 'var(--color-text)' }}
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight"
            >
              {config.title}
            </h1>
          )}
          {config?.subtitle && (
            <p
              style={{ color: 'var(--color-text-muted)' }}
              className="text-xs sm:text-sm mt-1"
            >
              {config.subtitle}
            </p>
          )}
        </div>

        {/* ── 2. Breadcrumbs & Top Sort Dropdown ── */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4 mb-8 text-xs text-[var(--color-text-muted)] relative">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5">
            <span className="hover:text-[var(--color-text)] cursor-pointer">Home</span>
            <span className="opacity-60">|</span>
            <span className="text-[var(--color-text)] font-medium">
              {config?.title || "New Arrivals"}
            </span>
            <span className="opacity-60">|</span>
            <span>{activeSortLabel}</span>
          </nav>

          {/* Sort Dropdown */}
          {sortOptions.length > 0 && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-1 font-medium text-[var(--color-text)] hover:opacity-80 transition-opacity cursor-pointer"
              >
                <span className="text-[var(--color-text-muted)] font-normal">Sort by:</span>
                <span className="underline">{activeSortLabel}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isSortOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isSortOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-[var(--color-surface-light)] border border-[var(--color-border)] shadow-xl rounded-xs z-30 py-1.5">
                  {sortOptions.map((option) => {
                    const isSelected = selectedSort === option.key;
                    return (
                      <button
                        key={option.key}
                        type="button"
                        onClick={() => {
                          setSelectedSort(option.key);
                          setIsSortOpen(false);
                          if (applyFilters) applyFilters();
                        }}
                        className={`w-full px-3.5 py-2 text-left text-xs flex items-center gap-2.5 transition-colors cursor-pointer text-[var(--color-text)] ${
                          isSelected
                            ? "bg-[var(--color-surface-lighter)] font-medium"
                            : "hover:bg-[var(--color-surface-lighter)]"
                        }`}
                      >
                        {/* Radio Selector Before Label */}
                        <span
                          className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center flex-shrink-0 ${
                            isSelected
                              ? "border-[var(--color-text)]"
                              : "border-[var(--color-border)]"
                          }`}
                        >
                          {isSelected && (
                            <span className="w-2 h-2 rounded-full bg-[var(--color-text)]" />
                          )}
                        </span>
                        <span className="truncate">{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── 3. Main Catalog Viewport ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar Filters */}
          {config?.showFilters && filters.length > 0 && (
            <aside className="lg:col-span-3 space-y-5">
              
              {/* Applied Filters Container */}
              {hasAppliedFilters && (
                <div className="border-b border-[var(--color-border)] pb-4 space-y-2.5">
                  <span className="text-xs font-semibold text-[var(--color-text)] tracking-wider">
                    Applied Filters
                  </span>

                  <div className="flex flex-wrap gap-1.5">
                    {/* Price Filter Tag */}
                    {isPriceFilterActive && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[var(--color-surface-lighter)] border border-[var(--color-border)] text-[11px] text-[var(--color-text)] rounded-xs">
                        <span>₹ {priceRange.min} - ₹ {priceRange.max}</span>
                        <button
                          type="button"
                          onClick={handleRemovePriceFilter}
                          aria-label="Remove price filter"
                          className="hover:opacity-60 cursor-pointer"
                        >
                          <X className="w-3 h-3 stroke-[2]" />
                        </button>
                      </span>
                    )}

                    {/* Checkbox Filter Tags */}
                    {Object.entries(selectedFilters).map(([fKey, items]) =>
                      items.map((item) => (
                        <span
                          key={`${fKey}-${item}`}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[var(--color-surface-lighter)] border border-[var(--color-border)] text-[11px] text-[var(--color-text)] rounded-xs"
                        >
                          <span>{item}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveAppliedFilter(fKey, item)}
                            aria-label={`Remove filter ${item}`}
                            className="hover:opacity-60 cursor-pointer"
                          >
                            <X className="w-3 h-3 stroke-[2]" />
                          </button>
                        </span>
                      ))
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleClearAllFilters}
                    className="text-xs underline text-[var(--color-text-muted)] hover:text-[var(--color-text)] cursor-pointer block pt-1"
                  >
                    Clear all
                  </button>
                </div>
              )}

              {/* Dynamic Faceted Filters */}
              {filters.map((filter) => {
                const isOpen = openSections[filter.key] ?? false;

                return (
                  <div
                    key={filter.key}
                    className="border-b border-[var(--color-border)] pb-5"
                  >
                    <button
                      type="button"
                      onClick={() => toggleSection(filter.key)}
                      className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider py-1 cursor-pointer text-[var(--color-text)]"
                    >
                      <span>{filter.label}</span>
                      {isOpen ? (
                        <X className="w-3.5 h-3.5 stroke-[1.8]" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 stroke-[1.8]" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="mt-3.5">
                        {/* Dynamic Price Range Filter */}
                        {filter.key === "price" ? (
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 flex items-center px-2.5 py-1.5 bg-[var(--color-surface-lighter)] border border-[var(--color-border)] rounded-xs text-xs">
                                <span className="text-[var(--color-text-muted)] mr-1">₹</span>
                                <input
                                  type="number"
                                  min={priceFilterConfig.min}
                                  max={priceRange.max}
                                  value={priceRange.min}
                                  onChange={(e) => {
                                    setPriceRange((p) => ({
                                      ...p,
                                      min: Number(e.target.value)
                                    }));
                                    setIsPriceFilterActive(true);
                                    if (applyFilters) applyFilters();
                                  }}
                                  className="w-full bg-transparent focus:outline-none text-[var(--color-text)] text-xs"
                                />
                              </div>

                              <span className="text-xs text-[var(--color-text-muted)]">-</span>

                              <div className="flex-1 flex items-center px-2.5 py-1.5 bg-[var(--color-surface-lighter)] border border-[var(--color-border)] rounded-xs text-xs">
                                <span className="text-[var(--color-text-muted)] mr-1">₹</span>
                                <input
                                  type="number"
                                  min={priceRange.min}
                                  max={priceFilterConfig.max}
                                  value={priceRange.max}
                                  onChange={(e) => {
                                    setPriceRange((p) => ({
                                      ...p,
                                      max: Number(e.target.value)
                                    }));
                                    setIsPriceFilterActive(true);
                                    if (applyFilters) applyFilters();
                                  }}
                                  className="w-full bg-transparent focus:outline-none text-[var(--color-text)] text-xs"
                                />
                              </div>
                            </div>

                            <input
                              type="range"
                              min={priceFilterConfig.min}
                              max={priceFilterConfig.max}
                              value={priceRange.max}
                              onChange={(e) => {
                                setPriceRange((p) => ({
                                  ...p,
                                  max: Number(e.target.value)
                                }));
                                setIsPriceFilterActive(true);
                                if (applyFilters) applyFilters();
                              }}
                              className="w-full accent-[var(--color-text)] cursor-pointer"
                            />
                          </div>
                        ) : filter.key === "color" ? (
                          /* Dynamic Color Swatch Grid */
                          <div className="grid grid-cols-2 gap-2">
                            {filter.value.map((item, idx) => {
                              if (!("name" in item)) return null;
                              const isChecked = (
                                selectedFilters[filter.key] || []
                              ).includes(item.name);

                              return (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() =>
                                    handleCheckboxToggle(filter.key, item.name)
                                  }
                                  className={`flex items-center gap-2 p-2 border rounded-xs text-xs text-left transition-colors cursor-pointer ${
                                    isChecked
                                      ? "border-[var(--color-text)] bg-[var(--color-surface-lighter)] font-medium"
                                      : "border-[var(--color-border)] hover:bg-[var(--color-surface-lighter)]"
                                  }`}
                                >
                                  <span
                                    style={{
                                      backgroundColor: item.hex || item.name.toLowerCase()
                                    }}
                                    className="w-3.5 h-3.5 rounded-full border border-black/20 flex-shrink-0"
                                  />
                                  <span className="truncate">{item.name}</span>
                                </button>
                              );
                            })}
                          </div>
                        ) : (
                          /* Checkbox List Filter */
                          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                            {filter.value.map((item, idx) => {
                              if (!("name" in item)) return null;
                              const isChecked = (
                                selectedFilters[filter.key] || []
                              ).includes(item.name);

                              return (
                                <label
                                  key={idx}
                                  className="flex items-center justify-between text-xs cursor-pointer group hover:text-[var(--color-primary)] transition-colors py-0.5"
                                >
                                  <div className="flex items-center gap-2.5">
                                    <input
                                      type="checkbox"
                                      checked={isChecked}
                                      onChange={() =>
                                        handleCheckboxToggle(filter.key, item.name)
                                      }
                                      className="w-3.5 h-3.5 rounded-xs accent-[var(--color-text)] cursor-pointer"
                                    />
                                    <span>{item.name}</span>
                                  </div>
                                  {typeof item.count === "number" && (
                                    <span className="text-[11px] text-[var(--color-text-muted)]">
                                      {item.count}
                                    </span>
                                  )}
                                </label>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </aside>
          )}

          {/* Right Product Grid */}
          <main
            className={`${
              config?.showFilters ? "lg:col-span-9" : "lg:col-span-12"
            }`}
          >
            {products.length === 0 && !loading ? (
              <div className="py-24 text-center">
                <p className="text-sm font-serif text-[var(--color-text-muted)]">
                  No products matched your selection.
                </p>
                <button
                  type="button"
                  onClick={handleClearAllFilters}
                  className="mt-3 text-xs underline uppercase tracking-wider text-[var(--color-text)] cursor-pointer hover:opacity-75"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {products.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    config={config.card}
                    index={index}
                    addToCart={addToCart}
                    addToWishlist={addToWishlist}
                    updateQuantity={updateQuantity}
                    isWishlisted={isWishlisted}
                    cartItems={cartItems}
                  />
                ))}
              </div>
            )}

            {/* Infinite Scroll Trigger Sentinel */}
            <div ref={sentinelRef} className="w-full py-8 flex justify-center items-center">
              {loading && (
                <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                  <Loader2 className="w-4 h-4 animate-spin text-[var(--color-text)]" />
                  <span>Loading more items...</span>
                </div>
              )}
            </div>
          </main>

        </div>

      </div>
    </section>
  );
}

/* ── Individual Product Card Sub-component ── */
export function ProductCard(props: ProductCardPropsType) {
  const {
    product,
    config,
    addToCart,
    addToWishlist,
    isWishlisted
  } = props;

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isLikedLocally, setIsLikedLocally] = useState<boolean>(
    isWishlisted(product.id)
  );

  useEffect(() => {
    setIsLikedLocally(isWishlisted(product.id));
  }, [product.id, isWishlisted]);

  const allImages = [
    product.image,
    ...(product.hoverImages || [])
  ].filter(Boolean);

  const hasMultipleImages =
    allImages.length > 1 && config.slideShow?.isVisible !== false;

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndex((prev) =>
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLikedLocally((prev) => !prev);
    addToWishlist(product.id);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id, 1);
  };

  const currentImageSrc = allImages[activeImageIndex] || product.image;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveImageIndex(0);
      }}
      className="group flex flex-col w-full relative focus:outline-none"
    >
      {/* ── 1. Image Viewport ── */}
      <div className="relative w-full aspect-[4/5] overflow-hidden rounded-xs bg-[var(--color-surface-lighter)]">
        <a href={product.link || `#`} className="block w-full h-full">
          {currentImageSrc && (
            <img
              src={currentImageSrc}
              alt={product.alt || product.title}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
          )}
        </a>

        {/* Badge Pill Top-Left */}
        {config.badge?.isVisible && product.badge && (
          <span
            style={{
              backgroundColor: config.badge.bgColor || "#e08b8b",
              color: "#ffffff"
            }}
            className="absolute top-2.5 left-2.5 z-10 text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded-xs"
          >
            {product.badge}
          </span>
        )}

        {/* Wishlist Heart Icon Top-Right (Instant Local Toggle & Event Dispatch) */}
        {config.wishlist?.isVisible && (
          <button
            type="button"
            onClick={handleWishlistToggle}
            aria-label={`Wishlist ${product.title}`}
            className="absolute top-2.5 right-2.5 z-10 p-1.5 text-[var(--color-text)] hover:scale-110 active:scale-95 transition-transform cursor-pointer"
          >
            <Heart
              className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-colors drop-shadow-xs"
              fill={isLikedLocally ? "#ef4444" : "none"}
              color={isLikedLocally ? "#ef4444" : (config.wishlist.color || "#ffffff")}
              strokeWidth={1.8}
            />
          </button>
        )}

        {/* Multi-Image Hover Chevrons */}
        {hasMultipleImages && isHovered && (
          <div className="absolute inset-x-1 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none z-10 px-1">
            <button
              type="button"
              onClick={handlePrevImage}
              className="p-1 rounded-full bg-white/80 hover:bg-white text-black shadow-xs pointer-events-auto transition-colors cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-3.5 h-3.5 stroke-[2]" />
            </button>

            <button
              type="button"
              onClick={handleNextImage}
              className="p-1 rounded-full bg-white/80 hover:bg-white text-black shadow-xs pointer-events-auto transition-colors cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-3.5 h-3.5 stroke-[2]" />
            </button>
          </div>
        )}
      </div>

      {/* ── 2. Product Meta & Pricing Block with Shopping Bag Icon Below Image ── */}
      <div className="pt-2.5 pb-1 flex items-start justify-between gap-2">
        <div className="flex flex-col text-left min-w-0 flex-1">
          <a href={product.link || `#`} className="block">
            <h2
              style={{ color: 'var(--color-text)' }}
              className="text-xs sm:text-sm font-normal tracking-tight truncate hover:underline"
            >
              {product.title}
            </h2>
          </a>

          {config.showSubTitle && product.brand && (
            <p
              style={{ color: 'var(--color-text-muted)' }}
              className="text-[11px] font-normal truncate mt-0.5"
            >
              {product.brand}
            </p>
          )}

          {config.showPrice && product.price && (
            <div className="flex items-baseline gap-2 mt-1">
              <span
                style={{ color: 'var(--color-text)' }}
                className="text-xs sm:text-sm font-semibold tracking-tight"
              >
                ₹ {product.price}
              </span>

              {product.originalPrice && (
                <span className="text-[11px] line-through text-[var(--color-text-light)]">
                  ₹ {product.originalPrice}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Shopping Bag Icon Below Image Aligned Right */}
        {config.addToCart?.isVisible && (
          <button
            type="button"
            onClick={handleQuickAdd}
            aria-label={`Add ${product.title} to bag`}
            className="p-1.5 text-[var(--color-text)] hover:opacity-70 transition-opacity cursor-pointer flex-shrink-0 mt-0.5"
          >
            <ShoppingBag className="w-4 h-4 stroke-[1.6]" />
          </button>
        )}
      </div>
    </div>
  );
}