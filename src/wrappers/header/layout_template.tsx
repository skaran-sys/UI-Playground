'use client'

import React from 'react'

export type MenuItem = {
  label: string
  href: string
  subMenu?: { label: string; href: string }[]
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
  onSearch: (query: string) => void
  onDeleteRecommendation: (id: string) => void
  loadRecommendations: () => void
  result: {
    categories: any[]
    products: { items: any[] }
  }
  popular: any[]
}

export type HeaderProps = {
  wishlistCount?: number
  cartCount?: number
  isAuthenticated?: boolean
  topMenuItems?: MenuItem[]
  logoUrl: string
  config: {
    layout_id: string
    showSearch: boolean
    showWishlist: boolean
    showCart: boolean
    showAuth: boolean
    fixed: boolean
    announcement: string | null
  }
  user: any
  logout: any
  storeName: string
  onSearch: (query: string) => void
  onDeleteRecommendation: (id: string) => void
  loadRecommendations: () => void
  searchResults: {
    categories: any[]
    products: { items: any[] }
  }
  popularSearch: any[]
  menu: MenuItem[]
}

export default function Layout(props: HeaderProps) {
  const {
    storeName = "Store",
    menu = [],
    cartCount = 0,
    wishlistCount = 0,
    isAuthenticated = false,
    config,
  } = props;

  return (
    <header className="w-full bg-zinc-900 text-white border-b border-zinc-800 sticky top-0 z-50">
      {/* Announcement Bar */}
      {config?.announcement && (
        <div className="bg-indigo-600 text-xs py-1.5 px-4 text-center font-medium">
          {config.announcement}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        {/* Logo / Store Name */}
        <div className="flex items-center gap-3">
          {props.logoUrl && (
            <img src={props.logoUrl} alt={storeName} className="h-8 w-auto object-contain" />
          )}
          <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            {storeName}
          </span>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-300">
          {menu.map((item, idx) => (
            <a key={idx} href={item.href} className="hover:text-white transition-colors">
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Controls (Search, Wishlist, Cart, Auth) */}
        <div className="flex items-center gap-4 text-sm font-medium">
          {config?.showWishlist && (
            <div className="relative cursor-pointer hover:text-indigo-400">
              <span>Wishlist ({wishlistCount})</span>
            </div>
          )}
          {config?.showCart && (
            <div className="relative cursor-pointer px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-sm">
              <span>Cart ({cartCount})</span>
            </div>
          )}
          {config?.showAuth && (
            <div>
              {isAuthenticated ? (
                <button onClick={props.logout} className="text-zinc-400 hover:text-white">
                  Logout
                </button>
              ) : (
                <span className="text-zinc-300 hover:text-white cursor-pointer">Sign In</span>
              )}
            </div>
          )}
        </div>
      </div>
    </header>

  );
}
