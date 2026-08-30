import { LayoutPropsTypes } from './layout_template';

export const mockProductListingProps: LayoutPropsTypes = {
  loading: false,
  cartItems: {},
  config: {
    title: "Watermelon + AHA",
    subtitle: "For uneven skin texture",
    showFilters: false,
    card: {
      overlay: false,
      spacing: 4,
      corner: 16,
      shadow: true,
      showSubTitle: true,
      showPrice: true,
      coverImage: true,
      badge: {
        isVisible: true,
        bgColor: "#FFF0F6",
        position: "top-left"
      },
      discount: {
        isVisible: true,
        bgColor: "#FF2E93",
        position: "top-right"
      },
      ratings: {
        isVisible: true,
        color: "#70B33F"
      },
      wishlist: {
        isVisible: false
      },
      coverVideo: {
        isVisible: false
      },
      buyNow: {
        isVisible: false
      },
      addToCart: {
        isVisible: true,
        btnStyle: "filled",
        btnText: "ADD TO CART"
      }
    }
  },
  products: [
    {
      id: "prod_wm_1",
      title: "Watermelon Cooling Sunscreen SPF 50+ PA++++ With New-Age UV...",
      slug: "watermelon-cooling-sunscreen-spf-50",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=85&w=600",
      alt: "Watermelon Cooling Sunscreen",
      link: "/products/watermelon-cooling-sunscreen-spf-50",
      price: "595",
      originalPrice: "695",
      discount: "15% OFF",
      offerPrice: "506",
      rating: 5,
      reviewCount: 1633,
      stock: 45,
      brand: "Dot & Key",
      badge: "BESTSELLER ★",
      skinType: "Oily & Combination Skin",
      variants: [
        { label: "80g", id: "v1_80g", price: "595", offerPrice: "506" },
        { label: "50g", id: "v1_50g", price: "495", offerPrice: "421" }
      ]
    },
    {
      id: "prod_wm_2",
      title: "Watermelon Cooling Icy Gel Moisturizer With Hyaluronic",
      slug: "watermelon-cooling-icy-gel-moisturizer",
      image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=85&w=600",
      alt: "Watermelon Cooling Icy Gel Moisturizer",
      link: "/products/watermelon-cooling-icy-gel-moisturizer",
      price: "495",
      originalPrice: "595",
      discount: "17% OFF",
      offerPrice: "421",
      rating: 5,
      reviewCount: 1542,
      stock: 30,
      brand: "Dot & Key",
      badge: "",
      skinType: "Oily & Combination Skin",
      variants: [
        { label: "60g", id: "v2_60g", price: "495", offerPrice: "421" }
      ]
    },
    {
      id: "prod_wm_3",
      title: "Watermelon Gel Face Wash With Vitamin C + Cucumber",
      slug: "watermelon-gel-face-wash",
      image: "https://images.unsplash.com/photo-1556228722-d0b777a94bf3?auto=format&fit=crop&q=85&w=600",
      alt: "Watermelon Gel Face Wash",
      link: "/products/watermelon-gel-face-wash",
      price: "375",
      originalPrice: "445",
      discount: "16% OFF",
      offerPrice: "319",
      rating: 5,
      reviewCount: 1542,
      stock: 50,
      brand: "Dot & Key",
      badge: "TOP PICK",
      skinType: "Normal, Oily & Combination Skin",
      variants: [
        { label: "175ml", id: "v3_175ml", price: "375", offerPrice: "319" },
        { label: "100ml", id: "v3_100ml", price: "275", offerPrice: "234" }
      ]
    },
    {
      id: "prod_wm_4",
      title: "Watermelon Cool Icy Plunge Clay Mask",
      slug: "watermelon-cool-icy-plunge-clay-mask",
      image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=85&w=600",
      alt: "Watermelon Cool Icy Plunge Clay Mask",
      link: "/products/watermelon-cool-icy-plunge-clay-mask",
      price: "499",
      originalPrice: "599",
      discount: "17% OFF",
      offerPrice: "424",
      rating: 5,
      reviewCount: 9,
      stock: 20,
      brand: "Dot & Key",
      badge: "JUST IN ♥",
      skinType: "Oily, Combination & Normal Skin",
      variants: [
        { label: "70g", id: "v4_70g", price: "499", offerPrice: "424" }
      ]
    },
    {
      id: "prod_wm_5",
      title: "Watermelon Pore Tightening Glow Toner",
      slug: "watermelon-pore-tightening-toner",
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=85&w=600",
      alt: "Watermelon Pore Tightening Toner",
      link: "/products/watermelon-pore-tightening-toner",
      price: "395",
      originalPrice: "495",
      discount: "20% OFF",
      offerPrice: "336",
      rating: 5,
      reviewCount: 880,
      stock: 40,
      brand: "Dot & Key",
      badge: "",
      skinType: "Oily & Combination Skin",
      variants: [
        { label: "150ml", id: "v5_150ml", price: "395", offerPrice: "336" }
      ]
    },
    {
      id: "prod_wm_6",
      title: "Watermelon 10% Glycolic Gentle Exfoliating Face Serum",
      slug: "watermelon-glycolic-serum",
      image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=85&w=600",
      alt: "Watermelon Glycolic Serum",
      link: "/products/watermelon-glycolic-serum",
      price: "549",
      originalPrice: "695",
      discount: "21% OFF",
      offerPrice: "467",
      rating: 5,
      reviewCount: 412,
      stock: 35,
      brand: "Dot & Key",
      badge: "",
      skinType: "All Skin Types",
      variants: [
        { label: "30ml", id: "v6_30ml", price: "549", offerPrice: "467" }
      ]
    },
    {
      id: "prod_wm_7",
      title: "Watermelon Cooling Underarm Roll-On Deodorant",
      slug: "watermelon-underarm-roll-on",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=85&w=600",
      alt: "Watermelon Underarm Roll-On",
      link: "/products/watermelon-underarm-roll-on",
      price: "299",
      originalPrice: "349",
      discount: "14% OFF",
      offerPrice: "254",
      rating: 5,
      reviewCount: 230,
      stock: 60,
      brand: "Dot & Key",
      badge: "",
      skinType: "All Skin Types",
      variants: [
        { label: "50ml", id: "v7_50ml", price: "299", offerPrice: "254" }
      ]
    },
    {
      id: "prod_wm_8",
      title: "Watermelon Cooling Hydrogel Eye Patches",
      slug: "watermelon-hydrogel-eye-patches",
      image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=85&w=600",
      alt: "Watermelon Hydrogel Eye Patches",
      link: "/products/watermelon-hydrogel-eye-patches",
      price: "695",
      originalPrice: "895",
      discount: "22% OFF",
      offerPrice: "591",
      rating: 5,
      reviewCount: 615,
      stock: 18,
      brand: "Dot & Key",
      badge: "TRENDING 🔥",
      skinType: "All Skin Types",
      variants: [
        { label: "60 Patches", id: "v8_60p", price: "695", offerPrice: "591" }
      ]
    }
  ],
  filters: [],
  sortOptions: [],
  applyFilters: () => {},
  clearFilters: () => {},
  onPageChange: (page: number) => console.log("Page change:", page),
  addToCart: (id: string, qty: number) => console.log(`Added ${qty} of ${id} to cart`),
  addToWishlist: (id: string) => console.log(`Wishlisted ${id}`),
  updateQuantity: (id: string, qty: number) => console.log(`Updated ${id} qty to ${qty}`),
  isWishlisted: (id: string) => false
};

export default mockProductListingProps;