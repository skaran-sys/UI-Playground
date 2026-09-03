'use client';

import React from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';

/* ── 1. Schema Types ── */
export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

export interface StoreLocation {
  id?: string;
  address: string;
}

export interface ContactInfo {
  locations?: StoreLocation[];
  email?: string;
  phone?: string;
  instagramUrl?: string;
}

export interface FooterConfig {
  layout_id: string;
  copyright_text?: string;
  [key: string]: any;
}

export interface FooterProps {
  logoUrl?: string;
  storeName?: string;
  tagline?: string;
  description?: string;
  linkGroups?: FooterLinkGroup[];
  contact?: ContactInfo;
  legalLinks?: FooterLink[];
  config?: FooterConfig;
}

/* ── 2. Footer Component ── */
export default function Layout({
  logoUrl,
  storeName = "EYE LOUNGE",
  tagline = "AN OPTICAL BOUTIQUE",
  description = "Eye Lounge is dedicated to providing the customers with high-quality eyewear that combines fashion-forward design with functionality. The mission is to enhance every customer's unique style and vision with a wide range of sunglasses and spectacles.",
  linkGroups = [],
  contact,
  legalLinks = [],
  config
}: FooterProps) {
  const copyrightText =
    config?.copyright_text || "Copyright © 2026 Eye Lounge Online all rights reserved.";

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-text, #111111)',
        color: 'var(--color-surface-light, #FFFFFF)'
      }}
      className="w-full select-none"
    >
      {/* ── Main Links & Info Section ── */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-14 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Column 1: Logo & Brand Description (lg: 4 cols) */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            <a href="/" className="inline-block">
              {logoUrl ? (
                <img src={logoUrl} alt={storeName} className="h-10 object-contain" />
              ) : (
                <div className="flex flex-col items-start space-y-1">
                  {/* Eye Lounge Monogram Logo */}
                  <div className="relative flex items-center justify-center">
                    <span className="font-serif text-3xl font-normal tracking-tight">E</span>
                    <span className="text-xs absolute inset-0 flex items-center justify-center pt-0.5">
                      👓
                    </span>
                  </div>
                  <span className="font-serif text-sm font-bold tracking-[0.3em] uppercase">
                    {storeName}
                  </span>
                  <span className="text-[9px] tracking-[0.25em] uppercase text-neutral-400">
                    {tagline}
                  </span>
                </div>
              )}
            </a>

            {description && (
              <p className="text-xs text-neutral-300 leading-relaxed font-light pr-0 lg:pr-6">
                {description}
              </p>
            )}
          </div>

          {/* Column 2 & 3: Link Groups (Collections & Others) (lg: 4 cols) */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-6">
            {linkGroups.map((group, idx) => (
              <div key={idx} className="flex flex-col space-y-4">
                <h3 className="text-xs font-bold tracking-wider uppercase text-white">
                  {group.title}
                </h3>
                <ul className="space-y-2.5">
                  {group.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <a
                        href={link.href}
                        className="text-xs text-neutral-300 hover:text-white transition-opacity tracking-normal block"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Column 4: Contact Details & Social Links (lg: 4 cols) */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <h3 className="text-xs font-bold tracking-wider uppercase text-white">
              Contact Details
            </h3>

            <div className="space-y-3.5 text-xs text-neutral-300">
              {/* Store Locations */}
              {contact?.locations?.map((loc, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 flex-shrink-0 stroke-[1.5] mt-0.5 text-neutral-400" />
                  <span className="leading-snug">{loc.address}</span>
                </div>
              ))}

              {/* Email Address */}
              {contact?.email && (
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 flex-shrink-0 stroke-[1.5] text-neutral-400" />
                  <a
                    href={`mailto:${contact.email}`}
                    className="hover:text-white transition-colors"
                  >
                    {contact.email}
                  </a>
                </div>
              )}

              {/* Phone Number */}
              {contact?.phone && (
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 flex-shrink-0 stroke-[1.5] text-neutral-400" />
                  <a
                    href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                    className="hover:text-white transition-colors"
                  >
                    {contact.phone}
                  </a>
                </div>
              )}

              {/* Social Media Link */}
              {contact?.instagramUrl && (
                <div className="pt-1">
                  <a
                    href={contact.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram profile"
                    style={{
                      backgroundColor: 'var(--color-surface-light, #FFFFFF)',
                      color: 'var(--color-text, #111111)'
                    }}
                    className="inline-flex items-center justify-center w-7 h-7 rounded-full transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                  >
                    {/* <Instagram className="w-4 h-4 stroke-[1.8]" /> */}
                  </a>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* ── Sub-Footer Legal Bar ── */}
      <div
        style={{
          borderTopColor: 'rgba(255, 255, 255, 0.1)'
        }}
        className="border-t py-4"
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
          
          {/* Copyright Notice */}
          <p className="text-center md:text-left">
            {copyrightText.split('Eye Lounge Online').map((part, index, arr) => (
              <React.Fragment key={index}>
                {part}
                {index < arr.length - 1 && (
                  <strong className="font-semibold text-white">Eye Lounge Online</strong>
                )}
              </React.Fragment>
            ))}
          </p>

          {/* Legal Navigation Links */}
          {legalLinks.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5">
              {legalLinks.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}

        </div>
      </div>
    </footer>
  );
}