'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

/* ── 1. Strict Schema Types ── */
export interface ConfigType {
  layout_id: string;
  [key: string]: any;
}

export type Item = {
  id: string;
  image: string;
  hover_image: string;
  title: string;
  subtitle: string;
  link?: string;
};

export interface Config extends ConfigType {
  title: string;
  view_all_text: string;
  link: string;
  cta_label: string;
  show_header: boolean;
  show_add_to_cart: boolean;
  show_wishlist: boolean;
  show_rating: boolean;
  overflow?: "carousel" | "grid" | string;
  header_size?: "small" | "medium" | "large" | "extra-large";
  header_alignment?: "left" | "center";
  card_size?: "small" | "medium" | "large";
}

export interface CollectionProps {
  config: Config;
}

export interface CollectionLayoutPropType {
  items?: Item[];
  config: Config;
  isLoading: boolean;
}

/* ── 2. Component Implementation ── */
export default function Layout({
  items = [],
  config,
  isLoading = false
}: CollectionLayoutPropType) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Drag-to-Scroll State
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const startXRef = useRef<number>(0);
  const scrollLeftRef = useRef<number>(0);
  const hasDraggedRef = useRef<boolean>(false);

  // Pointer & Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
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

  // Prevent Navigation If User Was Swiping/Dragging
  const handleLinkClick = (e: React.MouseEvent) => {
    if (hasDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  // Global Listeners For Smooth Mouse Release Outside Container
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, [isDragging]);

  if (isLoading) {
    return (
      <div
        style={{ color: 'var(--color-text-muted)' }}
        className="w-full py-16 flex justify-center text-sm font-medium"
      >
        Loading ranges...
      </div>
    );
  }

  if (!items || items.length === 0) return null;

  return (
    <section
      style={{ backgroundColor: 'var(--color-background)' }}
      className="w-full py-12 px-4 sm:px-6 lg:px-12 select-none overflow-hidden"
    >
      <div className="max-w-[1380px] mx-auto">
        
        {/* ── Section Title ── */}
        {config?.show_header !== false && config?.title && (
          <div
            className={`mb-8 ${
              config.header_alignment === 'left' ? 'text-left' : 'text-center'
            }`}
          >
            <h2
              style={{ color: 'var(--color-text)' }}
              className="text-2xl sm:text-4xl font-bold tracking-tight"
            >
              {config.title}
            </h2>
          </div>
        )}

        {/* ── Drag-to-Scroll Carousel Track (Exactly 4 Visible in Desktop Row) ── */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`flex gap-5 sm:gap-6 overflow-x-auto pb-4 pt-2 px-1 scrollbar-none snap-x snap-mandatory ${
            isDragging ? 'cursor-grabbing select-none' : 'cursor-grab scroll-smooth'
          }`}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="snap-start flex-shrink-0 w-[78%] sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)]"
            >
              <a
                href={item.link || '#'}
                onClick={handleLinkClick}
                draggable={false}
                style={{
                  backgroundColor: 'var(--color-surface-lighter)',
                  borderColor: 'var(--color-border)'
                }}
                className="group relative block aspect-square w-full rounded-2xl overflow-hidden border shadow-xs hover:shadow-md transition-all duration-300 focus:outline-none"
              >
                {/* Category Range Artwork */}
                <img
                  src={item.image}
                  alt={item.title}
                  draggable={false}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                  loading="lazy"
                />

                {/* Dark Gradient Scrim For Text Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

                {/* Bottom Title & Chevron Action */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex items-end justify-between gap-3 pointer-events-none">
                  <div className="max-w-[78%]">
                    {item.subtitle && (
                      <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white/80 block mb-0.5 truncate">
                        {item.subtitle}
                      </span>
                    )}
                    <h3 className="text-white text-base sm:text-lg font-bold leading-tight drop-shadow-sm line-clamp-2">
                      {item.title}
                    </h3>
                  </div>

                  {/* Lucide Circular Next Arrow */}
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 backdrop-blur-xs border border-white/50 flex items-center justify-center text-white flex-shrink-0 group-hover:bg-white group-hover:text-black group-hover:scale-110 transition-all duration-300 shadow-sm">
                    <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}