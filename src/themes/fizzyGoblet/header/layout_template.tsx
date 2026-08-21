'use client'

import React, { useState, useEffect, useRef } from 'react';
import { User, Zap } from 'lucide-react';

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

export type SearchBoxProps = {
  onSearch: (query: string) => void;
  onDeleteRecommendation: (id: string) => void;
  loadRecommendations: () => void;
  result: {
    categories: any[],
    products: { items: any[] },
  }
  popular: any[],
}

export type HeaderProps = {
  wishlistCount?: number
  cartCount?: number
  isAuthenticated?: boolean
  topMenuItems?: MenuItem[]
  logoUrl: string
  config: {
    layout_id: string,
    showSearch: boolean
    showWishlist: boolean
    showCart: boolean
    showAuth: boolean
    fixed: boolean
    announcement: string | null
  }
  user: any
  logout: any
  storeName: string;
  onSearch: (query: string) => void;
  onDeleteRecommendation: (id: string) => void;
  loadRecommendations: () => void;
  searchResults: {
    categories: any[],
    products: { items: any[] },
  }
  popularSearch: any[],
  menu: MenuItem[]
}

export default function Layout(props: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isNavHovered, setIsNavHovered] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen) {
      props.loadRecommendations?.();
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    props.onSearch?.(val);
  };

  const handleSelectPopular = (term: string) => {
    setSearchQuery(term);
    props.onSearch?.(term);
  };

  const isNavSolid = isScrolled || isNavHovered || Boolean(activeDropdown);

  return (
    <header
      className={`w-full z-50 transition-all duration-300 ${props.config?.fixed ? 'fixed top-0 left-0 right-0' : 'relative'
        }`}
    >
      {/* ── 1. Announcement Banner ── */}
      {props.config?.announcement && (
        <aside
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-surface-contrast)',
          }}
          className="w-full py-2 px-4 text-center text-xs sm:text-sm font-semibold tracking-wide"
        >
          <p className="truncate max-w-7xl mx-auto">
            {props.config.announcement}
          </p>
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
          backgroundColor: isNavSolid ? 'var(--color-surface-contrast)' : 'transparent',
          color: 'var(--color-primary-contrast)',
          borderBottom: isNavSolid ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent'
        }}
        className="w-full transition-colors duration-300 ease-in-out relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">

          {/* Left: Navigation Menu Items (Desktop) / Hamburger (Mobile) */}
          <div className="flex items-center gap-6 lg:w-1/3 h-full">
            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-md text-[var(--color-primary-contrast)] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Desktop Menu */}
            <ul className="hidden lg:flex items-center gap-6 xl:gap-8 h-full">
              {props.menu?.map((item, index) => {
                const hasSubMenu = Boolean(item.subMenu && item.subMenu.length > 0);
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
                      {/* Active / Hover bottom line indicator */}
                      {isHovered && (
                        <span
                          style={{ backgroundColor: 'var(--color-primary-contrast)' }}
                          className="absolute bottom-[-16px] sm:bottom-[-20px] left-0 right-0 h-[2px]"
                        />
                      )}
                    </a>

                    {/* Submenu Dropdown Panel (White Surface Container) */}
                    {hasSubMenu && isHovered && item.subMenu && (
                      <div
                        style={{
                          backgroundColor: 'var(--color-surface-light)',
                          color: 'var(--color-text)',
                          borderColor: 'var(--color-border)'
                        }}
                        className="absolute left-0 top-full min-w-[210px] rounded-b-md shadow-2xl py-4 px-2 z-50 border border-t-0"
                      >
                        <div className="flex flex-col gap-1">
                          {item.subMenu.map((sub, sIdx) => (
                            <a
                              key={sIdx}
                              href={sub.href}
                              style={{ color: 'var(--color-text)' }}
                              className="px-4 py-2 text-sm font-medium tracking-wide rounded-sm hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)] transition-colors block text-left"
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

          {/* Center: Brand Logo / Store Name */}
          <div className="flex justify-center items-center lg:w-1/3">
            <a href="/" className="inline-flex items-center justify-center">
              {props.logoUrl ? (
                <img
                  src={props.logoUrl}
                  alt={props.storeName}
                  className="h-7 sm:h-9 w-auto object-contain"
                />
              ) : (
                <span className="text-xl sm:text-2xl font-medium tracking-[0.18em] uppercase select-none text-center">
                  {props.storeName}
                </span>
              )}
            </a>
          </div>

          {/* Right: Actions (Search, Wishlist, User, Cart) */}
          <div className="flex items-center justify-end gap-4 sm:gap-6 lg:w-1/3">
            {/* Search Trigger */}
            {props.config?.showSearch && (
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="hidden sm:inline-flex items-center text-sm font-medium tracking-wide hover:opacity-80 transition-opacity"
              >
                Search
              </button>
            )}

            {/* Wishlist Link */}
            {props.config?.showWishlist && (
              <a
                href="/wishlist"
                className="hidden sm:inline-flex items-center text-sm font-medium tracking-wide hover:opacity-80 transition-opacity relative"
              >
                <span>Wishlist</span>
                {Boolean(props.wishlistCount && props.wishlistCount > 0) && (
                  <span
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      color: 'var(--color-surface-contrast)'
                    }}
                    className="ml-1 px-1.5 py-0.2 text-[10px] font-bold rounded-full"
                  >
                    {props.wishlistCount}
                  </span>
                )}
              </a>
            )}

            {/* Auth / Account Profile Action */}
            {props.config?.showAuth && (
              <div className="relative group">
                <a
                  href={props.isAuthenticated ? "/account" : "/signin"}
                  className="relative p-1 inline-flex items-center justify-center hover:opacity-80 transition-opacity"
                  aria-label="User Account"
                >
                  <User className="w-5 h-5 stroke-[2] text-current" />
                  <Zap className="w-3.5 h-3.5 absolute right-0 bottom-0 text-amber-500 fill-amber-500" />
                </a>
              </div>
            )}

            {/* Cart Link with Top-Right Superscript Badge */}
            {props.config?.showCart && (
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
                  className=" -translate-y-2 h-4 min-w-[16px] px-1 flex items-center justify-center text-[10px] font-extrabold rounded-full"
                >
                  {props.cartCount ?? 0}
                </span>
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* ── 3. Minimal Light Search Overlay ── */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/40 backdrop-blur-xs">
          <div
            style={{
              backgroundColor: 'var(--color-surface-light)',
              color: 'var(--color-text)',
              borderBottom: '1px solid var(--color-border)'
            }}
            className="w-full pt-8 pb-12 px-4 sm:px-8 shadow-2xl overflow-y-auto max-h-[90vh]"
          >
            <div className="max-w-6xl mx-auto relative">

              {/* Close Button Top-Right */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                style={{ color: 'var(--color-text)' }}
                className="absolute right-0 top-0 p-2 hover:opacity-60 transition-opacity"
                aria-label="Close Search"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Centered Search Bar */}
              <div className="max-w-xl mx-auto pt-2 pb-6">
                <div
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    borderColor: 'var(--color-border)'
                  }}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-sm border focus-within:border-[var(--color-text-muted)] transition-colors"
                >
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search our store"
                    style={{
                      color: 'var(--color-text)',
                      backgroundColor: 'transparent'
                    }}
                    className="w-full text-sm font-normal outline-none placeholder:text-[var(--color-text-light)]"
                  />
                  <button
                    type="button"
                    onClick={() => props.onSearch?.(searchQuery)}
                    style={{ color: 'var(--color-text)' }}
                    className="p-1 hover:opacity-75 transition-opacity"
                    aria-label="Submit Search"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Popular Searches Pills */}
              {props.popularSearch && props.popularSearch.length > 0 && !searchQuery && (
                <div className="max-w-4xl mx-auto mt-2">
                  <span
                    style={{ color: 'var(--color-text)' }}
                    className="text-xs uppercase tracking-widest block mb-3 font-semibold text-center sm:text-left"
                  >
                    POPULAR SEARCHES
                  </span>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    {props.popularSearch.map((term, pIdx) => {
                      const termLabel = typeof term === 'string' ? term : term.name || '';
                      return (
                        <button
                          key={pIdx}
                          type="button"
                          onClick={() => handleSelectPopular(termLabel)}
                          style={{
                            borderColor: 'var(--color-border)',
                            color: 'var(--color-text)',
                            backgroundColor: 'var(--color-surface-light)'
                          }}
                          className="text-xs uppercase font-medium px-4 py-1.5 rounded-full border hover:bg-[var(--color-surface)] transition-colors tracking-wider"
                        >
                          {termLabel}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Dynamic Search Results */}
              {searchQuery && (
                <div className="mt-8 space-y-8">
                  {/* Matching Categories */}
                  {props.searchResults?.categories?.length > 0 && (
                    <div>
                      <span
                        style={{ color: 'var(--color-text-muted)' }}
                        className="text-xs uppercase tracking-widest block mb-3 font-semibold"
                      >
                        Categories
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {props.searchResults.categories.map((cat) => (
                          <a
                            key={cat._id}
                            href={`/category/${cat._id}`}
                            style={{
                              borderColor: 'var(--color-border)',
                              color: 'var(--color-text)',
                              backgroundColor: 'var(--color-surface)'
                            }}
                            className="text-xs px-3.5 py-1.5 rounded-md border hover:bg-[var(--color-surface)] transition-colors font-medium"
                          >
                            {cat.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Matching Products Grid */}
                  {props.searchResults?.products?.items?.length > 0 && (
                    <div>
                      <span
                        style={{ color: 'var(--color-text-muted)' }}
                        className="text-xs uppercase tracking-widest block mb-4 font-semibold"
                      >
                        Products
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        {props.searchResults.products.items.map((prod) => (
                          <a
                            key={prod._id}
                            href={`/product/${prod._id}`}
                            style={{
                              borderColor: 'var(--color-border)',
                              backgroundColor: 'var(--color-surface-light)'
                            }}
                            className="group flex flex-col border rounded-sm overflow-hidden hover:shadow-md transition-shadow"
                          >
                            {prod.media?.coverImage?.sq1_1?.url ? (
                              <div className="aspect-square w-full overflow-hidden bg-[var(--color-surface)]">
                                <img
                                  src={prod.media.coverImage.sq1_1.url}
                                  alt={prod.title}
                                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            ) : (
                              <div className="aspect-square w-full bg-[var(--color-surface)] flex items-center justify-center">
                                <span style={{ color: 'var(--color-text-light)' }} className="text-xs">No image</span>
                              </div>
                            )}
                            <div className="p-3 flex flex-col gap-1">
                              <p
                                style={{ color: 'var(--color-text)' }}
                                className="text-xs font-semibold truncate"
                              >
                                {prod.title}
                              </p>
                              {prod.pricing?.sale !== undefined && (
                                <p
                                  style={{ color: 'var(--color-primary)' }}
                                  className="text-xs font-bold"
                                >
                                  ₹{prod.pricing.sale.toLocaleString('en-IN')}
                                </p>
                              )}
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>

          {/* Backdrop Click Dismiss */}
          <div className="flex-1" onClick={() => setIsSearchOpen(false)} />
        </div>
      )}

      {/* ── 4. Mobile Navigation Drawer ── */}
      {isMobileMenuOpen && (
        <div
          style={{
            backgroundColor: 'var(--color-surface-contrast)',
            color: 'var(--color-primary-contrast)'
          }}
          className="lg:hidden fixed inset-x-0 top-[var(--header-height,64px)] bottom-0 z-40 overflow-y-auto p-6 space-y-6 border-t border-white/10"
        >
          {props.config?.showSearch && (
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsSearchOpen(true);
              }}
              style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
              className="w-full text-left py-2.5 px-4 rounded-lg text-sm text-white/70 flex items-center justify-between"
            >
              <span>Search products...</span>
              <svg className="w-4 h-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          )}

          <div className="space-y-4">
            {props.menu?.map((item, idx) => (
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

          {props.topMenuItems && props.topMenuItems.length > 0 && (
            <div className="pt-2 space-y-2">
              {props.topMenuItems.map((topItem, tIdx) => (
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

          {props.config?.showAuth && (
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <span>{props.isAuthenticated && props.user?.name ? props.user.name : "My Account"}</span>
              {props.isAuthenticated ? (
                <button
                  type="button"
                  onClick={() => props.logout?.()}
                  style={{ color: 'var(--color-primary)' }}
                  className="font-bold underline"
                >
                  Sign Out
                </button>
              ) : (
                <a href="/signin" style={{ color: 'var(--color-primary)' }} className="font-bold">
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
