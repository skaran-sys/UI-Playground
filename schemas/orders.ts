
interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  placedAt: string;
  items: OrderItem[];
  payment?: {
    amount?: {
      total?: number;
    };
    mode: string;
  };
  link: string;
}

export interface Config {
  layout_id: string;
  title: string;
  sub_title: string;
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export interface OrdersLayoutPropsType {
  orders: Order[];
  pagination: Pagination;
  loading: boolean;
  status: string;
  config: Config;
  orderStatusList: {
    key: string;
    label: string;
  }[];
  onPageChange: (page: number) => void;
  onStatusChange: (status: string) => void;
  onDateChange: (range: {
    from?: string; // 2026-06-01
    to?: string;
  }) => void;
  statusColorMap: Record<string, string>
}

