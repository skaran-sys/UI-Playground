"use client";

import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface ConfigType {
    layout_id: string;
    [key: string]: any;
}

type Item = {
    id: string;
    image: string;
    hover_image?: string;
    title: string;
    subtitle?: string;
    link?: string;
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

export interface CollectionProps {
    config: Config;
}

export interface CollectionLayoutPropType {
    items?: Item[];
    config: Config;
    isLoading: boolean;
}

export default function Layout(props: CollectionLayoutPropType) {
    const { items = [], config, isLoading = false } = props;
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [hasOverflow, setHasOverflow] = useState<boolean>(false);
    const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
    const [canScrollRight, setCanScrollRight] = useState<boolean>(false);

    const checkScrollOverflow = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            const isOverflowing = scrollWidth > clientWidth + 2;
            setHasOverflow(isOverflowing);
            setCanScrollLeft(scrollLeft > 5);
            setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
        }
    };

    useEffect(() => {
        checkScrollOverflow();
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScrollOverflow);
        }
        window.addEventListener('resize', checkScrollOverflow);
        return () => {
            if (container) container.removeEventListener('scroll', checkScrollOverflow);
            window.removeEventListener('resize', checkScrollOverflow);
        };
    }, [items]);

    if (!items.length && !config?.show_header && !isLoading) {
        return null;
    }

    // Header Sizing Classes
    const headerSizeClasses: Record<string, string> = {
        small: "text-lg sm:text-xl font-serif",
        medium: "text-xl sm:text-2xl font-serif",
        large: "text-2xl sm:text-3xl lg:text-4xl font-serif",
        "extra-large": "text-3xl sm:text-4xl lg:text-5xl font-serif"
    };
    const resolvedHeaderSize = headerSizeClasses[config?.header_size || "large"] || headerSizeClasses.large;

    // Circular Card Dimension Scaling
    const circleSizeClasses: Record<string, string> = {
        small: "w-20 h-20 sm:w-24 sm:h-24",
        medium: "w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32",
        large: "w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40"
    };
    const resolvedCircleSize = circleSizeClasses[config?.card_size || "medium"] || circleSizeClasses.medium;

    // Grid Layout Columns
    const gridClasses: Record<string, string> = {
        small: "grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-4 sm:gap-6",
        medium: "grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-5 sm:gap-8",
        large: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-10"
    };
    const resolvedGridClass = gridClasses[config?.card_size || "medium"] || gridClasses.medium;

    const isHeaderCentered = config?.header_alignment === "center";
    const isGrid = (config?.overflow || "carousel") === "grid";
    const viewAllLink = config?.link || "#";

    const handleScrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -240, behavior: 'smooth' });
        }
    };

    const handleScrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 240, behavior: 'smooth' });
        }
    };

    return (
        <section
            id={config?.layout_id}
            style={{
                backgroundColor: 'var(--color-surface-light)',
                color: 'var(--color-text)'
            }}
            className="w-full py-6 select-none"
        >
            <div className="px-8 mx-auto">

                {/* ── 1. Section Header ── */}
                {config?.show_header && (
                    <div
                        className={`flex items-baseline mb-6 sm:mb-8 ${isHeaderCentered
                                ? 'flex-col sm:flex-row justify-center items-center gap-2 text-center'
                                : 'justify-between'
                            }`}
                    >
                        {config.title && (
                            <h2
                                style={{ color: 'var(--color-text)' }}
                                className={`${resolvedHeaderSize} font-bold tracking-tight`}
                            >
                                {config.title}
                            </h2>
                        )}

                        {config.view_all_text && (
                            <a
                                href={viewAllLink}
                                style={{ color: 'var(--color-text)' }}
                                className="text-xs sm:text-sm font-semibold tracking-wider hover:opacity-75 transition-opacity relative group pb-0.5"
                            >
                                {config.view_all_text}
                                <span
                                    style={{ backgroundColor: 'var(--color-text)' }}
                                    className="absolute bottom-0 left-0 w-full h-[1.5px] transition-transform duration-300"
                                />
                            </a>
                        )}
                    </div>
                )}

                {/* ── 2. Loading State Skeletons ── */}
                {isLoading ? (
                    <div className="flex items-center justify-center gap-6 sm:gap-8 overflow-hidden py-4">
                        {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                            <div key={n} className="flex flex-col items-center gap-3 animate-pulse flex-shrink-0">
                                <div className={`${resolvedCircleSize} rounded-full bg-[var(--color-surface-lighter)]`} />
                                <div className="h-3 w-16 bg-[var(--color-surface-lighter)] rounded" />
                            </div>
                        ))}
                    </div>
                ) : (
                    /* ── 3. Category Presentation (Grid or Carousel Track) ── */
                    <div className="relative group/rail">
                        {isGrid ? (
                            /* Grid Layout */
                            <div className={`grid ${resolvedGridClass} justify-items-center`}>
                                {items.map((item) => (
                                    <CategoryCircleCard
                                        key={item.id}
                                        item={item}
                                        circleSize={resolvedCircleSize}
                                        fallbackLink={viewAllLink}
                                    />
                                ))}
                            </div>
                        ) : (
                            /* Carousel Layout (Horizontal Swipe & Mouse Scroll Rail) */
                            <div className="relative flex items-center w-full">
                                {/* Left Navigation Chevron (Only visible when overflowing and scrolled right) */}
                                {hasOverflow && canScrollLeft && (
                                    <button
                                        type="button"
                                        onClick={handleScrollLeft}
                                        aria-label="Scroll left"
                                        style={{ color: 'var(--color-text)' }}
                                        className="absolute left-0 top-1/2 -translate-y-8 z-20 w-8 h-8 rounded-full flex items-center justify-center hover:opacity-70 transition-all bg-[var(--color-surface-light)] shadow-xs"
                                    >
                                        <ChevronLeft className="w-5 h-5 stroke-[1.75]" />
                                    </button>
                                )}

                                {/* Horizontal Scroll Track */}
                                <div
                                    ref={scrollContainerRef}
                                    style={{
                                        scrollbarWidth: 'none',
                                        msOverflowStyle: 'none'
                                    }}
                                    className={`flex items-start gap-6 sm:gap-8 lg:gap-10 overflow-x-auto snap-x snap-mandatory scroll-smooth w-full py-2 px-2 sm:px-4 [&::-webkit-scrollbar]:hidden ${
                                        hasOverflow ? 'justify-start' : 'justify-center'
                                    }`}
                                >
                                    {items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex-shrink-0 snap-start"
                                        >
                                            <CategoryCircleCard
                                                item={item}
                                                circleSize={resolvedCircleSize}
                                                fallbackLink={viewAllLink}
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Right Navigation Chevron (Only visible when overflowing and content remains) */}
                                {hasOverflow && canScrollRight && (
                                    <button
                                        type="button"
                                        onClick={handleScrollRight}
                                        aria-label="Scroll right"
                                        style={{ color: 'var(--color-text)' }}
                                        className="absolute right-0 top-1/2 -translate-y-8 z-20 w-8 h-8 rounded-full flex items-center justify-center hover:opacity-70 transition-all bg-[var(--color-surface-light)] shadow-xs"
                                    >
                                        <ChevronRight className="w-5 h-5 stroke-[1.75]" />
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                )}

            </div>
        </section>
    );
}

/* ── Category Circle Sub-component ── */
function CategoryCircleCard({
    item,
    circleSize,
    fallbackLink
}: {
    item: Item;
    circleSize: string;
    fallbackLink: string;
}) {
    const itemUrl = item.link || fallbackLink || '#';

    return (
        <a
            href={itemUrl}
            className="group flex flex-col items-center gap-2.5 text-center focus:outline-none"
        >
            {/* Circle Icon Container */}
            <div
                style={{
                    backgroundColor: 'var(--color-surface-lighter)',
                    borderColor: 'transparent'
                }}
                className={`relative ${circleSize} rounded-full overflow-hidden flex items-center justify-center p-3 transition-all duration-300 group-hover:scale-105 group-hover:shadow-sm`}
            >
                {/* Base Image */}
                {item.image && (
                    <img
                        src={item.image}
                        alt={item.title}
                        className={`w-full h-full object-contain transition-all duration-500 ${item.hover_image ? 'group-hover:opacity-0' : ''
                            }`}
                        loading="lazy"
                    />
                )}

                {/* Hover Secondary Image (Smooth Fade Transition) */}
                {item.hover_image && (
                    <img
                        src={item.hover_image}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-contain p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        loading="lazy"
                    />
                )}
            </div>

            {/* Category Label */}
            <div className="flex flex-col items-center">
                <span
                    style={{ color: 'var(--color-text)' }}
                    className="text-xs sm:text-sm font-normal tracking-wide group-hover:text-[var(--color-primary)] group-hover:underline underline-offset-4 transition-colors max-w-[100px] sm:max-w-[120px] leading-tight"
                >
                    {item.title}
                </span>

                {item.subtitle && (
                    <span
                        style={{ color: 'var(--color-text-muted)' }}
                        className="text-[10px] sm:text-xs font-normal opacity-80 mt-0.5 line-clamp-1"
                    >
                        {item.subtitle}
                    </span>
                )}
            </div>
        </a>
    );
}