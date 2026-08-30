import { AboutUsProps } from './layout_template';

export const mockAboutUsProps: AboutUsProps = {
  storeInfo: {
    name: "Dot & Key",
    email: "care@dotandkey.com",
    address: "Kolkata, West Bengal",
    city: "Kolkata",
    state: "West Bengal",
    pincode: "700019",
    contact: "+91 8447704734",
    logo: "https://www.dotandkey.com/logo.png",
    business_category: "Skincare & Wellness",
    tagline: "Mindfully Formulated, Potent Skincare Solutions",
    short_description: "Our products are tailored to fit YOUR skin's unique needs, leaving it happy, healthy & glowing every-single-day!",
    existing_customers: 2500000,
    rating: 4.8
  },
  config: {
    banner: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=85&w=1400",
    story_line: [
      {
        title: "MEET ANISHA SARAF",
        description: "After her endless struggles to find a sunscreen that could handle both sun & chlorine water damage, she realized something huge; the skincare world was missing key solutions for real, everyday problems.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
        cta_text: "",
        cta_link: ""
      },
      {
        title: "50+ YEARS OF EXPERTISE!",
        description: "At Dot & Key, all the skincare innovation happens in our in-house R&D lab, where our skincare scientists bring 50+ years of extensive experience. Blending the best of fruits & high-performance actives, our R&D team is all about crafting products that are not only super effective but also feel amazing to use.",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=600",
        cta_text: "",
        cta_link: ""
      },
      {
        title: "FROM CONCEPT TO CREATION",
        description: "Your Feedback + Our Innovation = '1ST IN INDIA' PRODUCTS",
        image: "",
        cta_text: "OUR LAUNCH ROAD MAP ›",
        cta_link: "/pages/launch-roadmap"
      }
    ]
  }
};

export default mockAboutUsProps;