export interface Category {
  _id: string;
  name: string;
  image: string;
  leafCounts: number;
  description?: string;
  childrenType: string;
  childrenCount: number;
  discountLabel: string;
}

export interface CategoryCardConfig {
  corner: number
  overlay: boolean
  shadow: boolean
  showInfo: boolean
  showTitle: boolean
  buttonText: string;
}

export interface CategoryCardProps {
  category: Category;
  config: CategoryCardConfig;
  priority?: boolean;
  idx: number;
  link: string;
}

/* ---------------------------- PAGINATION TYPE ---------------------------- */

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}


/* ---------------------------- CONFIG TYPE ---------------------------- */

export interface LayoutConfig {
    title: string;
    subtitle?: string;
    card: CategoryCardConfig;
    showFilter: boolean;
}

// -------------------------
// GENERIC FILTER VALUE
// -------------------------

export type FilterValueItem =
  | {
      name: string
      count: number
      [key: string]: any // allow future dynamic fields
    }
  | {
      min: number
      max: number
      label: string
      count: number
      [key: string]: any
    }

// -------------------------
// FILTER (FULLY DYNAMIC KEY)
// -------------------------

export interface Filter {
  key: string
  label: string
  isMulti: boolean
  value: FilterValueItem[]
  [key: string]: any // allows unknown future props
}

// -------------------------
// SORT OPTION
// -------------------------

export interface SortOption {
  key: string
  label: string
}

// -------------------------
// ROOT RESPONSE
// -------------------------

export interface FiltersResponse {
  filters: Filter[]
  sortOptions: SortOption[]
}

/* ---------------------------- LAYOUT PROPS ---------------------------- */

export interface LayoutPropsTypes {
    items: Category[];
    config: LayoutConfig;
    pagination?: Pagination;
    onPageChange: (page: number) => void;
    sortOptions: SortOption;
}