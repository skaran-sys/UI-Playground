'use client';

import React, { useState, useEffect, useCallback } from 'react';

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

export type HeroLayoutPropsType = BannerSectionProps | { config: BannerSectionProps };

export default function Layout(props: HeroLayoutPropsType) {
  // Support both direct props and nested config wrapper
  const heroProps: BannerSectionProps = 'config' in props ? props.config : props;

  const {
    layout_id,
    autoSlide = true,
    interval = 5000,
    contentAlignment = 'left',
    banner = []
  } = heroProps || {};

  const totalSlides = banner.length;

  // Clone first and last slides for seamless circular wrap-around
  const slides = totalSlides > 1 ? [banner[totalSlides - 1], ...banner, banner[0]] : banner;
  const [currentIndex, setCurrentIndex] = useState<number>(totalSlides > 1 ? 1 : 0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const handleNextSlide = useCallback(() => {
    if (totalSlides <= 1) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, [totalSlides]);

  const handlePrevSlide = useCallback(() => {
    if (totalSlides <= 1) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, [totalSlides]);

  const handleTransitionEnd = () => {
    if (totalSlides <= 1) return;
    if (currentIndex === totalSlides + 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    } else if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(totalSlides);
    }
  };

  useEffect(() => {
    if (!autoSlide || isPaused || totalSlides <= 1) return;
    const intervalDuration = interval || 5000;
    const timer = setInterval(() => {
      handleNextSlide();
    }, intervalDuration);

    return () => clearInterval(timer);
  }, [autoSlide, isPaused, interval, totalSlides, handleNextSlide]);

  if (totalSlides === 0) {
    return null;
  }

  const activeSlideIndex = totalSlides > 1 ? (currentIndex - 1 + totalSlides) % totalSlides : 0;
  const activeSlide = banner[activeSlideIndex] || banner[0];

  const getPositionClasses = (alignment?: 'left' | 'center' | 'right') => {
    switch (alignment) {
      case 'center':
        return 'items-center justify-center text-center px-10 sm:px-16 md:px-24';
      case 'right':
        return 'items-center justify-end text-right pr-10 sm:pr-16 md:pr-24 lg:pr-28 pl-10';
      case 'left':
      default:
        return 'items-center justify-start text-left pl-10 sm:pl-16 md:pl-24 lg:pl-28 pr-10';
    }
  };

  const getCTAStyle = (style?: 'primary' | 'secondary' | 'outline' | string) => {
    switch (style?.toLowerCase()) {
      case 'primary':
        return {
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-primary-contrast)',
          borderColor: 'var(--color-primary)'
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: 'var(--color-surface-light)',
          borderColor: 'var(--color-surface-light)'
        };
      case 'secondary':
      default:
        return {
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-surface-contrast)',
          borderColor: 'var(--color-surface)'
        };
    }
  };

  return (
    <section
      id={layout_id}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full h-screen min-h-[100dvh] overflow-hidden select-none bg-[var(--color-surface-contrast)] group/hero"
    >
      {/* ── 1. Seamless Circular Slide Track ── */}
      <div
        onTransitionEnd={handleTransitionEnd}
        className="flex w-full h-full"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitioning ? 'transform 700ms ease-in-out' : 'none'
        }}
      >
        {slides.map((item, index) => {
          const cleanMediaUrl = item?.media?.split('?')[0]?.toLowerCase() || '';
          const isVideo =
            cleanMediaUrl.endsWith('.mp4') ||
            cleanMediaUrl.endsWith('.webm') ||
            cleanMediaUrl.endsWith('.mov') ||
            item?.media?.toLowerCase().includes('video');

          return (
            <div key={index} className="relative w-full h-full flex-shrink-0">
              {isVideo ? (
                <video
                  src={item.media}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <img
                  src={item.media || '/placeholder.jpg'}
                  alt={item.title || 'Hero Banner'}
                  className="w-full h-full object-cover object-center"
                  loading={index === 1 ? 'eager' : 'lazy'}
                />
              )}

              {/* Subtle Gradient Veil for Readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent pointer-events-none" />
            </div>
          );
        })}
      </div>

      {/* ── 2. Dynamic Text & CTA Content Layer ── */}
      <div className={`absolute inset-0 z-20 flex max-w-7xl mx-auto w-full pointer-events-none ${getPositionClasses(contentAlignment)}`}>
        <div className="max-w-xl flex flex-col pointer-events-auto">

          {/* Main Title (Luxury Serif Header) */}
          {activeSlide?.title && (
            <h1
              style={{
                color: 'var(--color-surface-light)',
                textShadow: '0 2px 14px rgba(0, 0, 0, 0.4)'
              }}
              className="text-2xl sm:text-5xl md:text-7xl lg:text-8xl font-normal font-serif tracking-[0.10em] sm:tracking-[0.14em] uppercase leading-tight sm:leading-none"
            >
              {activeSlide.title}
            </h1>
          )}

          {/* Subtitle with Filigree Divider Ornament */}
          {activeSlide?.subtitle && (
            <div className="mt-2 sm:mt-3 flex flex-col items-start">
              <div className="flex items-center gap-2 w-full max-w-xs sm:max-w-sm mb-1.5 sm:mb-2 opacity-85">
                <span className="h-[1px] flex-1 bg-[var(--color-surface)]" />
                <span className="text-[var(--color-surface)] text-[10px] sm:text-xs">&#9670;</span>
                <span className="h-[1px] flex-1 bg-[var(--color-surface)]" />
              </div>
              <p
                style={{
                  color: 'var(--color-surface)',
                  textShadow: '0 1px 8px rgba(0, 0, 0, 0.5)'
                }}
                className="text-[10px] sm:text-sm md:text-base font-semibold tracking-[0.16em] sm:tracking-[0.2em] uppercase font-sans leading-relaxed"
              >
                {activeSlide.subtitle}
              </p>
            </div>
          )}

          {/* Optional Description */}
          {activeSlide?.description && (
            <p
              style={{ color: 'var(--color-surface-lighter)' }}
              className="mt-2 sm:mt-3 text-[11px] sm:text-xs md:text-base font-normal max-w-md leading-relaxed opacity-90 text-shadow-sm"
            >
              {activeSlide.description}
            </p>
          )}

          {/* Dynamic Action Button */}
          {activeSlide?.cta_text && activeSlide?.cta_link && (
            <div className="mt-4 sm:mt-8 flex flex-wrap gap-3 sm:gap-4 items-center">
              <a
                href={activeSlide.cta_link}
                style={getCTAStyle(activeSlide.cta_style)}
                className="px-5 sm:px-8 py-2 sm:py-3 text-[11px] sm:text-sm font-bold tracking-[0.16em] sm:tracking-[0.18em] uppercase rounded-sm border transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] shadow-lg text-center"
              >
                {activeSlide.cta_text}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* ── 3. Slider Navigation Chevrons ── */}
      {totalSlides > 1 && (
        <>
          {/* Left Arrow */}
          <button
            type="button"
            onClick={handlePrevSlide}
            aria-label="Previous Slide"
            style={{ color: 'var(--color-surface-light)' }}
            className="absolute left-1.5 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-1.5 sm:p-3 transition-opacity opacity-70 hover:opacity-100 hover:scale-110 focus:outline-none cursor-pointer"
          >
            <svg
              className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 drop-shadow-md"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={handleNextSlide}
            aria-label="Next Slide"
            style={{ color: 'var(--color-surface-light)' }}
            className="absolute right-1.5 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-1.5 sm:p-3 transition-opacity opacity-70 hover:opacity-100 hover:scale-110 focus:outline-none cursor-pointer"
          >
            <svg
              className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 drop-shadow-md"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* ── 4. Bottom Horizontal Slide Indicators ── */}
      {totalSlides > 1 && (
        <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 z-30 flex items-center justify-center gap-2 sm:gap-3 px-4">
          {banner.map((_, idx) => {
            const isSelected = idx === activeSlideIndex;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setIsTransitioning(true);
                  setCurrentIndex(idx + 1);
                }}
                aria-label={`Go to slide ${idx + 1}`}
                style={{
                  backgroundColor: isSelected
                    ? 'var(--color-surface-light)'
                    : 'rgba(255, 255, 255, 0.35)'
                }}
                className={`h-[2px] sm:h-[3px] transition-all duration-300 rounded-full focus:outline-none cursor-pointer ${
                  isSelected ? 'w-10 sm:w-14' : 'w-6 sm:w-8 hover:bg-white/60'
                }`}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}