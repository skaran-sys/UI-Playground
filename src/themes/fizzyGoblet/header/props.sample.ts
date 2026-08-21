import { HeaderProps } from './layout_template';

export const mockHeaderProps: HeaderProps = {
  storeName: "FIZZY GOBLET",
  logoUrl: "",
  wishlistCount: 0,
  cartCount: 2,
  isAuthenticated: true,
  user: {
    name: "Aadya Sharma",
    email: "aadya@example.com"
  },
  logout: () => {
    console.log("Logged out");
  },
  config: {
    layout_id: "d2c_luxury_header_v1",
    showSearch: true,
    showWishlist: true,
    showCart: true,
    showAuth: true,
    fixed: true,
    announcement: "Get a FREE Nykaa Matte To Last Lipstick with every bag purchase!"
  },
  menu: [
    {
      label: "Shop",
      href: "/shop",
      subMenu: [
        { label: "Juttis", href: "/shop/juttis" },
        { label: "Heels", href: "/shop/heels" },
        { label: "Loafers", href: "/shop/loafers" },
        { label: "Kolha Flats", href: "/shop/kolha-flats" },
        { label: "Mules", href: "/shop/mules" },
        { label: "Vegan Sliders", href: "/shop/vegan-sliders" },
        { label: "Sandals", href: "/shop/sandals" },
        { label: "Sneakers", href: "/shop/sneakers" }
      ]
    },
    {
      label: "Stores",
      href: "/stores"
    },
    {
      label: "Story",
      href: "/story"
    },
    {
      label: "Fizzy G Club",
      href: "/club",
      subMenu: [
        { label: "Rewards", href: "/club/rewards" },
        { label: "Referrals", href: "/club/referrals" }
      ]
    }
  ],
  topMenuItems: [
    { label: "Track Order", href: "/track-order" },
    { label: "Customer Care", href: "/contact" }
  ],
  popularSearch: [
    "WEDGES",
    "MULES",
    "JUTTIS",
    "BAGS",
    "BAG CHARMS",
    "SLIDERS",
    "HEELS",
    "LOAFERS",
    "FLATS"
  ],
  searchResults: {
    categories: [
      { _id: "cat_1", name: "Sandals & Sliders" },
      { _id: "cat_2", name: "Bridal Juttis" },
      { _id: "cat_3", name: "Handcrafted Bags" }
    ],
    products: {
      items: [
        {
          _id: "prod_1",
          title: "Golden Blossom Flat Sliders",
          brand: "FIZZY GOBLET",
          media: {
            coverImage: {
              sq1_1: {
                url: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=600"
              }
            }
          },
          pricing: {
            sale: 3290
          }
        },
        {
          _id: "prod_2",
          title: "Embroidered Mesh Slingbacks",
          brand: "FIZZY GOBLET",
          media: {
            coverImage: {
              sq1_1: {
                url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=600"
              }
            }
          },
          pricing: {
            sale: 4490
          }
        },
        {
          _id: "prod_3",
          title: "Pastel Meadow Denim Juttis",
          brand: "FIZZY GOBLET",
          media: {
            coverImage: {
              sq1_1: {
                url: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=600"
              }
            }
          },
          pricing: {
            sale: 3890
          }
        },
        {
          _id: "prod_4",
          title: "Midnight Tweed Sliders",
          brand: "FIZZY GOBLET",
          media: {
            coverImage: {
              sq1_1: {
                url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600"
              }
            }
          },
          pricing: {
            sale: 2990
          }
        }
      ]
    }
  },
  onSearch: (query: string) => {
    console.log("Search query submitted:", query);
  },
  onDeleteRecommendation: (id: string) => {
    console.log("Delete recommendation:", id);
  },
  loadRecommendations: () => {
    console.log("Recommendations loaded");
  }
};

export default mockHeaderProps;
