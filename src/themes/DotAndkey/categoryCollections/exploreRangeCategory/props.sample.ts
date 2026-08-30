import { CollectionLayoutPropType } from './layout_template';

export const mockExploreRangeProps: CollectionLayoutPropType = {
  isLoading: false,
  config: {
    layout_id: "dot_and_key_explore_range_v1",
    title: "Explore Our Range",
    view_all_text: "",
    link: "/collections",
    cta_label: "Explore",
    show_header: true,
    show_add_to_cart: false,
    show_wishlist: false,
    show_rating: false,
    overflow: "carousel",
    header_alignment: "center"
  },
  items: [
    {
      id: "range_1",
      title: "Vitamin C",
      subtitle: "Glow & Brightening",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=85&w=800",
      hover_image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=85&w=800",
      link: "/collections/vitamin-c"
    },
    {
      id: "range_2",
      title: "Watermelon + AHA",
      subtitle: "Pore Tightening",
      image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=85&w=800",
      hover_image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=85&w=800",
      link: "/collections/watermelon"
    },
    {
      id: "range_3",
      title: "Hyaluronic + Ceramides",
      subtitle: "Intense Hydration",
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=85&w=800",
      hover_image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=85&w=800",
      link: "/collections/ceramides"
    },
    {
      id: "range_4",
      title: "Strawberry + Niacinamide",
      subtitle: "Dewy Glow",
      image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=85&w=800",
      hover_image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=85&w=800",
      link: "/collections/strawberry-dew"
    },
    {
      id: "range_5",
      title: "Cica + Salicylic Acid",
      subtitle: "Acne & Oil Control",
      image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=85&w=800",
      hover_image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=85&w=800",
      link: "/collections/cica-green-tea"
    }
  ]
};

export default mockExploreRangeProps;