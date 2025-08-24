export interface Franchisee {
  name: string;
  email: string;
  phone: string;
}

export interface Franchise {
  _id: string;
  name: string;
  address: string;
  region: string;
  commissionRate: number;
  franchiseeId: Franchisee;
}
