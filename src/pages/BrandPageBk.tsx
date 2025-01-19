import React, { useState } from 'react';
import { Building2, MapPin, Plus, Pencil, X } from 'lucide-react';
import { ActionContainer } from '../components/containers';
import ProfileField from '../components/profile/ProfileField';

interface BranchStats {
  feedback: number;
  transactions: number;
  incharge: number;
  employees: number;
}

interface Branch {
  id: string;
  name: string;
  isMain: boolean;
  address: string;
  stats: BranchStats;
}

interface BranchFormData {
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  isMain: boolean;
}

const initialFormData: BranchFormData = {
  name: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
  isMain: false,
};

const BrandPage: React.FC = () => {
  const [branches, setBranches] = useState<Branch[]>([
    {
      id: '2',
      name: 'Velachery',
      isMain: true,
      address: '100 Feet Bypass Road, Velachery, Chennai, Tamil Nadu 600042',
      stats: {
        feedback: 8150,
        transactions: 1425,
        incharge: 22,
        employees: 45
      }
    },
    {
      id: '3',
      name: 'T Nagar',
      isMain: false,
      address: 'North Usman Road, T Nagar, Chennai, Tamil Nadu 600017',
      stats: {
        feedback: 9320,
        transactions: 1650,
        incharge: 25,
        employees: 48
      }
    },
    {
      id: '1',
      name: 'Tambaram',
      isMain: false,
      address: 'No: 172/173, Velachery - Tambaram Main Rd, Aarthi Nagar, Selaiyur, Chennai, Tamil Nadu 600059',
      stats: {
        feedback: 10250,
        transactions: 1829,
        incharge: 28,
        employees: 52
      }
    }
  ]);

  const [selectedBranch, setSelectedBranch] = useState<Branch>(branches[0]);
  const [showNewBranchForm, setShowNewBranchForm] = useState(false);
  const [formData, setFormData] = useState<BranchFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof BranchFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setShowNewBranchForm(false);
  };

  const handleCreate = async () => {
    try {
      setIsSubmitting(true);
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newBranch: Branch = {
        id: `branch-${Date.now()}`,
        name: formData.name,
        isMain: formData.isMain,
        address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.pincode}`,
        stats: {
          feedback: 0,
          transactions: 0,
          incharge: 0,
          employees: 0
        }
      };

      setBranches(prev => [...prev, newBranch]);
      setSelectedBranch(newBranch);
      handleCancel();
    } catch (error) {
      console.error('Failed to create branch:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Company Name Header */}
      <div className="flex items-center space-x-2">
        <h1 className="text-2xl font-bold">Company Name:</h1>
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-secondary">Adayar Ananda Bhavan</span>
          <button className="text-gray-400 hover:text-gray-600">
            <Pencil className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[1fr,400px] gap-6">
        {/* Left Side - Branch Details */}
        <ActionContainer
          title="Branch details"
          action={
            <button className="px-6 py-2 bg-secondary text-white rounded-full hover:bg-secondary-600 transition-colors">
              Invite team member
            </button>
          }
        >
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600">No. of Feedback</div>
                <div className="text-xl font-bold text-secondary mt-1">{selectedBranch.stats.feedback}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600">No. of transactions</div>
                <div className="text-xl font-bold text-secondary mt-1">{selectedBranch.stats.transactions}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600">No. of incharge</div>
                <div className="text-xl font-bold text-secondary mt-1">{selectedBranch.stats.incharge}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600">No. of employees</div>
                <div className="text-xl font-bold text-secondary mt-1">{selectedBranch.stats.employees}</div>
              </div>
            </div>

            <div className="flex justify-between">
              {/* Branch Info */}
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-gray-500">Main branch</div>
                    <div className="text-xl font-bold">{selectedBranch.name}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-gray-500">Address</div>
                    <div className="font-medium">{selectedBranch.address}</div>
                  </div>
                </div>
              </div>

              {/* Add New Branch Box */}
              <button
                onClick={() => setShowNewBranchForm(true)}
                className="border border-dashed border-secondary/30 rounded-2xl bg-secondary/5 p-12 flex flex-col items-center justify-center h-[300px] w-[300px] hover:bg-secondary/10 transition-colors"
              >
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-4">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <div className="text-lg font-medium text-secondary">Add new branch</div>
              </button>
            </div>
          </div>
        </ActionContainer>

        {/* Right Side - Branches List or New Branch Form */}
        <ActionContainer 
          title={showNewBranchForm ? "New Branch" : "Branches"}
          action={showNewBranchForm ? (
            <button onClick={handleCancel}>
              <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
            </button>
          ) : undefined}
        >
          {showNewBranchForm ? (
            <div className="space-y-6">
              <ProfileField
                label="Branch Name"
                value={formData.name}
                onChange={(value) => handleInputChange('name', value)}
                placeholder="Enter branch name"
              />

              <ProfileField
                label="Address"
                value={formData.address}
                onChange={(value) => handleInputChange('address', value)}
                placeholder="Enter street address"
              />

              <ProfileField
                label="City"
                value={formData.city}
                onChange={(value) => handleInputChange('city', value)}
                placeholder="Enter city"
              />

              <ProfileField
                label="State"
                value={formData.state}
                onChange={(value) => handleInputChange('state', value)}
                placeholder="Enter state"
              />

              <ProfileField
                label="Pincode"
                value={formData.pincode}
                onChange={(value) => handleInputChange('pincode', value)}
                placeholder="Enter pincode"
              />

              <div className="flex items-center space-x-3 ml-48">
                <input
                  type="checkbox"
                  id="isMain"
                  checked={formData.isMain}
                  onChange={(e) => handleInputChange('isMain', e.target.checked)}
                  className="rounded border-gray-300 text-secondary focus:ring-secondary"
                />
                <label htmlFor="isMain" className="text-gray-700">Set as main branch</label>
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Creating...' : 'Create Branch'}
                </button>
              </div>
            </div>
          ) : (
            <div className="divide-y max-h-[calc(100vh-200px)] overflow-y-auto -mx-6">
              {branches.map(branch => (
                <button
                  key={branch.id}
                  className={`w-full text-left p-4 hover:bg-gray-50 ${
                    selectedBranch.id === branch.id ? 'bg-orange-50' : ''
                  }`}
                  onClick={() => setSelectedBranch(branch)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                      <Building2 className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{branch.name}</div>
                      <div className="text-sm text-gray-500">
                        {branch.isMain ? 'Main Branch' : 'Sub Branch'}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </ActionContainer>
      </div>
    </div>
  );
};

export default BrandPage;