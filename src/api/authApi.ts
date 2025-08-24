import axiosInstance from './axiosInstance';

export const registerUser = async (userData: {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
}) => {
  console.log('Registering user with data:', userData);
  const response = await axiosInstance.post('/users/register', userData);
  console.log('Register response:', response.data);
  return response.data;
};

export const loginUser = async (userData: {
  email: string;
  password: string;
}) => {
  const response = await axiosInstance.post('/users/login', userData);
  return response.data;
};


// Forgot Password (send OTP)
export const forgotPassword = async (email: string) => {
  const response = await axiosInstance.post('/users/forgot-password', { email });
  return response.data;
};

// Reset Password (verify OTP + set new password)
export const resetPassword = async (data: {
  email: string;
  otp: string;
  newPassword: string;
}) => {
  const response = await axiosInstance.post('/users/reset-password', data);
  return response.data;
};