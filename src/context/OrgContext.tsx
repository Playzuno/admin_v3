import React, { createContext, useContext, useEffect, useState } from 'react';
import { Branch, OrgContextType } from '../types';
import { branchApi } from '@/api';
const OrgContext = createContext<OrgContextType | null>(null);

export const OrgProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  //   const { user } = useAuth();
  const orgId = localStorage.getItem('orgId');
  const [branch, setBranch] = useState<Branch | null>(null);
  const [branches, setBranches] = useState<Branch[]>([]);

  const refreshBranches = async () => {
    if (!orgId) return;
    const response = await branchApi.getAll(orgId);
    console.log(response.data);
    setBranches(response.data);
    setBranch(response.data[0]);
  };

  useEffect(() => {
    if (!orgId) return;
    if (branches.length === 0) {
      refreshBranches();
    }
  }, []);

  return (
    <OrgContext.Provider
      value={{ branch, setBranch, branches, refreshBranches, orgId: orgId || '' }}
    >
      {children}
    </OrgContext.Provider>
  );
};

export const useOrg = () => {
  const context = useContext(OrgContext);
  if (!context) {
    throw new Error('useOrg must be used within an OrgProvider');
  }
  return context;
};
