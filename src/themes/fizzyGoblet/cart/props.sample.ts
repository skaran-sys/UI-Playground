import { CartLayoutProps } from './layout_template';

export const mockCartProps: CartLayoutProps = {
  isSidebar: true,
  config: {
    heading: "Your cart",
    checkout_text: "Buy Now",
    item_layout: "standard",
    discount: {
      enabled: true,
      label: "Gift Wrapping - Rs.49",
      showDiscount: true
    }
  },
  cart: [
    {
      productId: "prod_cart_1",
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=85&w=800",
      name: "Brew can do it",
      price: 2620,
      discountedPrice: 2620,
      quantity: 1,
      variant: [
        { name: "Color", value: "Brown" },
        { name: "Size", value: "40" }
      ],
      sku: "FG-BC-40-BRN"
    },
    {
      productId: "prod_cart_2",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=85&w=800",
      name: "FREE Laptop Sleeve",
      price: 1490,
      discountedPrice: 0,
      quantity: 1,
      variant: [
        { name: "Edition", value: "Limited Edition" }
      ],
      sku: "FG-LS-FREE"
    },
    {
      productId: "prod_cart_3",
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=85&w=800",
      name: "Sunny Hunny : Bomba Sliders",
      price: 3290,
      discountedPrice: 3290,
      quantity: 1,
      variant: [
        { name: "Color", value: "Orange" },
        { name: "Size", value: "40" }
      ],
      sku: "FG-SH-40-ORG"
    },
    {
      productId: "prod_cart_4",
      image: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&q=85&w=800",
      name: "Mirror Masala : Juttis",
      price: 4490,
      discountedPrice: 4490,
      quantity: 1,
      variant: [
        { name: "Color", value: "Yellow" }
      ],
      sku: "FG-MM-38-YLW"
    }
  ],
  priceSummary: {
    subTotal: 10400,
    discount: 1490,
    tax: 0,
    shipping: 0,
    total: 10400
  },
  onClose: () => {
    console.log("Cart closed");
  },
  onCheckout: () => {
    console.log("Proceeding to checkout");
  },
  onItemRemove: (productId: string) => {
    console.log("Remove product:", productId);
  },
  onQtyUpdate: (productId: string, quantity: number) => {
    console.log("Update quantity:", productId, quantity);
  }
};

export default mockCartProps;