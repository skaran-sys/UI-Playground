'use client';

import React, { useState } from 'react';
import {
  Star,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Minus,
  Plus,
  Truck,
  ShieldCheck,
  Droplets,
  Wind,
  Sparkles,
  Smile,
  Eye,
  Sun,
  Shield
} from 'lucide-react';

/* ── 1. Schema Types ── */
export interface ProductVariant {
  id: string;
  label: string;
}

export interface ProductSpec {
  key: string;
  label: string;
}

export interface Product {
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
  suitableFor?: string;
  promoBadge?: string;
  clinicalClaim?: {
    tag: string;
    text: string;
  };
  helps?: { label: string; icon?: string }[];
  targets?: string[];
  featureList?: { title: string; icon?: string }[];
  productBenefits?: string[];
  howToUse?: string[];
  heroIngredients?: string[];
  [key: string]: any;
}

export interface ProductDetailConfig {
  layout_id: string;
}

export interface ProductListingItem {
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

export interface Pagination {
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

export interface ReviewReply {
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
  customerImage?: string;
}

export interface ProductDetailProps {
  config: ProductDetailConfig;
  product: Product;
  loading: boolean;
  isWishlisted: boolean;
  addToWishlist?: () => void;
  onAddToCart: (qty: number, variant?: string) => void;
  onBuyNow: (qty: number, variant?: string) => void;
  loadSimilarProducts?: () => Promise<SimilarProducts>;
  loadReviews?: () => Promise<ProductReview[]>;
  onToggleWishlist?: () => Promise<ProductReview[]>;
  isFreeShipping?: boolean;
}

/* ── 2. Helper Icon Component for Benefit Badges ── */
function FeatureIcon({ type }: { type?: string }) {
  const iconProps = { className: "w-4 h-4 text-[#FF2E93] stroke-[2]" };
  switch (type) {
    case 'wind':
    case 'cooling':
      return <Wind {...iconProps} />;
    case 'droplet':
    case 'oil_control':
      return <Droplets {...iconProps} />;
    case 'smile':
    case 'soothing':
      return <Smile {...iconProps} />;
    case 'sun':
      return <Sun {...iconProps} />;
    case 'eye':
      return <Eye {...iconProps} />;
    case 'star':
    case 'sparkles':
      return <Sparkles {...iconProps} />;
    case 'shield':
      return <Shield {...iconProps} />;
    default:
      return <Sparkles {...iconProps} />;
  }
}

/* ── 3. Main PDP Component Layout ── */
export default function Layout({
  config,
  product,
  loading = false,
  onAddToCart,
  isFreeShipping = true
}: ProductDetailProps) {
  // Gallery Carousel State
  const productImages = product?.images?.length ? product.images : [
    "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=85&w=900"
  ];
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  // Variant & Quantity
  const [selectedVariant, setSelectedVariant] = useState<string>(
    product?.variant && product.variant.length > 0 ? product.variant[0].id : ''
  );
  const [qty, setQty] = useState<number>(1);

  // Pincode Checker State
  const [pincode, setPincode] = useState('');
  const [pincodeChecked, setPincodeChecked] = useState(false);

  // Accordion Expand/Collapse States
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    details: true,
    ingredients: false,
    benefits: true,
    howToUse: true,
    moreInfo: true
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const nextImage = () => {
    setCurrentImageIdx((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIdx((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));
  };

  const handleAddToCart = () => {
    onAddToCart(qty, selectedVariant || undefined);
  };

  if (loading || !product) {
    return (
      <div className="w-full py-24 flex justify-center text-sm font-medium text-neutral-400">
        Loading product details...
      </div>
    );
  }

  const selectedVariantLabel =
    product.variant?.find((v) => v.id === selectedVariant)?.label ||
    (product.variant?.[0]?.label ?? '60g');

  return (
    <div
      id={config?.layout_id}
      className="w-full bg-white text-neutral-900 pb-32 select-none"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        
        {/* ── Top PDP Main Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Visual Carousel with Floating Clinical Claim */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square sm:aspect-[4/4] rounded-2xl overflow-hidden bg-[#FFF3F6] border border-neutral-100 shadow-xs group">
              
              {/* Main Image */}
              <img
                src={productImages[currentImageIdx]}
                alt={product.title}
                className="w-full h-full object-cover object-center transition-transform duration-500"
              />

              {/* Previous / Next Arrow Controls */}
              {productImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-neutral-800 flex items-center justify-center shadow-md transition-transform active:scale-90 cursor-pointer z-10"
                    aria-label="Previous Image"
                  >
                    <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                  </button>
                  <button
                    type="button"
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-neutral-800 flex items-center justify-center shadow-md transition-transform active:scale-90 cursor-pointer z-10"
                    aria-label="Next Image"
                  >
                    <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                  </button>
                </>
              )}

              {/* Floating Clinical Proven Badge / Infographic */}
              <div className="absolute right-4 bottom-4 z-10 bg-white/95 backdrop-blur-xs rounded-xl p-3 shadow-md border border-pink-100 flex flex-col items-center text-center max-w-[150px]">
                <span className="text-[10px] font-black text-[#FF2E93] uppercase tracking-wider">
                  CLINICALLY <span className="italic font-serif font-normal">Proven</span>
                </span>
                <span className="text-[11px] font-bold text-neutral-900 mt-1 leading-tight">
                  Instantly Reduces Skin Temp by
                </span>
                <span className="text-xl font-black text-[#FF2E93] mt-0.5">
                  4°C
                </span>
              </div>
            </div>

            {/* Thumbnail Dots Strip */}
            {productImages.length > 1 && (
              <div className="flex justify-center gap-2 pt-1">
                {productImages.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentImageIdx(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      currentImageIdx === idx ? 'w-6 bg-[#FF2E93]' : 'w-2 bg-neutral-300'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Title, Ratings, Pricing, Variants & Purchase */}
          <div className="lg:col-span-6 flex flex-col space-y-4">
            
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight leading-snug">
              {product.title}
            </h1>

            {/* Skin Suitability */}
            <p className="text-xs sm:text-[13px] font-semibold text-neutral-700">
              Suitable for: <span className="text-neutral-900">{product.suitableFor || "Oily & Combination"}</span>
            </p>

            {/* Star Ratings */}
            <div className="flex items-center gap-2">
              <div className="flex items-center text-[#70B33F]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#70B33F] text-[#70B33F]" />
                ))}
              </div>
              <span className="text-xs font-semibold text-neutral-600">
                Loved by {product.reviewCount || "1542"}+ customers
              </span>
            </div>

            {/* Variant Selector Pill with "Best Value" Ribbon */}
            <div className="pt-2">
              <div className="relative inline-block">
                <span className="absolute -top-2.5 left-2 bg-[#FF2E93] text-white text-[9px] font-black px-1.5 py-0.2 rounded-xs uppercase tracking-tight shadow-2xs">
                  {product.badge || "Best Value"}
                </span>
                <button
                  type="button"
                  className="px-6 py-2 rounded-lg border-2 border-neutral-900 bg-white text-neutral-900 font-extrabold text-sm shadow-xs cursor-default"
                >
                  {selectedVariantLabel}
                </button>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="pt-1">
              <div className="flex items-baseline gap-2.5">
                <span className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                  ₹{product.price}
                </span>
                {product.mrp && (
                  <span className="text-sm sm:text-base line-through text-neutral-400 font-bold">
                    ₹{product.mrp}
                  </span>
                )}
                {product.discount && (
                  <span className="bg-[#FF2E93] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {product.discount}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-neutral-500 font-medium mt-0.5">
                MRP incl. of all taxes
              </p>

              {/* Flat Discount Badge */}
              <div className="mt-2">
                <span className="inline-block border border-dashed border-[#70B33F] bg-[#F4F9F0] text-[#70B33F] text-[11px] font-black px-3 py-1 rounded-md">
                  {product.promoBadge || "Flat 15% applied"}
                </span>
              </div>
            </div>

            {/* Helps & Targets Feature Matrix */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-5 space-y-3.5 shadow-2xs">
              
              {/* Helps Row */}
              <div className="flex items-start gap-4">
                <span className="text-xs font-bold text-neutral-900 min-w-[50px] pt-1">
                  Helps
                </span>
                <div className="flex flex-wrap gap-2 flex-1">
                  {(product.helps || [
                    { label: 'Instant Cooling', icon: 'cooling' },
                    { label: 'Skin Soothing', icon: 'soothing' },
                    { label: 'Oil Control', icon: 'oil_control' }
                  ]).map((h, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#FF2E93]/40 bg-white text-neutral-800 text-xs font-bold"
                    >
                      <FeatureIcon type={h.icon} />
                      <span>{h.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Targets Row */}
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-neutral-900 min-w-[50px]">
                  Targets
                </span>
                <div className="flex flex-wrap gap-2 flex-1">
                  {(product.targets || ['Excess Oil', 'Puffiness', 'Skin Irritation']).map(
                    (t, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-md bg-gradient-to-r from-[#FFA2BD] to-[#FF2E93] text-white text-xs font-bold shadow-2xs"
                      >
                        {t}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Primary ADD TO CART Action Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full py-4 rounded-xl bg-[#FF2E93] hover:bg-[#E01B7F] active:scale-[0.99] text-white text-sm sm:text-base font-black tracking-wider uppercase shadow-md transition-all cursor-pointer"
              >
                ADD TO CART
              </button>
            </div>

            {/* Pincode Delivery Checker */}
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-4 space-y-2">
              <span className="text-xs font-bold text-neutral-900 block">
                Check for delivery
              </span>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter your pincode"
                  className="flex-1 bg-white text-xs px-3.5 py-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:border-[#FF2E93]"
                />
                <button
                  type="button"
                  onClick={() => setPincodeChecked(Boolean(pincode.length >= 6))}
                  className="px-5 py-2.5 rounded-lg bg-white border border-[#FF2E93] text-[#FF2E93] font-bold text-xs hover:bg-[#FFF0F6] active:scale-95 transition-all cursor-pointer"
                >
                  Check
                </button>
              </div>
              {pincodeChecked && (
                <p className="text-[11px] font-bold text-emerald-600 mt-1">
                  ✓ Delivery available by Tomorrow, Free Shipping
                </p>
              )}
            </div>

          </div>
        </div>

        {/* ── Middle Accordions Sections (Product Details, Benefits, How To Use, Specs) ── */}
        <div className="mt-14 space-y-4 max-w-4xl mx-auto">
          
          {/* 1. Product Details Accordion */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-xs">
            <button
              type="button"
              onClick={() => toggleAccordion('details')}
              className="w-full flex items-center justify-between text-left cursor-pointer"
            >
              <h2 className="text-lg sm:text-xl font-black text-neutral-900 tracking-tight">
                Product Details
              </h2>
              <ChevronDown
                className={`w-5 h-5 text-neutral-500 transition-transform duration-300 ${
                  openAccordions.details ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openAccordions.details && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-6 pt-4 border-t border-neutral-100">
                {(
                  product.featureList || [
                    { title: "Instant Cooling", icon: "eye" },
                    { title: "Controls Excess Oil", icon: "wind" },
                    { title: "Reduces Puffiness", icon: "droplet" },
                    { title: "Soothes Irritation", icon: "smile" },
                    { title: "Refreshes Tired Skin", icon: "sun" },
                    { title: "Non-Greasy", icon: "sparkles" },
                    { title: "Boosts Radiance", icon: "star" },
                    { title: "Non-Comedogenic", icon: "shield" }
                  ]
                ).map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <FeatureIcon type={feat.icon} />
                    <span className="text-sm font-bold text-neutral-800">
                      {feat.title}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 2. Hero Ingredients Accordion */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-xs">
            <button
              type="button"
              onClick={() => toggleAccordion('ingredients')}
              className="w-full flex items-center justify-between text-left cursor-pointer"
            >
              <h2 className="text-lg sm:text-xl font-black text-neutral-900 tracking-tight">
                Hero Ingredients
              </h2>
              <ChevronDown
                className={`w-5 h-5 text-neutral-500 transition-transform duration-300 ${
                  openAccordions.ingredients ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openAccordions.ingredients && (
              <div className="mt-4 pt-4 border-t border-neutral-100 space-y-2 text-sm text-neutral-700 leading-relaxed">
                {(
                  product.heroIngredients || [
                    "Watermelon Extract: Rich in antioxidants to soothe and deeply hydrate.",
                    "Hyaluronic Acid: Locks in moisture for all-day plump and fresh skin.",
                    "Niacinamide: Controls sebum production and refines uneven skin texture."
                  ]
                ).map((ing, i) => (
                  <p key={i}>• {ing}</p>
                ))}
              </div>
            )}
          </div>

          {/* 3. Product Benefits Accordion */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-xs">
            <button
              type="button"
              onClick={() => toggleAccordion('benefits')}
              className="w-full flex items-center justify-between text-left cursor-pointer"
            >
              <h2 className="text-lg sm:text-xl font-black text-neutral-900 tracking-tight">
                Product Benefits
              </h2>
              <ChevronDown
                className={`w-5 h-5 text-neutral-500 transition-transform duration-300 ${
                  openAccordions.benefits ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openAccordions.benefits && (
              <div className="mt-4 pt-4 border-t border-neutral-100 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm">
                {(
                  product.productBenefits || [
                    "Instantly Cools Skin",
                    "Controls Excess Oil",
                    "Non-sticky Hydration",
                    "Refreshes Skin",
                    "Reduces Puffiness",
                    "Soothes Tired, Irritated Skin"
                  ]
                ).map((ben, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 flex-shrink-0" />
                    <span className="font-semibold text-neutral-800">{ben}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 4. How To Use Accordion */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-xs">
            <button
              type="button"
              onClick={() => toggleAccordion('howToUse')}
              className="w-full flex items-center justify-between text-left cursor-pointer"
            >
              <h2 className="text-lg sm:text-xl font-black text-neutral-900 tracking-tight">
                How To Use
              </h2>
              <ChevronDown
                className={`w-5 h-5 text-neutral-500 transition-transform duration-300 ${
                  openAccordions.howToUse ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openAccordions.howToUse && (
              <div className="mt-4 pt-4 border-t border-neutral-100 space-y-2 text-sm text-neutral-800">
                {(
                  product.howToUse || [
                    "Dot the moisturizer on clean face & neck",
                    "Massage gently in an upward motion",
                    "Use daily for AM & PM routine",
                    "Follow up with SPF during daytime"
                  ]
                ).map((step, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 flex-shrink-0" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 5. More Information Accordion (Specs) */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-xs">
            <button
              type="button"
              onClick={() => toggleAccordion('moreInfo')}
              className="w-full flex items-center justify-between text-left cursor-pointer"
            >
              <h2 className="text-lg sm:text-xl font-black text-neutral-900 tracking-tight">
                More Information
              </h2>
              <ChevronDown
                className={`w-5 h-5 text-neutral-500 transition-transform duration-300 ${
                  openAccordions.moreInfo ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openAccordions.moreInfo && (
              <div className="mt-4 pt-4 border-t border-neutral-100 space-y-2.5 text-xs sm:text-[13px] text-neutral-700">
                {product.specs?.map((spec, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                    <span className="font-bold text-neutral-900 min-w-[160px]">
                      {spec.key}:
                    </span>
                    <span className="text-neutral-700 leading-relaxed">{spec.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* ── Sticky Bottom Floating Bar with Free Shipping Indicator ── */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-neutral-200 shadow-2xl">
        
        {/* Top Floating Banner Strip */}
        <div className="w-full bg-[#FFF0F6] py-1.5 px-4 text-center border-b border-pink-100 flex items-center justify-center gap-2 text-[11px] font-bold text-neutral-800">
          <Truck className="w-3.5 h-3.5 text-[#FF2E93]" />
          <span>Free Shipping on order Rs.299 & above</span>
        </div>

        {/* Action Controls Bar */}
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
          
          {/* Left Mini Thumbnail + Title + Price */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg overflow-hidden bg-pink-50 border border-neutral-200 flex-shrink-0">
              <img
                src={productImages[0]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col min-w-0">
              <h3 className="text-xs font-bold text-neutral-900 truncate max-w-[180px] sm:max-w-[400px]">
                {product.title} ({selectedVariantLabel})
              </h3>
              <span className="text-sm font-black text-neutral-900">
                ₹{product.price}
              </span>
            </div>
          </div>

          {/* Right Quantity Controller & Big Pink CTA */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Stepper */}
            <div className="flex items-center border border-neutral-300 rounded-md bg-white">
              <button
                type="button"
                onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                className="px-2.5 py-1.5 text-neutral-600 hover:text-black transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>

              <span className="px-2 text-xs font-bold text-neutral-900 select-none min-w-[20px] text-center">
                {qty}
              </span>

              <button
                type="button"
                onClick={() => setQty((prev) => prev + 1)}
                className="px-2.5 py-1.5 text-neutral-600 hover:text-black transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>

            {/* Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="px-6 sm:px-10 py-2.5 rounded-md bg-[#FF2E93] hover:bg-[#E01B7F] active:scale-95 text-white text-xs sm:text-sm font-black uppercase tracking-wider shadow-sm transition-all cursor-pointer"
            >
              ADD TO CART
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}