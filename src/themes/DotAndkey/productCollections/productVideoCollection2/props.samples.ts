import { CollectionLayoutPropType } from './layout_template';

export const mockReelsCollectionProps: CollectionLayoutPropType = {
  isLoading: false,
  config: {
    layout_id: "dot_and_key_reels_collection_v1",
    title: "Watch It. Love It.",
    view_all_text: "",
    link: "",
    cta_label: "ADD TO CART",
    show_header: true,
    show_add_to_cart: true,
    show_wishlist: false,
    show_rating: false,
    overflow: "carousel",
    header_alignment: "center"
  },
  items: [
    {
      id: "reel_1",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=200",
      hover_image: "https://assets.mixkit.co/videos/preview/mixkit-woman-applying-facial-cream-in-a-spa-setting-42790-large.mp4",
      title: "Vitamin C + E Sunscreen SPF 50+",
      description: "This is the ultimate morning glow routine",
      price: "595",
      originalPrice: "695",
      discount: "15% OFF",
      badge: "",
      variants: [
        { label: "80g", id: "v1_80g", price: "595" },
        { label: "50g", id: "v1_50g", price: "495" }
      ]
    },
    {
      id: "reel_2",
      image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=200",
      hover_image: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-applying-lotion-to-her-face-41130-large.mp4",
      title: "Vitamin C + E Super Bright Gel Moisturizer",
      description: "Super light, bouncy, and non-sticky gel texture",
      price: "495",
      originalPrice: "595",
      discount: "16% OFF",
      badge: "",
      variants: [
        { label: "60ml", id: "v2_60ml", price: "495" }
      ]
    },
    {
      id: "reel_3",
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=200",
      hover_image: "https://assets.mixkit.co/videos/preview/mixkit-woman-with-clean-face-looking-at-camera-42795-large.mp4",
      title: "Barrier Repair Moisturizer (Hyaluronic + Ceramides)",
      description: "Restores skin barrier in just 3 days",
      price: "599",
      originalPrice: "795",
      discount: "25% OFF",
      badge: "FEATURED",
      variants: [
        { label: "175g", id: "v3_175g", price: "599" },
        { label: "100g", id: "v3_100g", price: "395" }
      ]
    },
    {
      id: "reel_4",
      image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=200",
      hover_image: "https://assets.mixkit.co/videos/preview/mixkit-skincare-product-in-a-woman-s-hands-42793-large.mp4",
      title: "Strawberry Dew Tinted Sunscreen SPF 50+",
      description: "If you don't like wearing foundation, just GET THIS!",
      price: "549",
      originalPrice: "695",
      discount: "20% OFF",
      badge: "",
      variants: [
        { label: "Peony", id: "v4_peony", price: "549", color: "#F7CAC9" },
        { label: "Almond", id: "v4_almond", price: "549", color: "#E0AC69" },
        { label: "Mocha", id: "v4_mocha", price: "549", color: "#8D5524" }
      ]
    },
    {
      id: "reel_5",
      image: "https://images.unsplash.com/photo-1556228722-d0b777a94bf3?auto=format&fit=crop&q=80&w=200",
      hover_image: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-touching-her-smooth-face-41129-large.mp4",
      title: "Watermelon Cooling Sunscreen SPF 50+",
      description: "Zero white cast cooling formula",
      price: "595",
      originalPrice: "695",
      discount: "15% OFF",
      badge: "",
      variants: [
        { label: "80g", id: "v5_80g", price: "595" },
        { label: "50g", id: "v5_50g", price: "495" }
      ]
    },
    {
      id: "reel_5",
      image: "https://images.unsplash.com/photo-1556228722-d0b777a94bf3?auto=format&fit=crop&q=80&w=200",
      hover_image: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-touching-her-smooth-face-41129-large.mp4",
      title: "Watermelon Cooling Sunscreen SPF 50+",
      description: "Zero white cast cooling formula",
      price: "595",
      originalPrice: "695",
      discount: "15% OFF",
      badge: "",
      variants: [
        { label: "80g", id: "v5_80g", price: "595" },
        { label: "50g", id: "v5_50g", price: "495" }
      ]
    },
    {
      id: "reel_5",
      image: "https://images.unsplash.com/photo-1556228722-d0b777a94bf3?auto=format&fit=crop&q=80&w=200",
      hover_image: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-touching-her-smooth-face-41129-large.mp4",
      title: "Watermelon Cooling Sunscreen SPF 50+",
      description: "Zero white cast cooling formula",
      price: "595",
      originalPrice: "695",
      discount: "15% OFF",
      badge: "",
      variants: [
        { label: "80g", id: "v5_80g", price: "595" },
        { label: "50g", id: "v5_50g", price: "495" }
      ]
    },
    {
      id: "reel_5",
      image: "https://images.unsplash.com/photo-1556228722-d0b777a94bf3?auto=format&fit=crop&q=80&w=200",
      hover_image: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-touching-her-smooth-face-41129-large.mp4",
      title: "Watermelon Cooling Sunscreen SPF 50+",
      description: "Zero white cast cooling formula",
      price: "595",
      originalPrice: "695",
      discount: "15% OFF",
      badge: "",
      variants: [
        { label: "80g", id: "v5_80g", price: "595" },
        { label: "50g", id: "v5_50g", price: "495" }
      ]
    },
  ],
  addToCart: (id, qty, variantId) => console.log(`Added ${qty} of ${id} (Variant: ${variantId}) to cart`),
  addToWishlist: (id) => console.log(`Wishlisted ${id}`),
  updateQuantity: (id, qty) => console.log(`Updated ${id} qty to ${qty}`),
  isWishlisted: (id) => false
};

export default mockReelsCollectionProps;