import Button from '../components/ui/Button';
import PlainContainer from '../components/containers/PlainContainer';
import { Search, GripVertical } from 'lucide-react';
import { organizationApi } from '@/api';
import { useEffect, useMemo, useState } from 'react';
import { formatDateTime } from '@/Utils';
import { SortBy, SortOption } from '@/components/ui/SortBy';
export default function BrandListPage() {
  const [brands, setBrands] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedSort, setSelectedSort] = useState({
    label: 'Date of Joining',
    value: 'date',
  });
  const sortOptions: SortOption[] = [
    { label: 'Date of Joining', value: 'date' },
    { label: 'Name', value: 'name' },
    { label: 'No. of Branch', value: 'noOfBranches' },
    { label: 'Total Coins', value: 'totalCoins' },
    { label: 'Balance', value: 'balance' },
  ];
  useEffect(() => {
    organizationApi.getAll().then(res => {
      if (!res.data) {
        return;
      }
      setBrands(res.data);
    });
  }, []);

  const filteredAndSortedBrands = useMemo(() => {
    let result = [...brands];
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        brand =>
          brand.name.toLowerCase().includes(query) ||
          brand.id.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;

      const sortField = selectedSort.value;
      if (sortField === 'date') {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        comparison = dateA - dateB;
      } else if (sortField === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortField === 'totalEarned') {
        comparison = b.totalCoinsEarned - a.totalCoinsEarned;
      } else if (sortField === 'noOfBrands') {
        comparison = b.totalUniqueBrands - a.totalUniqueBrands;
      } else if (sortField === 'totalRedemption') {
        comparison = b.totalCoinsRedeemed - a.totalCoinsRedeemed;
      } else if (sortField === 'balance') {
        comparison = b.totalCoinsEarned - a.totalCoinsRedeemed;
      } else {
        comparison = 1;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [searchQuery, selectedSort, sortOrder, brands]);
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="title-2">Brand List</h1>
        <div className="flex space-x-4">
          <Button variant="secondary" size="sm" onClick={() => {}}>
            Add New Brand
          </Button>
        </div>
      </div>
      <PlainContainer>
        <div className="flex justify-between space-x-4 flex-1 mb-8">
          <div className="relative flex-1 max-w-xs">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-3 bg-gray-100 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-brand/20"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          {/* <button className="px-4 py-2 bg-[#EDEDED] rounded-lg text-[#7E7E7E] flex items-center space-x-2">
            <span className="mr-4">Sort by date</span>
            <ChevronDown className="w-4 h-4" />
          </button> */}
          <SortBy
            options={sortOptions}
            value={selectedSort.value}
            onChange={(value: string) => {
              setSelectedSort(
                sortOptions.find(option => option.value === value) ||
                  sortOptions[0]
              );
            }}
            label="Sort by" // optional
          />
        </div>
        <table className="w-full">
          <thead className="sticky top-0 ">
            <tr className="text-left border-b">
              <th className="pr-6 py-4 title">Name</th>
              <th className="px-6 py-4 title">Expiry Date</th>
              <th className="px-6 py-4 title">No. of Branch</th>
              <th className="px-6 py-4 title">Total Coins</th>
              <th className="px-6 py-4 title">Usage</th>
              <th className="px-6 py-4">Balance</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredAndSortedBrands.map(brand => {
              const [expiryDate, expiryDateFormatted] = formatDateTime(
                brand.subscription.endDate
              );
              return (
                <tr className="hover:bg-gray-50" key={brand.id}>
                  <td className="pl-6 py-4">
                    <div className="flex items-center space-x-10">
                      <div className="w-8 h-8 rounded-full p-4 text-brand bg-brand/25 flex items-center justify-center">
                        <span className="text-sm font-medium">
                          {brand.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span>{brand.name}</span>
                      </div>
                    </div>
                  </td>
                  <td className="pl-6 py-4">
                    <div className="flex flex-col">
                      <span>{expiryDate}</span>
                      <span className="text-gray-400">
                        at {expiryDateFormatted}
                      </span>
                    </div>
                  </td>
                  <td className="pl-6 py-4">
                    <span className="text-secondary-500 font-semibold">
                      {brand.noOfBranches}
                    </span>
                  </td>
                  <td className="pl-6 py-4">
                    <span className="text-secondary-500 font-semibold">
                      1000 Coins
                    </span>
                  </td>
                  <td className="pl-6 py-4">4500 Coins</td>
                  <td className="pl-6 py-4">6000 Coins</td>
                  <td>
                    <GripVertical />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </PlainContainer>
    </div>
  );
}
