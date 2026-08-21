'use client'

import React from 'react'

export type CartItem = {
  id: string
  title: string
  price: number
  quantity: number
  size?: string
  image?: string
}

export type CartProps = {
  items: CartItem[]
  subtotal: number
  shipping: number
  total: number
  checkoutUrl: string
}

export default function Layout(props: CartProps) {
  return (
    <div
      className="p-6 rounded-2xl border shadow-xl max-w-lg mx-auto transition-colors"
      style={{
        backgroundColor: "var(--color-surface-light)",
        borderColor: "var(--color-border)",
        color: "var(--color-text)",
      }}
    >
      <h2
        className="text-xl font-bold mb-4 pb-3 border-b flex justify-between items-center"
        style={{ borderColor: "var(--color-border)" }}
      >
        <span>Fizzy Goblet Cart</span>
        <span
          className="text-xs px-2.5 py-1 rounded-full font-semibold"
          style={{
            backgroundColor: "var(--color-primary-lighter)",
            color: "var(--color-primary-contrast)",
          }}
        >
          {props.items?.length || 0} items
        </span>
      </h2>

      <div className="space-y-3">
        {props.items?.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center py-2 border-b text-sm"
            style={{ borderColor: "var(--color-border)" }}
          >
            <div>
              <div className="font-semibold" style={{ color: "var(--color-text)" }}>
                {item.title}
              </div>
              <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                Size: {item.size || "Standard"} | Qty: {item.quantity}
              </div>
            </div>
            <div className="font-bold" style={{ color: "var(--color-primary)" }}>
              ${item.price * item.quantity}
            </div>
          </div>
        ))}
      </div>

      <div
        className="mt-6 pt-4 border-t space-y-2 text-sm"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div className="flex justify-between" style={{ color: "var(--color-text-muted)" }}>
          <span>Subtotal</span>
          <span>${props.subtotal}</span>
        </div>
        <div className="flex justify-between" style={{ color: "var(--color-text-muted)" }}>
          <span>Shipping</span>
          <span>{props.shipping === 0 ? "Free" : `$${props.shipping}`}</span>
        </div>
        <div
          className="flex justify-between font-bold text-base pt-2 border-t"
          style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
        >
          <span>Total</span>
          <span style={{ color: "var(--color-primary)" }}>${props.total}</span>
        </div>
      </div>

      <button
        className="w-full mt-6 py-3 rounded-xl font-semibold transition-all shadow-lg hover:opacity-90"
        style={{
          backgroundColor: "var(--color-primary)",
          color: "var(--color-primary-contrast)",
        }}
      >
        Proceed to Checkout
      </button>
    </div>
  )
}
