import { ProductDetailProps } from './layout_template';

export const mockProductDetailProps: ProductDetailProps = {
  loading: false,
  isWishlisted: false,
  isFreeShipping: true,
  config: {
    layout_id: "d2c_luxury_pdp_classic_v1"
  },
  product: {
    id: "prod_pdp_101",
    title: "Out of Office",
    brand: "Backless Loafers",
    price: "2,620",
    mrp: "3,200",
    discount: "18% OFF",
    badge: "Classics",
    sku: "FG-OO-38-PNK",
    inStock: true,
    taxInclusive: true,
    rating: 5,
    reviewCount: 39,
    sizeChart: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=85&w=800",
    highlights: [
      "Broad fit silhouette - recommended to size down if between sizes",
      "Handcrafted with dual-layer memory foam cushioning",
      "Soft faux suede upper with decorative bow embellishment",
      "Non-slip TPR textured sole"
    ],
    supplierInfo: "Fizzy Goblet Footwear Pvt Ltd, Mumbai, India",
    returnRules: "7 Days Easy Exchange & Return Policy",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=85&w=1200",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=85&w=1200",
      "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&q=85&w=1200",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=85&w=1200"
    ],
    variant: [
      { id: "var_36", label: "36" },
      { id: "var_37", label: "37" },
      { id: "var_38", label: "38" },
      { id: "var_39", label: "39" },
      { id: "var_40", label: "40" },
      { id: "var_41", label: "41" }
    ],
    description: "A little bow, a lot of ease. These slip-on loafers add a polished finish to everyday looks while keeping things effortlessly comfortable.",
    specs: [
      { key: "Upper", label: "Faux suede with faux leather bow & logo detailing" },
      { key: "Padding", label: "Double Cushioning for all-day comfort" },
      { key: "Sole", label: "Durable TPR Sole" },
      { key: "Make", label: "Handcrafted in India" },
      { key: "Care", label: "Super easy to maintain! Each piece is hand-embroidered with a lot of care." }
    ]
  },
  onAddToCart: (qty: number, variant?: string) => {
    console.log("Added to cart - Quantity:", qty, "Variant ID:", variant);
  },
  onBuyNow: (qty: number, variant?: string) => {
    console.log("Buy Now triggered - Quantity:", qty, "Variant ID:", variant);
  },
  addToWishlist: () => {
    console.log("Add to wishlist clicked");
  },
  onToggleWishlist: async () => {
    console.log("Wishlist toggled");
    return [];
  },
  loadSimilarProducts: async () => {
    return {
      items: [
        {
          id: "sim_1",
          title: "Bomba Sliders",
          brand: "Fizzy Goblet",
          price: "2290",
          originalPrice: "2790",
          discount: "18% OFF",
          currency: "INR",
          image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800",
          category: "Sliders",
          rating: 4.8,
          reviewCount: 24,
          link: "/products/bomba-sliders",
          slug: "bomba-sliders"
        }
      ],
      pagination: {
        page: 1,
        limit: 4,
        total: 1,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false
      }
    };
  },
  loadReviews: async () => {
    return [
      {
        _id: "rev_1",
        productId: "prod_pdp_101",
        orderId: "ord_9901",
        productTitle: "Out of Office",
        orderNumber: "FG-9901",
        customerName: "Ananya S.",
        customerEmail: "ananya@example.com",
        rating: 5,
        createdAt: "2026-03-15T10:00:00Z",
        review: {
          id: "rev_cnt_1",
          content: "Extremely comfortable for work and daily travel. The cushioning is amazing!",
          replies: [],
          createdAt: "2026-03-15T10:00:00Z"
        }
      }
    ];
  }
};

export default mockProductDetailProps;