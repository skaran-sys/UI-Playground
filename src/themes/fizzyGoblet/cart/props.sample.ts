import { CartProps } from './layout_template';

export const sampleCartProps: CartProps = {
  items: [
    { id: "item_1", title: "Golden Sparkle Jutti", price: 89, quantity: 1, size: "EU 38" },
    { id: "item_2", title: "Velvet Bloom Slider", price: 75, quantity: 2, size: "EU 39" },
  ],
  subtotal: 239,
  shipping: 0,
  total: 239,
  checkoutUrl: "/checkout",
};

export default sampleCartProps;
