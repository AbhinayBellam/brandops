import { getAllFranchises,
         getFranchiseById,
         editFranchise,
         deleteFranchise,
        getAllRegions,
      getFranchisesByRegion } from "../api/franchiseApi";

import axiosInstance from '../api/axiosInstance'; 



export const fetchMyFranchise = async () => {
  try {
    const response = await axiosInstance.get('/franchises/my');
    return response.data;
  } catch (error: any) {
    console.error('Error fetching my franchise:', error?.response?.data || error.message);
    throw error;
  }
};

export const fetchFranchises = async () => {
  return await getAllFranchises();
};

export const fetchRegions = async () => {
  return await getAllRegions();
};  

export const fetchFranchisesByRegion = async (region: string) => {
  return await getFranchisesByRegion(region);
};

export const fetchFranchiseById = async (id: string) => {
  return await getFranchiseById(id);
};

export const updateFranchise = async (
  id: string,
  updates: Partial<{ name: string; region: string; commissionRate: number }>
) => {
  return await editFranchise(id, updates);
};


export const removeFranchise = async (id: string) => {
  return await deleteFranchise(id);
};