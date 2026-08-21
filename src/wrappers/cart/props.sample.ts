import { CartProps } from './layout_template';

export const sampleCartProps: CartProps = {
  items: [
    { id: "1", name: "Wireless Headphones", price: 99, quantity: 1 },
    { id: "2", name: "Smart Watch v2", price: 199, quantity: 1 },
  ],
  total: 298,
};

export default sampleCartProps;
