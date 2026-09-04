"use client";

import React, { useState } from "react";
/* Fizzy Goblet Imports */
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
import sampleMainCategoryProps from "@/themes/fizzyGoblet/categoryCollections/mainCategory/props.sample";
import ShopByCategoryLayout from "@/themes/fizzyGoblet/categoryCollections/shopByCategory/layout_template";
import sampleShopByCategoryProps from "@/themes/fizzyGoblet/categoryCollections/shopByCategory/props.sample";
import AccessoryCategoryLayout from "@/themes/fizzyGoblet/categoryCollections/accessoryCategory/layout_template";
import sampleAccessoryCategoryProps from "@/themes/fizzyGoblet/categoryCollections/accessoryCategory/props.sample";
import GridCategoryLayout from "@/themes/fizzyGoblet/categoryCollections/gridCategory/layout_template";
import sampleGridCategoryProps from "@/themes/fizzyGoblet/categoryCollections/gridCategory/props.sample";
import ProductCollectionLayout from "@/themes/fizzyGoblet/productCollections/productCollection1/layout_template";
import sampleProductCollectionProps from "@/themes/fizzyGoblet/productCollections/productCollection1/props.samples";
import WishlistLayout from "@/themes/fizzyGoblet/wishList/layout_template";
import sampleWishlistProps from "@/themes/fizzyGoblet/wishList/props.sample";
import ProductDetailLayout from "@/themes/fizzyGoblet/productDetails/layout_template";
import sampleProductDetailProps from "@/themes/fizzyGoblet/productDetails/props.sample";
import ProductListingLayout from "@/themes/fizzyGoblet/productListing/layout_template";
import sampleProductListingProps from "@/themes/fizzyGoblet/productListing/props.sample";
import CartLayout from "@/themes/fizzyGoblet/cart/layout_template";
import sampleCartProps from "@/themes/fizzyGoblet/cart/props.sample";

/* Dot & Key Imports */
import DotAndKeyHeaderLayout from "@/themes/DotAndkey/header/layout_template";
import sampleDotAndKeyHeaderProps from "@/themes/DotAndkey/header/props.sample";
import DotAndKeyHeroLayout from "@/themes/DotAndkey/hero/layout_template";
import sampleDotAndKeyHeroProps from "@/themes/DotAndkey/hero/props.sample";
import DotAndKeyProductDetailLayout from "@/themes/DotAndkey/productDetails/layout_template";
import sampleDotAndKeyProductDetailProps from "@/themes/DotAndkey/productDetails/props.sample";
import DotAndKeyProductListingLayout from "@/themes/DotAndkey/productListing/layout_template";
import sampleDotAndKeyProductListingProps from "@/themes/DotAndkey/productListing/props.sample";
import DotAndKeyExploreRangeCategoryLayout from "@/themes/DotAndkey/categoryCollections/exploreRangeCategory/layout_template";
import sampleDotAndKeyExploreRangeProps from "@/themes/DotAndkey/categoryCollections/exploreRangeCategory/props.sample";
import DotAndKeyProductCollectionLayout from "@/themes/DotAndkey/productCollections/productCollection1/layout_template";
import sampleDotAndKeyProductCollectionProps from "@/themes/DotAndkey/productCollections/productCollection1/props.samples";
import DotAndKeyProductVideoCollectionLayout from "@/themes/DotAndkey/productCollections/productVideoCollection2/layout_template";
import sampleDotAndKeyProductVideoCollectionProps from "@/themes/DotAndkey/productCollections/productVideoCollection2/props.samples";
import DotAndKeyAboutUsLayout from "@/themes/DotAndkey/aboutUs/layout_template";
import sampleDotAndKeyAboutUsProps from "@/themes/DotAndkey/aboutUs/props.sample";
import DotAndKeyProductReviewsLayout from "@/themes/DotAndkey/productReviews/layout_template";
import sampleDotAndKeyProductReviewsProps from "@/themes/DotAndkey/productReviews/props.sample";
import DotAndKeyBrandPromisesLayout from "@/themes/DotAndkey/brandPromises/layout_template";
import sampleDotAndKeyBrandPromiseProps from "@/themes/DotAndkey/brandPromises/props.sample";
import DotAndKeyAppBannerLayout from "@/themes/DotAndkey/appBanner/layout_template";
import sampleDotAndKeyAppBannerProps from "@/themes/DotAndkey/appBanner/props.sample";
import DotAndKeyFooterLayout from "@/themes/DotAndkey/footer/layout_template";
import sampleDotAndKeyFooterProps from "@/themes/DotAndkey/footer/props.sample";
import DotAndKeyCartLayout from "@/themes/DotAndkey/cart/layout_template";
import sampleDotAndKeyCartProps from "@/themes/DotAndkey/cart/props.sample";

/* Eye Lounge Imports */
import EyeLoungeHeaderLayout from "@/themes/eyeLoungeOnline/header/layout_template";
import sampleEyeLoungeHeaderProps from "@/themes/eyeLoungeOnline/header/props.sample";
import EyeLoungeHeroLayout from "@/themes/eyeLoungeOnline/hero/layout_template";
import sampleEyeLoungeHeroProps from "@/themes/eyeLoungeOnline/hero/props.sample";
import EyeLoungeMainCategoryLayout from "@/themes/eyeLoungeOnline/categoryCollections/mainCategory/layout_template";
import sampleEyeLoungeMainCategoryProps from "@/themes/eyeLoungeOnline/categoryCollections/mainCategory/props.sample";
import EyeLoungeProductCollectionLayout from "@/themes/eyeLoungeOnline/productCollections/layout_template";
import sampleEyeLoungeProductCollectionProps from "@/themes/eyeLoungeOnline/productCollections/props.samples";
import EyeLoungeBrandStoryLayout from "@/themes/eyeLoungeOnline/brandStory/layout_template";
import sampleEyeLoungeBrandStoryProps from "@/themes/eyeLoungeOnline/brandStory/props.sample";
import EyeLoungeBrandPromisesLayout from "@/themes/eyeLoungeOnline/brandPromises/layout_template";
import sampleEyeLoungeBrandPromisesProps from "@/themes/eyeLoungeOnline/brandPromises/props.sample";
import EyeLoungeFooterLayout from "@/themes/eyeLoungeOnline/footer/layout_template";
import sampleEyeLoungeFooterProps from "@/themes/eyeLoungeOnline/footer/props.sample";
import EyeLoungeAboutUsLayout from "@/themes/eyeLoungeOnline/aboutUs/layout_template";
import sampleEyeLoungeAboutUsProps from "@/themes/eyeLoungeOnline/aboutUs/props.sample";
import EyeLoungeWishlistLayout from "@/themes/eyeLoungeOnline/wishList/layout_template";
import sampleEyeLoungeWishlistProps from "@/themes/eyeLoungeOnline/wishList/props.sample";
import EyeLoungeCartLayout from "@/themes/eyeLoungeOnline/cart/layout_template";
import sampleEyeLoungeCartProps from "@/themes/eyeLoungeOnline/cart/props.sample";
import EyeLoungeProductListingLayout from "@/themes/eyeLoungeOnline/productListing/layout_template";
import sampleEyeLoungeProductListingProps from "@/themes/eyeLoungeOnline/productListing/props.sample";




export default function PlaygroundPage() {
  const [activeTheme, setActiveTheme] = useState<"fizzyGoblet" | "dotAndKey" | "eyeLounge">("eyeLounge");
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
      {/* Top Floating Theme Switcher Controls */}
      {/* <header className="sticky top-0 z-[60] bg-neutral-900/90 backdrop-blur-md text-white px-4 py-2 flex items-center justify-center border-b border-neutral-800 text-xs shadow-md">
        <div className="flex items-center gap-2">
          <span className="text-neutral-400 font-medium">Active Theme:</span>
          <div className="inline-flex p-0.5 bg-neutral-800 rounded-md">
            <button
              type="button"
              onClick={() => setActiveTheme("fizzyGoblet")}
              className={`px-3 py-1 rounded-sm font-semibold transition-colors cursor-pointer ${
                activeTheme === "fizzyGoblet"
                  ? "bg-white text-black shadow-xs"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Fizzy Goblet
            </button>
            <button
              type="button"
              onClick={() => setActiveTheme("dotAndKey")}
              className={`px-3 py-1 rounded-sm font-semibold transition-colors cursor-pointer ${
                activeTheme === "dotAndKey"
                  ? "bg-white text-black shadow-xs"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Dot & Key
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("ui")}
            className={`px-2.5 py-1 rounded-xs cursor-pointer ${
              activeTab === "ui" ? "bg-neutral-700 text-white font-bold" : "text-neutral-400"
            }`}
          >
            UI
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("props")}
            className={`px-2.5 py-1 rounded-xs cursor-pointer ${
              activeTab === "props" ? "bg-neutral-700 text-white font-bold" : "text-neutral-400"
            }`}
          >
            Props JSON
          </button>
        </div>
      </header> */}

      {/* Main Canvas */}
      <main className="relative">
        {activeTab === "ui" ? (
          activeTheme === "fizzyGoblet" ? (
            /* Fizzy Goblet Full Suite */
            <div className="space-y-0">
              {(activeComponent === "all" || activeComponent === "header") && (
                <HeaderLayout {...sampleHeaderProps} />
              )}

              {(activeComponent === "all" || activeComponent === "hero") && (
                <HeroLayout {...sampleHeroProps} />
              )}

              {activeComponent === "all" && (
                <ProductListingLayout {...sampleProductListingProps} />
              )}

              {activeComponent === "all" && (
                <ProductDetailLayout {...sampleProductDetailProps} />
              )}

              {activeComponent === "all" && (
                <MainCategoryLayout {...sampleMainCategoryProps} />
              )}
              {activeComponent === "all" && (
                <ProductCollectionLayout {...sampleProductCollectionProps} />
              )}

              {activeComponent === "all" && (
                <ProductCollectionLayout {...sampleProductCollectionProps} />
              )}

              {activeComponent === "all" && (
                <ShopByCategoryLayout {...sampleShopByCategoryProps} />
              )}

              {activeComponent === "all" && (
                <AccessoryCategoryLayout {...sampleAccessoryCategoryProps} />
              )}

              {activeComponent === "all" && (
                <ProductCollectionLayout {...sampleProductCollectionProps} />
              )}

              {activeComponent === "all" && (
                <GridCategoryLayout {...sampleGridCategoryProps} />
              )}

              {activeComponent === "all" && (
                <OurStorySectionLayout {...sampleOurStoryProps} />
              )}

              {activeComponent === "all" && (
                <BrandStoryLayout {...sampleBrandStoryProps} />
              )}

              {activeComponent === "all" && (
                <AboutUsLayout {...sampleAboutUsProps} />
              )}

              {activeComponent === "all" && (
                <WishlistLayout {...sampleWishlistProps} />
              )}

              {activeComponent === "all" && (
                <TestimonialsLayout {...sampleTestimonialsProps} />
              )}

              <button
                className="bg-red-500 text-white px-4 py-2 text-xs font-semibold m-4 rounded cursor-pointer"
                onClick={() => {
                  setIsCartOpen(true);
                }}
              >
                Open cart
              </button>

              {activeComponent === "all" && (
                <FooterLayout {...sampleFooterProps} />
              )}

              {/* Slide-over Right Cart Drawer */}
              {isCartOpen && (
                <CartLayout
                  {...sampleCartProps}
                  isSidebar={true}
                  onClose={() => setIsCartOpen(false)}
                />
              )}
            </div>
          ) : activeTheme === "dotAndKey" ? (
            /* Dot & Key Theme Suite */
            <div className="space-y-0">
              <DotAndKeyHeaderLayout
                {...sampleDotAndKeyHeaderProps}
                onCartToggle={() => setIsCartOpen(true)}
              />
              <DotAndKeyHeroLayout {...sampleDotAndKeyHeroProps} />
              <DotAndKeyProductDetailLayout {...sampleDotAndKeyProductDetailProps} />
              <DotAndKeyProductListingLayout {...sampleDotAndKeyProductListingProps} />
              <DotAndKeyExploreRangeCategoryLayout {...sampleDotAndKeyExploreRangeProps} />
              <DotAndKeyProductCollectionLayout {...sampleDotAndKeyProductCollectionProps} />
              <DotAndKeyProductVideoCollectionLayout {...sampleDotAndKeyProductVideoCollectionProps} />
              <DotAndKeyAboutUsLayout {...sampleDotAndKeyAboutUsProps} />
              <DotAndKeyProductReviewsLayout {...sampleDotAndKeyProductReviewsProps} />
              <DotAndKeyBrandPromisesLayout {...sampleDotAndKeyBrandPromiseProps} />
              <DotAndKeyAppBannerLayout {...sampleDotAndKeyAppBannerProps} />
              <DotAndKeyFooterLayout {...sampleDotAndKeyFooterProps} />

              {/* Slide-over Right Cart Drawer */}
              {isCartOpen && (
                <DotAndKeyCartLayout
                  {...sampleDotAndKeyCartProps}
                  isSidebar={true}
                  onClose={() => setIsCartOpen(false)}
                />
              )}
            </div>
          ) : (
            /* Eye Lounge Theme Suite */
            <div className="space-y-0">
              <EyeLoungeHeaderLayout
                {...sampleEyeLoungeHeaderProps}
                onCartToggle={() => setIsCartOpen(true)}
              />
              <EyeLoungeHeroLayout {...sampleEyeLoungeHeroProps} />
              <EyeLoungeProductListingLayout {...sampleEyeLoungeProductListingProps} />
              <EyeLoungeMainCategoryLayout {...sampleEyeLoungeMainCategoryProps} />
              <EyeLoungeProductCollectionLayout {...sampleEyeLoungeProductCollectionProps} />
              <EyeLoungeBrandStoryLayout {...sampleEyeLoungeBrandStoryProps} />
              <EyeLoungeAboutUsLayout {...sampleEyeLoungeAboutUsProps} />
              <EyeLoungeWishlistLayout {...sampleEyeLoungeWishlistProps} />
              <EyeLoungeBrandPromisesLayout {...sampleEyeLoungeBrandPromisesProps} />
              <EyeLoungeFooterLayout {...sampleEyeLoungeFooterProps} />

              {/* Slide-over Right Cart Drawer */}
              {isCartOpen && (
                <EyeLoungeCartLayout
                  {...sampleEyeLoungeCartProps}
                  isSidebar={true}
                  onClose={() => setIsCartOpen(false)}
                />
              )}
            </div>
          )
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
            <div
              className="pb-3 mb-3 border-b font-sans text-sm font-bold"
              style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
            >
              Active Props Sample for Theme:{" "}
              <span className="font-mono uppercase" style={{ color: "var(--color-primary)" }}>
                {activeTheme}
              </span>
            </div>
            <pre>
              {JSON.stringify(
                activeTheme === "fizzyGoblet"
                  ? { header: sampleHeaderProps, hero: sampleHeroProps, cart: sampleCartProps }
                  : activeTheme === "dotAndKey"
                  ? {
                      header: sampleDotAndKeyHeaderProps,
                      hero: sampleDotAndKeyHeroProps,
                      productDetail: sampleDotAndKeyProductDetailProps,
                      productListing: sampleDotAndKeyProductListingProps,
                      exploreRangeCategory: sampleDotAndKeyExploreRangeProps,
                      productCollection: sampleDotAndKeyProductCollectionProps,
                      productVideoCollection: sampleDotAndKeyProductVideoCollectionProps,
                      aboutUs: sampleDotAndKeyAboutUsProps,
                      productReviews: sampleDotAndKeyProductReviewsProps,
                      brandPromises: sampleDotAndKeyBrandPromiseProps,
                      appBanner: sampleDotAndKeyAppBannerProps,
                      footer: sampleDotAndKeyFooterProps,
                      cart: sampleDotAndKeyCartProps,
                    }
                  : {
                      header: sampleEyeLoungeHeaderProps,
                      hero: sampleEyeLoungeHeroProps,
                      productListing: sampleEyeLoungeProductListingProps,
                      mainCategory: sampleEyeLoungeMainCategoryProps,
                      productCollection: sampleEyeLoungeProductCollectionProps,
                      brandStory: sampleEyeLoungeBrandStoryProps,
                      aboutUs: sampleEyeLoungeAboutUsProps,
                      wishlist: sampleEyeLoungeWishlistProps,
                      brandPromises: sampleEyeLoungeBrandPromisesProps,
                      footer: sampleEyeLoungeFooterProps,
                      cart: sampleEyeLoungeCartProps,
                    },
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
