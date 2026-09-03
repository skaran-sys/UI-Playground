import { FooterProps } from './layout_template';

export const mockFooterProps: FooterProps = {
  logoUrl: "",
  storeName: "EYE LOUNGE",
  tagline: "AN OPTICAL BOUTIQUE",
  description:
    "Eye Lounge is dedicated to providing the customers with high-quality eyewear that combines fashion-forward design with functionality. The mission is to enhance every customer's unique style and vision with a wide range of sunglasses and spectacles.",
  config: {
    layout_id: "eye_lounge_footer_v1",
    copyright_text: "Copyright © 2026 Eye Lounge Online all rights reserved."
  },
  linkGroups: [
    {
      title: "Collections",
      links: [
        { label: "Kids Eyeglasses", href: "/collections/kids-eyeglasses" },
        { label: "Unisex Eyeglasses", href: "/collections/unisex-eyeglasses" },
        { label: "Women Eyeglasses", href: "/collections/women-eyeglasses" },
        { label: "Kids Sunglasses", href: "/collections/kids-sunglasses" },
        { label: "Unisex Sunglasses", href: "/collections/unisex-sunglasses" },
        { label: "Women Sunglasses", href: "/collections/women-sunglasses" }
      ]
    },
    {
      title: "Others",
      links: [
        { label: "About us", href: "/pages/about-us" },
        { label: "Contact us", href: "/pages/contact-us" },
        { label: "FAQ", href: "/pages/faq" },
        { label: "Brands", href: "/collections/brands" }
      ]
    }
  ],
  contact: {
    locations: [
      {
        id: "loc_1",
        address: "EYE LOUNGE 106, Green Avenue, Amritsar, Punjab 143001"
      },
      {
        id: "loc_2",
        address: "SCO-15, Sukhmani Square, S City Rd, Canal Road, Barewal Awana, Ludhiana, Punjab 141012"
      }
    ],
    email: "info@eyeloungeonline.com",
    phone: "+91 730 700 6777",
    instagramUrl: "https://instagram.com/eyeloungeonline"
  },
  legalLinks: [
    { label: "Terms of Service", href: "/policies/terms-of-service" },
    { label: "Refund Policy", href: "/policies/refund-policy" },
    { label: "Privacy Policy", href: "/policies/privacy-policy" },
    { label: "Contact Information", href: "/pages/contact-us" },
    { label: "Shipping Policy", href: "/policies/shipping-policy" }
  ]
};

export default mockFooterProps;