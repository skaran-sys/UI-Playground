// import { HeaderProps } from './layout_template';

// export const mockFooterProps: HeaderProps = {
//   storeName: "Fizzy Goblet",
//   logoUrl: "",
//   wishlistCount: 0,
//   cartCount: 2,
//   isAuthenticated: true,
//   user: {
//     name: "Aadya Sharma",
//     email: "aadya@example.com"
//   },
//   logout: () => {
//     console.log("Logged out");
//   },
//   config: {
//     layout_id: "d2c_luxury_footer_v1",
//     showSearch: true,
//     showWishlist: true,
//     showCart: true,
//     showAuth: true,
//     fixed: false,
//     menu: [
//       {
//         label: "Information",
//         href: "/information",
//         subMenu: [
//           { label: "Size Chart", href: "/size-chart" },
//           { label: "Shipping & Delivery", href: "/shipping-delivery" },
//           { label: "Exchanges & Returns", href: "/exchanges-returns" },
//           { label: "FAQs", href: "/faqs" },
//           { label: "Contact Us", href: "/contact-us" },
//           { label: "Stores", href: "/stores" },
//           { label: "Blogs", href: "/blogs" },
//           { label: "Privacy Policy", href: "/privacy-policy" },
//           { label: "Terms of Service", href: "/terms-of-service" },
//           { label: "Opportunity Policy", href: "/opportunity-policy" },
//           { label: "Sitemap", href: "/sitemap" }
//         ]
//       }
//     ]
//   },
//   topMenuItems: [
//     { label: "Criss-cross Slides", href: "/collections/criss-cross-slides" },
//     { label: "Lounge Slippers", href: "/collections/lounge-slippers" },
//     { label: "Loafer Juttis", href: "/collections/loafer-juttis" },
//     { label: "Fizzy Kolhas", href: "/collections/fizzy-kolhas" },
//     { label: "Sneaker Juttis", href: "/collections/sneaker-juttis" },
//     { label: "Fizzy Mules", href: "/collections/fizzy-mules" },
//     { label: "Fizzy Sandals", href: "/collections/fizzy-sandals" },
//     { label: "Open Flats", href: "/collections/open-flats" },
//     { label: "Festive Edit", href: "/collections/festive-edit" },
//     { label: "Bridal Footwear Collection", href: "/collections/bridal-collection" },
//     { label: "Tote Bags", href: "/collections/tote-bags" },
//     { label: "Potlis", href: "/collections/potlis" },
//     { label: "Sling Bags", href: "/collections/sling-bags" },
//     { label: "Boo'tah Bags", href: "/collections/bootah-bags" },
//     { label: "The Classics", href: "/collections/the-classics" }
//   ]
// };

// export default mockFooterProps;


import { HeaderProps } from './layout_template';

export const mockFooterProps: HeaderProps = {
  storeName: "Fizzy Goblet",
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
    layout_id: "d2c_luxury_footer_v1",
    showSearch: true,
    showWishlist: true,
    showCart: true,
    showAuth: true,
    fixed: false,
    menu: [
      {
        label: "",
        href: "/information",
        subMenu: [
          { label: "Size Chart", href: "/size-chart" },
          { label: "Shipping & Delivery", href: "/shipping-delivery" },
          { label: "Exchanges & Returns", href: "/exchanges-returns" },
          { label: "FAQs", href: "/faqs" },
          { label: "Contact Us", href: "/contact-us" },
          { label: "Stores", href: "/stores" },
          { label: "Blogs", href: "/blogs" },
          { label: "Privacy Policy", href: "/privacy-policy" },
          { label: "Terms of Service", href: "/terms-of-service" },
          { label: "Opportunity Policy", href: "/opportunity-policy" },
          { label: "Sitemap", href: "/sitemap" }
        ]
      }
    ]
  },
  topMenuItems: [
    { label: "Criss-cross Slides", href: "/collections/criss-cross-slides" },
    { label: "Lounge Slippers", href: "/collections/lounge-slippers" },
    { label: "Loafer Juttis", href: "/collections/loafer-juttis" },
    { label: "Fizzy Kolhas", href: "/collections/fizzy-kolhas" },
    { label: "Sneaker Juttis", href: "/collections/sneaker-juttis" },
    { label: "Fizzy Mules", href: "/collections/fizzy-mules" },
    { label: "Fizzy Sandals", href: "/collections/fizzy-sandals" },
    { label: "Open Flats", href: "/collections/open-flats" },
    { label: "Festive Edit", href: "/collections/festive-edit" },
    { label: "Bridal Footwear Collection", href: "/collections/bridal-collection" },
    { label: "Tote Bags", href: "/collections/tote-bags" },
    { label: "Potlis", href: "/collections/potlis" },
    { label: "Sling Bags", href: "/collections/sling-bags" },
    { label: "Boo'tah Bags", href: "/collections/bootah-bags" },
    { label: "Kareena Kapoor Khan x Fizzy Goblet", href: "/collections/kareena-kapoor" },
    { label: "The Classics", href: "/collections/the-classics" }
  ]
};

export default mockFooterProps;