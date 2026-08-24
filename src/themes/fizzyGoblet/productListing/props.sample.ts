import { LayoutPropsTypes } from './layout_template';

export const mockProductListingProps: LayoutPropsTypes = {
  loading: false,
  config: {
    title: "New Arrivals",
    subtitle: "",
    showFilters: true,
    card: {
      overlay: false,
      spacing: 4,
      corner: 0,
      shadow: false,
      showSubTitle: true,
      showPrice: true,
      coverImage: true,
      badge: {
        isVisible: true,
        bgColor: "#e08b8b",
        position: "top-left"
      },
      discount: {
        isVisible: false,
        bgColor: "#000000",
        position: "top-right"
      },
      ratings: {
        isVisible: false,
        color: "#f59e0b"
      },
      wishlist: {
        isVisible: true,
        color: "#ffffff",
        position: "top-right"
      },
      coverVideo: {
        isVisible: false,
        loop: false
      },
      slideShow: {
        isVisible: true,
        slideType: "manual"
      },
      buyNow: {
        isVisible: false,
        btnStyle: "filled",
        btnText: "Buy Now"
      },
      addToCart: {
        isVisible: true,
        btnStyle: "text",
        btnText: "Add to Bag"
      }
    }
  },
  products: [
    {
      id: "plp_prod_1",
      title: "Main Act",
      slug: "main-act-backless-loafers",
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=85&w=800",
      hoverImages: [
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=85&w=800"
      ],
      alt: "Main Act Backless Loafers",
      link: "/products/main-act-backless-loafers",
      price: "2,620",
      originalPrice: "",
      discount: "",
      rating: 5,
      reviewCount: 39,
      stock: 15,
      brand: "Backless Loafers",
      badge: "Classics"
    },
    {
      id: "plp_prod_2",
      title: "Black Swan",
      slug: "black-swan-bomba-sliders",
      image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=85&w=800",
      hoverImages: [
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=85&w=800"
      ],
      alt: "Black Swan Bomba Sliders",
      link: "/products/black-swan-bomba-sliders",
      price: "3,490",
      originalPrice: "",
      discount: "",
      rating: 4.8,
      reviewCount: 22,
      stock: 12,
      brand: "Bomba Sliders",
      badge: "New Arrivals"
    },
    {
      id: "plp_prod_3",
      title: "Out of Office",
      slug: "out-of-office-backless-loafers",
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=85&w=800",
      hoverImages: [
        "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&q=85&w=800"
      ],
      alt: "Out of Office Backless Loafers",
      link: "/products/out-of-office-backless-loafers",
      price: "2,620",
      originalPrice: "3,200",
      discount: "18% OFF",
      rating: 4.9,
      reviewCount: 45,
      stock: 8,
      brand: "Backless Loafers",
      badge: "Classics"
    },
    {
      id: "plp_prod_4",
      title: "Goldie Locks",
      slug: "goldie-locks-criss-cross-sandals",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=85&w=800",
      hoverImages: [],
      alt: "Goldie Locks Criss Cross Sandals",
      link: "/products/goldie-locks-criss-cross-sandals",
      price: "2,620",
      originalPrice: "",
      discount: "",
      rating: 4.7,
      reviewCount: 16,
      stock: 18,
      brand: "Criss Cross Sandals",
      badge: "New Arrivals"
    },
    {
      id: "plp_prod_5",
      title: "Brew can do it",
      slug: "brew-can-do-it-backless-loafers",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=85&w=800",
      hoverImages: [],
      alt: "Brew can do it Backless Loafers",
      link: "/products/brew-can-do-it-backless-loafers",
      price: "2,620",
      originalPrice: "",
      discount: "",
      rating: 5,
      reviewCount: 31,
      stock: 20,
      brand: "Backless Loafers",
      badge: "Classics"
    },
    {
      id: "plp_prod_6",
      title: "Blue Me Away",
      slug: "blue-me-away-bomba-sliders",
      image: "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?auto=format&fit=crop&q=85&w=800",
      hoverImages: [],
      alt: "Blue Me Away Bomba Sliders",
      link: "/products/blue-me-away-bomba-sliders",
      price: "3,490",
      originalPrice: "",
      discount: "",
      rating: 4.8,
      reviewCount: 19,
      stock: 10,
      brand: "Bomba Sliders",
      badge: "New Arrivals"
    },
    {
      id: "plp_prod_7",
      title: "Rose in Rome",
      slug: "rose-in-rome-mary-janes",
      image: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&q=85&w=800",
      hoverImages: [],
      alt: "Rose in Rome Mary Janes",
      link: "/products/rose-in-rome-mary-janes",
      price: "3,490",
      originalPrice: "",
      discount: "",
      rating: 4.9,
      reviewCount: 28,
      stock: 14,
      brand: "Mary Janes",
      badge: "New Arrivals"
    },
    {
      id: "plp_prod_8",
      title: "Coastal Sundari",
      slug: "coastal-sundari-sandals",
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=85&w=800",
      hoverImages: [],
      alt: "Coastal Sundari Sandals",
      link: "/products/coastal-sundari-sandals",
      price: "2,620",
      originalPrice: "",
      discount: "",
      rating: 4.6,
      reviewCount: 14,
      stock: 6,
      brand: "Sandals",
      badge: "New Arrivals"
    },
  ],
  filters: [
    {
      key: "product_type",
      label: "Product Type",
      isMulti: true,
      value: [
        { name: "Ballet Flats", count: 12 },
        { name: "Classics", count: 24 },
        { name: "Criss Cross", count: 18 },
        { name: "Crossbody Leather - Bags", count: 9 },
        { name: "Custom Gift Box", count: 4 },
        { name: "Heels", count: 32 },
        { name: "Juttis", count: 45 },
        { name: "Kolhapuri", count: 28 },
        { name: "Loafers", count: 19 },
        { name: "Lounge Slippers", count: 8 },
        { name: "Mule Heels", count: 15 },
        { name: "Mules", count: 21 },
        { name: "Sandals", count: 37 }
      ]
    },
    {
      key: "price",
      label: "Price",
      isMulti: false,
      value: [
        { min: 0, max: 9990, label: "Price Range", count: 88 }
      ]
    },
    {
      key: "size",
      label: "Size",
      isMulti: true,
      value: [
        { name: "36", count: 52 },
        { name: "37", count: 64 },
        { name: "38", count: 70 },
        { name: "39", count: 58 },
        { name: "40", count: 44 },
        { name: "41", count: 26 }
      ]
    },
    {
      key: "color",
      label: "Color",
      isMulti: true,
      value: [
        { name: "Beige", hex: "#F5F5DC", count: 18 },
        { name: "Black", hex: "#000000", count: 32 },
        { name: "Blue", hex: "#1E3A8A", count: 14 },
        { name: "Bronze", hex: "#CD7F32", count: 9 },
        { name: "Brown", hex: "#8B4513", count: 21 },
        { name: "Gold", hex: "#EAB308", count: 25 },
        { name: "Magenta", hex: "#DB2777", count: 11 }
      ]
    }
  ],
  sortOptions: [
    { key: "featured", label: "Featured" },
    { key: "most_relevant", label: "Most relevant" },
    { key: "best_selling", label: "Best selling" },
    { key: "price_asc", label: "Price, low to high" },
    { key: "price_desc", label: "Price, high to low" },
    { key: "date_asc", label: "Date, old to new" },
    { key: "date_desc", label: "Newest" }
  ],
  pagination: {
    page: 1,
    limit: 8,
    total: 32,
    totalPages: 4,
    hasNextPage: true,
    hasPrevPage: false
  },
  cartItems: {},
  addToCart: (id: string, qty: number) => {
    console.log("Added to cart:", id, "Qty:", qty);
  },
  addToWishlist: (id: string) => {
    console.log("Wishlist toggled:", id);
  },
  updateQuantity: (id: string, qty: number) => {
    console.log("Updated quantity:", id, "Qty:", qty);
  },
  isWishlisted: (id: string) => {
    return id === "plp_prod_1";
  },
  onPageChange: (page: number) => {
    console.log("Load more triggered for page:", page);
  },
  applyFilters: () => {
    console.log("Filters applied dynamically");
  },
  clearFilters: () => {
    console.log("Filters cleared");
  }
};

export default mockProductListingProps;