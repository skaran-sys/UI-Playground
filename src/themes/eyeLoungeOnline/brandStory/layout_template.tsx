'use client';

import React from 'react';

/* ── 1. Schema Types ── */
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

/* ── 2. Brand Story Component ── */
export default function Layout(props: LayoutPropType) {
  const {
    title = "Vision Beyond Limits\nExperience Uncompromising\nQuality and Style.",
    description,
    media,
    button_text = "BUY NOW",
    button_link = "/collections/all"
  } = props;

  return (
    <section
      style={{
        backgroundColor: 'var(--color-background, #FFFFFF)'
      }}
      className="relative w-full overflow-hidden select-none"
    >
      {/* ── Subtle Topographic / Contour Wave Line SVG Overlay ── */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06] stroke-black"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <path d="M-100 120 C 300 240, 800 40, 1600 160" strokeWidth="1.2" />
        <path d="M-100 240 C 350 360, 750 140, 1600 280" strokeWidth="1.2" />
        <path d="M-100 360 C 400 480, 700 240, 1600 400" strokeWidth="1.2" />
        <path d="M-100 480 C 450 600, 650 340, 1600 520" strokeWidth="1.2" />
      </svg>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 py-10 sm:py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ── Left Content Column ── */}
          <div className="md:col-span-7 flex flex-col justify-center items-start space-y-6 sm:space-y-8 pr-0 lg:pr-8">
            {title && (
              <h2
                style={{ color: 'var(--color-text, #111111)' }}
                className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-normal leading-[1.25] tracking-tight whitespace-pre-line text-left"
              >
                {title}
              </h2>
            )}

            {description && (
              <p
                style={{ color: 'var(--color-text-muted, #666666)' }}
                className="text-xs sm:text-sm md:text-base font-light max-w-lg leading-relaxed text-left"
              >
                {description}
              </p>
            )}

            {button_text && (
              <div className="pt-2">
                <a
                  href={button_link || '#'}
                  style={{
                    borderColor: 'var(--color-primary, #000000)',
                  }}
                  className="inline-block px-8 sm:px-10 py-2.5 sm:py-3 rounded-full border text-xs sm:text-[13px] font-semibold tracking-[0.14em] uppercase transition-all duration-300 hover:bg-black hover:text-(--color-text-inverse) active:scale-95 cursor-pointer shadow-2xs"
                >
                  {button_text}
                </a>
              </div>
            )}
          </div>

          {/* ── Right Portrait Media Column ── */}
          <div className="md:col-span-5 flex items-center justify-center md:justify-end">
            <div className="relative w-full max-w-[480px] aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] overflow-hidden">
              {media ? (
                <img
                  src={media}
                  alt={title ? title.replace('\n', ' ') : 'Brand Showcase'}
                  className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-103"
                  loading="lazy"
                />
              ) : (
                <div
                  style={{
                    backgroundColor: 'var(--color-surface, #F5F5F5)',
                    color: 'var(--color-text-muted, #666666)'
                  }}
                  className="w-full h-full flex items-center justify-center text-xs tracking-wider uppercase"
                >
                  Media placeholder
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}