export interface AppPlatformItem {
  id: string;
  name: 'ios' | 'android' | 'app_store' | 'google_play' | string;
  url: string;
  label?: string;
  badge_image?: string;
}

export interface AppBannerDecorations {
  bottom_left_image?: string;
  top_right_image?: string;
}

export interface AppBannerConfig {
  layout_id: string;
  show_decorations?: boolean;
}

export interface AppBannerProps {
  title: string;
  subtitle?: string;
  platforms: AppPlatformItem[];
  decorations?: AppBannerDecorations;
  config?: AppBannerConfig;
}