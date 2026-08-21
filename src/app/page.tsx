"use client";

import React, { useState } from "react";
import HeaderLayout from "@/themes/fizzyGoblet/header/layout_template";
import FooterLayout from "@/themes/fizzyGoblet/footer/layout_template";
import sampleFooterProps from "@/themes/fizzyGoblet/footer/props.sample";
import sampleHeaderProps from "@/themes/fizzyGoblet/header/props.sample";
import HeroLayout from "@/themes/fizzyGoblet/hero/layout_template";
import sampleHeroProps from "@/themes/fizzyGoblet/hero/props.sample";
import BrandStoryLayout from "@/themes/fizzyGoblet/brandStory/layout_template";
import sampleBrandStoryProps from "@/themes/fizzyGoblet/brandStory/props.sample";
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


import CartLayout from "@/themes/fizzyGoblet/cart/layout_template";
import sampleCartProps from "@/themes/fizzyGoblet/cart/props.sample";

export default function PlaygroundPage() {
  const [activeTheme] = useState<string>("fizzyGoblet");
  const [activeComponent, setActiveComponent] = useState<"header" | "hero" | "cart" | "all">("all");
  const [activeTab, setActiveTab] = useState<"ui" | "props">("ui");

  return (
    <div
      className="min-h-screen font-sans antialiased transition-colors"
      style={{
        backgroundColor: "var(--color-background)",
        color: "var(--color-text)",
      }}
    >

      {/* Main Canvas */}
      <main className="">
        {activeTab === "ui" ? (
          <div className="space-y-0">
            {(activeComponent === "all" || activeComponent === "header") && (
              <HeaderLayout {...sampleHeaderProps} />
            )}

            {(activeComponent === "all" || activeComponent === "hero") && (
              <HeroLayout {...sampleHeroProps} />
            )}

            {(activeComponent === "all") && (
              <MainCategoryLayout {...sampleMainCategoryProps } />
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
              <AccessoryCategoryLayout {...sampleAccessoryCategoryProps } />
            )}

             {(activeComponent === "all") && (
              <ProductCollectionLayout {...sampleProductCollectionProps} />
            )} 

            {(activeComponent === "all") && (
              <GridCategoryLayout {...sampleGridCategoryProps} />
            )}  

            {(activeComponent === "all") && (
              <BrandStoryLayout {...sampleBrandStoryProps } />
            )} 

            {(activeComponent === "all") && (
              <TestimonialsLayout {...sampleTestimonialsProps} />
            )}  

            {/* {(activeComponent === "all" || activeComponent === "cart") && (
              <div className="space -y-2 max-w-lg mx-auto">
                <div className="text-xs font-mono uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>
                  src/themes/fizzyGoblet/cart/layout_template.tsx
                </div>
                <div className="border rounded-2xl overflow-hidden shadow-sm" style={{ borderColor: "var(--color-border)" }}>
                  <CartLayout {...sampleCartProps} />
                </div>
              </div>
            )} */}

            {(activeComponent === "all") && (
              <FooterLayout {...sampleFooterProps} />
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
