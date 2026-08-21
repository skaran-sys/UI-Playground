interface LoginConfig {
  hero_badge?: string;
  hero_title?: string;
  hero_description?: string;
  form_title?: string;
  form_subtitle?: string;
  footer_text?: string;
  hero_baner?: string;
  login_button_text?: string
}

export interface layoutProps {
  step: "username" | "otp";

  username: string;
  setUsername: (value: string) => void;

  otp: string;
  setOtp: (value: string) => void;

  loading: boolean;
  timer: number;
  otpLength: number;

  onSendOtp: () => void;
  onVerifyOtp: () => void;
  onResendOtp: () => void;

  error?: string;

  config?: LoginConfig;

  brand: string;
}
