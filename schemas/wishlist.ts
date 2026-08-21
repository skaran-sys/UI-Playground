export interface ConfigType {
    layout_id: string;
    [key: string]: any
}

export interface Product {
  
  id: string;
  title: string;
  slug?:string;
  image:string;
  alt:string;
  link: string

  price:string;
  originalPrice: string;
  discount:string;

  rating: number;
  reviewCount: number;

  stock: number;
  brand: string;
  badge: string;
  
}

export interface BadgeConfig {
  isVisible: boolean;
  bgColor: string;
  position: CardPosition;
}

export interface DiscountConfig {
  isVisible: boolean;
  bgColor: string;
  position: CardPosition;
  overlay?: boolean;
}

export interface WishlistConfig {
  isVisible: boolean;
  color?: string;
  overlay?: boolean;
  position?: CardPosition;
}

export interface RatingConfig {
  isVisible: boolean;
  color?: string;
  overlay?: boolean;
}

export interface CoverVideoConfig {
  isVisible: boolean;
  loop?: boolean;
}

export type CardPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export type ButtonStyle = "filled" | "bordered" | "text";

export type SlideType = "manual" | "auto";

export interface SlideShowConfig {
  isVisible: boolean;
  autoSlideDuration?: number;
  slideType?: SlideType;
}

export interface ActionButtonConfig {
  isVisible: boolean;
  btnStyle?: ButtonStyle;
  color?: string;
  btnText?: string;
}

export interface ProductCardConfig {
  overlay: boolean;

  spacing: number;
  corner: number;
  shadow: boolean;

  showSubTitle: boolean;
  showPrice: boolean;

  coverImage: boolean;

  badge: BadgeConfig;
  discount: DiscountConfig;
  ratings: RatingConfig;
  wishlist: WishlistConfig;

  coverVideo: CoverVideoConfig;
  slideShow?: SlideShowConfig;

  buyNow: ActionButtonConfig;
  addToCart: ActionButtonConfig;
}

interface Shared {
    removeFromWishlist: (productId: string) => void
}

export interface ProductCardPropsType extends Shared {
    product: Product;
}

export interface LayoutProps extends Shared {
    products: Product[];
    config: ConfigType;
    loading: Boolean;
    addToCart: (id:string, qty:number) => void;
    updateQuantity: (id:string, qty: number) => void;
    cartItems:Record<string, number>;
}