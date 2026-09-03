'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/* ── 1. Schema Types ── */
export interface BannerItem {
  media: string;
  title: string;
  subtitle: string;
  description: string;
  cta_text: string;
  cta_link: string;
  cta_style: 'primary' | 'secondary' | 'outline';
}

export interface BannerSectionProps {
  layout_id: string;
  autoSlide: boolean;
  interval: number;
  contentAlignment: 'left' | 'center' | 'right';
  banner: BannerItem[];
}

/* ── 2. Hero Section Component ── */
export default function Layout({
  banner = [],
  autoSlide = true,
  interval = 5000
}: BannerSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = banner?.length || 0;

  const handleNext = useCallback(() => {
    if (totalSlides <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    if (totalSlides <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    if (!autoSlide || totalSlides <= 1) return;

    const timer = setInterval(() => {
      handleNext();
    }, interval || 5000);

    return () => clearInterval(timer);
  }, [autoSlide, interval, totalSlides, handleNext]);

  if (!banner || banner.length === 0) {
    return null;
  }

  return (
    <section
      style={{
        backgroundColor: 'var(--color-background, #FFFFFF)'
      }}
      className="relative w-full overflow-hidden select-none"
    >
      {/* ── Slide Viewport Container ── */}
      <div className="relative w-full overflow-hidden">
        {/* Horizontal Sliding Track */}
        <div
          className="flex w-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {banner.map((item, idx) => (
            <div
              key={idx}
              className="w-full flex-shrink-0 relative aspect-[16/9] sm:aspect-[21/9] md:aspect-[24/8] min-h-[220px] max-h-[640px]"
            >
              <a
                href={item.cta_link || '#'}
                className="block w-full h-full cursor-pointer relative"
                tabIndex={idx === currentIndex ? 0 : -1}
              >
                {item.media ? (
                  <img
                    src={item.media}
                    alt={item.title || `Banner ${idx + 1}`}
                    className="w-full h-full object-cover object-center"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                ) : (
                  <div
                    style={{
                      backgroundColor: 'var(--color-surface, #F5F5F5)',
                      color: 'var(--color-text-muted, #666666)'
                    }}
                    className="w-full h-full flex items-center justify-center text-sm font-medium"
                  >
                    No banner media provided
                  </div>
                )}
              </a>
            </div>
          ))}
        </div>

        {/* ── Bare Chevrons (No Background Color) ── */}
        {totalSlides > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous slide"
              style={{
                color: 'var(--color-text, #111111)'
              }}
              className="absolute left-1 sm:left-3 md:left-5 top-1/2 -translate-y-1/2 z-20 p-2 bg-transparent hover:opacity-60 transition-opacity active:scale-90 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 stroke-[1.2]" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next slide"
              style={{
                color: 'var(--color-text, #111111)'
              }}
              className="absolute right-1 sm:right-3 md:right-5 top-1/2 -translate-y-1/2 z-20 p-2 bg-transparent hover:opacity-60 transition-opacity active:scale-90 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 stroke-[1.2]" />
            </button>
          </>
        )}
      </div>
    </section>
  );
}