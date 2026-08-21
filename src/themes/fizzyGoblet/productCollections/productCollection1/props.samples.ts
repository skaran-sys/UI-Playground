import { CollectionLayoutPropType } from './layout_template';

export const mockCollectionProps: CollectionLayoutPropType = {
  isLoading: false,
  config: {
    layout_id: "d2c_luxury_product_collection_v3",
    title: "Best Sellers",
    view_all_text: "View All",
    link: "/collections/best-sellers",
    cta_label: "Add to Cart",
    show_header: true,
    show_add_to_cart: true,
    show_wishlist: true,
    show_rating: false,
    overflow: "carousel",
    header_size: "large",
    header_alignment: "left",
    card_size: "medium"
  },
  items: [
    {
      id: "prod_1",
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800",
      hover_image: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&q=80&w=800",
      title: "Bomba Sliders",
      description: "Floral Embellished Flats",
      price: "₹ 2,290",
      originalPrice: "₹ 2,790",
      discount: "18% OFF",
      badge: "New Arrivals",
      link: "/products/bomba-sliders"
    },
    {
      id: "prod_2",
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800",
      hover_image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800",
      title: "Main Act",
      description: "Backless Loafers",
      price: "₹ 2,620",
      originalPrice: "",
      discount: "",
      badge: "Classics",
      link: "/products/main-act"
    },
    {
      id: "prod_3",
      image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800",
      hover_image: "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?auto=format&fit=crop&q=80&w=800",
      title: "Brew can do it",
      description: "Backless Loafers",
      price: "₹ 2,620",
      originalPrice: "",
      discount: "",
      badge: "Classics",
      link: "/products/brew-can-do-it"
    },
    {
      id: "prod_4",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800",
      hover_image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800",
      title: "Goldie Locks",
      description: "Criss Cross Sandals",
      price: "₹ 2,620",
      originalPrice: "₹ 3,200",
      discount: "18% OFF",
      badge: "Online Exclusive",
      link: "/products/goldie-locks"
    }
  ]
};

export default mockCollectionProps;