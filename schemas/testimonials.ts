type QuoteItem = {
  image: string;
  title: string;
  subtitle: string;
  text: string;
  rating: number;
};

type Config = {
    title: string
    is_carousel: boolean
    layout_id: string
}

export interface ComponentPropType {
  config: Config
}

export interface LayoutPropType {
  reviews: QuoteItem[]; 
  config: Config;
};