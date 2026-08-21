'use client'

import React from 'react'

export type HeroProps = {
  headline: string
  subheadline: string
  ctaText: string
  ctaLink: string
  bgImageUrl?: string
}

export default function Layout(props: HeroProps) {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-zinc-900 via-zinc-950 to-indigo-950 text-white text-center rounded-3xl my-4">
      <h1 className="text-4xl font-extrabold mb-4">{props.headline || "Welcome to Our Store"}</h1>
      <p className="text-zinc-400 max-w-xl mx-auto mb-8">{props.subheadline || "Discover amazing products with unmatched quality."}</p>
      <a href={props.ctaLink || "#"} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold text-white inline-block shadow-lg">
        {props.ctaText || "Shop Now"}
      </a>
    </section>
  )
}
