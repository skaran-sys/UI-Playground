import { LayoutProps } from './layout_template';

export const mockWishlistProps: LayoutProps = {
  config: {
    layout_id: "eye_lounge_wishlist_v1",
    title: "Wishlist"
  },
  loading: false,
  cartItems: {},
  removeFromWishlist: (productId: string) => {
    console.log(`Remove product from wishlist: ${productId}`);
  },
  addToCart: (id: string, qty: number) => {
    console.log(`Add to cart: Product ${id} (Qty: ${qty})`);
  },
  updateQuantity: (id: string, qty: number) => {
    console.log(`Update quantity: Product ${id} -> ${qty}`);
  },
  products: [
    {
      id: "prod_1",
      title: "RE - 20029-C01",
      brand: "Royal Enfield",
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800",
      alt: "RE - 20029-C01 Eyewear",
      link: "/products/re-20029-c01",
      price: "MRP. 5,950/-",
      originalPrice: "MRP. 6,950/-",
      discount: "14% OFF",
      rating: 4.8,
      reviewCount: 12,
      stock: 5,
      badge: ""
    },
    {
      id: "prod_2",
      title: "ALKAMX DTS100-A-03 // BLK-GLD",
      brand: "DITA",
      image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=800",
      alt: "ALKAMX DTS100-A-03 Eyewear",
      link: "/products/alkamx-dts100",
      price: "MRP. 99,300/-",
      originalPrice: "MRP. 99,300/-",
      discount: "",
      rating: 5.0,
      reviewCount: 4,
      stock: 2,
      badge: ""
    },
    {
      id: "prod_3",
      title: "SF1085S 219",
      brand: "Ferragamo",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800",
      alt: "SF1085S 219 Eyewear",
      link: "/products/sf1085s-219",
      price: "MRP. 28,000/-",
      originalPrice: "MRP. 32,000/-",
      discount: "12% OFF",
      rating: 4.9,
      reviewCount: 18,
      stock: 8,
      badge: "57"
    },
    {
      id: "prod_4",
      title: "SF1090S 208",
      brand: "Ferragamo",
      image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=800",
      alt: "SF1090S 208 Eyewear",
      link: "/products/sf1090s-208",
      price: "MRP. 18,500/-",
      originalPrice: "MRP. 18,500/-",
      discount: "",
      rating: 4.7,
      reviewCount: 9,
      stock: 4,
      badge: ""
    },
    {
      id: "prod_4",
      title: "SF1090S 208",
      brand: "Ferragamo",
      image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=800",
      alt: "SF1090S 208 Eyewear",
      link: "/products/sf1090s-208",
      price: "MRP. 18,500/-",
      originalPrice: "MRP. 18,500/-",
      discount: "",
      rating: 4.7,
      reviewCount: 9,
      stock: 4,
      badge: ""
    },
    {
      id: "prod_4",
      title: "SF1090S 208",
      brand: "Ferragamo",
      image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=800",
      alt: "SF1090S 208 Eyewear",
      link: "/products/sf1090s-208",
      price: "MRP. 18,500/-",
      originalPrice: "MRP. 18,500/-",
      discount: "",
      rating: 4.7,
      reviewCount: 9,
      stock: 4,
      badge: ""
    },
    {
      id: "prod_4",
      title: "SF1090S 208",
      brand: "Ferragamo",
      image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=800",
      alt: "SF1090S 208 Eyewear",
      link: "/products/sf1090s-208",
      price: "MRP. 18,500/-",
      originalPrice: "MRP. 18,500/-",
      discount: "",
      rating: 4.7,
      reviewCount: 9,
      stock: 4,
      badge: ""
    },
    {
      id: "prod_4",
      title: "SF1090S 208",
      brand: "Ferragamo",
      image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=800",
      alt: "SF1090S 208 Eyewear",
      link: "/products/sf1090s-208",
      price: "MRP. 18,500/-",
      originalPrice: "MRP. 18,500/-",
      discount: "",
      rating: 4.7,
      reviewCount: 9,
      stock: 4,
      badge: ""
    },
  ]
};

export default mockWishlistProps;