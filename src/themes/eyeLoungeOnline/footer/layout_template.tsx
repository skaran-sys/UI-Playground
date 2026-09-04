'use client';

import React from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';

/* ── 1. Strict Schema Contract ── */
export interface FooterBrand {
  name: string;
  logo?: string;
  description?: string;
}

export interface FooterLinkItem {
  label: string;
  url: string;
}

export interface FooterSection {
  title: string;
  items: FooterLinkItem[];
}

export interface FooterSocialLink {
  name: string;
  url: string;
  icon: any;
}

export interface FooterPolicy {
  label: string;
  url: string;
}

export interface FooterPayments {
  enabled?: boolean;
  icons?: string[];
}

export interface FooterProps {
  background_image?: string;
  brand: FooterBrand;
  sections?: FooterSection[];
  socialLinks?: FooterSocialLink[];
  payments?: FooterPayments;
  policies?: FooterPolicy[];
  copyright_text?: string;
  newsletter_title?: string;
  newsletter_placeholder?: string;
  newsletter_button_text?: string;
}

/* ── 2. Contact Icon Resolver ── */
function resolveItemIcon(url: string, label: string) {
  const cleanUrl = url.toLowerCase();
  const cleanLabel = label.toLowerCase();

  if (cleanUrl.startsWith('mailto:') || cleanLabel.includes('@')) {
    return <Mail className="w-4 h-4 flex-shrink-0 stroke-[1.5] mt-0.5 text-neutral-400" />;
  }
  if (cleanUrl.startsWith('tel:') || cleanLabel.startsWith('+')) {
    return <Phone className="w-4 h-4 flex-shrink-0 stroke-[1.5] mt-0.5 text-neutral-400" />;
  }
  if (
    cleanUrl.includes('maps') ||
    cleanLabel.includes('lounge') ||
    cleanLabel.includes('sco-') ||
    cleanLabel.includes('punjab')
  ) {
    return <MapPin className="w-4 h-4 flex-shrink-0 stroke-[1.5] mt-0.5 text-neutral-400" />;
  }
  return null;
}

/* ── 3. Social Icon Resolver ── */
function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function resolveSocialIcon(social: FooterSocialLink) {
  if (typeof social.icon === 'object' && React.isValidElement(social.icon)) {
    return social.icon;
  }
  const name = (social.name || '').toLowerCase();
  if (name.includes('instagram')) {
    return <InstagramIcon className="w-4 h-4 text-black stroke-[2]" />;
  }
  return <span className="text-[10px] font-bold text-black uppercase">{name.charAt(0)}</span>;
}

/* ── 4. Main Component ── */
export default function Layout({
  brand,
  sections = [],
  socialLinks = [],
  policies = [],
  copyright_text = "Copyright © 2026 Eye Lounge Online all rights reserved.",
  background_image
}: FooterProps) {
  return (
    <footer
      style={{
        backgroundColor: 'var(--color-text, #111111)',
        color: 'var(--color-surface-light, #FFFFFF)',
        backgroundImage: background_image ? `url(${background_image})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      className="w-full select-none"
    >
      {/* ── Main Links & Information ── */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-14 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Brand Identity & Mission Statement */}
          {brand && (
            <div className="lg:col-span-4 flex flex-col space-y-6">
              <a href="/" className="inline-block" aria-label={brand.name || "Eye Lounge"}>
                {brand.logo ? (
                  <img src={brand.logo} alt={brand.name} className="h-10 object-contain" />
                ) : (
                  <div className="flex flex-col items-start select-none">
                    {/* Monogram: Serif 'E' with clean geometric frame vector */}
                    <div className="relative flex items-center justify-center w-10 h-10 mb-1">
                      <span className="font-serif text-4xl leading-none text-white font-normal">
                        E
                      </span>
                      <svg
                        aria-hidden="true"
                        className="absolute inset-x-0 mx-auto top-[16px] w-6 h-3 text-white"
                        viewBox="0 0 24 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="2" y="2" width="8" height="7" rx="2" fill="var(--color-text, #111111)" />
                        <rect x="14" y="2" width="8" height="7" rx="2" fill="var(--color-text, #111111)" />
                        <path d="M10 5.5 C11 4.2, 13 4.2, 14 5.5" />
                      </svg>
                    </div>

                    <span className="font-serif text-sm font-bold tracking-[0.28em] uppercase text-white leading-tight">
                      {brand.name || "EYE LOUNGE"}
                    </span>
                    <span className="text-[9px] tracking-[0.25em] uppercase text-neutral-400 mt-0.5">
                      AN OPTICAL BOUTIQUE
                    </span>
                  </div>
                )}
              </a>

              {brand.description && (
                <p className="text-xs text-neutral-300 leading-relaxed font-light pr-0 lg:pr-6">
                  {brand.description}
                </p>
              )}
            </div>
          )}

          {/* Dynamic Link Sections */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-6">
            {sections.map((section, idx) => {
              const isLastSection = idx === sections.length - 1;

              return (
                <div key={idx} className="flex flex-col space-y-4">
                  <h3 className="text-xs font-bold tracking-wider uppercase text-white">
                    {section.title}
                  </h3>

                  <ul className="space-y-3">
                    {section.items?.map((item, itemIdx) => {
                      const icon = resolveItemIcon(item.url, item.label);

                      return (
                        <li key={itemIdx}>
                          <a
                            href={item.url}
                            className="text-xs text-neutral-300 hover:text-white transition-colors tracking-normal flex items-start gap-2.5 group"
                          >
                            {icon}
                            <span className="leading-snug">{item.label}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>

                  {/* Render Social Media Buttons under the Contact Details section */}
                  {isLastSection && socialLinks.length > 0 && (
                    <div className="pt-2 flex items-center gap-3">
                      {socialLinks.map((social, sIdx) => (
                        <a
                          key={sIdx}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.name}
                          style={{
                            backgroundColor: 'var(--color-surface-light, #FFFFFF)'
                          }}
                          className="inline-flex items-center justify-center w-7 h-7 rounded-full transition-transform hover:scale-110 active:scale-95 cursor-pointer shadow-xs"
                        >
                          {resolveSocialIcon(social)}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* ── Sub-Footer Legal & Policy Bar ── */}
      <div
        style={{
          borderTopColor: 'rgba(255, 255, 255, 0.1)'
        }}
        className="border-t py-4"
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
          
          {/* Copyright Notice */}
          {copyright_text && (
            <p className="text-center md:text-left">
              {copyright_text.split('Eye Lounge Online').map((part, index, arr) => (
                <React.Fragment key={index}>
                  {part}
                  {index < arr.length - 1 && (
                    <strong className="font-semibold text-white">Eye Lounge Online</strong>
                  )}
                </React.Fragment>
              ))}
            </p>
          )}

          {/* Legal Navigation Links */}
          {policies.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5">
              {policies.map((policy, idx) => (
                <a
                  key={idx}
                  href={policy.url}
                  className="hover:text-white transition-colors"
                >
                  {policy.label}
                </a>
              ))}
            </div>
          )}

        </div>
      </div>
    </footer>
  );
}