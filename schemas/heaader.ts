/* ── Mega Menu Extensions ── */
export interface MegaMenuProduct {
  _id: string;
  brand: string;
  model: string;
  price: string | number;
  image: string;
  hoverImage?: string;
  href: string;
}

export interface BrandColumn {
  title: string;
  brands: { label: string; href: string }[];
}

/* ── Navigation Menu Item ── */
export type MenuItem = {
  label: string;
  href: string;
  type?: 'default' | 'product_grid' | 'brand_columns';
  subMenu?: { label: string; href: string }[];
  featuredProducts?: MegaMenuProduct[];
  brandColumns?: BrandColumn[];
};

/* ── Category Models ── */
export interface CategoryReference {
  _id: string;
  name: string;
}

export interface Category {
  _id: string;
  name: string;
  parent?: CategoryReference;
  children?: CategoryReference[];
}

export type Product = {
  _id: string;
  title: string;
  brand?: string;
  media?: {
    coverImage?: {
      sq1_1?: { url: string };
    };
  };
  variants?: {
    matrix?: { media?: { url: string } }[];
  };
  pricing?: {
    sale?: number;
  };
};

export type SearchResult = {
  categories: Category[];
  products: {
    items: Product[];
  };
};

export type RecommendationSection = {
  label: string;
  items: string[];
  deleteApi?: string;
};

export type SearchBoxProps = {
  onSearch: (query: string) => void;
  onDeleteRecommendation?: (id: string) => void;
  loadRecommendations?: () => void;
  result?: {
    categories: any[];
    products: { items: any[] };
  };
  popular?: any[];
  placeholder?: string;
};

export type HeaderProps = {
  wishlistCount?: number;
  cartCount?: number;
  isAuthenticated?: boolean;
  topMenuItems?: MenuItem[];
  logoUrl: string;
  config: {
    layout_id: string;
    showSearch: boolean;
    showWishlist: boolean;
    showCart: boolean;
    showAuth: boolean;
    fixed: boolean;
    announcement: string[] | string | null;
    searchPlaceholder?: string;
    [key: string]: any;
  };
  user: any;
  logout: any;
  storeName: string;
  onSearch: (query: string) => void;
  onDeleteRecommendation?: (id: string) => void;
  loadRecommendations?: () => void;
  onCartToggle?: () => void;
  searchResults: {
    categories: any[];
    products: { items: any[] };
  };
  popularSearch: any[];
  menu: MenuItem[];
  wishlistHref?: string;
  cartHref?: string;
  accountHref?: string;
};
