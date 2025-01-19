export interface Transaction {
  id: string;
  name: string;
  initial: string;
  date: string;
  time: string;
  brands: number;
  totalRewards: number;
  totalRedemption: number;
  balance: number;
}

export type SortField = 'name' | 'date' | 'brands' | 'totalRewards' | 'totalRedemption' | 'balance';
export type SortOrder = 'asc' | 'desc';