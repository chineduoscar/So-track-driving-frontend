import api from "../lib/axois";

interface RefereeInfo {
  name: string;
  address: string;
  phoneNumber: string;
}

interface InitializePaymentPayload {
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
  qualification: string;
  previousExperience: string;
  languageSpoken: string;
  agreeToRules: boolean;
  referee: RefereeInfo;
  zoneId: number;
  package: "standard" | "executive" | "weekend" | "weekendExecutive";
  tier: "nonExperience" | "partialExperience" | "refresher";
}

export const initializePayment = async (payload: InitializePaymentPayload) => {
  const res = await api.post("/payment/initialize", payload);
  return res.data;
};

export const verifyPayment = async (reference: string) => {
  const res = await api.get(`/payment/verify/${reference}`);
  return res.data;
};