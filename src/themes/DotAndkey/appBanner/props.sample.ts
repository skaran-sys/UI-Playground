import { AppBannerProps } from './layout_template';

export const mockAppBannerProps: AppBannerProps = {
  title: "Get Our App",
  subtitle: "Shop faster and get exclusive deals.",
  platforms: [
    {
      id: "apple_app_store",
      name: "app_store",
      label: "Download on the App Store",
      url: "https://apps.apple.com"
    },
    {
      id: "google_play_store",
      name: "google_play",
      label: "GET IT ON Google Play",
      url: "https://play.google.com"
    }
  ],
  decorations: {
    // Bottom-left iOS App / Mobile interface cutout
    bottom_left_image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=85&w=500",
    // Top-right Android App / Mobile interface cutout
    top_right_image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=85&w=500"
  },
  config: {
    layout_id: "dot_and_key_app_banner_v1",
    show_decorations: true
  }
};

export default mockAppBannerProps;