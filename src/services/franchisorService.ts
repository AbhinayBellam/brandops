import {
  getAllFranchiseApplications,
  getFranchiseApplicationById,
  updateApplicationStatus,
  createFranchiseFromApplication
} from '../api/franchiseApplicationApi';

export const fetchApplications = async () => {
  return await getAllFranchiseApplications();
};

export const fetchApplicationDetails = async (id: string) => {
  return await getFranchiseApplicationById(id);
};

export const approveApplication = async (id: string) => {
  return await updateApplicationStatus(id, 'Approved');
};

export const rejectApplication = async (id: string) => {
  return await updateApplicationStatus(id, 'Rejected');
};

export const createFranchise = async (
  applicationId: string,
  name: string,
  commissionRate: number
) => {
  return await createFranchiseFromApplication(applicationId, { name, commissionRate });
};
