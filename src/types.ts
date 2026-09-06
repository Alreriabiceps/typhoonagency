export interface ApplicationFormData {
  name: string;
  isEighteenPlus: boolean;
  socialHandle: string; // Instagram or TikTok username
  email: string;
  interestReason: string;
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  metric?: string;
}

export type ModalType = 'apply' | 'privacy' | 'terms' | null;
