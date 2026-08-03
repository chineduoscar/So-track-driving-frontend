export interface RefereeInfo {
  name?: string | null;
  address?: string | null;
  phoneNumber?: string | null;
}

export interface Student {
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
  zone?: string;
  package?: "standard" | "executive" | "weekend" | "weekendExecutive";
  tier?: "nonExperience" | "partialExperience" | "refresher";
  amount: number;
  reference?: string;
  courseName?: string;
  status: string;
  createdAt: string;
}