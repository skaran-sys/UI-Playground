import { HeroLayoutPropsType } from './layout_template';

export const mockHeroProps: HeroLayoutPropsType = {
  config: {
    layout_id: "d2c_luxury_hero_slider_v1",
    autoSlide: true,
    interval: 6000,
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=85&w=2000",
        mobileUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=85&w=800",
        alt: "Gehna Festive Footwear Collection",
        text: {
          title: "GEHNA",
          subtitle: "DARLING, WE JEWELLED FIRST.",
          description: "Handcrafted juttis and embellished mules infused with timeless artisan elegance."
        },
        cta: [
          {
            text: "EXPLORE NOW",
            link: "/collections/gehna",
            style: "secondary",
            position: "center-left",
            target: "_self"
          }
        ]
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=85&w=2000",
        mobileUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=85&w=800",
        alt: "Festive Embroidered Collection",
        text: {
          title: "CELESTIAL",
          subtitle: "STEP INTO LUXURY",
          description: "Curated celebration staples designed for all-day comfort and festive grandeur."
        },
        cta: [
          {
            text: "DISCOVER COLLECTION",
            link: "/collections/celestial",
            style: "outline",
            position: "center-left",
            target: "_self"
          }
        ]
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=85&w=2000",
        mobileUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=85&w=800",
        alt: "Festive Embroidered Collection",
        text: {
          title: "CELESTIAL",
          subtitle: "STEP INTO LUXURY",
          description: "Curated celebration staples designed for all-day comfort and festive grandeur."
        },
        cta: [
          {
            text: "DISCOVER COLLECTION",
            link: "/collections/celestial",
            style: "outline",
            position: "center-left",
            target: "_self"
          }
        ]
      }
    ]
  }
};

export default mockHeroProps;