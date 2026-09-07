export interface ApplicationFormData {
  name: string;
  email: string;
  socialHandle: string; // Instagram or TikTok
  isEighteenPlus: boolean;
}

export type ApplicationErrors = Partial<Record<keyof ApplicationFormData, string>>;
