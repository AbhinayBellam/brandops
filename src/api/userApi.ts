import axiosInstance from "./axiosInstance";

export const getUserProfile = async () => {
  const response = await axiosInstance.get("/users/me");
  return response.data;
};

export const updateUserProfile = async (data: {
  name?: string;
  email?: string;
  phone?: string;
  address?: object;
}) => {
  const response = await axiosInstance.put("/users/me", data);
  return response.data;
};