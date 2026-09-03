import { BannerSectionProps } from './layout_template';

export const mockHeroBannerProps: BannerSectionProps = {
  layout_id: "eye_lounge_hero_banner_v1",
  autoSlide: true,
  interval: 5000,
  contentAlignment: "center",
  banner: [
    {
      media: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=85&w=2400",
      title: "TOM FORD EYEWEAR",
      subtitle: "AN OPTICAL BOUTIQUE",
      description: "",
      cta_text: "SHOP NOW",
      cta_link: "/collections/tom-ford",
      cta_style: "outline"
    },
    {
      media: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=85&w=2400",
      title: "CELINE",
      subtitle: "AN OPTICAL BOUTIQUE",
      description: "",
      cta_text: "SHOP NOW",
      cta_link: "/collections/celine",
      cta_style: "outline"
    },
    {
      media: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=85&w=2400",
      title: "LOEWE",
      subtitle: "AN OPTICAL BOUTIQUE",
      description: "",
      cta_text: "SHOP NOW",
      cta_link: "/collections/loewe",
      cta_style: "outline"
    }
  ]
};

export default mockHeroBannerProps;