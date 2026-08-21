import { CollectionLayoutPropType } from './layout_template';

export const mockCategoryCollectionGridProps: CollectionLayoutPropType = {
  isLoading: false,
  config: {
    layout_id: "d2c_luxury_category_transparent_grid_v1",
    title: "",
    view_all_text: "View All",
    link: "/collections",
    cta_label: "Explore",
    show_header: false,
    show_add_to_cart: false,
    show_wishlist: false,
    show_rating: false,
    overflow: "grid",
    header_size: "medium",
    header_alignment: "center",
    card_size: "large"
  },
  items: [
    {
      id: "cat_trans_1",
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=85&w=800",
      hover_image: "",
      title: "Sneaker for Women",
      subtitle: "",
      link: "/collections/sneakers"
    },
    {
      id: "cat_trans_2",
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=85&w=800",
      hover_image: "",
      title: "Sandals for Women",
      subtitle: "",
      link: "/collections/sandals"
    },
    {
      id: "cat_trans_3",
      image: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&q=85&w=800",
      hover_image: "",
      title: "Juttis for Women",
      subtitle: "",
      link: "/collections/juttis"
    },
    {
      id: "cat_trans_4",
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=85&w=800",
      hover_image: "",
      title: "Heels for Women",
      subtitle: "",
      link: "/collections/heels"
    }
  ]
};

export default mockCategoryCollectionGridProps;