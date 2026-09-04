import { LayoutPropsTypes } from './layout_template';

export const mockProductListingProps: LayoutPropsTypes = {
  config: {
    title: "EYEGLASSES",
    subtitle: "",
    showFilters: true,
    card: {
      overlay: true,
      spacing: 4,
      corner: 16,
      shadow: false,
      showSubTitle: true,
      showPrice: true,
      coverImage: true,
      badge: {
        isVisible: true,
        bgColor: "#FFFFFF",
        position: "bottom-right"
      },
      discount: {
        isVisible: false,
        bgColor: "#000000",
        position: "top-left"
      },
      ratings: {
        isVisible: false,
        color: "#000000"
      },
      wishlist: {
        isVisible: true,
        position: "top-left"
      },
      coverVideo: {
        isVisible: false
      },
      buyNow: {
        isVisible: false
      },
      addToCart: {
        isVisible: true,
        btnText: "Quick Shop",
        btnStyle: "filled"
      }
    }
  },
  loading: false,
  cartItems: {},
  addToCart: (id: string, qty: number) => {
    console.log(`Add to cart: Product ${id} (Qty: ${qty})`);
  },
  addToWishlist: (id: string) => {
    console.log(`Toggle wishlist: Product ${id}`);
  },
  updateQuantity: (id: string, qty: number) => {
    console.log(`Update qty: Product ${id} -> ${qty}`);
  },
  isWishlisted: (id: string) => {
    return id === 'prod_2' || id === 'prod_3';
  },
  onPageChange: (page: number) => {
    console.log(`Page changed to: ${page}`);
  },
  applyFilters: () => {
    console.log("Filters applied");
  },
  clearFilters: () => {
    console.log("Filters cleared");
  },
  filters: [
    {
      key: "availability",
      label: "Availability",
      isMulti: true,
      value: [
        { name: "In Stock", count: 257 },
        { name: "Out Of Stock", count: 2 }
      ]
    },
    {
      key: "price",
      label: "Price",
      isMulti: false,
      value: [
        { min: 0, max: 132500, label: "Price range", count: 259 }
      ]
    }
  ],
  sortOptions: [
    { key: "featured", label: "Featured" },
    { key: "relevant", label: "Most relevant" },
    { key: "best_selling", label: "Best selling" },
    { key: "alpha_asc", label: "Alphabetically, A-Z" },
    { key: "alpha_desc", label: "Alphabetically, Z-A" },
    { key: "price_asc", label: "Price, low to high" },
    { key: "price_desc", label: "Price, high to low" }
  ],
  pagination: {
    page: 1,
    limit: 12,
    total: 108,
    totalPages: 9,
    hasNextPage: true,
    hasPrevPage: false
  },
  products: [
    {
      id: "prod_1",
      brand: "DITA",
      title: "ALKAMX DTS100-A-02 RHD-GLD",
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600",
      alt: "ALKAMX DTS100-A-02 RHD-GLD",
      link: "/products/alkamx-dts100-a-02",
      price: "MRP. 99,300/-",
      originalPrice: "MRP. 99,300/-",
      discount: "",
      rating: 5,
      reviewCount: 4,
      stock: 4,
      badge: "0"
    },
    {
      id: "prod_2",
      brand: "DITA",
      title: "ALKAMX DTS100-A-03 // BLK-GLD",
      image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=600",
      alt: "ALKAMX DTS100-A-03 // BLK-GLD",
      link: "/products/alkamx-dts100-a-03",
      price: "MRP. 99,300/-",
      originalPrice: "MRP. 99,300/-",
      discount: "",
      rating: 5,
      reviewCount: 8,
      stock: 3,
      badge: "0"
    },
    {
      id: "prod_3",
      brand: "BURBERRY",
      title: "BE 1355 1005",
      image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=600",
      alt: "BE 1355 1005",
      link: "/products/be-1355-1005",
      price: "MRP. 17,990/-",
      originalPrice: "MRP. 17,990/-",
      discount: "",
      rating: 4.8,
      reviewCount: 12,
      stock: 10,
      badge: "54"
    },
    {
      id: "prod_4",
      brand: "BOSS",
      title: "BOSS 1064/F 41N 145",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=600",
      alt: "BOSS 1064/F 41N 145",
      link: "/products/boss-1064f",
      price: "MRP. 16,800/-",
      originalPrice: "MRP. 16,800/-",
      discount: "",
      rating: 4.7,
      reviewCount: 3,
      stock: 5,
      badge: "53"
    },
    {
      id: "prod_5",
      brand: "BOSS",
      title: "BOSS 1163 0JI 145",
      image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=600",
      alt: "BOSS 1163 0JI 145",
      link: "/products/boss-1163-0ji",
      price: "MRP. 13,700/-",
      originalPrice: "MRP. 13,700/-",
      discount: "",
      rating: 4.9,
      reviewCount: 6,
      stock: 2,
      badge: "55"
    },
    {
      id: "prod_6",
      brand: "BOSS",
      title: "BOSS 1163 0NZ 145",
      image: "https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&q=80&w=600",
      alt: "BOSS 1163 0NZ 145",
      link: "/products/boss-1163-0nz",
      price: "MRP. 10,400/-",
      originalPrice: "MRP. 10,400/-",
      discount: "",
      rating: 4.6,
      reviewCount: 9,
      stock: 7,
      badge: "54"
    }
  ]
};

export default mockProductListingProps;