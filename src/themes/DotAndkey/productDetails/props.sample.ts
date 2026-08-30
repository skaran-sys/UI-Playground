import { ProductDetailProps } from './layout_template';

export const mockProductDetailProps: ProductDetailProps = {
  loading: false,
  isWishlisted: false,
  isFreeShipping: true,
  config: {
    layout_id: "dot_and_key_watermelon_pdp_v1"
  },
  product: {
    id: "prod_wm_pdp_01",
    title: "Watermelon Cooling Icy Gel Moisturizer With Hyaluronic",
    brand: "Dot & Key Skincare",
    price: "421",
    mrp: "495",
    discount: "Save ₹74",
    badge: "Best Value",
    sku: "DK-WM-GEL-60G",
    inStock: true,
    taxInclusive: true,
    rating: 5,
    reviewCount: 1542,
    suitableFor: "Oily & Combination",
    promoBadge: "Flat 15% applied",
    clinicalClaim: {
      tag: "CLINICALLY Proven",
      text: "Instantly Reduces Skin Temp by 4°C"
    },
    helps: [
      { label: "Instant Cooling", icon: "cooling" },
      { label: "Skin Soothing", icon: "soothing" },
      { label: "Oil Control", icon: "oil_control" }
    ],
    targets: ["Excess Oil", "Puffiness", "Skin Irritation"],
    images: [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=85&w=900",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=85&w=900",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=85&w=900",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=85&w=900"
    ],
    variant: [
      { id: "var_60g", label: "60g" }
    ],
    description: "An ultra-light, refreshing icy gel moisturizer packed with watermelon extracts and hyaluronic acid that instantly cools skin, controls excess oil, and leaves a dewy, non-sticky finish.",
    specs: [
      { key: "Product Name", label: "Dot & Key Watermelon Cooling Icy Gel Moisturizer, Instantly Cools Skin, With Hyaluronic & Niacinamide 60g" },
      { key: "Net Qty", label: "60g" },
      { key: "MRP Rs. (Incl. of all taxes)", label: "Rs. 495.00" },
      { key: "Manufacturer Details", label: "Sprivil Healthcare Pvt Ltd L - 1/4, Addl. MIDC Satara - 415004, Maharashtra GST No. - 27AAKCS3923R1ZL" },
      { key: "Expiry Date", label: "36 months from manufacturing" },
      { key: "Country of Origin", label: "INDIA" }
    ],
    featureList: [
      { title: "Instant Cooling", icon: "eye" },
      { title: "Controls Excess Oil", icon: "wind" },
      { title: "Reduces Puffiness", icon: "droplet" },
      { title: "Soothes Irritation", icon: "smile" },
      { title: "Refreshes Tired Skin", icon: "sun" },
      { title: "Non-Greasy", icon: "sparkles" },
      { title: "Boosts Radiance", icon: "star" },
      { title: "Non-Comedogenic", icon: "shield" }
    ],
    productBenefits: [
      "Instantly Cools Skin",
      "Controls Excess Oil",
      "Non-sticky Hydration",
      "Refreshes Skin",
      "Reduces Puffiness",
      "Soothes Tired, Irritated Skin"
    ],
    howToUse: [
      "Dot the moisturizer on clean face & neck",
      "Massage gently in an upward motion",
      "Use daily for AM & PM routine",
      "Follow up with SPF during daytime"
    ],
    heroIngredients: [
      "Watermelon Extract: Rich in antioxidants to soothe and deeply hydrate.",
      "Hyaluronic Acid: Locks in moisture for all-day plump and fresh skin.",
      "Niacinamide: Controls sebum production and refines uneven skin texture."
    ]
  },
  onAddToCart: (qty: number, variant?: string) => {
    console.log("Added to Cart - Quantity:", qty, "Variant ID:", variant);
  },
  onBuyNow: (qty: number, variant?: string) => {
    console.log("Buy Now - Quantity:", qty, "Variant ID:", variant);
  },
  addToWishlist: () => {
    console.log("Wishlisted product");
  },
  onToggleWishlist: async () => {
    return [];
  },
  loadSimilarProducts: async () => {
    return {
      items: [],
      pagination: {
        page: 1,
        limit: 4,
        total: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false
      }
    };
  },
  loadReviews: async () => []
};

export default mockProductDetailProps;