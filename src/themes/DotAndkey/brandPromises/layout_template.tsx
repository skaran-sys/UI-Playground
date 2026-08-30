'use client';

import React from 'react';
import { Heart, Sparkles, Sprout, TestTubes } from 'lucide-react';

/* ── 1. Schema Types ── */
export interface ConfigType {
  layout_id: string;
  [key: string]: any;
}

export interface BrandPromiseItem {
  id: string;
  title: string;
  subtitle?: string;
  icon?: 'cruelty_free' | 'clinically_tested' | 'plant_bio_actives' | string;
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

/* ── 2. Vector Icon Renderer ── */
const PromiseIcon = ({
  icon,
  image
}: {
  icon?: string;
  image?: string;
}) => {
  if (image) {
    return (
      <img
        src={image}
        alt=""
        className="w-7 h-7 object-contain"
        aria-hidden="true"
      />
    );
  }

  switch (icon) {
    case 'cruelty_free':
      return (
        <svg
          viewBox="0 0 32 32"
          className="w-6 h-6 fill-current"
          aria-hidden="true"
        >
          {/* Bunny & Heart Silhouette */}
          <path d="M25.5 6.5c-1.1 0-2.1.6-2.6 1.5-.5-.9-1.5-1.5-2.6-1.5-1.7 0-3 1.3-3 3 0 2.4 4.5 5.5 5.6 6.2.3.2.7.2 1 0 1.1-.7 5.6-3.8 5.6-6.2 0-1.7-1.3-3-3-3z" />
          <path d="M18.8 12.2c-.6-.4-1.3-.7-2.1-.9.4-1.8.8-4.4-.1-6.1-.9-1.8-2.7-2.1-3.6-1.5-1.4.9-1.2 3.8-.7 6-1.3.3-2.6.8-3.7 1.5-.9-1.9-1.9-4.1-3.3-4.5-1.2-.4-2.5.4-2.8 1.6-.5 2 .8 4.4 2 6.1-1.6 2-2.5 4.5-2.5 7.1 0 5.5 4.5 10 10 10 2.2 0 4.3-.7 6-2 1.3-.9 2.4-2.1 3.1-3.5 1-2.1.9-4.6-.3-6.6-.7-1.3-1.6-2.4-2.7-3.2z" />
        </svg>
      );

    case 'clinically_tested':
      return (
        <svg
          viewBox="0 0 32 32"
          className="w-6 h-6 fill-current"
          aria-hidden="true"
        >
          {/* Test Tube with Lens / Molecule */}
          <path d="M22 4h-6v2h1v10.2l-6.8 11.3c-.8 1.3.1 3 1.7 3h16.2c1.6 0 2.5-1.7 1.7-3L23 16.2V6h1V4h-2zm-3 14l4.2 7H8.8l4.2-7h6z" />
          <circle cx="10" cy="10" r="3" />
          <path d="M12.5 11.5l3 3" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );

    case 'plant_bio_actives':
      return (
        <svg
          viewBox="0 0 32 32"
          className="w-6 h-6 fill-current"
          aria-hidden="true"
        >
          {/* Beaker with Sprouting Leaves */}
          <path d="M16 10c0-3.3 2.7-6 6-6 0 3.3-2.7 6-6 6z" />
          <path d="M16 10c0-3.3-2.7-6-6-6 0 3.3 2.7 6 6 6z" />
          <path d="M15 11v4.2l-5.8 9.6c-.8 1.3.1 3 1.7 3h10.2c1.6 0 2.5-1.7 1.7-3L17 15.2V11h-2z" />
        </svg>
      );

    default:
      return <Sparkles className="w-5 h-5 stroke-[2.2]" />;
  }
};

/* ── 3. Main Brand Promises Component ── */
export default function Layout({
  config,
  items = [],
  isLoading = false
}: BrandPromiseProps) {
  if (isLoading) {
    return (
      <div className="w-full py-8 flex justify-center text-xs text-[var(--color-text-muted)] font-medium">
        Loading commitments...
      </div>
    );
  }

  if (!items || items.length === 0) return null;

  return (
    <section
      style={{ backgroundColor: 'var(--color-background)' }}
      className="w-full py-7 sm:py-9 px-4 sm:px-8 border-y border-[var(--color-border)] select-none"
    >
      <div className="max-w-6xl mx-auto">
        {/* Optional Section Title */}
        {config?.show_header && config?.title && (
          <h2
            style={{ color: 'var(--color-text)' }}
            className="text-center text-xl font-bold mb-6 tracking-tight"
          >
            {config.title}
          </h2>
        )}

        {/* Responsive Grid / Flex Strip */}
        <div className="flex flex-wrap items-center justify-around gap-6 sm:gap-8 lg:gap-12">
          {items.map((item) => {
            const Content = (
              <div className="flex items-center gap-3.5 group cursor-default">
                {/* Circular Soft-Pink Badge */}
                <div
                  style={{
                    backgroundColor: 'var(--color-surface, #FFE7EE)',
                    color: 'var(--color-primary, #EC1E63)'
                  }}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105 shadow-2xs"
                >
                  <PromiseIcon icon={item.icon} image={item.image} />
                </div>

                {/* Title & Subtitle */}
                <div className="flex flex-col">
                  <span
                    style={{ color: 'var(--color-text)' }}
                    className="text-sm sm:text-[20px] font-semibold tracking-normal leading-tight"
                  >
                    {item.title}
                  </span>
                  {item.subtitle && (
                    <span
                      style={{ color: 'var(--color-text-muted)' }}
                      className="text-xs font-normal mt-0.5"
                    >
                      {item.subtitle}
                    </span>
                  )}
                </div>
              </div>
            );

            return item.link ? (
              <a
                key={item.id}
                href={item.link}
                className="focus:outline-none hover:opacity-90 transition-opacity"
              >
                {Content}
              </a>
            ) : (
              <div key={item.id}>{Content}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}