import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
} from '../api/authApi';

// Register
export const handleRegister = async (userData: {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
}) => {
  try {
    const response = await registerUser(userData);
    return response;
  } catch (error: any) {
    console.error('Error during registration:', error?.response?.data || error.message);
    throw error;
  }
};

// Login
export const handleLogin = async (userData: {
  email: string;
  password: string;
}) => {
  try {
    const response = await loginUser(userData);
    return response;
  } catch (error: any) {
    console.error('Error during login:', error?.response?.data || error.message);
    throw error;
  }
};

// Forgot Password (request OTP)
export const handleForgotPassword = async (email: string) => {
  try {
    const response = await forgotPassword(email);
    return response;
  } catch (error: any) {
    console.error('Error sending forgot password OTP:', error?.response?.data || error.message);
    throw error;
  }
};

// Reset Password
export const handleResetPassword = async (data: {
  email: string;
  otp: string;
  newPassword: string;
}) => {
  try {
    const response = await resetPassword(data);
    return response;
  } catch (error: any) {
    console.error('Error resetting password:', error?.response?.data || error.message);
    throw error;
  }
};
