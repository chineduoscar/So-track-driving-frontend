import api from "../lib/axois";

export const getAllZones = async () => {
  const res = await api.get("/zone");
  return res.data.data;
};

export const getSingleZone = async (id: number) => {
  const res = await api.get(`/zone/${id}`);
  return res.data.data;
};