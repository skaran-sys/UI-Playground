'use client';

import React from 'react';
import { X, Minus, Plus, Check, Gift, Truck } from 'lucide-react';

/* ── 1. Schema Types ── */
export interface CartItem {
  productId: string;
  image: string;
  name: string;
  quantity: number;
  price: number;
  discountedPrice?: number;
  variant?: {
    id?: string;
    name?: string;
    value?: string;
  }[];
  sku?: string;
  isFreebie?: boolean;
  discountLabel?: string;
  [key: string]: any;
}

export interface PriceSummary {
  tax: number;
  total: number;
  subTotal: number;
  discount: number;
  shipping?: number;
  savings?: number;
  [key: string]: any;
}

export interface CartDiscountConfig {
  enabled?: boolean;
  label?: string;
  showDiscount?: boolean;
  [key: string]: any;
}

export interface CartConfig {
  heading?: string;
  checkout_text?: string;
  item_layout?: string;
  discount?: CartDiscountConfig;
  [key: string]: any;
}

export interface CartLayoutProps {
  cart: CartItem[];
  priceSummary: PriceSummary;
  config: CartConfig;
  onItemRemove: (productId: string) => void;
  onQtyUpdate: (productId: string, quantity: number) => void;
  onClose: () => void;
  onCheckout: () => void;
  isSidebar?: boolean;
}

/* ── 2. Payment Partner Badges ── */
function PaymentLogos() {
  return (
    <div className="bg-white px-2 py-1 rounded-full flex items-center gap-1.5 shadow-xs flex-shrink-0">
      {/* GPay */}
      <span className="text-[10px] font-black text-neutral-800 tracking-tight">G Pay</span>
      {/* Visa */}
      <span className="text-[10px] font-black italic text-[#1A1F71] tracking-tighter">VISA</span>
      {/* Paytm */}
      <span className="text-[9px] font-extrabold text-[#00BAF2]">paytm</span>
      {/* COD */}
      <div className="bg-neutral-800 text-white rounded px-1 py-0.5 text-[7px] font-bold uppercase tracking-wider">
        COD
      </div>
    </div>
  );
}

/* ── 3. Main Cart Component ── */
export default function Layout({
  cart = [],
  priceSummary,
  config,
  onItemRemove,
  onQtyUpdate,
  onClose,
  onCheckout,
  isSidebar = true
}: CartLayoutProps) {
  // Separate Paid Items vs Freebie Gifts
  const paidItems = cart.filter(
    (item) => !item.isFreebie && !item.sku?.includes('FREE') && !item.name.includes('FREE')
  );
  const freebieItems = cart.filter(
    (item) => item.isFreebie || item.sku?.includes('FREE') || item.name.includes('FREE')
  );

  const totalPaidCount = paidItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const totalSavings = priceSummary?.savings ?? priceSummary?.discount ?? 436;

  const handleDecreaseQty = (item: CartItem) => {
    if (item.quantity <= 1) {
      onItemRemove(item.productId);
    } else {
      onQtyUpdate(item.productId, item.quantity - 1);
    }
  };

  const handleIncreaseQty = (item: CartItem) => {
    onQtyUpdate(item.productId, item.quantity + 1);
  };

  const cartContent = (
    <div className="flex flex-col h-full w-full bg-white select-none relative font-sans">
      
      {/* ── 1. Top Header ── */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 py-4.5 border-b border-neutral-100">
        <h2 className="text-xl font-bold text-neutral-900 tracking-tight flex items-center gap-1.5">
          {config?.heading || 'Your Cart'}
          <span className="text-[#FF2E93] font-bold">({totalPaidCount})</span>
        </h2>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close cart"
          className="p-1 text-neutral-700 hover:text-black transition-colors cursor-pointer"
        >
          <X className="w-6 h-6 stroke-[2]" />
        </button>
      </div>

      {/* ── 2. Scrollable Body Content ── */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-none">
        
        {/* Tier Reward Milestone Box */}
        <div className="rounded-2xl border border-[#FF6EA7] bg-[#FFF5F9] p-4 text-center">
          <p className="text-xs sm:text-[13px] font-bold text-[#FF2E93] tracking-wide mb-4">
            YAY! You got 2 Free gifts + FLAT 20% OFF!
          </p>

          {/* Stepper Line */}
          <div className="relative flex items-center justify-between px-4 sm:px-6">
            <div className="absolute left-6 right-6 top-[11px] h-[3px] bg-[#FF2E93] -z-0" />

            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-[#FF2E93] text-white flex items-center justify-center border-2 border-white shadow-xs">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold text-neutral-800 mt-2 text-center leading-tight">
                FLAT 15% OFF
              </span>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-[#FF2E93] text-white flex items-center justify-center border-2 border-white shadow-xs">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold text-neutral-800 mt-2 text-center leading-tight">
                Free Gift
              </span>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-[#FF2E93] text-white flex items-center justify-center border-2 border-white shadow-xs">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold text-neutral-800 mt-2 text-center leading-tight max-w-[80px]">
                FLAT 20% OFF<br />+ 2 Gifts
              </span>
            </div>
          </div>
        </div>

        {/* Paid Cart Items List */}
        {paidItems.map((item) => {
          const hasDiscount =
            typeof item.discountedPrice === 'number' && item.discountedPrice < item.price;
          const finalPrice = (hasDiscount ? item.discountedPrice : item.price) ?? item.price ?? 0;

          return (
            <div
              key={item.productId}
              className="p-3.5 rounded-2xl border border-neutral-200 bg-white flex gap-3.5 items-center shadow-2xs"
            >
              {/* Product Image */}
              <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Item Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-xs sm:text-[13px] font-bold text-neutral-900 leading-snug line-clamp-2">
                  {item.name}
                </h3>

                {/* Variant */}
                {item.variant && item.variant.length > 0 && (
                  <p className="text-[11px] text-neutral-700 font-medium mt-0.5">
                    {item.variant[0].name ? `${item.variant[0].name}: ` : ''}
                    {item.variant[0].value}
                  </p>
                )}

                {/* Price Row & Discount Badge */}
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      {hasDiscount && (
                        <span className="text-xs text-neutral-500 line-through font-bold">
                          {item.price.toLocaleString()}
                        </span>
                      )}
                      <span className="text-sm sm:text-base font-black text-neutral-900 tracking-tight">
                        {finalPrice.toLocaleString()}
                      </span>
                    </div>

                    {(item.discountLabel || config?.discount?.label) && (
                      <span className="text-[10px] font-bold text-[#FF6D00] block mt-0.5">
                        {item.discountLabel || config?.discount?.label}
                      </span>
                    )}
                  </div>

                  {/* Stepper Quantity Controller */}
                  <div className="flex items-center border border-neutral-300 rounded-md bg-white">
                    <button
                      type="button"
                      onClick={() => handleDecreaseQty(item)}
                      className="px-2 py-1 text-neutral-600 hover:text-black transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>

                    <span className="px-2 text-xs font-bold text-neutral-900 select-none min-w-[18px] text-center">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleIncreaseQty(item)}
                      className="px-2 py-1 text-neutral-600 hover:text-black transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Freebies Gift Box Container */}
        {freebieItems.length > 0 && (
          <div className="rounded-2xl bg-[#FFF3F8] border border-[#FFE0ED] p-4 space-y-3.5">
            {/* Box Header */}
            <div className="flex items-center gap-2 text-[#FF2E93] font-bold text-xs sm:text-sm">
              <Gift className="w-4 h-4 stroke-[2.5]" />
              <span>Here&apos;s your freebies</span>
            </div>

            {/* Freebie List */}
            <div className="space-y-3">
              {freebieItems.map((freebie) => (
                <div key={freebie.productId} className="flex items-center gap-3">
                  {/* Freebie Thumbnail with Badge */}
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-white flex-shrink-0 border border-pink-100">
                    <span className="absolute top-0 left-0 bg-[#7CB342] text-white text-[9px] font-black px-1.5 py-0.5 rounded-br-md leading-none z-10">
                      Free
                    </span>
                    <img
                      src={freebie.image}
                      alt={freebie.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Freebie Title & Discounted 1 Price */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-neutral-900 truncate">
                      {freebie.name}
                    </h4>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[11px] text-neutral-400 line-through font-bold">
                        {freebie.price}
                      </span>
                      <span className="text-xs font-black text-[#FF2E93]">
                        {freebie.discountedPrice ?? 1}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── 3. Sticky Checkout Footer ── */}
      <div className="flex-shrink-0 bg-white border-t border-neutral-100 relative">
        
        {/* Floating Savings Pill Tag */}
        {totalSavings > 0 && (
          <div className="absolute -top-4 inset-x-0 flex justify-center z-10">
            <div className="bg-[#FFF0F6] border-2 border-[#FF2E93] text-[#FF2E93] text-xs font-black px-5 py-1 rounded-md shadow-xs uppercase tracking-tight">
              -You saved {totalSavings}
            </div>
          </div>
        )}

        <div className="px-5 pt-6 pb-4 space-y-3.5">
          {/* Total & Free Shipping Row */}
          <div className="flex items-center justify-between">
            <div className="text-lg sm:text-xl font-extrabold text-neutral-900 tracking-tight">
              Total: {priceSummary?.total ?? 960}
            </div>

            <div className="flex items-center gap-1.5 text-[#7CB342] font-bold text-xs sm:text-sm">
              <Truck className="w-4 h-4 stroke-[2.5]" />
              <span>Free Shipping</span>
            </div>
          </div>

          {/* Primary Action Button (Green Background with Payment Logos) */}
          <button
            type="button"
            onClick={onCheckout}
            className="w-full bg-[#84B01E] hover:bg-[#769F1B] active:scale-[0.99] text-white p-3.5 rounded-xl flex items-center justify-between shadow-md transition-all cursor-pointer"
          >
            <div className="flex flex-col text-left">
              <span className="text-sm sm:text-base font-black tracking-wide leading-tight">
                {config?.checkout_text || 'Checkout Now →'}
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-white/90 mt-0.5">
                Extra 5% off on Prepaid Order
              </span>
            </div>

            <PaymentLogos />
          </button>

          {/* Bottom Security Guarantee */}
          <p className="text-center text-[11px] font-bold text-[#FF2E93] tracking-wide">
            100% Secure Payment | COD Available.
          </p>
        </div>
      </div>
    </div>
  );

  /* Sidebar Drawer Window Mode */
  if (isSidebar) {
    return (
      <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs transition-opacity duration-300">
        <div
          onClick={onClose}
          className="absolute inset-0 cursor-pointer"
          aria-label="Close background overlay"
        />
        <div className="relative w-full max-w-[430px] h-full shadow-2xl flex flex-col z-10 bg-white animate-in slide-in-from-right duration-300">
          {cartContent}
        </div>
      </div>
    );
  }

  /* Inline Page Mode */
  return <div className="w-full max-w-md mx-auto h-full flex flex-col">{cartContent}</div>;
}