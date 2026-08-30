import { ReviewsSectionProps } from './layout_template';

export const mockProductReviewsProps: ReviewsSectionProps = {
  loading: false,
  hasMore: true,
  onLoadMore: () => console.log('Load more reviews triggered'),
  reviews: [
    {
      _id: "rev_1",
      productId: "prod_vit_c_sunscreen",
      orderId: "ord_101",
      orderNumber: "DOT-88492",
      productTitle: "Vitamin C + E Super Bright Sunscreen SPF 50+",
      productImage: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=300",
      customerName: "MEGHA PARASHAR",
      customerEmail: "megha@example.com",
      customerImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
      rating: 5,
      createdAt: "2026-03-15T10:00:00Z",
      review: {
        id: "rev_c_1",
        content: "Just Love It!\n\nI've been using Dot & Key Vitamin C Sunscreen for a year now. It's lightweight & quick-absorbing. Reduces dullness too with a dewy finish. A must-buy!",
        createdAt: "2026-03-15T10:00:00Z"
      }
    },
    {
      _id: "rev_2",
      productId: "prod_strawberry_sunscreen",
      orderId: "ord_102",
      orderNumber: "DOT-88493",
      productTitle: "Strawberry Dew Tinted Sunscreen SPF 50+",
      productImage: "https://images.unsplash.com/photo-1556228722-d0b777a94bf3?auto=format&fit=crop&q=80&w=300",
      customerName: "RESHMA SATHEESH",
      customerEmail: "reshma@example.com",
      customerImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
      rating: 5,
      createdAt: "2026-03-18T12:30:00Z",
      review: {
        id: "rev_c_2",
        content: "Blends In No Time\n\nThis is my third bottle of using this sunscreen. Zero white cast & non-pilling formula...just love it!",
        createdAt: "2026-03-18T12:30:00Z"
      }
    },
    {
      _id: "rev_3",
      productId: "prod_barrier_moisturizer",
      orderId: "ord_103",
      orderNumber: "DOT-88494",
      productTitle: "Barrier Repair Moisturizer (Ceramides + Hyaluronic)",
      productImage: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=300",
      customerName: "MUSKAN CHOWDHURY",
      customerEmail: "muskan@example.com",
      customerImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
      rating: 5,
      createdAt: "2026-03-20T15:45:00Z",
      review: {
        id: "rev_c_3",
        content: "No More Dry Skin\n\nCeramide in this moisturizer protects the natural barrier of my skin while deeply moisturizing. It also soothes redness & dry skin.",
        createdAt: "2026-03-20T15:45:00Z"
      }
    },
    {
      _id: "rev_4",
      productId: "prod_vit_c_gel",
      orderId: "ord_104",
      orderNumber: "DOT-88495",
      productTitle: "Vitamin C + E Super Bright Gel Moisturizer",
      productImage: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=300",
      customerName: "SONALI SAXENA",
      customerEmail: "sonali@example.com",
      customerImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400",
      rating: 5,
      createdAt: "2026-03-22T09:15:00Z",
      review: {
        id: "rev_c_4",
        content: "It Works!\n\nI have been using this moisturizer for almost 3 months now. It is deeply quick absorbing. My skin has brightened & feels plump.",
        createdAt: "2026-03-22T09:15:00Z"
      }
    }
  ]
};

export default mockProductReviewsProps;