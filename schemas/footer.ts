export interface FooterBrand {
  name: string;
  logo?: string;
  description?: string;
}

export interface FooterLinkItem {
  label: string;
  url: string;
}

export interface FooterSection {
  title: string;
  items: FooterLinkItem[];
}

export interface FooterSocialLink {
  name: string;
  url: string;
  icon: any
}

export interface FooterPolicy {
  label: string;
  url: string;
}

export interface FooterPayments {
  enabled?: boolean;
  icons?: string[];
}

export interface FooterProps {
  background_image?: string;

  brand: FooterBrand;

  sections?: FooterSection[];

  socialLinks?: FooterSocialLink[];

  payments?: FooterPayments;

  policies?: FooterPolicy[];

  copyright_text?: string;

  newsletter_title?: string;
  newsletter_placeholder?: string;
  newsletter_button_text?: string;
}