import { BrandPromiseProps } from './layout_template';

export const mockBrandPromisesProps: BrandPromiseProps = {
  isLoading: false,
  config: {
    layout_id: "eye_lounge_brand_promises_v1",
    title: "Our Guarantees",
    show_header: false
  },
  items: [
    {
      id: "bp_1",
      title: "SHIPPING",
      subtitle: "Free shipping Across India",
      icon: "shipping",
      link: "/pages/shipping-policy"
    },
    {
      id: "bp_2",
      title: "AUTHENTICITY",
      subtitle: "100% Authentic",
      icon: "authenticity",
      link: "/pages/authenticity-guarantee"
    },
    {
      id: "bp_3",
      title: "DEDICATED SERVICE",
      subtitle: "Free in-house repairs & adjustments",
      icon: "service",
      link: "/pages/services"
    }
  ]
};

export default mockBrandPromisesProps;