'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Plus,
  X,
  Volume2,
  VolumeX,
  ChevronDown
} from 'lucide-react';

/* ── 1. Schema Types ── */
export interface ConfigType {
  layout_id: string;
  [key: string]: any;
}

export type Item = {
  id: string;
  image: string;
  hover_image: string;
  title: string;
  description: string;
  price: string;
  originalPrice: string;
  discount: string;
  badge: string;
  link?: string;
  video_url?: string;
  variants?: {
    label: string;
    id: string;
    price: string;
    color?: string;
  }[];
  rating?: number;
  reviewCount?: number;
  offerPrice?: string;
};

export interface Config extends ConfigType {
  title: string;
  view_all_text: string;
  link: string;
  cta_label: string;
  show_header: boolean;
  show_add_to_cart: boolean;
  show_wishlist: boolean;
  show_rating: boolean;
  overflow?: "carousel" | "grid" | string;
  header_size?: "small" | "medium" | "large" | "extra-large";
  header_alignment?: "left" | "center";
  card_size?: "small" | "medium" | "large";
}

export interface CollectionLayoutPropType {
  items?: Item[];
  config: Config;
  isLoading: boolean;
  addToCart: (id: string, qty: number, variantId?: string) => void;
  addToWishlist: (id: string) => void;
  updateQuantity: (id: string, qty: number, variantId?: string) => void;
  isWishlisted: (id: string) => boolean;
}

/* ── 2. Video Player Modal ── */
interface VideoModalProps {
  item: Item;
  onClose: () => void;
  addToCart: (id: string, qty: number, variantId?: string) => void;
}

const VideoModal = ({ item, onClose, addToCart }: VideoModalProps) => {
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [selectedVariant, setSelectedVariant] = useState(
    item.variants && item.variants.length > 0 ? item.variants[0] : null
  );
  const videoSrc = item.video_url || item.hover_image || item.image;
  const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(videoSrc) || videoSrc.includes('mixkit.co');
  const displayPrice = selectedVariant ? selectedVariant.price : item.price;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-[360px] sm:max-w-[400px] aspect-[9/16] max-h-[88vh] rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/10 flex flex-col">
        
        {/* Top Floating Bar */}
        <div className="absolute top-0 inset-x-0 p-4 z-20 flex items-center justify-between bg-gradient-to-b from-black/80 via-black/40 to-transparent">
          <div className="flex items-center gap-2.5 max-w-[70%]">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-white/20 border border-white/40 flex-shrink-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-white text-xs font-semibold leading-tight truncate">
              {item.title}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors cursor-pointer"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 stroke-[2]" />
              ) : (
                <Volume2 className="w-4 h-4 stroke-[2]" />
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Video Reel Player */}
        <div className="relative flex-1 w-full h-full bg-neutral-900">
          {isVideo ? (
            <video
              src={videoSrc}
              autoPlay
              muted={isMuted}
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={videoSrc}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Bottom Floating Card */}
        <div className="absolute bottom-4 inset-x-4 z-20 p-3.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/20 text-white space-y-2.5">
          {item.variants && item.variants.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {item.variants.map((v) => {
                const isSelected = selectedVariant?.id === v.id;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedVariant(v)}
                    className={`px-2.5 py-0.5 rounded-sm text-[11px] font-bold border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-white text-neutral-900 border-white'
                        : 'bg-black/40 text-white border-white/40 hover:border-white'
                    }`}
                  >
                    {v.label}
                  </button>
                );
              })}
            </div>
          )}

          <div className="flex items-center justify-between gap-3 pt-1">
            <span className="text-base font-black tracking-tight text-white">
              ₹{displayPrice}
            </span>

            <button
              type="button"
              onClick={() => {
                addToCart(item.id, 1, selectedVariant?.id);
                onClose();
              }}
              style={{
                backgroundColor: 'var(--color-primary, #EC1E63)',
                color: 'var(--color-primary-contrast, #FFFFFF)'
              }}
              className="px-5 py-2 rounded-md text-xs font-black tracking-wider uppercase hover:opacity-90 active:scale-95 transition-transform cursor-pointer"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── 3. Reel Card Component ── */
interface ReelCardProps {
  item: Item;
  isCenterFocused: boolean;
  onOpenVideo: (item: Item) => void;
  addToCart: (id: string, qty: number, variantId?: string) => void;
}

const ReelCard = ({
  item,
  isCenterFocused,
  onOpenVideo,
  addToCart
}: ReelCardProps) => {
  const hasShades = item.variants?.some((v) => Boolean(v.color));
  const [selectedVariant, setSelectedVariant] = useState(
    item.variants && item.variants.length > 0 ? item.variants[0] : null
  );

  const displayPrice = selectedVariant ? selectedVariant.price : item.price;

  return (
    <div
      style={{
        backgroundColor: 'var(--color-surface-light)',
        borderColor: isCenterFocused ? 'transparent' : 'var(--color-border)'
      }}
      className={`group/card flex flex-col rounded-2xl border overflow-hidden select-none transition-all duration-300 ${
        isCenterFocused
          ? 'scale-105 shadow-[0_0_18px_rgba(0,0,0,0.08)] z-10'
          : 'scale-100 opacity-95 hover:opacity-100 shadow-none'
      }`}
    >
      {/* 9:16 Video Area */}
      <div
        onClick={() => onOpenVideo(item)}
        className="relative aspect-[9/13] sm:aspect-[9/14] w-full overflow-hidden bg-neutral-900 cursor-pointer"
      >
        <img
          src={item.hover_image && !item.hover_image.includes('.mp4') ? item.hover_image : item.image}
          alt={item.title}
          draggable={false}
          className="w-full h-full object-cover object-center group-hover/card:scale-105 transition-transform duration-500 pointer-events-none"
        />

        {/* Play Icon */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover/card:bg-black/30 transition-colors">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/60 backdrop-blur-xs border border-white/40 flex items-center justify-center text-white shadow-sm transition-transform group-hover/card:scale-110">
            <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white ml-0.5" />
          </div>
        </div>

        {/* Bottom Subtitle */}
        {item.description && (
          <div className="absolute bottom-2.5 inset-x-3 text-center pointer-events-none">
            <p className="text-[11px] sm:text-xs font-medium text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] line-clamp-2">
              {item.description}
            </p>
          </div>
        )}
      </div>

      {/* Card Details Footer */}
      <div className="p-3 bg-[var(--color-surface-light)] flex flex-col justify-between flex-1 gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg overflow-hidden bg-[var(--color-surface-lighter)] flex-shrink-0 border border-[var(--color-border)]">
            <img
              src={item.image}
              alt={item.title}
              draggable={false}
              className="w-full h-full object-cover"
            />
          </div>
          <h3
            style={{ color: 'var(--color-text)' }}
            className="text-xs font-bold leading-tight truncate flex-1"
          >
            {item.title}
          </h3>
        </div>

        {/* Variants Selector */}
        {item.variants && item.variants.length > 0 && (
          <div className="flex items-center">
            {hasShades ? (
              <div className="relative w-full">
                <select
                  value={selectedVariant?.id}
                  onChange={(e) => {
                    const found = item.variants?.find((v) => v.id === e.target.value);
                    if (found) setSelectedVariant(found);
                  }}
                  style={{
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text)',
                    backgroundColor: 'var(--color-surface-lighter)'
                  }}
                  className="w-full text-[11px] font-semibold py-1 px-2 rounded-md border appearance-none cursor-pointer outline-none"
                >
                  {item.variants.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-text-muted)]" />
              </div>
            ) : (
              <div className="flex flex-wrap gap-1">
                {item.variants.map((v) => {
                  const isSelected = selectedVariant?.id === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      style={{
                        borderColor: isSelected
                          ? 'var(--color-primary)'
                          : 'var(--color-text-muted)',
                        color: isSelected
                          ? 'var(--color-primary)'
                          : 'var(--color-text)',
                        backgroundColor: isSelected
                          ? 'var(--color-surface)'
                          : 'transparent'
                      }}
                      className="px-2 py-0.5 rounded-[4px] text-[10px] font-bold border cursor-pointer transition-colors"
                    >
                      {v.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Price & Add Button */}
        <div className="flex items-center justify-between pt-1">
          <span
            style={{ color: 'var(--color-text)' }}
            className="text-xs sm:text-sm font-black tracking-tight"
          >
            ₹{displayPrice}
          </span>

          <button
            type="button"
            onClick={() => addToCart(item.id, 1, selectedVariant?.id)}
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-primary-contrast)'
            }}
            className="w-6 h-6 rounded-full flex items-center justify-center hover:opacity-90 active:scale-95 shadow-xs cursor-pointer transition-transform"
            aria-label="Add product to cart"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── 4. Main Section Layout ── */
export default function Layout({
  items = [],
  config,
  isLoading,
  addToCart
}: CollectionLayoutPropType) {
  const [activeModalItem, setActiveModalItem] = useState<Item | null>(null);

  // Mouse Drag-to-Scroll
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const startXRef = useRef<number>(0);
  const scrollLeftRef = useRef<number>(0);
  const hasDraggedRef = useRef<boolean>(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('select')) return;
    setIsDragging(true);
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - (scrollRef.current?.offsetLeft || 0);
    scrollLeftRef.current = scrollRef.current?.scrollLeft || 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    if (Math.abs(walk) > 5) {
      hasDraggedRef.current = true;
    }
    scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleOpenVideo = (item: Item) => {
    if (!hasDraggedRef.current) {
      setActiveModalItem(item);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full py-16 flex justify-center text-sm font-medium text-[var(--color-text-muted)]">
        Loading reels...
      </div>
    );
  }

  if (!items || items.length === 0) return null;

  return (
    <section
      style={{ backgroundColor: 'var(--color-background)' }}
      className="w-full py-12 px-4 sm:px-6 lg:px-10 overflow-hidden select-none"
    >
      <div className="max-w-[1400px] mx-auto">
        
        {/* ── Section Title ── */}
        {config.show_header && config.title && (
          <div className="text-center mb-10">
            <h2
              style={{ color: 'var(--color-text)' }}
              className="text-2xl sm:text-3xl font-extrabold tracking-tight"
            >
              {config.title}
            </h2>
          </div>
        )}

        {/* ── Drag Track: Exactly 5 items in desktop row, center box (index 2) scaled with equal 4-sided soft shadow ── */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`flex gap-4 sm:gap-5 overflow-x-auto py-6 px-3 scrollbar-none snap-x snap-mandatory ${
            isDragging ? 'cursor-grabbing select-none' : 'cursor-grab scroll-smooth'
          }`}
        >
          {items.map((item, idx) => (
            <div
              key={item.id}
              className="snap-center flex-shrink-0 w-[62%] sm:w-[38%] md:w-[28%] lg:w-[calc(20%-16px)]"
            >
              <ReelCard
                item={item}
                isCenterFocused={idx === 2}
                onOpenVideo={handleOpenVideo}
                addToCart={addToCart}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Video Modal ── */}
      {activeModalItem && (
        <VideoModal
          item={activeModalItem}
          onClose={() => setActiveModalItem(null)}
          addToCart={addToCart}
        />
      )}
    </section>
  );
}