// 'use client'

// import React from 'react';

// export type MenuItem = {
//   label: string
//   href: string,
//   subMenu?: { label: string, href: string }[]
// }

// export interface CategoryReference {
//   _id: string
//   name: string
// }

// export interface Category {
//   _id: string
//   name: string
//   parent?: CategoryReference
//   children?: CategoryReference[]
// }

// export type Product = {
//   _id: string
//   title: string
//   brand?: string
//   media?: {
//     coverImage?: {
//       sq1_1?: { url: string }
//     }
//   }
//   variants?: {
//     matrix?: { media?: { url: string } }[]
//   }
//   pricing?: {
//     sale?: number
//   }
// }

// export type SearchResult = {
//   categories: Category[]
//   products: {
//     items: Product[]
//   }
// }

// export type RecommendationSection = {
//   label: string
//   items: string[]
//   deleteApi?: string
// }

// export type HeaderProps = {
//   wishlistCount?: number
//   cartCount?: number
//   isAuthenticated?: boolean
//   topMenuItems?: MenuItem[]
//   logoUrl: string
//   config: {
//     menu: MenuItem[]
//     layout_id: string,
//     showSearch: boolean
//     showWishlist: boolean
//     showCart: boolean
//     showAuth: boolean
//     fixed: boolean
//   }
//   user: any
//   logout: any
//   storeName: string;
// }

// export default function Layout(props: HeaderProps) {
//   const currentYear = new Date().getFullYear();
//   const menuList = props.config?.menu || [];
//   const popularLinks = props.topMenuItems || [];

//   return (
//     <footer
//       style={{
//         backgroundColor: 'var(--color-surface-light)',
//         color: 'var(--color-text)',
//         borderTop: '1px solid var(--color-border)'
//       }}
//       className="w-full select-none"
//     >
//       {/* ── 1. Main Navigation Columns ── */}
//       {menuList.length > 0 && (
//         <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-12 sm:pt-16 pb-8 sm:pb-12">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-12">
//             {menuList.map((item, idx) => (
//               <div key={idx} className="flex flex-col space-y-3">
//                 {item.label && (
//                   <a
//                     href={item.href || '#'}
//                     style={{ color: 'var(--color-text)' }}
//                     className="text-sm sm:text-base font-semibold tracking-wide hover:opacity-80 transition-opacity"
//                   >
//                     {item.label}
//                   </a>
//                 )}

//                 {item.subMenu && item.subMenu.length > 0 && (
//                   <ul className="space-y-2 pt-1">
//                     {item.subMenu.map((subItem, sIdx) => (
//                       <li key={sIdx}>
//                         <a
//                           href={subItem.href}
//                           style={{ color: 'var(--color-text-muted)' }}
//                           className="text-xs sm:text-sm font-normal leading-relaxed hover:text-[var(--color-primary)] transition-colors inline-block"
//                         >
//                           {subItem.label}
//                         </a>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* ── 2. Popular Searches Section ── */}
//       {popularLinks.length > 0 && (
//         <div
//           style={{ borderColor: 'var(--color-border)' }}
//           className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8 border-t"
//         >
//           <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
//             {popularLinks.map((link, lIdx) => (
//               <React.Fragment key={lIdx}>
//                 <a
//                   href={link.href}
//                   style={{ color: 'var(--color-text-muted)' }}
//                   className="text-xs sm:text-sm font-normal hover:text-[var(--color-primary)] transition-colors inline-block"
//                 >
//                   {link.label}
//                 </a>
//                 {lIdx < popularLinks.length - 1 && (
//                   <span
//                     style={{ color: 'var(--color-border)' }}
//                     className="text-xs select-none"
//                   >
//                     |
//                   </span>
//                 )}
//               </React.Fragment>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* ── 3. Bottom Accent Copyright Bar ── */}
//       <aside
//         style={{
//           backgroundColor: 'var(--color-primary-lighter)',
//           color: 'var(--color-surface-contrast)',
//           borderTop: '1px solid var(--color-border)'
//         }}
//         className="w-full py-4 px-6 sm:px-8 lg:px-12 text-left"
//       >
//         <div className="max-w-7xl mx-auto">
//           <p className="text-[11px] sm:text-xs font-medium tracking-wide">
//             © {currentYear} {props.storeName}{props.storeName ? ' - All rights reserved.' : ''}
//           </p>
//         </div>
//       </aside>
//     </footer>
//   );
// }


'use client'

import React, { useState } from 'react';

export type MenuItem = {
  label: string
  href: string,
  subMenu?: { label: string, href: string }[]
}

export interface CategoryReference {
  _id: string
  name: string
}

export interface Category {
  _id: string
  name: string
  parent?: CategoryReference
  children?: CategoryReference[]
}

export type Product = {
  _id: string
  title: string
  brand?: string
  media?: {
    coverImage?: {
      sq1_1?: { url: string }
    }
  }
  variants?: {
    matrix?: { media?: { url: string } }[]
  }
  pricing?: {
    sale?: number
  }
}

export type SearchResult = {
  categories: Category[]
  products: {
    items: Product[]
  }
}

export type RecommendationSection = {
  label: string
  items: string[]
  deleteApi?: string
}

export type HeaderProps = {
  wishlistCount?: number
  cartCount?: number
  isAuthenticated?: boolean
  topMenuItems?: MenuItem[]
  logoUrl: string
  config: {
    menu: MenuItem[]
    layout_id: string,
    showSearch: boolean
    showWishlist: boolean
    showCart: boolean
    showAuth: boolean
    fixed: boolean
  }
  user: any
  logout: any
  storeName: string;
}

export default function Layout(props: HeaderProps) {
  const currentYear = new Date().getFullYear();
  const menuList = props.config?.menu || [];
  const popularLinks = props.topMenuItems || [];
  const [email, setEmail] = useState<string>('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setEmail('');
    }
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-surface-light)',
        color: 'var(--color-text)',
        borderTop: '1px solid var(--color-border)'
      }}
      className="w-full select-none"
    >
      {/* ── 1. Top Section: Navigation Links, Newsletter & Social Media ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">

          {/* Left Column: Menu Links (Size Chart, Shipping, etc.) */}
          <div className="md:col-span-4 lg:col-span-3 space-y-6">
            {menuList.map((item, idx) => (
              <div key={idx} className="space-y-3">
                {item.label && (
                  <h3
                    style={{ color: 'var(--color-text)' }}
                    className="text-sm font-semibold tracking-wide"
                  >
                    {item.label}
                  </h3>
                )}

                {item.subMenu && item.subMenu.length > 0 && (
                  <ul className="space-y-2">
                    {item.subMenu.map((subItem, sIdx) => (
                      <li key={sIdx}>
                        <a
                          href={subItem.href}
                          style={{ color: 'var(--color-text-muted)' }}
                          className="text-xs sm:text-sm font-normal leading-relaxed hover:text-[var(--color-primary)] transition-colors inline-block"
                        >
                          {subItem.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Middle Column: Newsletter Subscription */}
          <div className="md:col-span-5 lg:col-span-6 flex flex-col items-center">
            <div className='space-y-4'>
              <h3
                style={{ color: 'var(--color-text)' }}
                className="text-lg sm:text-xl font-serif font-bold tracking-tight"
              >
                All things fresh
              </h3>
              <p
                style={{ color: 'var(--color-text-muted)' }}
                className="text-xs sm:text-sm font-normal leading-relaxed max-w-sm"
              >
                New styles, store launches and special offers. Sign up for our newsletter to get the deets before everyone else.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="pt-2 flex items-center max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  style={{
                    backgroundColor: 'var(--color-surface-lighter)',
                    color: 'var(--color-text)',
                    borderColor: 'var(--color-border)'
                  }}
                  className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-l-sm border border-r-0 outline-none placeholder:text-[var(--color-text-light)]"
                  required
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: 'var(--color-primary-lighter)',
                    color: 'var(--color-surface-contrast)'
                  }}
                  className="text-xs sm:text-sm font-medium px-5 py-[0.70rem] rounded-r-sm hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  Sign up
                </button>
              </form>

            </div>
          </div>

          {/* Right Column: Social Follow */}
          <div className="md:col-span-3 lg:col-span-3 space-y-4 flex flex-col items-start md:items-end">
            <h3
              style={{ color: 'var(--color-text)' }}
              className="text-lg sm:text-xl font-serif font-bold tracking-tight"
            >
              Follow us on
            </h3>

            <div className="flex items-center justify-start md:justify-end gap-3">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full flex items-center justify-center text-white bg-[#1877F2] hover:opacity-85 transition-opacity"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.148 0-2.797 1.056-2.797 2.65v1.321h4.089l-.548 3.667h-3.541v7.98c5.447-.905 9.683-5.624 9.683-11.332C24 5.534 18.627.161 12 .161S0 5.534 0 12.359c0 5.708 4.236 10.427 9.101 11.332z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full flex items-center justify-center text-white bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] hover:opacity-85 transition-opacity"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* Pinterest */}
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                className="w-8 h-8 rounded-full flex items-center justify-center text-white bg-[#BD081C] hover:opacity-85 transition-opacity"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.69 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.624.024 12.017.024z" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* ── 2. Middle Section: Popular Searches ── */}
      {popularLinks.length > 0 && (
        <div
          style={{ borderColor: 'var(--color-border)' }}
          className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4 border-t"
        >
          <h2
            style={{ color: 'var(--color-text)' }}
            className="text-xl sm:text-2xl font-serif font-bold tracking-tight mb-4"
          >
            Popular Searches
          </h2>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
            {popularLinks.map((link, lIdx) => (
              <React.Fragment key={lIdx}>
                <a
                  href={link.href}
                  style={{ color: 'var(--color-text-muted)' }}
                  className="text-xs sm:text-sm font-normal hover:text-[var(--color-primary)] transition-colors inline-block"
                >
                  {link.label}
                </a>
                {lIdx < popularLinks.length - 1 && (
                  <span
                    style={{ color: 'var(--color-border)' }}
                    className="text-xs select-none"
                  >
                    |
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* ── 3. Bottom Copyright Bar ── */}
      <aside
        style={{
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-surface-contrast)',
          borderTop: '1px solid var(--color-border)'
        }}
        className="w-full py-4 px-6 sm:px-8 lg:px-12 text-left"
      >
        <div className="max-w-7xl mx-auto">
          <p className="text-[11px] sm:text-xs font-medium tracking-wide">
            © {currentYear} {props.storeName}{props.storeName ? ' - All rights reserved.' : ''}
          </p>
        </div>
      </aside>
    </footer>
  );
}