'use client';

import React from 'react';
import { ChevronRight, Lightbulb, MessageSquareQuote, Sparkles } from 'lucide-react';

/* ── 1. Strict Schema Types ── */
export type AboutUsProps = {
  config: {
    banner: string;
    story_line: {
      image: string;
      title: string;
      description: string;
      cta_text: string;
      cta_link: string;
    }[];
  };

  storeInfo: {
    name: string;
    email: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    contact: string;
    logo: string;
    business_category: string;
    tagline: string;
    short_description: string;
    existing_customers: number;
    rating: number;
  };
};

/* ── 2. Decorative Wavy Scallop Divider ── */
function ScallopDivider() {
  return (
    <div className="w-full overflow-hidden leading-none rotate-180">
      <svg
        viewBox="0 0 1200 30"
        preserveAspectRatio="none"
        className="w-full h-5 sm:h-7 fill-white"
      >
        <path d="M0,0 C150,30 350,-30 500,0 C650,30 850,-30 1000,0 C1100,20 1150,10 1200,0 L1200,30 L0,30 Z" />
      </svg>
    </div>
  );
}

/* ── 3. Main About Us Page Component ── */
export default function AboutUsPage({ config, storeInfo }: AboutUsProps) {
  const story1 = config?.story_line?.[0];
  const story2 = config?.story_line?.[1];
  const story3 = config?.story_line?.[2];

  return (
    <main
      style={{
        backgroundColor: 'var(--color-background, #FFFFFF)',
        color: 'var(--color-text, #1A0E14)'
      }}
      className="w-full min-h-screen select-none font-sans overflow-x-hidden pb-20"
    >
      {/* ── SECTION 1: Top Hero Banner with Curved Ribbon ── */}
      <div className="relative w-full bg-gradient-to-r from-[#FFB371] via-[#FF6C8B] to-[#FF8FA9] pt-8 sm:pt-12 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
          {/* Top Floating Ribbon Pill */}
          <div className="border border-white/60 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full mb-6 shadow-xs">
            <p className="text-white text-xs sm:text-sm font-extrabold tracking-widest uppercase">
              MINDFULLY FORMULATED, POTENT SKINCARE SOLUTION
            </p>
          </div>

          {/* Product Centerpiece Visual */}
          <div className="w-full max-w-2xl h-56 sm:h-72 md:h-84 flex items-center justify-center">
            {config?.banner ? (
              <img
                src={config.banner}
                alt={storeInfo?.name || 'Dot & Key Skincare'}
                className="max-h-full object-contain drop-shadow-2xl"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/80 font-bold">
                {storeInfo?.name}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Scallop Transition */}
        <div className="w-full bg-[#FF6A00] pt-4">
          <ScallopDivider />
        </div>
      </div>

      {/* ── SECTION 2: Scalloped Brand Quote Banner ── */}
      <div className="w-full bg-[#FF6A00] text-white py-5 px-4 sm:px-8 text-center shadow-xs">
        <p className="max-w-4xl mx-auto text-sm sm:text-base md:text-lg font-serif italic font-medium leading-snug">
          &ldquo;{storeInfo?.short_description ||
            "Our products are tailored to fit YOUR skin's unique needs, leaving it happy, healthy & glowing every-single-day!"}&rdquo;
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 space-y-16 sm:space-y-24">
        
        {/* ── SECTION 3: Founder Story Block ── */}
        <div className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs sm:text-sm font-serif italic text-neutral-600">
              The Story Behind &apos;Dot &amp; Key&apos;
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#FF6A00] tracking-tight uppercase">
              {story1?.title || "MEET ANISHA SARAF"}
            </h2>
            <p className="text-xs sm:text-sm font-bold text-neutral-800">
              our co-founder, an avid swimmer, &amp; skincare problem-solver.
            </p>
          </div>

          {/* Founder Container Box */}
          <div className="relative rounded-3xl bg-gradient-to-r from-[#FFA259] via-[#FF6C8B] to-[#FFA7BD] p-6 sm:p-10 shadow-sm">
            {/* Polaroid Styled Founder Photo Card */}
            {story1?.image && (
              <div className="sm:absolute -top-10 left-6 sm:left-10 w-44 sm:w-52 bg-white p-2.5 rounded-2xl shadow-xl rotate-[-2deg] mb-6 sm:mb-0 z-20">
                <div className="aspect-[4/4] rounded-xl overflow-hidden bg-neutral-100">
                  <img
                    src={story1.image}
                    alt={story1.title}
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
              </div>
            )}

            <div className="sm:pl-60 space-y-6 text-neutral-900">
              <p className="text-xs sm:text-sm md:text-[15px] font-medium leading-relaxed text-neutral-900">
                {story1?.description}
              </p>

              {/* DOT and KEY Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {/* DOT Card */}
                <div className="bg-[#FF6A00] text-white p-4 rounded-2xl shadow-sm space-y-1 text-center">
                  <span className="text-[11px] font-medium opacity-90 block">
                    finding the missing
                  </span>
                  <h3 className="text-2xl font-black tracking-wider">&apos;DOT&apos;</h3>
                  <span className="text-[11px] font-medium opacity-90 block">
                    in your skincare routine
                  </span>
                </div>

                {/* KEY Card */}
                <div className="bg-[#FF2E93] text-white p-4 rounded-2xl shadow-sm space-y-1 text-center">
                  <span className="text-[11px] font-medium opacity-90 block">
                    &amp; giving you the
                  </span>
                  <h3 className="text-2xl font-black tracking-wider">&apos;KEY&apos;</h3>
                  <span className="text-[11px] font-medium opacity-90 block">
                    to unlock your best skin yet.
                  </span>
                </div>
              </div>

              {/* Skincare BFF Tagline */}
              <div className="pt-2 text-white">
                <p className="text-xs sm:text-sm font-extrabold uppercase tracking-wide">
                  THINK OF US AS YOUR SKINCARE BFF,
                </p>
                <p className="text-xs sm:text-sm font-medium opacity-95 mt-1">
                  We&apos;re all about <strong className="font-extrabold uppercase">HEALTHY SKIN</strong> over flawless skin to make you feel your absolute best!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 4: Philosophy Header ── */}
        <div className="text-center space-y-2 py-4">
          <p className="text-xs sm:text-sm font-serif italic text-neutral-700">
            Our Philosophy in Five Fun Points!
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#FF6A00] tracking-tight uppercase">
            SKINCARE IS NOT JUST A ROUTINE
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-neutral-800">
            It&apos;s a joyful journey to self-love &amp; confidence from day one.
          </p>
        </div>

        {/* ── SECTION 5: R&D & Science Formulation Block ── */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#FFF0E6] via-[#FFF3F6] to-[#FFEBF1] border border-orange-100/70 p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-3">
              <span className="text-xs font-serif italic text-neutral-600 block">
                Clean Formulation Backed by
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#FF6A00] tracking-tight uppercase">
                {story2?.title || "50+ YEARS OF EXPERTISE!"}
              </h3>
              <p className="text-xs sm:text-[13.5px] leading-relaxed text-neutral-700 font-normal">
                {story2?.description}
              </p>
            </div>

            {/* Right Polaroid R&D Photo */}
            {story2?.image && (
              <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
                <div className="relative bg-white p-2.5 rounded-2xl shadow-md rotate-[2deg] max-w-[280px]">
                  <span className="absolute -top-2 left-3 bg-[#FF2E93] text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider z-10">
                    Real Image
                  </span>
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100 mb-2">
                    <img
                      src={story2.image}
                      alt="Dot & Key R&D Lab"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-[11px] font-bold text-center text-neutral-800">
                    Dot &amp; Key in house R&amp;D lab
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── SECTION 6: Concept to Creation Banner & Formula Graphic ── */}
        <div className="space-y-10">
          {/* Pill Banner */}
          <div className="relative rounded-full bg-gradient-to-r from-[#FFA259] via-[#FF6C8B] to-[#FFA7BD] py-8 px-8 sm:px-14 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            {/* Left Decorative Line Icon */}
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-white/60 flex items-center justify-center text-white flex-shrink-0">
              <Sparkles className="w-8 h-8 stroke-[1.5]" />
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-wider text-center sm:text-left">
              {story3?.title || "FROM CONCEPT TO CREATION"}
            </h3>

            {/* CTA Button */}
            {story3?.cta_text && (
              <a
                href={story3.cta_link || '#'}
                className="bg-white text-neutral-900 font-extrabold text-xs sm:text-sm px-6 py-3 rounded-full shadow-md hover:bg-neutral-50 active:scale-95 transition-all flex items-center gap-1.5 flex-shrink-0"
              >
                {story3.cta_text}
              </a>
            )}
          </div>

          {/* Venn Diagram Formula Strip */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pt-4">
            <div className="flex items-center">
              {/* Circle 1: Your Feedback */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-[#FF6A00] bg-white flex flex-col items-center justify-center p-2 text-center shadow-xs z-10">
                <MessageSquareQuote className="w-6 h-6 text-[#FF6A00] stroke-[1.8] mb-0.5" />
                <span className="text-[10px] sm:text-[11px] font-extrabold text-neutral-800 leading-tight">
                  Your<br />Feedback
                </span>
              </div>

              {/* Plus Sign */}
              <div className="-mx-2 z-20 w-6 h-6 rounded-full bg-[#FF6A00] text-white flex items-center justify-center text-xs font-black">
                +
              </div>

              {/* Circle 2: Our Innovation */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-[#FF6A00] bg-white flex flex-col items-center justify-center p-2 text-center shadow-xs z-10">
                <Lightbulb className="w-6 h-6 text-[#FF6A00] stroke-[1.8] mb-0.5" />
                <span className="text-[10px] sm:text-[11px] font-extrabold text-neutral-800 leading-tight">
                  Our<br />Innovation
                </span>
              </div>
            </div>

            {/* Equals Sign */}
            <span className="text-2xl font-black text-[#FF6A00]">=</span>

            {/* Result Headline */}
            <h4 className="text-xl sm:text-2xl md:text-3xl font-black text-[#FF6A00] tracking-tight uppercase text-center sm:text-left">
              &apos;1ST IN INDIA&apos; <br />PRODUCTS
            </h4>
          </div>
        </div>

      </div>
    </main>
  );
}