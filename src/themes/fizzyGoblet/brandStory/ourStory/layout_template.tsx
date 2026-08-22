"use client";

import React from 'react';

export interface ConfigType {
  layout_id: string;
  [key: string]: any;
}

export interface ComponentPropType {
  config: ConfigType;
}

export interface LayoutPropType extends ConfigType {
  title?: string;
  description?: string;
  media?: string;
  button_text?: string;
  button_link?: string;
}

export default function Layout(props: LayoutPropType | ComponentPropType) {
  const config = 'config' in props ? (props.config as LayoutPropType) : (props as LayoutPropType);

  const {
    layout_id,
    title,
    description,
    media,
    button_text,
    button_link
  } = config || {};

  if (!media && !title && !description && !button_text) {
    return null;
  }

  // Parses comma-separated images or uses secondary fallback if dual media is supplied
  const mediaList = media ? media.split(',').map((img) => img.trim()).filter(Boolean) : [];
  const firstImage = mediaList[0] || media;
  const secondImage = mediaList[1] || mediaList[0] || media;

  return (
    <section
      id={layout_id}
      style={{
        backgroundColor: 'var(--color-surface-light)',
        color: 'var(--color-text)'
      }}
      className="w-full py-6 select-none"
    >
      <div className="mx-auto px-8">
        
        {/* ── 1. Top Centered Header & Narrative ── */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3 sm:space-y-4">
          {title && (
            <h2
              style={{ color: 'var(--color-text)' }}
              className="text-3xl sm:text-4xl font-serif font-bold tracking-tight"
            >
              {title}
            </h2>
          )}

          {description && (
            <p
              style={{ color: 'var(--color-text-muted)' }}
              className="text-xs sm:text-sm md:text-base font-normal leading-relaxed max-w-2xl mx-auto"
            >
              {description}
            </p>
          )}
        </div>

        {/* ── 2. Dual Showcase Imagery ── */}
        {(firstImage || secondImage) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-10 sm:mb-14">
            {firstImage && (
              <div className="relative w-full aspect-[4/5] sm:aspect-[4/3] md:aspect-[4/4] overflow-hidden rounded-xs bg-[var(--color-surface-lighter)]">
                <img
                  src={firstImage}
                  alt={title || "Brand Story Highlight"}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
                  loading="lazy"
                />
              </div>
            )}

            {secondImage && (
              <div className="relative w-full aspect-[4/5] sm:aspect-[4/3] md:aspect-[4/4] overflow-hidden rounded-xs bg-[var(--color-surface-lighter)]">
                <img
                  src={secondImage}
                  alt={title || "Craftsmanship Highlight"}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        )}

        {/* ── 3. Centered Action Button ── */}
        {button_text && (
          <div className="text-center">
            <a
              href={button_link || '#'}
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-primary-contrast)'
              }}
              className="inline-flex items-center justify-center px-10 sm:px-12 py-3.5 text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-xs transition-opacity duration-200 hover:opacity-90 active:scale-95 shadow-sm text-center"
            >
              {button_text}
            </a>
          </div>
        )}

      </div>
    </section>
  );
}