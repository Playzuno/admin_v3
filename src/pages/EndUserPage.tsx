import Button from '../components/ui/Button';
import PlainContainer from '../components/containers/PlainContainer';
import { GripVertical } from 'lucide-react';
import { Search } from 'lucide-react';
import { endUserApi } from '@/api';
import { useEffect, useMemo, useState } from 'react';
import { formatDateTime } from '@/Utils';
import { SortBy } from '@/components/ui/SortBy';

export default function EndUserPage() {
  const [endUsers, setEndUsers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSort, setSelectedSort] = useState({
    label: 'Date',
    value: 'date',
  });
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const sortOptions: SortOption[] = [
    { label: 'Date', value: 'date' },
    { label: 'Name', value: 'name' },
    { label: 'No. of brands', value: 'noOfBrands' },
    { label: 'Total Earned', value: 'totalEarned' },
    { label: 'Total Redemption', value: 'totalRedemption' },
    { label: 'Balance', value: 'balance' },
  ];
  useEffect(() => {
    endUserApi.getAll().then(res => {
      if (!res.data) {
        return;
      }
      setEndUsers(res.data);
    });
  }, []);

  const filteredAndSortedEndUsers = useMemo(() => {
    let result = [...endUsers];
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        endUserObj =>
          endUserObj.endUser.name.toLowerCase().includes(query) ||
          endUserObj.endUser.id.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      const { endUser: endUserA } = a;
      const { endUser: endUserB } = b;
      let comparison = 0;
      const sortField = selectedSort.value;
      if (sortField === 'date') {
        const dateA = new Date(endUserA.createdAt).getTime();
        const dateB = new Date(endUserB.createdAt).getTime();
        comparison = dateA - dateB;
      } else if (sortField === 'name') {
        comparison = endUserA.name.localeCompare(endUserB.name);
      } else if (sortField === 'totalEarned') {
        comparison = endUserB.totalCoinsEarned - endUserA.totalCoinsEarned;
      } else if (sortField === 'noOfBrands') {
        comparison = b.totalUniqueBrands - a.totalUniqueBrands;
      } else if (sortField === 'totalRedemption') {
        comparison = endUserB.totalCoinsRedeemed - endUserA.totalCoinsRedeemed;
      } else if (sortField === 'balance') {
        comparison = endUserB.totalCoinsEarned - endUserA.totalCoinsRedeemed;
      } else {
        comparison = 1;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [searchQuery, selectedSort, sortOrder, endUsers]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="title-2">End Users</h1>
        <div className="flex space-x-4">
          <Button variant="secondary" size="sm" onClick={() => {}}>
            Add Profile
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
            <span className="mr-4">Sort by teams</span>
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
              <th className="px-6 py-4 title">Date of joining</th>
              <th className="pr-6 py-4 title">No. of brands</th>
              <th className="px-6 py-4 title">Total Earned</th>
              <th className="px-6 py-4 title">Total Redemptions</th>
              <th className="px-6 py-4 title">Balance</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredAndSortedEndUsers.map(({ endUser, totalUniqueBrands }) => {
              const [createdAt, createdAtTime] = formatDateTime(
                endUser.createdAt
              );
              return (
                <tr className="hover:bg-gray-50" key={endUser.id}>
                  <td className="pl-6 py-4">
                    <div className="flex items-center space-x-10">
                      <div className="w-8 h-8 rounded-full p-4 text-brand bg-brand/25 flex items-center justify-center">
                        <span className="text-sm font-medium">
                          {endUser.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span>{endUser.name}</span>
                        <span className="text-gray-400"> ID: {endUser.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="pl-6 py-4">
                    <div className="flex flex-col">
                      <span>{createdAt}</span>
                      <span className="text-gray-400">at {createdAtTime}</span>
                    </div>
                  </td>
                  <td className="pl-6 py-4">
                    <span className="text-secondary-500 font-semibold">
                      {totalUniqueBrands}
                    </span>
                  </td>
                  <td className="pl-6 py-4">
                    <span className="text-secondary-500 font-semibold">
                      {endUser.totalCoinsEarned} Coins
                    </span>
                  </td>
                  <td className="pl-6 py-4">
                    <span className="text-secondary-500 font-semibold">
                      {endUser.totalCoinsRedeemed} Coins
                    </span>
                  </td>
                  <td className="pl-6 py-4">
                    {Math.abs(
                      endUser.totalCoinsEarned - endUser.totalCoinsRedeemed
                    )}
                  </td>
                  <td>
                    <span className="cursor-pointer">
                      <GripVertical />
                    </span>
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
