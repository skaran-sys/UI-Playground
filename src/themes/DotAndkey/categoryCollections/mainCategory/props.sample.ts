import { CollectionLayoutPropType } from './layout_template';

export const mockCategoryCollectionProps: CollectionLayoutPropType = {
  isLoading: false,
  config: {
    layout_id: "d2c_luxury_category_collection_v1",
    title: "Shop By Category",
    view_all_text: "View All",
    link: "/collections",
    cta_label: "Explore",
    show_header: false,
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
      id: "cat_1",
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=400",
      hover_image: "",
      title: "Heels",
      link: "/collections/heels"
    },
    {
      id: "cat_2",
      image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=400",
      hover_image: "",
      title: "Juttis",
      link: "/collections/juttis"
    },
    {
      id: "cat_3",
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=400",
      hover_image: "",
      title: "Loafers",
      link: "/collections/loafers"
    },
    {
      id: "cat_4",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=400",
      hover_image: "",
      title: "Vegan Slides",
      link: "/collections/vegan-slides"
    },
    {
      id: "cat_5",
      image: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&q=80&w=400",
      hover_image: "",
      title: "Sandals",
      link: "/collections/sandals"
    },
    {
      id: "cat_6",
      image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=400",
      hover_image: "",
      title: "Criss Cross Slider",
      link: "/collections/criss-cross-sliders"
    },
    {
      id: "cat_7",
      image: "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?auto=format&fit=crop&q=80&w=400",
      hover_image: "",
      title: "Mary Janes",
      link: "/collections/mary-janes"
    },
    {
      id: "cat_8",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=400",
      hover_image: "",
      title: "Kolha Flats",
      link: "/collections/kolha-flats"
    }
  ]
};

export default mockCategoryCollectionProps;