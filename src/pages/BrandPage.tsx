import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InviteFormData } from '../types/brand';
import BranchCard from '../components/brand/BranchCard';
import BranchList from '../components/brand/BranchList';
import NewBranchDialog from '../components/brand/NewBranchDialog';
import Button from '../components/ui/Button';
import { branchApi, inviteApi, organizationApi } from '@/api';
import { useOrg } from '@/context/OrgContext';
import { BranchDashboardStats, Organization } from '@/types';
import { ErrorToast } from '@/components/ui/toast';
import { SuccessToast } from '@/components/ui/toast';
const BrandPage: React.FC = () => {
  const navigate = useNavigate();
  const [showNewBranchDialog, setShowNewBranchDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState<
    BranchDashboardStats | undefined
  >();
  const [formData, setFormData] = useState<InviteFormData>({
    username: '',
    email: '',
    contact: '',
    branch: '',
    role: '',
  });

  const { orgId } = useOrg();
  const [branches, setBranches] = useState<BranchDashboardStats[]>([]);
  const [org, setOrg] = useState<Organization>();
  useEffect(() => {
    fetchBranchStats();
    fetchOrganization();
  }, [orgId]);

  const fetchOrganization = () => {
    organizationApi.get(orgId).then(res => {
      setOrg(res.data);
    });
  };

  const fetchBranchStats = () => {
    organizationApi.getBranchDashboard(orgId).then(res => {
      if (!res.data || !res.data.branches) {
        return;
      }
      res.data.branches.map((branch, i) => {
        branch.initial = branch.branchName.charAt(0);
        if (i < 5) {
          branch.isDisplayed = true;
        } else {
          branch.isDisplayed = false;
        }
      });
      setBranches(res.data.branches);
      if (res.data.branches.length > 0) {
        setSelectedBranch(res.data.branches[0]);
      }
    });
  };

  const onToggleBranch = (branch: BranchDashboardStats) => {
    setBranches(prev => {
      // If turning off, just toggle the branch
      if (branch.isDisplayed) {
        return prev.map(p => ({
          ...p,
          isDisplayed: p.branchId === branch.branchId ? false : p.isDisplayed,
        }));
      }

      // If turning on and already 5 displayed, turn off the first displayed one
      const displayedCount = prev.filter(b => b.isDisplayed).length;
      if (displayedCount >= 5) {
        const firstDisplayedBranch = prev.find(b => b.isDisplayed);
        return prev.map(p => ({
          ...p,
          isDisplayed: (() => {
            if (p.branchId === branch.branchId) return true;
            if (p.branchId === firstDisplayedBranch?.branchId) return false;
            return p.isDisplayed;
          })(),
        }));
      }

      // Otherwise just toggle on the selected branch
      return prev.map(p => ({
        ...p,
        isDisplayed: p.branchId === branch.branchId ? true : p.isDisplayed,
      }));
    });
  };

  const handleUnselectAll = () => {
    setBranches(prev => prev.map(p => ({ ...p, isDisplayed: false })));
  };

  // const branches: Branch[] = [
  //   {
  //     id: '1',
  //     initial: 'T',
  //     name: 'Tambaram',
  //     branchId: '1848201',
  //     users: 25,
  //     feedback: 10250,
  //     isActive: true,
  //   },
  //   {
  //     id: '2',
  //     initial: 'C',
  //     name: 'Chromepet',
  //     branchId: '2784011',
  //     users: 21,
  //     feedback: 24520,
  //     isActive: true,
  //   },
  //   {
  //     id: '3',
  //     initial: 'P',
  //     name: 'Pallavaram',
  //     branchId: '6718200',
  //     users: 14,
  //     feedback: 1562,
  //     isActive: false,
  //   },
  //   {
  //     id: '4',
  //     initial: 'M',
  //     name: 'Meenambakam',
  //     branchId: '2784011',
  //     users: 38,
  //     feedback: 14567,
  //     isActive: true,
  //   },
  //   {
  //     id: '5',
  //     initial: 'M',
  //     name: 'Guindy',
  //     branchId: '2784011',
  //     users: 56,
  //     feedback: 32564,
  //     isActive: false,
  //   },
  // ];

  const handleInputChange = (field: keyof InviteFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // const handleInvite = () => {
  //   setShowInviteModal(false);
  // };

  const handleAddBranch = (branchData: {
    name: string;
    contact: string;
    address: string;
  }) => {
    // Handle adding new branch
    branchApi
      .create(orgId, {
        name: branchData.name,
        phone: [branchData.contact],
        address: branchData.address,
      })
      .then(res => {
        SuccessToast('Branch created successfully');
        setShowNewBranchDialog(false);
        fetchBranchStats();
      })
      .catch(err => {
        ErrorToast('Failed to create branch');
      });
  };

  const handleEditProfile = () => {
    navigate('/brand/profile');
  };
  const handleInvite = (formData: InviteFormData) => {
    // console.log('invite', formData);
    inviteApi
      .inviteUser(orgId, formData.branch, {
        email: formData.email,
        role: formData.role,
        username: formData.username,
        branchId: formData.branch,
        mobile: formData.contact,
      })
      .then(res => {
        console.log('res', res);
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h1 className="text-sm">Company Name: </h1>
          <span className="text-sm font-medium text-brand">{org?.name}</span>
          <button
            onClick={handleEditProfile}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
        </div>
        <Button
          variant="primary"
          size="sm"
          className="px-4 py-1.5"
          onClick={() => setShowNewBranchDialog(true)}
        >
          Add new branch
        </Button>
      </div>

      {/* Branch Cards */}
      <div className="grid grid-cols-5 gap-4">
        {branches.map(
          branch =>
            branch.isDisplayed && (
              <BranchCard
                key={branch.id}
                branch={branch}
                isSelected={selectedBranch?.id === branch.id}
              />
            )
        )}
      </div>

      {/* Branch List */}
      <BranchList
        branches={branches}
        selectedBranch={selectedBranch}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onInvite={handleInvite}
        onToggleBranch={onToggleBranch}
        handleUnselectAll={handleUnselectAll}
      />

      {/* Invite Modal */}
      {/* <InviteModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        formData={formData}
        branches={branches}
        onInputChange={handleInputChange}
        onInvite={handleInvite}
      /> */}

      {/* New Branch Dialog */}
      <NewBranchDialog
        isOpen={showNewBranchDialog}
        onClose={() => setShowNewBranchDialog(false)}
        onAdd={handleAddBranch}
      />
    </div>
  );
};

export default BrandPage;
