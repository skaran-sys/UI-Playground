'use client'

import React from 'react'

export type CartProps = {
  items: Array<{ id: string; name: string; price: number; quantity: number }>
  total: number
}

export default function Layout(props: CartProps) {
  return (
    <div className="p-6 bg-zinc-900 text-white rounded-2xl border border-zinc-800">
      <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
      {props.items?.map((item) => (
        <div key={item.id} className="flex justify-between py-2 border-b border-zinc-800 text-sm">
          <span>{item.name} (x{item.quantity})</span>
          <span>${item.price * item.quantity}</span>
        </div>
      ))}
      <div className="mt-4 pt-4 border-t border-zinc-700 flex justify-between font-bold">
        <span>Total</span>
        <span>${props.total}</span>
      </div>
    </div>
  )
}
