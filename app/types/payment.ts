export interface RefereeInfo {
  name?: string | null;
  address?: string | null;
  phoneNumber?: string | null;
}

export interface Payment {
  _id: string;
  fullName: string;
  surname: string;
  otherName: string;
  email: string;
  phoneNumber: string;
  contactAddress: string;
  dateOfBirth: string;
  stateOfOrigin: string;
  maritalStatus: string;
  homeTown: string;
  qualification?: string | null;
  previousExperience?: string | null;
  languageSpoken: string;
  agreeToRules: boolean;
  referee?: RefereeInfo | null;
  zone: string;
  package: "standard" | "executive" | "weekend" | "weekendExecutive";
  tier: "nonExperience" | "partialExperience" | "refresher";
  amount: number;
  reference: string;
  paymentMethod?: string;
  currency?: string;
  status: string;
  paidAt?: string;
  createdAt: string;
}