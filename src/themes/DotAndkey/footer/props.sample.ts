import { FooterProps } from './layout_template';

export const mockFooterProps: FooterProps = {
  brand: {
    name: "Dot & Key Wellness Ltd.",
    description: "Redefining skincare with inclusive, dermatologically validated essentials."
  },
  sections: [
    {
      title: "Know Us Better",
      items: [
        { label: "About Us", url: "/about-us" },
        { label: "Affiliate Program", url: "/affiliate" },
        { label: "FAQ", url: "/faq" },
        { label: "Blogs", url: "/blogs" },
        { label: "Sitemap", url: "/sitemap" }
      ]
    },
    {
      title: "Help",
      items: [
        { label: "Contact Us", url: "/contact" },
        { label: "Grievance Officer", url: "/grievance" },
        { label: "Our Policies", url: "/policies" },
        { label: "Terms & Conditions", url: "/terms" },
        { label: "Terms Of Service", url: "/terms-of-service" }
      ]
    },
    {
      title: "Also Available On",
      items: [
        { label: "Nykaa", url: "https://nykaa.com" },
        { label: "Amazon", url: "https://amazon.in" },
        { label: "Flipkart", url: "https://flipkart.com" },
        { label: "Myntra", url: "https://myntra.com" },
        { label: "Purplle", url: "https://purplle.com" }
      ]
    }
  ],
  socialLinks: [
    { name: "Facebook", url: "https://facebook.com", icon: "facebook" },
    { name: "Instagram", url: "https://instagram.com", icon: "instagram" },
    { name: "YouTube", url: "https://youtube.com", icon: "youtube" }
  ],
  newsletter_title: "Sign Up For Updates",
  newsletter_placeholder: "Enter Your Email",
  newsletter_button_text: "Subscribe",
  copyright_text: "© 2026 Dot & Key Wellness Ltd. All Rights Reserved."
};

export default mockFooterProps;