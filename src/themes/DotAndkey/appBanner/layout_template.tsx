'use client';

import React from 'react';

export interface AppPlatformItem {
  id: string;
  name: 'ios' | 'android' | 'app_store' | 'google_play' | string;
  url: string;
  label?: string;
  badge_image?: string;
}

export interface AppBannerDecorations {
  bottom_left_image?: string;
  top_right_image?: string;
}

export interface AppBannerConfig {
  layout_id: string;
  show_decorations?: boolean;
}

export interface AppBannerProps {
  title: string;
  subtitle?: string;
  platforms: AppPlatformItem[];
  decorations?: AppBannerDecorations;
  config?: AppBannerConfig;
}

/* ── App Store Vector Badge ── */
function AppStoreBadge() {
  return (
    <svg
      viewBox="0 0 135 40"
      className="h-10 w-auto rounded-md shadow-xs transition-transform hover:scale-105 active:scale-95 flex-shrink-0"
      aria-label="Download on the App Store"
    >
      <rect width="135" height="40" rx="6" fill="#000000" />
      {/* Apple Logo */}
      <path
        d="M22.5 19.3c0-2.5 2-3.8 2.1-3.9-1.2-1.7-3-2-3.7-2-1.5-.2-3 .9-3.8.9-.8 0-2-.9-3.3-.9-1.7 0-3.3 1-4.2 2.5-1.8 3.1-.5 7.8 1.3 10.3.9 1.3 1.9 2.6 3.2 2.5 1.3-.1 1.8-.8 3.4-.8 1.6 0 1.9.8 3.3.8 1.4 0 2.2-1.3 3.1-2.5 1-1.5 1.4-2.9 1.5-3-.1 0-2.9-1.1-2.9-3.9zm-2.3-7.3c.7-.9 1.2-2 1-3.2-1 .1-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.4 2.9-1.3z"
        fill="#FFFFFF"
      />
      {/* Text */}
      <text
        x="36"
        y="14"
        fill="#FFFFFF"
        fontSize="6.5"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      >
        Download on the
      </text>
      <text
        x="36"
        y="27"
        fill="#FFFFFF"
        fontSize="12"
        fontWeight="600"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      >
        App Store
      </text>
    </svg>
  );
}

/* ── Google Play Vector Badge (Full ViewBox with No Truncation) ── */
function GooglePlayBadge() {
  return (
    <svg
      viewBox="0 0 145 40"
      className="h-10 w-auto rounded-md shadow-xs transition-transform hover:scale-105 active:scale-95 flex-shrink-0"
      aria-label="Get it on Google Play"
    >
      <rect width="145" height="40" rx="6" fill="#000000" />
      {/* Official Google Play Logo */}
      <g transform="translate(12, 8)">
        <path
          d="M1.3 0.9C1 1.2 0.8 1.8 0.8 2.5v19c0 .7.2 1.3.5 1.6l.1.1 10.6-10.6v-.3L1.3.9z"
          fill="#00E5FF"
        />
        <path
          d="M15.5 16.2l-3.5-3.5v-.3L12 12.4l3.5-3.5.1.1 4.2 2.4c1.2.7 1.2 1.8 0 2.5l-4.3 2.3z"
          fill="#FFD600"
        />
        <path
          d="M12 12.4L1.3 23.2c.4.4 1 .5 1.8.1l12.4-7-3.5-3.9z"
          fill="#FF3D00"
        />
        <path
          d="M12 12.4L15.5 8.9 3.1 1.9C2.3 1.5 1.7 1.6 1.3 2L12 12.4z"
          fill="#00E676"
        />
      </g>
      {/* Text */}
      <text
        x="40"
        y="14"
        fill="#FFFFFF"
        fontSize="6.5"
        letterSpacing="0.4"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      >
        GET IT ON
      </text>
      <text
        x="40"
        y="27"
        fill="#FFFFFF"
        fontSize="12"
        fontWeight="600"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      >
        Google Play
      </text>
    </svg>
  );
}

export default function Layout({
  title,
  subtitle,
  platforms = [],
  decorations,
  config
}: AppBannerProps) {
  const showDecorations = config?.show_decorations !== false;

  return (
    <div className="relative w-full my-8 select-none">
      <section
        style={{
          background:
            'linear-gradient(90deg, var(--color-surface, #FFF0F5) 0%, var(--color-primary-lighter, #FBD5E3) 50%, var(--color-primary-light, #F14D82) 100%)'
        }}
        className="relative w-full py-9 sm:py-11 px-4 sm:px-8 overflow-visible"
      >
        {/* ── 1. Floating Corner Platform Images (Overflows Outside Container Box) ── */}
        {showDecorations && (
          <>
            {/* Bottom-Left Mobile / iOS Experience App Cutout */}
            {decorations?.bottom_left_image && (
              <div className="absolute -bottom-10 left-8 sm:left-8 lg:left-28 w-20 sm:w-28 md:w-32 z-20 pointer-events-none transition-transform duration-300">
                <img
                  src={decorations.bottom_left_image}
                  alt="iOS App Experience"
                  draggable={false}
                  className="w-full h-auto object-contain rounded-xl shadow-xl transform -rotate-12 border-2 border-white/80"
                />
              </div>
            )}

            {/* Top-Right Mobile / Android Experience App Cutout */}
            {decorations?.top_right_image && (
              <div className="absolute -top-10 right-8 sm:right-8 lg:right-28 w-20 sm:w-28 md:w-28 z-20 pointer-events-none transition-transform duration-300">
                <img
                  src={decorations.top_right_image}
                  alt="Android App Experience"
                  draggable={false}
                  className="w-full h-auto object-contain rounded-xl shadow-xl transform rotate-12 border-2 border-white/80"
                />
              </div>
            )}
          </>
        )}

        {/* ── 2. Centered Content (Title, Subtitle, App Store Buttons) ── */}
        <div className="max-w-xl mx-auto flex flex-col items-center justify-center text-center relative z-10">
          {title && (
            <h2
              style={{ color: 'var(--color-text, #1A0E14)' }}
              className="text-2xl sm:text-[26px] font-semibold tracking-normal leading-tight"
            >
              {title}
            </h2>
          )}

          {subtitle && (
            <p
              style={{ color: 'var(--color-text, #1A0E14)' }}
              className="text-xs sm:text-sm font-normal mt-1.5 opacity-90 tracking-wide"
            >
              {subtitle}
            </p>
          )}

          {/* Platform Download Action Buttons */}
          {platforms && platforms.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-5">
              {platforms.map((platform) => {
                const isApple =
                  platform.name === 'ios' ||
                  platform.name === 'app_store' ||
                  platform.id.includes('apple') ||
                  platform.id.includes('ios');

                return (
                  <a
                    key={platform.id}
                    href={platform.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block focus:outline-none"
                    aria-label={platform.label || platform.name}
                  >
                    {platform.badge_image ? (
                      <img
                        src={platform.badge_image}
                        alt={platform.label || platform.name}
                        className="h-10 w-auto rounded-md shadow-xs transition-transform hover:scale-105 active:scale-95"
                      />
                    ) : isApple ? (
                      <AppStoreBadge />
                    ) : (
                      <GooglePlayBadge />
                    )}
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}