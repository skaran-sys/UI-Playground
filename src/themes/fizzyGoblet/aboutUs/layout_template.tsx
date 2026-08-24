"use client";

import React from 'react';

export type AboutUsProps = {
  config: {
    banner: string;
    story_line: {
      image: string;
      title: string;
      description: string;
      cta_text: string;
      cta_link: string;
    }[];
  };

  storeInfo: {
    name: string;
    email: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    contact: string;
    logo: string;
    business_category: string;
    tagline: string;
    short_description: string;
    existing_customers: number;
    rating: number;
  };
};

export default function AboutUsPage(props: AboutUsProps) {
  const { config, storeInfo } = props;
  const storyLines = config?.story_line || [];

  return (
    <main
      style={{
        backgroundColor: 'var(--color-surface-light)',
        color: 'var(--color-text)'
      }}
      className="w-full min-h-screen select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        
        {/* ── 1. Breadcrumbs ── */}
        <nav aria-label="Breadcrumb" className="mb-8 sm:mb-12">
          <ol className="flex items-center gap-2 text-xs sm:text-sm text-[var(--color-text-muted)]">
            <li>
              <a href="/" className="hover:text-[var(--color-text)] transition-colors">
                Home
              </a>
            </li>
            <li className="opacity-60">|</li>
            <li className="font-semibold text-[var(--color-text)]">
              Our Story
            </li>
          </ol>
        </nav>

        {/* ── 2. Hero Storyline Split ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center mb-16 sm:mb-24">
          
          {/* Left Narrative Column */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 pr-0 lg:pr-4">
            <h1
              style={{ color: 'var(--color-text)' }}
              className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight"
            >
              Hello, world.
            </h1>

            <div className="space-y-5 text-sm sm:text-base leading-relaxed text-[var(--color-text-muted)]">
              <p>
                {storeInfo?.short_description ||
                  "Fresh, fun, free-spirited—we are a designer footwear and accessories brand from India. We bring a modern twist to traditional Indian crafts and make everyday adventures extraordinary, one step at a time."}
              </p>
              <p>
                At {storeInfo?.name || "our brand"}, our goblet is always bubbling with ideas to bring you collections that are equal parts classic and cool. Each piece is designed with immense thought and detail to always be comfortable, versatile, and high on style.
              </p>
            </div>
          </div>

          {/* Right Hero Arch Framed Media */}
          {config?.banner && (
            <div className="lg:col-span-6 relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] overflow-hidden rounded-xs bg-[var(--color-surface-lighter)]">
              <img
                src={config.banner}
                alt="Brand Identity"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
                loading="lazy"
              />
            </div>
          )}
        </div>

        {/* ── 3. Alternating Story Lines ("WE STAND FOR" Blocks) ── */}
        {storyLines.length > 0 && (
          <div className="space-y-16 sm:space-y-24  py-16">
            {storyLines.map((line, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
                    isEven ? '' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Storyline Visual */}
                  <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-xs bg-[var(--color-surface-lighter)]">
                      <img
                        src={line.image}
                        alt={line.title}
                        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Storyline Content Block */}
                  <div className={`lg:col-span-5 space-y-4 sm:space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <span className="text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-[var(--color-text-muted)]">
                      WE STAND FOR
                    </span>

                    <h2
                      style={{ color: 'var(--color-text)' }}
                      className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight"
                    >
                      {line.title}
                    </h2>

                    <p
                      style={{ color: 'var(--color-text-muted)' }}
                      className="text-sm sm:text-base font-normal leading-relaxed"
                    >
                      {line.description}
                    </p>

                    {line.cta_text && (
                      <div className="pt-2">
                        <a
                          href={line.cta_link || '#'}
                          style={{
                            backgroundColor: 'var(--color-primary)',
                            color: 'var(--color-primary-contrast)'
                          }}
                          className="inline-flex items-center justify-center px-8 py-3 text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-xs transition-opacity duration-200 hover:opacity-90 active:scale-95 shadow-sm"
                        >
                          {line.cta_text}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </main>
  );
}