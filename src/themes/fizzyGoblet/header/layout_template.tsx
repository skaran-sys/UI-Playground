'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  User,
  Zap,
  Search,
  X,
  TrendingUp,
  Sparkles,
  ArrowUpRight,
  ShoppingBag
} from 'lucide-react';

export type MenuItem = {
  label: string;
  href: string;
  subMenu?: { label: string; href: string }[];
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
    base?: number;
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
    announcement: string | null;
  };
  user: any;
  logout: any;
  storeName: string;
  onSearch: (query: string) => void;
  onDeleteRecommendation: (id: string) => void;
  loadRecommendations: () => void;
  searchResults: {
    categories: any[];
    products: { items: any[] };
  };
  popularSearch: any[];
  menu: MenuItem[];
};

export default function Layout(props: HeaderProps) {
  const {
    wishlistCount = 0,
    cartCount = 0,
    isAuthenticated = false,
    topMenuItems = [],
    logoUrl,
    config,
    user,
    logout,
    storeName,
    onSearch,
    loadRecommendations,
    searchResults = { categories: [], products: { items: [] } },
    popularSearch = [],
    menu = []
  } = props;

  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isNavHovered, setIsNavHovered] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen) {
      loadRecommendations?.();
      document.body.style.overflow = 'hidden';
      setTimeout(() => searchInputRef.current?.focus(), 80);
    } else {
      document.body.style.overflow = '';
      setSearchQuery('');
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSearchOpen, loadRecommendations]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    onSearch?.(val);
  };

  const handleSelectPopular = (term: string) => {
    setSearchQuery(term);
    onSearch?.(term);
    searchInputRef.current?.focus();
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch?.(searchQuery.trim());
    }
  };

  const isNavSolid = isScrolled || isNavHovered || Boolean(activeDropdown);

  return (
    <header
      className={`w-full z-50 transition-all duration-300 ${
        config?.fixed ? 'fixed top-0 left-0 right-0' : 'relative'
      }`}
    >
      {/* ── 1. Announcement Top Bar ── */}
      {config?.announcement && (
        <aside
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-surface-contrast)'
          }}
          className="w-full py-2 px-4 text-center text-xs sm:text-sm font-semibold tracking-wide select-none"
        >
          <p className="truncate max-w-7xl mx-auto">{config.announcement}</p>
        </aside>
      )}

      {/* ── 2. Primary Navigation Bar ── */}
      <nav
        onMouseEnter={() => setIsNavHovered(true)}
        onMouseLeave={() => {
          setIsNavHovered(false);
          setActiveDropdown(null);
        }}
        style={{
          backgroundColor: isNavSolid
            ? 'var(--color-surface-contrast)'
            : 'transparent',
          color: 'var(--color-primary-contrast)',
          borderBottom: isNavSolid
            ? '1px solid rgba(255,255,255,0.08)'
            : '1px solid transparent'
        }}
        className="w-full transition-colors duration-300 ease-in-out relative select-none"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
          
          {/* Left Column: Desktop Menu / Mobile Hamburger */}
          <div className="flex items-center gap-6 lg:w-1/3 h-full">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-xs text-[var(--color-primary-contrast)] focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            <ul className="hidden lg:flex items-center gap-6 xl:gap-8 h-full">
              {menu?.map((item, index) => {
                const hasSubMenu = Boolean(
                  item.subMenu && item.subMenu.length > 0
                );
                const isHovered = activeDropdown === item.label;

                return (
                  <li
                    key={index}
                    className="relative h-full flex items-center"
                    onMouseEnter={() => {
                      if (hasSubMenu) {
                        setActiveDropdown(item.label);
                      } else {
                        setActiveDropdown(null);
                      }
                    }}
                  >
                    <a
                      href={item.href}
                      className="text-sm font-semibold tracking-wider transition-opacity hover:opacity-80 py-2 inline-block relative"
                    >
                      {item.label}
                      {isHovered && (
                        <span
                          style={{
                            backgroundColor: 'var(--color-primary-contrast)'
                          }}
                          className="absolute bottom-[-16px] sm:bottom-[-20px] left-0 right-0 h-[2px]"
                        />
                      )}
                    </a>

                    {hasSubMenu && isHovered && item.subMenu && (
                      <div
                        style={{
                          backgroundColor: 'var(--color-surface-light)',
                          color: 'var(--color-text)',
                          borderColor: 'var(--color-border)'
                        }}
                        className="absolute left-0 top-full min-w-[220px] rounded-b-xs shadow-2xl py-3 px-2 z-50 border border-t-0"
                      >
                        <div className="flex flex-col gap-0.5">
                          {item.subMenu.map((sub, sIdx) => (
                            <a
                              key={sIdx}
                              href={sub.href}
                              style={{ color: 'var(--color-text)' }}
                              className="px-3.5 py-2 text-xs font-medium tracking-wide rounded-xs hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)] transition-colors block text-left"
                            >
                              {sub.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Center Column: Logo */}
          <div className="flex justify-center items-center lg:w-1/3">
            <a href="/" className="inline-flex items-center justify-center">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={storeName}
                  className="h-7 sm:h-9 w-auto object-contain"
                />
              ) : (
                <span className="text-xl sm:text-2xl font-serif font-medium tracking-[0.18em] uppercase select-none text-center">
                  {storeName}
                </span>
              )}
            </a>
          </div>

          {/* Right Column: Header Actions */}
          <div className="flex items-center justify-end gap-4 sm:gap-6 lg:w-1/3">
            {config?.showSearch && (
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="hidden sm:inline-flex items-center text-sm font-medium tracking-wide hover:opacity-80 transition-opacity cursor-pointer"
              >
                Search
              </button>
            )}

            {config?.showWishlist && (
              <a
                href="/wishlist"
                className="hidden sm:inline-flex items-center text-sm font-medium tracking-wide hover:opacity-80 transition-opacity relative"
              >
                <span>Wishlist</span>
                {Boolean(wishlistCount && wishlistCount > 0) && (
                  <span
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      color: 'var(--color-surface-contrast)'
                    }}
                    className="ml-1 px-1.5 py-0.2 text-[10px] font-bold rounded-full"
                  >
                    {wishlistCount}
                  </span>
                )}
              </a>
            )}

            {config?.showAuth && (
              <div className="relative group">
                <a
                  href={isAuthenticated ? "/account" : "/signin"}
                  className="relative p-1 inline-flex items-center justify-center hover:opacity-80 transition-opacity"
                  aria-label="User Account"
                >
                  <User className="w-5 h-5 stroke-[2] text-current" />
                  <Zap className="w-3.5 h-3.5 absolute right-0 bottom-0 text-amber-500 fill-amber-500" />
                </a>
              </div>
            )}

            {config?.showCart && (
              <a
                href="/cart"
                className="relative inline-flex items-center text-sm font-medium tracking-wide hover:opacity-80 transition-opacity"
              >
                <span>Cart</span>
                <span
                  style={{
                    backgroundColor: 'var(--color-primary-lighter)',
                    color: 'var(--color-surface-contrast)'
                  }}
                  className="-translate-y-2 h-4 min-w-[16px] px-1 flex items-center justify-center text-[10px] font-extrabold rounded-full"
                >
                  {cartCount ?? 0}
                </span>
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* ── 3. Luxury Floating Command-Center Search Overlay ── */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 md:p-10 select-none">
          {/* Glassmorphic Dark Backdrop */}
          <div
            onClick={() => setIsSearchOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300 ease-out cursor-pointer"
            aria-label="Close search"
          />

          {/* Elevated Floating Search Card */}
          <div className="relative w-full max-w-3xl bg-[#FAF7F2] text-[#1a1a1a] shadow-2xl rounded-2xl z-10 border border-neutral-200/80 overflow-hidden flex flex-col max-h-[88vh] animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header / Input Area */}
            <div className="p-4 sm:p-6 border-b border-neutral-200 bg-gradient-to-b from-neutral-50/50 to-[#FAF7F2]">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <Search className="w-5 h-5 text-neutral-400 mr-3.5 flex-shrink-0 stroke-[1.8]" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Type to search shoes, bags, collections..."
                  className="w-full text-base sm:text-lg font-light text-neutral-900 placeholder:text-neutral-400 bg-transparent focus:outline-none"
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      onSearch?.('');
                    }}
                    className="p-1.5 mr-2 text-neutral-400 hover:text-neutral-700 transition-colors rounded-full hover:bg-neutral-100 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}

                <div className="flex items-center gap-2 pl-2 border-l border-neutral-200">
                  <span className="hidden sm:inline-block text-[10px] font-semibold text-neutral-400 uppercase tracking-widest bg-neutral-100 px-2 py-1 rounded-md">
                    ESC
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="p-1.5 text-neutral-400 hover:text-neutral-900 transition-colors rounded-full hover:bg-neutral-100 cursor-pointer"
                    aria-label="Close search overlay"
                  >
                    <X className="w-5 h-5 stroke-[1.8]" />
                  </button>
                </div>
              </form>
            </div>

            {/* Scrollable Results & Suggestions Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
              
              {/* ── Active Live Query View ── */}
              {searchQuery.trim().length > 0 ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      Live Suggestions for &ldquo;{searchQuery}&rdquo;
                    </span>
                  </div>

                  {/* Matching Categories as Refined Chips */}
                  {searchResults?.categories && searchResults.categories.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                        Matching Collections
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {searchResults.categories.map((cat: any) => (
                          <a
                            key={cat._id}
                            href={`/category/${cat._id}`}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-neutral-200 hover:bg-neutral-900 hover:text-white transition-all text-neutral-800"
                          >
                            <span>{cat.name}</span>
                            <ArrowUpRight className="w-3 h-3 opacity-60" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Matching Products Grid */}
                  {searchResults?.products?.items && searchResults.products.items.length > 0 ? (
                    <div className="space-y-3">
                      <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                        Products ({searchResults.products.items.length})
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {searchResults.products.items.map((prod: any) => {
                          const imageUrl =
                            prod.media?.coverImage?.sq1_1?.url ||
                            prod.variants?.matrix?.[0]?.media?.url ||
                            prod.image;

                          return (
                            <a
                              key={prod._id}
                              href={`/product/${prod._id}`}
                              className="group flex items-center gap-3.5 p-2.5 rounded-xl border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/70 transition-all"
                            >
                              <div className="w-14 h-16 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0 relative">
                                {imageUrl ? (
                                  <img
                                    src={imageUrl}
                                    alt={prod.title}
                                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-neutral-300">
                                    <ShoppingBag className="w-5 h-5" />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs sm:text-sm font-medium text-neutral-900 truncate group-hover:underline">
                                  {prod.title}
                                </p>
                                {prod.brand && (
                                  <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                                    {prod.brand}
                                  </p>
                                )}
                                {prod.pricing?.sale !== undefined && (
                                  <p className="text-xs font-semibold text-neutral-900 mt-1">
                                    ₹ {prod.pricing.sale.toLocaleString('en-IN')}
                                  </p>
                                )}
                              </div>
                              <ArrowUpRight className="w-4 h-4 text-neutral-300 group-hover:text-neutral-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all mr-1 flex-shrink-0" />
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="py-12 text-center text-xs text-neutral-500">
                      Press enter to view all catalog matches for &ldquo;
                      <span className="font-semibold text-neutral-800">
                        {searchQuery}
                      </span>
                      &rdquo;
                    </div>
                  )}
                </div>
              ) : (
                /* ── Idle State with Trendy Pills ── */
                popularSearch && popularSearch.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                      <TrendingUp className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Trending Searches</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {popularSearch.map((term: any, pIdx: number) => {
                        const termLabel =
                          typeof term === 'string'
                            ? term
                            : term.name || term.label || term.query || '';

                        return (
                          <button
                            key={pIdx}
                            type="button"
                            onClick={() => handleSelectPopular(termLabel)}
                            className="px-4 py-2 rounded-full text-xs font-medium bg-neutral-200/70 text-neutral-700 hover:bg-neutral-900 hover:text-white transition-all cursor-pointer border border-transparent hover:border-neutral-900 active:scale-95"
                          >
                            {termLabel}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )
              )}

            </div>

            {/* Footer Notice */}
            <div className="px-5 py-3 bg-[#FAF7F2] border-t border-neutral-200 text-[11px] text-neutral-400 flex items-center justify-between">
              <span>Quick Search Directory</span>
              <span>Handcrafted Collections</span>
            </div>

          </div>
        </div>
      )}

      {/* ── 4. Mobile Navigation Drawer ── */}
      {isMobileMenuOpen && (
        <div
          style={{
            backgroundColor: 'var(--color-surface-contrast)',
            color: 'var(--color-primary-contrast)'
          }}
          className="lg:hidden fixed inset-x-0 top-[var(--header-height,64px)] bottom-0 z-40 overflow-y-auto p-6 space-y-6 border-t border-white/10 select-none"
        >
          {config?.showSearch && (
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsSearchOpen(true);
              }}
              style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
              className="w-full text-left py-2.5 px-4 rounded-xs text-sm text-white/70 flex items-center justify-between cursor-pointer"
            >
              <span>Search products...</span>
              <Search className="w-4 h-4 text-white/50" />
            </button>
          )}

          <div className="space-y-4">
            {menu?.map((item, idx) => (
              <div key={idx} className="border-b border-white/10 pb-3">
                <a
                  href={item.href}
                  className="text-base font-semibold block py-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
                {item.subMenu && item.subMenu.length > 0 && (
                  <div className="pl-4 mt-2 space-y-2">
                    {item.subMenu.map((sub, sIdx) => (
                      <a
                        key={sIdx}
                        href={sub.href}
                        className="block text-xs text-white/70 hover:text-white"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {sub.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {topMenuItems && topMenuItems.length > 0 && (
            <div className="pt-2 space-y-2">
              {topMenuItems.map((topItem, tIdx) => (
                <a
                  key={tIdx}
                  href={topItem.href}
                  className="block text-xs text-white/50 hover:text-white/80"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {topItem.label}
                </a>
              ))}
            </div>
          )}

          {config?.showAuth && (
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <span>
                {isAuthenticated && user?.name ? user.name : "My Account"}
              </span>
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={() => logout?.()}
                  style={{ color: 'var(--color-primary)' }}
                  className="font-bold underline cursor-pointer"
                >
                  Sign Out
                </button>
              ) : (
                <a
                  href="/signin"
                  style={{ color: 'var(--color-primary)' }}
                  className="font-bold"
                >
                  Sign In
                </a>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  );
}