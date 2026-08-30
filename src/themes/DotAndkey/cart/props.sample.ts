import { CartLayoutProps } from './layout_template';

export const mockCartProps: CartLayoutProps = {
  isSidebar: true,
  config: {
    heading: "Your Cart",
    checkout_text: "Checkout Now →",
    item_layout: "standard",
    discount: {
      enabled: true,
      label: "Flat 20% OFF",
      showDiscount: true
    }
  },
  cart: [
    {
      productId: "prod_serum_1",
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=85&w=400",
      name: "Strawberry Bright 10% Niacinamide Face Serum",
      price: 1198,
      discountedPrice: 958,
      quantity: 2,
      discountLabel: "Flat 20% OFF",
      variant: [
        { name: "Size", value: "30ml" }
      ],
      sku: "DOT-SB-30"
    },
    {
      productId: "freebie_vit_c",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=85&w=300",
      name: "Vitamin C Facewash – 15ML-FREE",
      price: 99,
      discountedPrice: 1,
      quantity: 1,
      isFreebie: true,
      sku: "DOT-FREE-VITC"
    },
    {
      productId: "freebie_strawberry",
      image: "https://images.unsplash.com/photo-1556228722-d0b777a94bf3?auto=format&fit=crop&q=85&w=300",
      name: "Strawberry Facewash – 15ML-FREE",
      price: 99,
      discountedPrice: 1,
      quantity: 1,
      isFreebie: true,
      sku: "DOT-FREE-STRW"
    }
  ],
  priceSummary: {
    subTotal: 1396,
    discount: 436,
    tax: 0,
    shipping: 0,
    total: 960,
    savings: 436
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