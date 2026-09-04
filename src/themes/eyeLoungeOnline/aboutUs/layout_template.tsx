'use client';

import React from 'react';

/* ── 1. Schema Types ── */
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

/* ── 2. Helper: Parse Multi-Line Heading (Eyebrow + Title) ── */
function renderHeaderBlock(rawTitle: string) {
  const parts = rawTitle.split('\n');
  if (parts.length > 1) {
    return (
      <div className="space-y-1 mb-4 sm:mb-6">
        <span
          style={{ color: 'var(--color-text-muted, #666666)' }}
          className="text-xs sm:text-sm font-medium tracking-wide block"
        >
          {parts[0]}
        </span>
        <h2
          style={{ color: 'var(--color-text, #111111)' }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight"
        >
          {parts.slice(1).join(' ')}
        </h2>
      </div>
    );
  }

  return (
    <h2
      style={{ color: 'var(--color-text, #111111)' }}
      className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 sm:mb-6"
    >
      {rawTitle}
    </h2>
  );
}

/* ── 3. Helper: Overlapping Portraits Visual ── */
function OverlappingPortraits({ images }: { images: string[] }) {
  const [first, second] = images;

  return (
    <div className="relative w-full max-w-[480px] h-[360px] sm:h-[440px] md:h-[480px] mx-auto select-none">
      {/* Primary Top-Left Portrait */}
      {first && (
        <div className="absolute top-0 left-0 w-[68%] h-[72%] rounded-3xl overflow-hidden shadow-sm bg-neutral-100">
          <img
            src={first}
            alt="Eye Lounge Heritage"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>
      )}

      {/* Secondary Bottom-Right Overlapping Portrait */}
      {second && (
        <div className="absolute bottom-0 right-0 w-[72%] h-[72%] rounded-3xl overflow-hidden shadow-lg border-4 border-white bg-neutral-100 z-10">
          <img
            src={second}
            alt="Eye Lounge Collection"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}

/* ── 4. Helper: Store Interior Showcase Collage ── */
function MosaicShowcase({ images }: { images: string[] }) {
  if (images.length === 1) {
    return (
      <div className="w-full h-[320px] sm:h-[420px] rounded-3xl overflow-hidden bg-neutral-100">
        <img
          src={images[0]}
          alt="Eye Lounge Store"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-[560px] mx-auto space-y-3 sm:space-y-4 select-none">
      {/* Large Top Showroom Visual */}
      {images[0] && (
        <div className="w-full h-[180px] sm:h-[230px] rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-100 shadow-xs">
          <img
            src={images[0]}
            alt="Store Showroom"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>
      )}

      {/* Two Bottom Examination & Boutique Tiles */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {images[1] && (
          <div className="w-full h-[120px] sm:h-[160px] rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-100 shadow-xs">
            <img
              src={images[1]}
              alt="Consultation Space"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>
        )}
        {images[2] && (
          <div className="w-full h-[120px] sm:h-[160px] rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-100 shadow-xs">
            <img
              src={images[2]}
              alt="Eye Examination Clinic"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </div>
  );
}

/* ── 5. Main Component ── */
export default function Layout({ config, storeInfo }: AboutUsProps) {
  const storyLines = config?.story_line || [];
  const aboutSection = storyLines[0];
  const missionSection = storyLines[1];
  const pillarSections = storyLines.slice(2);

  const bannerText = config?.banner || "ABOUT US";
  const quoteText = storeInfo?.short_description || storeInfo?.tagline;

  return (
    <div
      style={{
        backgroundColor: 'var(--color-background, #FFFFFF)'
      }}
      className="w-full"
    >
      {/* ── Top Clean Headline Bar ── */}
      <header className="w-full py-10 sm:py-16 bg-(--color-surface) text-center">
        <h1
          style={{ color: 'var(--color-text, #111111)' }}
          className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-[0.2em] uppercase"
        >
          {bannerText}
        </h1>
      </header>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-12 sm:py-20 space-y-20 sm:space-y-28">
        
        {/* ── SECTION 1: About Us (Overlapping Images on Left, Text on Right) ── */}
        {aboutSection && (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              {aboutSection.image && (
                <OverlappingPortraits
                  images={aboutSection.image.split(',').map((url) => url.trim())}
                />
              )}
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-center text-left">
              {renderHeaderBlock(aboutSection.title)}

              <div className="space-y-4">
                {aboutSection.description.split('\n\n').map((paragraph, pIdx) => (
                  <p
                    key={pIdx}
                    style={{ color: 'var(--color-text-muted, #555555)' }}
                    className="text-xs sm:text-[13px] md:text-sm font-normal leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {aboutSection.cta_text && (
                <div className="pt-6">
                  <a
                    href={aboutSection.cta_link || '#'}
                    style={{
                      backgroundColor: 'var(--color-primary, #000000)',
                      color: 'var(--color-primary-contrast, #FFFFFF)'
                    }}
                    className="inline-block px-8 py-3 rounded-full text-xs font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity"
                  >
                    {aboutSection.cta_text}
                  </a>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── SECTION 2: Our Mission (Text on Left, Mosaic Grid on Right) ── */}
        {missionSection && (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-6 flex flex-col justify-center text-left">
              {renderHeaderBlock(missionSection.title)}

              <div className="space-y-4">
                {missionSection.description.split('\n\n').map((paragraph, pIdx) => (
                  <p
                    key={pIdx}
                    style={{ color: 'var(--color-text-muted, #555555)' }}
                    className="text-xs sm:text-[13px] md:text-sm font-normal leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {missionSection.cta_text && (
                <div className="pt-6">
                  <a
                    href={missionSection.cta_link || '#'}
                    style={{
                      backgroundColor: 'var(--color-primary, #000000)',
                      color: 'var(--color-primary-contrast, #FFFFFF)'
                    }}
                    className="inline-block px-8 py-3 rounded-full text-xs font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity"
                  >
                    {missionSection.cta_text}
                  </a>
                </div>
              )}
            </div>

            <div className="lg:col-span-6">
              {missionSection.image && (
                <MosaicShowcase
                  images={missionSection.image.split(',').map((url) => url.trim())}
                />
              )}
            </div>
          </section>
        )}

        {/* ── SECTION 3: 4 Core Feature Pillars (2x2 Grid) ── */}
        {pillarSections.length > 0 && (
          <section className="pt-4 sm:pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 lg:gap-y-12">
              {pillarSections.map((pillar, idx) => {
                const isSecondRow = idx >= 2;

                return (
                  <div
                    key={idx}
                    className={`flex flex-col space-y-2 text-left ${
                      isSecondRow ? 'md:border-t md:border-neutral-200 md:pt-8' : ''
                    }`}
                  >
                    <h3
                      style={{ color: 'var(--color-text, #111111)' }}
                      className="text-sm sm:text-base md:text-lg font-bold tracking-tight"
                    >
                      {pillar.title}
                    </h3>
                    <p
                      style={{ color: 'var(--color-text-muted, #555555)' }}
                      className="text-xs sm:text-[13px] md:text-sm font-normal leading-relaxed"
                    >
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ── SECTION 4: Brand Philosophy Quote Box ── */}
        {quoteText && (
          <section
            style={{
              backgroundColor: 'var(--color-surface, #F6F6F6)'
            }}
            className="w-full p-6 sm:p-10 md:p-12 rounded-sm flex items-start gap-4 sm:gap-6 text-left"
          >
            {/* Elegant Quotation Mark Glyphs */}
            <span
              style={{ color: 'var(--color-text-muted, #888888)' }}
              className="font-serif text-3xl sm:text-5xl font-black leading-none select-none flex-shrink-0"
              aria-hidden="true"
            >
              “
            </span>

            <p
              style={{ color: 'var(--color-text-muted, #555555)' }}
              className="italic text-xs sm:text-sm md:text-[15px] font-normal leading-relaxed pt-0.5 sm:pt-1"
            >
              {quoteText}
            </p>
          </section>
        )}

      </div>
    </div>
  );
}