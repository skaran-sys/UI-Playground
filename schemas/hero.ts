export interface BannerItem {
  media: string;
  title: string;
  subtitle: string;
  description: string;
  cta_text: string;
  cta_link: string;
  cta_style: 'primary' | 'secondary' | 'outline';
}

export interface BannerSectionProps {
  layout_id: string;
  autoSlide: boolean;
  interval: number;
  contentAlignment: 'left' | 'center' | 'right';
  banner: BannerItem[];
}
