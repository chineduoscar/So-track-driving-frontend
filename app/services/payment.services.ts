import api from "../lib/axois";

interface InitializePaymentPayload {
  fullName: string;
  email: string;
  phoneNumber: string;
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