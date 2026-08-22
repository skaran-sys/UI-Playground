import { LayoutProps } from './layout_template';

export const mockWishlistProps: LayoutProps = {
  loading: false,
  config: {
    layout_id: "d2c_luxury_wishlist_page_v1",
    title: "My Wishlist",
    share_button_text: "Share Wishlist",
    clear_all_text: "Clear All",
    cta_label: "Add To Bag"
  },
  products: [
    {
      id: "prod_wish_1",
      title: "Genda : Kolha Flats",
      slug: "genda-kolha-flats",
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=85&w=800",
      alt: "Genda Kolha Flats in Orange",
      link: "/products/genda-kolha-flats",
      price: "3990",
      originalPrice: "4490",
      discount: "11% OFF",
      rating: 4.8,
      reviewCount: 32,
      stock: 12,
      brand: "Fizzy Goblet",
      badge: "Orange / 36"
    },
    {
      id: "prod_wish_2",
      title: "Blush & Bronze : Bomba Sliders",
      slug: "blush-bronze-bomba-sliders",
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=85&w=800",
      alt: "Blush and Bronze Bomba Sliders",
      link: "/products/blush-bronze-bomba-sliders",
      price: "3990",
      originalPrice: "",
      discount: "",
      rating: 4.9,
      reviewCount: 45,
      stock: 8,
      brand: "Fizzy Goblet",
      badge: "Bronze / 36"
    },
    {
      id: "prod_wish_3",
      title: "Mirror Masala : Juttis",
      slug: "mirror-masala-juttis",
      image: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&q=85&w=800",
      alt: "Mirror Masala Handcrafted Juttis",
      link: "/products/mirror-masala-juttis",
      price: "4490",
      originalPrice: "",
      discount: "",
      rating: 5.0,
      reviewCount: 60,
      stock: 5,
      brand: "Fizzy Goblet",
      badge: "Yellow / 36"
    },
    {
      id: "prod_wish_4",
      title: "Mehndi : Kolha Flats",
      slug: "mehndi-kolha-flats",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=85&w=800",
      alt: "Mehndi Olive Kolha Flats",
      link: "/products/mehndi-kolha-flats",
      price: "4990",
      originalPrice: "5490",
      discount: "10% OFF",
      rating: 4.7,
      reviewCount: 28,
      stock: 15,
      brand: "Fizzy Goblet",
      badge: "Olive / 36"
    }
  ],
  cartItems: {
    prod_wish_1: 1
  },
  removeFromWishlist: (productId: string) => {
    console.log("Removed from wishlist:", productId);
  },
  addToCart: (id: string, qty: number) => {
    console.log("Added to cart:", id, "Qty:", qty);
  },
  updateQuantity: (id: string, qty: number) => {
    console.log("Updated quantity:", id, "Qty:", qty);
  }
};

export default mockWishlistProps;