import axiosInstance from './axiosInstance';

export const getAllFranchiseApplications = async () => {
  const response = await axiosInstance.get('/franchise-applications');
  return response.data;
};

export const getFranchiseApplicationById = async (id: string) => {
  const response = await axiosInstance.get(`/franchise-applications/${id}`);
  return response.data;
};

export const updateApplicationStatus = async (
  id: string,
  status: 'Approved' | 'Rejected'
) => {
  const response = await axiosInstance.patch(`/franchise-applications/${id}/status`, { status });
  return response.data;
};

export const createFranchiseFromApplication = async (
  applicationId: string,
  data: { name: string; commissionRate: number }
) => {
  const response = await axiosInstance.post(
    `/franchises/from-application/${applicationId}`,
    data
  );
  return response.data;
};
