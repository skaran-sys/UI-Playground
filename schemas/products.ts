
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
  hoverImages?: string[];
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

/* ---------------------------- PAGINATION TYPE ---------------------------- */

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}


/* ---------------------------- CONFIG TYPE ---------------------------- */

export interface LayoutConfig {
    title: string;
    subtitle?: string;
    card: ProductCardConfig;
    showFilters: boolean;
}

// -------------------------
// GENERIC FILTER VALUE
// -------------------------

export type FilterValueItem =
  | {
      name: string
      count: number
      [key: string]: any // allow future dynamic fields
    }
  | {
      min: number
      max: number
      label: string
      count: number
      [key: string]: any
    }

// -------------------------
// FILTER (FULLY DYNAMIC KEY)
// -------------------------

export interface Filter {
  key: string
  label: string
  isMulti: boolean
  value: FilterValueItem[]
  [key: string]: any // allows unknown future props
}

// -------------------------
// SORT OPTION
// -------------------------

export interface SortOption {
  key: string
  label: string
}

// -------------------------
// ROOT RESPONSE
// -------------------------

export interface FiltersResponse {
  filters: Filter[]
  sortOptions: SortOption[]
}

/* ---------------------------- LAYOUT PROPS ---------------------------- */

interface ProductActions {
  addToCart: (id:string, qty:number) => void;
  addToWishlist: (id:string) => void;
  updateQuantity: (id:string, qty: number) => void;
  isWishlisted: (id:string) => boolean;
  cartItems:Record<string, number>;
}

export interface ProductCardPropsType extends ProductActions {
  product: Product;
  config: ProductCardConfig;
  index?: number;
}

export interface LayoutPropsTypes extends ProductActions {
    products: Product[];

    config: LayoutConfig;

    pagination?: Pagination;

    onPageChange: (page: number) => void;

    filters: Filter[];
    sortOptions: SortOption[];
    applyFilters: () => void;
    clearFilters: () => void;
    loading: boolean;
}

export interface ProductFilterProps {
    filters?: Filter[];
    sortOptions?: SortOption[];
    totalResults?: number;
    applyFilters?: (payload: any) => void;
    clearFilters?: () => void;
}