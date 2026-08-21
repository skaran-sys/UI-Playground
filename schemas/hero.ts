export interface HeroLayoutPropsType {
    config: any;
}

export interface HeroBannerConfig {
  layout_id: string

  media: HeroMedia[]

  autoSlide?: boolean
  interval?: number

  text?: {
    title?: string
    subtitle?: string
    description?: string
  }

  cta?: HeroCTA[]
}

export interface HeroMedia {
  type: "image" | "video"
  url: string

  mobileUrl?: string
  alt?: string
  poster?: string // for videos

  text?: {
    title?: string
    subtitle?: string
    description?: string
  }

  cta?: HeroCTA[]
}

export interface HeroCTA {
  text: string
  link: string

  style?: "primary" | "secondary" | "outline" | "clear"

  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "center-left"
    | "center"
    | "center-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right"

  target?: "_self" | "_blank"
}