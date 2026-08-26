import { HeaderProps } from './layout_template';

export const mockHeaderProps: HeaderProps = {
  storeName: "DOT & KEY",
  logoUrl: "",
  isAuthenticated: false,
  wishlistCount: 2,
  cartCount: 1,
  wishlistHref: "/wishlist",
  cartHref: "/cart",
  accountHref: "/account",
  config: {
    layout_id: "dot_and_key_header_v3",
    showSearch: true,
    showWishlist: true,
    showCart: true,
    showAuth: true,
    fixed: true,
    announcement: [
      "BEWARE: No one from our team will call you for offers, free gifts or payments.",
      "UPTO 20% OFF + Free Gifts on All Orders Above ₹999!",
      "Click For More Offers | Free Shipping on Prepaid Orders"
    ],
    searchPlaceholder: "Search for Face wash, Serum, Sunscreen..."
  },
  user: null,
  logout: () => {
    console.log("Logged out successfully");
  },
  menu: [
    {
      label: "SHOP ALL",
      href: "/collections/all",
      subMenu: [
        { label: "Sunscreens & SPF", href: "/collections/sunscreen" },
        { label: "Moisturizers & Day Creams", href: "/collections/moisturizers" },
        { label: "Face Serums & Treatments", href: "/collections/serums" },
        { label: "Face Washes & Cleansers", href: "/collections/cleansers" },
        { label: "Lip Care & Balms", href: "/collections/lip-care" },
        { label: "Body Care Lotions", href: "/collections/body-care" }
      ]
    },
    {
      label: "SKIN CONCERN",
      href: "/collections/concern",
      subMenu: [
        { label: "Pigmentation & Dark Spots", href: "/concern/pigmentation" },
        { label: "Acne & Blemishes", href: "/concern/acne" },
        { label: "Dryness & Dehydration", href: "/concern/dryness" },
        { label: "Sun Damage & Tan Removal", href: "/concern/tan-removal" },
        { label: "Dullness & Uneven Tone", href: "/concern/dullness" }
      ]
    },
    {
      label: "INGREDIENTS",
      href: "/collections/ingredients",
      subMenu: [
        { label: "Vitamin C + E", href: "/ingredients/vitamin-c" },
        { label: "Hyaluronic + Ceramides", href: "/ingredients/hyaluronic" },
        { label: "Watermelon + AHA", href: "/ingredients/watermelon" },
        { label: "Strawberry + Niacinamide", href: "/ingredients/strawberry" },
        { label: "Dragon Fruit", href: "/ingredients/dragon-fruit" },
        { label: "CICA + Salicylic Acid", href: "/ingredients/cica-salicylic" }
      ]
    },
    {
      label: "SKIN TYPE",
      href: "/collections/skin-type",
      subMenu: [
        { label: "Oily & Acne-Prone", href: "/skin-type/oily" },
        { label: "Dry & Sensitive", href: "/skin-type/dry" },
        { label: "Combination", href: "/skin-type/combination" },
        { label: "Normal", href: "/skin-type/normal" }
      ]
    },
    {
      label: "BEST SELLERS",
      href: "/collections/best-sellers"
    },
    {
      label: "NEW ARRIVALS",
      href: "/collections/new-arrivals"
    },
    {
      label: "BLOGS",
      href: "/blogs/skincare-journal"
    }
  ],
  popularSearch: [
    { title: "FACE WASH" },
    { title: "SERUM" },
    { title: "COMBOS" },
    { title: "SUNSCREEN" },
    { title: "MOISTURIZERS" }
  ],
  searchResults: {
    categories: [
      { _id: "cat_1", name: "Sunscreens" },
      { _id: "cat_2", name: "Moisturizers" }
    ],
    products: {
      items: [
        {
          _id: "prod_1",
          title: "Vitamin C + E Super Bright Gel Moisturizer",
          brand: "Moisturizer",
          pricing: { sale: 495 },
          media: {
            coverImage: {
              sq1_1: {
                url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600"
              }
            }
          }
        },
        {
          _id: "prod_2",
          title: "Dragon Fruit Bounce Gel Sunscreen SPF 50+",
          brand: "Sunscreen",
          pricing: { sale: 445 },
          media: {
            coverImage: {
              sq1_1: {
                url: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=600"
              }
            }
          }
        }
      ]
    }
  },
  onSearch: (query: string) => {
    console.log("Searching catalog for:", query);
  },
  onDeleteRecommendation: (id: string) => {
    console.log("Deleted recommendation ID:", id);
  },
  loadRecommendations: () => {
    console.log("Loading search recommendations...");
  },
  onCartToggle: () => {
    console.log("Cart drawer toggled");
  }
};

export default mockHeaderProps;