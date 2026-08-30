'use client';

import React, { useState } from 'react';
/* ── 1. Schema Interfaces ── */
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
  icon?: any;
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

/* ── 2. SVG Social Icons & Resolver ── */
function FacebookIcon() {
  return (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const renderSocialIcon = (name: string, customIcon?: any) => {
  if (customIcon && typeof customIcon !== 'string') {
    const CustomIconComponent = customIcon;
    return <CustomIconComponent className="w-4 h-4" />;
  }

  const iconKey = typeof customIcon === 'string' ? customIcon.toLowerCase() : name.toLowerCase();

  if (iconKey.includes('facebook') || iconKey === 'fb') {
    return <FacebookIcon />;
  }
  if (iconKey.includes('instagram') || iconKey === 'insta') {
    return <InstagramIcon />;
  }
  if (iconKey.includes('youtube') || iconKey === 'yt') {
    return <YoutubeIcon />;
  }

  return null;
};

/* ── 3. Main Footer Layout ── */
export default function Layout({
  brand,
  sections = [
    {
      title: 'Know Us Better',
      items: [
        { label: 'About Us', url: '/about-us' },
        { label: 'Affiliate Program', url: '/affiliate' },
        { label: 'FAQ', url: '/faq' },
        { label: 'Blogs', url: '/blogs' },
        { label: 'Sitemap', url: '/sitemap' }
      ]
    },
    {
      title: 'Help',
      items: [
        { label: 'Contact Us', url: '/contact' },
        { label: 'Grievance Officer', url: '/grievance' },
        { label: 'Our Policies', url: '/policies' },
        { label: 'Terms & Conditions', url: '/terms' },
        { label: 'Terms Of Service', url: '/terms-of-service' }
      ]
    },
    {
      title: 'Also Available On',
      items: [
        { label: 'Nykaa', url: 'https://nykaa.com' },
        { label: 'Amazon', url: 'https://amazon.in' },
        { label: 'Flipkart', url: 'https://flipkart.com' },
        { label: 'Myntra', url: 'https://myntra.com' },
        { label: 'Purplle', url: 'https://purplle.com' }
      ]
    }
  ],
  socialLinks = [
    { name: 'Facebook', url: 'https://facebook.com', icon: 'facebook' },
    { name: 'Instagram', url: 'https://instagram.com', icon: 'instagram' },
    { name: 'YouTube', url: 'https://youtube.com', icon: 'youtube' }
  ],
  newsletter_title = 'Sign Up For Updates',
  newsletter_placeholder = 'Enter Your Email',
  newsletter_button_text = 'Subscribe',
  copyright_text = '© 2026 Dot & Key Wellness Ltd. All Rights Reserved.'
}: FooterProps) {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setEmail('');
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-surface, #FFE3EC)'
      }}
      className="w-full pt-12 pb-6 px-5 sm:px-8 lg:px-16 text-[var(--color-text,#1A0E14)] select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Navigation & Newsletter Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-black/5">
          
          {/* Link Columns */}
          {sections.map((section, idx) => (
            <div key={idx} className="flex flex-col">
              <h3 className="text-base sm:text-lg font-bold tracking-tight mb-4 text-[var(--color-text,#1A0E14)]">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.items.map((item, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href={item.url || '#'}
                      className="text-xs sm:text-[13px] font-normal text-[var(--color-text,#1A0E14)] hover:text-[var(--color-primary,#FF2E93)] transition-colors inline-block"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Subscription & Social Links */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 flex flex-col justify-start lg:pl-6 space-y-6">
            
            {/* Newsletter */}
            <div>
              <h3 className="text-base sm:text-lg font-bold tracking-tight mb-3 text-[var(--color-text,#1A0E14)]">
                {newsletter_title}
              </h3>
              <form onSubmit={handleNewsletterSubmit} className="flex w-full max-w-md items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={newsletter_placeholder}
                  required
                  className="w-full bg-white text-neutral-800 text-xs sm:text-sm px-4 py-2.5 rounded-l-lg border border-r-0 border-[var(--color-primary,#FF2E93)] focus:outline-none placeholder:text-neutral-400"
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: 'var(--color-primary, #FF2E93)'
                  }}
                  className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white rounded-r-lg hover:opacity-95 active:scale-98 transition-all cursor-pointer flex-shrink-0"
                >
                  {newsletter_button_text}
                </button>
              </form>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-base sm:text-lg font-bold tracking-tight mb-3 text-[var(--color-text,#1A0E14)]">
                Follow Us
              </h4>
              <div className="flex items-center gap-3">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    style={{
                      color: 'var(--color-primary, #FF2E93)'
                    }}
                    className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shadow-2xs hover:scale-105 active:scale-95 transition-transform"
                  >
                    {renderSocialIcon(social.name, social.icon)}
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 text-center">
          <p className="text-xs sm:text-[13px] font-normal text-[var(--color-text,#1A0E14)] opacity-90">
            {copyright_text || (brand?.name ? `© 2026 ${brand.name} All Rights Reserved.` : '')}
          </p>
        </div>
      </div>
    </footer>
  );
}