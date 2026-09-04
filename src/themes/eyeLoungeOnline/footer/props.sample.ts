import { FooterProps } from './layout_template';

export const mockFooterProps: FooterProps = {
  brand: {
    name: "EYE LOUNGE",
    logo: "", // Leaving empty to display the luxury vector monogram fallback
    description:
      "Eye Lounge is dedicated to providing the customers with high-quality eyewear that combines fashion-forward design with functionality. The mission is to enhance every customer's unique style and vision with a wide range of sunglasses and spectacles."
  },
  sections: [
    {
      title: "Collections",
      items: [
        { label: "Kids Eyeglasses", url: "/collections/kids-eyeglasses" },
        { label: "Unisex Eyeglasses", url: "/collections/unisex-eyeglasses" },
        { label: "Women Eyeglasses", url: "/collections/women-eyeglasses" },
        { label: "Kids Sunglasses", url: "/collections/kids-sunglasses" },
        { label: "Unisex Sunglasses", url: "/collections/unisex-sunglasses" },
        { label: "Women Sunglasses", url: "/collections/women-sunglasses" }
      ]
    },
    {
      title: "Others",
      items: [
        { label: "About us", url: "/pages/about-us" },
        { label: "Contact us", url: "/pages/contact-us" },
        { label: "FAQ", url: "/pages/faq" },
        { label: "Brands", url: "/collections/brands" }
      ]
    },
    {
      title: "Contact Details",
      items: [
        {
          label: "EYE LOUNGE 106, Green Avenue, Amritsar, Punjab 143001",
          url: "https://maps.google.com/?q=EYE+LOUNGE+106+Green+Avenue+Amritsar"
        },
        {
          label: "SCO-15, Sukhmani Square, S City Rd, Canal Road, Barewal Awana, Ludhiana, Punjab 141012",
          url: "https://maps.google.com/?q=SCO-15+Sukhmani+Square+Ludhiana"
        },
        {
          label: "info@eyeloungeonline.com",
          url: "mailto:info@eyeloungeonline.com"
        },
        {
          label: "+91 730 700 6777",
          url: "tel:+917307006777"
        }
      ]
    }
  ],
  socialLinks: [
    {
      name: "Instagram",
      url: "https://instagram.com/eyeloungeonline",
      icon: "instagram"
    }
  ],
  policies: [
    { label: "Terms of Service", url: "/policies/terms-of-service" },
    { label: "Refund Policy", url: "/policies/refund-policy" },
    { label: "Privacy Policy", url: "/policies/privacy-policy" },
    { label: "Contact Information", url: "/pages/contact-us" },
    { label: "Shipping Policy", url: "/policies/shipping-policy" }
  ],
  copyright_text: "Copyright © 2026 Eye Lounge Online all rights reserved."
};

export default mockFooterProps;