import { CollectionLayoutPropType } from './layout_template';

export const mockCategoryCollectionProps: CollectionLayoutPropType = {
  isLoading: false,
  link: "/collections/all",
  config: {
    layout_id: "eye_lounge_category_collection_v1",
    title: "Shop by Category",
    show_header: false,
    show_title: true,
    show_subtitle: false,
    overflow: "grid", // Supports "grid" or "carousel"
    header_size: "medium",
    header_alignment: "center",
    card_size: "medium"
  },
  items: [
    {
      id: "cat_1",
      title: "MEN'S\nEYEWEAR",
      subtitle: "Designer Frames",
      link: "/collections/mens-eyewear",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=700"
    },
    {
      id: "cat_2",
      title: "WOMEN'S\nSUNGLASSES",
      subtitle: "Luxury Eyewear",
      link: "/collections/womens-sunglasses",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=700"
    },
    {
      id: "cat_3",
      title: "KIDS\nEYEWEAR",
      subtitle: "Durable & Stylish",
      link: "/collections/kids-eyewear",
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=700"
    },
    {
      id: "cat_4",
      title: "CONTACT\nLENSES",
      subtitle: "Daily & Monthly Lenses",
      link: "/collections/contact-lenses",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=700"
    }
  ]
};

export default mockCategoryCollectionProps;