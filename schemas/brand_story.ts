export interface ConfigType {
  layout_id: string;
  [key: string]: any;
}

export interface ComponentPropType {
  config: ConfigType
}

export interface LayoutPropType extends ConfigType {
  title?: string;
  description?: string;
  media?: string;
  button_text?: string;
  button_link?: string;
}