export interface Wallet {
  availableBalance: number;
  reservedAmount: number;
  lockedBalance: number;
}

export interface Preferences {
  notificationEnable: boolean;
}

export interface User {
  id: string;
  storeId: string;

  fullName: string;
  name: string;
  email: string;
  mobile: string;

  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  acceptsMarketing: boolean;

  wallet: Wallet;
  prefrences: Preferences; // (keeping your backend spelling as-is)
}

export interface Address {
  _id: string;

  label: string;
  name: string;
  contact: string;

  addressLine: string;
  landmark?: string;

  city: string;
  state: string;
  country: string;
  postalCode: string;

  type: "shipping" | "billing" | string;
  isDefault: boolean;
}

export interface AddressPayload {
  label: string;
  name: string;
  contact: string;

  addressLine: string;
  landmark?: string;

  city: string;
  state: string;
  country: string;
  postalCode: string;

  type: "shipping" | "billing" | string;
  isDefault: boolean;
}

type ProfilePayload = {
    
    fullName: string,
    mobile: string;
    gender: string;
    dob: Date;
    
}

export interface AccountConfig {
  layout_id: string;

  profile_title: string;
  profile_edit_label: string;
  profile_full_name_label: string;
  profile_email_label: string;
  profile_phone_label: string;
  profile_email_note: string;
  profile_empty_phone_label: string;
  profile_save_cta: string;
  profile_cancel_cta: string;
  profile_update_success_message: string;

}
export interface AccountLayoutProps {
    user: User;
    isAuthenticated: boolean;
    loading: boolean;
    logout: () => void;
    config: AccountConfig;
    addresses: Address[];
    fetchAddresses: () => Promise<void>;
    addAddress: (payload: AddressPayload) => Promise<void>;
    updateAddress: (id: string, payload: AddressPayload) => Promise<void>;
    removeAddress: (id: string) => Promise<void>;
    updateProfile: (payload: ProfilePayload) => Promise<void>;
}
