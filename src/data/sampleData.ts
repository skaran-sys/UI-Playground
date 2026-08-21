// ============================================================================
// SAMPLE DATA FILE (.ts)
// Paste your sample data and TypeScript types in this file!
// ============================================================================

export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface HeaderData {
  logoText: string;
  logoBadge?: string;
  navItems: NavItem[];
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
}

export interface HeroData {
  badge: {
    text: string;
    pill: string;
  };
  title: string;
  highlightedTitle: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  metrics: Array<{
    label: string;
    value: string;
  }>;
  imageUrl?: string;
}

export interface FeatureItem {
  id: string;
  iconName: string;
  title: string;
  description: string;
  tag?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  rating: number;
  content: string;
  verified?: boolean;
}

export interface FooterSection {
  title: string;
  links: Array<{ label: string; href: string }>;
}

export interface FooterData {
  companyName: string;
  description: string;
  copyrightText: string;
  sections: FooterSection[];
  socialLinks: Array<{ platform: string; href: string; iconName: string }>;
}

export interface SampleData {
  header: HeaderData;
  hero: HeroData;
  features: FeatureItem[];
  testimonials: Testimonial[];
  footer: FooterData;
}

// ----------------------------------------------------------------------------
// DEFAULT SAMPLE DATA INSTANCE
// Replace or edit the object below with your own sample dataset
// ----------------------------------------------------------------------------
export const sampleData: SampleData = {
  header: {
    logoText: "ApexUI",
    logoBadge: "PRO",
    navItems: [
      { label: "Features", href: "#features" },
      { label: "Solutions", href: "#solutions" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "Pricing", href: "#pricing" },
      { label: "Docs", href: "#docs" },
    ],
    primaryCta: {
      label: "Get Started Free",
      href: "#get-started",
    },
    secondaryCta: {
      label: "Sign In",
      href: "#signin",
    },
  },
  hero: {
    badge: {
      pill: "v2.5 Released",
      text: "Explore next-gen UI components",
    },
    title: "Build Stunning Interfaces",
    highlightedTitle: "10x Faster Today",
    description:
      "A complete design system and component playground built for modern web developers. Crafted with precision, accessibility, and high performance in mind.",
    primaryCta: {
      label: "Start Building Now",
      href: "#hero-primary",
    },
    secondaryCta: {
      label: "View Documentation",
      href: "#hero-secondary",
    },
    metrics: [
      { value: "99.9%", label: "Uptime SLA" },
      { value: "50k+", label: "Active Developers" },
      { value: "<10ms", label: "Render Time" },
    ],
  },
  features: [
    {
      id: "f1",
      iconName: "Zap",
      title: "Ultra Fast Performance",
      description:
        "Optimized bundle size with zero unnecessary runtime dependencies. Renders instantly at 60fps.",
      tag: "Speed",
    },
    {
      id: "f2",
      iconName: "Shield",
      title: "Enterprise Grade Security",
      description:
        "Strict TypeScript types, sanitization routines, and compliance standards built into every component.",
      tag: "Security",
    },
    {
      id: "f3",
      iconName: "Sparkles",
      title: "Modern Aesthetics",
      description:
        "Beautiful dark modes, glassmorphism overlays, custom gradients, and fluid micro-interactions.",
      tag: "Design",
    },
    {
      id: "f4",
      iconName: "Layers",
      title: "Fully Modular",
      description:
        "Copy-paste individual components or plug in sample data objects effortlessly with minimal boilerplate.",
      tag: "Modular",
    },
  ],
  testimonials: [
    {
      id: "t1",
      name: "Sophia Martinez",
      role: "Lead Frontend Architect",
      company: "Vortex Labs",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      rating: 5,
      content:
        "This playground layout made prototyping our landing pages ridiculously fast. Dropping in custom TS data and UI code worked seamlessly on the first try!",
      verified: true,
    },
    {
      id: "t2",
      name: "Marcus Chen",
      role: "VP of Product",
      company: "Nexus Technologies",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      rating: 5,
      content:
        "The design aesthetics, animations, and dark mode support are top tier. Our design system team uses this file structure every day now.",
      verified: true,
    },
    {
      id: "t3",
      name: "Elena Rostova",
      role: "Senior UI Designer",
      company: "Aetheria Studios",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      rating: 5,
      content:
        "Clean, responsive, and easy to tweak. The component tab selector makes testing individual blocks like Hero or Testimonials super easy.",
      verified: true,
    },
  ],
  footer: {
    companyName: "ApexUI Technologies Inc.",
    description:
      "Crafting modern design systems and UI component playgrounds for developers across the globe.",
    copyrightText: "© 2026 ApexUI. All rights reserved.",
    sections: [
      {
        title: "Product",
        links: [
          { label: "Components", href: "#" },
          { label: "Templates", href: "#" },
          { label: "Playground", href: "#" },
          { label: "Changelog", href: "#" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Documentation", href: "#" },
          { label: "Community", href: "#" },
          { label: "GitHub Repository", href: "#" },
          { label: "Support", href: "#" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About Us", href: "#" },
          { label: "Careers", href: "#" },
          { label: "Privacy Policy", href: "#" },
          { label: "Terms of Service", href: "#" },
        ],
      },
    ],
    socialLinks: [
      { platform: "Twitter", href: "#", iconName: "Twitter" },
      { platform: "GitHub", href: "#", iconName: "Github" },
      { platform: "LinkedIn", href: "#", iconName: "Linkedin" },
    ],
  },
};

export default sampleData;
