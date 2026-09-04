import { CartLayoutProps } from './layout_template';

export const mockCartProps: CartLayoutProps = {
  isSidebar: true,
  config: {
    heading: "SHOPPING CART",
    checkout_text: "VIEW CART"
  },
  priceSummary: {
    tax: 0,
    shipping: 0,
    discount: 0,
    subTotal: 204550,
    total: 204550
  },
  cart: [
    {
      productId: "cart_prod_1",
      name: "ALKAMX DTS100-A-03 // BLK-GLD",
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=400",
      quantity: 1,
      price: 99300,
      variant: [
        { id: "v_0", name: "Size", value: "0" }
      ]
    },
    {
      productId: "cart_prod_2",
      name: "ALKAMX DTS100-A-03 // BLK-GLD",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=400",
      quantity: 1,
      price: 99300,
      variant: [
        { id: "v_0", name: "Size", value: "0" }
      ]
    }
  ],
  onItemRemove: (productId: string) => {
    console.log("Remove product:", productId);
  },
  onQtyUpdate: (productId: string, quantity: number) => {
    console.log(`Update product ${productId} quantity to:`, quantity);
  },
  onClose: () => {
    console.log("Close cart drawer");
  },
  onCheckout: () => {
    console.log("Trigger checkout");
  }
};

export default mockCartProps;