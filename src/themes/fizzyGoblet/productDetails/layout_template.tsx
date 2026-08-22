"use client";

import React, { useState } from 'react';
import {
  Star,
  Heart,
  CreditCard,
  Truck,
  RotateCcw,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Ruler,
  X
} from 'lucide-react';

interface ProductVariant {
  id: string;
  label: string;
}

interface ProductSpec {
  key: string;
  label: string;
}

interface Product {
  id: string;
  title: string;
  brand: string;

  price: string;
  mrp: string;
  discount: string;

  images: string[];

  variant: ProductVariant[];

  description: string;

  specs: ProductSpec[];

  inStock?: boolean;
  taxInclusive?: boolean;
  sku?: string;
  supplierInfo?: string;
  returnRules?: string;
  badge?: string;
  highlights?: string[];
  sizeChart?: string;
  rating?: number;
  reviewCount?: number;
}

interface ProductDetailConfig {
  layout_id: string;
}

interface ProductListingItem {
  id: string;

  title: string;
  brand: string;

  price: string;
  originalPrice: string;
  discount: string;
  currency: string;

  image: string;

  category: string;

  rating: number;
  reviewCount: number;

  link: string;
  slug: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface SimilarProducts {
  items: ProductListingItem[];
  pagination: Pagination;
}

interface ReviewReply {
  id: string;
  content: string;
  createdAt: string;
}

export interface ProductReviewContent {
  id: string;
  content: string;
  replies: ReviewReply[];
  createdAt: string;
}

export interface ProductReview {
  _id: string;

  productId: string;
  orderId: string;

  productTitle: string;
  orderNumber: string;

  customerName: string;
  customerEmail: string;

  rating: number;

  createdAt: string;

  review: ProductReviewContent;
}

export interface ProductDetailProps {
  config: ProductDetailConfig;
  product: Product;
  loading: boolean;
  isWishlisted: boolean;
  addToWishlist?: () => void;
  onAddToCart: (qty: number, variant?: string) => void;
  onBuyNow: (qty: number, variant?: string) => void;
  loadSimilarProducts: () => Promise<SimilarProducts>;
  loadReviews: () => Promise<ProductReview[]>;
  onToggleWishlist: () => Promise<ProductReview[]>;
  isFreeShipping?: boolean;
}

export default function Layout(props: ProductDetailProps) {
  const {
    config,
    product,
    loading = false,
    onAddToCart,
    onBuyNow,
    isWishlisted = false,
    addToWishlist,
    onToggleWishlist,
    isFreeShipping = false
  } = props;

  const [selectedVariantId, setSelectedVariantId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [wishlistActive, setWishlistActive] = useState<boolean>(isWishlisted);
  const [showSpecsAccordion, setShowSpecsAccordion] = useState<boolean>(true);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState<boolean>(false);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  if (loading || !product) {
    return (
      <section
        id={config?.layout_id}
        style={{
          backgroundColor: 'var(--color-surface-light)',
          color: 'var(--color-text)'
        }}
        className="w-full py-10 min-h-screen select-none"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 animate-pulse">
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="aspect-[4/5] bg-[var(--color-surface-lighter)] rounded-xs" />
              ))}
            </div>
            <div className="lg:col-span-5 space-y-6">
              <div className="h-8 bg-[var(--color-surface-lighter)] rounded w-3/4" />
              <div className="h-4 bg-[var(--color-surface-lighter)] rounded w-1/2" />
              <div className="h-6 bg-[var(--color-surface-lighter)] rounded w-1/3" />
              <div className="h-12 bg-[var(--color-surface-lighter)] rounded w-full" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  const handleWishlistClick = async () => {
    setWishlistActive((prev) => !prev);
    if (addToWishlist) {
      addToWishlist();
    }
    if (onToggleWishlist) {
      await onToggleWishlist();
    }
  };

  const isOutOfStock = product.inStock === false;
  const hasVariants = product.variant && product.variant.length > 0;
  const isCtaDisabled = isOutOfStock || (hasVariants && !selectedVariantId);

  const handleAddToCartSubmit = () => {
    if (isCtaDisabled) return;
    onAddToCart(quantity, selectedVariantId || undefined);
  };

  const handleBuyNowSubmit = () => {
    if (isCtaDisabled) return;
    onBuyNow(quantity, selectedVariantId || undefined);
  };

  const ratingScore = typeof product.rating === 'number' ? Math.round(product.rating) : 0;
  const hasRating = typeof product.rating === 'number' && product.rating > 0;
  const hasReviews = typeof product.reviewCount === 'number';

  const productImages = product.images || [];

  const openGalleryModal = (index: number) => {
    setActiveImageIndex(index);
    setIsGalleryModalOpen(true);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id={config?.layout_id}
      style={{
        backgroundColor: 'var(--color-surface-light)',
        color: 'var(--color-text)'
      }}
      className="w-full py-6 sm:py-10 select-none relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── 1. Breadcrumb ── */}
        <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8 text-xs text-[var(--color-text-muted)]">
          <span>Home</span>
          <span className="mx-2 opacity-60">|</span>
          <span className="text-[var(--color-text)] font-medium">
            {product.title} {product.brand ? `: ${product.brand}` : ''}
          </span>
        </nav>

        {/* ── 2. PDP Main Grid: 4-Image Grid Left & Sticky Details Right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Quad Product Images */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 relative">
            {product.badge && (
              <span className="absolute top-3 left-3 z-10 bg-[#e08b8b] text-white text-[11px] font-medium px-2.5 py-1 rounded-xs">
                {product.badge}
              </span>
            )}
            {productImages.length > 0 ? (
              productImages.map((imgUrl, index) => (
                <div
                  key={index}
                  onClick={() => openGalleryModal(index)}
                  className="relative w-full aspect-[4/5] overflow-hidden rounded-xs bg-[var(--color-surface-lighter)] cursor-zoom-in"
                >
                  <img
                    src={imgUrl}
                    alt={`${product.title} - View ${index + 1}`}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
                    loading={index < 2 ? "eager" : "lazy"}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-2 w-full aspect-[4/5] bg-[var(--color-surface-lighter)] rounded-xs flex items-center justify-center text-[var(--color-text-muted)]">
                No images available
              </div>
            )}
          </div>

          {/* Right Column: Sticky Product Purchase Panel */}
          <div className="lg:col-span-5 lg:sticky lg:top-6 flex flex-col space-y-5 sm:space-y-6">
            
            {/* Title, Brand, & SKU Header */}
            <div>
              <h1
                style={{ color: 'var(--color-text)' }}
                className="text-base font-serif font-bold tracking-tight leading-snug"
              >
                {product.title}
              </h1>

              {product.brand && (
                <p
                  style={{ color: 'var(--color-text-muted)' }}
                  className="text-sm sm:text-base font-medium mt-0.5"
                >
                  {product.brand}
                </p>
              )}

              {product.sku && (
                <p className="text-[11px] text-[var(--color-text-light)] mt-0.5 tracking-wider">
                  SKU: {product.sku}
                </p>
              )}

              {/* Star Rating Badge */}
              {(hasRating || hasReviews) && (
                <div className="flex items-center gap-1.5 mt-2.5">
                  {hasRating && (
                    <div className="flex items-center text-amber-500">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${
                            s <= ratingScore ? 'fill-current text-amber-500' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                  {hasReviews && (
                    <span className="text-xs font-normal text-[var(--color-text-muted)]">
                      {hasRating ? '| ' : ''}{product.reviewCount} Reviews
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Price Row */}
            <div>
              <div className="flex items-baseline gap-2.5">
                <span className="text-xs text-[var(--color-text-muted)] font-medium">
                  MRP
                </span>
                <span
                  style={{ color: 'var(--color-text)' }}
                  className="text-xl sm:text-2xl font-bold tracking-tight"
                >
                  ₹ {product.price}
                </span>

                {product.mrp && (
                  <span className="text-xs sm:text-sm line-through text-[var(--color-text-light)]">
                    ₹ {product.mrp}
                  </span>
                )}

                {product.discount && (
                  <span
                    style={{ color: 'var(--color-primary)' }}
                    className="text-xs sm:text-sm font-semibold"
                  >
                    ({product.discount})
                  </span>
                )}
              </div>

              {typeof product.taxInclusive === 'boolean' && (
                <p className="text-[11px] text-[var(--color-text-muted)] mt-1">
                  {product.taxInclusive ? "Inclusive of all taxes" : "Taxes calculated at checkout"}
                </p>
              )}
            </div>

            {/* Product Highlights / Notes */}
            {product.highlights && product.highlights.length > 0 && (
              <div className="bg-[var(--color-text)] p-3 rounded-xs space-y-1.5 border border-[var(--color-border)]">
                {product.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-[var(--color-text-inverse)] leading-relaxed">
                    <span className="text-[var(--color-text-inverse)] font-bold">✦</span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Size / Variant Selector & Size Guide Trigger */}
            {hasVariants && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[var(--color-text)]">
                    Size
                  </span>

                  {product.sizeChart && (
                    <button
                      type="button"
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="flex items-center gap-1 text-[var(--color-text-muted)] hover:text-[var(--color-text)] underline cursor-pointer"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>Size guide</span>
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.variant.map((v) => {
                    const isSelected = selectedVariantId === v.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariantId(v.id)}
                        disabled={isOutOfStock}
                        style={{
                          backgroundColor: isSelected
                            ? 'var(--color-text)'
                            : 'transparent',
                          color: isSelected
                            ? 'var(--color-surface-light)'
                            : 'var(--color-text)',
                          borderColor: isSelected
                            ? 'var(--color-text)'
                            : 'var(--color-border)'
                        }}
                        className="w-11 h-11 border rounded-xs flex items-center justify-center text-xs font-semibold transition-colors cursor-pointer hover:border-[var(--color-text)] disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {v.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector Dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--color-text-muted)]">
                Quantity
              </label>
              <div className="relative w-28">
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  disabled={isOutOfStock}
                  className="w-full appearance-none border border-[var(--color-border)] bg-[var(--color-surface-lighter)] px-3 py-2 text-xs font-medium rounded-xs focus:outline-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((q) => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
              </div>
            </div>

            {/* CTA Buttons & Wishlist Toggle */}
            <div className="space-y-2.5 pt-1">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleAddToCartSubmit}
                  disabled={isCtaDisabled}
                  style={{
                    backgroundColor: isCtaDisabled
                      ? 'var(--color-primary-lighter)'
                      : 'var(--color-primary)',
                    color: 'var(--color-primary-contrast)'
                  }}
                  className="flex-1 py-3.5 text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-xs transition-opacity duration-200 hover:opacity-90 active:scale-[0.99] shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isOutOfStock
                    ? 'Out of Stock'
                    : isCtaDisabled
                    ? 'Select a Size'
                    : 'Add To Cart'}
                </button>

                <button
                  type="button"
                  onClick={handleWishlistClick}
                  aria-label="Toggle Wishlist"
                  className="px-3.5 border border-[var(--color-border)] rounded-xs flex items-center justify-center hover:bg-[var(--color-surface-lighter)] transition-colors cursor-pointer"
                >
                  <Heart
                    className="w-5 h-5 transition-colors"
                    fill={wishlistActive ? 'currentColor' : 'none'}
                    strokeWidth={1.8}
                  />
                </button>
              </div>

              <button
                type="button"
                onClick={handleBuyNowSubmit}
                disabled={isCtaDisabled}
                className="w-full py-3.5 border border-[var(--color-text)] bg-transparent text-[var(--color-text)] text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-xs hover:bg-[var(--color-text)] hover:text-[var(--color-surface-light)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Buy Now
              </button>
            </div>

            {/* Trust Badges Bar */}
            <div className="grid grid-cols-4 gap-2 pt-4 border-t border-[var(--color-border)] text-center">
              <div className="flex flex-col items-center gap-1.5">
                <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.6]" />
                <span className="text-[10px] sm:text-[11px] leading-tight text-[var(--color-text-muted)]">
                  Secure Transaction
                </span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <Truck className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.6]" />
                <span className="text-[10px] sm:text-[11px] leading-tight text-[var(--color-text-muted)]">
                  Easy Order Tracking
                </span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.6]" />
                <span className="text-[10px] sm:text-[11px] leading-tight text-[var(--color-text-muted)]">
                  Cash on Delivery
                </span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.6]" />
                <span className="text-[10px] sm:text-[11px] leading-tight text-[var(--color-text-muted)]">
                  Easy Exchanges
                </span>
              </div>
            </div>

            {/* Free Shipping Tag if Active */}
            {isFreeShipping && (
              <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-primary)]">
                <Truck className="w-4 h-4" />
                <span>Free shipping available on this order</span>
              </div>
            )}

            {/* Description & Product Specs Accordion */}
            <div className="border-t border-[var(--color-border)] pt-4 space-y-4">
              {product.description && (
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2">
                    Description
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {(Boolean(product.specs?.length) || product.supplierInfo || product.returnRules) && (
                <div className="border-t border-[var(--color-border)] pt-3">
                  <button
                    type="button"
                    onClick={() => setShowSpecsAccordion(!showSpecsAccordion)}
                    className="flex items-center justify-between w-full text-xs sm:text-sm font-semibold uppercase tracking-wider py-1 cursor-pointer"
                  >
                    <span>More Information</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        showSpecsAccordion ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {showSpecsAccordion && (
                    <div className="mt-3 space-y-2 text-xs text-[var(--color-text-muted)]">
                      {product.specs?.map((spec, i) => (
                        <div key={i} className="flex gap-2 leading-relaxed">
                          <span className="font-medium text-[var(--color-text)] min-w-[70px]">
                            {spec.key}:
                          </span>
                          <span>{spec.label}</span>
                        </div>
                      ))}

                      {product.supplierInfo && (
                        <div className="flex gap-2 leading-relaxed">
                          <span className="font-medium text-[var(--color-text)] min-w-[70px]">
                            Supplier:
                          </span>
                          <span>{product.supplierInfo}</span>
                        </div>
                      )}

                      {product.returnRules && (
                        <div className="flex gap-2 leading-relaxed">
                          <span className="font-medium text-[var(--color-text)] min-w-[70px]">
                            Returns:
                          </span>
                          <span>{product.returnRules}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* ── 3. Full-Screen Image Lightbox Modal ── */}
      {isGalleryModalOpen && productImages.length > 0 && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-white text-black select-none">
          {/* Close Button Top Right */}
          <button
            type="button"
            onClick={() => setIsGalleryModalOpen(false)}
            className="absolute top-5 right-5 z-20 p-2 text-black hover:opacity-60 transition-opacity cursor-pointer"
            aria-label="Close full-screen image view"
          >
            <X className="w-6 h-6 stroke-[1.8]" />
          </button>

          {/* Left Arrow */}
          {productImages.length > 1 && (
            <button
              type="button"
              onClick={handlePrevImage}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 p-2 text-black hover:opacity-60 transition-opacity cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8 stroke-[1.5]" />
            </button>
          )}

          {/* Center Main Image Viewport */}
          <div className="flex-1 w-full flex items-center justify-center p-4 sm:p-12 min-h-0">
            <img
              src={productImages[activeImageIndex]}
              alt={`${product.title} - Large view`}
              className="max-h-[72vh] max-w-[85vw] object-contain object-center"
            />
          </div>

          {/* Right Arrow */}
          {productImages.length > 1 && (
            <button
              type="button"
              onClick={handleNextImage}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 p-2 text-black hover:opacity-60 transition-opacity cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8 stroke-[1.5]" />
            </button>
          )}

          {/* Bottom Thumbnail Gallery Track */}
          <div className="w-full pb-6 px-4 flex items-center justify-center gap-3 overflow-x-auto">
            {productImages.map((thumb, idx) => {
              const isActive = activeImageIndex === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className="relative flex flex-col items-center p-1 focus:outline-none cursor-pointer"
                >
                  <div
                    className={`w-12 h-14 sm:w-14 sm:h-16 overflow-hidden rounded-xs border transition-colors ${
                      isActive ? 'border-black' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={thumb}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  {isActive && (
                    <span className="w-full h-[2px] bg-black mt-1" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── 4. Size Guide Slide-Over Right Drawer Overlay ── */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs transition-opacity duration-300">
          <div
            onClick={() => setIsSizeGuideOpen(false)}
            className="absolute inset-0 cursor-pointer"
            aria-label="Close background overlay"
          />

          <div className="relative w-full max-w-md h-full bg-[var(--color-surface-light)] text-[var(--color-text)] shadow-2xl flex flex-col z-10 overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-[var(--color-border)]">
              <div>
                <h2 className="text-lg font-serif font-bold tracking-tight">
                  Size Guide
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsSizeGuideOpen(false)}
                className="p-1 hover:opacity-70 transition-opacity cursor-pointer"
                aria-label="Close size guide"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-6">
              {product.sizeChart ? (
                <div className="border border-[var(--color-border)] p-2 rounded-xs bg-[var(--color-surface-lighter)]">
                  <img
                    src={product.sizeChart}
                    alt="Size Chart Reference"
                    className="w-full h-auto object-contain rounded-xs"
                  />
                </div>
              ) : (
                <p className="text-xs text-[var(--color-text-muted)]">
                  No size chart image available.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}