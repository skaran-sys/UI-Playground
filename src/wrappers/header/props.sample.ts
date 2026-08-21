import { HeaderProps } from './layout_template';

export const sampleHeaderProps: HeaderProps = {
  storeName: "Apex Store",
  logoUrl: "https://via.placeholder.com/150x50?text=ApexStore",
  wishlistCount: 3,
  cartCount: 2,
  isAuthenticated: true,
  user: { name: "Alex Johnson", email: "alex@example.com" },
  logout: () => console.log("User logged out"),
  config: {
    layout_id: "header_layout_v1",
    showSearch: true,
    showWishlist: true,
    showCart: true,
    showAuth: true,
    fixed: true,
    announcement: "⚡ Summer Sale Live! Get up to 50% off on all items.",
  },
  menu: [
    { label: "Home", href: "/" },
    { label: "Catalogue", href: "/catalogue" },
    { label: "Deals", href: "/deals" },
    { label: "About Us", href: "/about" },
  ],
  topMenuItems: [
    { label: "Help & Support", href: "/support" },
    { label: "Order Tracking", href: "/orders" },
  ],
  onSearch: (query: string) => console.log("Searching query:", query),
  onDeleteRecommendation: (id: string) => console.log("Deleted recommendation ID:", id),
  loadRecommendations: () => console.log("Loading recommendations..."),
  searchResults: {
    categories: [
      { _id: "c1", name: "Electronics" },
      { _id: "c2", name: "Fashion" },
    ],
    products: {
      items: [
        { _id: "p1", title: "Wireless Headphones", brand: "Aether", pricing: { sale: 99.99 } },
        { _id: "p2", title: "Smart Watch v2", brand: "Apex", pricing: { sale: 199.99 } },
      ],
    },
  },
  popularSearch: ["Wireless Earbuds", "Gaming Keyboard", "Smart Watches", "Sneakers"],
};

export default sampleHeaderProps;
