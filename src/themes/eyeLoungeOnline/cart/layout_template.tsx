'use client';

import React, { useState } from 'react';
import { X, Trash2, Plus, Edit3, ChevronRight } from 'lucide-react';

/* ── 1. Strict Schema Definitions ── */
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
  [key: string]: any;
}

export interface PriceSummary {
  tax: number;
  total: number;
  subTotal: number;
  discount: number;
  shipping?: number;
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

/* ── 2. Standalone Slide-Over Cart Drawer ── */
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
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  if (!isSidebar) return null;

  const headingText = config?.heading || "SHOPPING CART";
  const checkoutText = config?.checkout_text || "VIEW CART";
  const subtotalValue = priceSummary?.subTotal ?? priceSummary?.total ?? 0;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* ── Backdrop ── */}
      <div
        onClick={onClose}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.45)' }}
        className="absolute inset-0 transition-opacity backdrop-blur-2xs"
        aria-hidden="true"
      />

      {/* ── Drawer Container ── */}
      <aside
        style={{
          backgroundColor: 'var(--color-surface-light, #FFFFFF)',
          color: 'var(--color-text, #111111)'
        }}
        className="absolute inset-y-0 right-0 max-w-full w-full sm:w-[460px] shadow-2xl flex flex-col z-50"
      >
        {/* ── Header ── */}
        <div
          style={{ borderColor: 'var(--color-border, #E0E0E0)' }}
          className="flex items-center justify-between px-6 py-5 border-b flex-shrink-0"
        >
          <h2 className="text-xs sm:text-[13px] font-bold tracking-[0.12em] uppercase">
            {headingText}
          </h2>
          <button
            type="button"
            onClick={onClose}
            style={{ color: 'var(--color-text, #111111)' }}
            className="p-1 hover:opacity-70 transition-opacity cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5 stroke-[1.6]" />
          </button>
        </div>

        {/* ── Cart Items List ── */}
        <div
          style={{ borderColor: 'var(--color-border, #E0E0E0)' }}
          className="flex-1 overflow-y-auto px-6 divide-y divide-[var(--color-border)]"
        >
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <p
                style={{ color: 'var(--color-text-muted, #666666)' }}
                className="text-xs sm:text-sm mb-6"
              >
                Your cart is currently empty.
              </p>
              <button
                type="button"
                onClick={onClose}
                style={{
                  backgroundColor: 'var(--color-primary, #000000)',
                  color: 'var(--color-primary-contrast, #FFFFFF)'
                }}
                className="px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer"
              >
                Return to Shop
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const unitPrice = item.discountedPrice || item.price;
              const variantLabel = item.variant?.[0]?.value || item.variant?.[0]?.name;

              return (
                <div key={item.productId} className="py-6 flex items-start gap-4">
                  {/* Thumbnail */}
                  <div
                    style={{ backgroundColor: 'var(--color-surface, #F5F5F5)' }}
                    className="w-20 h-20 rounded-lg p-2 flex-shrink-0 flex items-center justify-center overflow-hidden"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-w-full max-h-full object-contain"
                      loading="lazy"
                    />
                  </div>

                  {/* Details & Controls */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-bold tracking-tight line-clamp-1">
                      {item.name}
                    </h3>
                    {variantLabel && (
                      <p
                        style={{ color: 'var(--color-text-muted, #666666)' }}
                        className="text-[11px] mt-0.5"
                      >
                        {variantLabel}
                      </p>
                    )}
                    <p
                      style={{ color: 'var(--color-text-muted, #666666)' }}
                      className="text-xs font-medium mt-1"
                    >
                      MRP. ₹{unitPrice.toLocaleString('en-IN')}/-
                    </p>

                    {/* Quantity Pill & Action Icons */}
                    <div className="flex items-center justify-between mt-3 pt-1">
                      {/* Stepper Pill */}
                      <div
                        style={{ borderColor: 'var(--color-text, #111111)' }}
                        className="inline-flex items-center border rounded-full px-2 py-1 gap-3"
                      >
                        <button
                          type="button"
                          onClick={() => {
                            if (item.quantity <= 1) {
                              onItemRemove(item.productId);
                            } else {
                              onQtyUpdate(item.productId, item.quantity - 1);
                            }
                          }}
                          className="p-0.5 hover:opacity-60 transition-opacity cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Trash2 className="w-3.5 h-3.5 stroke-[1.6]" />
                        </button>

                        <span className="text-xs font-semibold px-1 min-w-[12px] text-center">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => onQtyUpdate(item.productId, item.quantity + 1)}
                          className="p-0.5 hover:opacity-60 transition-opacity cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5 stroke-[1.6]" />
                        </button>
                      </div>

                      {/* Item Actions */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          style={{ color: 'var(--color-text-light, #999999)' }}
                          className="p-1 hover:![color:var(--color-text)] transition-colors cursor-pointer"
                          aria-label="Add note to item"
                        >
                          <Edit3 className="w-3.5 h-3.5 stroke-[1.6]" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onItemRemove(item.productId)}
                          style={{ color: 'var(--color-text-light, #999999)' }}
                          className="p-1 hover:![color:var(--color-text)] transition-colors cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5 stroke-[1.6]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* ── Footer & Checkout Summary ── */}
        {cart.length > 0 && (
          <div
            style={{
              borderColor: 'var(--color-border, #E0E0E0)',
              backgroundColor: 'var(--color-surface-light, #FFFFFF)'
            }}
            className="border-t px-6 py-5 flex-shrink-0 space-y-4"
          >
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-base font-bold tracking-tight">Subtotal:</span>
              <span className="text-base font-bold tracking-tight">
                MRP. ₹{subtotalValue.toLocaleString('en-IN')}/-
              </span>
            </div>

            <p
              style={{ color: 'var(--color-text-muted, #666666)' }}
              className="text-[11px] leading-tight"
            >
              Taxes and shipping calculated at checkout
            </p>

            {/* Terms Agreement */}
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                style={{
                  borderColor: 'var(--color-border, #E0E0E0)',
                  accentColor: 'var(--color-primary, #000000)'
                }}
                className="w-4 h-4 rounded cursor-pointer"
              />
              <span
                style={{ color: 'var(--color-text-muted, #666666)' }}
                className="text-xs"
              >
                I agree with the terms and conditions.
              </span>
            </label>

            {/* View Cart Action */}
            <button
              type="button"
              onClick={onCheckout}
              disabled={!agreedToTerms}
              style={{
                backgroundColor: agreedToTerms ? '#27A365' : 'var(--color-surface, #F5F5F5)',
                color: agreedToTerms ? '#FFFFFF' : 'var(--color-text-light, #999999)'
              }}
              className={`w-full py-3 rounded-md text-xs font-bold tracking-wider uppercase transition-all shadow-xs ${
                agreedToTerms ? 'cursor-pointer hover:opacity-90 active:scale-98' : 'cursor-not-allowed'
              }`}
            >
              {checkoutText}
            </button>

            {/* Currency Disclaimer */}
            <p
              style={{ color: 'var(--color-text-muted, #666666)' }}
              className="text-[10px] leading-relaxed"
            >
              All charges are billed in INR. While the content of your cart is currently displayed in , the checkout will use INR at the most current exchange rate.
            </p>

            {/* Fast Checkout Trigger */}
            <button
              type="button"
              onClick={onCheckout}
              style={{
                backgroundColor: 'var(--color-secondary, #4A4A4A)',
                color: 'var(--color-secondary-contrast, #FFFFFF)'
              }}
              className="w-full py-2.5 px-4 rounded-md flex items-center justify-between text-xs font-bold tracking-wider hover:opacity-95 transition-opacity cursor-pointer"
            >
              <span>BUY NOW</span>
              <span className="flex items-center gap-1.5 text-[10px] font-normal tracking-normal text-neutral-300">
                <span className="px-1.5 py-0.5 rounded bg-white text-black text-[9px] font-bold">GPay</span>
                <span className="px-1.5 py-0.5 rounded bg-white text-black text-[9px] font-bold">UPI</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </span>
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}