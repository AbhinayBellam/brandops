import axiosInstance from "./axiosInstance";

export const getAllFranchises = async () => {
  const response = await axiosInstance.get("/franchises");
  return response.data;
};

export const getAllRegions = async () => {
  const response = await axiosInstance.get("/franchises/regions/list");
  return response.data;
};

export const getFranchisesByRegion = async (region: string) => {
  const response = await axiosInstance.get(`/franchises/by-region`, {
    params: { region },
  });
  return response.data;
};

export const getFranchiseById = async (id: string) => {
  const response = await axiosInstance.get(`/franchises/${id}`);
  return response.data;
};

export const editFranchise = async (
  id: string,
  data: Partial<{ name: string; region: string; commissionRate: number }>
) => {
  const response = await axiosInstance.put(`/franchises/${id}`, data);
  return response.data;
};


export const deleteFranchise = async (id: string) => {
  const response = await axiosInstance.delete(`/franchises/${id}`);
  return response.data;
};