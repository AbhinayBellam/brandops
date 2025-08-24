// import {
//   submitFranchiseApplication,
//   getMyFranchiseApplication,
// } from '../api/franchiseeApi';

// export const applyForFranchise = async (data: {
//   region: string;
//   address: string;
//   additionalDetails?: string;
// }) => {
//   const application = await submitFranchiseApplication(data);
//   return application;
// };

// export const fetchMyFranchiseApplication = async () => {
//   return await getMyFranchiseApplication();
// };



import {
  submitFranchiseApplication,
  getMyFranchiseApplication,
} from '../api/franchiseeApi';

export const applyForFranchise = async (data: {
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
  return await submitFranchiseApplication(data);
};

export const fetchMyFranchiseApplication = async () => {
  return await getMyFranchiseApplication();
};


