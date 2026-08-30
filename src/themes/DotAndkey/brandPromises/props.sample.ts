import { BrandPromiseProps } from './layout_template';

export const mockBrandPromiseProps: BrandPromiseProps = {
  isLoading: false,
  config: {
    layout_id: "dot_and_key_brand_promises_v1",
    show_header: false
  },
  items: [
    {
      id: "promise_1",
      title: "Cruelty Free",
      icon: "cruelty_free"
    },
    {
      id: "promise_2",
      title: "Clinically Tested",
      icon: "clinically_tested"
    },
    {
      id: "promise_3",
      title: "Plant Bio-Activities",
      icon: "plant_bio_actives"
    }
  ]
};

export default mockBrandPromiseProps;