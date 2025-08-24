import { getUserProfile,
    updateUserProfile,   } from "../api/userApi";

export const fetchUserProfile = async () => {
  try {
    const response = await getUserProfile();
    return response;
  } catch (error: any) {
    console.error('Error fetching user profile:', error?.response?.data || error.message);
    throw error;
  }
};

export const updateUserProfileService = async (data: {
  name?: string;
  email?: string;
  phone?: string;
  address?: object;
}) => {
  try {
    const response = await updateUserProfile(data);
    return response;
  } catch (error: any) {
    console.error('Error updating user profile:', error?.response?.data || error.message);
    throw error;
  }
};