'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

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

export default function Layout({
  autoSlide = true,
  interval = 5000,
  banner = []
}: BannerSectionProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // Drag & Swipe State
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const startXRef = useRef<number>(0);
  const currentXRef = useRef<number>(0);
  const isSwipingRef = useRef<boolean>(false);

  const totalSlides = banner.length;

  const handleNext = useCallback(() => {
    if (totalSlides <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    if (totalSlides <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto-slide Timer
  useEffect(() => {
    if (!autoSlide || totalSlides <= 1 || isHovered || isDragging) return;

    const timer = setInterval(() => {
      handleNext();
    }, interval || 5000);

    return () => clearInterval(timer);
  }, [autoSlide, interval, totalSlides, isHovered, isDragging, handleNext]);

  // Unified Mouse & Touch Gesture Handlers with Window Listeners
  const startDrag = (clientX: number) => {
    setIsDragging(true);
    isSwipingRef.current = false;
    startXRef.current = clientX;
    currentXRef.current = clientX;
  };

  const moveDrag = (clientX: number) => {
    if (!isDragging) return;
    currentXRef.current = clientX;
    const diff = currentXRef.current - startXRef.current;

    if (Math.abs(diff) > 8) {
      isSwipingRef.current = true;
    }
    setDragOffset(diff);
  };

  const endDrag = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const diff = currentXRef.current - startXRef.current;
    const threshold = 50;

    if (diff < -threshold) {
      handleNext();
    } else if (diff > threshold) {
      handlePrev();
    }

    setDragOffset(0);
  };

  // Attach global window listeners when dragging so fast movements never get stuck
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        moveDrag(e.clientX);
      }
    };

    const handleGlobalMouseUp = () => {
      if (isDragging) {
        endDrag();
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    if ((e.target as HTMLElement).closest('button')) return;
    startDrag(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    startDrag(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    moveDrag(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    endDrag();
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    if (isSwipingRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  if (!banner || banner.length === 0) {
    return null;
  }

  const isVideo = (url: string) => {
    return /\.(mp4|webm|ogg|mov)$/i.test(url);
  };

  return (
    <section
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDragStart={(e) => e.preventDefault()}
      style={{
        backgroundColor: 'var(--color-background)',
        color: 'var(--color-text)'
      }}
      className="relative w-full overflow-hidden select-none"
    >
      {/* ── 1. Full-Height Responsive Slide Viewport with Seamless Drag Track ── */}
      <div
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
          transition: isDragging
            ? 'none'
            : 'transform 600ms cubic-bezier(0.25, 1, 0.5, 1)',
          touchAction: 'pan-y'
        }}
        className={`flex w-full select-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        {banner.map((item, index) => (
          <div
            key={index}
            style={{ backgroundColor: 'var(--color-surface-lighter)' }}
            className="relative w-full flex-shrink-0 h-[340px] sm:h-[460px] md:h-[540px] lg:h-[620px] xl:h-[680px] overflow-hidden select-none"
          >
            {/* Entire Slide is Clickable */}
            <a
              href={item.cta_link || '#'}
              onClick={handleLinkClick}
              draggable={false}
              className="block w-full h-full relative focus:outline-none select-none"
              aria-label={item.title || item.subtitle || `Hero Slide ${index + 1}`}
            >
              {isVideo(item.media) ? (
                <video
                  src={item.media}
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                  draggable={false}
                  className="w-full h-full object-cover object-center pointer-events-none select-none"
                />
              ) : (
                <img
                  src={item.media}
                  alt={item.title || item.subtitle || 'Promotional Banner'}
                  draggable={false}
                  className="w-full h-full object-cover object-center pointer-events-none select-none"
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              )}
            </a>

            {/* Video Sound Toggle Button */}
            {isVideo(item.media) && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsMuted(!isMuted);
                }}
                style={{
                  backgroundColor: 'var(--color-surface-contrast)',
                  color: 'var(--color-primary-contrast)'
                }}
                className="absolute bottom-6 right-6 z-20 p-2.5 rounded-full hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-lg"
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 stroke-[2]" />
                ) : (
                  <Volume2 className="w-4 h-4 stroke-[2]" />
                )}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* ── 2. Centered Bottom Pagination Dots ── */}
      {totalSlides > 1 && (
        <div
          style={{ backgroundColor: 'var(--color-background)' }}
          className="w-full py-4 flex items-center justify-center gap-2 select-none"
        >
          {banner.map((_, dotIdx) => {
            const isActive = dotIdx === currentIndex;

            return (
              <button
                key={dotIdx}
                type="button"
                onClick={() => setCurrentIndex(dotIdx)}
                aria-label={`Go to slide ${dotIdx + 1}`}
                style={{
                  backgroundColor: isActive
                    ? 'var(--color-surface-contrast)'
                    : 'transparent',
                  borderColor: 'var(--color-surface-contrast)'
                }}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? 'w-2.5 h-2.5 scale-110'
                    : 'w-2 h-2 border hover:opacity-60'
                }`}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}