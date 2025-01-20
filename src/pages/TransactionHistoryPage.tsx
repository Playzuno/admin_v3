import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, MoreVertical, Filter } from 'lucide-react';
import { transactions } from '../seeds/transactions';
import { SortField, SortOrder } from '../types/transaction';
import PlainContainer from '../components/containers/PlainContainer';
import Button from '../components/ui/Button';

const TransactionHistoryPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [showSortMenu, setShowSortMenu] = useState(false);

  const sortOptions: { field: SortField; label: string }[] = [
    { field: 'date', label: 'Date' },
    { field: 'name', label: 'Name' },
    { field: 'brands', label: 'Brands' },
    { field: 'totalRewards', label: 'Total Rewards' },
    { field: 'totalRedemption', label: 'Total Redemption' },
    { field: 'balance', label: 'Balance' },
  ];

  const filteredAndSortedTransactions = useMemo(() => {
    let result = [...transactions];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        transaction =>
          transaction.name.toLowerCase().includes(query) ||
          transaction.id.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;

      if (sortField === 'date') {
        const dateA = new Date(`${a.date} ${a.time}`).getTime();
        const dateB = new Date(`${b.date} ${b.time}`).getTime();
        comparison = dateA - dateB;
      } else {
        comparison = a[sortField] < b[sortField] ? -1 : 1;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [searchQuery, sortField, sortOrder]);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
    setShowSortMenu(false);
  };

  return (
    <div className="space-y-6">
      {/* Header with breadcrumb and title */}
      <div className="space-y-1">
        {/* <div className="text-sm text-gray-500">Project1 / Members</div> */}
        <div className="flex justify-between items-center">
          <h1 className="container-title">Transaction History</h1>
          <Button variant="primary" size="sm">
            Add Profile
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <PlainContainer>
        {/* Search and Sort */}
        <div className="flex space-x-4 flex-1 mb-8">
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
          {/* <div className="flex items-center space-x-4">
            <Button
              variant="secondary"
              size="sm"
              bgColor="bg-brand"
              style={{ borderRadius: '8px' }}
              icon={Filter}
              iconPosition="left"
              onClick={() => setRoleFilter(null)}
            >
              <span>Filter by role</span>
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </div> */}
          <div className="flex-1"></div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-[#EDEDED] rounded-lg text-[#7E7E7E] flex items-center space-x-2">
              <span className="mr-4">Sort by teams</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Table with vertical scroll */}
        <div className="overflow-x-auto">
          <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
            <table className="w-full">
              <thead className="sticky top-0 bg-white">
                <tr className="text-left border-b">
                  <th className="px-6 py-2 title">Name</th>
                  <th className="px-6 py-2 title">Date of joining</th>
                  <th className="px-6 py-2 title">No. of brands</th>
                  <th className="px-6 py-2 title">Total Rewards</th>
                  <th className="px-6 py-2 title">Total redemption</th>
                  <th className="px-6 py-2 title">Balance</th>
                  <th className="px-6 py-2"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredAndSortedTransactions.map(transaction => (
                  <tr key={transaction.id} className="group hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full p-4 text-brand bg-brand/25 flex items-center justify-center">
                          <span className="text-sm font-medium">
                            {transaction.initial}
                          </span>
                        </div>
                        <div>
                          <div className="zuno-text">{transaction.name}</div>
                          <div className="subtitle">ID: {transaction.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div>{transaction.date}</div>
                        <div className="subtitle">at {transaction.time}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-brand zuno-text mr-8">
                        {transaction.brands}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-brand zuno-text">
                        {transaction.totalRewards} Coins
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="zuno-text">
                        {transaction.totalRedemption} coins
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="zuno-text">
                        {transaction.balance} Coins
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="w-5 h-5 text-gray-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </PlainContainer>
    </div>
  );
};

export default TransactionHistoryPage;
