'use client';

import React, { useState, useEffect, useCallback } from 'react';

export interface HeroLayoutPropsType {
  config: any;
}

export interface HeroBannerConfig {
  layout_id: string
  media: HeroMedia[]
  autoSlide?: boolean
  interval?: number
  text?: {
    title?: string
    subtitle?: string
    description?: string
  }
  cta?: HeroCTA[]
}

export interface HeroMedia {
  type: "image" | "video"
  url: string
  mobileUrl?: string
  alt?: string
  poster?: string // for videos
  text?: {
    title?: string
    subtitle?: string
    description?: string
  }
  cta?: HeroCTA[]
}

export interface HeroCTA {
  text: string
  link: string
  style?: "primary" | "secondary" | "outline" | "clear"
  position?:
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"
  target?: "_self" | "_blank"
}

export default function Layout(props: HeroLayoutPropsType) {
  const config: HeroBannerConfig = props.config || {};
  const mediaList: HeroMedia[] = config.media || [];
  const totalSlides = mediaList.length;

  // Clone first and last slides for seamless circular wrap-around
  const slides = totalSlides > 1 ? [mediaList[totalSlides - 1], ...mediaList, mediaList[0]] : mediaList;
  const [currentIndex, setCurrentIndex] = useState<number>(totalSlides > 1 ? 1 : 0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);

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
    if (!config.autoSlide || totalSlides <= 1) return;
    const intervalDuration = config.interval || 5000;
    const timer = setInterval(() => {
      handleNextSlide();
    }, intervalDuration);

    return () => clearInterval(timer);
  }, [config.autoSlide, config.interval, totalSlides, handleNextSlide]);

  if (totalSlides === 0) {
    return null;
  }

  const activeSlideIndex = totalSlides > 1 ? (currentIndex - 1 + totalSlides) % totalSlides : 0;
  const activeMedia = mediaList[activeSlideIndex];
  const activeText = activeMedia?.text || config.text;
  const activeCTAs = (activeMedia?.cta && activeMedia.cta.length > 0) ? activeMedia.cta : (config.cta || []);

  const getPositionClasses = (position?: string) => {
    switch (position) {
      case 'top-left':
        return 'items-start justify-start text-left pt-16 sm:pt-24 pl-6 sm:pl-16 md:pl-24';
      case 'top-center':
        return 'items-start justify-center text-center pt-16 sm:pt-24 px-6';
      case 'top-right':
        return 'items-start justify-end text-right pt-16 sm:pt-24 pr-6 sm:pr-16 md:pr-24';
      case 'center':
        return 'items-center justify-center text-center px-6';
      case 'center-right':
        return 'items-center justify-end text-right pr-6 sm:pr-16 md:pr-24';
      case 'bottom-left':
        return 'items-end justify-start text-left pb-20 sm:pb-28 pl-6 sm:pl-16 md:pl-24';
      case 'bottom-center':
        return 'items-end justify-center text-center pb-20 sm:pb-28 px-6';
      case 'bottom-right':
        return 'items-end justify-end text-right pb-20 sm:pb-28 pr-6 sm:pr-16 md:pr-24';
      case 'center-left':
      default:
        return 'items-center justify-start text-left pl-6 sm:pl-16 md:pl-24 lg:pl-28';
    }
  };

  const getCTAStyle = (style?: string) => {
    switch (style) {
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
      case 'clear':
        return {
          backgroundColor: 'transparent',
          color: 'var(--color-surface-light)',
          borderColor: 'transparent'
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

  const primaryPosition = activeCTAs[0]?.position || 'center-left';

  return (
    <section className="relative w-full h-screen min-h-[100dvh] overflow-hidden select-none bg-[var(--color-surface-contrast)]">
      {/* ── 1. Seamless Circular Slide Track ── */}
      <div
        onTransitionEnd={handleTransitionEnd}
        className="flex w-full h-full"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitioning ? 'transform 700ms ease-in-out' : 'none'
        }}
      >
        {slides.map((media, index) => (
          <div
            key={index}
            className="relative w-full h-full flex-shrink-0"
          >
            {media.type === 'video' ? (
              <video
                src={media.url}
                poster={media.poster}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <picture className="w-full h-full block">
                {media.mobileUrl && (
                  <source media="(max-width: 640px)" srcSet={media.mobileUrl} />
                )}
                <img
                  src={media.url}
                  alt={media.alt || activeText?.title || 'Hero Banner'}
                  className="w-full h-full object-cover object-center"
                  loading={index === 1 ? 'eager' : 'lazy'}
                />
              </picture>
            )}

            {/* Subtle Gradient Veil for Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent pointer-events-none" />
          </div>
        ))}
      </div>

      {/* ── 2. Dynamic Text & CTA Content Layer ── */}
      <div className={`absolute inset-0 z-20 flex max-w-7xl mx-auto w-full pointer-events-none ${getPositionClasses(primaryPosition)}`}>
        <div className="max-w-xl flex flex-col pointer-events-auto">

          {/* Main Title (Luxury Serif Header) */}
          {activeText?.title && (
            <h1
              style={{
                color: 'var(--color-surface-light)',
                textShadow: '0 2px 14px rgba(0, 0, 0, 0.4)'
              }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal font-serif tracking-[0.14em] uppercase leading-none"
            >
              {activeText.title}
            </h1>
          )}

          {/* Subtitle with Filigree Divider Ornament */}
          {activeText?.subtitle && (
            <div className="mt-2 sm:mt-3 flex flex-col items-start">
              <div className="flex items-center gap-2 w-full max-w-sm mb-2 opacity-85">
                <span className="h-[1px] flex-1 bg-[var(--color-surface)]" />
                <span className="text-[var(--color-surface)] text-xs">&#9670;</span>
                <span className="h-[1px] flex-1 bg-[var(--color-surface)]" />
              </div>
              <p
                style={{
                  color: 'var(--color-surface)',
                  textShadow: '0 1px 8px rgba(0, 0, 0, 0.5)'
                }}
                className="text-xs sm:text-sm md:text-base font-semibold tracking-[0.2em] uppercase font-sans leading-relaxed"
              >
                {activeText.subtitle}
              </p>
            </div>
          )}

          {/* Optional Description */}
          {activeText?.description && (
            <p
              style={{ color: 'var(--color-surface-lighter)' }}
              className="mt-3 text-xs sm:text-sm md:text-base font-normal max-w-md leading-relaxed opacity-90 text-shadow-sm"
            >
              {activeText.description}
            </p>
          )}

          {/* Dynamic Action Buttons */}
          {activeCTAs.length > 0 && (
            <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4 items-center">
              {activeCTAs.map((cta, ctaIdx) => {
                const buttonStyles = getCTAStyle(cta.style);

                return (
                  <a
                    key={ctaIdx}
                    href={cta.link}
                    target={cta.target || '_self'}
                    rel={cta.target === '_blank' ? 'noopener noreferrer' : undefined}
                    style={buttonStyles}
                    className="px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-bold tracking-[0.18em] uppercase rounded-sm border transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] shadow-lg text-center"
                  >
                    {cta.text}
                  </a>
                );
              })}
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
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 transition-opacity opacity-70 hover:opacity-100 hover:scale-110 focus:outline-none"
          >
            <svg
              className="w-7 h-7 sm:w-10 sm:h-10 drop-shadow-md"
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
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 transition-opacity opacity-70 hover:opacity-100 hover:scale-110 focus:outline-none"
          >
            <svg
              className="w-7 h-7 sm:w-10 sm:h-10 drop-shadow-md"
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
          {mediaList.map((_, idx) => {
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
                className={`h-[2px] sm:h-[3px] transition-all duration-300 rounded-full focus:outline-none ${isSelected ? 'w-10 sm:w-14' : 'w-6 sm:w-8 hover:bg-white/60'
                  }`}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}