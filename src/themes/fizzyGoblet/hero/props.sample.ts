import { BannerSectionProps } from './layout_template';

export const mockHeroProps: BannerSectionProps = {
  layout_id: "d2c_luxury_hero_banner_v1",
  autoSlide: true,
  interval: 5000,
  contentAlignment: "left",
  banner: [
    {
      media: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=85&w=2000",
      title: "GEHNA",
      subtitle: "DARLING, WE JEWELLED FIRST.",
      description: "Handcrafted juttis and embellished mules infused with timeless artisan elegance.",
      cta_text: "EXPLORE NOW",
      cta_link: "/collections/gehna",
      cta_style: "secondary"
    },
    {
      media: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=85&w=2000",
      title: "CELESTIAL",
      subtitle: "STEP INTO LUXURY",
      description: "Curated celebration staples designed for all-day comfort and festive grandeur.",
      cta_text: "DISCOVER COLLECTION",
      cta_link: "/collections/celestial",
      cta_style: "outline"
    },
    {
      media: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&q=85&w=2000",
      title: "ROYAL VELVET",
      subtitle: "HANDCRAFTED HERITAGE",
      description: "Intricate zari embroidery and premium velvet textures for modern festivities.",
      cta_text: "SHOP NEW ARRIVALS",
      cta_link: "/collections/new-arrivals",
      cta_style: "primary"
    }
  ]
};

export default mockHeroProps;