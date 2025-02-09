import React, { createContext, useContext, useEffect, useState } from 'react';
import { Branch, OrgContextType } from '../types';
import { branchApi } from '@/api';
const OrgContext = createContext<OrgContextType | null>(null);

export const OrgProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [branch, setBranch] = useState<Branch | null>(null);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [orgId, setOrgId] = useState<string | null>(null);
  const refreshBranches = async () => {
    const orgId = localStorage.getItem('orgId');
    if (!orgId) return;
    const response = await branchApi.getAll(orgId);
    console.log(response.data);
    setBranches(response.data);
    if (response.data && response.data.length > 0) {
      setBranch(response.data[0]);
      setOrgId(orgId);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  };

  useEffect(() => {
    const orgId = localStorage.getItem('orgId');
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
