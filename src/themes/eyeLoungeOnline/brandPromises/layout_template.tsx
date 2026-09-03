'use client';

import React from 'react';
import { Truck, Heart, SquareCheck } from 'lucide-react';

/* ── 1. Schema Types ── */
export interface ConfigType {
  layout_id: string;
  [key: string]: any;
}

export interface BrandPromiseItem {
  id: string;
  title: string;
  subtitle?: string;
  icon?: 'shipping' | 'authenticity' | 'service' | string;
  image?: string;
  link?: string;
}

export interface BrandPromiseConfig extends ConfigType {
  title?: string;
  show_header?: boolean;
}

export interface BrandPromiseProps {
  config: BrandPromiseConfig;
  items: BrandPromiseItem[];
  isLoading?: boolean;
}

/* ── 2. Icon Resolver ── */
function PromiseIcon({ icon, image, title }: { icon?: string; image?: string; title: string }) {
  if (image) {
    return (
      <img
        src={image}
        alt={title}
        className="w-9 h-9 sm:w-10 sm:h-10 object-contain"
        loading="lazy"
      />
    );
  }

  const normalizedIcon = icon?.toLowerCase().trim();

  switch (normalizedIcon) {
    case 'shipping':
    case 'delivery':
    case 'truck':
      return <Truck className="w-8 h-8 sm:w-9 sm:h-9 stroke-[1.2]" />;
    case 'authenticity':
    case 'genuine':
    case 'heart':
      return <Heart className="w-8 h-8 sm:w-9 sm:h-9 stroke-[1.2]" />;
    case 'service':
    case 'repairs':
    case 'check':
    case 'verified':
      return <SquareCheck className="w-8 h-8 sm:w-9 sm:h-9 stroke-[1.2]" />;
    default:
      return <SquareCheck className="w-8 h-8 sm:w-9 sm:h-9 stroke-[1.2]" />;
  }
}

/* ── 3. Main Brand Promises Component ── */
export default function Layout({
  items = [],
  config,
  isLoading = false
}: BrandPromiseProps) {
  if (isLoading) {
    return (
      <div
        style={{
          backgroundColor: 'var(--color-background, #FFFFFF)',
          color: 'var(--color-text-muted, #666666)'
        }}
        className="w-full py-16 flex items-center justify-center text-xs tracking-widest uppercase"
      >
        Loading promises...
      </div>
    );
  }

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section
      style={{
        backgroundColor: 'var(--color-background, #FFFFFF)'
      }}
      className="w-full py-12 sm:py-16 md:py-20 select-none"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20">
        
        {/* Optional Section Header */}
        {config?.show_header && config?.title && (
          <div className="mb-10 sm:mb-14 text-center">
            <h2
              style={{ color: 'var(--color-text, #111111)' }}
              className="text-lg sm:text-2xl font-bold tracking-[0.2em] uppercase"
            >
              {config.title}
            </h2>
          </div>
        )}

        {/* ── 3-Column Trust Badges Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8 lg:gap-16">
          {items.map((item) => {
            const ContentWrapper = item.link ? 'a' : 'div';

            return (
              <ContentWrapper
                key={item.id}
                href={item.link}
                className="group flex flex-col items-center text-center cursor-default transition-transform duration-300"
              >
                {/* Minimal Stroke Icon */}
                <div
                  style={{
                    color: 'var(--color-text, #111111)'
                  }}
                  className="mb-4 sm:mb-5 transition-transform duration-300 group-hover:scale-105"
                >
                  <PromiseIcon icon={item.icon} image={item.image} title={item.title} />
                </div>

                {/* Badge Title */}
                <h3
                  style={{
                    color: 'var(--color-text, #111111)'
                  }}
                  className="text-xs sm:text-[13px] md:text-sm font-bold tracking-[0.14em] uppercase mb-1.5"
                >
                  {item.title}
                </h3>

                {/* Badge Subtitle */}
                {item.subtitle && (
                  <p
                    style={{
                      color: 'var(--color-text-muted, #666666)'
                    }}
                    className="text-xs sm:text-[13px] font-normal tracking-wide"
                  >
                    {item.subtitle}
                  </p>
                )}
              </ContentWrapper>
            );
          })}
        </div>

      </div>
    </section>
  );
}