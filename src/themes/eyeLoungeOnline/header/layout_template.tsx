'use client';

import React, { useState, useRef } from 'react';
import { Search, User, Heart, ShoppingBag, X, Menu, ChevronDown } from 'lucide-react';

/* ── 1. Schema Types ── */
export interface MegaMenuProduct {
  _id: string;
  brand: string;
  model: string;
  price: string | number;
  image: string;
  hoverImage?: string;
  href: string;
}

export interface BrandColumn {
  title: string;
  brands: { label: string; href: string }[];
}

export type MenuItem = {
  label: string;
  href: string;
  type?: 'default' | 'product_grid' | 'brand_columns';
  subMenu?: { label: string; href: string }[];
  featuredProducts?: MegaMenuProduct[];
  brandColumns?: BrandColumn[];
};

export interface CategoryReference {
  _id: string;
  name: string;
}

export interface Category {
  _id: string;
  name: string;
  parent?: CategoryReference;
  children?: CategoryReference[];
}

export type Product = {
  _id: string;
  title: string;
  brand?: string;
  media?: {
    coverImage?: {
      sq1_1?: { url: string };
    };
  };
  variants?: {
    matrix?: { media?: { url: string } }[];
  };
  pricing?: {
    sale?: number;
  };
};

export type SearchResult = {
  categories: Category[];
  products: {
    items: Product[];
  };
};

export type RecommendationSection = {
  label: string;
  items: string[];
  deleteApi?: string;
};

export type SearchBoxProps = {
  onSearch: (query: string) => void;
  onDeleteRecommendation: (id: string) => void;
  loadRecommendations: () => void;
  result: {
    categories: any[];
    products: { items: any[] };
  };
  popular: any[];
};

export type HeaderProps = {
  wishlistCount?: number;
  cartCount?: number;
  isAuthenticated?: boolean;
  topMenuItems?: MenuItem[];
  logoUrl: string;
  config: {
    layout_id: string;
    showSearch: boolean;
    showWishlist: boolean;
    showCart: boolean;
    showAuth: boolean;
    fixed: boolean;
    announcement: { title: string }[];
    [key: string]: any;
  };
  user: any;
  logout: any;
  storeName: string;
  onSearch: (query: string) => void;
  onDeleteRecommendation: (id: string) => void;
  loadRecommendations: () => void;
  onCartToggle?: () => void;
  searchResults: {
    categories: any[];
    products: { items: any[] };
  };
  popularSearch: any[];
  menu: MenuItem[];
  wishlistHref: string;
  cartHref: string;
  accountHref: string;
};

/* ── 2. Main Navbar Component ── */
export default function Layout(props: HeaderProps) {
  const {
    logoUrl,
    storeName = "EYE LOUNGE",
    menu = [],
    config,
    wishlistCount = 0,
    cartCount = 0,
    wishlistHref = "/wishlist",
    accountHref = "/account",
    onSearch,
    onCartToggle,
    searchResults
  } = props;

  // Drawer States
  const [activeDrawer, setActiveDrawer] = useState<'none' | 'search' | 'login' | 'cart'>('none');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Active Mega Menu State
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnterNav = (label: string, type?: string) => {
    if (type === 'product_grid' || type === 'brand_columns') {
      if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
      setActiveMegaMenu(label);
    } else {
      setActiveMegaMenu(null);
    }
  };

  const handleMouseLeaveNav = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 120);
  };

  const handleMouseEnterMegaMenu = () => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
  };

  const closeDrawer = () => {
    setActiveDrawer('none');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (onSearch) onSearch(val);
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onCartToggle) onCartToggle();
    setActiveDrawer('cart');
  };

  const handleAccountClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveDrawer('login');
  };

  const filteredProducts = searchResults?.products?.items || [];
  const hasSearched = searchQuery.trim().length > 0;
  const currentHoveredItem = menu.find((item) => item.label === activeMegaMenu);

  return (
    <>
      <header
        style={{
          backgroundColor: 'var(--color-surface-light, #FFFFFF)',
          borderColor: 'var(--color-border, #E0E0E0)'
        }}
        className={`w-full select-none z-40 transition-all ${
          config?.fixed ? 'sticky top-0' : 'relative'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-12 h-16 sm:h-20 flex items-center justify-between gap-2">
          
          {/* Mobile Menu Toggle & Brand Logo */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0 min-w-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ color: 'var(--color-text, #111111)' }}
              className="lg:hidden p-1 -ml-1 hover:opacity-70 cursor-pointer flex-shrink-0"
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-5 h-5 stroke-[1.8]" />
            </button>

            <a href="/" className="flex items-center overflow-hidden">
              {logoUrl ? (
                <img src={logoUrl} alt={storeName} className="h-5 sm:h-7 object-contain" />
              ) : (
                <span
                  style={{ color: 'var(--color-text, #111111)' }}
                  className="font-serif text-[14px] sm:text-lg md:text-xl font-bold tracking-[0.18em] sm:tracking-[0.25em] md:tracking-[0.35em] uppercase whitespace-nowrap"
                >
                  {storeName}
                </span>
              )}
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 xl:space-x-9 h-full">
            {menu.map((item, idx) => (
              <div
                key={idx}
                onMouseEnter={() => handleMouseEnterNav(item.label, item.type)}
                onMouseLeave={handleMouseLeaveNav}
                className="h-full flex items-center"
              >
                <a
                  href={item.href}
                  style={{ color: 'var(--color-text, #111111)' }}
                  className={`text-[12px] font-medium tracking-[0.14em] uppercase py-6 transition-opacity ${
                    activeMegaMenu === item.label ? 'opacity-100 font-semibold' : 'hover:opacity-60'
                  }`}
                >
                  {item.label}
                </a>
              </div>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2.5 sm:gap-4 md:gap-5 flex-shrink-0">
            {config?.showSearch !== false && (
              <button
                type="button"
                onClick={() => setActiveDrawer('search')}
                style={{ color: 'var(--color-text, #111111)' }}
                className="p-1 hover:opacity-60 transition-opacity cursor-pointer flex-shrink-0"
                aria-label="Open search drawer"
              >
                <Search className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[1.8]" />
              </button>
            )}

            {config?.showAuth !== false && (
              <button
                type="button"
                onClick={handleAccountClick}
                style={{ color: 'var(--color-text, #111111)' }}
                className="p-1 hover:opacity-60 transition-opacity cursor-pointer flex-shrink-0"
                aria-label="Open login drawer"
              >
                <User className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[1.8]" />
              </button>
            )}

            {config?.showWishlist !== false && (
              <a
                href={wishlistHref}
                style={{ color: 'var(--color-text, #111111)' }}
                className="relative p-1 hover:opacity-60 transition-opacity cursor-pointer flex-shrink-0"
                aria-label="Wishlist"
              >
                <Heart className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[1.8]" />
                <span
                  style={{
                    backgroundColor: 'var(--color-primary, #000000)',
                    color: 'var(--color-primary-contrast, #FFFFFF)'
                  }}
                  className="absolute -top-1 -right-1.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full text-[9px] sm:text-[10px] font-bold flex items-center justify-center leading-none"
                >
                  {wishlistCount}
                </span>
              </a>
            )}

            {config?.showCart !== false && (
              <button
                type="button"
                onClick={handleCartClick}
                style={{ color: 'var(--color-text, #111111)' }}
                className="relative p-1 hover:opacity-60 transition-opacity cursor-pointer flex-shrink-0"
                aria-label="Open shopping cart drawer"
              >
                <ShoppingBag className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[1.8]" />
                <span
                  style={{
                    backgroundColor: 'var(--color-primary, #000000)',
                    color: 'var(--color-primary-contrast, #FFFFFF)'
                  }}
                  className="absolute -top-1 -right-1.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full text-[9px] sm:text-[10px] font-bold flex items-center justify-center leading-none"
                >
                  {cartCount}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* ── DESKTOP MEGA MENU DROPDOWN ── */}
        {activeMegaMenu && currentHoveredItem && (
          <div
            onMouseEnter={handleMouseEnterMegaMenu}
            onMouseLeave={handleMouseLeaveNav}
            style={{
              backgroundColor: 'var(--color-surface-light, #FFFFFF)',
              borderColor: 'var(--color-border, #E0E0E0)'
            }}
            className="hidden lg:block absolute top-full left-0 w-full border-b shadow-2xl transition-all animate-in fade-in slide-in-from-top-1 duration-200 z-50"
          >
            <div className="max-w-[1240px] mx-auto px-8 py-8 sm:py-10">
              {/* Product Grid Layout with Hover Image Swap */}
              {currentHoveredItem.type === 'product_grid' && currentHoveredItem.featuredProducts && (
                <div className="grid grid-cols-4 gap-x-6 gap-y-8">
                  {currentHoveredItem.featuredProducts.map((item) => (
                    <div
                      key={item._id}
                      className="group flex flex-col items-center text-center cursor-pointer"
                    >
                      {/* Frame Image Container with Swap Transition */}
                      <div className="relative w-full aspect-[4/3] rounded-lg p-3 flex items-center justify-center transition-colors group-hover:bg-[#EAEAEA]/70 mb-3 overflow-hidden">
                        
                        {/* Primary Image */}
                        <img
                          src={item.image}
                          alt={item.model}
                          className={`max-h-full max-w-full object-contain transition-all duration-300 ${
                            item.hoverImage ? 'group-hover:opacity-0 group-hover:scale-95' : 'group-hover:scale-105'
                          }`}
                        />

                        {/* Secondary Hover Image */}
                        {item.hoverImage && (
                          <img
                            src={item.hoverImage}
                            alt={`${item.model} alternate view`}
                            className="absolute inset-0 m-auto max-h-full max-w-full object-contain p-3 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                          />
                        )}

                        {/* Heart Wishlist Icon on Hover */}
                        <button
                          type="button"
                          aria-label="Wishlist item"
                          className="absolute top-2.5 left-2.5 opacity-0 group-hover:opacity-100 transition-opacity p-1 text-neutral-600 hover:text-black z-10"
                        >
                          <Heart className="w-4 h-4 stroke-[1.8]" />
                        </button>

                        {/* Quick Shop Action Pill */}
                        <a
                          href={item.href}
                          className="absolute bottom-2.5 inset-x-8 py-2 bg-white text-neutral-900 text-[11px] font-medium rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all hover:bg-neutral-50 active:scale-98 z-10"
                        >
                          Quick Shop
                        </a>
                      </div>

                      {/* Brand Title & Specifications */}
                      <h3
                        style={{ color: 'var(--color-text, #111111)' }}
                        className="text-[13px] font-bold tracking-tight uppercase"
                      >
                        {item.brand}
                      </h3>
                      <p
                        style={{ color: 'var(--color-text-muted, #666666)' }}
                        className="text-[11px] mt-0.5"
                      >
                        {item.model}
                      </p>
                      <p
                        style={{ color: 'var(--color-text-muted, #666666)' }}
                        className="text-[11px] mt-0.5"
                      >
                        MRP. {typeof item.price === 'number' ? `₹${item.price.toLocaleString('en-IN')}/-` : `${item.price}/-`}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Alphabetical Brand Directory */}
              {currentHoveredItem.type === 'brand_columns' && currentHoveredItem.brandColumns && (
                <div className="grid grid-cols-4 gap-8">
                  {currentHoveredItem.brandColumns.map((col, idx) => (
                    <div key={idx} className="flex flex-col">
                      <h3
                        style={{ color: 'var(--color-text, #111111)' }}
                        className="text-[13px] font-bold uppercase tracking-wider mb-4 pb-1 border-b border-neutral-200"
                      >
                        {col.title}
                      </h3>
                      <ul className="divide-y divide-neutral-100">
                        {col.brands.map((brand, bIdx) => (
                          <li key={bIdx}>
                            <a
                              href={brand.href}
                              style={{ color: 'var(--color-text, #111111)' }}
                              className="block py-2 text-[11px] font-normal uppercase tracking-wider hover:opacity-60 transition-opacity"
                            >
                              {brand.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── MOBILE ACCORDION NAVIGATION ── */}
        {mobileMenuOpen && (
          <div
            style={{
              backgroundColor: 'var(--color-surface-light, #FFFFFF)',
              borderColor: 'var(--color-border, #E0E0E0)'
            }}
            className="lg:hidden border-t px-6 py-4 space-y-3 max-h-[80vh] overflow-y-auto"
          >
            {menu.map((item, idx) => {
              const isExpandable = item.type === 'product_grid' || item.type === 'brand_columns';
              const isExpanded = expandedMobileMenu === item.label;

              return (
                <div key={idx} className="border-b border-neutral-100 pb-2">
                  <div className="flex items-center justify-between">
                    <a
                      href={item.href}
                      style={{ color: 'var(--color-text, #111111)' }}
                      className="block text-xs font-semibold tracking-widest uppercase py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                    {isExpandable && (
                      <button
                        type="button"
                        onClick={() => setExpandedMobileMenu(isExpanded ? null : item.label)}
                        className="p-1 text-neutral-500"
                        aria-label={`Expand ${item.label}`}
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>

                  {/* Mobile Expanded Content */}
                  {isExpandable && isExpanded && (
                    <div className="pt-3 pb-2 pl-2">
                      {item.type === 'brand_columns' && item.brandColumns && (
                        <div className="space-y-4">
                          {item.brandColumns.map((col, cIdx) => (
                            <div key={cIdx}>
                              <h4 className="text-[11px] font-bold uppercase text-neutral-400 mb-1">{col.title}</h4>
                              <div className="grid grid-cols-2 gap-1.5">
                                {col.brands.map((brand, bIdx) => (
                                  <a
                                    key={bIdx}
                                    href={brand.href}
                                    className="text-[11px] text-neutral-700 hover:text-black py-0.5 uppercase"
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    {brand.label}
                                  </a>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {item.type === 'product_grid' && item.featuredProducts && (
                        <div className="grid grid-cols-2 gap-3 pt-1">
                          {item.featuredProducts.slice(0, 4).map((prod) => (
                            <a
                              key={prod._id}
                              href={prod.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex flex-col items-center text-center p-2 rounded bg-neutral-50"
                            >
                              <img src={prod.image} alt={prod.model} className="w-16 h-12 object-contain mb-1" />
                              <span className="text-[10px] font-bold uppercase">{prod.brand}</span>
                              <span className="text-[9px] text-neutral-500">₹{prod.price}/-</span>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </header>

      {/* ── Slide-Over Backdrop Overlay ── */}
      {activeDrawer !== 'none' && (
        <div
          onClick={closeDrawer}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
          className="fixed inset-0 z-50 transition-opacity duration-300 backdrop-blur-2xs"
          aria-hidden="true"
        />
      )}

      {/* ── DRAWER 1: Search Our Site ── */}
      <aside
        style={{ backgroundColor: 'var(--color-surface-light, #FFFFFF)' }}
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          activeDrawer === 'search' ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div
          style={{ borderColor: 'var(--color-border, #E0E0E0)' }}
          className="flex items-center justify-between px-6 py-5 border-b"
        >
          <h2
            style={{ color: 'var(--color-text, #111111)' }}
            className="text-xs sm:text-[13px] font-bold tracking-widest uppercase"
          >
            SEARCH OUR SITE
          </h2>
          <button
            type="button"
            onClick={closeDrawer}
            style={{ color: 'var(--color-text-muted, #666666)' }}
            className="hover:opacity-70 p-1 cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-5 h-5 stroke-[1.8]" />
          </button>
        </div>

        <div className="p-6 flex-1 flex flex-col overflow-y-auto">
          <div className="relative mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search"
              style={{
                borderColor: 'var(--color-border, #E0E0E0)',
                color: 'var(--color-text, #111111)',
                backgroundColor: 'var(--color-surface-light, #FFFFFF)'
              }}
              className="w-full text-xs sm:text-sm px-4 py-2.5 pr-10 rounded-full border focus:outline-none focus:border-[var(--color-primary)] placeholder:text-[var(--color-text-light)]"
              autoFocus={activeDrawer === 'search'}
            />
            <Search
              style={{ color: 'var(--color-text-light, #999999)' }}
              className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 stroke-[2]"
            />
          </div>

          {hasSearched && (
            <div className="mb-4">
              <span
                style={{ color: 'var(--color-text-muted, #666666)' }}
                className="text-xs"
              >
                Suggestions:{' '}
                <strong
                  style={{ color: 'var(--color-text, #111111)' }}
                  className="font-semibold"
                >
                  {searchQuery}
                </strong>
              </span>
            </div>
          )}

          {hasSearched && (
            <div className="flex-1 flex flex-col">
              <span
                style={{ color: 'var(--color-text, #111111)' }}
                className="text-xs font-semibold mb-3 block"
              >
                Search results
              </span>

              {filteredProducts.length > 0 ? (
                <div
                  style={{ borderColor: 'var(--color-border, #E0E0E0)' }}
                  className="divide-y divide-[var(--color-border)] space-y-2"
                >
                  {filteredProducts.map((prod) => (
                    <a
                      key={prod._id}
                      href={`/products/${prod._id}`}
                      className="flex items-center gap-4 py-3 group"
                    >
                      <div
                        style={{ backgroundColor: 'var(--color-surface, #F5F5F5)' }}
                        className="w-16 h-12 flex-shrink-0 flex items-center justify-center p-1 rounded"
                      >
                        <img
                          src={
                            prod.media?.coverImage?.sq1_1?.url ||
                            prod.variants?.matrix?.[0]?.media?.url ||
                            'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=200'
                          }
                          alt={prod.title}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h4
                          style={{ color: 'var(--color-text, #111111)' }}
                          className="text-xs font-semibold group-hover:underline"
                        >
                          {prod.title}
                        </h4>
                        <span
                          style={{ color: 'var(--color-text-muted, #666666)' }}
                          className="text-xs mt-0.5"
                        >
                          MRP. {prod.pricing?.sale ? `₹${prod.pricing.sale.toLocaleString('en-IN')}/-` : '28,590/-'}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <div
                  style={{ color: 'var(--color-text-muted, #666666)' }}
                  className="py-6 text-xs"
                >
                  No products were found matching your selection.
                </div>
              )}

              <div
                style={{ borderColor: 'var(--color-border, #E0E0E0)' }}
                className="mt-auto pt-6 border-t"
              >
                <a
                  href={`/search?q=${encodeURIComponent(searchQuery)}`}
                  style={{ color: 'var(--color-text, #111111)' }}
                  className="text-xs hover:opacity-70 font-medium inline-flex items-center gap-1"
                >
                  Search for &ldquo;{searchQuery}&rdquo; &rarr;
                </a>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* ── DRAWER 2: Login ── */}
      <aside
        style={{ backgroundColor: 'var(--color-surface-light, #FFFFFF)' }}
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          activeDrawer === 'login' ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div
          style={{ borderColor: 'var(--color-border, #E0E0E0)' }}
          className="flex items-center justify-between px-6 py-5 border-b"
        >
          <h2
            style={{ color: 'var(--color-text, #111111)' }}
            className="text-xs sm:text-[13px] font-bold tracking-widest uppercase"
          >
            LOGIN
          </h2>
          <button
            type="button"
            onClick={closeDrawer}
            style={{ color: 'var(--color-text-muted, #666666)' }}
            className="hover:opacity-70 p-1 cursor-pointer"
            aria-label="Close login"
          >
            <X className="w-5 h-5 stroke-[1.8]" />
          </button>
        </div>

        <div className="p-6 sm:p-8 flex-1 flex flex-col justify-start">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <label
                style={{ color: 'var(--color-text-muted, #666666)' }}
                className="block text-xs mb-1.5 font-medium"
              >
                Email <span style={{ color: 'var(--color-text, #111111)' }}>*</span>
              </label>
              <input
                type="email"
                required
                style={{
                  borderColor: 'var(--color-border, #E0E0E0)',
                  color: 'var(--color-text, #111111)',
                  backgroundColor: 'var(--color-surface-light, #FFFFFF)'
                }}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded border focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            <div>
              <label
                style={{ color: 'var(--color-text-muted, #666666)' }}
                className="block text-xs mb-1.5 font-medium"
              >
                Password <span style={{ color: 'var(--color-text, #111111)' }}>*</span>
              </label>
              <input
                type="password"
                required
                style={{
                  borderColor: 'var(--color-border, #E0E0E0)',
                  color: 'var(--color-text, #111111)',
                  backgroundColor: 'var(--color-surface-light, #FFFFFF)'
                }}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded border focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            <div className="pt-1">
              <a
                href="/account/recover"
                style={{ color: 'var(--color-text-muted, #666666)' }}
                className="text-xs hover:underline hover:text-[var(--color-text)]"
              >
                Forgot your password?
              </a>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                style={{
                  backgroundColor: 'var(--color-primary, #000000)',
                  color: 'var(--color-primary-contrast, #FFFFFF)'
                }}
                className="w-full py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide hover:opacity-90 active:scale-98 transition-all cursor-pointer"
              >
                Sign In
              </button>
            </div>

            <div className="pt-4 text-left">
              <a
                href={accountHref || "/account/register"}
                style={{ color: 'var(--color-text-muted, #666666)' }}
                className="text-xs hover:underline hover:text-[var(--color-text)]"
              >
                New customer? Create your account
              </a>
            </div>
          </form>
        </div>
      </aside>

      {/* ── DRAWER 3: Shopping Cart (Empty State) ── */}
      <aside
        style={{ backgroundColor: 'var(--color-surface-light, #FFFFFF)' }}
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          activeDrawer === 'cart' ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div
          style={{ borderColor: 'var(--color-border, #E0E0E0)' }}
          className="flex items-center justify-between px-6 py-5 border-b"
        >
          <h2
            style={{ color: 'var(--color-text, #111111)' }}
            className="text-xs sm:text-[13px] font-bold tracking-widest uppercase"
          >
            SHOPPING CART
          </h2>
          <button
            type="button"
            onClick={closeDrawer}
            style={{ color: 'var(--color-text-muted, #666666)' }}
            className="hover:opacity-70 p-1 cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5 stroke-[1.8]" />
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div
            style={{ color: 'var(--color-text-light, #999999)' }}
            className="relative mb-5"
          >
            <ShoppingBag className="w-14 h-14 stroke-[1.2]" />
            <span
              style={{ color: 'var(--color-text-muted, #666666)' }}
              className="absolute inset-0 flex items-center justify-center pt-2 font-black text-xs"
            >
              ✕
            </span>
          </div>

          <p
            style={{ color: 'var(--color-text-muted, #666666)' }}
            className="text-xs sm:text-sm mb-6 font-normal"
          >
            Your cart is empty.
          </p>

          <a
            href="/collections/all"
            onClick={closeDrawer}
            style={{
              backgroundColor: 'var(--color-primary, #000000)',
              color: 'var(--color-primary-contrast, #FFFFFF)'
            }}
            className="px-8 py-3 rounded-full text-xs font-bold tracking-wider uppercase hover:opacity-90 active:scale-98 transition-all cursor-pointer inline-block"
          >
            RETURN TO SHOP
          </a>
        </div>
      </aside>
    </>
  );
}