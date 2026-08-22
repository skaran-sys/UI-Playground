"use client";

import React, { useState } from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

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

export default function Layout(props: CartLayoutProps) {
  const {
    cart = [],
    priceSummary,
    config,
    onItemRemove,
    onQtyUpdate,
    onClose,
    onCheckout,
    isSidebar = true
  } = props;

  const [isGiftWrapSelected, setIsGiftWrapSelected] = useState<boolean>(false);
  const [giftMessage, setGiftMessage] = useState<string>('');

  const totalItemCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const headingText = `${config?.heading || 'Your cart'} (${totalItemCount})`;
  const checkoutButtonText = config?.checkout_text || 'Buy Now';

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
    <div
      style={{
        backgroundColor: 'var(--color-surface-light)',
        color: 'var(--color-text)'
      }}
      className="flex flex-col h-full w-full select-none"
    >
      {/* ── 1. Header Bar ── */}
      <div className="flex-shrink-0 flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)]">
        <h2
          style={{ color: 'var(--color-text)' }}
          className="text-base sm:text-lg font-serif font-bold tracking-tight"
        >
          {headingText}
        </h2>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close cart"
          className="p-1 text-[var(--color-text)] hover:opacity-70 transition-opacity cursor-pointer"
        >
          <X className="w-5 h-5 stroke-[1.8]" />
        </button>
      </div>

      {/* ── 2. Scrollable Cart Items List ── */}
      <div className="flex-1 overflow-y-auto px-5 py-2 divide-y divide-[var(--color-border)]">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-16 space-y-4 text-center">
            <ShoppingBag className="w-12 h-12 text-[var(--color-text-muted)] stroke-[1.2]" />
            <p className="text-sm font-medium text-[var(--color-text-muted)]">
              Your cart is currently empty.
            </p>
          </div>
        ) : (
          cart.map((item) => {
            const hasDiscount =
              typeof item.discountedPrice === 'number' &&
              item.discountedPrice < item.price;
            const finalPrice = hasDiscount ? item.discountedPrice : item.price;

            return (
              <div
                key={item.productId}
                className="py-4 flex gap-3.5 items-start relative group"
              >
                {/* Product Thumbnail */}
                <div className="w-20 h-24 sm:w-22 sm:h-26 flex-shrink-0 bg-[var(--color-surface-lighter)] rounded-xs overflow-hidden">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                  )}
                </div>

                {/* Meta & Actions */}
                <div className="flex-1 min-w-0 pr-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3
                      style={{ color: 'var(--color-text)' }}
                      className="text-xs sm:text-sm font-medium line-clamp-1"
                    >
                      {item.name}
                    </h3>

                    {/* Price */}
                    <div className="text-right flex-shrink-0">
                      <span
                        style={{ color: 'var(--color-text)' }}
                        className="text-xs sm:text-sm font-semibold tracking-tight block"
                      >
                        ₹{finalPrice}
                      </span>
                      {hasDiscount && (
                        <span className="text-[10px] sm:text-[11px] line-through text-[var(--color-text-light)] block">
                          ₹{item.price}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Variant Details */}
                  {item.variant && item.variant.length > 0 && (
                    <div className="mt-1 space-y-0.5">
                      {item.variant.map((v, idx) => (
                        <p
                          key={idx}
                          style={{ color: 'var(--color-text-muted)' }}
                          className="text-[11px] font-normal leading-tight"
                        >
                          {v.name ? `${v.name}: ` : ''}
                          {v.value}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Quantity and Remove Action */}
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center border border-[var(--color-border)] rounded-xs bg-[var(--color-surface-light)]">
                      <button
                        type="button"
                        onClick={() => handleDecreaseQty(item)}
                        aria-label="Decrease quantity"
                        className="px-2 py-1 text-xs hover:bg-[var(--color-surface-lighter)] transition-colors cursor-pointer"
                      >
                        <Minus className="w-3 h-3 stroke-[1.8]" />
                      </button>

                      <span className="px-2.5 py-0.5 text-xs font-semibold select-none">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleIncreaseQty(item)}
                        aria-label="Increase quantity"
                        className="px-2 py-1 text-xs hover:bg-[var(--color-surface-lighter)] transition-colors cursor-pointer"
                      >
                        <Plus className="w-3 h-3 stroke-[1.8]" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => onItemRemove(item.productId)}
                      aria-label={`Remove ${item.name}`}
                      className="text-[var(--color-text-muted)] hover:text-red-500 transition-colors p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5 stroke-[1.6]" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ── 3. Fixed Bottom Section (Subtotal & Buy Now) ── */}
      {cart.length > 0 && (
        <div className="flex-shrink-0 border-t border-[var(--color-border)] bg-[var(--color-surface-light)] flex flex-col">
          {/* Blush Subtotal Row */}
          <div
            style={{
              backgroundColor: 'rgba(240, 168, 168, 0.45)',
              color: 'var(--color-text)'
            }}
            className="px-5 py-3 flex items-center justify-between text-xs sm:text-sm font-semibold tracking-wide"
          >
            <span>Subtotal:</span>
            <span>₹{priceSummary?.subTotal ?? priceSummary?.total ?? 0}</span>
          </div>

          {/* Optional Discount / Gift Wrapping Section */}
          {config?.discount?.enabled && (
            <div className="px-5 py-3 border-b border-[var(--color-border)] bg-[var(--color-surface-lighter)]">
              <div className="flex items-center justify-between text-xs text-[var(--color-text)]">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isGiftWrapSelected}
                    onChange={(e) => setIsGiftWrapSelected(e.target.checked)}
                    className="rounded-xs w-3.5 h-3.5 accent-[var(--color-primary)] cursor-pointer"
                  />
                  <span>{config.discount.label || 'Gift Wrapping - Rs.49'}</span>
                </label>

                {config.discount.showDiscount && priceSummary?.discount > 0 && (
                  <span className="font-semibold text-[var(--color-primary)]">
                    -₹{priceSummary.discount}
                  </span>
                )}
              </div>

              {isGiftWrapSelected && (
                <div className="mt-2.5">
                  <textarea
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    placeholder="Add your personal message"
                    maxLength={150}
                    rows={2}
                    className="w-full text-xs p-2 rounded-xs border border-[var(--color-border)] bg-[var(--color-surface-light)] text-[var(--color-text)] placeholder-[var(--color-text-light)] focus:outline-none focus:border-[var(--color-primary)] resize-none"
                  />
                  <div className="text-[10px] text-right text-[var(--color-text-muted)] mt-0.5">
                    {giftMessage.length}/150
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Primary CTA Button */}
          <div className="p-4">
            <button
              type="button"
              onClick={onCheckout}
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-primary-contrast)'
              }}
              className="w-full py-3.5 text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-xs transition-opacity duration-200 hover:opacity-90 active:scale-[0.99] shadow-sm text-center cursor-pointer"
            >
              {checkoutButtonText}
            </button>
          </div>
        </div>
      )}
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
        <div className="relative w-full max-w-md h-full shadow-2xl flex flex-col z-10">
          {cartContent}
        </div>
      </div>
    );
  }

  /* Inline Page Mode */
  return <div className="w-full max-w-2xl mx-auto h-full flex flex-col">{cartContent}</div>;
}