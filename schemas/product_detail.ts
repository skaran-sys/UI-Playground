interface ProductVariant {
  id: string;
  label: string;
}

interface ProductSpec {
  key: string;
  label: string;
}

interface Product {
  id: string;
  title: string;
  brand: string;

  price: string;
  mrp: string;
  discount: string;

  images: string[];

  variant: ProductVariant[];

  description: string;

  specs: ProductSpec[];

  inStock?: boolean;
  taxInclusive?: boolean;
  sku?: string;
  supplierInfo?: string;
  returnRules?: string;
  badge?: string;
  highlights?: string[];
  sizeChart?: string;
  rating?: number;
  reviewCount?: number;
}

interface ProductDetailConfig {
  layout_id: string;
}

interface ProductListingItem {
  id: string;

  title: string;
  brand: string;

  price: string;
  originalPrice: string;
  discount: string;
  currency: string;

  image: string;

  category: string;

  rating: number;
  reviewCount: number;

  link: string;
  slug: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface SimilarProducts {
  items: ProductListingItem[];
  pagination: Pagination;
}

interface ReviewReply {
  id: string;
  content: string;
  createdAt: string;
}

export interface ProductReviewContent {
  id: string;
  content: string;
  replies: ReviewReply[];
  createdAt: string;
}

export interface ProductReview {
  _id: string;

  productId: string;
  orderId: string;

  productTitle: string;
  orderNumber: string;

  customerName: string;
  customerEmail: string;

  rating: number;

  createdAt: string;

  review: ProductReviewContent;
}

export interface ProductDetailProps {
  config: ProductDetailConfig;
  product: Product;
  loading: boolean;
  isWishlisted: boolean;
  addToWishlist?: () => void;
  onAddToCart: (qty: number, variant?: string) => void;
  onBuyNow: (qty: number, variant?: string) => void;
  loadSimilarProducts: () => Promise<SimilarProducts>;
  loadReviews: () => Promise<ProductReview[]>;
  onToggleWishlist: () => Promise<ProductReview[]>;
  isFreeShipping?: boolean;
}