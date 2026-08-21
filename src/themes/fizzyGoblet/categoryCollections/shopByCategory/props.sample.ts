import { CollectionLayoutPropType } from './layout_template';

export const mockCategoryCollectionV2Props: CollectionLayoutPropType = {
  isLoading: false,
  config: {
    layout_id: "d2c_luxury_category_collection_editorial_v2",
    title: "Shop By Category",
    view_all_text: "View All",
    link: "/collections",
    cta_label: "Explore",
    show_header: true,
    show_add_to_cart: false,
    show_wishlist: false,
    show_rating: false,
    overflow: "carousel",
    header_size: "medium",
    header_alignment: "center",
    card_size: "medium"
  },
  items: [
    {
      id: "cat_editorial_1",
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=85&w=800",
      title: "Loafers",
      link: "/collections/loafers"
    },
    {
      id: "cat_editorial_2",
      image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=85&w=800",
      title: "Juttis",
      link: "/collections/juttis"
    },
    {
      id: "cat_editorial_3",
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=85&w=800",
      title: "Heels",
      link: "/collections/heels"
    },
    {
      id: "cat_editorial_4",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=85&w=800",
      title: "Sandals",
      link: "/collections/sandals"
    }
  ]
};

export default mockCategoryCollectionV2Props;