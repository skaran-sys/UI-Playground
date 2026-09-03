import { HeaderProps } from './layout_template';

export const mockHeaderProps: HeaderProps = {
  storeName: "EYE LOUNGE",
  logoUrl: "",
  wishlistCount: 0,
  cartCount: 0,
  isAuthenticated: false,
  user: null,
  wishlistHref: "/wishlist",
  cartHref: "/cart",
  accountHref: "/account",
  config: {
    layout_id: "eye_lounge_header_v2",
    showSearch: true,
    showWishlist: true,
    showCart: true,
    showAuth: true,
    fixed: true,
    announcement: []
  },
  menu: [
    {
      label: "EYEGLASSES",
      href: "/collections/eyeglasses",
      type: "product_grid",
      featuredProducts: [
        {
          _id: "eg_1",
          brand: "Ferragamo",
          model: "SF1056S 838",
          price: "18,500",
          image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=400",
          hoverImage: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=400",
          href: "/products/ferragamo-sf1056s"
        },
        {
          _id: "eg_2",
          brand: "RAYBAN",
          model: "RB 3740I 9202A5",
          price: "8,290",
          image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=400",
          hoverImage: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=400",
          href: "/products/rayban-rb3740i"
        },
        {
          _id: "eg_3",
          brand: "Ferragamo",
          model: "SF307S 011",
          price: "29,200",
          image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=400",
          hoverImage: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=400",
          href: "/products/ferragamo-sf307s"
        },
        {
          _id: "eg_4",
          brand: "RAYBAN",
          model: "RB 3548-N 003/02",
          price: "13,290",
          image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=400",
          hoverImage: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=400",
          href: "/products/rayban-rb3548n"
        },
        {
          _id: "eg_5",
          brand: "Ferragamo",
          model: "SF249SA 733",
          price: "21,400",
          image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=400",
          hoverImage: "https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&q=80&w=400",
          href: "/products/ferragamo-sf249sa"
        },
        {
          _id: "eg_6",
          brand: "MOSCHINO",
          model: "MOS161/S 80790",
          price: "17,800",
          image: "https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&q=80&w=400",
          hoverImage: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=400",
          href: "/products/moschino-mos161s"
        },
        {
          _id: "eg_7",
          brand: "Ferragamo",
          model: "SF1057S 232",
          price: "24,500",
          image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&q=80&w=400",
          hoverImage: "https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?auto=format&fit=crop&q=80&w=400",
          href: "/products/ferragamo-sf1057s"
        },
        {
          _id: "eg_8",
          brand: "MOSCHINO",
          model: "MOS155/S 12JJF",
          price: "19,900",
          image: "https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?auto=format&fit=crop&q=80&w=400",
          hoverImage: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&q=80&w=400",
          href: "/products/moschino-mos155s"
        }
      ]
    },
    {
      label: "SUNGLASSES",
      href: "/collections/sunglasses",
      type: "product_grid",
      featuredProducts: [
        {
          _id: "sg_1",
          brand: "Ferragamo",
          model: "SF1056S 838",
          price: "18,500",
          image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=400",
          hoverImage: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=400",
          href: "/products/ferragamo-sf1056s"
        },
        {
          _id: "sg_2",
          brand: "RAYBAN",
          model: "RB 3740I 9202A5",
          price: "8,290",
          image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=400",
          hoverImage: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=400",
          href: "/products/rayban-rb3740i"
        },
        {
          _id: "sg_3",
          brand: "Ferragamo",
          model: "SF307S 011",
          price: "29,200",
          image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=400",
          hoverImage: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=400",
          href: "/products/ferragamo-sf307s"
        },
        {
          _id: "sg_4",
          brand: "RAYBAN",
          model: "RB 3548-N 003/02",
          price: "13,290",
          image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=400",
          hoverImage: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=400",
          href: "/products/rayban-rb3548n"
        },
        {
          _id: "sg_5",
          brand: "Ferragamo",
          model: "SF249SA 733",
          price: "21,400",
          image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=400",
          hoverImage: "https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&q=80&w=400",
          href: "/products/ferragamo-sf249sa"
        },
        {
          _id: "sg_6",
          brand: "MOSCHINO",
          model: "MOS161/S 80790",
          price: "17,800",
          image: "https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&q=80&w=400",
          hoverImage: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=400",
          href: "/products/moschino-mos161s"
        },
        {
          _id: "sg_7",
          brand: "Ferragamo",
          model: "SF1057S 232",
          price: "24,500",
          image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&q=80&w=400",
          hoverImage: "https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?auto=format&fit=crop&q=80&w=400",
          href: "/products/ferragamo-sf1057s"
        },
        {
          _id: "sg_8",
          brand: "MOSCHINO",
          model: "MOS155/S 12JJF",
          price: "19,900",
          image: "https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?auto=format&fit=crop&q=80&w=400",
          hoverImage: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&q=80&w=400",
          href: "/products/moschino-mos155s"
        }
      ]
    },
    {
      label: "SHOP BY BRAND",
      href: "/collections/brands",
      type: "brand_columns",
      brandColumns: [
        {
          title: "A to D",
          brands: [
            { label: "AKILA", href: "/brands/akila" },
            { label: "ARMANI", href: "/brands/armani" },
            { label: "BOLON", href: "/brands/bolon" },
            { label: "BURBERRY", href: "/brands/burberry" },
            { label: "BVLGARI", href: "/brands/bvlgari" },
            { label: "CALVIN KLEIN", href: "/brands/calvin-klein" },
            { label: "CARRERA", href: "/brands/carrera" },
            { label: "CELINE", href: "/brands/celine" },
            { label: "CHRISTIAN DIOR", href: "/brands/christian-dior" },
            { label: "COACH", href: "/brands/coach" }
          ]
        },
        {
          title: "E to J",
          brands: [
            { label: "ESPIRIT", href: "/brands/espirit" },
            { label: "FACE A FACE", href: "/brands/face-a-face" },
            { label: "FENDI", href: "/brands/fendi" },
            { label: "FERRAGAMO", href: "/brands/ferragamo" },
            { label: "FOSSIL", href: "/brands/fossil" },
            { label: "GIVENCHY", href: "/brands/givenchy" },
            { label: "GUCCI", href: "/brands/gucci" },
            { label: "GUESS", href: "/brands/guess" },
            { label: "HUBLOT", href: "/brands/hublot" },
            { label: "IDEE", href: "/brands/idee" }
          ]
        },
        {
          title: "K to P",
          brands: [
            { label: "KUBORAUM", href: "/brands/kuboraum" },
            { label: "LOEWE", href: "/brands/loewe" },
            { label: "MARC JACOBS", href: "/brands/marc-jacobs" },
            { label: "MAX MARA AND MAX & CO.", href: "/brands/max-mara" },
            { label: "MICHAEL KORS", href: "/brands/michael-kors" },
            { label: "MONTBLANC", href: "/brands/montblanc" },
            { label: "MOSCHINO", href: "/brands/moschino" },
            { label: "OAKLEY", href: "/brands/oakley" },
            { label: "OFF-WHITE", href: "/brands/off-white" },
            { label: "OPIUM", href: "/brands/opium" }
          ]
        },
        {
          title: "Q to Z",
          brands: [
            { label: "RAG & BONE", href: "/brands/rag-and-bone" },
            { label: "RALPH CARLO", href: "/brands/ralph-carlo" },
            { label: "RAYBAN", href: "/brands/rayban" },
            { label: "SAINT LAURENT", href: "/brands/saint-laurent" },
            { label: "STELLA MC CARTNEY", href: "/brands/stella-mccartney" },
            { label: "SWAROVSKI", href: "/brands/swarovski" },
            { label: "TED SMITH LONDON", href: "/brands/ted-smith-london" },
            { label: "TIFFANY&CO", href: "/brands/tiffany-and-co" },
            { label: "TOM FORD", href: "/brands/tom-ford" },
            { label: "TOMMY HILFIGER", href: "/brands/tommy-hilfiger" }
          ]
        }
      ]
    },
    { label: "ABOUT US", href: "/pages/about-us", type: "default" },
    { label: "CONTACT US", href: "/pages/contact-us", type: "default" }
  ],
  popularSearch: ["eye", "celine", "prada", "sunglasses"],
  searchResults: {
    categories: [],
    products: {
      items: [
        {
          _id: "prod_1",
          title: "VPR 20Z 16K-101",
          brand: "PRADA",
          pricing: { sale: 28590 },
          media: {
            coverImage: {
              sq1_1: {
                url: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=250"
              }
            }
          }
        },
        {
          _id: "prod_2",
          title: "VPR 09Y 21B-101",
          brand: "PRADA",
          pricing: { sale: 26890 },
          media: {
            coverImage: {
              sq1_1: {
                url: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=250"
              }
            }
          }
        }
      ]
    }
  },
  onSearch: (query: string) => console.log("Searching for:", query),
  onDeleteRecommendation: (id: string) => console.log("Deleted recommendation:", id),
  loadRecommendations: () => console.log("Loaded recommendations"),
  onCartToggle: () => console.log("Toggled cart drawer"),
  logout: () => console.log("Logged out")
};

export default mockHeaderProps;