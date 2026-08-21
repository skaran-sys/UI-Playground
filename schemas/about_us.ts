export type AboutUsProps = {
  config: {
    banner: string;
    story_line: {
      image: string;
      title: string;
      description: string;
      cta_text: string;
      cta_link: string;
    }[];
  };

  storeInfo: {
    name: string;
    email: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    contact: string;
    logo: string;
    business_category: string;
    tagline: string;
    short_description: string;
    existing_customers: number;
    rating: number;
  };
};