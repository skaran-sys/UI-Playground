'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  User,
  ShoppingBag,
  Search,
  X,
  ChevronDown,
  Sparkles,
  TrendingUp,
  Menu,
  Truck,
  Zap
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
  onDeleteRecommendation?: (id: string) => void;
  loadRecommendations?: () => void;
  result?: {
    categories: any[];
    products: { items: any[] };
  };
  popular?: any[];
  placeholder?: string;
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
    announcement: string[] | string | null;
    searchPlaceholder?: string;
  };
  user: any;
  logout: any;
  storeName: string;
  onSearch: (query: string) => void;
  onDeleteRecommendation?: (id: string) => void;
  loadRecommendations?: () => void;
  onCartToggle?: () => void;
  searchResults: {
    categories: any[];
    products: { items: any[] };
  };
  popularSearch: any[];
  menu: MenuItem[];
  wishlistHref?: string;
  cartHref?: string;
  accountHref?: string;
};

/* ── Authentic Dot & Key Vector Logo Mark ── */
function DotAndKeyLogo() {
  return (
    <svg
      viewBox="0 0 230 38"
      className="h-8 sm:h-9 w-auto fill-current"
      aria-label="Dot & Key Skincare"
    >
      <text
        x="0"
        y="29"
        fontFamily="serif"
        fontSize="30"
        fontWeight="bold"
        letterSpacing="2"
      >
        DOT
      </text>
      <path
        d="M88 15 C84 9, 91 4, 97 9 C103 15, 87 25, 89 30 C91 34, 101 32, 102 24"
        stroke="currentColor"
        strokeWidth="3.6"
        fill="none"
        strokeLinecap="round"
      />
      <text
        x="115"
        y="29"
        fontFamily="serif"
        fontSize="30"
        fontWeight="bold"
        letterSpacing="2"
      >
        KEY
      </text>
    </svg>
  );
}

/* ── Inline Rectangular Search Box with Attached Dropdown ── */
export const SearchBar = ({
  onSearch,
  result,
  popular,
  loadRecommendations,
  placeholder = "Search for Face wash, Serum..."
}: SearchBoxProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchQuery.trim().length >= 3) {
      onSearch(searchQuery.trim());
    }
  }, [searchQuery, onSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFocus = () => {
    setIsSearchOpen(true);
    if (loadRecommendations) {
      loadRecommendations();
    }
  };

  const handlePopularClick = (term: string) => {
    setSearchQuery(term);
    onSearch(term);
    inputRef.current?.focus();
  };

  const handleClear = () => {
    setSearchQuery('');
    onSearch('');
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[380px]">
      <div
        style={{
          borderColor: 'var(--color-text)',
          backgroundColor: 'var(--color-surface-light)'
        }}
        className="flex items-center gap-2 px-3.5 h-[38px] rounded-[3px] border transition-colors shadow-2xs"
      >
        <Search
          style={{ color: 'var(--color-text)' }}
          className="w-4 h-4 flex-shrink-0 stroke-[1.6]"
        />
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={handleFocus}
          placeholder={placeholder}
          style={{ color: 'var(--color-text)' }}
          className="w-full text-xs sm:text-[13px] bg-transparent outline-none placeholder:text-[var(--color-text-light)] font-normal"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            style={{ color: 'var(--color-text-muted)' }}
            className="p-0.5 hover:opacity-80 cursor-pointer"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {isSearchOpen && (
        <div
          style={{
            backgroundColor: 'var(--color-surface-light)',
            borderColor: 'var(--color-border)',
            color: 'var(--color-text)'
          }}
          className="absolute right-0 top-full mt-1.5 w-[340px] sm:w-[380px] rounded-md shadow-2xl border p-4 z-50 animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Popular Choices */}
          {popular && popular.length > 0 && (
            <div className="mb-4">
              <div
                style={{ color: 'var(--color-text-muted)' }}
                className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider mb-2"
              >
                <TrendingUp
                  style={{ color: 'var(--color-primary)' }}
                  className="w-3 h-3"
                />
                <span>Popular Choices</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {popular.map((item: any, idx: number) => {
                  const label =
                    typeof item === 'string'
                      ? item
                      : item.title || item.name || '';
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handlePopularClick(label)}
                      style={{
                        backgroundColor: 'var(--color-surface-lighter)',
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-text)'
                      }}
                      className="px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide border hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors cursor-pointer"
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Categories */}
          {result?.categories && result.categories.length > 0 && (
            <div
              style={{ borderTopColor: 'var(--color-border)' }}
              className="mb-3 pt-3 border-t"
            >
              <span
                style={{ color: 'var(--color-text-muted)' }}
                className="text-[11px] font-bold uppercase tracking-wider block mb-1.5"
              >
                Categories
              </span>
              <div className="flex flex-wrap gap-1.5">
                {result.categories.map((cat: any) => (
                  <a
                    key={cat._id}
                    href={`/collections/${cat._id}`}
                    style={{
                      backgroundColor: 'var(--color-surface)',
                      color: 'var(--color-primary)'
                    }}
                    className="text-xs px-2.5 py-1 rounded-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    {cat.name}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Recommended / Search Products */}
          {result?.products?.items && result.products.items.length > 0 && (
            <div
              style={{ borderTopColor: 'var(--color-border)' }}
              className="pt-3 border-t"
            >
              <span
                style={{ color: 'var(--color-text-muted)' }}
                className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 mb-2.5"
              >
                <Sparkles className="w-3 h-3 text-amber-500" />
                {searchQuery ? 'Matching Products' : 'Recommended For You'}
              </span>

              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {result.products.items.slice(0, 4).map((prod: any) => {
                  const imageUrl =
                    prod.media?.coverImage?.sq1_1?.url ||
                    prod.variants?.matrix?.[0]?.media?.url ||
                    prod.image;

                  return (
                    <a
                      key={prod._id}
                      href={`/products/${prod._id}`}
                      style={{
                        borderColor: 'var(--color-border)',
                        backgroundColor: 'var(--color-surface-light)'
                      }}
                      className="group flex-shrink-0 w-28 flex flex-col p-1.5 rounded-sm border hover:border-[var(--color-primary)] transition-all"
                    >
                      <div
                        style={{ backgroundColor: 'var(--color-surface-lighter)' }}
                        className="aspect-square w-full rounded-xs overflow-hidden mb-1"
                      >
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={prod.title}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div
                            style={{ color: 'var(--color-text-light)' }}
                            className="w-full h-full flex items-center justify-center text-[10px]"
                          >
                            No image
                          </div>
                        )}
                      </div>
                      <p
                        style={{ color: 'var(--color-text)' }}
                        className="text-[11px] font-medium truncate group-hover:text-[var(--color-primary)]"
                      >
                        {prod.title}
                      </p>
                      {prod.pricing?.sale !== undefined && (
                        <p
                          style={{ color: 'var(--color-primary)' }}
                          className="text-xs font-bold mt-0.5"
                        >
                          ₹{prod.pricing.sale.toLocaleString('en-IN')}
                        </p>
                      )}
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/* ── Main Header Layout ── */
export default function Layout(props: HeaderProps) {
  const {
    cartCount = 0,
    isAuthenticated = false,
    logoUrl,
    config,
    user,
    logout,
    storeName,
    onSearch,
    onDeleteRecommendation,
    loadRecommendations,
    onCartToggle,
    searchResults = { categories: [], products: { items: [] } },
    popularSearch = [],
    menu = [],
    cartHref = "/cart",
    accountHref = "/account"
  } = props;

  const [activeAnnouncementIdx, setActiveAnnouncementIdx] = useState<number>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const rawAnnouncement = config?.announcement;
  const announcementList: string[] = Array.isArray(rawAnnouncement)
    ? rawAnnouncement.filter(Boolean)
    : typeof rawAnnouncement === 'string' && rawAnnouncement.trim().length > 0
    ? [rawAnnouncement]
    : [];

  useEffect(() => {
    if (announcementList.length <= 1) return;
    const interval = setInterval(() => {
      setActiveAnnouncementIdx((prev) => (prev + 1) % announcementList.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [announcementList.length]);

  const handleCartClick = (e: React.MouseEvent) => {
    if (onCartToggle) {
      e.preventDefault();
      onCartToggle();
    }
  };

  return (
    <header
      style={{ backgroundColor: 'var(--color-background)' }}
      className={`w-full z-50 transition-all duration-300 ${
        config?.fixed ? 'fixed top-0 left-0 right-0' : 'relative'
      }`}
    >
      {/* ── 1. Announcement Strip with Smooth Horizontal Track Slide Transition ── */}
      {announcementList.length > 0 && (
        <aside
          style={{
            backgroundColor: 'var(--color-surface-contrast)',
            color: 'var(--color-primary-contrast)'
          }}
          className="w-full py-1.5 px-4 text-center text-xs font-bold tracking-tight select-none overflow-hidden"
        >
          <div className="w-full max-w-7xl mx-auto overflow-hidden relative h-5 flex items-center">
            <div
              className="flex w-full transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${activeAnnouncementIdx * 100}%)`
              }}
            >
              {announcementList.map((message, idx) => (
                <div
                  key={idx}
                  className="w-full flex-shrink-0 flex items-center justify-center px-4"
                >
                  <span className="truncate max-w-4xl text-center">
                    {message}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      )}

      {/* ── 2. Tier 1: Main Header (Comfortable Edge Padding & Bold Styling) ── */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-light)',
          borderBottom: '1px solid var(--color-border)'
        }}
        className="w-full"
      >
        <div className="max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-28 h-16 sm:h-20 flex items-center justify-between gap-6">
          
          {/* Mobile Hamburger Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ color: 'var(--color-text)' }}
            className="lg:hidden p-1.5 hover:text-[var(--color-primary)] cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Left Column: Brand Logo */}
          <div className="flex items-center">
            <a href="/" className="inline-flex items-center text-[var(--color-text)]">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={storeName}
                  className="h-8 sm:h-9 w-auto object-contain"
                />
              ) : (
                <DotAndKeyLogo />
              )}
            </a>
          </div>

          {/* Right Column: Search Bar & Actions */}
          <div className="flex items-center justify-end gap-5 sm:gap-6 flex-1">
            {config?.showSearch && (
              <div className="hidden sm:block">
                <SearchBar
                  onSearch={onSearch}
                  onDeleteRecommendation={onDeleteRecommendation}
                  loadRecommendations={loadRecommendations}
                  result={searchResults}
                  popular={popularSearch}
                  placeholder={config?.searchPlaceholder}
                />
              </div>
            )}

            {/* Action Group: Track Order, Cart, Account */}
            <div className="flex items-center gap-4 sm:gap-5">
              {/* Order Tracking */}
              <a
                href="/track-order"
                style={{ color: 'var(--color-text)' }}
                className="hidden sm:inline-flex items-center hover:text-[var(--color-primary)] transition-colors p-0.5"
                aria-label="Track Order"
              >
                <Truck className="w-6 h-6 stroke-[1.5]" />
              </a>

              {/* Cart Bag with Black Circular Counter */}
              {config?.showCart && (
                <a
                  href={cartHref}
                  onClick={handleCartClick}
                  style={{ color: 'var(--color-text)' }}
                  className="relative hover:text-[var(--color-primary)] transition-colors cursor-pointer p-0.5"
                  aria-label="Cart"
                >
                  <ShoppingBag className="w-6 h-6 stroke-[1.5]" />
                  <span
                    style={{
                      backgroundColor: 'var(--color-surface-contrast)',
                      color: 'var(--color-primary-contrast)',
                      borderColor: 'var(--color-surface-light)'
                    }}
                    className="absolute -bottom-1 -right-1.5 h-[18px] min-w-[18px] px-1 flex items-center justify-center text-[10px] font-black rounded-full border"
                  >
                    {cartCount ?? 0}
                  </span>
                </a>
              )}

              {/* User Account with Teal Lightning Accent */}
              {config?.showAuth && (
                <a
                  href={isAuthenticated ? accountHref : "/signin"}
                  style={{ color: 'var(--color-text)' }}
                  className="relative hover:text-[var(--color-primary)] transition-colors p-0.5"
                  aria-label="Account"
                >
                  <User className="w-6 h-6 stroke-[1.5]" />
                  <Zap className="w-3.5 h-3.5 absolute -bottom-0.5 -right-0.5 text-teal-400 fill-teal-400" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. Tier 2: Horizontal Navigation Menu Bar (Generously Padded & Balanced) ── */}
      <nav
        style={{
          backgroundColor: 'var(--color-surface-light)',
          borderBottom: '1px solid var(--color-border)'
        }}
        className="hidden lg:block w-full select-none"
      >
        <div className="max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-28">
          <ul className="flex items-center justify-between h-11">
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
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a
                    href={item.href}
                    style={{
                      color: isHovered
                        ? 'var(--color-primary)'
                        : 'var(--color-text)'
                    }}
                    className="text-sm font-bold tracking-wide uppercase transition-colors inline-flex items-center gap-1.5 py-3"
                  >
                    <span>{item.label}</span>
                    {hasSubMenu && (
                      <ChevronDown
                        style={{
                          color: isHovered
                            ? 'var(--color-primary)'
                            : 'var(--color-text)'
                        }}
                        className={`w-4 h-4 stroke-[2] transition-transform duration-200 ${
                          isHovered ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </a>

                  {/* Dropdown Submenu */}
                  {hasSubMenu && isHovered && item.subMenu && (
                    <div
                      style={{
                        backgroundColor: 'var(--color-surface-light)',
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-text)'
                      }}
                      className="absolute left-0 top-full min-w-[220px] rounded-b-md shadow-2xl py-3 px-2 z-50 border border-t-0 animate-in fade-in zoom-in-95 duration-100"
                    >
                      <div className="flex flex-col gap-0.5">
                        {item.subMenu.map((sub, sIdx) => (
                          <a
                            key={sIdx}
                            href={sub.href}
                            style={{ color: 'var(--color-text)' }}
                            className="px-3.5 py-1.5 text-xs font-semibold hover:text-[var(--color-primary)] hover:bg-[var(--color-surface-lighter)] rounded-xs transition-colors block text-left"
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
      </nav>

      {/* ── 4. Mobile Navigation Drawer ── */}
      {isMobileMenuOpen && (
        <div
          style={{
            backgroundColor: 'var(--color-surface-light)',
            borderTopColor: 'var(--color-border)'
          }}
          className="lg:hidden fixed inset-x-0 top-[var(--header-height,100px)] bottom-0 z-40 overflow-y-auto p-5 space-y-4 border-t select-none shadow-xl"
        >
          {config?.showSearch && (
            <div className="w-full pb-2">
              <SearchBar
                onSearch={onSearch}
                onDeleteRecommendation={onDeleteRecommendation}
                loadRecommendations={loadRecommendations}
                result={searchResults}
                popular={popularSearch}
                placeholder={config?.searchPlaceholder}
              />
            </div>
          )}

          <div className="space-y-2.5 pt-2">
            {menu?.map((item, idx) => (
              <div
                key={idx}
                style={{ borderBottomColor: 'var(--color-border)' }}
                className="border-b pb-2.5"
              >
                <a
                  href={item.href}
                  style={{ color: 'var(--color-text)' }}
                  className="text-sm font-bold uppercase tracking-wide block py-1 hover:text-[var(--color-primary)]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
                {item.subMenu && item.subMenu.length > 0 && (
                  <div className="pl-3 mt-1 space-y-1">
                    {item.subMenu.map((sub, sIdx) => (
                      <a
                        key={sIdx}
                        href={sub.href}
                        style={{ color: 'var(--color-text-muted)' }}
                        className="block text-xs hover:text-[var(--color-primary)] py-0.5"
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

          {config?.showAuth && (
            <div
              style={{ borderTopColor: 'var(--color-border)' }}
              className="pt-2 border-t flex items-center justify-between text-xs"
            >
              <span style={{ color: 'var(--color-text)' }}>
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