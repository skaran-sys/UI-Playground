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
  // Support both direct props and nested config structures
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

  return (
    <section
      id={layout_id}
      style={{
        backgroundColor: 'var(--color-surface-light)',
        color: 'var(--color-text)'
      }}
      className="w-full py-6 select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Change md:grid-cols-2 to md:grid-cols-10 */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-8 items-center">

          {/* 2. Add md:col-span-7 (70%) to the Left Media Wrapper */}
          {media && (
            <div className="md:col-span-6 relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-square lg:aspect-[4/3] overflow-hidden rounded-xs bg-[var(--color-surface-lighter)]">
              <img
                src={media}
                alt={title || "Brand Story"}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out hover:scale-100"
                loading="lazy"
              />
            </div>
          )}

          {/* 3. Add md:col-span-3 (30%) to the Right Content Wrapper */}
          <div className="md:col-span-4 flex flex-col items-start justify-center md:pl-4 lg:pl-8 space-y-4 sm:space-y-6">
            {title && (
              <h2
                style={{ color: 'var(--color-text)' }}
                className="text-3xl sm:text-4xl  font-serif font-bold tracking-tight leading-tight"
              >
                {title}
              </h2>
            )}

            {description && (
              <p
                style={{ color: 'var(--color-text-muted)' }}
                className="text-sm  font-normal leading-relaxed max-w-md"
              >
                {description}
              </p>
            )}

            {button_text && (
              <div className="pt-2">
                <a
                  href={button_link || '#'}
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-primary-contrast)'
                  }}
                  className="inline-flex items-center justify-center px-8 sm:px-10 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-xs transition-opacity duration-200 hover:opacity-90 active:scale-95 shadow-sm text-center"
                >
                  {button_text}
                </a>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}