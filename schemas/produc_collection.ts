export interface ConfigType {
  layout_id: string;
  [key: string]: any;
}

export type Item = {
  id: string;
  image: string;
  hover_image: string;
  title: string;
  description: string;
  price: string;
  originalPrice: string;
  discount: string;
  badge: string;
  link?: string;
  video_url?: string;
  variants?: {
    label: string;
    id: string;
    price: string;
    color?: string;
  }[];
};

export interface Config extends ConfigType {
  title: string;
  view_all_text: string;
  link: string;
  cta_label: string;
  show_header: boolean;
  show_add_to_cart: boolean;
  show_wishlist: boolean;
  show_rating: boolean;
  overflow?: "carousel" | "grid" | string;
  header_size?: "small" | "medium" | "large" | "extra-large";
  header_alignment?: "left" | "center";
  card_size?: "small" | "medium" | "large";
}

export interface CollectionLayoutPropType {
  items?: Item[];
  config: Config;
  isLoading: boolean;
  addToCart: (id: string, qty: number, variantId?: string) => void;
  addToWishlist: (id: string) => void;
  updateQuantity: (id: string, qty: number, variantId?: string) => void;
  isWishlisted: (id: string) => boolean;
}
