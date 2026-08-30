export interface ConfigType {
  layout_id: string;
  [key: string]: any;
}

export interface BrandPromiseItem {
  id: string;
  title: string;
  subtitle?: string;
  icon?: 'cruelty_free' | 'clinically_tested' | 'plant_bio_actives' | string;
  image?: string;
  link?: string;
}

export interface BrandPromiseConfig extends ConfigType {
  title?: string;
  show_header?: boolean;
}

export interface BrandPromiseProps {
  config: BrandPromiseConfig;
  items: BrandPromiseItem[];
  isLoading?: boolean;
}