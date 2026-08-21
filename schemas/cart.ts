export interface CartItem {
  productId: string;

  image: string;
  name: string;

  quantity: number;

  price: number;
  discountedPrice?: number;

  variant?: {
    id?: string;
    name?: string;
    value?: string;
  }[];

  sku?: string;

  [key: string]: any;
}

export interface PriceSummary {
  tax: number;
  total: number;
  subTotal: number;
  discount: number;

  shipping?: number;

  [key: string]: any;
}

export interface CartDiscountConfig {
  enabled?: boolean;
  label?: string;
  showDiscount?: boolean;

  [key: string]: any;
}

export interface CartConfig {
  heading?: string;
  checkout_text?: string;

  item_layout?: string;

  discount?: CartDiscountConfig;

  [key: string]: any;
}

export interface CartLayoutProps {
  cart: CartItem[];

  priceSummary: PriceSummary;

  config: CartConfig;

  onItemRemove: (
    productId: string
  ) => void;

  onQtyUpdate: (
    productId: string,
    quantity: number
  ) => void;

  onClose: () => void;
  onCheckout: () => void
  isSidebar?: boolean,

}