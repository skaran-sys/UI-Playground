export interface ProductReviewContent {
  id: string;
  content: string;
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
  productImage: string; 
  review: ProductReviewContent;
  customerImage?: string;
}

export interface ReviewsSectionProps {
  reviews: ProductReview[];
  loading: boolean;
  onLoadMore: () => void;
  hasMore: boolean;
}