'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Star } from 'lucide-react';

/* ── 1. Schema Types ── */
export interface ProductReviewContent {
  id: string;
  content: string;
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
  productImage: string;
  review: ProductReviewContent;
  customerImage?: string;
}

export interface ReviewsSectionProps {
  reviews: ProductReview[];
  loading: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
  title?: string;
}

/* ── 2. Verified Buyer Rosette Badge ── */
function VerifiedRosetteBadge() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 text-[#2196F3] fill-current flex-shrink-0"
      aria-label="Verified Buyer"
    >
      <path d="M22.5 12.5c0-1.58-.88-2.95-2.15-3.6.15-.44.24-.91.24-1.4 0-2.21-1.79-4-4-4-.5 0-.97.08-1.4.24-.65-1.27-2.02-2.14-3.6-2.14-1.58 0-2.95.88-3.6 2.15-.43-.16-.9-.25-1.39-.25-2.21 0-4 1.79-4 4 0 .49.09.96.24 1.4-1.27.65-2.14 2.02-2.14 3.6 0 1.58.87 2.95 2.14 3.6-.15.44-.24.91-.24 1.4 0 2.21 1.79 4 4 4 .49 0 .96-.09 1.39-.24.65 1.27 2.02 2.14 3.6 2.14 1.58 0 2.95-.87 3.6-2.14.43.15.9.24 1.4.24 2.21 0 4-1.79 4-4 0-.49-.09-.96-.24-1.4 1.27-.65 2.15-2.02 2.15-3.6zm-12.4 4.1l-4.2-4.2 1.4-1.4 2.8 2.8 6.8-6.8 1.4 1.4-8.2 8.2z" />
    </svg>
  );
}

/* ── 3. Helpers ── */
function splitCustomerName(fullName: string) {
  if (!fullName) return { firstName: 'CUSTOMER', restName: '' };
  const parts = fullName.trim().split(/\s+/);
  return {
    firstName: parts[0] || '',
    restName: parts.slice(1).join(' ') || ''
  };
}

function parseReviewContent(content: string) {
  if (!content) return { headline: '', body: '' };
  const parts = content.split('\n\n');
  if (parts.length > 1) {
    return { headline: parts[0].trim(), body: parts.slice(1).join('\n\n').trim() };
  }
  return { headline: '', body: content.trim() };
}

/* ── 4. Main Component Layout ── */
export default function Layout({
  reviews = [],
  loading = false,
  title = "Love That Keeps Us Going"
}: ReviewsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Drag-to-Scroll State
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const startXRef = useRef<number>(0);
  const scrollLeftRef = useRef<number>(0);
  const hasDraggedRef = useRef<boolean>(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('a')) return;
    setIsDragging(true);
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - (scrollRef.current?.offsetLeft || 0);
    scrollLeftRef.current = scrollRef.current?.scrollLeft || 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;

    if (Math.abs(walk) > 6) {
      hasDraggedRef.current = true;
    }
    scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    if (hasDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) setIsDragging(false);
    };
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, [isDragging]);

  if (loading) {
    return (
      <div
        style={{ color: 'var(--color-text-muted, #64748B)' }}
        className="w-full py-20 flex justify-center text-sm font-medium"
      >
        Loading customer reviews...
      </div>
    );
  }

  if (!reviews || reviews.length === 0) return null;

  return (
    <section
      style={{ backgroundColor: 'var(--color-background, #FFFFFF)' }}
      className="w-full pt-10 pb-16 px-4 sm:px-6 lg:px-12 select-none overflow-hidden"
    >
      <div className="max-w-[1380px] mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2
            style={{ color: 'var(--color-text, #0F172A)' }}
            className="text-2xl sm:text-3xl font-extrabold tracking-tight"
          >
            {title}
          </h2>
        </div>

        {/* Drag-to-Scroll Review Cards Track */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`flex gap-6 sm:gap-7 overflow-x-auto pt-10 pb-6 px-4 scrollbar-none snap-x snap-mandatory ${
            isDragging ? 'cursor-grabbing select-none' : 'cursor-grab scroll-smooth'
          }`}
        >
          {reviews.map((rev) => {
            const { headline, body } = parseReviewContent(rev.review?.content);
            const { firstName, restName } = splitCustomerName(rev.customerName);
            const displayFirstName =
              firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();

            return (
              <div
                key={rev._id}
                style={{
                  backgroundColor: 'var(--color-surface-light, #FFFFFF)',
                  borderColor: 'var(--color-border, #E2E8F0)'
                }}
                className="relative snap-start flex-shrink-0 w-[85%] sm:w-[320px] md:w-[340px] rounded-2xl border shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between pt-7 pb-5 px-5 sm:px-6 mt-4"
              >
                {/* ── Top Left Floating Avatar Overlapping Corner ── */}
                <div className="absolute -top-7 -left-2 sm:-left-3 w-20 h-20 rounded-full overflow-hidden bg-[var(--color-surface-lighter,#F8FAFC)] border-4 border-white shadow-md flex-shrink-0 z-10">
                  {rev.customerImage ? (
                    <img
                      src={rev.customerImage}
                      alt={rev.customerName}
                      draggable={false}
                      className="w-full h-full object-cover pointer-events-none"
                    />
                  ) : (
                    <div
                      style={{
                        backgroundColor: 'var(--color-surface, #FCE7F3)',
                        color: 'var(--color-primary, #EC1E63)'
                      }}
                      className="w-full h-full flex items-center justify-center font-black text-xl uppercase"
                    >
                      {firstName.charAt(0)}
                    </div>
                  )}
                </div>

                <div>
                  {/* ── Two-Line Name Header Beside Avatar ── */}
                  <div className="ml-16 sm:ml-18 pl-2 min-h-[46px] flex flex-col justify-center mb-4">
                    <span
                      style={{ color: 'var(--color-text, #0F172A)' }}
                      className="text-xs sm:text-[13px] font-bold tracking-wider uppercase leading-tight"
                    >
                      {firstName}
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span
                        style={{ color: 'var(--color-text, #0F172A)' }}
                        className="text-xs sm:text-[13px] font-bold tracking-wider uppercase leading-tight truncate"
                      >
                        {restName}
                      </span>
                      <VerifiedRosetteBadge />
                    </div>
                  </div>

                  {/* ── 5 Green Stars ── */}
                  <div className="flex items-center gap-1 mb-3 text-[#70B33F]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(rev.rating)
                            ? 'fill-[#70B33F] text-[#70B33F]'
                            : 'text-neutral-200'
                        }`}
                      />
                    ))}
                  </div>

                  {/* ── Review Headline & Body ── */}
                  {headline && (
                    <h4
                      style={{ color: 'var(--color-text, #0F172A)' }}
                      className="text-sm font-bold leading-snug mb-1.5"
                    >
                      {headline}
                    </h4>
                  )}

                  <p
                    style={{ color: 'var(--color-text-muted, #475569)' }}
                    className="text-xs sm:text-[12.5px] leading-relaxed line-clamp-4 font-normal"
                  >
                    {body}
                  </p>
                </div>

                {/* ── Product Recommendation Footer ── */}
                <div
                  style={{ borderTopColor: 'var(--color-border, #E2E8F0)' }}
                  className="mt-6 pt-4 border-t flex items-center gap-3.5"
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-[var(--color-surface-lighter,#F8FAFC)] flex-shrink-0 flex items-center justify-center p-1">
                    <img
                      src={rev.productImage}
                      alt={rev.productTitle}
                      draggable={false}
                      className="w-full h-full object-contain pointer-events-none"
                    />
                  </div>

                  <div className="flex flex-col justify-center">
                    <span
                      style={{ color: 'var(--color-text-muted, #64748B)' }}
                      className="text-[11px] font-medium leading-tight"
                    >
                      {displayFirstName} Recommends This Product
                    </span>

                    <a
                      href={`/products/${rev.productId}`}
                      onClick={handleLinkClick}
                      style={{ color: 'var(--color-primary, #EC1E63)' }}
                      className="text-xs font-black tracking-wider uppercase mt-1 hover:underline inline-flex items-center gap-0.5 cursor-pointer"
                    >
                      SHOP NOW &gt;&gt;
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}