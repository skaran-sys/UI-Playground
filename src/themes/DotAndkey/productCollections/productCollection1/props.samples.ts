import { CollectionLayoutPropType } from './layout_template';

export const mockProductCollectionProps: CollectionLayoutPropType = {
  isLoading: false,
  config: {
    layout_id: "dot_and_key_bestseller_v1",
    title: "Bestseller",
    view_all_text: "View All",
    link: "/collections/bestsellers",
    cta_label: "ADD TO CART",
    show_header: true,
    show_add_to_cart: true,
    show_wishlist: false,
    show_rating: true,
    overflow: "carousel",
    header_alignment: "center",
    tabs: [
      { id: "tab_1", label: "Sunscreen" },
      { id: "tab_2", label: "Moisturizer" },
      { id: "tab_3", label: "Serum" },
      { id: "tab_4", label: "Facewash" }
    ]
  },
  items: [
    {
      id: "prod_1",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600",
      hover_image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600",
      title: "Vitamin C + E Super Bright Gel Moisturizer for Face",
      description: "Oily & Combination Skin",
      price: "495",
      originalPrice: "595",
      discount: "16% OFF",
      badge: "BESTSELLER",
      rating: 4.8,
      reviewCount: 1759,
      offerPrice: "421",
      variants: [
        { label: "60ml", id: "v_60", price: "495" }
      ]
    },
    {
      id: "prod_2",
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600",
      hover_image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600",
      title: "Barrier Repair Moisturizer (Hyaluronic + Ceramides)",
      description: "Dry & Sensitive Skin",
      price: "599",
      originalPrice: "795",
      discount: "25% OFF",
      badge: "BESTSELLER",
      rating: 4.7,
      reviewCount: 1869,
      offerPrice: "509",
      variants: [
        { label: "175g", id: "v_175", price: "599" },
        { label: "100g", id: "v_100", price: "395" }
      ]
    },
    {
      id: "prod_3",
      image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=600",
      hover_image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=600",
      title: "Cica + Niacinamide Oil-Free Gel Moisturizer For Face",
      description: "Oily & Acne-Prone Skin",
      price: "495",
      originalPrice: "595",
      discount: "16% OFF",
      badge: "TOP PICK",
      rating: 4.6,
      reviewCount: 713,
      offerPrice: "421",
      variants: [
        { label: "60g", id: "v_60g", price: "495" },
        { label: "50g", id: "v_50g", price: "445" }
      ]
    },
    {
      id: "prod_4",
      image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=600",
      hover_image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=600",
      title: "72HR Gel Moisturizer + Probiotics for Face",
      description: "Oily & Combination Skin",
      price: "495",
      originalPrice: "595",
      discount: "16% OFF",
      badge: "BESTSELLER",
      rating: 4.9,
      reviewCount: 1560,
      offerPrice: "421",
      variants: [
        { label: "60ml", id: "v_60ml_2", price: "495" }
      ]
    },
    {
      id: "prod_5",
      image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=600",
      hover_image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=600",
      title: "Watermelon Cooling Sunscreen SPF 50+ PA++++",
      description: "Normal & Combination Skin",
      price: "495",
      originalPrice: "595",
      discount: "16% OFF",
      badge: "TRENDING",
      rating: 4.8,
      reviewCount: 1240,
      offerPrice: "421",
      variants: [
        { label: "50g", id: "v_50g_wm", price: "495" }
      ]
    },
    {
      id: "prod_6",
      image: "https://images.unsplash.com/photo-1556228722-d0b777a94bf3?auto=format&fit=crop&q=80&w=600",
      hover_image: "https://images.unsplash.com/photo-1556228722-d0b777a94bf3?auto=format&fit=crop&q=80&w=600",
      title: "Strawberry Dew Tinted Sunscreen SPF 50+",
      description: "All Skin Types",
      price: "549",
      originalPrice: "695",
      discount: "20% OFF",
      badge: "BESTSELLER",
      rating: 4.9,
      reviewCount: 2180,
      offerPrice: "467",
      variants: [
        { label: "50g", id: "v_50g_sb", price: "549" }
      ]
    }
  ],
  addToCart: (id, qty, variantId) => console.log(`Added ${qty} of ${id} (Variant: ${variantId}) to cart`),
  addToWishlist: (id) => console.log(`Wishlisted ${id}`),
  updateQuantity: (id, qty) => console.log(`Updated ${id} qty to ${qty}`),
  isWishlisted: (id) => false
};

export default mockProductCollectionProps;