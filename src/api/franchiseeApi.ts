// import axiosInstance from './axiosInstance';

// export const submitFranchiseApplication = async (data: {
//   region: string;
//   address: string;
//   additionalDetails?: string;
// }) => {
//   const response = await axiosInstance.post('/franchise-applications', data);
//   return response.data;
// };

// export const getMyFranchiseApplication = async () => {
//   const response = await axiosInstance.get('/franchise-applications/my');
//   return response.data;
//   console.log('Token being sent:', axiosInstance.defaults.headers.common['Authorization']);

// };

import axiosInstance from './axiosInstance';

export const submitFranchiseApplication = async (data: {
  region: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  additionalDetails?: string;
}) => {
  const response = await axiosInstance.post('/franchise-applications', data);
  return response.data;
};

export const getMyFranchiseApplication = async () => {
  const response = await axiosInstance.get('/franchise-applications/my');
  return response.data;
};

