"use client";

import React, { useState } from "react";
import HeaderLayout from "@/themes/fizzyGoblet/header/layout_template";
import FooterLayout from "@/themes/fizzyGoblet/footer/layout_template";
import sampleFooterProps from "@/themes/fizzyGoblet/footer/props.sample";
import sampleHeaderProps from "@/themes/fizzyGoblet/header/props.sample";
import HeroLayout from "@/themes/fizzyGoblet/hero/layout_template";
import sampleHeroProps from "@/themes/fizzyGoblet/hero/props.sample";
import BrandStoryLayout from "@/themes/fizzyGoblet/brandStory/ourStore/layout_template";
import sampleBrandStoryProps from "@/themes/fizzyGoblet/brandStory/ourStore/props.sample";
import OurStorySectionLayout from "@/themes/fizzyGoblet/brandStory/ourStory/layout_template";
import sampleOurStoryProps from "@/themes/fizzyGoblet/brandStory/ourStory/props.sample";
import AboutUsLayout from "@/themes/fizzyGoblet/aboutUs/layout_template";
import sampleAboutUsProps from "@/themes/fizzyGoblet/aboutUs/props.sample";
import TestimonialsLayout from "@/themes/fizzyGoblet/testimonials/layout_template";
import sampleTestimonialsProps from "@/themes/fizzyGoblet/testimonials/props.sample";
import MainCategoryLayout from "@/themes/fizzyGoblet/categoryCollections/mainCategory/layout_template";
import sampleMainCategoryProps from "@/themes/fizzyGoblet/categoryCollections/mainCategory/props.sample"
import ShopByCategoryLayout from "@/themes/fizzyGoblet/categoryCollections/shopByCategory/layout_template";
import sampleShopByCategoryProps from "@/themes/fizzyGoblet/categoryCollections/shopByCategory/props.sample"
import AccessoryCategoryLayout from "@/themes/fizzyGoblet/categoryCollections/accessoryCategory/layout_template";
import sampleAccessoryCategoryProps from "@/themes/fizzyGoblet/categoryCollections/accessoryCategory/props.sample"
import GridCategoryLayout from "@/themes/fizzyGoblet/categoryCollections/gridCategory/layout_template";
import sampleGridCategoryProps from "@/themes/fizzyGoblet/categoryCollections/gridCategory/props.sample"
import ProductCollectionLayout from "@/themes/fizzyGoblet/productCollections/productCollection1/layout_template";
import sampleProductCollectionProps from "@/themes/fizzyGoblet/productCollections/productCollection1/props.samples";
import WishlistLayout from "@/themes/fizzyGoblet/wishList/layout_template";
import sampleWishlistProps from "@/themes/fizzyGoblet/wishList/props.sample";
import ProductDetailLayout from "@/themes/fizzyGoblet/productDetails/layout_template";
import sampleProductDetailProps from "@/themes/fizzyGoblet/productDetails/props.sample";

import CartLayout from "@/themes/fizzyGoblet/cart/layout_template";
import sampleCartProps from "@/themes/fizzyGoblet/cart/props.sample";

export default function PlaygroundPage() {
  const [activeTheme] = useState<string>("fizzyGoblet");
  const [activeComponent, setActiveComponent] = useState<"header" | "hero" | "cart" | "all">("all");
  const [activeTab, setActiveTab] = useState<"ui" | "props">("ui");
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  return (
    <div
      className="min-h-screen font-sans antialiased transition-colors"
      style={{
        backgroundColor: "var(--color-background)",
        color: "var(--color-text)",
      }}
    >

      {/* Main Canvas */}
      <main className="relative">
        {activeTab === "ui" ? (
          <div className="space-y-0">
            {(activeComponent === "all" || activeComponent === "header") && (
              <HeaderLayout {...sampleHeaderProps} />
            )}

            {(activeComponent === "all" || activeComponent === "hero") && (
              <HeroLayout {...sampleHeroProps} />
            )}

            {(activeComponent === "all") && (
              <ProductDetailLayout {...sampleProductDetailProps} />
            )}

            {(activeComponent === "all") && (
              <MainCategoryLayout {...sampleMainCategoryProps} />
            )}
            {(activeComponent === "all") && (
              <ProductCollectionLayout {...sampleProductCollectionProps} />
            )}

            {(activeComponent === "all") && (
              <ProductCollectionLayout {...sampleProductCollectionProps} />
            )}

            {(activeComponent === "all") && (
              <ShopByCategoryLayout {...sampleShopByCategoryProps} />
            )}

            {(activeComponent === "all") && (
              <AccessoryCategoryLayout {...sampleAccessoryCategoryProps} />
            )}

            {(activeComponent === "all") && (
              <ProductCollectionLayout {...sampleProductCollectionProps} />
            )}

            {(activeComponent === "all") && (
              <GridCategoryLayout {...sampleGridCategoryProps} />
            )}

            {(activeComponent === "all") && (
              <OurStorySectionLayout {...sampleOurStoryProps} />
            )}

            {(activeComponent === "all") && (
              <BrandStoryLayout {...sampleBrandStoryProps} />
            )}

            {(activeComponent === "all") && (
              <AboutUsLayout {...sampleAboutUsProps} />
            )}

            {(activeComponent === "all") && (
              <WishlistLayout {...sampleWishlistProps} />
            )}

            {(activeComponent === "all") && (
              <TestimonialsLayout {...sampleTestimonialsProps} />
            )}

            <button className="bg-red-500 text-white px-4 py-2 text-xs font-semibold m-4 rounded" onClick={() => { setIsCartOpen(true) }}>
              Open cart
            </button>

            {(activeComponent === "all") && (
              <FooterLayout {...sampleFooterProps} />
            )}

            {/* Slide-over Right Cart Drawer with Left Dark Translucent Overlay */}
            {isCartOpen && (
              <CartLayout
                {...sampleCartProps}
                isSidebar={true}
                onClose={() => setIsCartOpen(false)}
              />
            )}
          </div>
        ) : (
          /* Props JSON Inspector */
          <div
            className="border rounded-2xl p-6 font-mono text-xs overflow-x-auto shadow-sm"
            style={{
              backgroundColor: "var(--color-surface-light)",
              borderColor: "var(--color-border)",
              color: "var(--color-primary)",
            }}
          >
            <div className="pb-3 mb-3 border-b font-sans text-sm font-bold" style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}>
              Active Props Sample for: <span className="font-mono uppercase" style={{ color: "var(--color-primary)" }}>{activeComponent}</span>
            </div>
            <pre>
              {JSON.stringify(
                activeComponent === "header"
                  ? sampleHeaderProps
                  : activeComponent === "hero"
                    ? sampleHeroProps
                    : activeComponent === "cart"
                      ? sampleCartProps
                      : { header: sampleHeaderProps, hero: sampleHeroProps, cart: sampleCartProps },
                null,
                2
              )}
            </pre>
          </div>
        )}
      </main>
    </div>
  );
}
