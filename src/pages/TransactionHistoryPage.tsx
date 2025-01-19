import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, MoreVertical } from 'lucide-react';
import { HeaderContainer } from '../components/containers';
import { transactions } from '../seeds/transactions';
import { Transaction, SortField, SortOrder } from '../types/transaction';

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
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
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
        <div className="text-sm text-gray-500">Project1 / Members</div>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Transaction History</h1>
          <button className="px-8 py-3 bg-secondary text-white rounded-full">
            Add Profile
          </button>
        </div>
      </div>

      {/* Main Content */}
      <HeaderContainer>
        {/* Search and Sort */}
        <div className="flex justify-between items-center mb-8">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name or ID"
              className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg w-[300px] focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative">
            <button 
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-700"
              onClick={() => setShowSortMenu(!showSortMenu)}
            >
              <span>Sort by {sortOptions.find(opt => opt.field === sortField)?.label.toLowerCase()}</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {showSortMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 z-10">
                {sortOptions.map((option) => (
                  <button
                    key={option.field}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 ${
                      sortField === option.field ? 'text-secondary' : 'text-gray-700'
                    }`}
                    onClick={() => handleSort(option.field)}
                  >
                    {option.label}
                    {sortField === option.field && (
                      <span className="ml-2">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Table with vertical scroll */}
        <div className="overflow-x-auto">
          <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
            <table className="w-full">
              <thead className="sticky top-0 bg-white">
                <tr className="text-left border-b">
                  <th className="pb-4 font-medium">Name</th>
                  <th className="pb-4 font-medium">Date of joining</th>
                  <th className="pb-4 font-medium">No. of brands</th>
                  <th className="pb-4 font-medium">Total Rewards</th>
                  <th className="pb-4 font-medium">Total redemption</th>
                  <th className="pb-4 font-medium">Balance</th>
                  <th className="pb-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredAndSortedTransactions.map((transaction) => (
                  <tr key={transaction.id} className="group hover:bg-gray-50">
                    <td className="py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                          <span className="text-secondary font-medium">{transaction.initial}</span>
                        </div>
                        <div>
                          <div className="font-medium">{transaction.name}</div>
                          <div className="text-sm text-gray-500">ID: {transaction.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <div>
                        <div>{transaction.date}</div>
                        <div className="text-sm text-gray-500">at {transaction.time}</div>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="text-secondary font-medium">{transaction.brands}</span>
                    </td>
                    <td className="py-4">
                      <span className="text-secondary font-medium">{transaction.totalRewards} Coins</span>
                    </td>
                    <td className="py-4">
                      <span className="text-gray-600">{transaction.totalRedemption} coins</span>
                    </td>
                    <td className="py-4">
                      <span className="text-gray-900">{transaction.balance} Coins</span>
                    </td>
                    <td className="py-4">
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
      </HeaderContainer>
    </div>
  );
};

export default TransactionHistoryPage;