export interface SaleCountdownProps {
  destination: {
    pageId: string;
    pageType: string;
  };
  exp: string;
  onclick: boolean;
  title: string;
  subtitle: string;
  isActive: boolean;
  onNavigate?: (
    destination: SaleCountdownProps['destination']
  ) => void;
}