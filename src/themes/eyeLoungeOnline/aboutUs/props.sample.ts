import { AboutUsProps } from './layout_template';

export const mockAboutUsPageProps: AboutUsProps = {
  config: {
    banner: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=85&w=1200",
    story_line: [
      {
        image: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&q=85&w=1200",
        title: "Craft",
        description: "We work with expert craftspeople across India who meticulously embroider and embellish every piece by hand.",
        cta_text: "Discover Craftsmanship",
        cta_link: "/collections/craft"
      },
      {
        image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=85&w=1200",
        title: "Comfort",
        description: "Double-padded soles, breathable silhouettes, and handcrafted arch support designed to take you from day to evening seamlessly.",
        cta_text: "Explore Comfort",
        cta_link: "/collections/comfort"
      }
    ]
  },
  storeInfo: {
    name: "Fizzy Goblet",
    email: "customercare@fizzygoblet.com",
    address: "Flagship Studio, Palladium Mall",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400013",
    contact: "+91 98765 43210",
    logo: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=200",
    business_category: "Designer Footwear & Accessories",
    tagline: "Everyday adventures made extraordinary.",
    short_description: "Fresh, fun, free-spirited—we are a designer footwear and accessories brand from India.",
    existing_customers: 250000,
    rating: 4.9
  }
};

export default mockAboutUsPageProps;